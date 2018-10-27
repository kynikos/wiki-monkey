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
const {h: hh} = require('../../../modules/libs')


module.exports.ServerInfo = {
  name: 'ServerInfo',

  render(h) {
    return h('li', [
      h('a', {
        attrs: {
          href: '#server-info',
          title: 'Display some server (wiki-snake) and database metadata.',
        },
        on: {
          click: (event) => {
            event.preventDefault()

            WM.DB.get('maintenance/info').done((data) => {
              return mw.notification.notify(
                [
                  hh('p', {
                    style: {'white-space': 'nowrap'},
                  }, `Server version: ${data.version}`),
                  hh('p', {
                    style: {'white-space': 'nowrap'},
                  }, `Database revision: ${data.database_revision}`),
                ],
                {
                  autoHide: false,
                  tag: 'WikiMonkey-server-info',
                  title: 'Wiki Monkey server (wiki-snake) information.',
                  type: 'info',
                },
              )
            })
          },
        },
      }, ['Server information']),
    ])
  },
}
