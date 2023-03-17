/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout.html",
    "./src/app/**/*.{js,ts,jsx,tsx,html,scss}",
  ],
  theme: {
    screens: {
      'xs': '0px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'xxl': '1400px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      padding: {
        '50px': '50px',
      },
      margin: {
        '1/4': '25%',
      },
      spacing: {
        20: '5rem',
        24: '6rem',
      },
      minWidth: {
        20: '5rem',
        24: '6rem',
      },
      maxWidth: {
        '1/2': '50%',
        '3/4': '75%'
      },
      height: {
        '50px': '50px',
        '45px': '45px',
      },
      fontSize: {
        24: '24px',
      },
    },
  },
  plugins: [],
}
