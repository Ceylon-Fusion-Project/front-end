// tailwind.config.js
const { brandColors, brandFonts } = require("./src/theme"); 
// or "./src/theme.cjs"

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...brandColors,
        secondary: brandColors.secondary,
        background: brandColors.background,
        textPrimary: brandColors.textPrimary,
        accent: brandColors.accent,
        highlight: brandColors.highlight,
      },
      fontFamily: {
        ...brandFonts,
      },
    },
  },
  plugins: [],
};
