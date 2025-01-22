/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontSize: {
        '4.5xl': '44px',
      },
      colors: {
        lightBlack: 'rgba(0, 0, 0, 0.6)',
        btnColor: 'rgba(0, 0, 0, 1)'
      },
      borderColor: {
        lightGrey: 'rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
}
