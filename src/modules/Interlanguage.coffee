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

WM = require('./index')
App = require('../app')


class module.exports
    constructor: (@WM) ->

    parseLinks: (supportedLangs, source, iwmap) =>
        parsedLinks = WM.Parser.findSpecialLinks(
            source,
            supportedLangs.join("|")
        )

        langlinks = []
        for link in parsedLinks
            # Do not store the tag lowercased, since it should be kept as
            # original
            ltag = link.namespace
            ltitle = link.title + (if link.fragment then ("#" + link.fragment) else "")
            for iw in iwmap
                if iw.prefix.toLowerCase() == ltag.toLowerCase()
                    # Fix the url _before_ replacing $1
                    lurl = WM.MW.fixInterwikiUrl(iw.url)
                    lurl = lurl.replace("$1", encodeURIComponent(
                                WM.Parser.squashContiguousWhitespace(ltitle)))
                    break

            langlinks.push({lang: ltag, title: ltitle, url: lurl, index: link.index, length: link.length})

        return langlinks

    queryLinks: (queryTitle, title, supportedLangs,
                                    whitelist, firstPage, callEnd, callArgs) =>
        query =
            action: "query"
            prop: "info|revisions"
            rvprop: "content|timestamp"
            intoken: "edit"
            titles: queryTitle
            meta: "siteinfo"
            siprop: "interwikimap"
            sifilteriw: "local"

        # When called by the bot, if the start page is a redirect itself, it
        # shoudln't be resolved
        if not firstPage
            query.redirects = "1"

        WM.MW.callAPIGet(
            query,
            (res, args) =>
                if res.query.pages
                    page = Object.values(res.query.pages)[0]
                    if page.revisions
                        error = null
                        source = page.revisions[0]["*"]
                        timestamp = page.revisions[0].timestamp
                        edittoken = page.edittoken
                        iwmap = res.query.interwikimap
                        langlinks = @parseLinks(supportedLangs, source, iwmap)
                    else
                        # The requested article doesn't exist
                        error = 'nonexisting'
                        source = false
                        timestamp = false
                        edittoken = false
                        iwmap = res.query.interwikimap
                        langlinks = false

                else if res.query.redirects
                    # The requested article is an unsolved redirect
                    # (redirect over interwiki link?)
                    error = 'unsolvedredirect'
                    source = false
                    timestamp = false
                    edittoken = false
                    iwmap = res.query.interwikimap
                    langlinks = false

                else
                    # Unknown error
                    error = 'unknown'
                    source = false
                    timestamp = false
                    edittoken = false
                    iwmap = res.query.interwikimap
                    langlinks = false

                callEnd(
                    title,
                    supportedLangs,
                    whitelist,
                    false,
                    error,
                    langlinks,
                    iwmap,
                    source,
                    timestamp,
                    edittoken,
                    args
                )
            ,
            callArgs,
            (args) ->
                callEnd(
                    title,
                    supportedLangs,
                    whitelist,
                    false,
                    'unknown',
                    false,
                    false,
                    false,
                    false,
                    false,
                    args
                )
        )

    createNewLink: (origTag, title, url) =>
        return {origTag: origTag, title: title, url: url}

    createVisitedLink: (origTag, title, url, iwmap, source,
                                                timestamp, edittoken, links) =>
        entry =
            origTag: origTag
            title: title
            url: url
            iwmap: iwmap
            source: source
            timestamp: timestamp
            edittoken: edittoken
            links: []

        for link in links
            entry.links.push(link)

        return entry

    collectLinks: (visitedlinks, newlinks, supportedLangs,
                                    whitelist, firstPage, callEnd, callArgs) =>
        for tag of newlinks
            link = newlinks[tag]
            break

        if link
            delete newlinks[tag]

            url = link.url

            # Don't use WM.MW.getTitleFromWikiUrl(decodeURI(url)) because
            # it wouldn't decode some characters like colons, which are
            # required to be decoded instead when making an API call
            queryTitle = decodeURIComponent(WM.MW.getTitleFromWikiUrl(url))

            if queryTitle
                origTag = link.origTag
                title = link.title

                # If this is the first processed page, it's local for sure, so
                #   query its links in any case. This e.g. prevents the
                #   application from crashing in case the local page is in a
                #   language whose language tag is not in the white list
                # tag is already lower-cased
                if firstPage or whitelist.indexOf(tag) > -1
                    App.log.logInfo("Reading " +
                                App.log.linkToPage(url, "[[" + origTag + ":" +
                                title + "]]") + " ...")

                    this.queryLinks(
                        queryTitle,
                        title,
                        supportedLangs,
                        whitelist,
                        firstPage,
                        @_collectLinksContinue,
                        [url, tag, origTag, visitedlinks, newlinks, callEnd,
                                                                    callArgs]
                    )
                else
                    @_collectLinksContinue(
                        title,
                        supportedLangs,
                        whitelist,
                        firstPage,
                        'notinwhitelist',
                        [],
                        false,
                        null,
                        null,
                        null,
                        [url, tag, origTag, visitedlinks, newlinks, callEnd,
                                                                    callArgs]
                    )

            else
                App.log.logWarning("Cannot extract the page title from " +
                            App.log.linkToPage(url, decodeURI(url)) +
                            ", removing it if it
                            was linked from the processed article")
                @collectLinks(
                    visitedlinks,
                    newlinks,
                    supportedLangs,
                    whitelist,
                    firstPage,
                    callEnd,
                    callArgs
                )
        else
            callEnd(visitedlinks, callArgs)

    _collectLinksContinue: (title, supportedLangs,
                                whitelist, firstPage, error, langlinks,
                                iwmap, source, timestamp, edittoken, args) =>
        url = args[0]
        tag = args[1]
        origTag = args[2]
        visitedlinks = args[3]
        newlinks = args[4]
        callEnd = args[5]
        callArgs = args[6]

        if error == 'nonexisting'
            App.log.logWarning(App.log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " seems to point
                                to a non-existing article: removing it if
                                it was linked from the processed article")
        else
            if error == 'unsolvedredirect'
                App.log.logWarning(App.log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " will not be checked because it points to
                                an external redirect")
            else if error == 'unknown'
                App.log.logWarning(App.log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " will not be checked because of an
                                unspecified problem")
            else if error == 'notinwhitelist'
                App.log.logWarning(App.log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " will not be checked because " + tag +
                                " is not included in the whitelist defined
                                in the configuration")

            visitedlinks[tag] = @createVisitedLink(origTag,
                                            title, url, iwmap, source,
                                            timestamp, edittoken, langlinks)

            for link in langlinks
                nlink = newlinks[link.lang.toLowerCase()]
                vlink = visitedlinks[link.lang.toLowerCase()]

                if not vlink and not nlink
                    newlinks[link.lang.toLowerCase()] =
                                    @createNewLink(link.lang,
                                                        link.title, link.url)
                else if vlink and vlink.url != link.url
                    # Just ignore any conflicting links and warn the user:
                    # if it's a real conflict, the user will investigate it,
                    # otherwise the user will ignore it
                    App.log.logWarning("Possibly conflicting interlanguage
                        links: " + App.log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        App.log.linkToPage(vlink.url, "[[" + link.lang + ":" +
                        visitedlinks[link.lang.toLowerCase()].title + "]]"))

                else if nlink and nlink.url != link.url
                    # Just ignore any conflicting links and warn the user:
                    # if it's a real conflict, the user will investigate it,
                    # otherwise the user will ignore it
                    App.log.logWarning("Possibly conflicting interlanguage
                        links: " + App.log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        App.log.linkToPage(nlink.url, "[[" + link.lang + ":" +
                        newlinks[link.lang.toLowerCase()].title + "]]"))

        @collectLinks(
            visitedlinks,
            newlinks,
            supportedLangs,
            whitelist,
            firstPage,
            callEnd,
            callArgs
        )

    updateLinks: (lang, url, iwmap, source, oldlinks, newlinks) =>
        lang = lang.toLowerCase()
        linkList = []

        for tag of newlinks
            if tag != lang
                link = newlinks[tag]
                tagFound = false

                # New links that were not in the white list will have the
                # "iwmap" attribute false, "timestamp" and "edittoken" null
                # and "links" as an empty array
                # Note the difference between 'iwmap' and 'link.iwmap'
                for iw in iwmap
                    if iw.prefix.toLowerCase() == tag.toLowerCase()
                        linkList.push("[[" + link.origTag + ":" +
                                                        link.title + "]]")
                        tagFound = true
                        break

                if not tagFound
                    App.log.logWarning(tag + " interlanguage links are not
                        supported in " + App.log.linkToPage(url, "[[" +
                        link.origTag + ":" + link.title + "]]") +
                        " , ignoring them")

        linkList.sort(
            (a, b) ->
                # Sorting is case sensitive by default
                if a.toLowerCase() > b.toLowerCase()
                    return 1
                if b.toLowerCase() > a.toLowerCase()
                    return -1
                else
                    return 0
        )

        cleanText = ""
        textId = 0

        for link in oldlinks
            cleanText += source.substring(textId, link.index)
            textId = link.index + link.length

        cleanText += source.substring(textId)

        if oldlinks.length
            # Insert the new links at the index of the first previous link
            firstLink = oldlinks[0].index
        else
            firstLink = 0

        parts = []
        # Do not add empty strings to parts, otherwise when it's joined
        #   unnecessary line breaks will be added

        head = cleanText.substring(0, firstLink).trim()

        if head
            parts.push(head)

        links = linkList.join("\n")

        if links
            parts.push(links)

        body = cleanText.substr(firstLink).trim()

        if body
            parts.push(body)

        # Make sure to preserve the original white space at the end, otherwise
        #   the final (newText != source) may return true even when no actual
        #   change has been made
        # Note that /\s+$/ would return null in the absence of trailing
        #   whitespace, so a further check should be made, while /\s*$/
        #   safely returns an empty string in that case
        trailws = /\s*$/

        return parts.join("\n") + trailws.exec(source)
