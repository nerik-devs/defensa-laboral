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
          50: '#f4f7fa',
          100: '#e3eaf2',
          200: '#c5d5e6',
          300: '#9ab6d3',
          400: '#6890bd',
          500: '#436f9e',
          600: '#315682',
          700: '#28466a',
          800: '#243d5b',
          900: '#21334b', // Deep Navy
          950: '#162233',
        },
        // Alias para compatibilidad con componentes existentes
        primary: {
          50: '#f4f7fa',
          100: '#e3eaf2',
          200: '#c5d5e6',
          300: '#9ab6d3',
          400: '#6890bd',
          500: '#436f9e',
          600: '#315682',
          700: '#28466a',
          800: '#243d5b',
          900: '#21334b',
          950: '#162233',
        },
        gold: {
          50: '#fbf9eb',
          100: '#f5f0ce',
          200: '#ebde9e',
          300: '#dec466',
          400: '#d1ab3d',
          500: '#b88f28', // Rich Gold
          600: '#996f20',
          700: '#7a541d',
          800: '#66451f',
          900: '#563a1f',
          950: '#311e0e',
        },
        // Alias para compatibilidad con componentes existentes
        accent: {
          50: '#fbf9eb',
          100: '#f5f0ce',
          200: '#ebde9e',
          300: '#dec466',
          400: '#d1ab3d',
          500: '#b88f28',
          600: '#996f20',
          700: '#7a541d',
          800: '#66451f',
          900: '#563a1f',
          950: '#311e0e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'], // Adding serif for headers
      },
      boxShadow: {
        'glow': '0 0 20px rgba(184, 143, 40, 0.3)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
