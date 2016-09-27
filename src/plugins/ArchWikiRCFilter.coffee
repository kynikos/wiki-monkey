# Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

CSS = require('../../lib.js.generic/dist/CSS')
DOM = require('../../lib.js.generic/dist/DOM')


class module.exports.ArchWikiRCFilter
    constructor: (@WM) ->

    main: (params) ->
        h4s = DOM.getChildrenByTagName(
                        document.getElementById('mw-content-text')
                        .getElementsByClassName('mw-changeslist')[0], 'h4')

        if DOM.getNextElementSibling(h4s[0]).localName.toLowerCase() !=
                                                                    'div'
            @WM.Log.logError("This filter is designed to work on top of
                                        MediaWiki's filter, which you can
                                        enable in your user preferences.")
        else
            CSS.addStyleElement("#mw-content-text > div > h4
                                                {background-color:#aaf;}
                    #mw-content-text > div > div > h5 {background-color:#afa;}")

            for h4 in h4s
                groupDiv = DOM.getNextElementSibling(h4);
                articleTables = DOM.getChildrenByTagName(groupDiv,
                                                                    'table')
                for articleTable in articleTables
                    links = articleTable.getElementsByTagName('a')
                    for link in links
                        if link.className == 'mw-changeslist-title'
                            title = link.title
                            @WM.Plugins.ArchWikiRCFilter.moveArticle(params,
                                                                groupDiv,
                                                                articleTable,
                                                                title)
                            break

            @WM.Log.logInfo("Grouped articles by language")

    moveArticle: (params, groupDiv, articleTable, title) ->
        lang = @WM.ArchWiki.detectLanguage(title)
        pureTitle = lang[0]
        language = lang[1]
        if language != params.language
            langHs = DOM.getChildrenByTagName(groupDiv, 'h5')
            langFound = false
            for i in [0...langHs.length]
                HLang = langHs[i];
                if HLang.innerHTML == language
                    if i + 1 < langHs.length
                        groupDiv.insertBefore(articleTable, langHs[i + 1])
                    else
                        groupDiv.appendChild(articleTable)
                    langFound = true
                    break

            if not langFound
                langH = document.createElement('h5')
                langH.innerHTML = language
                groupDiv.appendChild(langH)
                groupDiv.appendChild(articleTable)
