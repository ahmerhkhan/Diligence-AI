"use server";

import { scrapeWithJina, cleanMarkdown, truncateContent } from "@/lib/jina";
import { analyzeWithGroq } from "@/lib/groq";
import { Memo } from "@/types/memo";

/**
 * Main analyze function
 * 
 * Pipeline:
 * 1. Scrape with Jina Reader
 * 2. Clean markdown (remove nav/footer noise)
 * 3. Truncate to fit token limits
 * 4. Analyze with Groq
 */
export async function analyzeStartup(url: string): Promise<Memo> {
  // Validate URL
  if (!url || !url.trim()) {
    throw new Error("URL is required");
  }

  // Ensure URL has protocol
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  // Step 1: Scrape with Jina
  const rawMarkdown = await scrapeWithJina(normalizedUrl);

  // Step 2: Clean markdown (remove nav, footer, cookie notices)
  const cleanedMarkdown = cleanMarkdown(rawMarkdown);

  // Step 3: Truncate to fit token limits
  const markdown = truncateContent(cleanedMarkdown);

  // Step 4: Analyze with Groq
  const memo = await analyzeWithGroq(markdown);

  // Step 5: Add metadata
  memo.url = normalizedUrl;
  memo.timestamp = Date.now();

  // Extract startup name from URL
  try {
    const urlObj = new URL(normalizedUrl);
    memo.startupName = urlObj.hostname.replace("www.", "").split(".")[0];
  } catch {
    memo.startupName = "Unknown";
  }

  return memo;
}
