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

const {Vue, Vuex, styled} = require('../../modules/libs')
const WM = require('../../modules')
const Fieldset = require('../_components/fieldset')
const Menu = require('./Menu')

const Container = styled.div({
  '& input.margin': {
    margin: '0 0.33em 0.33em 0',
  },
})


module.exports = class {
  static pluginsEditor = []

  static pluginsDiff = []

  static pluginsSpecial = []

  static installEditorPlugin(plugin, run, makeUI) {
    this.pluginsEditor.push([plugin, run, makeUI])
  }

  static installDiffPlugin(plugin, run, makeUI) {
    this.pluginsDiff.push([plugin, run, makeUI])
  }

  static installSpecialPlugin(plugin, run, makeUI) {
    this.pluginsSpecial.push([plugin, run, makeUI])
  }

  constructor({pageType, display, displayLog, nextNode}) {
    WM.App.store.commit('fieldset/show', display)
    WM.App.store.commit('log/show', displayLog)

    const root = document.createElement('div')
    $(nextNode).before(root)

    const ui = new Menu(
      {
        editor: this.constructor.pluginsEditor,
        diff: this.constructor.pluginsDiff,
        special: this.constructor.pluginsSpecial,
      }[pageType],
      {
        editor: 'editor_menu',
        diff: 'diff_menu',
        special: 'special_menu',
      }[pageType],
    )

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
          h(Container, {ref: 'container'}),
        ])
      },

      mounted() {
        return $(this.$refs.container).append(ui.mainDiv)
      },

      updated() {
        // Needed when showing/hiding the main fieldset
        return $(this.$refs.container).append(ui.mainDiv)
      },
    })
  }
}
