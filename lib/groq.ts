import Groq from "groq-sdk";
import { Memo } from "@/types/memo";
import { YC_PARTNER_PROMPT } from "./prompts";
import { parseJsonResponse, isRateLimitError, delay } from "./utils";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

/**
 * Analyze startup with Groq, includes retry logic
 */
export async function analyzeWithGroq(markdown: string, retryCount = 0): Promise<Memo> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: YC_PARTNER_PROMPT },
        { role: "user", content: `Analyze this startup landing page content:\n\n${markdown}` },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from Groq API");
    }

    return parseJsonResponse(content);
  } catch (error) {
    // Retry on rate limit errors
    if (isRateLimitError(error) && retryCount < MAX_RETRIES) {
      await delay(RETRY_DELAY_MS * (retryCount + 1));
      return analyzeWithGroq(markdown, retryCount + 1);
    }

    throw error;
  }
}

/**
 * Streaming analysis using Groq
 */
export async function* streamAnalyzeWithGroq(markdown: string): AsyncGenerator<string> {
  const stream = await groq.chat.completions.create({
    messages: [
      { role: "system", content: YC_PARTNER_PROMPT },
      { role: "user", content: `Analyze this startup landing page content:\n\n${markdown}` },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

/**
 * Check if Groq API key is configured
 */
export function isGroqConfigured(): boolean {
  return !!process.env.GROQ_API_KEY;
}
