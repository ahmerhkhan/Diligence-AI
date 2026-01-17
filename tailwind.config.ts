import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "yc-orange": "#FF6600",
        "yc-black": "#1A1A1A",
        "yc-gray": "#E5E5E5",
      },
    },
  },
  plugins: [],
};
export default config;

