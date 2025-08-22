/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Baskerville', '"Palatino Linotype"', 'Palatino', '"Century Schoolbook"', 'serif'],
        'book': ['Baskerville', '"Book Antiqua"', '"Palatino Linotype"', 'serif'],
      },
      colors: {
        'parchment': {
          50: '#f9f6f0',
          100: '#f5f1e6',
          200: '#ede8db',
        },
        'vintage': {
          amber: {
            50: '#f9f6f0',
            100: '#f5f1e6', 
            200: '#ede8db',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          }
        }
      }
    },
  },
  plugins: [],
}