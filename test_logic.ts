import { extractJson, parseJsonResponse } from './lib/utils';
import { calculateOverallScore } from './lib/storage';

console.log("--- Testing JSON Extraction ---");
const messyInput = 'Here is your JSON: {"oneLineSummary": "Test", "bullCase": "Bull", "bearCase": "Bear", "scorecard": {"problemIntensity": 8, "technicalMoat": 7, "marketPotential": 6, "clarity": 9}}';
try {
    const extracted = extractJson(messyInput);
    console.log("Extracted JSON:", extracted);
    const parsed = parseJsonResponse(messyInput);
    console.log("Parsed Memo:", parsed);
} catch (e) {
    console.error("Extraction/Parsing Failed:", e);
}

console.log("\n--- Testing Score Calculation ---");
const scorecard = {
    problemIntensity: 10, // 40% -> 4.0
    technicalMoat: 5,     // 30% -> 1.5
    marketPotential: 8,   // 20% -> 1.6
    clarity: 7            // 10% -> 0.7
};
// Expected: 4.0 + 1.5 + 1.6 + 0.7 = 7.8
const score = calculateOverallScore(scorecard);
console.log("Calculated Score (Expected 7.8):", score);
if (score === 7.8) {
    console.log("Calculation SUCCESS");
} else {
    console.error("Calculation FAILURE");
}
