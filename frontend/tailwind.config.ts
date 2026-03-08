import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Manrope", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        panel: "0 28px 60px -36px rgba(15, 23, 42, 0.45)",
        floating: "0 18px 45px -28px rgba(2, 12, 37, 0.48)",
      },
    },
  },
  plugins: [],
} satisfies Config;
