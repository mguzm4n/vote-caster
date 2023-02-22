/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'signika': ['Signika']
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(-3px)' },
          '50%': { transform: 'translateX(3px)' },
        },
        gradient: {
          "0%": { 'background-position': '0% 50%' },
          "50%": { 'background-position': '100% 50%' },
          "100%": { 'background-position': '0% 50%' },
        }
      },
      animation: {
        'gradient': 'gradient 1s ease infinite',
        'bounce-x': 'wiggle 1s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}