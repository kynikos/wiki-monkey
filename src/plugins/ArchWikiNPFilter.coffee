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

{jss} = require('../modules/libs')
{Plugin} = require('./_Plugin')


class module.exports.ArchWikiNPFilter extends Plugin
    @conf_default:
        enabled: true
        filter_label: "Default filter"
        default_language: "English"

    main_newpages: ->
        jss.createStyleSheet(
            {'@global #mw-content-text > h5': {backgroundColor: '#afa'}}
        ).attach()

        contentDiv = $('#mw-content-text')
        ul = contentDiv.find('ul').first()
        liList = ul.children('li')

        for li in liList
            link = $(li).find('a.mw-newpages-pagename').first()
            [pureTitle, language] = @WM.ArchWiki.detectLanguage(link[0].title)
            if language != @conf.default_language
                @moveArticle(contentDiv, li, language)

        @WM.Log.logInfo("Grouped articles by language")

    moveArticle: (contentDiv, li, language) ->
        langHs = contentDiv.children('h5')
        langFound = false
        for HLang in langHs
            if HLang.innerHTML == language
                ul = $(HLang).next().append(li)
                langFound = true
                break

        if not langFound
            contentDiv.append(
                $('<h5>').text(language),
                $('<ul>').append(li),
            )
