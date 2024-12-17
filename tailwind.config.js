/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        display: ["group-hover"],
      },
      darkMode: 'selector',
    },
  },
  },
  plugins: [],
}
