/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.vue', './public/**/*.html', './src/**/*.js', './src/**/*.jsx'],
  theme: {
    extend: {
      flexBasis: {
        '1/2-gap-4': 'calc(50% - (2/3 * 1rem))',
      },
      maxHeight: {
        150: '44rem',
      },
      minHeight: {
        150: '44rem',
      },
      height: {
        150: '44rem',
      },
    },
    colors: {
      ashgray: '#D8DDEF',
      purpleCustom: '#a78bfa',
      greenCustom: '#45B69C',
      redCustom: '#EA8689',
      surface: '#f8fafc',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
