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

const WM = require('../../modules')
const {Vue, Vuex, styled} = require('../../modules/libs')
const Fieldset = require('../_components/fieldset')

const Commands = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const Select = styled.select({
  flex: 'auto',
  marginRight: '1em',
})

const Button = styled.button({
  marginRight: '1em',
})

const Checkbox = styled.input({
  marginRight: '0.4em',
})


module.exports = class {
  static pluginsRecentChanges = []

  static pluginsNewPages = []

  static installRecentChangesPlugin(plugin, run, makeUI) {
    this.pluginsRecentChanges.push([plugin, run, makeUI])
  }

  static installNewPagesPlugin(plugin, run, makeUI) {
    this.pluginsNewPages.push([plugin, run, makeUI])
  }

  constructor({pageType, display, displayLog, nextNode}) {
    WM.App.store.commit('fieldset/show', display)
    WM.App.store.commit('log/show', displayLog)

    const plugins = {
      recentchanges: this.constructor.pluginsRecentChanges,
      newpages: this.constructor.pluginsNewPages,
    }[pageType]

    const defaultPlugin = WM.conf[{
      recentchanges: 'default_recentchanges_plugin',
      newpages: 'default_newpages_plugin',
    }[pageType]]

    const pluginAutoexecute = WM.conf[{
      recentchanges: 'default_recentchanges_plugin_autoexecute',
      newpages: 'default_newpages_plugin_autoexecute',
    }[pageType]]

    const root = document.createElement('div')
    $(nextNode).before(root)

    return new Vue({
      el: root,

      store: WM.App.store,

      computed: {
        ...Vuex.mapState('log', {
          logShown: 'display',
        }),
        ...Vuex.mapState('filter', [
          'selectedPluginIndex',
          'selectedPluginInstance',
          'selectedPluginRun',
          'selectedPluginMakeUI',
          'enabled',
        ]),
      },

      methods: {
        ...Vuex.mapMutations('fieldset', {
          hideUI: 'hide',
        }),
        ...Vuex.mapMutations('log', {
          showLog: 'show',
          hideLog: 'hide',
        }),
        ...Vuex.mapMutations('filter', [
          'selectPlugin',
          'disable',
        ]),
        executePlugin() {
          this.disable()
          this.selectedPluginRun()
        },
      },

      created() {
        plugins.some(([plugin, run, makeUI], index) => {
          if (plugin.constructor.name === defaultPlugin) {
            return this.selectPlugin([index, plugin, run, makeUI])
          }
          return false
        }) || this.selectPlugin([0, ...plugins[0]])
      },

      render(h) {
        let pluginUI
        const selectFilter = h(
          Select,
          {
            attrs: {
              disabled: !this.enabled,
            },
            on: {
              change: (event) => {
                const index = event.target.selectedIndex
                this.selectPlugin([index, ...plugins[index]])
              },
            },
          },
          plugins.map((plugin, ii) => {
            return h('option', {
              attrs: {
                selected: ii === this.selectedPluginIndex,
              },
            }, [plugin[0].conf.filter_label])
          })
        )

        const applyFilter = h(Button, {
          attrs: {
            disabled: !this.enabled,
          },
          on: {
            click: this.executePlugin,
          },
        }, ['Apply filter'])

        const toggleLog = h(Checkbox, {
          attrs: {
            type: 'checkbox',
            checked: this.logShown,
          },
          on: {
            change: () => {
              return this.logShown ? this.hideLog() : this.showLog()
            },
          },
        })

        const commandsFilterDiv = h(Commands, [
          selectFilter,
          applyFilter,
          toggleLog,
          h('span', ['Show log']),
        ])

        const makeUI = this.selectedPluginMakeUI
        if (makeUI instanceof Function) {
          pluginUI = h('div', {ref: 'pluginUI'}, [h(makeUI())])
        }

        return h(Fieldset, [
          h('div', [commandsFilterDiv, pluginUI]),
        ])
      },

      mounted() {
        // The component is remounted if the interface is hidden and then
        // shown again, but the plugin shouldn't be executed again if it's
        // disabled
        if (this.enabled && pluginAutoexecute) {
          this.executePlugin()

          if (!this.$refs.pluginUI) {
            this.hideUI()
          }
        }
      },
    })
  }
}
