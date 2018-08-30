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

const WM = require('./index')


module.exports = class exports {
  constructor() {}

  getEndTimestamp(call, callArgs) {
    const title = mw.config.get('wgPageName')
    const diff = mw.config.get('wgDiffNewId')
    const oldid = mw.config.get('wgDiffOldId')

    const giveEndTimestamp = (page, id) => call(page.revisions[id].timestamp, callArgs)

    switch (diff) {
    case 'next':
      var pars = {
        prop: 'revisions',
        titles: title,
        rvlimit: '2',
        rvprop: 'timestamp',
        rvdir: 'newer',
        rvstartid: oldid,
      }
      return WM.MW.callQuery(
        pars,
        giveEndTimestamp,
        1,
        null
      )
    case 'prev':
      pars = {
        prop: 'revisions',
        revids: oldid,
        rvprop: 'timestamp',
      }
      return WM.MW.callQuery(
        pars,
        giveEndTimestamp,
        0,
        null
      )
    default:
      pars = {
        prop: 'revisions',
        revids: diff,
        rvprop: 'timestamp',
      }
      return WM.MW.callQuery(
        pars,
        giveEndTimestamp,
        0,
        null
      )
    }
  }
}
