import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/reuse/**/*.{js,js,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        //prettier-ignore
        "bg": "#292929",
        "container-bg": "#4D4D4D",
        "light-font": "#898989",
        //prettier-ignore
        "font": "#FFFFFF",
        //prettier-ignore
        "test": "lightblue",
      },
      boxShadow: {
        custom: "10px 10px 57px -16px rgba(0,0,0,0.75)",
      },
      height: {
        "screen-mobile": "100dvh",
        "screen-desktop": "100vh",
      },
      minHeight: {
        "screen-mobile": "100dvh",
        "screen-desktop": "100vh",
      },
    },
  },
  plugins: [],
};
export default config;
