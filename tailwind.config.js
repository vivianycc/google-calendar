const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `text-${lbl}-400`),
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontWeight: {
      normal: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    extend: {
      fontFamily: {
        sans: ["Outfit"],
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
