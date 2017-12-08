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

CSS = require('../../lib.js.generic/dist/CSS')
HTTP = require('../../lib.js.generic/dist/HTTP')


class module.exports
    constructor: (@WM) ->

    makeUI: (args) ->
        CSS.addStyleElement("#WikiMonkey-ArchWikiQuickReport > select,
                    #WikiMonkey-ArchWikiQuickReport > input,
                    #WikiMonkey-ArchWikiQuickReport > a
                    {margin-left:0.33em;}")

        article = args[0]

        select = document.createElement('select')
        types = ["&lt;TYPE&gt;", "content", "style"]
        for value in types
            option = document.createElement('option')
            option.setAttribute('value', value)
            option.innerHTML = value
            select.appendChild(option)

        select.id = "WikiMonkey-ArchWikiQuickReport-select"

        input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.id = "WikiMonkey-ArchWikiQuickReport-input"

        link = document.createElement('a')
        link.href = "/index.php/" + article
        link.innerHTML = article

        span = document.createElement('span')
        span.id = "WikiMonkey-ArchWikiQuickReport"
        span.appendChild(select)
        span.appendChild(input)
        span.appendChild(link)

        return span

    main: (args, callNext) ->
        article = args[0]
        summary = args[1]

        @WM.Log.logInfo('Appending diff to ' +
                            @WM.Log.linkToWikiPage(article, article) + " ...")

        select = document.getElementById(
                                "WikiMonkey-ArchWikiQuickReport-select")
        type = select.options[select.selectedIndex].value

        if type != 'content' and type != 'style'
            @WM.Log.logError('Select a valid report type')
        else
            @WM.Diff.getEndTimestamp(
                            @mainGetEndTimestamp,
                            [article, type, summary, callNext])

    mainGetEndTimestamp: (enddate, args) =>
        article = args[0]
        type = args[1]
        summary = args[2]
        callNext = args[3]

        @WM.MW.callQueryEdit(article,
                            @mainWrite,
                            [type, summary, enddate, callNext])

    mainWrite: (article, source, timestamp, edittoken, args) =>
        type = args[0]
        summary = args[1]
        enddate = args[2]
        callNext = args[3]

        title = HTTP.getURIParameter(null, 'title')
        pEnddate = enddate.substr(0, 10) + "&nbsp;" + enddate.substr(11, 8)
        notes = document.getElementById(
                        "WikiMonkey-ArchWikiQuickReport-input").value

        newtext = @WM.Tables.appendRow(source, null, ["[" + location.href +
                                    " " + title + "]", pEnddate, type, notes])

        # Javascript doesn't support look behind...
        expsummary = summary.replace(/(^|[^%])(%%)*%t/g,
                                        '$1$2[[' + title + ']]')
        expsummary = expsummary.replace(/%(.)/g, '$1')

        @WM.MW.callAPIPost({
                            action: "edit",
                            bot: "1",
                            title: article,
                            summary: expsummary,
                            text: newtext,
                            basetimestamp: timestamp,
                            token: edittoken
                           },
                           @mainEnd,
                           [article, callNext],
                           null)

    mainEnd: (res, args) =>
        article = args[0]
        callNext = args[1]

        if res.edit and res.edit.result == 'Success'
            @WM.Log.logInfo('Diff correctly appended to ' +
                                    @WM.Log.linkToWikiPage(article, article))
            if callNext
                callNext()
        else
            @WM.Log.logError('The diff has not been appended!\n' +
                    res['error']['info'] + " (" + res['error']['code'] + ")")
