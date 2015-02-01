/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2014 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.MW = new function () {
    "use strict";

    var wikiPaths = {
        known: {
            "^https?://[^\.]+\.wikipedia\.org": {
                short: "/wiki/",
                full: "/w/index.php",
                api: "/w/api.php"
            },
            "^https?://wiki\.archlinux\.org": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^https?://wiki\.archlinux\.de": {
                short: "/title/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.fr": {
                short: "/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.ro": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://(?:www\.)?archlinux\.fi": {
                short: "/wiki/",
                full: "/w/index.php",
                api: "/w/api.php"
            },
            "^http://wiki\.archlinux\.se": {
                short: "/index.php?title=",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://(?:www\.)?archtr\.org": {
                short: "/index.php?title=",
                full: "/wiki/index.php",
                api: "/wiki/api.php"
            },
            "^http://wiki\.archlinux\.rs": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.ir": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
        },
        default_: {
            short: "/index.php?title=",
            full: "/index.php",
            api: "/api.php"
        }
    };

    var interwikiFixes = [
        ["https://wiki.archlinux.org/index.php/$1_(",
                                "https://wiki.archlinux.org/index.php/$1%20("]
    ];

    var getWikiPaths = function (href) {
        // It's necessary to keep this function in a private attribute,
        // otherwise localWikiPaths and localWikiUrls cannot be initialized
        for (var r in wikiPaths.known) {
            var re = new RegExp(r, "i");
            var match = re.exec(href);

            if (match) {
                var hostname = match[0];
                var paths = {};

                for (var p in wikiPaths.known[r]) {
                    paths[p] = wikiPaths.known[r][p];
                }

                break;
            }
        }

        if (!paths) {
            var hostname = Alib.HTTP.getUrlLocation(href).hostname;
            var paths = {};

            for (var p in wikiPaths.default_) {
                paths[p] = wikiPaths.default_[p];
            }
        }

        return [hostname, paths]
    };

    var localWikiPaths;
    var localWikiUrls;

    // This function must be run *after* getWikiPaths (!= this.getWikiPaths)
    (function () {
        var wpaths = getWikiPaths(location.href);
        var hostname = wpaths[0];

        localWikiPaths = wpaths[1];
        localWikiUrls = {};

        for (var key in localWikiPaths) {
            localWikiUrls[key] = hostname + localWikiPaths[key];
        }
    })();

    this.getWikiPaths = function (href) {
        if (href) {
            return getWikiPaths(href)[1];
        }
        else {
            return localWikiPaths;
        }
    };

    this.getWikiUrls = function (href) {
        if (href) {
            var wpaths = getWikiPaths(href);
            var hostname = wpaths[0];
            var paths = wpaths[1];

            var urls = {};

            for (var key in paths) {
                urls[key] = hostname + paths[key];
            }

            return urls;
        }
        else {
            return localWikiUrls;
        }
    };

    this.getTitleFromWikiUrl = function (url) {
        var title = Alib.HTTP.getURIParameters(url).title;

        // Test this *before* the short paths, in fact a short path may just be
        // the full one with the "title" parameter pre-added
        if (!title) {
            var pathname = Alib.HTTP.getUrlLocation(url).pathname;

            for (var r in wikiPaths.known) {
                var re = new RegExp(r, "i");
                var match = re.exec(url);

                if (match) {
                    if (pathname.indexOf(wikiPaths.known[r].short) == 0) {
                        title = pathname.substr(wikiPaths.known[r
                                                            ].short.length);
                    }
                    else {
                        title = false;
                    }

                    break;
                }
            }

            if (!title) {
                if (pathname.indexOf(wikiPaths.default_.short) == 0) {
                    title = pathname.substr(wikiPaths.default_.short.length);
                }
                else {
                    title = false;
                }
            }
        }

        return title;
    };

    this.failedQueryError = function (finalUrl) {
        return "Failed query: " + WM.Log.linkToPage(finalUrl, finalUrl) +
            "\nYou may have tried to use a " +
            "plugin which requires cross-origin HTTP requests, but you are " +
            "not using Greasemonkey (Firefox), Tampermonkey " +
            "(Chrome/Chromium), Violentmonkey (Opera) or a similar extension";
    };

    this.failedHTTPRequestError = function (err) {
        return "Failed HTTP request - " + err + "\nYou may have tried to " +
            "use a plugin which requires cross-origin HTTP requests, but " +
            "you are not using Greasemonkey (Firefox), Tampermonkey " +
            "(Chrome/Chromium), Violentmonkey (Opera) or a similar extension";
    };

    this.callAPIGet = function (params, api, call, callArgs) {
        if (!api) {
            api = localWikiUrls.api;
        }
        var query = {
            method: "GET",
            url: api + "?format=json" + joinParams(params),
            onload: function (res) {
                try {
                    var json = (Alib.Obj.getFirstItem(res.responseJSON)) ?
                            res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("It is likely that the " +
                                                WM.Log.linkToPage(api, "API") +
                                                " for this wiki is disabled");
                }
                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be caught printing the same API error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
                if (confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                                "to retry?")) {
                    WM.Log.logInfo("Retrying ...");
                    WM.MW.callAPIGet(params, api, call, callArgs);
                }
            }
        };

        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError(WM.MW.failedHTTPRequestError(err));
        }
    };

    this.callAPIPost = function (params, api, call, callArgs) {
        if (!api) {
            api = localWikiUrls.api;
        }
        var query = {
            method: "POST",
            url: api,
            onload: function (res) {
                try {
                    var json = (Alib.Obj.getFirstItem(res.responseJSON)) ?
                            res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("It is likely that the " +
                                                WM.Log.linkToPage(api, "API") +
                                                " for this wiki is disabled");
                }
                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be caught printing the same API error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
                if (confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                                "to retry?")) {
                    WM.Log.logInfo("Retrying ...");
                    WM.MW.callAPIPost(params, api, call, callArgs);
                }
            }
        };

        var string = "format=json" + joinParams(params);

        // It's necessary to use try...catch because some browsers don't
        // support FormData yet and will throw an exception
        try {
            if (string.length > 8000) {
                query.data = new FormData();
                query.data.append("format", "json");
                for (var p in params) {
                    query.data.append(p, params[p]);
                }
                // Do not add "multipart/form-data" explicitly or the query
                //   will fail
                //query.headers = {"Content-type": "multipart/form-data"};
            }
            else {
                throw "string <= 8000 characters";
            }
        }
        catch (err) {
            query.data = string;
            query.headers = {"Content-type":
                                        "application/x-www-form-urlencoded"};
        }

        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError(WM.MW.failedHTTPRequestError(err));
        }
    };

    var joinParams = function (params) {
        var string = "";
        for (var key in params) {
            string += ("&" + key + "=" + encodeURIComponent(params[key]));
        }
        return string;
    };

    this.callQuery = function (params, call, callArgs) {
        params.action = "query";
        var callBack = function (res, args) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            call(page, args);
        };
        this.callAPIGet(params, null, callBack, callArgs);
    };

    this.callQueryEdit = function (title, call, callArgs) {
        var callBack = function (page, args) {
            var source = page.revisions[0]["*"];
            var timestamp = page.revisions[0].timestamp;
            var edittoken = page.edittoken;
            call(title, source, timestamp, edittoken, args);
        };
        this.callQuery({prop: "info|revisions",
                        rvprop: "content|timestamp",
                        intoken: "edit",
                        titles: title},
                        callBack,
                        callArgs);
    };

    var userInfo;

    var getUserInfo = function (call) {
        var storeInfo = function (res, call) {
            userInfo = res;
            call();
        };

        if (!userInfo) {
            WM.MW.callAPIGet({action: "query",
                                meta: "userinfo",
                                uiprop: "groups"},
                                null,
                                storeInfo,
                                call);
        }
        else {
            call();
        }
    };

    this.isLoggedIn = function (call, args) {
        getUserInfo(function () {
            var test = userInfo.query.userinfo.id != 0;
            call(test, args);
        });
    };

    this.getUserName = function (call, args) {
        getUserInfo(function () {
            call(userInfo.query.userinfo.name, args);
        });
    };

    this.isUserBot = function (call, args) {
        getUserInfo(function () {
            var groups = userInfo.query.userinfo.groups;
            var res = groups.indexOf("bot") > -1;
            call(res, args);
        });
    };

    this.getBacklinks = function (bltitle, blnamespace, call, callArgs) {
        var query = {action: "query",
                     list: "backlinks",
                     bltitle: bltitle,
                     bllimit: 500};

        if (blnamespace) {
            query.blnamespace = blnamespace;
        }

        this._getBacklinksContinue(query, call, callArgs, []);
    };

    this._getBacklinksContinue = function (query, call, callArgs, backlinks) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            backlinks = backlinks.concat(res.query.backlinks);
            if (res["query-continue"]) {
                query.blcontinue = res["query-continue"].backlinks.blcontinue;
                WM.MW._getBacklinksContinue(query, call, args, backlinks);
            }
            else {
                call(backlinks, args);
            }
        },
        callArgs);
    };

    this.getLanglinks = function (title, iwmap, call, callArgs) {
        var query = {action: "query",
                     prop: "langlinks",
                     titles: title,
                     lllimit: 500,
                     llurl: "1",
                     redirects: "1"};

        if (iwmap) {
            query.meta = "siteinfo";
            query.siprop = "interwikimap";
            query.sifilteriw = "local";
        }

        this._getLanglinksContinue(query, call, callArgs, [], null);
    };

    this._getLanglinksContinue = function (query, call, callArgs, langlinks,
                                                                    iwmap) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            langlinks = langlinks.concat(page.langlinks);

            if (res.query.interwikimap) {
                iwmap = res.query.interwikimap;
            }

            if (query.meta) {
                delete query.meta;
                delete query.siprop;
                delete query.sifilteriw;
            }

            if (res["query-continue"]) {
                query.llcontinue = res["query-continue"].langlinks.llcontinue;
                WM.MW._getLanglinksContinue(query, call, args, langlinks,
                                                                        iwmap);
            }
            else {
                call(langlinks, iwmap, args);
            }
        },
        callArgs);
    };

    this.getInterwikiMap = function (title, call, callArgs) {
        var query =

        WM.MW.callAPIGet(
            {action: "query",
             meta: "siteinfo",
             siprop: "interwikimap",
             sifilteriw: "local"},
            null,
            function (res, args) {
                call(res.query.interwikimap, args);
            },
            callArgs
        );
    };

    this.fixInterwikiUrl = function (url) {
        for (var f = 0; f < interwikiFixes.length; f++) {
            var furl = url.replace(interwikiFixes[f][0], interwikiFixes[f][1]);

            if (furl != url) {
                return furl;
            }
        }

        // Return the unmodified url if no replacement has been done
        return url;
    };

    this.getSpecialList = function (qppage, siprop, call, callArgs) {
        var query = {action: "query",
                     list: "querypage",
                     qppage: qppage,
                     qplimit: 500};

        if (siprop) {
            query.meta = "siteinfo";
            query.siprop = siprop;
        }

        this._getSpecialListContinue(query, call, callArgs, [], {});
    };

    this._getSpecialListContinue = function (query, call, callArgs, results,
                                                                    siteinfo) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            results = results.concat(res.query.querypage.results);

            for (var key in res.query) {
                if (key != "querypage") {
                    siteinfo[key] = res.query[key];
                }
            }

            if (query.meta) {
                delete query.meta;
                delete query.siprop;
            }

            if (res["query-continue"]) {
                query.qpoffset = res["query-continue"].querypage.qpoffset;
                WM.MW._getSpecialListContinue(query, call, args, results,
                                                                    siteinfo);
            }
            else {
                call(results, siteinfo, args);
            }
        },
        callArgs);
    };

    this.getUserContribs = function (ucuser, ucstart, ucend, call, callArgs) {
        var query = {action: "query",
                    list: "usercontribs",
                    ucuser: ucuser,
                    ucprop: "",
                    ucstart: ucstart,
                    ucend: ucend,
                    uclimit: 500}

        this._getUserContribsContinue(query, call, callArgs, []);
    };

    this._getUserContribsContinue = function (query, call, callArgs, results) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            results = results.concat(res.query.usercontribs);

            if (res["query-continue"]) {
                query.uccontinue = res["query-continue"].usercontribs
                                                                .uccontinue;
                WM.MW._getUserContribsContinue(query, call, args, results);
            }
            else {
                call(results, args);
            }
        },
        callArgs);
    };
};
