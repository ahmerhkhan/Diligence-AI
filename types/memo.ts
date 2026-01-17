/**
 * YC-Style Diligence Score Framework
 * 
 * Weights:
 * - Problem Intensity: 40% (Is it "hair on fire" or "nice to have"?)
 * - Technical Moat: 30% (Is there a "Schlep" involved, or just UI?)
 * - Market Potential: 20% (Could this grow 10% week-over-week?)
 * - Clarity: 10% (Did I understand in less than 10 seconds?)
 */
export interface Scorecard {
  problemIntensity: number;  // 1-10, weight: 40%
  technicalMoat: number;     // 1-10, weight: 30%
  marketPotential: number;   // 1-10, weight: 20%
  clarity: number;           // 1-10, weight: 10%
}

export interface ScoreRationale {
  problemIntensity: string;
  technicalMoat: string;
  marketPotential: string;
  clarity: string;
}

export interface Memo {
  oneLineSummary: string;
  bullCase: string;
  bearCase: string;
  diligenceQuestions: string[];
  scorecard: Scorecard;
  scoreRationale?: ScoreRationale;
  obscureMarketingFlags?: string[];  // Jargon flagged as "Obscure Marketing Speak"
  jargonPenalty?: number;            // Penalty applied to clarity score
  startupName?: string;
  url?: string;
  timestamp?: number;
}

export interface HistoryItem {
  id: string;
  startupName: string;
  url: string;
  scorecard: Scorecard;
  score?: number;
  timestamp: number;
}

/**
 * Calculate weighted Diligence Score
 */
export function calculateDiligenceScore(scorecard: Scorecard): number {
  const weighted =
    (scorecard.problemIntensity * 0.4) +
    (scorecard.technicalMoat * 0.3) +
    (scorecard.marketPotential * 0.2) +
    (scorecard.clarity * 0.1);
  return Math.round(weighted * 10) / 10;
}
