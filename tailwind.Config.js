/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Important!
  theme: {
    extend: {
      fontFamily: {
        edu: ['"Edu AU VIC WA NT Pre"', 'cursive'],
        josefin: ['"Josefin Sans"', 'sans-serif'],
        lobster: ['"Lobster"', 'cursive'],
        orbitron: ['"Orbitron"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
