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

WM.Plugins.ArchWikiFixHeader = new function () {
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();

        var language = WM.ArchWiki.detectLanguage(WM.Editor.getTitle())[1];

        var header = "";
        var content = source;

        // <noinclude>
        var content = content.replace(/^\s*<noinclude>/, "");
        if (content != source) {
            header += "<noinclude>\n";
        }

        // DISPLAYTITLE and Template:Lowercase_title
        var displaytitle = WM.Parser.findVariables(content, "DISPLAYTITLE");
        var lowercasetitle = WM.Parser.findTemplates(content,
                                                            "Lowercase title");
        var titlemods = displaytitle.concat(lowercasetitle);
        titlemods.sort(function (a, b) {
            return a.index - b.index;
        });
        var tempcontent = "";
        var contentId = 0;
        for (var t in titlemods) {
            tempcontent += content.substring(contentId, titlemods[t].index);
            contentId = titlemods[t].index + titlemods[t].length;
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        var dt = displaytitle.pop();
        var lct = lowercasetitle.pop();
        var dlct = "";
        if (dt && !lct) {
            var dlct = "{{DISPLAYTITLE:" + dt.value + "}}";
        }
        else if (!dt && lct) {
            var dlct = "{{Lowercase title}}";
        }
        else if (dt && lct) {
            var dlct = (dt.index < lct.index) ? "{{Lowercase title}}" :
                                        "{{DISPLAYTITLE:" + dt.value + "}}";
        }
        if (displaytitle.length || lowercasetitle.length) {
            WM.Log.logWarning("Found multiple instances of " +
                "{{DISPLAYTITLE:...}} or {{Lowercase title}}: only the last " +
                "one has been used, the others have been deleted");
        }

        // Behavior switches
        var behaviorswitches = WM.Parser.findBehaviorSwitches(content);
        var bslist = [];
        var tempcontent = "";
        var contentId = 0;
        for (var b in behaviorswitches) {
            var bs = behaviorswitches[b].match[1];
            if (bs == "TOC" || bs == "START" || bs == "END") {
                behaviorswitches.splice(b, 1);
            }
            else {
                if (bslist.indexOf(behaviorswitches[b].match[0]) == -1) {
                    bslist.push(behaviorswitches[b].match[0]);
                }
                else {
                    WM.Log.logWarning("Removed duplicate of " +
                                                behaviorswitches[b].match[0]);
                }
                tempcontent += content.substring(contentId,
                                                    behaviorswitches[b].index);
                contentId = behaviorswitches[b].index +
                                                    behaviorswitches[b].length;
            }
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;

        if (!dlct && bslist.length) {
            header += bslist.join(" ") + "\n";
        }
        else if (dlct && !bslist.length) {
            header += dlct + "\n";
        }
        else if (dlct && bslist.length) {
            header += dlct + " " + bslist.join(" ") + "\n";
        }

        // Categories
        var categories = WM.Parser.findCategories(content);
        var catlist = [];
        var catlinks = [];
        var tempcontent = "";
        var contentId = 0;
        for (var c in categories) {
            var cat = categories[c];
            if (cat.match[5]) {
                WM.Log.logWarning(cat.match[0] + " contains a fragment reference, but it doesn't make sense in categories and will be removed");
            }
            var cleantitle = WM.Parser.squashContiguousWhitespace(cat.match[4]);
            var catlang = WM.ArchWiki.detectLanguage(cleantitle)[1];
            var cattext = "Category:" + cleantitle;
            var catlink = "[[" + cattext + ((cat.match[6]) ? "|" + cat.match[6] : "") + "]]";
            if (language != catlang) {
                WM.Log.logWarning(cattext + " belongs to a different " +
                    "language than the one of the title (" + language + ")");
            }
            if (catlist.indexOf(cattext) < 0) {
                catlist.push(cattext);
                catlinks.push(catlink);
            }
            else {
                WM.Log.logWarning("Removed duplicate of " + cattext);
            }
            tempcontent += content.substring(contentId, cat.index);
            contentId = cat.index + cat.length;
        }
        if (catlist.length) {
            header += catlinks.join("\n") + "\n";
        }
        else {
            WM.Log.logWarning("The article is not categorized");
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;

        // Interlanguage links
        var interlanguage = WM.ArchWiki.findAllInterlanguageLinks(content);
        var iwlist = [];
        var iwlinks = [];
        var tempcontent = "";
        var contentId = 0;
        for (var l in interlanguage) {
            var link = interlanguage[l];
            if (link.match[6]) {
                WM.Log.logWarning(link.match[0] + " contains an alternative text, but it doesn't make sense in interlanguage links and will be removed");
            }
            // Applying WM.Parser.squashContiguousWhitespace is dangerous here
            //   because we don't know how the target server handles whitespace
            var linktitle = link.match[4];
            var linklang = link.match[2];
            var linktext = linklang + ":" + linktitle;
            var fulllink = "[[" + linktext + ((link.match[5]) ? "#" + link.match[5] : "") + "]]";
            if (iwlist.indexOf(linktext) < 0) {
                iwlist.push(linktext);
                iwlinks.push(fulllink);
            }
            else {
                WM.Log.logWarning("Removed duplicate of " + linktext);
            }
            tempcontent += content.substring(contentId, link.index);
            contentId = link.index + link.length;
        }
        if (iwlist.length) {
            iwlinks.sort();
            header += iwlinks.join("\n") + "\n";
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;

        var firstChar = content.search(/[^\s]/);
        content = content.substr(firstChar);

        var newText = header + content;

        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Fixed header");
        }

        if (callNext) {
            callNext();
        }
    };
};
