module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: {
          600: "#ea580c",
        },
        amber: {
          500: "#f59e0b",
          600: "#d97706",
        },
        neutral: {
          600: "#404040",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
