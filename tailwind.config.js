/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.js",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'pple-blue': '#002b49',
        'pple-orange': '#ff6a13'
      },
      fontFamily: {
        pracharatbold: ['"Pracharath-Bold"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}