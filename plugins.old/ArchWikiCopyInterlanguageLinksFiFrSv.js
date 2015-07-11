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

WM.Plugins.ArchWikiCopyInterlanguageLinksFiFrSv = new function () {
    this.queryEnglishTitle = function (title, pureTitle, callBot) {
        WM.MW.callQuery(
            {
                titles: pureTitle,
                prop: "revisions",
                rvprop: "content",
                redirects: "1",
            },
            function (page, args) {
                if (page.revisions) {
                    var parsedLinks = WM.ArchWiki.findAllInterlanguageLinks(page.revisions[0]['*']);
                    var links = {};
                    links["[[en:" + page.title + "]]"] = true;
                    for (var p in parsedLinks) {
                        links[parsedLinks[p].match[0]] = true;
                    }

                    WM.Plugins.ArchWikiCopyInterlanguageLinksFiFrSv.queryTitle(title, links, callBot);
                }
                else {
                    WM.Log.logError(pureTitle + ' doesn\'t exist');
                    callBot(true);
                }
            }
        );
    };

    this.queryTitle = function (title, links, callBot) {
        WM.MW.callQueryEdit(
            title,
            function (title, source, timestamp, edittoken, args) {
                var parsedLinks = WM.ArchWiki.findAllInterlanguageLinks(source);
                for (var p in parsedLinks) {
                    links[parsedLinks[p].match[0]] = true;
                }

                var linksOrd = Alib.Obj.getKeys(links);
                linksOrd.sort();

                WM.Plugins.ArchWikiCopyInterlanguageLinksFiFrSv.editPage(title, linksOrd, source, timestamp, edittoken, callBot);
            }
        );
    };

    this.editPage = function (title, links, source, timestamp, edittoken, callBot) {
        var summary = "[[Template:i18n]] is deprecated, use interlanguage links, see [[Help talk:I18n#\"Dummy\" interlanguage links and deprecation of Template:i18n]]";

        var newText = WM.Plugins.ArchWikiCopyInterlanguageLinksFiFrSv.composeLinks(source, links);

        if (newText != source) {
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
                WM.Plugins.ArchWikiCopyInterlanguageLinksFiFrSv.editPageContinue,
                [title, callBot]
            );
        }
        else {
            WM.Log.logInfo(title + ' is already up to date');
            callBot(true);
        }
    };

    this.editPageContinue = function (res, args) {
        var title = args[0];
        var callBot = args[1];

        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo(title + ' correctly updated');
            callBot(true);
        }
        else {
            WM.Log.logError(title + ' has not been updated!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
            callBot(false);
        }
    };

    this.composeLinks = function (source, links) {
        var oldLinks = WM.ArchWiki.findAllInterlanguageLinks(source);

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

        var newText = part1 + links.join("\n") + "\n" + part2b;

        return newText;
    };

    this.mainAuto = function (args, title, callBot) {
        var languages = ["Français", "Suomi", "Svenska"];
        var detLang = WM.ArchWiki.detectLanguage(title);

        if (languages.indexOf(detLang[1]) > -1) {
            WM.Plugins.ArchWikiCopyInterlanguageLinksFiFrSv.queryEnglishTitle(title, detLang[0], callBot);
        }
        else {
            WM.Log.logInfo("Use only French, Finnish or Swedish articles as roots");
            callBot(true);
        }
    };
};
