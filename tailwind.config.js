/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#43f906",
                "background-light": "#f6f8f5",
                "background-dark": "#14230f",
            },
            fontFamily: {
                display: ["Plus Jakarta Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
};
