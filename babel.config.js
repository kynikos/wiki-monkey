// Having a separate babel.config.js file, rather than including Babel's
// configuration in package.json or webpack.config.js, allows for example Jest
// to properly transpile the test scripts before running them
module.exports = function (api) {
  // TODO[setup]: Is  api.cache.forever() redundant with cacheDirectory in
  //       webpack.config.js?
  api.cache.forever()

  return {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      [
        '@babel/plugin-proposal-decorators',
        {decoratorsBeforeExport: true},
      ],
      '@babel/plugin-proposal-object-rest-spread',
    ],
  }
}
