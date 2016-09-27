# Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.


class module.exports.ArchWikiSortContacts
    constructor: (@WM) ->

    # This plugin was originally based on list=allusers, but because of bug
    #  #208 it can't rely on that anymore, so it was rewritten with
    #  60bb2ac2a2dcd0b15b7aac80725c83151173eeb3
    # See also https://bbs.archlinux.org/viewtopic.php?id=192389 and
    #  https://lists.wikimedia.org/pipermail/mediawiki-l/2015-January/043850.html

    startMark = "START AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK-->"
    endMark = "<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK"
    # Don't do "(?: \\<!-- associated bot: (.+?) -->)?.*$"
    regExp = new RegExp("^\\*.*?\\[\\[User:(.+?)\\|.+?" +
                    "(?: \\<!-- associated bot: (.+?) -->.*)?$", "")

    main: (args, callNext) ->
        page = args[0]
        recentDays = args[1]
        inactiveLimit = args[2]
        inactiveIntro = args[3]
        summary = args[4]

        @WM.Log.logInfo("Sorting " + @WM.Log.linkToWikiPage(page, page) +
                                                                    " ...")

        @WM.MW.callQueryEdit(page,
                            @parseList,
                            [recentDays, inactiveLimit, inactiveIntro,
                             summary, callNext])

    parseList: (title, source, timestamp, edittoken, args) =>
        recentDays = args[0]
        inactiveLimit = args[1]
        inactiveIntro = args[2]
        summary = args[3]
        callNext = args[4]

        startList = source.indexOf(startMark)
        endList = source.indexOf(endMark)

        if startList > -1 and endList > -1
            startList += startMark.length
            date = new Date()
            ucstart = Math.floor(Date.now() / 1000)
            ucend = ucstart - 86400 * recentDays
            users =
                active: []
                inactive: []

            usersArray = source.substring(startList, endList).split("\n")
            @iterateUsers(usersArray, -1, ucstart, ucend, users, title, source,
                            startList, endList, timestamp, edittoken,
                            inactiveLimit, inactiveIntro, summary, callNext)
        else
            @WM.Log.logError("Cannot find the needed marks")

    iterateUsers: (usersArray, index, ucstart, ucend, users,
                    title, source, startList, endList, timestamp, edittoken,
                    inactiveLimit, inactiveIntro, summary, callNext) =>
        index++

        if index < usersArray.length
            userString = usersArray[index]
            match = regExp.exec(userString)

            if match
                ucuser = match[1].charAt(0).toUpperCase() + match[1].substr(1)

                if match[2]
                    ucuser += "|" + match[2].charAt(0).toUpperCase() +
                                                            match[2].substr(1)

                @WM.Log.logInfo("Querying " + ucuser + " ...")

                @WM.MW.getUserContribs(ucuser, ucstart, ucend,
                    @storeUserContribs,
                    [usersArray, index, ucstart, ucend, users, title, source,
                     startList, endList, timestamp, edittoken, inactiveLimit,
                     inactiveIntro, summary, callNext])

            else if userString != "" and
                                    userString.indexOf(inactiveIntro) != 0
                @WM.Log.logError("An entry in the list may not be correctly " +
                                                                "formatted")
            else
                @iterateUsers(usersArray, index, ucstart, ucend, users, title,
                            source, startList, endList, timestamp, edittoken,
                            inactiveLimit, inactiveIntro, summary, callNext)
        else
            @updateList(users, title, source, startList, endList, timestamp,
                                edittoken, inactiveIntro, summary, callNext)

    storeUserContribs: (results, args) =>
        usersArray = args[0]
        index = args[1]
        ucstart = args[2]
        ucend = args[3]
        users = args[4]
        title = args[5]
        source = args[6]
        startList = args[7]
        endList = args[8]
        timestamp = args[9]
        edittoken = args[10]
        inactiveLimit = args[11]
        inactiveIntro = args[12]
        summary = args[13]
        callNext = args[14]

        edits = results.length

        if edits < inactiveLimit
            users.inactive.push({
                                    "text": usersArray[index]
                                    "edits": edits
                                })
        else
            users.active.push({
                                    "text": usersArray[index]
                                    "edits": edits
                              })

        @iterateUsers(usersArray, index, ucstart, ucend, users, title, source,
                            startList, endList, timestamp, edittoken,
                            inactiveLimit, inactiveIntro, summary, callNext)

    updateList: (users, title, source, startList, endList,
                    timestamp, edittoken, inactiveIntro, summary, callNext) =>
        sorter = (a, b) ->
            # Users must be sorted in descending order
            if a.edits < b.edits
                return 1
            else if a.edits > b.edits
                return -1
            else
                return 0

        users.active.sort(sorter)
        users.inactive.sort(sorter)

        newList = "\n"

        for user in users.active
            newList += user.text + "\n"

        if users.inactive.length > 0
            newList += "\n" + inactiveIntro + "\n\n"

            for user in users.inactive
                newList += user.text + "\n"

        newText = source.substring(0, startList) + newList +
                                                    source.substring(endList)

        if newText != source
            @WM.MW.callAPIPost({
                                    action: "edit"
                                    bot: "1"
                                    minor: "1"
                                    title: title
                                    summary: summary
                                    text: newText
                                    b1asetimestamp: timestamp
                                    token: edittoken
                            },
                            null,
                            @writePage,
                            [title, callNext],
                            null)
        else
            @WM.Log.logInfo(@WM.Log.linkToWikiPage(title, title) +
                                            " was already up to date")
            if callNext
                callNext()

    writePage: (res, args) =>
        title = args[0]
        callNext = args[1]

        if res.edit and res.edit.result == 'Success'
            @WM.Log.logInfo(@WM.Log.linkToWikiPage(title, title) +
                                                    " was correctly updated")
            if callNext
                callNext()
        else
            @WM.Log.logError(res['error']['info'] +
                                            " (" + res['error']['code'] + ")")
