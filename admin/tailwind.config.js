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
          red: '#8B0000', // Deep red from logo
          darkRed: '#5C0000', // Darker shade
          lightRed: '#B22222', // Lighter red
          white: '#FFFFFF', // White
          cream: '#FFF5E6', // Off-white/cream
          gold: '#C9A962', // Gold accent
        },
        primary: {
          DEFAULT: '#8B0000', // Brand red
          hover: '#5C0000', // Darker brand red
          light: '#FFE6E6', // Light red
        }
      }
    },
  },
  plugins: [],
}
