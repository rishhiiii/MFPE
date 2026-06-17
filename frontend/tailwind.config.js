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
          brown: '#8B4513', // Saddle brown - primary brand color
          darkBrown: '#5D2E0C', // Darker brown
          lightBrown: '#A0522D', // Lighter brown
          red: '#CD5C5C', // Indian red - accent red
          darkRed: '#B22222', // Darker accent red
          white: '#FFFFFF', // White
          cream: '#FFF8E7', // Warm cream
          gold: '#D4A76A', // Gold accent
          light: '#F5DEB3', // Wheat - light background
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
