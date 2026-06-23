/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Playfair Display"', '"Georgia"', 'serif'],
        heading: ['"Playfair Display"', '"Georgia"', 'serif'],
        body: ['"Lora"', '"Georgia"', 'serif'],
      },
      colors: {
        brand: {
          brown: '#8B4513', // Saddle brown (main brand color)
          darkBrown: '#5D2E0C', // Darker brown
          lightBrown: '#D2B48C', // Tan
          red: '#CD5C5C', // Indian red (accent red)
          darkRed: '#A52A2A', // Brown red
          cream: '#FFF8DC', // Cornsilk (warm cream)
          light: '#F5DEB3', // Wheat (light background)
          gold: '#DAA520', // Goldenrod
        },
        primary: {
          DEFAULT: '#8B4513', // Brand brown
          hover: '#5D2E0C', // Darker brand brown
          light: '#F5DEB3', // Light brown
        }
      }
    },
  },
  plugins: [],
}
