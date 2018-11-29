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

const {ClientInfo} = require('./ClientInfo')
const {ServerInfo} = require('./ServerInfo')


module.exports = {
  name: 'About',

  render(h) {
    return h('div', [
      h('p', [
        'Wiki Monkey is distributed under the ',
        h('a', {attrs: {
          href: 'https://www.gnu.org/licenses/gpl-3.0.en.html',
        }}, ['GNU General Public License version 3']),
        '.',
      ]),
      h('p', [
        h('a', {attrs: {
          href: 'https://github.com/kynikos/wiki-monkey/wiki',
        }}, ['Documentation']),
      ]),
      h('h2', ['Client']),
      h(ClientInfo),
      h('h2', ['Server']),
      h(ServerInfo),
    ])
  },
}
