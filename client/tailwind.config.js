/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#383838',
          200: "#343434",
          300: "#303030",
          400: "#2b2b2b",
          500: "#262626",
          600: "#212121",
          700: "#1c1c1c",
          800: "#171717",
          900: "#121212",
          950: "#0d0d0d"
        },
        light: {
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: "#adb5bd",
          600: "#6c757d",
          700: "#495057",
          800: "#343a40",
          900: "#212529"
        },
        blue: {
          100: '#00ffff',
          200: '#00e3ff',
          300: '#00c6ff',
          400: '#00aaff',
          500: '#008eff',
          600: '#0071ff',
          700: '#0055ff',
          800: '#0039ff',
          900: '#001cff',
          950: '#0000ff'
        },
        teal: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#3ABAB4',
          600: '#319795',
          700: '#2C7A7B',
          800: '#285E61',
          900: '#234E52'
        }
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(180deg, rgb(0, 183, 255), rgb(0, 183, 255))',
      },
      animation: {
        "card-circle": 'card-circle 2.5s linear infinite',
      },
      keyframes: {
        "card-circle": {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
    fontFamily: {
      "bold": ["Nunito-Bold", "sans-serif"],
      "light": ["Nunito-Light", "sans-serif"],
      "regular": ["Nunito-Regular", "sans-serif"],
    },
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwindcss-animate'), require("tailwindcss-animated")]
}
