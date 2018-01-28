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

HTTP = require('@kynikos/misc/dist/HTTP')
Obj = require('@kynikos/misc/dist/Obj')
{A} = require('./libs')


class module.exports
    localWikiPaths = null
    localWikiUrls = null

    constructor: (@WM) ->
        @api = new mw.Api()

        wpaths = @_getWikiPaths(location.href)
        hostname = wpaths[0]

        @userInfo = null

        localWikiPaths = wpaths[1]
        localWikiUrls = {}

        for key of localWikiPaths
            localWikiUrls[key] = hostname + localWikiPaths[key]

    wikiPaths =
        known:
            "^https?://[^\.]+\.wikipedia\.org":
                short: "/wiki/"
                full: "/w/index.php"
                api: "/w/api.php"
            "^https?://wiki\.archlinux\.org":
                short: "/index.php/"
                full: "/index.php"
                api: "/api.php"
            "^https?://wiki\.archlinux\.de":
                short: "/title/"
                full: "/index.php"
                api: "/api.php"
            "^http://wiki\.archlinux\.fr":
                short: "/"
                full: "/index.php"
                api: "/api.php"
            "^https?://wiki\.archlinux\.jp":
                short: "/index.php/"
                full: "/index.php"
                api: "/api.php"
            "^http://wiki\.archlinux\.ro":
                short: "/index.php/"
                full: "/index.php"
                api: "/api.php"
            "^http://wiki\.archlinux\.ir":
                short: "/index.php/"
                full: "/index.php"
                api: "/api.php"
        default_:
            short: "/index.php?title="
            full: "/index.php"
            api: "/api.php"

    interwikiFixes = [
        ["https://wiki.archlinux.org/index.php/$1_(",
                                "https://wiki.archlinux.org/index.php/$1%20("]
    ]

    _getWikiPaths: (href) ->
        # It's necessary to keep this function in a private attribute,
        # otherwise localWikiPaths and localWikiUrls cannot be initialized
        for r of wikiPaths.known
            re = new RegExp(r, "i")
            match = re.exec(href)

            if match
                hostname = match[0]
                paths = {}

                for p of wikiPaths.known[r]
                    paths[p] = wikiPaths.known[r][p]

                break

        if not paths
            hostname = HTTP.getUrlLocation(href).hostname
            paths = {}

            for p of wikiPaths.default_
                paths[p] = wikiPaths.default_[p]

        return [hostname, paths]

    getWikiPaths: (href) ->
        if href
            return @_getWikiPaths(href)[1]
        else
            return localWikiPaths

    linkArticle: (page, label) ->
        return A({href: mw.util.getUrl(page)}, label or page)

    getWikiUrls: (href) ->
        if href
            wpaths = @_getWikiPaths(href)
            hostname = wpaths[0]
            paths = wpaths[1]

            urls = {}

            for key of paths
                urls[key] = hostname + paths[key]

            return urls

        else
            return localWikiUrls

    getTitleFromWikiUrl: (url) ->
        title = HTTP.getURIParameters(url).title

        # Test this *before* the short paths, in fact a short path may just be
        # the full one with the "title" parameter pre-added
        if not title
            pathname = HTTP.getUrlLocation(url).pathname

            for r of wikiPaths.known
                re = new RegExp(r, "i")
                match = re.exec(url)

                if match
                    if pathname.indexOf(wikiPaths.known[r].short) == 0
                        title = pathname.substr(wikiPaths.known[r]
                                                            .short.length)
                    else
                        title = false

                    break

            if not title
                if pathname.indexOf(wikiPaths.default_.short) == 0
                    title = pathname.substr(wikiPaths.default_.short.length)
                else
                    title = false

        return title

    failedQueryError: (url) ->
        if url
            return "Failed query: #{@WM.Log.linkToPage(url, url)}"
        return "Failed query"

    callAPIGet: (params, call, callArgs, callError) ->
        params.format = "json"

        return @api.get(params)
        .done((data, textStatus, jqXHR) =>
            if call
                call(data, callArgs)
        ).fail((jqXHR, textStatus, errorThrown) =>
            console.error(jqXHR, textStatus, errorThrown)
            @WM.Log.logError(@failedQueryError())
            if confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                            "to retry?")
                @WM.Log.logInfo("Retrying ...")
                @callAPIGet(params, call, callArgs, callError)
            else if callError
                callError(callArgs)
        )

    callAPIPost: (params, call, callArgs, callError) ->
        params.format = "json"

        return @api.post(params)
        .done((data, textStatus, jqXHR) =>
            if call
                call(data, callArgs)
        ).fail((jqXHR, textStatus, errorThrown) =>
            console.error(jqXHR, textStatus, errorThrown)
            @WM.Log.logError(@failedQueryError())
            if confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                            "to retry?")
                @WM.Log.logInfo("Retrying ...")
                @callAPIPost(params, call, callArgs, callError)

            else if callError
                callError(callArgs)
        )

    callQuery: (params, call, callArgs, callError) ->
        params.action = "query"

        try
            res = await @callAPIGet(params)
        catch error
            if callError
                return callError(callArgs)
            throw error

        page = Obj.getFirstItem(res.query.pages)

        if call
            return call(page, callArgs)
        return page

    callQueryEdit: (title, call, callArgs) ->
        page = await @callQuery(
            prop: "info|revisions"
            rvprop: "content|timestamp"
            intoken: "edit"
            titles: title
        )

        source = page.revisions[0]["*"]
        timestamp = page.revisions[0].timestamp
        edittoken = page.edittoken

        if call
            return call(title, source, timestamp, edittoken, callArgs)
        return {source, timestamp, edittoken}

    getUserInfo: (call) ->
        storeInfo = (res, call) =>
            @userInfo = res
            call()

        if not @userInfo
            pars =
                action: "query"
                meta: "userinfo"
                uiprop: "groups"
            @callAPIGet(pars, storeInfo, call, null)
        else
            call()

    isLoggedIn: (call, args) ->
        @getUserInfo( =>
            test = @userInfo.query.userinfo.id != 0
            call(test, args)
        )

    getUserName: (call, args) ->
        @getUserInfo( =>
            call(@userInfo.query.userinfo.name, args)
        )

    isUserBot: (call, args) ->
        @getUserInfo( =>
            groups = @userInfo.query.userinfo.groups
            res = groups.indexOf("bot") > -1
            call(res, args)
        )

    getBacklinks: (bltitle, blnamespace, call, callArgs) ->
        query =
            action: "query"
            list: "backlinks"
            bltitle: bltitle
            bllimit: 500

        if blnamespace
            query.blnamespace = blnamespace

        @_getBacklinksContinue(query, call, callArgs, [])

    _getBacklinksContinue: (query, call, callArgs, backlinks) ->
        @callAPIGet(query, (res, args) =>
            backlinks = backlinks.concat(res.query.backlinks)
            if res["query-continue"]
                query.blcontinue = res["query-continue"].backlinks.blcontinue
                @_getBacklinksContinue(query, call, args, backlinks)
            else
                call(backlinks, args)
        ,
        callArgs, null)

    getLanglinks: (title, iwmap, call, callArgs) ->
        query =
            action: "query"
            prop: "langlinks"
            titles: title
            lllimit: 500
            llurl: "1"
            redirects: "1"

        if iwmap
            query.meta = "siteinfo"
            query.siprop = "interwikimap"
            query.sifilteriw = "local"

        @_getLanglinksContinue(query, call, callArgs, [], null)

    _getLanglinksContinue: (query, call, callArgs, langlinks, iwmap) ->
        @callAPIGet(query, (res, args) =>
            page = Obj.getFirstItem(res.query.pages)
            langlinks = langlinks.concat(page.langlinks)

            if res.query.interwikimap
                iwmap = res.query.interwikimap

            if query.meta
                delete query.meta
                delete query.siprop
                delete query.sifilteriw

            if res["query-continue"]
                query.llcontinue = res["query-continue"].langlinks.llcontinue
                @_getLanglinksContinue(query, call, args, langlinks,
                                                                        iwmap)
            else
                call(langlinks, iwmap, args)
        ,
        callArgs, null)

    getInterwikiMap: (title) ->
        return @callAPIGet({
            action: "query"
            meta: "siteinfo"
            siprop: "interwikimap"
        })

    getLocalInterwikiMap: (title, call, callArgs) ->
        @callAPIGet(
            {
                action: "query"
                meta: "siteinfo"
                siprop: "interwikimap"
                sifilteriw: "local"
            }
            (res, args) =>
                call(res.query.interwikimap, args)
            callArgs
            null
        )

    fixInterwikiUrl: (url) ->
        for f in [0...interwikiFixes.length]
            furl = url.replace(interwikiFixes[f][0], interwikiFixes[f][1])

            if furl != url
                return furl

        # Return the unmodified url if no replacement has been done
        return url

    getSpecialList: (qppage, siprop) ->
        query =
            action: "query"
            list: "querypage"
            qppage: qppage
            qplimit: 500

        if siprop
            query.meta = "siteinfo"
            query.siprop = siprop

        results = []
        siteinfo = {}

        loop
            res = await @callAPIGet(query)
            results = results.concat(res.query.querypage.results)

            for key, info of res.query when key != "querypage"
                siteinfo[key] = info

            delete query.meta
            delete query.siprop

            if res["query-continue"]
                query.qpoffset = res["query-continue"].querypage.qpoffset
                continue

            return {results, siteinfo}

    getUserContribs: (ucuser, ucstart, ucend, call, callArgs) ->
        query =
            action: "query"
            list: "usercontribs"
            ucuser: ucuser
            ucprop: ""
            ucstart: ucstart
            ucend: ucend
            uclimit: 500

        @_getUserContribsContinue(query, call, callArgs, [])

    _getUserContribsContinue: (query, call, callArgs, results) ->
        @callAPIGet(query, (res, args) =>
            results = results.concat(res.query.usercontribs)

            if res["query-continue"]
                query.uccontinue = res["query-continue"].usercontribs
                                                                .uccontinue
                @_getUserContribsContinue(query, call, args, results)
            else
                call(results, args)
        ,
        callArgs, null)
