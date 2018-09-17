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

const {jssc} = require('../../modules/libs')
const WM = require('../../modules')


module.exports = class {
  constructor(conf) {
    const {classes} = jssc({
      fixBacklinkFragments: {
        '& input[type=\'text\']': {
          marginLeft: '0.33em',
        },
      },
    })

    const divMain = document.createElement('div')
    divMain.id = 'WikiMonkey-FixBacklinkFragments'
    divMain.className = classes.fixBacklinkFragments

    const label = document.createElement('span')
    label.innerHTML = 'Target page:'
    divMain.appendChild(label)

    const target = document.createElement('input')
    target.setAttribute('type', 'text')
    target.id = 'WikiMonkey-FixBacklinkFragments-Target'

    if (WM.WhatLinksHere.isWhatLinksHerePage()) {
      target.value = WM.WhatLinksHere.getTitle()
    }

    divMain.appendChild(target)

    return divMain
  }
}
