import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#FFF9ED",
          100: "#FFF2D5",
          200: "#FFE1A9",
          300: "#FECB73",
          400: "#FDAA3A",
          500: "#FB8F14",
          600: "#E8710A",
          700: "#C4570A",
          800: "#9B4411",
          900: "#7D3A11",
          950: "#431B07"
        }
      },
      fontFamily: {
        heading: ['var(--font-work-sans)'],
        body: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
