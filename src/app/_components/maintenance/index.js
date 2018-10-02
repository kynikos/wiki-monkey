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
const {upgradeNow} = require('../../../modules/Upgrade')


module.exports = {
  name: 'Maintenance',

  render(h) {
    return h('ul', [
      h('li', [
        h('a', {
          attrs: {
            href: '#force-check-updates',
            title: 'Force checking for Wiki Monkey updates and possibly \
prompt to install them (Wiki Monkey checks for updates \
regularly as specified in its configuration)',
          },
          on: {
            click: (event) => {
              event.preventDefault()
              upgradeNow()
            },
          },
        }, ['Force Wiki Monkey update']),
      ]),
      h('li', [
        h('a', {
          attrs: {
            href: '#force-upgrade-database',
            title: 'Force upgrading the database to the latest revision, if \
needed',
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
            title: 'Display some database metadata',
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
