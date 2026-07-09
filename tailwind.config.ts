import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF9FB",
        paper: "#FFFFFF",
        sand: "#F5EDF1",
        ink: "#1A1418",
        slate: "#5C4F56",
        faint: "#9A8A92",
        hairline: "rgba(26, 20, 24, 0.09)",
        copper: {
          DEFAULT: "#B85C8A",
          light: "#D47AA8",
          wash: "#F9E8F1",
        },
        verdant: "#3D8B6A",
        hs: {
          bg: "#FAF8F6",
          paper: "#FFFFFF",
          section: "#F3EFEB",
          ink: "#0A0A0A",
          muted: "#5C534C",
          faint: "#8A8078",
          hairline: "rgba(10, 10, 10, 0.09)",
          gold: "#9B6B4F",
          "gold-dark": "#7A5540",
          "gold-wash": "#F4EBE4",
          teal: "#7A5540",
          "teal-wash": "#EDE4DC",
          green: "#5A7A5E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        caps: "0.2em",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,20,24,0.04), 0 8px 32px rgba(26,20,24,0.06)",
        lift: "0 4px 24px rgba(26,20,24,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
