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
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-15deg)' },
        '50%': { transform: 'rotate(15deg)' },
      },
      heartBeat: {
        '0%': { transform: 'scale(1);' },
        '14%': { transform: 'scale(1.3);' },
        '28%': { transform: 'scale(1);' },
        '42%': { transform: 'scale(1.3);' },
        '70%': { transform: 'scale(1);' },
      },
      flipHorizontal: {
        '50%': { transform: 'rotateY(180deg)' },
      },
      flipVertical: {
        '50%': { transform: 'rotateX(180deg)' },
      },
      swing: {
        '20%': {
          transform: 'rotate3d(0, 0, 1, 15deg)',
        },

        '40%': {
          transform: 'rotate3d(0, 0, 1, -10deg)',
        },

        '60%': {
          transform: 'rotate3d(0, 0, 1, 5deg)',
        },

        '80%': {
          transform: 'rotate3d(0, 0, 1, -5deg)',
        },
        to: {
          transform: 'rotate3d(0, 0, 1, 0deg)',
        },
      },
      rubberBand: {
        from: {
          transform: 'scale3d(1, 1, 1)',
        },

        '30%': {
          transform: 'scale3d(1.25, 0.75, 1)',
        },

        '40%': {
          transform: 'scale3d(0.75, 1.25, 1)',
        },

        '50%': {
          transform: 'scale3d(1.15, 0.85, 1)',
        },

        '65%': {
          transform: 'scale3d(0.95, 1.05, 1)',
        },

        '75%': {
          transform: 'scale3d(1.05, 0.95, 1)',
        },
        to: {
          transform: 'scale3d(1, 1, 1)',
        },
      },
      flash: {
        '25%, 40%': { opacity: '0' },
        '50%': { opacity: '1' },
        '75%': { opacity: '0' },
      },
      headShake: {
        '0%': {
          transform: 'translateX(0)',
        },
        '6.5%': {
          transform: 'translateX(-6px) rotateY(-9deg)',
        },

        '18.5%': {
          transform: 'translateX(5px) rotateY(7deg)',
        },

        '31.5%': {
          transform: 'translateX(-3px) rotateY(-5deg)',
        },

        '43.5%': {
          transform: 'translateX(2px) rotateY(3deg)',
        },
        '50%': {
          transform: 'translateX(0)',
        },
      },
      wobble: {
        from: {
          transform: 'translate3d(0, 0, 0)',
        },

        '15%': {
          transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
        },

        '30%': {
          transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
        },

        '45%': {
          transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
        },

        '60%': {
          transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
        },

        '75%': {
          transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
        },

        to: {
          transform: 'translate3d(0, 0, 0)',
        },
      },
      jello: {
        'from, 11.1%,to': {
          transform: 'translate3d(0, 0, 0)',
        },

        '22.2%': {
          transform: 'skewX(-12.5deg) skewY(-12.5deg)',
        },

        '33.3%': {
          transform: 'skewX(6.25deg) skewY(6.25deg)',
        },

        '44.4%': {
          transform: 'skewX(-3.125deg) skewY(-3.125deg)',
        },

        '55.5%': {
          transform: 'skewX(1.5625deg) skewY(1.5625deg)',
        },

        '66.6%': {
          transform: 'skewX(-0.78125deg) skewY(-0.78125deg)',
        },

        '77.7%': {
          transform: 'skewX(0.390625deg) skewY(0.390625deg)',
        },

        '88.8%': {
          transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
        },
      },
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      heartBeat: 'heartBeat 1s infinite',
      hflip: 'flipHorizontal 2s infinite',
      vflip: 'flipVertical 2s infinite',
      swing: 'swing 2s ease-out infinite',
      rubberBand: 'rubberBand 1s infinite',
      flash: 'flash 2s infinite',
      headShake: 'headShake 2s infinite',
      wobble: 'wobble 1s infinite',
      jello: 'jello 2s infinite',
    },
  },
  plugins: [],
};
export default config;
