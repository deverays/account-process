module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      dark: {
        100: "#1e2023",
        200: "#18191c",
        300: "#141417",
      },
      grey: {
        100: "#ffffff",
        150: "#F7F7F7",
        200: "#f2f2f2",
        300: "#d2d2d3",
      },
      blue: {
        100: "#378CE7",
        200: "#5356FF",
      },
      red: {
        100: "#ffbaba",
        200: "#ff7b7b",
        300: "#ff5252",
        400: "#ff0000",
        500: "#a70000",
      },
    },
    extend: {
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0 },
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
        "rubik-regular": ["Rubik-Regular", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        greconian: ["Greconian", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
