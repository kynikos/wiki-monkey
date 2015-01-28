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

WM.Plugins.SynchronizeInterlanguageLinks = new function () {
    "use strict";

    var detectLang = function (title, tag) {
        // Without this check this plugin would be specific to ArchWiki
        if (tag == "ArchWiki") {
            var detect = WM.ArchWiki.detectLanguage(title);
            var pureTitle = detect[0];
            tag = WM.ArchWiki.getInterlanguageTag(detect[1]);
        }
        else {
            var pureTitle = title;
        }

        return [pureTitle, tag];
    };

    var computeWhiteList = function (whitelist) {
        // Without this check this plugin would be specific to ArchWiki
        if (whitelist == "ArchWiki") {
            if (typeof GM_emulation === "undefined") {
                return WM.ArchWiki.getInterwikiLanguages();
            }
            else {
                return WM.ArchWiki.getInternalInterwikiLanguages();
            }
        }
        else {
            return whitelist;
        }
    };

    var computeSupportedLangs = function (supportedLangs) {
        // Without this check this plugin would be specific to ArchWiki
        if (supportedLangs == "ArchWiki") {
            return WM.ArchWiki.getInterwikiLanguages();
        }
        else {
            return supportedLangs;
        }
    };

    this.main = function (args, callNext) {
        var title = WM.Editor.getTitle();

        var detect = detectLang(title, args[0]);
        var pureTitle = detect[0];
        var tag = detect[1];

        var whitelist = computeWhiteList(args[1]);
        var supportedLangs = computeSupportedLangs(args[2]);

        WM.Log.logInfo("Synchronizing interlanguage links ...");

        WM.MW.getInterwikiMap(
            title,
            WM.Plugins.SynchronizeInterlanguageLinks.mainContinue,
            [tag, pureTitle, supportedLangs, whitelist, title, callNext]
        );
    };

    this.mainContinue = function (iwmap, args) {
        var tag = args[0];
        var pureTitle = args[1];
        var supportedLangs = args[2];
        var whitelist = args[3];
        var title = args[4];
        var callNext = args[5];

        var source = WM.Editor.readSource();

        var langlinks = WM.Interlanguage.parseLinks(supportedLangs, source,
                                                                        iwmap);

        var wikiUrls = WM.MW.getWikiUrls();
        var url = wikiUrls.short + encodeURIComponent(
                                WM.Parser.squashContiguousWhitespace(title));
        var api = wikiUrls.api;

        var visitedlinks = {};
        visitedlinks[tag.toLowerCase()] = WM.Interlanguage.createVisitedLink(
                                            tag, pureTitle, url, iwmap, api,
                                            source, null, null, langlinks);

        var newlinks = {};

        WM.Log.logInfo("Reading " + WM.Log.linkToPage(url, "edited article") +
                                                                    " ...");

        if (langlinks) {
            for (var l in langlinks) {
                var link = langlinks[l];
                var nlink = newlinks[link.lang.toLowerCase()];
                var vlink = visitedlinks[link.lang.toLowerCase()];

                if (!vlink && !nlink) {
                    newlinks[link.lang.toLowerCase()] =
                                            WM.Interlanguage.createNewLink(
                                            link.lang, link.title, link.url);
                }
                else if (vlink && vlink.url != link.url) {
                    // Just ignore any conflicting links and warn the user:
                    // if it's a real conflict, the user will investigate it,
                    // otherwise the user will ignore it
                    WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        WM.Log.linkToPage(vlink.url, "[[" + link.lang + ":" +
                        visitedlinks[link.lang.toLowerCase()].title + "]]"));
                }
                else if (nlink && nlink.url != link.url) {
                    // Just ignore any conflicting links and warn the user:
                    // if it's a real conflict, the user will investigate it,
                    // otherwise the user will ignore it
                    WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        WM.Log.linkToPage(nlink.url, "[[" + link.lang + ":" +
                        newlinks[link.lang.toLowerCase()].title + "]]"));
                }
            }

            WM.Interlanguage.collectLinks(
                visitedlinks,
                newlinks,
                supportedLangs,
                whitelist,
                false,
                WM.Plugins.SynchronizeInterlanguageLinks.mainEnd,
                [tag, url, source, langlinks, iwmap, callNext]
            );
        }
        else {
            WM.Log.logInfo("No interlanguage links found");

            if (callNext) {
                callNext();
            }
        }
    };

    this.mainEnd = function (links, args) {
        var tag = args[0];
        var url = args[1];
        var source = args[2];
        var langlinks = args[3];
        var iwmap = args[4];
        var callNext = args[5];

        var newText = WM.Interlanguage.updateLinks(tag, url, iwmap, source,
                                                            langlinks, links);

        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Synchronized interlanguage links");
        }
        else {
            WM.Log.logInfo("Interlanguage links were already synchronized");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var detect = detectLang(title, args[0]);
        var pureTitle = detect[0];
        var tag = detect[1];

        var whitelist = computeWhiteList(args[1]);
        var supportedLangs = computeSupportedLangs(args[2]);

        var summary = args[3];

        var wikiUrls = WM.MW.getWikiUrls();
        var url = wikiUrls.short + encodeURIComponent(
                                WM.Parser.squashContiguousWhitespace(title));

        var visitedlinks = {};

        var newlinks = {};
        newlinks[tag.toLowerCase()] = WM.Interlanguage.createNewLink(tag,
                                                            pureTitle, url);

        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            supportedLangs,
            whitelist,
            true,
            WM.Plugins.SynchronizeInterlanguageLinks.mainAutoWrite,
            [title, url, tag, summary, callBot]
        );
    };

    this.mainAutoWrite = function (links, args) {
        var title = args[0];
        var url = args[1];
        var tag = args[2];
        var summary = args[3];
        var callBot = args[4];

        var lcTag = tag.toLowerCase();
        // New links that were not in the white list will have the "iwmap"
        // attribute false, "timestamp" and "edittoken" null and "links" as an
        // empty array, however links[lcTag] should always be safe
        var iwmap = links[lcTag].iwmap;
        var source = links[lcTag].source;
        var langlinks = links[lcTag].links;
        var timestamp = links[lcTag].timestamp;
        var edittoken = links[lcTag].edittoken;

        var newText = WM.Interlanguage.updateLinks(tag, url, iwmap, source,
                                                            langlinks, links);

        if (newText != source) {
            WM.MW.callAPIPost(
                {action: "edit",
                 bot: "1",
                 title: title,
                 summary: summary,
                 text: newText,
                 basetimestamp: timestamp,
                 token: edittoken},
                null,
                WM.Plugins.SynchronizeInterlanguageLinks.mainAutoEnd,
                callBot
            );
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
