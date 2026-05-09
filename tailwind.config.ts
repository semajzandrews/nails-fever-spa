import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        "bg-base":     "#0A0706",
        "bg-surface":  "#120E0C",
        "bg-elevated": "#1C1512",
        "bg-warm":     "#1F1610",
        // Gold accent spectrum
        "gold-dim":    "#7A6040",
        "gold":        "#C9A96E",
        "gold-bright": "#E2C48A",
        "gold-sheen":  "#F0D9A8",
        "gold-text":   "#D4AF7A",
        // Burgundy
        "burgundy-deep":  "#2D0A12",
        "burgundy":       "#6B1A2A",
        "burgundy-bright":"#8C2236",
        // Text
        "text-primary":   "#F0E8E2",
        "text-secondary": "#A89288",
        "text-tertiary":  "#5A4A42",
        // Neutral warm
        "warm-100": "#EDE0DA",
        "warm-200": "#CDBAB3",
        "warm-300": "#A89288",
        "warm-400": "#7D6B62",
        "warm-500": "#5A4A42",
        "warm-600": "#3F342E",
        "warm-700": "#2E2420",
        "warm-800": "#1C1512",
        "warm-900": "#0A0706",
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Cormorant Garamond"', "Georgia", "serif"],
        body:    ['"DM Sans"', '"Inter"', "system-ui", "sans-serif"],
        mono:    ['"DM Mono"', '"Fira Code"', "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)",    { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(2.75rem, 5vw, 5rem)",   { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg":  ["clamp(2rem, 4vw, 3.5rem)",    { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-md":  ["clamp(1.5rem, 3vw, 2.5rem)",  { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
        "display-sm":  ["clamp(1.125rem, 2vw, 1.5rem)",{ lineHeight: "1.3"  }],
      },
      letterSpacing: {
        "widest-2": "0.2em",
        "wide-2":   "0.08em",
      },
      borderRadius: {
        "card":  "2px",
      },
      boxShadow: {
        "gold-glow":  "0 0 30px rgba(201, 169, 110, 0.3)",
        "gold-glow-sm":"0 0 12px rgba(201, 169, 110, 0.2)",
        "luxury":     "0 8px 40px rgba(10, 7, 6, 0.8)",
      },
      animation: {
        "float":       "float 6s ease-in-out infinite",
        "float-slow":  "float 9s ease-in-out infinite",
        "float-fast":  "float 4s ease-in-out infinite",
        "shimmer":     "shimmer 3s ease-in-out infinite",
        "spin-slow":   "spin 20s linear infinite",
        "pulse-gold":  "pulseGold 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "1" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 169, 110, 0)" },
          "50%":      { boxShadow: "0 0 30px 10px rgba(201, 169, 110, 0.2)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
