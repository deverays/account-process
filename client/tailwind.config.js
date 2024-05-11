/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#1e2023",
          200: "#18191c",
          300: "#141417",
        },
        light: {
          100: "#ffffff",
          200: "#F7F7F7",
          300: "#f2f2f2",
          400: "#d2d2d3",
        },
        red: {
          100: "#ffbaba",
          200: "#ff7b7b",
          300: "#ff5252",
          400: "#ff0000",
          500: "#a70000",
        },
        teal: {
          100: "#E6FFFA",
          200: "#B2F5EA",
          300: "#81E6D9",
          400: "#4FD1C5",
          500: "#3ABAB4",
          600: "#319795",
          700: "#2C7A7B",
          800: "#285E61",
          900: "#234E52",
        },
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 0.2 },
          "50%": { opacity: 0.1 },
        },
        shine: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { transform: "translateX(100%)", opacity: 0 },
        },
        animateTop: {
          "0%": { top: "-300px", opacity: 0 },
          "100%": { top: "0", opacity: 1 },
        },
        zoomIn: {
          "0%": { opacity: 0, transform: "scale3d(0.3, 0.3, 0.3)" },
          "50%": { opacity: 1 },
        },
        animateCircle: {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: 1,
            "border-radius": "0%",
          },
          "100%": {
            transform: "translateY(-1000px) rotate(720deg)",
            opacity: 0,
            "border-radius": "50%",
          },
        },
      },
      animation: {
        pulse: "pulse 1.5s infinite ease-in-out",
        shine: "shine 1.5s infinite",
        animateTop: "animateTop 1s ease-in-out",
        zoomIn: "zoomIn 1s ease-in-out",
        animateCircle: "animateCircle 30s linear infinite",
      },
      fontFamily: {
        "poppins-regular": ["Poppins-100", "sans-serif"],
        "poppins-bold": ["Poppins-200", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
