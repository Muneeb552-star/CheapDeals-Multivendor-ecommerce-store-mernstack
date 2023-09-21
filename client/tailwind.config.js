/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      }
    },
    screens: {
      xl: { min: '1201px' },
      lg: { max: '1200px' },
      md: { max: '992px' },
      sm: { max: '768px' },
      xs: { max: '576px' }
    }
  },
  plugins: []
}
