import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
 fontFamily: {
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-outfit)", "var(--font-cal-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        "cal-sans": ["var(--font-cal-sans)", "sans-serif"],
        "outfit": ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        "primary": "#F8E0ED",
        "secondary": "#D62D88", 
        "tertiary": "#e463a4",
        "quaternary": "#e949a3",
        "orange": "#eb3f2b"
      },
    },
  },
  plugins: [],
};

export default config;