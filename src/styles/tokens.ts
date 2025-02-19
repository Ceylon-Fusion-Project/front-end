export const tokens = {
  colors: {
    primary: "blue-500",
    primaryDark: "blue-600",
    secondary: "amber-500",
    secondaryDark: "amber-600",
    background: "white",
    text: "gray-800",
    textLight: "gray-500",
    border: "gray-200",
  },
  fonts: {
    body: "roboto",
    heading: "roboto",
  },
  fontSizes: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  },
  spacing: {
    1: "p-1",
    2: "p-2",
    3: "p-3",
    4: "p-4",
    5: "p-5",
    6: "p-6",
    8: "p-8",
    10: "p-10",
    12: "p-12",
  },
  borderRadius: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  },
  borders: {
    thin: "border border-gray-300",
    medium: "border-2 border-gray-500",
    thick: "border-4 border-gray-700",
  },
  shadows: {
    small: "shadow-sm",
    medium: "shadow-md",
    large: "shadow-lg",
  },
  transitions: {
    fast: "transition duration-200 ease-in-out",
    normal: "transition duration-300 ease-in-out",
    slow: "transition duration-500 ease-in-out",
  },
}

export type Tokens = typeof tokens
