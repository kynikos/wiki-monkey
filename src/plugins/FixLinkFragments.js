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

WM.Plugins.FixLinkFragments = new function () {
    this.processLink = function (links, index, source, newText, prevId, call, callArgs) {
        if (links[index]) {
            var link = links[index];
            var rawfragment = link.match[5];

            if (rawfragment) {
                WM.Log.logInfo("Processing " + link.match[0] + "...");

                var target = ((link.match[2]) ? link.match[2] + ":" : "") + link.match[4];

                var params = {
                    'action': 'parse',
                    'prop': 'sections',
                    'page': target,
                    'redirects': 1,
                };

                WM.MW.callAPIGet(params,
                                 null,
                                 WM.Plugins.FixLinkFragments.processLinkContinue,
                                 [link, target, rawfragment, links, index, source, newText, prevId, call, callArgs]);
            }
            else {
                index++;
                WM.Plugins.FixLinkFragments.processLink(links, index, source, newText, prevId, call, callArgs);
            }
        }
        else {
            newText += source.substr(prevId);
            call(source, newText, callArgs);
        }
    };

    this.processLinkContinue = function (res, args) {
        var link = args[0];
        var target = args[1];
        var rawfragment = args[2];
        var links = args[3];
        var index = args[4];
        var source = args[5];
        var newText = args[6];
        var prevId = args[7];
        var call = args[8];
        var callArgs = args[9];

        var sections = [];

        for (var s = 0; s < res.parse.sections.length; s++) {
            sections.push(WM.Parser.squashContiguousWhitespace(res.parse.sections[s].line).trim());
        }

        newText += source.substring(prevId, link.index);
        newText += fixLink(source, sections, link.match[0], target, rawfragment, link.match[6]);
        prevId = link.index + link.length;

        index++;
        WM.Plugins.FixLinkFragments.processLink(links, index, source, newText, prevId, call, callArgs);
    };

    var fixLink = function (source, sections, rawlink, target, rawfragment, lalt) {
        var fragment = WM.Parser.squashContiguousWhitespace(rawfragment).trim();

        if (sections.indexOf(fragment) < 0) {
            for (var s = 0; s < sections.length; s++) {
                var section = sections[s];
                var dotSection = WM.Parser.dotEncode(section);
                var dotFragment = WM.Parser.dotEncode(fragment);

                if (dotSection.toLowerCase() == dotFragment.toLowerCase()) {
                    if (fragment == dotFragment) {
                        // If the fragment was encoded, re-encode it because it
                        // could contain link-breaking characters (e.g. []|{})
                        // The condition would also be true if the fragment doesn't
                        // contain any encodable characters, but since section and
                        // fragment at most differ by capitalization, encoding the
                        // section won't have any effect
                        return newlink = "[[" + target + "#" + dotSection + ((lalt) ? "|" + lalt : "") + "]]";
                    }
                    else {
                        // If the fragment was not encoded, if the fragment
                        // contained link-breaking characters the link was already
                        // broken, and replacing it with section wouldn't make
                        // things worse; if the fragment didn't contain
                        // link-breaking characters, the section doesn't either,
                        // since section and fragment at most differ by
                        // capitalization, so it's safe to replace it
                        // If the fragment was *partially* encoded instead, a
                        // link-breaking character may have been encoded, so all
                        // link-breaking characters must be re-encoded here!
                        var escSection = WM.Parser.dotEncodeLinkBreakingFragmentCharacters(section);
                        return newlink = "[[" + target + "#" + escSection + ((lalt) ? "|" + lalt : "") + "]]";
                    }
                }
            }

            WM.Log.logWarning("Cannot fix broken section link: " + rawlink);
        }

        return rawlink;

    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Fixing links to sections of other articles...");
        var links = WM.Parser.findInternalLinks(source, null, null);
        WM.Plugins.FixLinkFragments.processLink(links, 0, source, "", 0, WM.Plugins.FixLinkFragments.mainEnd, callNext);
    };

    this.mainEnd = function (source, newText, callNext) {
        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Replaced links to sections of other articles");
        }
        else {
            WM.Log.logInfo("No fixable links to sections of other articles found");
        }

        if (callNext) {
            callNext();
        }
    };
};
