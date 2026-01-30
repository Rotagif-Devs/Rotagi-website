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
        "orange": "#eb3f2b",
        "primary": "var(--color-primary)",
      },
      fontFamily: {
        "cal-sans": ["var(--font-cal-sans)", "sans-serif"],
        "outfit": ["var(--font-outfit)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        "inter": ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;