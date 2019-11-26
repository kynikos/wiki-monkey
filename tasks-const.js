const path = require('path')

// I can't define these constants directly in tasks.js because they're also
// required by webpack.config.js, which in turn can't require the whole tasks.js
// script because it also runs commander.js, which eats all the command-line
// arguments and the webpack-cli command wouldn't be able to read its own
// arguments
module.exports = {
  SRCDIR: path.resolve(__dirname, 'src'),
  SRCLOCAL: ['local.js'],
  SRCPRODUCTION: ['ArchWiki.js', 'Wikipedia.js'],
  DISTDIR: path.resolve(__dirname, 'dist'),
  AUXDIR: path.resolve(__dirname, 'auxiliary'),
}
