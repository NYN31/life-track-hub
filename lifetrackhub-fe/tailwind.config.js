/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode via class strategy
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '10px',
        xs: '11px',
        sm: '13px',
        base: '14px',
        lg: '15px',
        xl: '16px',
        '2xl': '18px',
        '3xl': '20px',
        '4xl': '24px',
        '5xl': '30px',
        '6xl': '36px',
        '7xl': '48px',
        '8xl': '64px',
        '9xl': '72px',
        '10xl': '96px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // body text
        heading: ['Playfair Display', 'serif'], // headings
      },
    },
    screens: {
      sm: '576px',
      'sm-max': { max: '576px' },
      md: '768px',
      'md-max': { max: '768px' },
      lg: '992px',
      'lg-max': { max: '992px' },
      xl: '1200px',
      'xl-max': { max: '1200px' },
      '2xl': '1320px',
      '2xl-max': { max: '1320px' },
      '3xl': '1600px',
      '3xl-max': { max: '1600px' },
      '4xl': '1850px',
      '4xl-max': { max: '1850px' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
