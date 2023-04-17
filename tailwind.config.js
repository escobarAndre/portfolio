const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./components/**/*.{vue,js}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}"
    ],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Fira Code']
            },
        },
    },
    variants: {
        extend: {}
    },
};