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


class module.exports.ArchWikiNPFilter
    constructor: (@WM) ->

    main: (params) ->
        CSS.addStyleElement("#mw-content-text > h5
                                  {background-color:#afa;}")

        contentDiv = document.getElementById('mw-content-text')
        ul = contentDiv.getElementsByTagName('ul')[0]
        liList = DOM.getChildrenByTagName(ul, 'li')
        insertMark = ul.nextSibling

        for li in liList
            links = li.getElementsByTagName('a')
            for link in links
                if link.className == 'mw-newpages-pagename'
                    title = link.title
                    @WM.Plugins.ArchWikiNPFilter.moveArticle(params,
                                                            contentDiv,
                                                            insertMark,
                                                            li,
                                                            title)
                    break

        @WM.Log.logInfo("Grouped articles by language")

    moveArticle: (params, contentDiv, insertMark, li, title) ->
        lang = @WM.ArchWiki.detectLanguage(title)
        pureTitle = lang[0]
        language = lang[1]
        if language != params.language
            langHs = DOM.getChildrenByTagName(contentDiv, 'h5')
            langFound = false
            for HLang in langHs
                if HLang.innerHTML == language
                    ul = DOM.getNextElementSibling(HLang)
                    ul.appendChild(li)
                    langFound = true
                    break

            if not langFound
                langH = document.createElement('h5')
                langH.innerHTML = language
                ul = document.createElement('ul')
                contentDiv.insertBefore(langH, insertMark)
                contentDiv.insertBefore(ul, insertMark)
                ul.appendChild(li)
