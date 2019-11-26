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


module.exports = class {
  constructor(conf, title, callBot, chainArgs) {
    title = title.replace(' (page does not exist)', '')

    return WM.MW.callQuery(
      {
        prop: 'info',
        intoken: 'edit',
        titles: title,
      },
      this.mainAutoWrite,
      [title, callBot],
      null
    )
  }

  mainAutoWrite(page, args) {
    const title = args[0]
    const callBot = args[1]

    const {edittoken} = page

    const language = WM.ArchWiki.detectLanguage(title)[1]

    if (language !== WM.ArchWiki.getLocalLanguage()) {
      const text = `[[Category:${language}]]`
      const summary = 'wanted category'

      return WM.MW.callAPIPost(
        {
          action: 'edit',
          bot: '1',
          title,
          summary,
          text,
          createonly: '1',
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
