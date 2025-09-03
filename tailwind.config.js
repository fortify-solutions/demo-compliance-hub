/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['DM Serif Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        fortify: {
          primary: '#79189C',
          secondary: '#00A99D',
          tertiary: '#8571F4',
          accent: '#84B1EC',
        }
      }
    },
  },
  plugins: [],
}