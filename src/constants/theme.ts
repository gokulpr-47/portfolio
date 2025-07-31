import { ThemeConfig } from "./types";

export const theme: ThemeConfig = {
  colors: {
    primary: "#61DAFB", // React blue
    secondary: "#339933", // Node.js green
    accent: "#E10098", // GraphQL pink
    background: {
      start: "#0a0a1a",
      end: "#1a1a2e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
      muted: "#a0a0a0",
    },
    gradients: {
      primary: "from-blue-400 to-purple-400",
      secondary: "from-blue-500 to-purple-500",
      accent: "from-green-400 to-blue-400",
    },
  },
  fonts: {
    primary: "Prompt",
    secondary: "Karla",
  },
  spacing: {
    section: "py-20 px-6",
    container: "max-w-6xl mx-auto",
  },
};

// Common gradient classes
export const gradients = {
  primary: "bg-gradient-to-r from-blue-400 to-purple-400",
  secondary: "bg-gradient-to-r from-blue-500 to-purple-500",
  accent: "bg-gradient-to-r from-green-400 to-blue-400",
  background: "bg-gradient-to-b from-blue-900 via-purple-900 to-black",
  glass: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
  card: "bg-gradient-to-br from-gray-800 to-gray-900",
};

// Common text gradients
export const textGradients = {
  primary:
    "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",
  secondary:
    "bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent",
  accent:
    "bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent",
};

// Common border styles
export const borders = {
  primary: "border border-blue-500/30",
  secondary: "border border-purple-500/30",
  accent: "border border-green-500/30",
  hover: "hover:border-blue-400/60",
};

// Common transition classes
export const transitions = {
  default: "transition-all duration-300",
  fast: "transition-all duration-200",
  slow: "transition-all duration-500",
  hover: "hover:scale-105 hover:shadow-lg",
};

// Common shadow styles
export const shadows = {
  primary: "shadow-lg shadow-blue-400/25",
  secondary: "shadow-lg shadow-purple-400/25",
  accent: "shadow-lg shadow-green-400/25",
  glow: "shadow-lg shadow-blue-400/50",
};

// Common backdrop blur styles
export const backdropBlur = {
  light: "backdrop-blur-sm",
  medium: "backdrop-blur-md",
  heavy: "backdrop-blur-lg",
};

// Common rounded corner styles
export const rounded = {
  small: "rounded-lg",
  medium: "rounded-xl",
  large: "rounded-2xl",
  full: "rounded-full",
};

// Common opacity styles
export const opacity = {
  light: "opacity-60",
  medium: "opacity-80",
  heavy: "opacity-90",
  hover: "hover:opacity-100",
};
