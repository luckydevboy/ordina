/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"],
      },
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // blue-700
          hover: "#2563EB", // blue-600,
          focus: "#2563EB", // blue-600
        },
        secondary: {
          DEFAULT: "#FFFFFF", // white
          text: "#1F2937", // gray-800
          border: "#D1D5DB", // gray-400
          hover: "#F3F4F6", // gray-100
        },
        soft: {
          DEFAULT: "#EFF6FF", // blue-50
          text: "#1D4ED8", // blue-700
          hover: "#DBEAFE", // blue-100
        },
        gray: {
          DEFAULT: "#D1D5DB", // gray-300
          dark: "#1F2937", // gray-800
          light: "#F3F4F6", // gray-100
          text: "#6B7280", // gray-400
        },
        red: {
          light: "#FCA5A5", // red-300
          text: "#F87171", // red-400
        },
        modal: {
          background: "#FFFFFF", // white
          overlay: "rgba(0, 0, 0, 0.5)", // black/50
          closeIcon: "#737373", // zinc-500
          border: "#E4E4E7", // zinc-200
        },
      },
    },
  },
  plugins: [],
};
