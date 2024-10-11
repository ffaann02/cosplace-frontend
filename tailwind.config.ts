import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Kanit: ["Kanit", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "50": "#fbf8f1",
          "100": "#f6efde",
          "200": "#ecdcbc",
          "300": "#e2c799",
          "400": "#d2a365",
          "500": "#c98c46",
          "600": "#bb763b",
          "700": "#9b5d33",
          "800": "#7d4c2f",
          "900": "#653f29",
          "950": "#361f14",
        },
        secondary: {
          "50": "#fffbeb",
          "100": "#fff4c6",
          "200": "#ffe788",
          "300": "#ffd95a",
          "400": "#ffc220",
          "500": "#f9a007",
          "600": "#dd7802",
          "700": "#b75406",
          "800": "#94400c",
          "900": "#7a350d",
          "950": "#461a02",
        },
      },
      scale:{
        '175': '1.75',
        '200': '2.00'
      }
    },
  },
  plugins: [],
};
export default config;
