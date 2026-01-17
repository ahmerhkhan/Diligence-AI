# DiligenceAI

Automating the first 80% of venture capital deal screening by turning a startup's landing page into a structured, YC-style investment memo.

## Features

- **Automated Analysis**: Transforms any startup landing page into a comprehensive investment memo
- **YC Partner Persona**: Few-shot prompted AI that thinks like Paul Graham—skeptical and analytical
- **Weighted Diligence Score**: Problem Intensity (40%), Technical Moat (30%), Market Potential (20%), Clarity (10%)
- **Jargon Detection**: Flags "Obscure Marketing Speak" that obscures the actual product
- **Reliability**: Retry logic with rate limit handling
- **Privacy-First**: LocalStorage-based history (last 5 memos) keeps your analysis private

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom YC design tokens
- **Scraping**: Jina Reader API with content cleaning (removes nav/footer noise)
- **LLM**: Groq API (llama-3.3-70b-versatile) for fast inference
- **Persistence**: LocalStorage (Supabase scaffolded for future)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   GROQ_API_KEY=your_groq_api_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Diligence Score Framework

| Category | Weight | What the AI Looks For |
|----------|--------|----------------------|
| Problem Intensity | 40% | Is it a "hair on fire" problem or a "nice to have"? |
| Technical Moat | 30% | Is there a "Schlep" (hard task) involved, or is it just a UI? |
| Market Potential | 20% | Could this realistically grow 10% week-over-week? |
| Clarity | 10% | Did I understand what they do in less than 10 seconds? |

## Usage

1. Enter a startup URL in the home page input field
2. Click "ANALYZE" or press Enter
3. Wait for the terminal-style processing animation
4. Review the generated investment memo with:
   - One-line summary (plain English, "X for Y" format)
   - Bull case (why this could be $10B)
   - Bear case (why this fails in 6 months)
   - Diligence questions (3 tough founder questions)
   - Obscure Marketing Speak flags (if any jargon detected)
   - Weighted Diligence Score

## Project Structure

```
├── app/
│   ├── actions/analyze.ts     # Server action with retry + fallback
│   ├── analyze/page.tsx       # Results page
│   ├── page.tsx               # Home page
│   └── layout.tsx             # Root layout
├── components/
│   ├── MemoCard.tsx           # Investment memo display
│   ├── Scorecard.tsx          # Weighted score visualization
│   ├── TerminalLoader.tsx     # Processing animation
│   ├── HistorySidebar.tsx     # Recent memos
│   └── UrlInput.tsx           # URL input component
├── lib/
│   ├── jina.ts                # Jina Reader + content cleaning
│   ├── groq.ts                # Groq API with retry logic
│   ├── prompts.ts             # YC Partner few-shot prompt
│   ├── utils.ts               # Shared utilities
│   ├── storage.ts             # LocalStorage helpers
│   └── supabase.ts            # Supabase client (scaffolded)
└── types/
    └── memo.ts                # TypeScript interfaces + score calc
```

## Intelligence Pipeline

1. **Scrape** - Jina Reader extracts clean Markdown from URL
2. **Clean** - Remove nav/footer/cookie noise, keep Hero + Features + Pricing
3. **Truncate** - Limit to ~5000 tokens to stay within rate limits
4. **Analyze** - Groq llama-3.3-70b with YC Partner few-shot prompt

## Design Philosophy

- **Pure white background** (#FFFFFF)
- **Almost-black text** (#1A1A1A)
- **Minimal borders** (1px solid #E5E5E5)
- **Generous whitespace** - double your usual spacing
- **No shadows, no gradients** - clean and focused
- **YC Orange accent** (#FF6600) for interactive elements
- **Color-coded scores**: Green (7+), Yellow (4-6), Red (1-3)

## License

MIT
