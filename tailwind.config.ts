import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#229ED9", dark: "#1a7db0" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
