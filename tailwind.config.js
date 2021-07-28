const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        slide: "slide 3s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": {
            "margin-left": "-25%",
            width: "25%",
          },
          "50%": {
            "margin-left": "25%",
            width: "50%",
          },
          "100%": {
            "margin-left": "100%",
            width: "25%",
          },
        },
      },
      fontFamily: {
        branding: ["quicksand", "sans-serif"],
        body: ["Inter", "Arial", "sans-serif"],
      },
      colors: {
        gray: colors.blueGray,
        primary: colors.emerald,
        error: colors.rose,
        warning: colors.amber,
        info: colors.blue,
        smoke: {
          darkest: "rgba(0, 0, 0, 0.9)",
          darker: "rgba(0, 0, 0, 0.75)",
          dark: "rgba(0, 0, 0, 0.6)",
          default: "rgba(0, 0, 0, 0.5)",
          light: "rgba(0, 0, 0, 0.4)",
          lighter: "rgba(0, 0, 0, 0.25)",
          lightest: "rgba(0, 0, 0, 0.1)",
        },
      },
      margin: {
        "-1/4": "-25%",
        "-full": "-100%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
