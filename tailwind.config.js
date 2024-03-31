/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito'],
        'dana': ['Dana']
      }
    },
  },
  "plugins": ["prettier-plugin-tailwindcss"],
}