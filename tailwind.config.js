/** @type {import('tailwindcss').Config} */
/** @type {path.PlatformPath | path} */

const path = require('path')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-login': `url(${path.join(__dirname, 'src', 'assets/images', 'laptop.webp')})`
      }
    }
  },
  plugins: []
}
