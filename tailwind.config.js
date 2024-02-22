/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"], // Use 'Lato' and fall back to 'sans-serif'
      },
    },
  },
  plugins: [],
};
