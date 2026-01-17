"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Initializing Jina Scraping Engine...",
  'Scanning for "Schlep" signals...',
  "Auditing for marketing jargon...",
  "Calculating competitive moat...",
  "Simulating YC Partner Judgment...",
  "Generating Investment Memo...",
];

export function TerminalLoader() {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < STEPS.length) {
        setDisplayedSteps((prev) => [...prev, STEPS[currentStep]]);
        setCurrentStep((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="bg-black text-green-400 font-mono p-8 border border-yc-gray">
      <div className="space-y-2">
        {displayedSteps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-yc-orange">&gt;</span>
            <span>{step}</span>
          </div>
        ))}
        {currentStep < STEPS.length && (
          <div className="flex items-center gap-2">
            <span className="text-yc-orange">&gt;</span>
            <span className="animate-pulse">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}

