/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2014 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.Plugins.ArchWikiSortContacts = new function () {
    "use strict";

    /*
     * This plugin was originally based on list=allusers, but because of bug
     *  #208 it can't rely on that anymore, so it was rewritten with
     *  60bb2ac2a2dcd0b15b7aac80725c83151173eeb3
     * See also https://bbs.archlinux.org/viewtopic.php?id=192389 and
     *  https://lists.wikimedia.org/pipermail/mediawiki-l/2015-January/043850.html
     */

    var startMark = "START AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK-->";
    var endMark = "<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK";
    var RECENT_DAYS = 30;
    var INACTIVE_LIMIT = 30;
    var regExp = new RegExp("^\\*.*?\\[\\[User:(.+?)\\|.+?" +
                    // Don't do "(?: \\<!-- associated bot: (.+?) -->)?.*$"
                    "(?: \\<!-- associated bot: (.+?) -->.*)?$", "");

    this.main = function (args, callNext) {
        var page = args[0];
        var inactiveIntro = args[1];
        var summary = args[2];

        WM.Log.logInfo("Sorting " + WM.Log.linkToWikiPage(page, page) +
                                                                    " ...");

        WM.MW.callQueryEdit(page,
                            WM.Plugins.ArchWikiSortContacts.parseList,
                            [inactiveIntro, summary, callNext]);
    };

    this.parseList = function (title, source, timestamp, edittoken, args) {
        var inactiveIntro = args[0];
        var summary = args[1];
        var callNext = args[2];

        var startList = source.indexOf(startMark);
        var endList = source.indexOf(endMark);

        if (startList > -1 && endList > -1) {
            startList += startMark.length;
            var date = new Date();
            var ucstart = Math.floor(Date.now() / 1000);
            var ucend = ucstart - 86400 * RECENT_DAYS;
            var users = {
                active: [],
                inactive: []
            };

            var usersArray = source.substring(startList, endList).split("\n");
            iterateUsers(usersArray, -1, ucstart, ucend, users, title, source,
                                    startList, endList, timestamp, edittoken,
                                    inactiveIntro, summary, callNext);
        }
        else {
            WM.Log.logError("Cannot find the needed marks");
        }
    };

    var iterateUsers = function (usersArray, index, ucstart, ucend, users,
                                title, source, startList, endList, timestamp,
                                edittoken, inactiveIntro, summary, callNext) {
        index++;

        if (index < usersArray.length) {
            var userString = usersArray[index];
            var match = regExp.exec(userString);

            if (match) {
                var ucuser = match[1].charAt(0).toUpperCase() +
                                                            match[1].substr(1);

                if (match[2]) {
                    ucuser += "|" + match[2].charAt(0).toUpperCase() +
                                                            match[2].substr(1);
                }

                WM.Log.logInfo("Querying " + ucuser + " ...");

                WM.MW.getUserContribs(ucuser, ucstart, ucend,
                    WM.Plugins.ArchWikiSortContacts.storeUserContribs,
                    [usersArray, index, ucstart, ucend, users, title, source,
                    startList, endList, timestamp, edittoken, inactiveIntro,
                    summary, callNext]);

            }
            else if (userString != "" &&
                                    userString.indexOf(inactiveIntro) != 0) {
                WM.Log.logError("An entry in the list may not be correctly " +
                                                                "formatted");
            }
            else {
                iterateUsers(usersArray, index, ucstart, ucend, users, title,
                                source, startList, endList, timestamp,
                                edittoken, inactiveIntro, summary, callNext);
            }
        }
        else {
            updateList(users, title, source, startList, endList, timestamp,
                                edittoken, inactiveIntro, summary, callNext);
        }
    };

    this.storeUserContribs = function (results, args) {
        var usersArray = args[0];
        var index = args[1];
        var ucstart = args[2];
        var ucend = args[3];
        var users = args[4];
        var title = args[5];
        var source = args[6];
        var startList = args[7];
        var endList = args[8];
        var timestamp = args[9];
        var edittoken = args[10];
        var inactiveIntro = args[11];
        var summary = args[12];
        var callNext = args[13];

        var edits = results.length;

        if (edits < INACTIVE_LIMIT) {
            users.inactive.push({"text": usersArray[index],
                                 "edits": edits});
        }
        else {
            users.active.push({"text": usersArray[index],
                               "edits": edits});
        }

        iterateUsers(usersArray, index, ucstart, ucend, users, title, source,
                                    startList, endList, timestamp, edittoken,
                                    inactiveIntro, summary, callNext)
    };

    var updateList = function (users, title, source, startList, endList,
                    timestamp, edittoken, inactiveIntro, summary, callNext) {
        var sorter = function (a, b) {
            // Users must be sorted in descending order
            if (a.edits < b.edits) {
                return 1;
            }
            else if (a.edits > b.edits) {
                return -1;
            }
            else {
                return 0;
            }
        }

        users.active.sort(sorter);
        users.inactive.sort(sorter);

        var newList = "\n";

        for (var a in users.active) {
            newList += users.active[a].text + "\n";
        }

        if (users.inactive.length > 0) {
            newList += "\n" + inactiveIntro + "\n\n";

            for (var a in users.inactive) {
                newList += users.inactive[a].text + "\n";
            }
        }

        var newText = source.substring(0, startList) + newList +
                                                    source.substring(endList);

        if (newText != source) {
            WM.MW.callAPIPost({action: "edit",
                           bot: "1",
                           minor: "1",
                           title: title,
                           summary: summary,
                           text: newText,
                           b1asetimestamp: timestamp,
                           token: edittoken},
                           null,
                           WM.Plugins.ArchWikiSortContacts.writePage,
                           [title, callNext]);
        }
        else {
            WM.Log.logInfo(WM.Log.linkToWikiPage(title, title) +
                                            " was already up to date");
            if (callNext) {
                callNext();
            }
        }
    };

    this.writePage = function (res, args) {
        var title = args[0];
        var callNext = args[1];

        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo(WM.Log.linkToWikiPage(title, title) +
                                                    " was correctly updated");
            if (callNext) {
                callNext();
            }
        }
        else {
            WM.Log.logError(res['error']['info'] +
                                            " (" + res['error']['code'] + ")");
        }
    };
};
