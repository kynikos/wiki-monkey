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

const WM = require('../../../index')
const {blobLink} = require('../blobLink')
const {ConfigServer} = require('./ConfigServer')
const {ConfigLocal} = require('./ConfigLocal')
const {ConfigComputed} = require('./ConfigComputed')


module.exports.Config = {
  name: 'Config',

  data() {
    return {
      expanded: true,
    }
  },

  methods: {
    expand() {
      this.expanded = true
    },
    collapse() {
      this.expanded = false
    },
  },

  render(h) {
    return h('li', [
      h('a', {
        attrs: {
          href: '#configuration',
          title: this.expanded
            ? 'Hide configuration menu.'
            : 'Show configuration menu.',
        },
        on: {
          click: (event) => {
            event.preventDefault()
            this.expanded ? this.collapse() : this.expand()
          },
        },
      }, ['Configuration']),
      ...this.expanded && [
        ' (in cascading order)',
        h('ul', [
          h(ConfigServer),
          h(ConfigLocal),
          h(ConfigComputed),
          Object.values(WM.unknownConfig).some((userConfig) => {
            return !$.isEmptyObject(userConfig)
          }) && h('li', [
            h(blobLink, {
              props: {
                href: '#view-server-downloaded-uknown-config',
                title: 'View the configuration options that were not \
understood by this version of Wiki Monkey.',
                content: JSON.stringify(WM.unknownConfig, null, 2),
                mimeType: 'application/json',
              },
            }, ['Unknown options']),
          ]),
        ]),
      ],
    ])
  },
}
