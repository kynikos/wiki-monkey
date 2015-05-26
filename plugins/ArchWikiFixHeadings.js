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

WM.Plugins.ArchWikiFixHeadings = new function () {
    "use strict";

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();

        var info = WM.Parser.findSectionHeadings(source);

        var increaseLevel;
        if (WM.Editor.isSection()) {
            increaseLevel = info.minLevel - 1;
        }
        else {
            if (info.maxTocLevel < 6) {
                increaseLevel = 1;
            }
            else {
                increaseLevel = 0;
                WM.Log.logWarning("There are 6 levels of headings, it's been " +
                    "necessary to start creating them from level 1 although " +
                    "usually it's suggested to start from level 2");
            }
        }

        var newtext = "";
        var prevId = 0;
        var section;

        for (var s in info.sections) {
            section = info.sections[s];
            newtext += source.substring(prevId, section.index);
            newtext += new Array(section.tocLevel + increaseLevel + 1).join(
                                                                        "=");
            newtext += section.rawheading;
            newtext += new Array(section.tocLevel + increaseLevel + 1).join(
                                                                        "=");
            prevId = section.index + section.length0;
        }
        newtext += source.substr(prevId);

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed section headings");
        }

        if (callNext) {
            callNext();
        }
    };
};
