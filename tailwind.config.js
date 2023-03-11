/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout.html",
    "./src/app/**/*.{js,ts,jsx,tsx,html,scss}",
  ],
  theme: {
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
