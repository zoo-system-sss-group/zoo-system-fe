/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      cor1: "#52b343",
      cor2: "#cfffd8",
      cor3: "#36b85a",
      cor4: "#14271a",
      cor5: "#101c12",
      cor6: "#0d160f",
      cor7: "#7ea98e",
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#52b343",
          secondary: "#cfffd8",
          accent: "#14271A",
          neutral: "#7EA98E",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
