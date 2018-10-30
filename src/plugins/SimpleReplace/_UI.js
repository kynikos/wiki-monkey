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

const {jssc} = require('../../lib/index')


module.exports = class {
  makeUI() {
    const {classes} = jssc({
      simpleReplace: {
        '& div': {
          marginBottom: '0.33em',
        },

        '& input[type=\'text\']': {
          marginLeft: '0.33em',
          width: '60%',
        },
      },
    })

    const divMain = document.createElement('div')
    divMain.id = 'WikiMonkey-SimpleReplace'
    divMain.className = classes.simpleReplace

    const par1 = document.createElement('div')

    const regexpLabel = document.createElement('span')
    regexpLabel.innerHTML = 'RegExp pattern:'

    const regexp = document.createElement('input')
    regexp.setAttribute('type', 'text')
    regexp.id = 'WikiMonkey-SimpleReplace-RegExp'

    const ignoreCase = document.createElement('input')
    ignoreCase.setAttribute('type', 'checkbox')
    ignoreCase.id = 'WikiMonkey-SimpleReplace-IgnoreCase'

    const ignoreCaseLabel = document.createElement('span')
    ignoreCaseLabel.innerHTML = 'i'

    par1.appendChild(regexpLabel)
    par1.appendChild(regexp)
    par1.appendChild(ignoreCase)
    par1.appendChild(ignoreCaseLabel)

    const par2 = document.createElement('div')

    const newStringLabel = document.createElement('span')
    newStringLabel.innerHTML = 'New string:'

    const newString = document.createElement('input')
    newString.setAttribute('type', 'text')
    newString.id = 'WikiMonkey-SimpleReplace-NewString'

    par2.appendChild(newStringLabel)
    par2.appendChild(newString)

    divMain.appendChild(par1)
    divMain.appendChild(par2)

    return divMain
  }
}
