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
const store = require('../store')
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


module.exports = function ({pageType, Plugins, display, displayLog, nextNode}) { // eslint-disable-line max-lines-per-function
  store.commit('fieldset/show', display)
  store.commit('log/show', displayLog)

  const root = document.createElement('div')
  $(nextNode).before(root)

  return new Vue({
    el: root,

    store,

    computed: {
      ...Vuex.mapState('log', {
        logShown: 'display',
      }),
      ...Vuex.mapState('filter', [
        'selectedPluginIndex',
        'selectedPluginInstance',
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
        return this.selectedPluginInstance[`main_${pageType}`]()
      },
    },

    created() {
      for (let index = 0; index < Plugins.length; index++) {
        const Plugin = Plugins[index]
        if (Plugin.constructor.name ===
                        WM.conf[`default_${pageType}_plugin`]) {
          this.selectPlugin([index, new Plugin()])
          break
        }
      }
      if (!this.selectedPluginInstance) {
        return this.selectPlugin([0, new Plugins[0]()])
      }
    },

    render(h) { // eslint-disable-line max-lines-per-function
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
              return this.selectPlugin([index, new Plugins[index]()])
            },
          },
        },
        Plugins.map((Plugin, ii) => {
          return h('option', {
            attrs: {
              selected: ii === this.selectedPluginIndex,
            },
          }, [Plugin.prototype.conf.filter_label])
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
            if (this.logShown) { return this.hideLog() } return this.showLog()
          },
        },
      })

      const commandsFilterDiv = h(Commands, [
        selectFilter,
        applyFilter,
        toggleLog,
        h('span', ['Show log']),
      ])

      const {makeUI} = this.selectedPluginInstance
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
      if (this.enabled && WM.conf[`default_${pageType}_plugin_autoexecute`]) {
        this.executePlugin()

        if (!this.$refs.pluginUI) {
          this.hideUI()
        }
      }
    },
  })
}
