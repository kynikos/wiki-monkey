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

const WM = require('%/index')
const colors = require('../styled/colors')


module.exports.Plugins = {
  name: 'Plugins',

  data() {
    return {
      listShown: false,
    }
  },

  methods: {
    showList() {
      this.listShown = true
    },
    hideList() {
      this.listShown = false
    },
  },

  render(h) {
    return h('li', [
      h('a', {
        attrs: {
          href: '#list-installed-plugins',
          title: 'List the installed Wiki Monkey plugins and show whether \
they are enabled or disabled.',
        },
        on: {
          click: (event) => {
            event.preventDefault()
            this.listShown ? this.hideList() : this.showList()
          },
        },
      }, ['Installed plugins']),
      this.listShown && h('ul', [
        h('li', [
          h('span', {style: {color: colors.greenText}}, ['enabled']),
          h('ul', [
            WM.enabledPlugins.map((plugin) => {
              return h('li', [plugin.constructor.pluginName])
            }),
          ]),
        ]),
        h('li', [
          h('span', {style: {color: colors.redText}}, ['disabled']),
          h('ul', [
            WM.disabledPlugins.map((plugin) => {
              return h('li', [
                plugin.pluginName,
                plugin.requiresServer && h('span', {
                  style: {color: colors.greyText},
                }, [' (requires server)']),
              ])
            }),
          ]),
        ]),
      ]),
    ])
  },
}
