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
const {ServerInfo} = require('./ServerInfo')
const {ServerUpgrade} = require('./ServerUpgrade')


module.exports = {
  name: 'Maintenance',

  render(h) {
    return h('ul', [
      h('li', [
        h('a', {
          attrs: {
            href: '#import-local-config',
            title: "Import configuration options (in JSON format) into the \
browser's localStorage; these options override the default ones, but may be \
in turn overridden by any more options specified in the User's common.js page",
          },
          on: {
            // TODO (Possibly validate the file, e.g. check that it has
            //      the root #default or UserName keys)
            click: (event) => {
              event.preventDefault()
              console.debug('TODO')
            },
          },
        }, ['Import local user configuration']),
      ]),
      h('li', [
        h('a', {
          attrs: {
            href: '#view-local-config',
            title: "View, and possibly download/export/save, the \
configuration options (in JSON format) that may have been imported and saved \
in the browser's localStorage",
          },
          on: {
            // TODO (Use WikiMonkey.makeLocalConfig())
            click: (event) => {
              event.preventDefault()
              console.debug('TODO')
            },
          },
        }, ['View local user configuration']),
      ]),
      h('li', [
        h('a', {
          attrs: {
            href: '#view-computed-config',
            title: 'View, and possibly download/export/save, the \
configuration options (in JSON format) in the final, used form, as they are \
computed after parsing all the progressively overriding configuration sources',
          },
          on: {
            // TODO
            click: (event) => {
              event.preventDefault()
              console.debug('TODO')
            },
          },
        }, ['View computed configuration']),
      ]),
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
      h(ServerInfo),
      h(ServerUpgrade),
    ])
  },
}
