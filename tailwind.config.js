/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'screen': ['BlinkMacSystemFont', '-apple-system'],
    },
    extend: {
      fontSize: {
        'xxs': '.5rem',
        'tiny': '.66rem',
        'sm': '.80rem',
      },
      colors: {
        highlight: 'hsl(180, 20%, 55%)',
        accent: 'var(--tw-accent)',
      },
      opacity: {
        'nested': '0.025'
      },     
      keyframes: {
        rainbow: {
          '0%': { 'border-color': 'hsl(0deg 50% 50%)' },
          '12.5%': { 'border-color': 'hsl(45deg 50% 50%)' },
          '25%': { 'border-color': 'hsl(90deg 50% 50%)' },
          '37.5%': { 'border-color': 'hsl(135deg 50% 50%)' },
          '50%': { 'border-color': 'hsl(180deg 50% 50%)' },
          '62.5%': { 'border-color': 'hsl(225deg 50% 50%)' },
          '75%': { 'border-color': 'hsl(270deg 50% 50%)' },
          '87.5%': { 'border-color': 'hsl(315deg 50% 50%)' },
          '100%': { 'border-color': 'hsl(360deg 50% 50%)' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideOutTop: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }

      },
      borderRadius: {
        listItem: '3px',
        input: '4px',
      },
      animation: {
        rainbow: 'rainbow 10s linear infinite',
        slideInTop: 'slideInTop 300ms ease-in-out',
        slideOutTop: 'slideOutTop 300ms ease-in-out',
        fadeIn: 'fadeIn 300ms ease-in-out',
        fadeOut: 'fadeOut 300ms ease-in-out',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
