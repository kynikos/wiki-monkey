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
const {asciiSpinner} = require('../asciiSpinner')
const {ServerUpgrade} = require('./ServerUpgrade')


module.exports.ServerInfo = {
  name: 'ServerInfo',

  data() {
    return {
      databaseRevision: null,
    }
  },

  methods: {
    getInfo() {
      // Show the spinner in place of the current value
      this.databaseRevision = null

      return WM.DB.get('maintenance/info').done((data) => {
        this.databaseRevision = data.database_revision
      })
    },
    setDatabaseRevision(databaseRevision) {
      this.databaseRevision = databaseRevision
    },
  },

  created() {
    WM.serverUrl && this.getInfo()
  },

  render(h) {
    return WM.serverUrl
      ? h('li', [
        'Database revision: ',
        this.databaseRevision
          ? [
            this.databaseRevision,
            ' (',
            // For the moment it's pointless to also offer a refresh link
            // h('a', {
            //   attrs: {
            //     href: '#server-info-refresh',
            //     title: 'Refresh server and database metadata.',
            //   },
            //   on: {
            //     click: (event) => {
            //       event.preventDefault()
            //       this.getInfo()
            //     },
            //   },
            // }, ['refresh']),
            h(ServerUpgrade, {props: {
              setDatabaseRevision: this.setDatabaseRevision,
            }}),
            ')',
          ]
          : [
            h(asciiSpinner),
          ],
      ])
      : null
  },
}
