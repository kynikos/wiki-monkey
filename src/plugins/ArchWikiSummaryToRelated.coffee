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


class module.exports.ArchWikiSummaryToRelated
    constructor: (@WM) ->

    main: (args, callNext) ->
        source = @WM.Editor.readSource()

        asstarts = @WM.Parser.findTemplates(source, 'Article summary start')
        asends = @WM.Parser.findTemplates(source, 'Article summary end')

        if asstarts.length and asends.length and
                                        asstarts[0].index < asends[0].index
            asstart = asstarts[0]
            asend = asends[0]
            newText = source.substring(0, asstart.index).trim()

            aswikis = @WM.Parser.findTemplates(source, 'Article summary wiki')

            if aswikis.length
                language = @WM.ArchWiki.detectLanguage(
                                                    @WM.Editor.getTitle())[1]
                suffix = if language == "English" then "" else " (" + language + ")"
                newText += "\n{{Related articles start" + suffix + "}}\n"

                for aswiki in aswikis
                    link = aswiki.arguments[0].value
                    newText += "{{Related|" + link + "}}\n"

                newText += "{{Related articles end}}"

            newText += "\n\n-----------------------------------------------\n"
            newText += source.substring(asstart.index, asend.index +
                                                        asend.length).trim()
            newText += "\n-----------------------------------------------\n\n"
            newText += source.substr(asend.index + asend.length).trim()

            @WM.Editor.writeSource(newText)
            @WM.Log.logWarning("Started converting Article summary to " +
                    "Related articles, but manual intervention is required.")

        if callNext
            callNext()
