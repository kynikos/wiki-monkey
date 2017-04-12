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

HTTP = require('../../lib.js.generic/dist/HTTP')
Obj = require('../../lib.js.generic/dist/Obj')


class module.exports.MW
    localWikiPaths = null
    localWikiUrls = null

    constructor: (@WM) ->
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
            "^https?://wiki\.archlinuxjp\.org":
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

    failedQueryError: (finalUrl) ->
        return "Failed query: " + @WM.Log.linkToPage(finalUrl, finalUrl) +
            "\nYou may have tried to use a
            plugin which requires cross-origin HTTP requests, but you are
            not using Greasemonkey (Firefox), Tampermonkey
            (Chrome/Chromium), Violentmonkey (Opera) or a similar extension"

    failedHTTPRequestError: (err) ->
        return "Failed HTTP request - " + err + "\nYou may have tried to
            use a plugin which requires cross-origin HTTP requests, but
            you are not using Greasemonkey (Firefox), Tampermonkey
            (Chrome/Chromium), Violentmonkey (Opera) or a similar extension"

    callAPIGet: (params, api, call, callArgs, callError) ->
        if not api
            api = localWikiUrls.api

        query =
            method: "GET"
            url: api + "?format=json" + joinParams(params)
            onload: (res) =>
                try
                    if Obj.getFirstItem(res.responseJSON)
                        json = res.responseJSON
                    else
                        json = JSON.parse(res.responseText)
                catch err
                    @WM.Log.logError("It is likely that the " +
                                                @WM.Log.linkToPage(api, "API") +
                                                " for this wiki is disabled")
                    if callError
                        callError(callArgs)

                if json
                    # Don't put this into the try block or all its exceptions
                    # will be caught printing the same API error
                    call(json, callArgs)
            onerror: (res) =>
                @WM.Log.logError(@failedQueryError(res.finalUrl))
                if confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                                "to retry?")
                    @WM.Log.logInfo("Retrying ...")
                    @callAPIGet(params, api, call, callArgs, callError)
                else if callError
                    callError(callArgs)

        try
            GM_xmlhttpRequest(query)
        catch err
            @WM.Log.logError(@failedHTTPRequestError(err))

    callAPIPost: (params, api, call, callArgs, callError) ->
        if not api
            api = localWikiUrls.api
        query =
            method: "POST"
            url: api
            onload: (res) =>
                try
                    if Obj.getFirstItem(res.responseJSON)
                        json = res.responseJSON
                    else
                        json = JSON.parse(res.responseText)
                catch err
                    @WM.Log.logError("It is likely that the " +
                                                @WM.Log.linkToPage(api, "API") +
                                                " for this wiki is disabled")
                    if callError
                        callError(callArgs)

                if json
                    # Don't put this into the try block or all its exceptions
                    # will be caught printing the same API error
                    call(json, callArgs)
            onerror: (res) =>
                @WM.Log.logError(@failedQueryError(res.finalUrl))
                if confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                                "to retry?")
                    @WM.Log.logInfo("Retrying ...")
                    @callAPIPost(params, api, call, callArgs, callError)

                else if callError
                    callError(callArgs)

        string = "format=json" + joinParams(params)

        # It's necessary to use try...catch because some browsers don't
        # support FormData yet and will throw an exception
        try
            if string.length > 8000
                query.data = new FormData()
                query.data.append("format", "json")
                for p of params
                    query.data.append(p, params[p])

                # Do not add "multipart/form-data" explicitly or the query
                #   will fail
                #query.headers = {"Content-type": "multipart/form-data"};
            else
                throw "string <= 8000 characters"

        catch err
            query.data = string
            query.headers =
                "Content-type": "application/x-www-form-urlencoded"

        try
            GM_xmlhttpRequest(query)
        catch err
            @WM.Log.logError(@failedHTTPRequestError(err))

    joinParams = (params) ->
        string = ""
        for key of params
            string += ("&" + key + "=" + encodeURIComponent(params[key]))
        return string

    callQuery: (params, call, callArgs, callError) ->
        params.action = "query"
        callBack = (res, args) =>
            page = Obj.getFirstItem(res.query.pages)
            call(page, args)

        this.callAPIGet(params, null, callBack, callArgs, callError)

    callQueryEdit: (title, call, callArgs) ->
        callBack = (page, args) =>
            source = page.revisions[0]["*"]
            timestamp = page.revisions[0].timestamp
            edittoken = page.edittoken
            call(title, source, timestamp, edittoken, args)

        pars =
            prop: "info|revisions"
            rvprop: "content|timestamp"
            intoken: "edit"
            titles: title
        this.callQuery(pars, callBack, callArgs, null)

    getUserInfo: (call) ->
        storeInfo = (res, call) =>
            @userInfo = res
            call()

        if not @userInfo
            pars =
                action: "query"
                meta: "userinfo"
                uiprop: "groups"
            @callAPIGet(pars, null, storeInfo, call, null);
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

        this._getBacklinksContinue(query, call, callArgs, [])

    _getBacklinksContinue: (query, call, callArgs, backlinks) ->
        @callAPIGet(query, null, (res, args) =>
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

        this._getLanglinksContinue(query, call, callArgs, [], null)

    _getLanglinksContinue: (query, call, callArgs, langlinks, iwmap) ->
        @callAPIGet(query, null, (res, args) =>
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

    getInterwikiMap: (title, call, callArgs) ->
        @callAPIGet({action: "query", meta: "siteinfo", siprop: "interwikimap", sifilteriw: "local"},
            null,
            (res, args) =>
                call(res.query.interwikimap, args)
            ,
            callArgs,
            null
        )

    fixInterwikiUrl: (url) ->
        for f in [0...interwikiFixes.length]
            furl = url.replace(interwikiFixes[f][0], interwikiFixes[f][1])

            if furl != url
                return furl

        # Return the unmodified url if no replacement has been done
        return url

    getSpecialList: (qppage, siprop, call, callArgs) ->
        query =
            action: "query"
            list: "querypage"
            qppage: qppage
            qplimit: 500

        if siprop
            query.meta = "siteinfo"
            query.siprop = siprop

        this._getSpecialListContinue(query, call, callArgs, [], {})

    _getSpecialListContinue: (query, call, callArgs, results, siteinfo) ->
        @callAPIGet(query, null, (res, args) =>
            results = results.concat(res.query.querypage.results)

            for key of res.query
                if key != "querypage"
                    siteinfo[key] = res.query[key]

            if query.meta
                delete query.meta
                delete query.siprop

            if res["query-continue"]
                query.qpoffset = res["query-continue"].querypage.qpoffset
                @_getSpecialListContinue(query, call, args, results,
                                                                    siteinfo)
            else
                call(results, siteinfo, args)
        ,
        callArgs, null)

    getUserContribs: (ucuser, ucstart, ucend, call, callArgs) ->
        query =
            action: "query"
            list: "usercontribs"
            ucuser: ucuser
            ucprop: ""
            ucstart: ucstart
            ucend: ucend
            uclimit: 500

        this._getUserContribsContinue(query, call, callArgs, [])

    _getUserContribsContinue: (query, call, callArgs, results) ->
        @callAPIGet(query, null, (res, args) =>
            results = results.concat(res.query.usercontribs)

            if res["query-continue"]
                query.uccontinue = res["query-continue"].usercontribs
                                                                .uccontinue
                @_getUserContribsContinue(query, call, args, results)
            else
                call(results, args)
        ,
        callArgs, null)
