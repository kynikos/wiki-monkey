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
Str = require('@kynikos/misc/dist/Str')


class module.exports.FixDoubleRedirects extends Plugin
    @conf_default:
        enabled: true
        special_menu: ["Fix double redirects"]
        edit_summary: "fix double redirect"

    main_special: (callNext) ->
        @WM.Log.logInfo("Fixing double redirects ...")

        {results, siteinfo} =
            await @WM.MW.getSpecialList("DoubleRedirects", "namespaces")

        {namespaces} = siteinfo
        results.reverse()

        try
            for doubleRedirect in results
                await @process_redirect(doubleRedirect, namespaces)
        catch error
            @WM.Log.logError(error.message)
            return false

        @WM.Log.logInfo("Fixed double redirects")
        if callNext
            callNext()

    process_redirect: (doubleRedirect, namespaces) =>
        {source, timestamp, edittoken} =
            await @WM.MW.callQueryEdit(doubleRedirect.title)
        doubleRedirectSource = source

        middleRedirectTitle =
            [namespaces[doubleRedirect.databaseResult.b_namespace]['*']
             doubleRedirect.databaseResult.b_title].join(':')

        middleRedirect = await @WM.MW.callQuery(
            prop: "revisions"
            rvprop: "content"
            titles: middleRedirectTitle
        )

        middleRedirectSource = middleRedirect.revisions[0]["*"]

        @WM.Log.logInfo("Processing #{@WM.Log.linkToWikiPage(
            doubleRedirect.title, doubleRedirect.title)} ...")

        rawOldTarget = doubleRedirectSource.match(/\s*#redirect\s*[^\n]+/i)
        oldTarget = @WM.Parser.findInternalLinks(rawOldTarget[0], null)[0]

        rawMiddleTarget = middleRedirectSource.match(/\s*#redirect\s*[^\n]+/i)
        middleTarget =
            @WM.Parser.findInternalLinks(rawMiddleTarget[0], null)[0]

        newTargetFragment = do ->
            if oldTarget.fragment
                return "#" + oldTarget.fragment
            else if middleTarget.fragment
                return "#" + middleTarget.fragment
            return ""

        newTargetAltAnchor = do ->
            if oldTarget.anchor
                return "|" + oldTarget.anchor
            else if middleTarget.anchor
                return "|" + middleTarget.anchor
            return ""

        newTargetInterlanguage = if doubleRedirect.databaseResult.c_interwiki \
            then doubleRedirect.databaseResult.c_interwiki + ":" else ""

        newTargetNamespace = do ->
            cns = namespaces[doubleRedirect.databaseResult.c_namespace]["*"]
            if cns
                return @WM.Parser.squashContiguousWhitespace(cns) + ":"
            return ""

        newTargetTitle = @WM.Parser.squashContiguousWhitespace(
            doubleRedirect.databaseResult.c_title)

        newTarget = "[[#{newTargetInterlanguage}#{newTargetNamespace}" +
            "#{newTargetTitle}#{newTargetFragment}#{newTargetAltAnchor}]]"
        newText = Str.overwriteFor(doubleRedirectSource, newTarget,
            oldTarget.index, oldTarget.length)

        if newText isnt doubleRedirectSource
            res = await @WM.MW.callAPIPost(
                action: "edit"
                bot: "1"
                title: doubleRedirect.title
                summary: @conf.edit_summary
                text: newText
                b1asetimestamp: timestamp
                token: edittoken
            )

            if not res.edit or res.edit.result isnt 'Success'
                throw new Error("#{res.error.info} (#{res.error.code})")

        else
            @WM.Log.logWarning("Could not fix #{@WM.Log.linkToWikiPage(
                doubleRedirect.title, doubleRedirect.title)}")
