/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

const screens = { ...defaultTheme.screens, sm: '360px', xl: '1300px' };

module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    screens,
    colors: {
      primaryText: '#000000',
      white: '#fff',
      grey_10: 'rgba(0, 0, 0, 0.10)',
      grey_60: 'rgba(0, 0, 0, 0.60)',
      grey_40: 'rgba(0, 0, 0, 0.40)',
      background: '#F0F0F0',
      main_red: '#FF3333',
      light_red: 'rgba(255, 51, 51, 0.10)',
    },
    container: {
      center: true,
      padding: '16px',
      screens: {
        sm: '392px',
        md: '768px',
        xl: '1300px',
      },
    },
  },
  plugins: [],
};
