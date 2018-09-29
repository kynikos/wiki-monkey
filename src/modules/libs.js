// Wiki Monkey - MediaWiki bot and editor-assistant user script
// Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
//
// This file is part of Wiki Monkey.
//
// Wiki Monkey is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Wiki Monkey is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

require('babel-polyfill')

// JQuery is provided globally by MediaWiki

module.exports.init = function () { // eslint-disable-line max-statements
  /* eslint-disable global-require */
  const Vue = require('vue')
  const Vuex = require('vuex')
  Vue.use(Vuex)
  module.exports = {Vue, Vuex}

  module.exports.h = require('hyperscript')

  module.exports.moment = require('moment')

  const jss = require('jss').default
  jss.setup(require('jss-preset-default').default())
  const jssopts = {classNamePrefix: 'WikiMonkey-'}

  module.exports.jssc = (style) => jss.createStyleSheet(style, jssopts).attach()

  module.exports.styled = require('@kynikos/vue-styled-jss')(jss, jssopts)

  // Clipboard.js doesn't import well with Browserify
  // https://github.com/zenorocha/clipboard.js/issues/535
  // module.exports.ClipboardJS = require('clipboard')
  module.exports.ClipboardJS = require('clipboard/dist/clipboard.min')

  const language = require('element-ui/lib/locale/lang/en').default
  const locale = require('element-ui/lib/locale').default
  locale.use(language)
  require('../app/element.sass')
  Vue.use(require('element-ui/lib/button').default)
  Vue.use(require('element-ui/lib/loading').default)
  Vue.use(require('element-ui/lib/option').default)
  Vue.use(require('element-ui/lib/popover').default)
  Vue.use(require('element-ui/lib/select').default)
  Vue.use(require('element-ui/lib/table').default)
  Vue.use(require('element-ui/lib/table-column').default)
  /* eslint-enable global-require */
}
