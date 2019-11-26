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
const _Run = require('./_Run')


module.exports = class extends _Run {
  constructor(conf, title, callBot, chainArgs) {
    super()
    this.conf = conf
    const summary = this.conf.edit_summary
    return WM.MW.callQueryEdit(
      title,
      this.mainAutoReplace,
      [summary, callBot]
    )
  }

  mainAutoReplace(title, source, timestamp, edittoken, args) {
    const summary = args[0]
    const callBot = args[1]

    return this.doUpdate(
      source,
      this.mainAutoWrite,
      [title, edittoken, timestamp, summary, callBot]
    )
  }

  mainAutoWrite(source, newtext, args) {
    const title = args[0]
    const edittoken = args[1]
    const timestamp = args[2]
    const summary = args[3]
    const callBot = args[4]

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
