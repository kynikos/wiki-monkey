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

const WM = require('../../../modules')
const {Vue, Vuex} = require('../../../modules/libs')


module.exports = {
  name: 'Maintenance',

  render(h) {
    return h('ul', [
      h('li', [
        h('a', {
          attrs: {
            href: '#force-upgrade-database',
            title: 'Force database upgrade',
          },
          on: {
            click: (event) => {
              event.preventDefault()

              WM.DB.post('maintenance/upgrade_database').done((data) => {
                console.debug('RESPONSE:', data) // TODO
              })
            },
          },
        }, ['Force database upgrade']),
      ]),
      h('li', [
        h('a', {
          attrs: {
            href: '#info',
            title: 'Read some database metadata',
          },
          on: {
            click: (event) => {
              event.preventDefault()

              WM.DB.get('maintenance/database_info').done((data) => {
                console.debug('RESPONSE:', data) // TODO
              })
            },
          },
        }, ['Database information']),
      ]),
    ])
  },
}
