"use client";

import { HistoryItem, Memo, Scorecard, calculateDiligenceScore } from "@/types/memo";

const STORAGE_KEY = "diligence-ai-history";
const MAX_ITEMS = 5;

/**
 * Safely access localStorage (client-side only)
 */
function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage;
}

/**
 * Save a memo to localStorage history (last 5 items)
 */
export function saveMemo(memo: Memo): void {
  const storage = getStorage();
  if (!storage) return;

  try {
    const existing = storage.getItem(STORAGE_KEY);
    const history: HistoryItem[] = existing ? JSON.parse(existing) : [];

    // Extract startup name from URL or one-line summary
    const startupName = memo.startupName || extractStartupName(memo.url || memo.oneLineSummary);
    const url = memo.url || "";

    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      startupName,
      url,
      scorecard: memo.scorecard,
      score: calculateOverallScore(memo.scorecard),
      timestamp: Date.now(),
    };

    // Check if the most recent item has the same URL (prevent duplicates/flicker)
    let updated = history;
    const existingIndex = history.findIndex((item) => item.url === url);

    if (existingIndex === 0) {
      // Update the existing first item
      updated[0] = { ...newItem, id: history[0].id }; // Keep original ID to prevent key flicker
    } else {
      // Add to beginning and limit to MAX_ITEMS
      updated = [newItem, ...history].slice(0, MAX_ITEMS);
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save memo to localStorage:", error);
  }
}

/**
 * Get memo history from localStorage
 */
export function getHistory(): HistoryItem[] {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const data = storage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to read history from localStorage:", error);
    return [];
  }
}

/**
 * Extract startup name from URL or text
 */
function extractStartupName(input: string): string {
  if (!input) return "Unknown Startup";

  // Try to extract from URL
  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);
    const hostname = url.hostname.replace("www.", "");
    return hostname.split(".")[0] || "Unknown Startup";
  } catch {
    // If not a URL, use first part of text
    return input.split(" ").slice(0, 3).join(" ") || "Unknown Startup";
  }
}

/**
 * Calculate weighted Diligence Score from scorecard
 * Re-exported for convenience
 */
export function calculateOverallScore(scorecard: Scorecard): number {
  return calculateDiligenceScore(scorecard);
}
