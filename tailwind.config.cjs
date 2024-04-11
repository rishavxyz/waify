/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        aurora: {

          "primary": "#fdba74",
          
          "secondary": "#e879f9",

          "accent": "#fca5a5",

          "neutral": "#818cf8",

          "base-100": "#111827",

          "info": "#0093f3",

          "success": "#22c55e",

          "warning": "#f59e0b",

          "error": "#dc2626",
        },
      },
    ],
    darkTheme: "aurora", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  }
};

module.exports = config;