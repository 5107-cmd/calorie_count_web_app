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
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#10B981',
        error: '#EF4444',
        success: '#22C55E',
      },
    },
  },
  plugins: [],
}
