/** @type {import('tailwindcss').Config} */

import { createThemes } from "tw-colors";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDown: 'slideDown 150ms ease-out',
        slideUp: 'slideUp 150ms ease-in',
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        slideDown: {
          from: { height: "0px", opacity: "0" },
          to: { height: 'var(--radix-collapsible-content-height)', opacity: "1" },
        },
        slideUp: {
          from: { height: 'var(--radix-collapsible-content-height)', opacity: "1" },
          to: { height: "0px", opacity: "0" },
        },
      },
    },
    spacing: {
      "0": "0",
      "0.5": "0.5rem",
      "0.75": "0.75rem",
      "1": "1rem",
      "1.5": "1.5rem",
      "2": "2rem",
      "2.5": "2.5rem",
      "3": "3rem",
      "3.5": "3.5rem",
      "4": "4rem",
      "4.5": "4.5rem",
      "5": "5rem",
      "6": "6rem",
      "7": "7rem",
      "8": "8rem",
      "9": "9rem",
      "10": "10rem",
    },
    colors: {
      gray: {
        "100": "#F9F9F9",
        "300": "#D1D1D1",
        "500": "#717171",
        "700": "#525252",
        "900": "#212121",
      },
    },
    screens: {
      sm: "425px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontSize: {
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    fontWeight: {
      light: "300",
      regular: "400",
      "semi-bold": "500",
      bold: "700",
    },
  },
  plugins: [
    createThemes(
      {
        light: {
          gray: {
            "100-tk": "#F9F9F9",
            "300-tk": "#D1D1D1",
            "500-tk": "#717171",
            "700-tk": "#525252",
            "900-tk": "#212121",
          },
        },
        dark: {
          gray: {
            "100-tk": "#212121",
            "300-tk": "#525252",
            "500-tk": "#717171",
            "700-tk": "#D1D1D1",
            "900-tk": "#F9F9F9",
          },
        },
        normal: {
          sucess: "#04FF00",
          warning: "#EBFF00",
          fail: "#FF0000",
        },
        protanopia: {
          sucess: "#F8DB00",
          warning: "#FFF2C3",
          fail: "#8F7E1E",
        },
        deuteranopia: {
          sucess: "#FFD499",
          warning: "#FFEFDF",
          fail: "#A17700",
        },
        tritanopia: {
          sucess: "#75ECFF",
          warning: "#FFECFE",
          fail: "#FD1700",
        },
      },
      {
        produceThemeClass: (themeName) => `theme-${themeName}`,
        strict: true,
        defaultTheme: {
          light: "light",
          dark: "dark",
        },
      },
    ),
  ],
};
