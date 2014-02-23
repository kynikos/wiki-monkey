/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2013 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.Plugins.FixBacklinkFragments = new function () {
    var fixLinks = function (source, target, sections) {
        // Note that it's impossible to recognize any namespaces in the title without querying the server
        // Alternatively, a list of the known namespaces could be maintained for each wiki
        // Recognizing namespaces would let recognize more liberal link syntaxes (e.g. spaces around the colon)
        var links = WM.Parser.findInternalLinks(source, null, target);

        var newText = "";
        var prevId = 0;

        for (var l = 0; l < links.length; l++) {
            var link = links[l];

            newText += source.substring(prevId, link.index);
            var newlink = link.match[0];

            var rawfragment = link.match[5];

            if (rawfragment) {
                var fixedFragment = fixFragment(rawfragment, sections);

                if (fixedFragment === true) {}
                else if (fixedFragment) {
                    var oldlink = newlink;
                    newlink = "[[" + target + "#" + fixedFragment + ((link.match[6]) ? "|" + link.match[6] : "") + "]]";
                    WM.Log.logInfo("Fixed broken link fragment: " + oldlink + " -> " + newlink);
                }
                else {
                    WM.Log.logWarning("Cannot fix broken link fragment: " + newlink);
                }
            }

            newText += newlink;
            prevId = link.index + link.length;
        }
        newText += source.substr(prevId);

        // Without this check this plugin would be specific to ArchWiki
        if (location.hostname == 'wiki.archlinux.org') {
            newText = fixArchWikiLinks(newText, target, sections);
        }

        return newText;
    };

    var fixArchWikiLinks = function (source, target, sections) {
        var links = WM.Parser.findTemplates(source, 'Related');

        var newText1 = "";
        var prevId = 0;

        for (var l = 0; l < links.length; l++) {
            newText1 += source.substring(prevId, links[l].index);
            newText1 += fixArchWikiLink(target, sections, links[l], 1);
            prevId = links[l].index + links[l].length;
        }
        newText1 += source.substr(prevId);

        var links2 = WM.Parser.findTemplates(newText1, 'Related2');

        var newText2 = "";
        var prevId = 0;

        for (var l = 0; l < links2.length; l++) {
            newText2 += newText1.substring(prevId, links2[l].index);
            newText2 += fixArchWikiLink(target, sections, links2[l], 2);
            prevId = links2[l].index + links2[l].length;
        }
        newText2 += newText1.substr(prevId);

        return newText2;
    };

    var fixArchWikiLink = function (target, sections, template, expectedArgs) {
        var args = template.arguments;

        // Don't crash in case of malformed templates
        if (args.length == expectedArgs) {
            var link = args[0].value;
            var fragId = link.indexOf('#');

            if (fragId > -1) {
                var ltitle = link.substring(0, fragId);

                // Note that it's impossible to recognize any namespaces in the title without querying the server
                // Alternatively, a list of the known namespaces could be maintained for each wiki
                // Recognizing namespaces would let recognize more liberal link syntaxes (e.g. spaces around the colon)
                if (WM.Parser.compareArticleTitles(ltitle, target)) {
                    var rawfragment = link.substr(fragId + 1);
                    var fixedFragment = fixFragment(rawfragment, sections);

                    if (fixedFragment === true) {
                        // Don't do anything in this case
                    }
                    else if (fixedFragment) {
                        var anchor = (args[1]) ? ("|" + args[1].value) : "";
                        var newlink = "{{" + template.title + "|" + target + "#" + fixedFragment  + anchor + "}}";
                        WM.Log.logInfo("Fixed broken link fragment: " + template.match[0] + " -> " + newlink);
                        return newlink;
                    }
                    else {
                        WM.Log.logWarning("Cannot fix broken link fragment: " + template.match[0]);
                    }
                }
            }
        }
        else {
            WM.Log.logWarning("Template:" + template.title + " must have " + expectedArgs + " and only " +
            expectedArgs + ((expectedArgs > 1) ? " arguments: " : " argument: ") + template.match[0]);
        }

        return template.match[0];
    };

    var fixFragment = function (rawfragment, sections) {
        if (rawfragment) {
            var fragment = WM.Parser.squashContiguousWhitespace(rawfragment).trim();

            if (sections.indexOf(fragment) < 0) {
                for (var s = 0; s < sections.length; s++) {
                    var section = sections[s];

                    // The FixFragments and FixLinkFragments plugins also try
                    // to fix dot-encoded fragments however it's too dangerous
                    // to do it with this bot plugin, have the user fix
                    // fragments manually
                    if (section.toLowerCase() == fragment.toLowerCase()) {
                        return section;
                    }
                }
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var target = WM.WhatLinksHere.getTitle();

        if (chainArgs === null) {
            var params = {
                'action': 'parse',
                'prop': 'sections',
                'page': target,
                'redirects': 1,
            };
            WM.Log.logWarning("If some articles in the list are linking to this article " +
                              "through a redirect, you should process the backlinks of that " +
                              "redirect page separately through its Special:WhatLinksHere " +
                              "page, as this plugin can only fix links that exactly match " +
                              "the title of this article.\nIn order to save time you are " +
                              "advised to hide the redirects in this list.");

            WM.MW.callAPIGet(params,
                             null,
                             WM.Plugins.FixBacklinkFragments.mainAutoFindSections,
                             [title, target, args, callBot]);
        }
        else {
            WM.Plugins.FixBacklinkFragments.mainAutoRead(target, chainArgs, title, args, callBot);
        }
    };

    this.mainAutoFindSections = function (res, args) {
        var title = args[0];
        var target = args[1];
        var summary = args[2];
        var callBot = args[3];
        var sections = [];

        for (var s = 0; s < res.parse.sections.length; s++) {
            sections.push(WM.Parser.squashContiguousWhitespace(res.parse.sections[s].line).trim());
        }

        WM.Plugins.FixBacklinkFragments.mainAutoRead(target, sections, title, summary, callBot);
    };

    this.mainAutoRead = function (target, sections, title, summary, callBot) {
        WM.MW.callQueryEdit(title,
                            WM.Plugins.FixBacklinkFragments.mainAutoWrite,
                            [target, summary, callBot, sections]);
    };

    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var target = args[0];
        var summary = args[1];
        var callBot = args[2];
        var sections = args[3];

        var newtext = fixLinks(source, target, sections);

        if (newtext != source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.FixBacklinkFragments.mainAutoEnd,
                               [callBot, sections]);
        }
        else {
            callBot(0, sections);
        }
    };

    this.mainAutoEnd = function (res, args) {
        var callBot = args[0];
        var sections = args[1];

        if (res.edit && res.edit.result == 'Success') {
            callBot(1, sections);
        }
        else if (res.error) {
            WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            callBot(res.error.code, sections);
        }
        else {
            callBot(false, sections);
        }
    };
};
