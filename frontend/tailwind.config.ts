import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFDF7",
        cream: "#F8F1DF",
        beige: "#D8C49A",
        gold: {
          DEFAULT: "#C99A2E",
          bright: "#E5B84B",
          dark: "#9C7A22",
        },
        brown: "#3B2A18",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E5B84B 0%, #C99A2E 100%)",
        "heritage-radial":
          "radial-gradient(circle at top right, rgba(201,154,46,0.12), transparent 60%)",
      },
      boxShadow: {
        gold: "0 8px 30px -8px rgba(201,154,46,0.45)",
        card: "0 12px 40px -12px rgba(59,42,24,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
