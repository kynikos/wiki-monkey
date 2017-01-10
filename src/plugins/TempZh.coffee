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

Str = require('../../lib.js.generic/dist/Str')

SUMMARY = "update zh-cn/tw interlanguage links to zh-hans/hant, see [[Help talk:I18n#Chinese interlanguage links]]"


class module.exports.TempZh
    @REQUIRES_GM = false

    constructor: (@WM) ->
        null

    main: ([search_tag], @callNext) ->
        @WM.Log.logInfo("Updating zh interlanguage links...")

        @WM.MW.callAPIGet({
            action: "query"
            list: "langbacklinks"
            lbllimit: 500
            lblprop: "lltitle"
            lbllang: search_tag
        },
        null,
        (res, args) => @iteratePages(res.query.langbacklinks, 0),
        [],
        null)

    iteratePages: (links, index) =>
        if links[index]
            title = links[index].title
            @WM.Log.logInfo("Updating #{title} ...")
            @WM.MW.callQueryEdit(title,
                                 @processPage,
                                 [links, index])
        else
            @WM.Log.logInfo("Links updated")
            if @callNext
                @callNext()

    processPage: (title, source, timestamp, edittoken, [links, index]) =>
        newText = source

        for [oldtag, newtag] in [['zh-cn', 'zh-hans'], ['zh-tw', 'zh-hant']]
            llinks = @WM.Parser.findInterlanguageLinks(newText, oldtag)

            if llinks.length > 1
                @WM.Log.logWarning("#{@WM.Log.linkToWikiPage(title, title)} must be
                        updated manually since it may contain duplicated interlanguage links")
                @iteratePages(links, index + 1)
                return false

            if llinks.length
                newText = Str.overwriteFor(newText, newtag, llinks[0].index + 2, oldtag.length)

        if source != newText
            # @WM.Log.logDebug('OK!!!')
            # @iteratePages(links, index + 1)
            @WM.MW.callAPIPost(
                    {action: "edit", bot: "1", title: title, summary: SUMMARY, \
                     text: newText, b1asetimestamp: timestamp, token: edittoken},
                    null,
                    @postWritePage,
                    [links, index],
                    null)
        else
            @WM.Log.logWarning("#{@WM.Log.linkToWikiPage(title, title)} must be
                                    checked manually")
            @iteratePages(links, index + 1)

    postWritePage: (res, [links, index]) =>
        if res.edit and res.edit.result == 'Success'
            @iteratePages(links, index + 1)
        else
            @WM.Log.logError(res['error']['info'] +
                                            " (" + res['error']['code'] + ")")
