const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'violet-950': '#2c1155',
      },
      boxShadow: {
        'inner-md':
          'inset 0 4px 6px -1px rgb(0 0 0 / 0.05), inset 0 2px 4px -2px rgb(0 0 0 / 0.1);',
      },
    },
  },
};
