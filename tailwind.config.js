/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
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