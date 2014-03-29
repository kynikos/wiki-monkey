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

WM.Plugins.ArchWikiNPFilter = new function () {
    this.main = function (params) {
        GM_addStyle("#mw-content-text > h5 {background-color:#afa;}");

        var contentDiv = document.getElementById('mw-content-text');
        var ul = Alib.DOM.getChildrenByTagName(contentDiv, 'ul')[0];
        var liList = Alib.DOM.getChildrenByTagName(ul, 'li');
        var insertMark = ul.nextSibling;
        console.debug(JSON.stringify(insertMark));

        for (var liNum in liList) {
            var li = liList[liNum];
            var links = li.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                if (links[i].className == 'mw-newpages-pagename') {
                    var title = links[i].title;
                    WM.Plugins.ArchWikiNPFilter.moveArticle(params,
                                                            contentDiv,
                                                            insertMark,
                                                            li,
                                                            title);
                    break;
                }
            }
        }

        WM.Log.logInfo("Grouped articles by language");
    };

    this.moveArticle = function (params, contentDiv, insertMark, li, title) {
        var lang = WM.ArchWiki.detectLanguage(title);
        var pureTitle = lang[0];
        var language = lang[1];
        if (language != params.language) {
            var langHs = Alib.DOM.getChildrenByTagName(contentDiv, 'h5');
            var langFound = false;
            for (var i = 0; i < langHs.length; i++) {
                var HLang = langHs[i];
                if (HLang.innerHTML == language) {
                    var ul = Alib.DOM.getNextElementSibling(HLang);
                    ul.appendChild(li);
                    langFound = true;
                    break;
                }
            }
            if (!langFound) {
                var langH = document.createElement('h5');
                langH.innerHTML = language;
                var ul = document.createElement('ul');
                contentDiv.insertBefore(langH, insertMark);
                contentDiv.insertBefore(ul, insertMark);
                ul.appendChild(li);
            }
        }
    }
};
