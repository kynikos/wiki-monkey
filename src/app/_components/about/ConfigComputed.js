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
const {blobLink} = require('../blobLink')


module.exports.ConfigComputed = {
  name: 'ConfigComputed',

  render(h) {
    return h('li', [
      'Final computed [ ',
      h(blobLink, {
        props: {
          href: '#view-computed-config',
          title: 'View the configuration options (in JSON format) in the \
final, used form, as they are computed after parsing all the progressively \
overriding configuration sources.',
          content: JSON.stringify(WM.makeComputedConfig(), null, 2),
          mimeType: 'application/json',
        },
      }, ['view']),
      ' | ',
      h(blobLink, {
        props: {
          href: '#view-computed-config',
          title: 'Download the configuration options (in JSON format) in \
the final, used form, as they are computed after parsing all the \
progressively overriding configuration sources.',
          content: JSON.stringify(WM.makeComputedConfig(), null, 2),
          mimeType: 'application/json',
          downloadName: 'WikiMonkeyConfig.json',
        },
      }, ['download']),
      ' ]',
    ])
  },
}
