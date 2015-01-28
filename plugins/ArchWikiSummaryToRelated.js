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

WM.Plugins.ArchWikiSummaryToRelated = new function () {
    "use strict";

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();

        var asstarts = WM.Parser.findTemplates(source,
                                                    'Article summary start');
        var asends = WM.Parser.findTemplates(source, 'Article summary end');

        if (asstarts.length && asends.length &&
                                        asstarts[0].index < asends[0].index) {
            var asstart = asstarts[0];
            var asend = asends[0];
            var newText = source.substring(0, asstart.index).trim();

            var aswikis = WM.Parser.findTemplates(source,
                                                    'Article summary wiki');

            if (aswikis.length) {
                var language = WM.ArchWiki.detectLanguage(
                                                    WM.Editor.getTitle())[1];
                var suffix = ((language == "English") ? "" : " (" +
                                                            language + ")");
                newText += "\n{{Related articles start" + suffix + "}}\n";

                for (var w = 0; w < aswikis.length; w++) {
                    var link = aswikis[w].arguments[0].value;
                    newText += "{{Related|" + link + "}}\n";
                }
                newText += "{{Related articles end}}";
            }

            newText += "\n\n-----------------------------------------------\n";
            newText += source.substring(asstart.index, asend.index +
                                                        asend.length).trim();
            newText += "\n-----------------------------------------------\n\n";
            newText += source.substr(asend.index + asend.length).trim();

            WM.Editor.writeSource(newText);
            WM.Log.logWarning("Started converting Article summary to " +
                    "Related articles, but manual intervention is required.");
        }

        if (callNext) {
            callNext();
        }
    };
};
