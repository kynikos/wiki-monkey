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

const WM = require('../modules')
const App = require('../app')
const {Plugin} = require('./_Plugin')

const startMark = 'START AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK-->'
const endMark = '<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK'
// Don't do "(?: <!-- associated bot: (.+?) -->)?.*$"
const regExp = /^\*.*?\[\[User:(.+?)\|.+?(?: <!-- associated bot: (.+?) -->.*)?$/u


module.exports.ArchWikiSortContacts = class ArchWikiSortContacts extends Plugin {
  // This plugin was originally based on list=allusers, but because of bug
  //  #208 it can't rely on that anymore, so it was rewritten with
  //  60bb2ac2a2dcd0b15b7aac80725c83151173eeb3
  // See also https://bbs.archlinux.org/viewtopic.php?id=192389 and
  //  https://lists.wikimedia.org/pipermail/mediawiki-l/2015-January/043850.html

  static get conf_default() {
    return {
      enabled: false,
      special_menu: ['Sort staff contacts'],
      edit_summary: 'automatically sort list according to recent activity',
      pages: [{
        title: 'ArchWiki:Administrators',
        recent_days: 30,
        inactive_limit: 30,
        inactive_message: 'The following Administrators are currently \
inactive (less than 30 edits in the last 30 days):',
      },
      {
        title: 'ArchWiki:Maintainers',
        recent_days: 30,
        inactive_limit: 10,
        inactive_message: 'The following Maintainers are currently \
inactive (less than 10 edits in the last 30 days):',
      }],
    }
  }

  main_special(callNext) {
    return this.iteratePages(-1, callNext)
  }

  iteratePages = (pageid, callNext) => { // eslint-disable-line max-statements
    pageid++
    const pconf = this.conf.pages[pageid]
    if (pconf) {
      const page = pconf.title
      const recentDays = pconf.recent_days
      const inactiveLimit = pconf.inactive_limit
      const inactiveIntro = pconf.inactive_message
      const summary = this.conf.edit_summary

      App.log.info(`Sorting ${App.log.WikiLink(page, page)} ...`)

      return WM.MW.callQueryEdit(
        page,
        this.parseList,
        [recentDays, inactiveLimit, inactiveIntro,
          summary, callNext, pageid]
      )
    } else if (callNext) {
      return callNext()
    }
  }

  parseList(title, source, timestamp, edittoken, args) { // eslint-disable-line max-statements,max-params
    const recentDays = args[0]
    const inactiveLimit = args[1]
    const inactiveIntro = args[2]
    const summary = args[3]
    const callNext = args[4]
    const pageid = args[5]

    let startList = source.indexOf(startMark)
    const endList = source.indexOf(endMark)

    if (startList > -1 && endList > -1) {
      startList += startMark.length
      const date = new Date()
      const ucstart = Math.floor(Date.now() / 1000)
      const ucend = ucstart - 86400 * recentDays
      const users = {
        active: [],
        inactive: [],
      }

      const usersArray = source.substring(startList, endList).split('\n')
      return this.iterateUsers(
        usersArray, -1, ucstart, ucend, users, title, source,
        startList, endList, timestamp, edittoken,
        inactiveLimit, inactiveIntro, summary, callNext, pageid
      )
    }
    return App.log.error('Cannot find the needed marks')
  }

  iterateUsers( // eslint-disable-line max-statements,max-params
    usersArray, index, ucstart, ucend, users,
    title, source, startList, endList, timestamp, edittoken,
    inactiveLimit, inactiveIntro, summary, callNext, pageid
  ) {
    index++

    if (index < usersArray.length) {
      const userString = usersArray[index]
      const match = regExp.exec(userString)

      if (match) {
        let ucuser = match[1].charAt(0).toUpperCase() + match[1].substr(1)

        if (match[2]) {
          ucuser += `|${match[2].charAt(0).toUpperCase()}${
            match[2].substr(1)}`
        }

        App.log.info(`Querying ${ucuser} ...`)

        return WM.MW.getUserContribs(
          ucuser, ucstart, ucend,
          this.storeUserContribs,
          [usersArray, index, ucstart, ucend, users, title, source,
            startList, endList, timestamp, edittoken, inactiveLimit,
            inactiveIntro, summary, callNext, pageid]
        )
      } else if (userString !== '' &&
                                      userString.indexOf(inactiveIntro) !== 0) {
        return App.log.error('An entry in the list may not be correctly ' +
                                                                  'formatted')
      }
      return this.iterateUsers(
        usersArray, index, ucstart, ucend, users, title,
        source, startList, endList, timestamp, edittoken,
        inactiveLimit, inactiveIntro, summary, callNext, pageid
      )
    }
    return this.updateList(
      users, title, source, startList, endList, timestamp,
      edittoken, inactiveIntro, summary, callNext, pageid
    )
  }

  storeUserContribs(results, args) { // eslint-disable-line max-statements
    const usersArray = args[0]
    const index = args[1]
    const ucstart = args[2]
    const ucend = args[3]
    const users = args[4]
    const title = args[5]
    const source = args[6]
    const startList = args[7]
    const endList = args[8]
    const timestamp = args[9]
    const edittoken = args[10]
    const inactiveLimit = args[11]
    const inactiveIntro = args[12]
    const summary = args[13]
    const callNext = args[14]
    const pageid = args[15]

    const edits = results.length

    if (edits < inactiveLimit) {
      users.inactive.push({
        text: usersArray[index],
        edits,
      })
    } else {
      users.active.push({
        text: usersArray[index],
        edits,
      })
    }

    return this.iterateUsers(
      usersArray, index, ucstart, ucend, users, title, source,
      startList, endList, timestamp, edittoken,
      inactiveLimit, inactiveIntro, summary, callNext, pageid
    )
  }

  updateList( // eslint-disable-line max-params,max-statements,max-lines-per-function
    users, title, source, startList, endList,
    timestamp, edittoken, inactiveIntro, summary, callNext, pageid
  ) {
    const sorter = function (a, b) {
      // Users must be sorted in descending order
      if (a.edits < b.edits) {
        return 1
      } else if (a.edits > b.edits) {
        return -1
      }
      return 0
    }

    users.active.sort(sorter)
    users.inactive.sort(sorter)

    let newList = '\n'

    for (var user of users.active) {
      newList += `${user.text}\n`
    }

    if (users.inactive.length > 0) {
      newList += `\n${inactiveIntro}\n\n`

      for (user of users.inactive) {
        newList += `${user.text}\n`
      }
    }

    const newText = source.substring(0, startList) + newList +
                                                      source.substring(endList)

    if (newText !== source) {
      return WM.MW.callAPIPost(
        {
          action: 'edit',
          bot: '1',
          minor: '1',
          title,
          summary,
          text: newText,
          b1asetimestamp: timestamp,
          token: edittoken,
        },
        this.writePage,
        [title, callNext, pageid],
        null
      )
    }
    App.log.info(`${App.log.WikiLink(title, title)
    } was already up to date`)
    return this.iteratePages(pageid, callNext)
  }

  writePage(res, args) {
    const title = args[0]
    const callNext = args[1]
    const pageid = args[2]

    if (res.edit && res.edit.result === 'Success') {
      App.log.info(`${App.log.WikiLink(title, title)
      } was correctly updated`)
      return this.iteratePages(pageid, callNext)
    }
    return App.log.error(`${res.error.info
    } (${res.error.code})`)
  }
}
