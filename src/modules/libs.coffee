# Wiki Monkey - MediaWiki bot and editor-assistant user script
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

require('babel-polyfill')

# jQuery is provided globally by MediaWiki

module.exports.init = ->
    Vue = require('vue')
    Vuex = require('vuex')
    Vue.use(Vuex)
    module.exports = {Vue, Vuex}

    module.exports.hh = hh = require('hyperscript-helpers')(
        require('hyperscript'))
    for tag, helper of hh
        # TODO: This can be simplified after
        #       https://github.com/ohanhi/hyperscript-helpers/pull/46
        #       is released
        hh[tag.charAt(0).toUpperCase() + tag.slice(1)] = helper

    module.exports.moment = require('moment')

    jss = require('jss').default
    jss.setup(require('jss-preset-default').default())
    jssopts = {classNamePrefix: "WikiMonkey-"}

    module.exports.jssc = (style) ->
        jss.createStyleSheet(style, jssopts).attach()

    module.exports.styled = require('@kynikos/vue-styled-jss')(jss, jssopts)

    module.exports.ClipboardJS = require('clipboard')

    language = require('element-ui/lib/locale/lang/en').default
    locale = require('element-ui/lib/locale').default
    locale.use(language)
    require('../app/element.sass')
    Vue.use(require('element-ui/lib/option').default)
    Vue.use(require('element-ui/lib/select').default)
    Vue.use(require('element-ui/lib/table').default)
    Vue.use(require('element-ui/lib/table-column').default)
