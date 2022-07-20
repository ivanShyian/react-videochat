/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-login': "url('../src/assets/images/laptop.webp')"
      }
    }
  },
  plugins: [],
}
