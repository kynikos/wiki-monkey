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

const {Vuex} = require('../modules/libs')
const fieldset = require('./_components/fieldset/store')
const log = require('./_components/log/store')
const main = require('./mainTabs/store')
const bot = require('./bot/store')
const filter = require('./filter/store')
const menu = require('./menu/store')

module.exports = class Store {
  static plugins = {}

  static installPlugin(pluginName, pluginStore) {
    if (pluginName in this.plugins) {
      throw new Error(`Duplicated store module: ${pluginName}`)
    }
    this.plugins[pluginName] = pluginStore
  }

  constructor() {
    this.vstore = new Vuex.Store({
      actions: {
        hideContent() {
          return $('#bodyContent').hide()
        },

        showContent() {
          return $('#bodyContent').show()
        },
      },

      modules: {
        fieldset,
        log,
        main,
        bot,
        filter,
        menu,
        plugins: {
          namespaced: true,
          modules: this.constructor.plugins,
        },
      },
    })
  }
}
