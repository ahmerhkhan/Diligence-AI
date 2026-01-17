"use client";

import Link from "next/link";
import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { analyzeStartup } from "@/app/actions/analyze";
import { saveMemo } from "@/lib/storage";
import { Memo } from "@/types/memo";
import { TerminalLoader } from "@/components/TerminalLoader";
import { MemoCard } from "@/components/MemoCard";
import { HistorySidebar } from "@/components/HistorySidebar";

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [memo, setMemo] = useState<Memo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const analyzingRef = useRef<string | null>(null);

  useEffect(() => {
    const url = searchParams.get("url");
    if (!url) {
      router.push("/");
      return;
    }

    // Prevent double execution
    if (analyzingRef.current === url) {
      return;
    }
    analyzingRef.current = url;

    const fetchAnalysis = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await analyzeStartup(url);
        setMemo(result);

        // Extract startup name from URL for storage
        try {
          const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
          result.startupName = urlObj.hostname.replace("www.", "").split(".")[0];
        } catch {
          result.startupName = "Unknown";
        }

        // Save to localStorage
        saveMemo(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to analyze startup");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <TerminalLoader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full border border-yc-gray p-12 text-center space-y-6">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="text-lg text-red-600">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-yc-black text-white font-bold hover:bg-yc-orange transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!memo) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <MemoCard memo={memo} />
          </div>
        </div>
        <HistorySidebar />
      </div>
    </main>
  );
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <TerminalLoader />
        </div>
      </main>
    }>
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-md hover:border-yc-orange hover:text-yc-orange transition-colors text-sm font-medium shadow-sm"
        >
          ← Back
        </Link>
      </div>
      <AnalyzeContent />
    </Suspense>
  );
}

