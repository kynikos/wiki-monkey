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


class module.exports.SynchronizeInterlanguageLinks
    constructor: (@WM) ->

    detectLang: (title, tag) =>
        # Without this check this plugin would be specific to ArchWiki
        if tag == "ArchWiki"
            detect = @WM.ArchWiki.detectLanguage(title)
            pureTitle = detect[0]
            tag = @WM.ArchWiki.getInterlanguageTag(detect[1])
        else
            pureTitle = title

        return [pureTitle, tag]

    computeWhiteList: (whitelist) =>
        # Without this check this plugin would be specific to ArchWiki
        if whitelist == "ArchWiki"
            return @WM.ArchWiki.getInternalInterwikiLanguages()
        else
            return whitelist

    computeSupportedLangs: (supportedLangs) =>
        # Without this check this plugin would be specific to ArchWiki
        if supportedLangs == "ArchWiki"
            return @WM.ArchWiki.getInterwikiLanguages()
        else
            return supportedLangs

    main: (args, callNext) ->
        title = @WM.Editor.getTitle()

        detect = @detectLang(title, args[0])
        pureTitle = detect[0]
        tag = detect[1]

        whitelist = @computeWhiteList(args[1])
        supportedLangs = @computeSupportedLangs(args[2])

        @WM.Log.logInfo("Synchronizing interlanguage links ...")

        @WM.MW.getInterwikiMap(
            title,
            @mainContinue,
            [tag, pureTitle, supportedLangs, whitelist, title, callNext]
        )

    mainContinue: (iwmap, args) =>
        tag = args[0]
        pureTitle = args[1]
        supportedLangs = args[2]
        whitelist = args[3]
        title = args[4]
        callNext = args[5]

        source = @WM.Editor.readSource()

        langlinks = @WM.Interlanguage.parseLinks(supportedLangs, source, iwmap)

        wikiUrls = @WM.MW.getWikiUrls()
        url = wikiUrls.short + encodeURIComponent(
                                @WM.Parser.squashContiguousWhitespace(title))

        visitedlinks = {}
        visitedlinks[tag.toLowerCase()] = @WM.Interlanguage.createVisitedLink(
                                            tag, pureTitle, url, iwmap,
                                            source, null, null, langlinks)

        newlinks = {}

        @WM.Log.logInfo("Reading " + @WM.Log.linkToPage(url, "edited article") +
                                                                    " ...")

        if langlinks
            for link in langlinks
                nlink = newlinks[link.lang.toLowerCase()]
                vlink = visitedlinks[link.lang.toLowerCase()]

                if not vlink and not nlink
                    newlinks[link.lang.toLowerCase()] = @WM.Interlanguage.createNewLink(
                                            link.lang, link.title, link.url)
                else if vlink and vlink.url != link.url
                    # Just ignore any conflicting links and warn the user:
                    # if it's a real conflict, the user will investigate it,
                    # otherwise the user will ignore it
                    @WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + @WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        @WM.Log.linkToPage(vlink.url, "[[" + link.lang + ":" +
                        visitedlinks[link.lang.toLowerCase()].title + "]]"))
                else if nlink and nlink.url != link.url
                    # Just ignore any conflicting links and warn the user:
                    # if it's a real conflict, the user will investigate it,
                    # otherwise the user will ignore it
                    @WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + @WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        @WM.Log.linkToPage(nlink.url, "[[" + link.lang + ":" +
                        newlinks[link.lang.toLowerCase()].title + "]]"))

            @WM.Interlanguage.collectLinks(
                visitedlinks,
                newlinks,
                supportedLangs,
                whitelist,
                false,
                @mainEnd,
                [tag, url, source, langlinks, iwmap, callNext]
            )
        else
            @WM.Log.logInfo("No interlanguage links found")

            if callNext
                callNext()

    mainEnd: (links, args) =>
        tag = args[0]
        url = args[1]
        source = args[2]
        langlinks = args[3]
        iwmap = args[4]
        callNext = args[5]

        newText = @WM.Interlanguage.updateLinks(tag, url, iwmap, source,
                                                            langlinks, links)

        if newText != source
            @WM.Editor.writeSource(newText)
            @WM.Log.logInfo("Synchronized interlanguage links")
        else
            @WM.Log.logInfo("Interlanguage links were already synchronized")

        if callNext
            callNext()

    mainAuto: (args, title, callBot, chainArgs) ->
        detect = @detectLang(title, args[0])
        pureTitle = detect[0]
        tag = detect[1]

        whitelist = @computeWhiteList(args[1])
        supportedLangs = @computeSupportedLangs(args[2])

        summary = args[3]

        wikiUrls = @WM.MW.getWikiUrls()
        url = wikiUrls.short + encodeURIComponent(
                                @WM.Parser.squashContiguousWhitespace(title))

        visitedlinks = {}

        newlinks = {}
        newlinks[tag.toLowerCase()] = @WM.Interlanguage.createNewLink(tag,
                                                            pureTitle, url)

        @WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            supportedLangs,
            whitelist,
            true,
            @mainAutoWrite,
            [title, url, tag, summary, callBot]
        )

    mainAutoWrite: (links, args) =>
        title = args[0]
        url = args[1]
        tag = args[2]
        summary = args[3]
        callBot = args[4]

        lcTag = tag.toLowerCase()
        # New links that were not in the white list will have the "iwmap"
        # attribute false, "timestamp" and "edittoken" null and "links" as an
        # empty array, however links[lcTag] should always be safe
        iwmap = links[lcTag].iwmap
        source = links[lcTag].source
        langlinks = links[lcTag].links
        timestamp = links[lcTag].timestamp
        edittoken = links[lcTag].edittoken

        newText = @WM.Interlanguage.updateLinks(tag, url, iwmap, source,
                                                            langlinks, links)

        if newText != source
            @WM.MW.callAPIPost({
                 action: "edit"
                 bot: "1"
                 title: title
                 summary: summary
                 text: newText
                 basetimestamp: timestamp
                 token: edittoken
                },
                @mainAutoEnd,
                callBot,
                null
            )
        else
            callBot(0, null)

    mainAutoEnd: (res, callBot) =>
        if res.edit and res.edit.result == 'Success'
            callBot(1, null)
        else if res.error
            @WM.Log.logError(res.error.info + " (" + res.error.code + ")")
            callBot(res.error.code, null)
        else
            callBot(false, null)
