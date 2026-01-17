"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHistory, calculateOverallScore } from "@/lib/storage";
import { HistoryItem } from "@/types/memo";

export function HistorySidebar() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Only access localStorage on client side
    setHistory(getHistory());
  }, []);

  const handleItemClick = (url: string) => {
    router.push(`/analyze?url=${encodeURIComponent(url)}`);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <aside className="border-t lg:border-t-0 lg:border-l border-yc-gray p-8 lg:min-w-[300px] bg-white">
      <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>
      <div className="space-y-4">
        {history.map((item) => {
          const overallScore = calculateOverallScore(item.scorecard);
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.url)}
              className="w-full text-left border border-yc-gray p-4 hover:border-yc-black hover:bg-gray-50 transition-all"
            >
              <div className="font-medium mb-1 truncate">{item.startupName}</div>
              <div className="text-sm text-gray-500 mb-2 truncate">{item.url}</div>
              <div className="text-lg font-bold">Score: {(item.score || overallScore || 0).toFixed(1)}/10</div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

