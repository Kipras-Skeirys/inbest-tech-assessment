/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      boxShadow: {
        'custom': '0 0px 15px 0px rgb(0 0 0/ 7%)',
      },
    },
    colors: {
      'inbestYellow': '#F7db00',
      'inbestAccentYellow': '#E2C903',
      'lightGray': '#f8f8f8',
      'darkerGray': '#DDDDDD',
      'white': '#FFFFFF',
      'black': '#000000',
      'red': '#ff0000',
    },
  },
  plugins: [],
}



