// tailwind.config.js

module.exports = {
   content: [],
   content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
    extend: {
      fontFamily: {
        sans: ['Metropolis', 'ui-sans-serif', 'system-ui'],
        bold: ['Metropolis-Bold', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
    plugins: [],
  }