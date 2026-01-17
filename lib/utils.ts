import { Memo } from "@/types/memo";

/**
 * Extract JSON object from a string using regex
 */
export const extractJson = (content: string) => {
  const match = content.match(/\{[\s\S]*\}/);
  return match ? JSON.parse(match[0]) : null;
};

/**
 * Apply jargon penalty to clarity score
 * For every 3 jargon items detected, subtract 1.0 from clarity
 * Minimum clarity score is 1
 */
function applyJargonPenalty(memo: Memo): { penalty: number; adjustedClarity: number } {
  const jargonCount = memo.obscureMarketingFlags?.length || 0;
  const penalty = Math.floor(jargonCount / 3);

  if (penalty === 0) {
    return { penalty: 0, adjustedClarity: memo.scorecard.clarity };
  }

  const adjustedClarity = Math.max(1, memo.scorecard.clarity - penalty);
  return { penalty, adjustedClarity };
}

/**
 * Parse JSON response from LLM, handling markdown code blocks and conversational filler
 * Also applies jargon penalty to clarity score
 */
export function parseJsonResponse(content: string): Memo {
  try {
    const memo = extractJson(content) as Memo;

    if (!memo) {
      throw new Error("No valid JSON found in response");
    }

    // Validate required fields
    if (!memo.oneLineSummary || !memo.bullCase || !memo.bearCase || !memo.scorecard) {
      throw new Error("Invalid memo structure from API");
    }

    // Ensure scorecard has all required fields with defaults
    memo.scorecard = {
      problemIntensity: memo.scorecard.problemIntensity ?? 5,
      technicalMoat: memo.scorecard.technicalMoat ?? 5,
      marketPotential: memo.scorecard.marketPotential ?? 5,
      clarity: memo.scorecard.clarity ?? 5,
    };

    // Apply jargon penalty to clarity score
    const { penalty, adjustedClarity } = applyJargonPenalty(memo);
    if (penalty > 0) {
      memo.jargonPenalty = penalty;
      memo.scorecard.clarity = adjustedClarity;
    }

    return memo;
  } catch (error) {
    console.error("Failed to parse LLM response. Raw content:", content);
    console.error("Parse error:", error);
    throw new Error("Failed to parse startup analysis. Please try again.");
  }
}

/**
 * Check if error is a rate limit error
 */
export function isRateLimitError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("rate_limit") ||
      message.includes("rate limit") ||
      message.includes("429") ||
      message.includes("413") ||
      message.includes("too large") ||
      message.includes("tpm")
    );
  }
  return false;
}

/**
 * Delay utility for retry logic
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
