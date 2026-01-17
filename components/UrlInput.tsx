"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export function UrlInput() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;

    setIsLoading(true);
    let finalUrl = url.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = `https://${finalUrl}`;
    }

    router.push(`/analyze?url=${encodeURIComponent(finalUrl)}`);
  };

  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          className="w-full px-6 py-4 border-2 border-yc-black rounded-none focus:outline-none focus:ring-2 focus:ring-yc-orange text-lg"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-2 px-6 py-2 bg-yc-black text-white font-bold hover:bg-yc-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "..." : "ANALYZE"}
        </button>
      </div>

      <div className="flex gap-4 text-sm text-gray-400 mt-6 justify-center">
        <span>Try:</span>
        <button
          type="button"
          onClick={() => handleExampleClick("stripe.com")}
          className="underline hover:text-yc-black transition-colors"
        >
          stripe.com
        </button>
        <button
          type="button"
          onClick={() => handleExampleClick("cursortool.com")}
          className="underline hover:text-yc-black transition-colors"
        >
          cursortool.com
        </button>
      </div>
    </form>
  );
}

