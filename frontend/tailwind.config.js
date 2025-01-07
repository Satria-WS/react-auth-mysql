/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl':'6rem'
      }
    },
    backgroundImage: {
      'custom-gradient': 'linear-gradient(71deg, #FEAF00 19.35%, #F8D442 90.12%)',
    },
  },
  plugins: [],
}