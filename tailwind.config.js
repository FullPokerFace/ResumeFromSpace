/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%': { opacity: 0, transform:'translateY(10%)' },
          '100%': { opacity: 1, transform:'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 1, transform:'translateY(0)' },
          '100%': { opacity: 0, transform:'translateY(10%)' },
        }
      },
      animation: {
        fadeOut: 'fadeOut .2s ease-in-out',
        fadeIn: 'fadeIn .2s ease-in-out ',
      }
    },
    fontFamily: {
      mont: ['Montserrat'],
    }
  },
  plugins: [],
}