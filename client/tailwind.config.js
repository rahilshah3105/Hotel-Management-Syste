/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        primary: '#F36125'
      },
      screens: {
        'sm': '576px',    // Small screens, like mobile
        'md': '768px',    // Medium screens, like tablets
        'lg': '1024px',   // Large screens, like laptops
        'xl': '1280px',   // Extra-large screens, like desktops
        '2xl': '1536px',  // Larger screens, like larger desktops or high-resolution displays
      },
    },
  },
  plugins: [],
}

