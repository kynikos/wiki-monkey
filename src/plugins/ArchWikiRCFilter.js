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

WM.Plugins.ArchWikiRCFilter = new function () {
    this.main = function (params) {
        var h4s = Alib.DOM.getChildrenByTagName(document.getElementById('mw-content-text'), 'h4');

        if (Alib.DOM.getNextElementSibling(h4s[0]).localName.toLowerCase() != 'div') {
            WM.Log.logError("This filter is designed to work on top of MediaWiki's filter, which you can enable in your user preferences.");
        }
        else {
            GM_addStyle("#mw-content-text > h4 {background-color:#aaf;} " +
                        "#mw-content-text > div > h5 {background-color:#afa;}");

            for (var h4n in h4s) {
                var groupDiv = Alib.DOM.getNextElementSibling(h4s[h4n]);
                var articleTables = Alib.DOM.getChildrenByTagName(groupDiv, 'table');
                for (var aTn in articleTables) {
                    var articleTable = articleTables[aTn];
                    var links = articleTable.getElementsByTagName('a');
                    for (var i = 0; i < links.length; i++) {
                        if (links[i].className == 'mw-changeslist-title') {
                            var title = links[i].title;
                            WM.Plugins.ArchWikiRCFilter.moveArticle(params,
                                                                    groupDiv,
                                                                    articleTable,
                                                                    title);
                            break;
                        }
                    }
                }
            }

            WM.Log.logInfo("Grouped articles by language");
        }
    };

    this.moveArticle = function (params, groupDiv, articleTable, title) {
        var lang = WM.ArchWiki.detectLanguage(title);
        var pureTitle = lang[0];
        var language = lang[1];
        if (language != params.language) {
            var langHs = Alib.DOM.getChildrenByTagName(groupDiv, 'h5');
            var langFound = false;
            for (var i = 0; i < langHs.length; i++) {
                var HLang = langHs[i];
                if (HLang.innerHTML == language) {
                    if (i + 1 < langHs.length) {
                        groupDiv.insertBefore(articleTable, langHs[i + 1]);
                    }
                    else {
                        groupDiv.appendChild(articleTable);
                    }
                    langFound = true;
                    break;
                }
            }
            if (!langFound) {
                var langH = document.createElement('h5');
                langH.innerHTML = language;
                groupDiv.appendChild(langH);
                groupDiv.appendChild(articleTable);
            }
        }
    }
};
