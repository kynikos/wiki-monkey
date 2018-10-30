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

const WM = require('../../index')
const _Run = require('./_Run')


module.exports = class extends _Run {
  constructor(conf, callNext) {
    super()
    const title = WM.Editor.getTitle()
    const source = WM.Editor.readSource()
    WM.App.log.info('Updating package templates ...')
    return this.doUpdate(source, this.mainEnd, [title, callNext])
  }

  mainEnd(source, newtext, args) {
    const callNext = args[1]

    if (newtext !== source) {
      WM.Editor.writeSource(newtext)
      WM.App.log.info('Updated package templates')
    } else {
      WM.App.log.info('No automatically updatable package templates ' +
                                                                    'found')
    }

    if (callNext) {
      return callNext()
    }
  }
}
