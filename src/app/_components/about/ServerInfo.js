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
const {ServerUpgrade} = require('./ServerUpgrade')


module.exports.ServerInfo = {
  name: 'ServerInfo',

  data() {
    return {
      expanded: false,
      version: null,
      databaseRevision: null,
    }
  },

  methods: {
    getInfo() {
      return WM.DB.get('maintenance/info').done((data) => {
        this.version = data.version
        this.databaseRevision = data.database_revision
        this.expand()
      })
    },
    expand() {
      this.expanded = true
    },
    collapse() {
      this.expanded = false
    },
  },

  render(h) {
    if (!WM.serverUrl) return null

    return h('li', [
      h('a', {
        attrs: {
          href: '#server-info',
          title: this.expanded
            ? 'Hide server and database metadata.'
            : 'Display some server and database metadata.',
        },
        on: {
          click: (event) => {
            event.preventDefault()
            if (this.expanded) {
              this.collapse()
            } else {
              this.version == null ? this.getInfo() : this.expand()
            }
          },
        },
      }, ['Server information']),
      ...this.expanded && [
        ' (',
        h('a', {
          attrs: {
            href: '#server-info-refresh',
            title: 'Refresh server and database metadata.',
          },
          on: {
            click: (event) => {
              event.preventDefault()
              this.getInfo()
            },
          },
        }, ['refresh']),
        ')',
        h('ul', [
          h('li', ['Version: ', this.version]),
          h('li', [
            'Database revision: ', this.databaseRevision,
            ' (', h(ServerUpgrade), ')',
          ]),
        ]),
      ],
    ])
  },
}
