module.exports = {
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-essentials', {
    /**
     * Fix Storybook issue with PostCSS@8
     * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
     */
    name: '@storybook/addon-postcss',
    options: {
      postcssLoaderOptions: {
        implementation: require('postcss'),
      },
    },
  },],
  babel: async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      require.resolve('@babel/plugin-transform-react-jsx'),
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
    ]
  }),
  webpackFinal: (config) => {
    config.resolve.modules.push(`${process.cwd()}/src`)
    return config
  }
}
