import Link from "next/link";

export default function HowItWorks() {
    return (
        <main className="min-h-screen max-w-3xl mx-auto px-6 py-16 space-y-12 text-yc-black">
            {/* Header */}
            <header className="space-y-4">
                <Link
                    href="/"
                    className="text-gray-500 hover:text-yc-red transition-colors text-sm font-medium"
                >
                    ← Back to Analysis
                </Link>
                <h1 className="text-4xl font-bold tracking-tight">How Diligence AI Works</h1>
                <p className="text-xl text-gray-600">
                    Automating the "Schlep Test" for venture capital screening.
                </p>
            </header>

            {/* Section 1: The Stack */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">The Stack</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li><strong>Agentic AI:</strong> Powered by Groq (Llama-3.1-8b-Instant) for sub-second analysis.</li>
                    <li><strong>Browsing:</strong> Jina Reader API for converting any URL into clean Markdown.</li>
                    <li><strong>Storage:</strong> LocalStorage for privacy-first, persistent history.</li>
                    <li><strong>Framework:</strong> Next.js 15 (App Router, Server Actions) + Tailwind CSS.</li>
                </ul>
            </section>

            {/* Section 2: The Logic */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">The Logic</h2>
                <p className="text-gray-700 leading-relaxed">
                    The AI mimics a skeptical YC Partner. It doesn't read marketing fluff; it looks for structural advantages.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h3 className="font-bold mb-2">The "Schlep" Test</h3>
                        <p className="text-sm text-gray-600">
                            We look for "hard, unglamorous work." If a startup is just a wrapper around an API, it gets a low <strong>Technical Moat</strong> score. If it handles fraud, compliance, or hardware, it scores high.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h3 className="font-bold mb-2">Structural Analysis</h3>
                        <p className="text-sm text-gray-600">
                            Bull cases must be based on <strong>switching costs</strong> or <strong>structural cost advantages</strong>, not just "good UX." Bear cases focus on margin compression and commoditization.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Navigation */}
            <div className="pt-8 border-t border-gray-100">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yc-orange hover:bg-red-600 transition-colors"
                >
                    Try it out
                </Link>
            </div>
        </main>
    );
}
