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
        // Dark Mode (Mocha)
        bgDark: '#1e1e2e',
        surfaceDark: '#313244',
        textDark: '#cdd6f4',
        primaryDark: '#cba6f7', // Mauve
        secondaryDark: '#89b4fa', // Blue
        accentDark: '#a6e3a1', // Green

        // Light Mode (Latte)
        bgLight: '#eff1f5',
        surfaceLight: '#ccd0da',
        textLight: '#4c4f69',
        primaryLight: '#8839ef', // Mauve
        secondaryLight: '#1e66f5', // Blue
        accentLight: '#40a02b', // Green
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
