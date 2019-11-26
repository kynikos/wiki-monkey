/* eslint-env node */
/* eslint-disable no-sync,no-await-in-loop,no-process-env */
const path = require('path')

// https://jestjs.io/docs/en/configuration.html

module.exports = {
  bail: 1,
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    // Keep in sync with Webpack's resolve.alias
    '^%$': path.resolve(__dirname, 'client', 'src'),
    // https://jestjs.io/docs/en/webpack
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/fileMock.js',
    '\\.(css|less|sass)$': '<rootDir>/tests/styleMock.js',
    // Keep modules that require to be transpiled with babel-just in sync with
    // Webpack's Babel configuration
    // '^@kynikos/example$': 'babel-jest',
  },
  testRegex: [
    '\\.test\\.js$',
  ],
}
