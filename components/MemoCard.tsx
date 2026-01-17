import { Memo } from "@/types/memo";
import { Scorecard } from "./Scorecard";

interface MemoCardProps {
  memo: Memo;
}

export function MemoCard({ memo }: MemoCardProps) {
  const hasMarketingFlags = memo.obscureMarketingFlags && memo.obscureMarketingFlags.length > 0;

  return (
    <article className="border border-yc-gray p-8 md:p-12 lg:p-16 space-y-10 md:space-y-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Internal Memo</h1>
        {memo.url && (
          <p className="text-gray-500 break-all">
            <a
              href={memo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yc-orange transition-colors"
            >
              {memo.url}
            </a>
          </p>
        )}
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">One-Line Summary</h2>
        <p className="text-base md:text-lg leading-relaxed">{memo.oneLineSummary}</p>
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Bull Case</h2>
        <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
          {memo.bullCase}
        </p>
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Bear Case</h2>
        <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
          {memo.bearCase}
        </p>
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Diligence Questions</h2>
        <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
          {memo.diligenceQuestions.map((question, index) => (
            <li key={index} className="leading-relaxed">
              {question}
            </li>
          ))}
        </ul>
      </div>

      {hasMarketingFlags && (
        <div className="border-l-4 border-yc-orange bg-orange-50 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold mb-3 text-yc-orange">
            Obscure Marketing Speak Detected
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            The following phrases were flagged as corporate jargon that obscures the actual product:
          </p>
          <div className="flex flex-wrap gap-2">
            {memo.obscureMarketingFlags!.map((flag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium border border-orange-200"
              >
                &ldquo;{flag}&rdquo;
              </span>
            ))}
          </div>
        </div>
      )}

      <Scorecard
        scorecard={memo.scorecard}
        scoreRationale={memo.scoreRationale}
        jargonPenalty={memo.jargonPenalty}
      />
    </article>
  );
}
