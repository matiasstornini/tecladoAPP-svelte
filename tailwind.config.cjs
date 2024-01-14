module.exports = {
  content: ['./src/routes/**/*.{svelte,js,ts}'],
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      'dark', // this will be the default light theme
      'forest',
      'valentine',
    ],
    darkTheme: 'dark' // this will be the default dark theme
  }
};
