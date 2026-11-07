/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0d0d0d',
          card: '#141414',
          surface: '#1c1c1c',
          border: '#2a2a2a',
          orange: '#FF6600',
          'orange-hover': '#FF771A',
          'orange-glow': 'rgba(255, 102, 0, 0.3)',
          gray: '#9ca3af',
          lightgray: '#d1d5db',
        }
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        subheading: ['"Montserrat"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'checkered': "repeating-conic-gradient(rgba(255, 255, 255, 0.03) 0% 25%, transparent 0% 50%) 50% / 20px 20px",
        'radial-glow': "radial-gradient(circle at 50% 50%, rgba(255, 102, 0, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        'orange-sm': '0 2px 10px rgba(255, 102, 0, 0.2)',
        'orange-md': '0 4px 20px rgba(255, 102, 0, 0.35)',
        'orange-lg': '0 10px 30px rgba(255, 102, 0, 0.45)',
      }
    },
  },
  plugins: [],
};

