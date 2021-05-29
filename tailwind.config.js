module.exports = {
  purge: {
      enable: true,
      content: [
          './dist/**/*.html',
          './dist/**/*.js',
          '/dist/index.html',
          '/dist/script.js'
      ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
