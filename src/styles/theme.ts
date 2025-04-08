/***************************
 * src/theme.ts
 ***************************/

// 1) Import the tokens
import { tokens } from "./tokens"

// 2) Define brand-specific colors, fonts, and other styles
/*
const brandColors = {
  primary: "#FFD700", // Gold color for better contrast
  secondary: "#991B1B",
  background: "#FEE2E2",
  textPrimary: "#7F1D1D",
  textSecondary: "#B91C1C",
  accent: "#FF7F7F",
  highlight: "#FF3B3B",
  link: "#2563EB", // Blue for links
}
*/
export const brandColors = {
  primary: "#c29a64",       // Used for Buttons and icons in product
  secondary: "#cdad81",     // Used for hover effects on the button product
  background: "#FFFFFF",    // Used as the section background
  textPrimary: "#4c381e",   // Used for text title
  textSecondary: "#75572e", //Used for text description
  //textButton: "#2f2312",    // Used for button text
  textButton: "#FFFFFF",
  iconPrimary: "#5e4525",
  iconSecondary: "#aa7e43",
  accent: "#291e10",        
  highlight: "#FF3B3B",     // Additional color if needed
  link: "#2563EB",
  border: "#EEEEEE",
  buttonBorder: "#291e10",
  //textSecondary: "#B91C1C",
};

export const brandBookingColors = {

};


export const brandFonts = {
  sans: ["roboto", "sans-serif"],
  serif: ["Merriweather", "serif"],
}

// New additional properties
const brandBorders = {
  thin: "1px solid #ccc",
  medium: "2px solid #991B1B",
  thick: "4px solid #7F1D1D",
}

const brandShadows = {
  small: "0 1px 3px rgba(0, 0, 0, 0.1)",
  medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
  large: "0 10px 15px rgba(0, 0, 0, 0.2)",
}

const brandTransitions = {
  fast: "0.2s ease-in-out",
  normal: "0.3s ease-in-out",
  slow: "0.5s ease-in-out",
}

// 3) Merge everything into a single `theme` object
export const theme = {
  colors: {
    ...tokens.colors,
    ...brandColors,
  },
  fonts: {
    ...tokens.fonts,
    ...brandFonts,
  },
  fontSizes: {
    ...tokens.fontSizes,
  },
  spacing: {
    ...tokens.spacing,
  },
  borderRadius: {
    ...tokens.borderRadius,
  },
  borders: {
    ...brandBorders,
  },
  shadows: {
    ...brandShadows,
  },
  transitions: {
    ...brandTransitions,
  },
}

// 4) Export the type
export type Theme = typeof theme
