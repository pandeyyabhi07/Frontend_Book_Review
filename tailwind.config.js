/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'book-primary': {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8'
        }
      }
    },
  },
  plugins: [],
}