/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          'grey-text': '#e8e8e8',
          'grey-background': '#b7b7b7'
        },
      },
    },
    plugins: [
      require("@tailwindcss/aspect-ratio"),
    ],
  }