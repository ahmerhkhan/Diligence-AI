/**
 * Jina Reader API wrapper
 * Transforms any URL into clean, LLM-ready Markdown
 */
export async function scrapeWithJina(url: string): Promise<string> {
  try {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        Accept: "text/markdown",
        "X-No-Cookie-Banner": "true",
        "X-No-Link-List": "true",
        "X-Return-Format": "markdown",
      },
    });

    if (!response.ok) {
      throw new Error(`Jina API error: ${response.status} ${response.statusText}`);
    }

    const markdown = await response.text();
    return markdown;
  } catch (error) {
    throw new Error(`Failed to scrape URL with Jina: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Clean and pre-process markdown content
 * Aggressively strips noise to minimize token usage
 */
export function cleanMarkdown(content: string): string {
  let cleaned = content;

  // Remove common navigation patterns
  const navPatterns = [
    /^#{1,3}\s*(Navigation|Menu|Nav)\s*$/gim,
    /^\s*[-*]\s*(Home|About|Contact|Blog|Careers|Press|Terms|Privacy|Login|Sign\s*up|Sign\s*in|FAQ|Help|Support|Docs|Documentation|Resources|Community|Partners|Team|Pricing|Features|Products?|Solutions?|Company|News|Events|Investors?|Media)\s*$/gim,
    /\[Skip to.*?\]/gi,
    /\[Menu\]/gi,
    /\[Close\]/gi,
  ];

  // Remove common footer patterns
  const footerPatterns = [
    /^#{1,3}\s*(Footer|Copyright|Legal|Contact\s*Us)\s*$/gim,
    /©\s*\d{4}.*$/gim,
    /All rights reserved\.?/gi,
    /^#{1,3}\s*(Follow\s*Us|Social\s*Media|Connect)\s*$/gim,
    /^\s*[-*]\s*(Twitter|Facebook|LinkedIn|Instagram|YouTube|TikTok|X|Github|Discord|Slack)\s*$/gim,
    /^#{1,3}\s*(Newsletter|Subscribe)\s*$/gim,
  ];

  // Remove cookie/consent/legal patterns
  const junkPatterns = [
    /We use cookies.*?\.([\s\n]|$)/gi,
    /This site uses cookies.*?\.([\s\n]|$)/gi,
    /Accept all cookies/gi,
    /Cookie settings/gi,
    /Terms of Service/gi,
    /Privacy Policy/gi,
    /\[.*?(cookie|consent|accept|decline).*?\]/gi,
  ];

  // Apply all pattern removals
  [...navPatterns, ...footerPatterns, ...junkPatterns].forEach(pattern => {
    cleaned = cleaned.replace(pattern, "");
  });

  // Remove repeated whitespace aggressively
  cleaned = cleaned.replace(/\s+/g, ' ');

  // Remove markdown link syntax but keep text: [text](url) -> text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove image references: ![alt](url)
  cleaned = cleaned.replace(/!\[[^\]]*\]\([^)]+\)/g, '');

  // Remove horizontal rules
  cleaned = cleaned.replace(/^[-*_]{3,}$/gm, '');

  // Collapse multiple newlines
  cleaned = cleaned.replace(/\n{2,}/g, '\n');

  return cleaned.trim();
}

/**
 * Truncate content to fit within token limits
 * 
 * For llama-3.1-8b-instant with 6,000 TPM limit:
 * - System prompt: ~400 tokens
 * - Output: ~600 tokens
 * - Safe input: ~4,000 tokens = 12,000 characters (aggressive)
 */
export function truncateContent(content: string, maxChars: number = 10000): string {
  if (content.length <= maxChars) {
    return content;
  }

  // Try to cut at a sentence boundary
  const truncated = content.slice(0, maxChars);
  const lastPeriod = truncated.lastIndexOf('.');

  if (lastPeriod > maxChars * 0.8) {
    return truncated.slice(0, lastPeriod + 1);
  }

  return truncated;
}
