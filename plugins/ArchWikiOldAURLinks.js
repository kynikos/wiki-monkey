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

WM.Plugins.ArchWikiOldAURLinks = new function () {
    "use strict";

    var doReplace = function (source, call, callArgs) {
        var regExp = /\[(https?\:\/\/aur\.archlinux\.org\/packages\.php\?ID\=([0-9]+)) ([^\]]+?)\]/g;
        var links = Alib.RegEx.matchAll(source, regExp);
        var newText = source;

        if (links.length > 0) {
            WM.ArchPackages.getAURInfo(links[0].match[2],
                           WM.Plugins.ArchWikiOldAURLinks.doReplaceContinue,
                           [source, newText, links, 0, call, callArgs]);
        }
        else {
            call(source, newText, callArgs);
        }
    };

    this.doReplaceContinue = function (res, args) {
        var source = args[0];
        var newText = args[1];
        var links = args[2];
        var index = args[3];
        var call = args[4];
        var callArgs = args[5];

        var link = links[index];

        WM.Log.logInfo("Processing " + WM.Log.linkToPage(link.match[1],
                                                    link.match[0]) + " ...");

        if (res.type == "error") {
            WM.Log.logError("The AUR's RPC interface returned an error: " +
                                                                res.results);
            call(-1, -1, callArgs);
        }
        else {
            if (res.resultcount > 0) {
                var pkgname = res.results.Name;

                if (link.match[3] == pkgname) {
                    var newlink = "{{AUR|" + pkgname + "}}";
                    newText = newText.replace(link.match[0], newlink);
                    WM.Log.logInfo("Checked and replaced link with " +
                                                                    newlink);
                    WM.Plugins.ArchWikiOldAURLinks.doReplaceContinue2(source,
                                        newText, links, index, call, callArgs);
                }
                else {
                    WM.Log.logWarning("Couldn't replace: the link doesn't " +
                                        "use the package name (" + pkgname +
                                        ") as the anchor text");
                    WM.Plugins.ArchWikiOldAURLinks.doReplaceContinue2(source,
                                        newText, links, index, call, callArgs);
                }
            }
            else {
                WM.ArchPackages.isOfficialPackage(link.match[3],
                      WM.Plugins.ArchWikiOldAURLinks.checkIfOfficial,
                      [link, source, newText, links, index, call, callArgs]);
            }
        }
    };

    this.checkIfOfficial = function (res, args) {
        var link = args[0];
        var source = args[1];
        var newText = args[2];
        var links = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        if (res) {
            var newlink = "{{Pkg|" + link.match[3] + "}}";
            newText = newText.replace(link.match[0], newlink);
            WM.Log.logInfo("Replaced link with " + newlink);
            WM.Log.logWarning("The package doesn't exist anymore in the " +
                        "AUR, but a package with the same name as the link " +
                        "anchor has been found in the official repositories");
        }
        else {
            WM.Log.logWarning("Couldn't replace: the package doesn't exist " +
                              "anymore in the AUR and there's no package in " +
                              "the official repositories that has the same " +
                              "name as the link anchor");
        }

        WM.Plugins.ArchWikiOldAURLinks.doReplaceContinue2(source, newText,
                                                links, index, call, callArgs);
    };

    this.doReplaceContinue2 = function (source, newText, links, index, call,
                                                                    callArgs) {
        index++;

        if (links[index]) {
            WM.ArchPackages.getAURInfo(links[index].match[2],
                           WM.Plugins.ArchWikiOldAURLinks.doReplaceContinue,
                           [source, newText, links, index, call, callArgs]);
        }
        else {
            call(source, newText, callArgs);
        }
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Replacing old-style direct AUR package links ...");
        doReplace(source, WM.Plugins.ArchWikiOldAURLinks.mainEnd, callNext);
    };

    this.mainEnd = function (source, newtext, callNext) {
        if (source == -1) {
            callNext = false;
        }
        else if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Replaced old-style direct AUR package links");
        }
        else {
            WM.Log.logInfo("No automatically replaceable old-style AUR " +
                                                        "package links found");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var summary = args;

        WM.MW.callQueryEdit(title,
                            WM.Plugins.ArchWikiOldAURLinks.mainAutoReplace,
                            [summary, callBot]);
    };

    this.mainAutoReplace = function (title, source, timestamp, edittoken,
                                                                        args) {
        var summary = args[0];
        var callBot = args[1];

        doReplace(source,
                  WM.Plugins.ArchWikiOldAURLinks.mainAutoWrite,
                  [title, edittoken, timestamp, summary, callBot]);
    };

    this.mainAutoWrite = function (source, newtext, args) {
        var title = args[0];
        var edittoken = args[1];
        var timestamp = args[2];
        var summary = args[3];
        var callBot = args[4];

        if (source == -1) {
            callBot(false, null);
        }
        else if (newtext != source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.ArchWikiOldAURLinks.mainAutoEnd,
                               callBot);
        }
        else {
            callBot(0, null);
        }
    };

    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(1, null);
        }
        else if (res.error) {
            WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            callBot(res.error.code, null);
        }
        else {
            callBot(false, null);
        }
    };
};
