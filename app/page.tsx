import Link from "next/link";
import { UrlInput } from "@/components/UrlInput";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-16 space-y-10 md:space-y-12">
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 text-center">
        <div className="flex items-center space-x-4 mb-4">
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
            Internal Tool
          </span>
          <Link href="/how-it-works" className="text-sm text-gray-500 hover:text-yc-orange underline underline-offset-4">
            How it works
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-yc-black">
          Diligence AI
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-md px-4">
          Enter a startup URL to generate a YC-style Investment Memo.
        </p>
      </div>

      <UrlInput />
    </main>
  );
}

