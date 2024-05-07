/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blog-title': '#525252',
        'blog-desc': '#73739F'

      }
    },
  },
  plugins: [],
}