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
        "white": "#FFFFFF",
        "black": "#060000",
        "screamin-green": "#83FF8F",
        "eerie-black": "#1A1A1A",
        "dark-gray": "#525252",
        "orange": "#EB3F2B",
        "accent-0": "#FABFD3",
        "accent-1": "#D62D88",
        "neutral-400": "#D1CDCD",
        "gray-50": "#F9FAFB",
      },
    },
  },
  plugins: [],
};
export default config;
