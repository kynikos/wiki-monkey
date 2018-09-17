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

const WM = require('../../modules')


module.exports = class {
  constructor(conf, title, callBot, chainArgs) {
    this.conf = conf
    const summary = this.conf.edit_summary

    return WM.MW.callQuery(
      {
        prop: 'info',
        intoken: 'delete',
        titles: title,
      },
      this.mainAutoWrite,
      [title, summary, callBot],
      null
    )
  }

  mainAutoWrite(page, args) {
    const title = args[0]
    const summary = args[1]
    const callBot = args[2]

    const {deletetoken} = page

    return WM.MW.callAPIPost(
      {
        action: 'delete',
        bot: '1',
        title,
        token: deletetoken,
        reason: summary,
      },
      this.mainAutoEnd,
      [title, callBot],
      null
    )
  }

  mainAutoEnd(res, args) {
    const title = args[0]
    const callBot = args[1]

    if (!res.delete) {
      if (res.error) {
        WM.App.log.error(`${WM.App.log.WikiLink(title, title)} \
has not been deleted!\n${res.error.info} \
(${res.error.code})`)
        return callBot(res.error.code, null)
      }
      return callBot(false, null)
    }
    return callBot(1, null)
  }
}
