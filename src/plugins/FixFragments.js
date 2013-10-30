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

WM.Plugins.FixFragments = new function () {
    var fixLinks = function (source) {
        var title = WM.Editor.getTitle();
        var sections = WM.Parser.findSectionHeadings(source).sections;

        var slinks = WM.Parser.findSectionLinks(source);
        var newtext1 = "";
        var prevId = 0;

        for (var l = 0; l < slinks.length; l++) {
            var link = slinks[l];
            newtext1 += source.substring(prevId, link.index);
            newtext1 += fixLink(source, sections, link.match[0], link.match[1], link.match[2]);
            prevId = link.index + link.length;
        }
        newtext1 += source.substr(prevId);

        // Note that it's impossible to recognize any namespaces in the title without querying the server
        // Alternatively, a list of the known namespaces could be maintained for each wiki
        // Recognizing namespaces would let recognize more liberal link syntaxes (e.g. spaces around the colon)
        var ilinks = WM.Parser.findInternalLinks(newtext1, null, title);
        var newtext2 = "";
        var prevId = 0;

        for (var l = 0; l < ilinks.length; l++) {
            var link = ilinks[l];
            newtext2 += newtext1.substring(prevId, link.index);
            var rawfragment = link.match[5];

            if (rawfragment) {
                newtext2 += fixLink(newtext1, sections, link.match[0], rawfragment, link.match[6]);
            }
            else {
                newtext2 += link.match[0];
            }

            prevId = link.index + link.length;
        }
        newtext2 += newtext1.substr(prevId);

        return newtext2;
    };

    var fixLink = function (source, sections, rawlink, rawfragment, lalt) {
        var fragment = WM.Parser.squashContiguousWhitespace(rawfragment).trim();

        for (var s = 0; s < sections.length; s++) {
            var heading = sections[s].cleanheading;

            if (heading.toLowerCase() == fragment.toLowerCase()) {
                return newlink = "[[#" + heading + ((lalt) ? "|" + lalt : "") + "]]";
            }
        }

        WM.Log.logWarning("Cannot fix broken section link: " + rawlink);
        return rawlink;
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = fixLinks(source);

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed section links");
        }
        else {
            WM.Log.logInfo("No fixable section links found");
        }

        if (callNext) {
            callNext();
        }
    };
};
