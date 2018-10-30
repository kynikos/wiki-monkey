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


module.exports = class SimpleReplace extends _Run {
  constructor(conf, title, callBot, chainArgs) {
    super()
    this.storeConfiguration()

    try {
      this.storeRegExp()
    } catch (exc) {
      WM.App.log.error(`Invalid pattern: ${exc}`)
      callBot(false, null)
      // Block the execution of this function
      return false
    }

    const summary = document.getElementById('WikiMonkey-SimpleReplace-Summary').value

    if (summary !== '') {
      return WM.MW.callQueryEdit(
        title,
        this.mainAutoWrite.bind(this),
        [summary, callBot]
      )
    }
    WM.App.log.error('The edit summary cannot be empty')
    return callBot(false, null)
  }

  mainAutoWrite(title, source, timestamp, edittoken, args) {
    const summary = args[0]
    const callBot = args[1]

    const newtext = source.replace(
      this.configuration.regExp,
      this.configuration.newString
    )

    if (newtext !== source) {
      return WM.MW.callAPIPost(
        {
          action: 'edit',
          bot: '1',
          title,
          summary,
          text: newtext,
          basetimestamp: timestamp,
          token: edittoken,
        },
        this.mainAutoEnd,
        callBot,
        null
      )
    }
    return callBot(0, null)
  }

  mainAutoEnd(res, callBot) {
    if (res.edit && res.edit.result === 'Success') {
      return callBot(1, null)
    } else if (res.error) {
      WM.App.log.error(`${res.error.info} (${res.error.code})`)
      return callBot(res.error.code, null)
    }
    return callBot(false, null)
  }
}
