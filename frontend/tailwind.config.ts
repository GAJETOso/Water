import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#040B16",
          900: "#071426",
          800: "#0A1F3C",
          700: "#0E2A52",
        },
        ocean: {
          600: "#0E4D92",
          500: "#1B6BC0",
          400: "#2E86DE",
        },
        aqua: {
          400: "#38BDF8",
          300: "#67E8F9",
          200: "#A5F3FC",
        },
        gold: {
          500: "#C9A96A",
          400: "#DBC08A",
        },
        silver: "#C7D2DD",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(46,134,222,0.35), transparent 65%)",
        "glass-sheen":
          "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
