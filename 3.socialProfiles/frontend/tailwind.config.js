/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/button/button.html",
    "./src/main.js"
  ],
  theme: {
    extend: {
      colors: {
        green: "hsl(75, 94%, 57%)",
        white: "hsl(0, 0%, 100%)",
        gray700: "hsl(0, 0%, 20%)",
        gray800: "hsl(0, 0%, 12%)",
        gray900: "hsl(0, 0%, 8%)"
      },
      fontSize: {
        sm: "14px",
        lg: "18px",
      },
      fontWeight: {
        reg: 400,
        semi: 600,
        bold: 700,
      },
      width: {
        'custom-325': '325px'
      }
    },
  },
  plugins: [],
}