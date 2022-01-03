/* eslint-env node */
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const {LicenseWebpackPlugin} = require('license-webpack-plugin')
// I can't define these constants in tasks.js because if I required tasks.js
// directly here, commander.js would eat all the command-line arguments and the
// webpack-cli command wouldn't be able to read its own arguments
const {SRCDIR, SRCLOCAL, SRCPRODUCTION, DISTDIR, AUXDIR} =
  require('./tasks-const')


module.exports = function ({entry, production, minified}) {
  const srcFile = path.resolve(SRCDIR, entry)
  const {name} = path.parse(entry)
  const distFname = minified
    ? `WikiMonkey-${name}.min.js`
    : `WikiMonkey-${name}.js`

  return {
    entry: {
      index: srcFile,
    },
    output: {
      filename: distFname,
      path: production ? DISTDIR : AUXDIR,
    },
    // 'mode' also sets NODE_ENV through DefinePlugin
    mode: production ? 'production' : 'development',
    // TODO[setup]: Use a proper devtool in production
    //   https://webpack.js.org/configuration/devtool/#production
    devtool: production ? false : 'eval-source-map',
    resolve: {
      alias: {
        // Keep in sync with Jest's moduleNameMapper
        '%': path.resolve(__dirname, 'src'),
      },
    },
    optimization: {
      // If 'minified' is undefined, it defaults to true
      minimize: minified || false,
      minimizer: [
        new TerserPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/u,
          // Keep in sync with Jest's moduleNameMapper where babel-jest is
          // needed
          // If some dependencies need to be transpiled, replace 'exclude' with
          // an 'include' option like the following
          // include: ['/src', require.resolve('@kynikos/example')],
          exclude: /node_modules/u,
          use: {
            loader: 'babel-loader',
            options: {
              // Having a separate babel.config.js file, rather than including
              // Babel's configuration in package.json or webpack.config.js,
              // allows for example Jest to properly transpile the test
              // scripts before running them
              // TODO[setup]: Is cacheDirectory redundant with
              //   api.cache.forever() in babel.config.js?
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.s[ac]ss$/ui,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(?:ttf|woff|woff2)$/ui,
          type: 'asset/inline',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // NODE_ENV is automatically set by 'mode', however DefinePlugin must be
        // instantiated here
      }),
      new webpack.BannerPlugin({
        banner: `Wiki Monkey - MediaWiki bot and editor-assistant user script
Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>

This file is part of Wiki Monkey.

Wiki Monkey is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Wiki Monkey is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.`,
      }),
      new LicenseWebpackPlugin(),
    ],
  }
}
