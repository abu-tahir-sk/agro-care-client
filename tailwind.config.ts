import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAF8",
        foreground: "#17251C",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#16834A",
          dark: "#106B3B",
          light: "#E9F6EE",
          hover: "#12703E",
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#16834A",
          600: "#106B3B",
          700: "#0b522b",
        },
        secondary: {
          DEFAULT: "#F2A93B",
          hover: "#e09322",
          light: "#fef3c7",
        },
        accent: {
          DEFAULT: "#D9EFDF",
          dark: "#b5dfc0",
        },
        muted: {
          DEFAULT: "#68766D",
          light: "#8a988f",
        },
        border: "#E4EBE5",
        danger: "#DC4242",
        warning: "#E99A25",
        success: "#18864B",
        info: "#3483C5",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        bengali: ["Hind Siliguri", "Noto Sans Bengali", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(22, 131, 74, 0.05)",
        card: "0 4px 20px -2px rgba(23, 37, 28, 0.05)",
        elevated: "0 10px 30px -5px rgba(23, 37, 28, 0.08)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;

