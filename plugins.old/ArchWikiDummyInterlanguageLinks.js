/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.Plugins.ArchWikiDummyInterlanguageLinks = new function () {
    this.queryTitle = function (pureTitle, languages, index, visitedTitles, newTitles, callBot) {
        var title = (languages[index] == "English") ? pureTitle : (pureTitle + " (" + languages[index] + ")");

        WM.Log.logInfo("Querying " + title + " ...");

        if (!visitedTitles[languages[index]][title]) {
            WM.MW.callAPIGet(
                {
                    action: "query",
                    titles: title,
                    redirects: "1",
                    prop: "info|revisions",
                    rvprop: "content|timestamp",
                    intoken: "edit",
                },
                null,
                function (res) {
                    if (res.query.redirects) {
                        for (var red in res.query.redirects) {
                            var redirect = res.query.redirects[red];
                            var pureRed = WM.ArchWiki.detectLanguage(redirect.to)[0];
                            newTitles[pureRed] = true;
                        }
                        visitedTitles[languages[index]][title] = res.query.redirects;
                    }
                    else {
                        for (var id in res.query.pages) {
                            var page = res.query.pages[id];
                            break;
                        }
                        visitedTitles[languages[index]][title] = page;

                        if (page.revisions) {
                            var parsedLinks = WM.ArchWiki.findInternalInterlanguageLinks(page.revisions[0]["*"]);
                            for (var p in parsedLinks) {
                                var ltitle = parsedLinks[p].match[3];
                                var pureLink = WM.Parser.convertUnderscoresToSpaces(WM.ArchWiki.detectLanguage(ltitle)[0]);
                                var test1 = pureTitle.substr(0, 1).toLowerCase() != pureLink.substr(0, 1).toLowerCase();
                                var test2 = pureTitle.substr(1) != pureLink.substr(1);
                                if (test1 || test2) {
                                    newTitles[pureLink] = true;
                                }
                            }

                            var i18n = WM.Parser.findTemplates(page.revisions[0]["*"], "i18n")[0];
                            if (i18n) {
                                for (var arg in i18n.arguments) {
                                    var argument = i18n.arguments[arg];
                                    var pureI18n = WM.Parser.convertUnderscoresToSpaces(WM.ArchWiki.detectLanguage(argument.value)[0]);
                                    var test1 = pureTitle.substr(0, 1).toLowerCase() != pureI18n.substr(0, 1).toLowerCase();
                                    var test2 = pureTitle.substr(1) != pureI18n.substr(1);
                                    if (test1 || test2) {
                                        newTitles[pureI18n] = true;
                                    }
                                }
                            }
                        }
                    }

                    WM.Plugins.ArchWikiDummyInterlanguageLinks.queryTitleContinue(pureTitle, languages, index, visitedTitles, newTitles, callBot);
                }
            );
        }
        else {
            WM.Plugins.ArchWikiDummyInterlanguageLinks.queryTitleContinue(pureTitle, languages, index, visitedTitles, newTitles, callBot);
        }
    };

    this.queryTitleContinue = function (pureTitle, languages, index, visitedTitles, newTitles, callBot) {
        index++;
        if (languages[index]) {
            WM.Plugins.ArchWikiDummyInterlanguageLinks.queryTitle(pureTitle, languages, index, visitedTitles, newTitles, callBot);
        }
        else {
            var pureTitle = null;
            for (var pureTitle in newTitles) {
                delete newTitles[pureTitle];
                WM.Plugins.ArchWikiDummyInterlanguageLinks.queryTitle(pureTitle, languages, 0, visitedTitles, newTitles, callBot);
                break;
            }
            if (!pureTitle) {
                WM.Plugins.ArchWikiDummyInterlanguageLinks.detectRing(visitedTitles, callBot);
            }
        }
    };

    this.detectRing = function (titles, callBot) {
        var ring = [];

        for (var language in titles) {
            var conflict = false;

            for (var title in titles[language]) {
                // Check is not a redirect or a missing article
                if (titles[language][title].pageid) {
                    if (!conflict) {
                        conflict = true;
                        ring.push([language, titles[language][title]]);
                    }
                    else {
                        var conflict = [];
                        for (var k in titles[language]) {
                            if (titles[language][k].pageid) {
                                conflict.push(k);
                            }
                        }
                        WM.Log.logError("Conflict: " + conflict.join(", "));
                        return callBot(false);
                    }
                }
            }
        }

        WM.Plugins.ArchWikiDummyInterlanguageLinks.collectLinks(ring, callBot);
    };

    this.collectLinks = function (ring, callBot) {
        var links = {};

        for (var page in ring) {
            var tag = WM.ArchWiki.getInterlanguageTag(ring[page][0]);
            var title = WM.ArchWiki.detectLanguage(ring[page][1].title)[0];

            if (!links[tag]) {
                links[tag] = title;
            }
            else if (links[tag] != title) {
                WM.Log.logError("Conflicting interlanguage links: [[" + tag + ":" + links[tag] + "]], [[" + tag + ":" + title + "]]");
                return callBot(false);
            }

            var parsedLinks = WM.ArchWiki.findAllInterlanguageLinks(ring[page][1].revisions[0]['*']);

            for (var p in parsedLinks) {
                var link = parsedLinks[p];
                var ltag = link.match[2];
                var ltitle = link.match[3];
                if (!links[ltag]) {
                    links[ltag] = ltitle;
                }
                else if (links[ltag] != ltitle) {
                    WM.Log.logError("Conflicting interlanguage links: [[" + ltag + ":" + links[ltag] + "]], [[" + ltag + ":" + ltitle + "]]");
                    return callBot(false);
                }
            }

            ring[page].push(parsedLinks);
        }

        var linksOrd = [];
        for (var l in links) {
            linksOrd.push([l, links[l]]);
        }
        linksOrd.sort(
            function (a, b) {
                var aa = a[0];
                var bb = b[0];
                if (aa > bb) return 1;
                else if (aa < bb) return -1;
                else return 0;
            }
        );

        WM.Plugins.ArchWikiDummyInterlanguageLinks.editPage(ring, 0, linksOrd, callBot);
    };

    this.editPage = function (ring, index, links, callBot) {
        if (ring[index]) {
            var namespaces = [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            var title = ring[index][1].title;
            if (namespaces.indexOf(ring[index][1].ns) > -1) {
                var source = ring[index][1].revisions[0]['*'];
                var timestamp = ring[index][1].revisions[0].timestamp;
                var edittoken = ring[index][1].edittoken;

                var interval = 5000;
                var summary = "[[Template:i18n]] is deprecated, use interlanguage links, see [[Help talk:I18n#\"Dummy\" interlanguage links and deprecation of Template:i18n]]";

                var newText = WM.Plugins.ArchWikiDummyInterlanguageLinks.composeLinks(ring[index][0], source, ring[index][2], links);

                if (newText != source) {
                    WM.Log.logInfo("Waiting " + interval / 1000 + " seconds ...");
                    setTimeout(
                        function () {
                            WM.MW.callAPIPost(
                                {
                                    action: "edit",
                                    bot: "1",
                                    title: title,
                                    summary: summary,
                                    text: newText,
                                    basetimestamp: timestamp,
                                    token: edittoken,
                                },
                                null,
                                WM.Plugins.ArchWikiDummyInterlanguageLinks.editPageContinue,
                                [ring, index, links, callBot]
                            )
                        },
                        interval
                    );
                }
                else {
                    WM.Log.logInfo(title + ' is already up to date');
                    index++;
                    WM.Plugins.ArchWikiDummyInterlanguageLinks.editPage(ring, index, links, callBot);
                }
            }
            else {
                WM.Log.logWarning(title + ' won\'t be updated');
                index++;
                WM.Plugins.ArchWikiDummyInterlanguageLinks.editPage(ring, index, links, callBot);
            }
        }
        else {
            callBot(true);
        }
    };

    this.editPageContinue = function (res, args) {
        var ring = args[0];
        var index = args[1];
        var links = args[2];
        var callBot = args[3];

        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo(ring[index][1].title + ' correctly updated');
            index++;
            WM.Plugins.ArchWikiDummyInterlanguageLinks.editPage(ring, index, links, callBot);
        }
        else {
            WM.Log.logError(ring[index][1].title + ' has not been updated!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
            callBot(false);
        }
    };

    this.composeLinks = function (lang, source, oldLinks, links) {
        var cleanText = "";
        var textId = 0;
        for (var l in oldLinks) {
            var link = oldLinks[l];
            cleanText += source.substring(textId, link.index);
            textId = link.index + link.length;
        }
        cleanText += source.substring(textId);

        var i18n = WM.Parser.findTemplates(cleanText, "i18n")[0];
        if (i18n) {
            cleanText = Alib.Str.removeFor(cleanText, i18n.index, i18n.length);
        }

        var linksText = [];
        var tag = WM.ArchWiki.getInterlanguageTag(lang);

        for (var l in links) {
            var ltag = links[l][0];
            if (ltag != tag) {
                var ltitle = links[l][1];
                linksText.push("[[" + ltag + ":" + ltitle + "]]\n");
            }
        }

        var tempTemplates = WM.Parser.findTemplates(source, "Temporary i18n");
        if (!tempTemplates.length && i18n && linksText.length > 3) {
            linksText.push("{{Temporary i18n}}\n");
        }

        if (oldLinks.length) {
            if (i18n) {
                var firstLink = Math.min(oldLinks[0].index, i18n.index);
            }
            else {
                var firstLink = oldLinks[0].index;
            }
        }
        else if (i18n) {
            var firstLink = i18n.index;
        }
        else {
            var firstLink = 0;
        }

        var part1 = cleanText.substring(0, firstLink);
        var part2a = cleanText.substr(firstLink);
        var firstChar = part2a.search(/[^\s]/);
        var part2b = part2a.substr(firstChar);

        var newText = part1 + linksText.join("") + part2b;

        return newText;
    };

    this.mainAuto = function (args, title, callBot) {
        WM.Log.logInfo("Replacing Template:i18n with dummy interlanguage links ...");

        var languages = [
            "Български",
            "Česky",
            "Dansk",
            "Ελληνικά",
            "English",
            "Español",
            "עברית",
            "Hrvatski",
            "Magyar",
            "Indonesia",
            "Italiano",
            "日本語",
            "한국어",
            "Lietuviškai",
            "Nederlands",
            "Polski",
            "Português",
            "Русский",
            "Slovenský",
            "Српски",
            "ไทย",
            "Українська",
            "简体中文",
            "正體中文",
        ];

        var visitedTitles = {
            "Български": {},
            "Česky": {},
            "Dansk": {},
            "Ελληνικά": {},
            "English": {},
            "Español": {},
            "עברית": {},
            "Hrvatski": {},
            "Magyar": {},
            "Indonesia": {},
            "Italiano": {},
            "日本語": {},
            "한국어": {},
            "Lietuviškai": {},
            "Nederlands": {},
            "Polski": {},
            "Português": {},
            "Русский": {},
            "Slovenský": {},
            "Српски": {},
            "ไทย": {},
            "Українська": {},
            "简体中文": {},
            "正體中文": {},
        };

        var detLang = WM.ArchWiki.detectLanguage(title);

        if (detLang[1] == "English") {
            WM.Plugins.ArchWikiDummyInterlanguageLinks.queryTitle(detLang[0], languages, 0, visitedTitles, {}, callBot);
        }
        else {
            WM.Log.logInfo("Use only English articles as roots");
            callBot(true);
        }
    };
};
