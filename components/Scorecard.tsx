import { Scorecard as ScorecardType, ScoreRationale, calculateDiligenceScore } from "@/types/memo";

interface ScorecardProps {
  scorecard: ScorecardType;
  scoreRationale?: ScoreRationale;
  jargonPenalty?: number;
}

interface ScoreRowProps {
  label: string;
  value: number;
  weight: string;
  description: string;
  rationale?: string;
  penaltyNote?: string;
}

function ScoreRow({ label, value, weight, description, rationale, penaltyNote }: ScoreRowProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm md:text-base">{label}</span>
          <span className="text-xs text-gray-400">({weight})</span>
          {penaltyNote && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">
              {penaltyNote}
            </span>
          )}
        </div>
        <span className="text-lg md:text-xl font-bold">{value}/10</span>
      </div>
      <p className="text-xs text-gray-500 mb-1">{description}</p>
      {rationale && (
        <p className="text-sm text-gray-700 italic mb-2 border-l-2 border-yc-orange pl-2">
          {rationale}
        </p>
      )}
      <div className="w-full bg-yc-gray h-2">
        <div
          className="h-2 transition-all duration-300"
          style={{
            width: `${(value / 10) * 100}%`,
            backgroundColor: value >= 7 ? "#22c55e" : value >= 4 ? "#eab308" : "#ef4444"
          }}
        />
      </div>
    </div>
  );
}

export function Scorecard({ scorecard, scoreRationale, jargonPenalty }: ScorecardProps) {
  const diligenceScore = calculateDiligenceScore(scorecard);

  return (
    <div className="border border-yc-gray p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold">Diligence Score</h2>
          <div
            className="group relative cursor-help"
            title="(Problem × 0.4) + (Moat × 0.3) + (Market × 0.2) + (Clarity × 0.1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 hover:text-yc-black transition-colors"
            >
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
            </svg>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl md:text-4xl font-bold">{diligenceScore}</span>
          <span className="text-lg text-gray-500">/10</span>
        </div>
      </div>

      <div className="space-y-5">
        <ScoreRow
          label="Problem Intensity"
          value={scorecard.problemIntensity}
          weight="40%"
          description="Is it 'hair on fire' or 'nice to have'?"
          rationale={scoreRationale?.problemIntensity}
        />
        <ScoreRow
          label="Technical Moat"
          value={scorecard.technicalMoat}
          weight="30%"
          description="Real 'Schlep' work or just UI?"
          rationale={scoreRationale?.technicalMoat}
        />
        <ScoreRow
          label="Market Potential"
          value={scorecard.marketPotential}
          weight="20%"
          description="Could this grow 10%+ week-over-week?"
          rationale={scoreRationale?.marketPotential}
        />
        <ScoreRow
          label="Clarity"
          value={scorecard.clarity}
          weight="10%"
          description="Understood in less than 10 seconds?"
          rationale={scoreRationale?.clarity}
          penaltyNote={jargonPenalty ? `-${jargonPenalty} jargon penalty` : undefined}
        />
      </div>

      <div className="pt-4 border-t border-yc-gray">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Score Formula:</span>{" "}
          (Problem × 0.4) + (Moat × 0.3) + (Market × 0.2) + (Clarity × 0.1)
        </div>
        {jargonPenalty && (
          <div className="text-sm text-red-600 mt-1">
            <span className="font-medium">Jargon Penalty Applied:</span>{" "}
            -{jargonPenalty} point{jargonPenalty > 1 ? "s" : ""} to Clarity for excessive marketing speak
          </div>
        )}
      </div>
    </div>
  );
}
