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
HTTP = require('../../lib.js.generic/dist/HTTP')


class module.exports.ArchWikiSaveTalk
    @REQUIRES_GM = false

    constructor: (@WM) ->

    makeUI: (args) ->
        CSS.addStyleElement("#WikiMonkey-ArchWikiSaveTalk
                                                    {margin-left:0.33em;}")

        article = args[0]

        link = document.createElement('a')
        link.id = "WikiMonkey-ArchWikiSaveTalk"
        link.href = "/index.php/" + article
        link.innerHTML = article

        return link

    main: (args, callNext) ->
        article = args[0]
        summary = args[1]

        @WM.Log.logInfo('Appending diff to ' +
                            @WM.Log.linkToWikiPage(article, article) + " ...")

        @WM.Diff.getEndTimestamp(
                            @mainGetEndTimestamp,
                            [article, summary, callNext])

    mainGetEndTimestamp: (enddate, args) =>
        article = args[0]
        summary = args[1]
        callNext = args[2]

        @WM.MW.callQueryEdit(article,
                            @mainWrite,
                            [summary, enddate, callNext])

    mainWrite: (article, source, timestamp, edittoken, args) =>
        summary = args[0]
        enddate = args[1]
        callNext = args[2]

        title = HTTP.getURIParameter(null, 'title')
        pEnddate = enddate.substr(0, 10) + "&nbsp;" + enddate.substr(11, 8)

        newtext = @WM.Tables.appendRow(source, "<!-- REPLY TABLE -->",
                        ["[" + location.href + " " + title + "]", pEnddate])

        @WM.MW.callAPIPost(
            {
                action: "edit",
                bot: "1",
                title: article,
                summary: summary,
                text: newtext,
                basetimestamp: timestamp,
                token: edittoken
            },
            null,
            @mainEnd,
            [article, callNext],
            null
        )

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
