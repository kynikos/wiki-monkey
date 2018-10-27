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
const {blobLink} = require('../blobLink')


module.exports.ConfigLocal = {
  name: 'ConfigLocal',

  render(h) {
    return h('li', [
      h(blobLink, {
        props: {
          href: '#view-local-config',
          title: "View the configuration options (in JSON format) that may \
have been imported and saved in the browser's localStorage.",
          content: JSON.stringify(WM.makeLocalConfig(), null, 2),
          mimeType: 'application/json',
        },
      }, ['View']),
      ' or ',
      h(blobLink, {
        props: {
          href: '#view-local-config',
          title: "Download the configuration options (in JSON format) that \
may have been imported and saved in the browser's localStorage.",
          content: JSON.stringify(WM.makeLocalConfig(), null, 2),
          mimeType: 'application/json',
          downloadName: 'WikiMonkeyConfig.json',
        },
      }, ['download']),
      ' local user configuration',
    ])
  },
}
