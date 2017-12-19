# Wiki Monkey - MediaWiki bot and editor-assistant user script
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

{Plugin} = require('./_Plugin')

CSS = require('../../auxiliary/lib.js.generic/dist/CSS')


class module.exports.ArchWikiRCFilter extends Plugin
    @conf_default:
        enabled: true
        filter_label: "Default filter"
        default_language: "English"

    main_recentchanges: ->
        h4s = $('#mw-content-text .mw-changeslist > h4')

        if h4s.eq(0).next()[0].localName.toLowerCase() != 'div'
            @WM.Log.logError("This filter is designed to work on top of
                              MediaWiki's filter, which you can
                              enable in your user preferences.")
        else
            CSS.addStyleElement("#mw-content-text > div > h4
                                                {background-color:#aaf;}
                    #mw-content-text > div > div > h5 {background-color:#afa;}")

            for h4 in h4s
                groupDiv = $(h4).next()
                for articleTable in groupDiv.children('table')
                    link = $(articleTable).find('a.mw-changeslist-title')
                                                                    .first()
                    if link[0]
                        [pureTitle, language] = @WM.ArchWiki.detectLanguage(
                                                                link[0].title)
                        if language != @conf.default_language
                            @moveArticle(groupDiv, articleTable, language)

            @WM.Log.logInfo("Grouped articles by language")

    moveArticle: (groupDiv, articleTable, language) ->
        langHs = groupDiv.children('h5')
        langFound = false
        for HLang, i in langHs
            if HLang.innerHTML == language
                if i + 1 < langHs.length
                    langHs.eq(i + 1).before(articleTable)
                else
                    groupDiv.append(articleTable)
                langFound = true
                break

        if not langFound
            groupDiv.append(
                $('<h5>').text(language),
                articleTable,
            )
