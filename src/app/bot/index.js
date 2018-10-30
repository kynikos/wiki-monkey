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

const WM = require('../../index')
const {Vue, Vuex} = require('../../modules/libs')
const Fieldset = require('../_components/fieldset')
const Bot = require('./Bot')


module.exports = class {
  static plugins = []

  static installPlugin(plugin, run, makeUI) {
    this.plugins.push([plugin, run, makeUI])
  }

  constructor({lists, display, displayLog, nextNode}) {
    WM.App.store.commit('fieldset/show', display)
    WM.App.store.commit('log/show', displayLog)

    const root = document.createElement('div')
    $(nextNode).before(root)

    const ui = new Bot(this.constructor.plugins, lists)

    return new Vue({
      el: root,

      store: WM.App.store,

      computed: Vuex.mapState('fieldset', {
        fieldsetDisplayed: 'display',
      }),

      render(h) {
        // Referencing fieldsetDisplayed seems to be the only way to make
        // this component react to its changes
        this.fieldsetDisplayed

        return h(Fieldset, [
          h('div', {
            attrs: {id: 'WikiMonkeyBot'},
            ref: 'container',
          }),
        ])
      },

      mounted() {
        return $(this.$refs.container).append(ui.elems)
      },

      updated() {
        // Needed when showing/hiding the main fieldset
        return $(this.$refs.container).append(ui.elems)
      },
    })
  }
}
