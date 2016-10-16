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


class module.exports.ArchWikiWantedCategories
    @REQUIRES_GM = false

    constructor: (@WM) ->

    mainAuto: (args, title, callBot, chainArgs) ->
        title = title.replace(" (page does not exist)", "")

        @WM.MW.callQuery({
                            prop: "info",
                            intoken: "edit",
                            titles: title
                        },
                        @mainAutoWrite,
                        [title, callBot],
                        null)

    mainAutoWrite: (page, args) ->
        title = args[0]
        callBot = args[1]

        edittoken = page.edittoken

        language = @WM.ArchWiki.detectLanguage(title)[1]

        if language != @WM.ArchWiki.getLocalLanguage()
            text = "[[Category:" + language + "]]"
            summary = "wanted category"

            @WM.MW.callAPIPost({
                                action: "edit",
                                bot: "1",
                                title: title,
                                summary: summary,
                                text: text,
                                createonly: "1",
                                token: edittoken
                               },
                               null,
                               @mainAutoEnd,
                               callBot,
                               null)
        else
            callBot(0, null)

    mainAutoEnd: (res, callBot) ->
        if res.edit and res.edit.result == 'Success'
            callBot(1, null)
        else if res.error
            @WM.Log.logError(res.error.info + " (" + res.error.code + ")")
            callBot(res.error.code, null)
        else
            callBot(false, null)
