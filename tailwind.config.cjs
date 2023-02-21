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
        }
      },
      animation: {
        'bounce-x': 'wiggle 1s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}