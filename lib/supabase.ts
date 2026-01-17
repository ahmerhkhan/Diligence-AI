import { createClient } from "@supabase/supabase-js";
import { Memo } from "@/types/memo";

// Scaffolded for future use - not currently active
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Save memo to Supabase (scaffolded - not implemented)
 */
export async function saveMemoToSupabase(memo: Memo): Promise<void> {
  // TODO: Implement Supabase persistence
  // This is scaffolded for future migration from LocalStorage
  if (!supabase) {
    console.warn("Supabase not configured - skipping database save");
    return;
  }
  // Implementation would go here
}

/**
 * Get memo history from Supabase (scaffolded - not implemented)
 */
export async function getHistoryFromSupabase(): Promise<Memo[]> {
  // TODO: Implement Supabase retrieval
  if (!supabase) {
    return [];
  }
  // Implementation would go here
  return [];
}

