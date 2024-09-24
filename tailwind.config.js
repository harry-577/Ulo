/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {
      width: {
        30: "7.5rem", // 120px
        34: "9rem", // 136px
      },
    },
  },
  plugins: [],
};
