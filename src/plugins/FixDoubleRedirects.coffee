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


class module.exports.FixDoubleRedirects
    @REQUIRES_GM = false

    constructor: (@WM) ->
        null

    main: (args, callNext) ->
        summary = args

        @WM.Log.logInfo("Fixing double redirects ...")

        @WM.MW.getSpecialList("DoubleRedirects",
                             "namespaces",
                             @reverseResults,
                             [summary, callNext])

    reverseResults: (results, siteinfo, args) =>
        summary = args[0]
        callNext = args[1]

        namespaces = siteinfo.namespaces

        results.reverse()

        @iterateList(results, namespaces, [summary, callNext])

    iterateList: (doubleRedirects, namespaces, args) =>
        summary = args[0]
        callNext = args[1]

        doubleRedirect = doubleRedirects.pop()

        if doubleRedirect
            @WM.MW.callQueryEdit(doubleRedirect.title,
                            @readMiddleRedirect,
                            [doubleRedirect, doubleRedirects, namespaces,
                             summary, callNext])
        else
            @WM.Log.logInfo("Fixed double redirects")
            if callNext
                callNext()

    readMiddleRedirect: (doubleRedirectTitle,
                            doubleRedirectSource, timestamp, edittoken, args) =>
        doubleRedirect = args[0]
        doubleRedirects = args[1]
        namespaces = args[2]
        summary = args[3]
        callNext = args[4]
        middleRedirectTitle = namespaces[doubleRedirect.databaseResult.nsb]['*'] + ':' +
                                doubleRedirect.databaseResult.tb

        @WM.MW.callQuery({prop: "revisions", rvprop: "content", titles: middleRedirectTitle},
                         @processDoubleRedirect,
                         [doubleRedirect, doubleRedirectTitle,
                          doubleRedirectSource, timestamp, edittoken,
                          doubleRedirects, namespaces, summary, callNext],
                         null)

    processDoubleRedirect: (middleRedirect, args) =>
        middleRedirectSource = middleRedirect.revisions[0]["*"]
        doubleRedirect = args[0]
        doubleRedirectTitle = args[1]
        doubleRedirectSource = args[2]
        timestamp = args[3]
        edittoken = args[4]
        doubleRedirects = args[5]
        namespaces = args[6]
        summary = args[7]
        callNext = args[8]

        @WM.Log.logInfo("Processing " + @WM.Log.linkToWikiPage(
                        doubleRedirectTitle, doubleRedirectTitle) + " ...")

        rawOldTarget = doubleRedirectSource.match(/\s*#redirect\s*[^\n]+/i)
        oldTarget = @WM.Parser.findInternalLinks(rawOldTarget[0], null)[0]

        rawMiddleTarget = middleRedirectSource.match(
                                                    /\s*#redirect\s*[^\n]+/i)
        middleTarget = @WM.Parser.findInternalLinks(rawMiddleTarget[0],
                                                                    null)[0]

        if oldTarget.fragment
            newTargetFragment = "#" + oldTarget.fragment
        else if middleTarget.fragment
            newTargetFragment = "#" + middleTarget.fragment
        else
            newTargetFragment = ""

        if oldTarget.anchor
            newTargetAltAnchor = "|" + oldTarget.anchor
        else if middleTarget.anchor
            newTargetAltAnchor = "|" + middleTarget.anchor
        else
            newTargetAltAnchor = ""

        if doubleRedirect.databaseResult.iwc
            newTargetInterlanguage = doubleRedirect.databaseResult.iwc + ":"
        else
            newTargetInterlanguage = ""

        if namespaces[doubleRedirect.databaseResult.nsc]["*"]
            newTargetNamespace = @WM.Parser.squashContiguousWhitespace(
                                namespaces[doubleRedirect.databaseResult.nsc]["*"]) + ":"
        else
            newTargetNamespace = ""

        newTargetTitle = @WM.Parser.squashContiguousWhitespace(
                                            doubleRedirect.databaseResult.tc)

        newTarget = "[[" + newTargetInterlanguage +
                        newTargetNamespace + newTargetTitle +
                        newTargetFragment + newTargetAltAnchor + "]]"
        newText = Str.overwriteFor(doubleRedirectSource, newTarget,
                                            oldTarget.index, oldTarget.length)

        if newText != doubleRedirectSource
            @WM.MW.callAPIPost(
                    {action: "edit", bot: "1", title: doubleRedirectTitle, summary: summary, text: newText, b1asetimestamp: timestamp, token: edittoken},
                    null,
                    @processDoubleRedirectEnd,
                    [doubleRedirects, namespaces, summary, callNext],
                    null)
        else
            @WM.Log.logWarning("Could not fix " +
                                @WM.Log.linkToWikiPage(doubleRedirectTitle,
                                doubleRedirectTitle))
            @iterateList(doubleRedirects, namespaces, [summary, callNext])

    processDoubleRedirectEnd: (res, args) =>
        doubleRedirects = args[0]
        namespaces = args[1]
        summary = args[2]
        callNext = args[3]

        if res.edit and res.edit.result == 'Success'
            @iterateList(doubleRedirects, namespaces, [summary, callNext])
        else
            @WM.Log.logError(res['error']['info'] +
                                            " (" + res['error']['code'] + ")")
