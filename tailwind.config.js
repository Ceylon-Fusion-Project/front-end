// tailwind.config.js
const { brandColors, brandFonts } = require("./src/theme"); 
// or "./src/theme.cjs"

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...brandColors,
      },
      fontFamily: {
        ...brandFonts,
      },
    },
  },
  plugins: [],
};
