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
const {h: hh} = require('../../../lib/index')


module.exports.ServerUpgrade = {
  name: 'ServerUpgrade',

  render(h) {
    return h('li', [
      h('a', {
        attrs: {
          href: '#force-upgrade-database',
          title: 'Force upgrading the database to the latest revision, if \
needed.',
        },
        on: {
          click: (event) => {
            event.preventDefault()

            WM.DB.post('maintenance/upgrade_database').done((data) => {
              let content
              let notificationType
              if (!data.success) {
                content = [hh('p', 'An error happened during the upgrade.')]
                notificationType = 'error'
              } else if (data.noop) {
                content = [
                  hh('p', `The database was already at the latest revision
(${data.new_revision}).`),
                ]
              } else {
                content = [
                  hh('p', 'Database successfully upgraded.'),
                  hh('p', {
                    style: {'white-space': 'nowrap'},
                  }, `Old revision: ${data.old_revision}`),
                  hh('p', {
                    style: {'white-space': 'nowrap'},
                  }, `New revision: ${data.new_revision}`),
                ]
              }

              return mw.notification.notify(
                content,
                {
                  autoHide: false,
                  tag: 'WikiMonkey-database-upgrade',
                  title: 'Wiki Monkey database upgrade.',
                  type: notificationType,
                },
              )
            })
          },
        },
      }, ['Force database upgrade']),
    ])
  },
}
