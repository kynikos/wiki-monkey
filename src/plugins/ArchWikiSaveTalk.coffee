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

{jssc} = require('../modules/libs')
WM = require('../modules')
App = require('../app')
{Plugin} = require('./_Plugin')


class module.exports.ArchWikiSaveTalk extends Plugin
    @conf_default:
        enabled: false
        diff_menu: ["Save discussion"]
        page: null
        edit_summary: "add discussion"

    makeUI: ->
        {classes} = jssc(
            saveTalk:
                marginLeft: '0.33em'
        )

        article = @conf.page

        link = document.createElement('a')
        link.id = "WikiMonkey-ArchWikiSaveTalk"
        link.className = classes.saveTalk
        link.href = "/index.php/" + article
        link.innerHTML = article

        return link

    main_diff: (callNext) ->
        article = @conf.page
        summary = @conf.edit_summary

        App.log.logInfo('Appending diff to ' +
                            App.log.linkToWikiPage(article, article) + " ...")

        WM.Diff.getEndTimestamp(
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

        title = mw.config.get('wgPageName')
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
            @mainEnd,
            [article, callNext],
            null
        )

    mainEnd: (res, args) =>
        article = args[0]
        callNext = args[1]

        if res.edit and res.edit.result == 'Success'
            App.log.logInfo('Diff correctly appended to ' +
                                    App.log.linkToWikiPage(article, article))
            if callNext
                callNext()
        else
            App.log.logError('The diff has not been appended!\n' +
                    res['error']['info'] + " (" + res['error']['code'] + ")")
