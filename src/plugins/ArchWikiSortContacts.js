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
        var summary = args[1];

        WM.Log.logInfo("Sorting administrators and maintainers ...");

        // Cannot query "bot|sysop|bureaucrat|maintainer" at once, because
        //   of the upstream bug tracked in #179
        //WM.MW.getActiveUsers("bot|sysop|bureaucrat|maintainer",
        WM.MW.getActiveUsers("sysop",
                                WM.Plugins.ArchWikiSortContacts.mainContinue1,
                                [pages, summary, callNext]);
    };

    var startMark = "START AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK-->";
    var endMark = "<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK";

    this.mainContinue1 = function (results, args) {
        var pages = args[0];
        var summary = args[1];
        var callNext = args[2];
        var queriedUsers = {};

        for (var u in results) {
            var user = results[u];
            queriedUsers[user.name] = user.recenteditcount;
        }

        // Cannot query "bot|sysop|bureaucrat|maintainer" at once, because
        //   of the upstream bug tracked in #179
        WM.MW.getActiveUsers("maintainer",
                                WM.Plugins.ArchWikiSortContacts.mainContinue2,
                                [queriedUsers, pages, summary, callNext]);
    };

    this.mainContinue2 = function (results, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var summary = args[2];
        var callNext = args[3];

        for (var u in results) {
            var user = results[u];
            queriedUsers[user.name] = user.recenteditcount;
        }

        // Cannot query "bot|sysop|bureaucrat|maintainer" at once, because
        //   of the upstream bug tracked in #179
        WM.MW.getActiveUsers("bot",
                                WM.Plugins.ArchWikiSortContacts.mainContinue3,
                                [queriedUsers, pages, summary, callNext]);
    };

    this.mainContinue3 = function (results, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var summary = args[2];
        var callNext = args[3];

        for (var u in results) {
            var user = results[u];
            queriedUsers[user.name] = user.recenteditcount;
        }

        WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers, pages, 0,
                                                            summary, callNext);
    };

    this.iteratePages = function (queriedUsers, pages, index, summary,
                                                                    callNext) {
        if (index < pages.length) {
            WM.MW.callQueryEdit(pages[index],
                            WM.Plugins.ArchWikiSortContacts.updateList,
                            [queriedUsers, pages, index, summary, callNext]);
        }
        else {
            WM.Log.logInfo("Operations completed, check the log for " +
                                                        "warnings or errors");
            if (callNext) {
                callNext();
            }
        }
    };

    var parseUsers = function (string) {
        var regExp = new RegExp("^\\*.*?\\[\\[User:(.+?)\\|.+?" +
                        // Don't do "(?: \\<!-- associated bot: (.+?) -->)?.*$"
                        "(?: \\<!-- associated bot: (.+?) -->.*)?$", "gm");
        var users = [];

        while (true) {
            var match = regExp.exec(string);

            if (match) {
                users.push({"text": match[0],
                            "username": match[1],
                            "associatedBot": match[2]});
            }
            else {
                break;
            }
        }

        return users;
    };

    this.updateList = function (title, source, timestamp, edittoken, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var index = args[2];
        var summary = args[3];
        var callNext = args[4];

        WM.Log.logInfo("Processing " + WM.Log.linkToWikiPage(title, title) +
                                                                    " ...");

        var startList = source.indexOf(startMark);
        var endList = source.indexOf(endMark);

        if (startList > -1 && endList > -1) {
            startList += startMark.length;

            var userString = source.substring(startList, endList);
            var test = userString.split("\n").length;
            var authorizedUsers = parseUsers(userString);

            authorizedUsers.sort(function (a, b) {
                var aname = a.username.charAt(0).toUpperCase() +
                                                        a.username.substr(1);
                var bname = b.username.charAt(0).toUpperCase() +
                                                        b.username.substr(1);

                // Do *not* modify the queriedUsers object directly!
                var aedits, bedits;

                // A user may be inactive (not present in queriedUsers)
                if (queriedUsers[aname]) {
                    aedits = queriedUsers[aname];
                }
                else {
                    aedits = 0;
                }

                // A user may be inactive (not present in queriedUsers)
                if (queriedUsers[bname]) {
                    bedits = queriedUsers[bname];
                }
                else {
                    bedits = 0;
                }

                if (a.associatedBot) {
                    var abotname = a.associatedBot.charAt(0).toUpperCase() +
                                                    a.associatedBot.substr(1);

                    if (queriedUsers[abotname]) {
                        aedits += queriedUsers[abotname];
                    }
                }

                if (b.associatedBot) {
                    var bbotname = b.associatedBot.charAt(0).toUpperCase() +
                                                    b.associatedBot.substr(1);

                    if (queriedUsers[bbotname]) {
                        bedits += queriedUsers[bbotname];
                    }
                }

                // The users must be sorted in descending order
                if (aedits < bedits) {
                    return 1;
                }
                else if (aedits > bedits) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            var newList = "\n";

            for (var a in authorizedUsers) {
                newList += authorizedUsers[a].text + "\n";
            }

            if (test == newList.split("\n").length) {
                var newText = source.substring(0, startList) + newList +
                                                    source.substring(endList);

                if (newText != source) {
                    WM.MW.callAPIPost({action: "edit",
                                   bot: "1",
                                   title: title,
                                   summary: summary,
                                   text: newText,
                                   b1asetimestamp: timestamp,
                                   token: edittoken},
                                   null,
                                   WM.Plugins.ArchWikiSortContacts.writePage,
                                   [queriedUsers, pages, index, summary,
                                                                    callNext]);
                }
                else {
                    WM.Log.logInfo(WM.Log.linkToWikiPage(title, title) +
                                                    " was already up to date");
                    index++;
                    WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers,
                                            pages, index, summary, callNext);
                }
            }
            else {
                WM.Log.logError("An entry in the list may not be correctly " +
                                                                "formatted");
                index++;
                WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers,
                                            pages, index, summary, callNext);
            }
        }
        else {
            WM.Log.logError("Cannot find the needed marks in " +
                                        WM.Log.linkToWikiPage(title, title));
            index++;
            WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers, pages,
                                                    index, summary, callNext);
        }
    };

    this.writePage = function (res, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var index = args[2];
        var summary = args[3];
        var callNext = args[4];

        if (res.edit && res.edit.result == 'Success') {
            index++;
            WM.Plugins.ArchWikiSortContacts.iteratePages(queriedUsers, pages,
                                                    index, summary, callNext);
        }
        else {
            WM.Log.logError(res['error']['info'] +
                                            " (" + res['error']['code'] + ")");
        }
    };
};
