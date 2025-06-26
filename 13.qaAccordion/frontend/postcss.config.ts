import purgecss from '@fullhuman/postcss-purgecss';

module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    purgecss({
      content: ['./src/**/*.{html,ts}'],
      defaultExtractor: content => content.match(/[\w-/:.]+(?<!:)/g) || [],
    })
  ]
};