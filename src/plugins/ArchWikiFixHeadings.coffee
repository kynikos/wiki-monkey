# Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
# Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
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


class module.exports.ArchWikiFixHeadings
    constructor: (@WM) ->

    main: (args, callNext) ->
        source = @WM.Editor.readSource()

        info = @WM.Parser.findSectionHeadings(source)

        if @WM.Editor.isSection()
            increaseLevel = info.minLevel - 1
        else
            if info.maxTocLevel < 6
                increaseLevel = 1
            else
                increaseLevel = 0
                @WM.Log.logWarning("There are 6 levels of headings, it has
                    been necessary to start creating them from level 1
                    although usually it is suggested to start from level 2")

        newtext = ""
        prevId = 0

        for section in info.sections
            newtext += source.substring(prevId, section.index)
            newtext += new Array(section.tocLevel + increaseLevel + 1).join(
                                                                        "=")
            newtext += section.rawheading
            newtext += new Array(section.tocLevel + increaseLevel + 1).join(
                                                                        "=")
            prevId = section.index + section.length0

        newtext += source.substr(prevId)

        if newtext != source
            @WM.Editor.writeSource(newtext)
            @WM.Log.logInfo("Fixed section headings")

        if callNext
            callNext()
