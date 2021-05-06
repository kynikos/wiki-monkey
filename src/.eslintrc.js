module.exports = {
  // eslint-plugin-vue needs babel-eslint inside parserOptions
  // https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error
  // 'parser': 'babel-eslint',
  env: {
    // 'node' is inherited from the parent .eslintrc
    node: false,
    browser: true,
    'shared-node-browser': true,
    es6: true,
    commonjs: true,
    jquery: true,
    es2017: true,
  },
  parserOptions: {
    // eslint-plugin-vue needs babel-eslint inside parserOptions
    // https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error
    parser: 'babel-eslint',
  },
  globals: {
    mw: true,
  },
  extends: [
    'plugin:vue/recommended',
  ],
  plugins: [
    // eslint-plugin-babel
    'babel',
  ],
  rules: {
    // 'function-paren-newline' disallows the h(Comp, ...) style
    'function-paren-newline': 'off',
    // 'babel/new-cap': 0,
    'new-cap': 'off',
    'babel/no-invalid-this': 2,
    'no-invalid-this': 'off',
    // 'babel/no-unused-expressions': 2,
    // 'babel/object-curly-spacing': 2,
    // 'babel/quotes': 2,
    // 'babel/semi': 2,
    // 'babel/valid-typeof': 2,
  },
}
