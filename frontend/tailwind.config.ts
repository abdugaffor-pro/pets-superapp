import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#FFF6EE",
          100: "#FFE9D6",
          200: "#FFD3AD",
          400: "#FF9B54",
          500: "#FF7A2E",
          600: "#F2650F",
          700: "#C74F09",
        },
        ink: {
          DEFAULT: "#2B2420",
          soft: "#7A6F66",
          faint: "#A79C92",
        },
        line: {
          DEFAULT: "#F1E4D6",
          strong: "#E7D6C2",
        },
        success: { DEFAULT: "#3FA34D", bg: "#E9F7EC" },
        warn: { DEFAULT: "#DB9A1F", bg: "#FCF2DD" },
        danger: { DEFAULT: "#E5533D", bg: "#FCEAE7" },
        gray: { bg: "#F5F3F0", text: "#8A8078" },
        panel: "#FFFDFB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      borderRadius: {
        lg2: "18px",
      },
      boxShadow: {
        sm2: "0 1px 2px rgba(43,36,32,0.06), 0 1px 1px rgba(43,36,32,0.04)",
        md2: "0 8px 24px rgba(210,110,40,0.10), 0 2px 6px rgba(43,36,32,0.05)",
        lg2: "0 20px 45px rgba(210,110,40,0.16), 0 6px 14px rgba(43,36,32,0.07)",
      },
    },
  },
  plugins: [],
};
export default config;
