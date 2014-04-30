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

    var startJsonMark = "START JSON LIST - DO NOT REMOVE OR MODIFY THIS MARK";
    var endJsonMark = "END JSON LIST - DO NOT REMOVE OR MODIFY THIS MARK";
    var startListMark = "START AUTO LIST - DO NOT REMOVE OR MODIFY THIS " +
                                                                    "MARK-->";
    var endListMark = "<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK";

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

    this.updateList = function (title, source, timestamp, edittoken, args) {
        var queriedUsers = args[0];
        var pages = args[1];
        var index = args[2];
        var summary = args[3];
        var callNext = args[4];

        WM.Log.logInfo("Processing " + WM.Log.linkToWikiPage(title, title) +
                                                                    " ...");

        var startJson = source.indexOf(startJsonMark);
        var endJson = source.indexOf(endJsonMark);
        var startList = source.indexOf(startListMark);
        var endList = source.indexOf(endListMark);

        if (startJson > -1 && endJson > -1 && startList > -1 && endList > -1) {
            startJson += startJsonMark.length;
            startList += startListMark.length;

            var authorizedUsers = JSON.parse(source.substring(startJson,
                                                                    endJson));

            authorizedUsers.sort(function (a, b) {
                // A user may be inactive (not present in queriedUsers)
                if (!queriedUsers[a.username]) {
                    queriedUsers[a.username] = 0;
                }

                if (!queriedUsers[b.username]) {
                    queriedUsers[b.username] = 0;
                }

                if (queriedUsers[a.associatedBot]) {
                    queriedUsers[a.username] += queriedUsers[a.associatedBot];
                }

                if (queriedUsers[b.associatedBot]) {
                    queriedUsers[b.username] += queriedUsers[b.associatedBot];
                }

                // The users must be sorted in descending order
                if (queriedUsers[a.username] < queriedUsers[b.username]) {
                    return 1;
                }
                else if (queriedUsers[a.username] > queriedUsers[b.username]) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            var newList = "\n";

            for (var a in authorizedUsers) {
                var user = authorizedUsers[a];
                newList += "* [[User:" + user.username + "|" + user.username +
                        "]] ([[User talk:" + user.username + "|talk]]) - " +
                        "[[Special:EmailUser/" + user.username + "|" +
                        user.email + "]]\n";
            }

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
