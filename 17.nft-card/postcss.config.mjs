// during build: 
// "@tailwindcss/postcss"
// during build-css
// {
//   postcssPlugin: 'remove-unsupported-at-rules',
//   AtRule: {
//     layer: (atRule) => atRule.remove(),
//     property: (atRule) => atRule.remove(),
//     supports: (atRule) => atRule.remove(),
//   },
// },

const config = {
  plugins: [
    "@tailwindcss/postcss"
    // {
    //   postcssPlugin: 'remove-unsupported-at-rules',
    //   AtRule: {
    //     layer: (atRule) => atRule.remove(),
    //     property: (atRule) => atRule.remove(),
    //     supports: (atRule) => atRule.remove(),
    //   },
    // },
  ],
};

export default config;
