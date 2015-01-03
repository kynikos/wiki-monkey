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

    this.main = function (args, callNext) {
        var pages = args[0];
        var inactiveIntros = args[1];
        var summary = args[2];

        WM.Log.logInfo("Sorting administrators and maintainers ...");

        // Cannot query "bot|sysop|bureaucrat|maintainer" at once, because
        //   of the upstream bug tracked in #179
        //WM.MW.getActiveUsers("bot|sysop|bureaucrat|maintainer",
        WM.MW.getActiveUsers("sysop",
                                WM.Plugins.ArchWikiSortContacts.mainContinue1,
                                [pages, inactiveIntros, summary, callNext]);
    };

    var startMark = "START AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK-->";
    var endMark = "<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK";
    var INACTIVE_LIMIT = 30;

    this.mainContinue1 = function (results, args) {
        var pages = args[0];
        var inactiveIntros = args[1];
        var summary = args[2];
        var callNext = args[3];
        var queriedUsers = {};

        for (var u in results) {
            var user = results[u];
            queriedUsers[user.name] = user.recenteditcount;
        }

        // Cannot query "bot|sysop|bureaucrat|maintainer" at once, because
        //   of the upstream bug tracked in #179
        WM.MW.getActiveUsers("maintainer",
                    WM.Plugins.ArchWikiSortContacts.mainContinue2,
                    [queriedUsers, pages, inactiveIntros, summary, callNext]);
    };

    this.mainContinue2 = function (results, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var inactiveIntros = args[2];
        var summary = args[3];
        var callNext = args[4];

        for (var u in results) {
            var user = results[u];
            queriedUsers[user.name] = user.recenteditcount;
        }

        // Cannot query "bot|sysop|bureaucrat|maintainer" at once, because
        //   of the upstream bug tracked in #179
        WM.MW.getActiveUsers("bot",
                    WM.Plugins.ArchWikiSortContacts.mainContinue3,
                    [queriedUsers, pages, inactiveIntros, summary, callNext]);
    };

    this.mainContinue3 = function (results, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var inactiveIntros = args[2];
        var summary = args[3];
        var callNext = args[4];

        for (var u in results) {
            var user = results[u];
            queriedUsers[user.name] = user.recenteditcount;
        }

        WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers, pages, 0,
                                            inactiveIntros, summary, callNext);
    };

    this.iteratePages = function (queriedUsers, pages, index, inactiveIntros,
                                                        summary, callNext) {
        if (index < pages.length) {
            WM.MW.callQueryEdit(pages[index],
                                WM.Plugins.ArchWikiSortContacts.updateList,
                                [queriedUsers, pages, index, inactiveIntros,
                                summary, callNext]);
        }
        else if (callNext) {
            callNext();
        }
    };

    var parseUsers = function (usersArray, queriedUsers, inactiveIntros,
                                                                    index) {
        var regExp = new RegExp("^\\*.*?\\[\\[User:(.+?)\\|.+?" +
                        // Don't do "(?: \\<!-- associated bot: (.+?) -->)?.*$"
                        "(?: \\<!-- associated bot: (.+?) -->.*)?$", "");
        var users = {
            active: [],
            inactive: []
        };

        for (var u in usersArray) {
            var userString = usersArray[u];
            var match = regExp.exec(userString);

            if (match) {
                var edits = 0;
                var user = match[1].charAt(0).toUpperCase() +
                                                            match[1].substr(1);

                // The user may be inactive (not present in queriedUsers)
                if (queriedUsers[user]) {
                    edits += queriedUsers[user];
                }

                // The user may not have an associated bot
                if (match[2]) {
                    var bot = match[2].charAt(0).toUpperCase() +
                                                            match[2].substr(1);

                    // The bot may be inactive (not present in queriedUsers)
                    if (queriedUsers[bot]) {
                        edits += queriedUsers[bot];
                    }
                }

                if (edits < INACTIVE_LIMIT) {
                    users.inactive.push({"text": match[0],
                                         "edits": edits});
                }
                else {
                    users.active.push({"text": match[0],
                                       "edits": edits});
                }
            }
            else if (userString != "" &&
                            userString.indexOf(inactiveIntros[index]) != 0) {
                return false;
            }
        }

        return users;
    };

    this.updateList = function (title, source, timestamp, edittoken, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var index = args[2];
        var inactiveIntros = args[3];
        var summary = args[4];
        var callNext = args[5];

        WM.Log.logInfo("Processing " + WM.Log.linkToWikiPage(title, title) +
                                                                    " ...");

        var startList = source.indexOf(startMark);
        var endList = source.indexOf(endMark);

        if (startList > -1 && endList > -1) {
            startList += startMark.length;

            var usersArray = source.substring(startList, endList).split("\n");
            var authorizedUsers = parseUsers(usersArray, queriedUsers,
                                                        inactiveIntros, index);

            if (authorizedUsers) {
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

                authorizedUsers.active.sort(sorter);
                authorizedUsers.inactive.sort(sorter);

                var newList = "\n";

                for (var a in authorizedUsers.active) {
                    newList += authorizedUsers.active[a].text + "\n";
                }

                if (authorizedUsers.inactive.length > 0) {
                    newList += "\n" + inactiveIntros[index] + "\n\n";

                    for (var a in authorizedUsers.inactive) {
                        newList += authorizedUsers.inactive[a].text + "\n";
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
                                   [queriedUsers, pages, index, inactiveIntros,
                                                        summary, callNext]);
                }
                else {
                    WM.Log.logInfo(WM.Log.linkToWikiPage(title, title) +
                                                    " was already up to date");
                    index++;
                    WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers,
                            pages, index, inactiveIntros, summary, callNext);
                }
            }
            else {
                WM.Log.logError("An entry in the list may not be correctly " +
                                                                "formatted");
                index++;
                WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers,
                            pages, index, inactiveIntros, summary, callNext);
            }
        }
        else {
            WM.Log.logError("Cannot find the needed marks in " +
                                        WM.Log.linkToWikiPage(title, title));
            index++;
            WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers, pages,
                                    index, inactiveIntros, summary, callNext);
        }
    };

    this.writePage = function (res, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var index = args[2];
        var inactiveIntros = args[3];
        var summary = args[4];
        var callNext = args[5];

        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo(WM.Log.linkToWikiPage(pages[index], pages[index]) +
                                                    " was correctly updated");

            index++;
            WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers, pages,
                                    index, inactiveIntros, summary, callNext);
        }
        else {
            WM.Log.logError(res['error']['info'] +
                                            " (" + res['error']['code'] + ")");
        }
    };
};
