import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";
import daisyui from "daisyui";
import flowbite from "flowbite/plugin";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tailwindcss/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind UI components are detected
    "./node_modules/daisyui/**/*.js", // DaisyUI support
    "./node_modules/flowbite-react/**/*.js", // Flowbite support
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Main Theme Color (Indigo-600)
        secondary: "#6366F1", // Accent Color (Indigo-500)
        background: "#F8FAFC", // Light Background (Gray-100)
        textPrimary: "#1E293B", // Dark Text (Gray-900)
        textSecondary: "#475569", // Muted Text (Gray-600)
        accent: "#EC4899", // Call-to-Action (Pink-500)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern UI Font
        serif: ["Merriweather", "serif"], // Elegant Font
      },
      screens: {
        xs: "375px", // Extra small devices
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
      boxShadow: {
        soft: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        strong: "0px 6px 15px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [forms, typography, aspectRatio, daisyui, flowbite],
  darkMode: "class", // Enables dark mode via a class toggle
};

export default config;
