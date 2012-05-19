/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2012 Dario Giovannetti <dev@dariogiovannetti.net>
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
    var wikiUrls = (function () {
        var paths = {DEFAULT: {articles: "index.php",
                               api: "api.php"},
                     "archlinux.org": {articles: "index.php",
                                       api: "api.php"},
                     "wikipedia.org": {articles: "wiki",
                                       api: "w/api.php"}};
        
        var urls = paths[location.hostname.split(".").slice(1).join(".")];
        
        if (!urls) {
            urls = paths.DEFAULT;
        }
        
        for (var key in urls) {
            urls[key] = location.protocol + "//" + location.hostname + "/" + urls[key];
        }
        
        return urls;
    })();
    
    this.getArticlesBaseUrl = function () {
        return wikiUrls.articles;
    };
    
    this.callAPIGet = function (params, call, callArgs) {
        GM_xmlhttpRequest({
            method: "GET",
            url: wikiUrls.api + "?format=json" + joinParams(params),
            onload: function (res) {
                call(res.responseJSON, callArgs);
            }
        });
    };
    
    this.callAPIPost = function (params, call, callArgs) {
        var string = "format=json" + joinParams(params);
        
        if (string.length > 8000) {
            var queryData = new FormData();
            queryData.append("format", "json");
            for (var p in params) {
                queryData.append(p, params[p]);
            }
            var ctype = "multipart/form-data";
        }
        else {
            var queryData = string;
            var ctype = "application/x-www-form-urlencoded";
        }
        
        GM_xmlhttpRequest({
            method: "POST",
            url: wikiUrls.api,
            data: queryData,
            headers: {"Content-type": ctype},
            onload: function (res) {
                call(res.responseJSON, callArgs);
            },
        });
    };
    
    this.callAPIGetSync = function (params) {
        var res = WM.HTTP.sendGetSyncRequest(wikiUrls.api + "?format=json" + joinParams(params));
        return JSON.parse(res.responseText);
    };
    
    this.callAPIPostSync = function (params) {
        var res = WM.HTTP.sendPostSyncRequest(wikiUrls.api, "format=json" + joinParams(params), "Content-type", "application/x-www-form-urlencoded");
        return JSON.parse(res.responseText());
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
        var callBack = function (res) {
            var pages = res.query.pages;
            for (var id in pages) {
                break;
            }
            call(pages[id], callArgs);
        };
        this.callAPIGet(params, callBack);
    };
    
    this.callQuerySync = function (params) {
        params.action = "query";
        var res = this.callAPIGetSync(params);
        var pages = res.query.pages;
        for (var id in pages) {
            break;
        }
        return pages[id];
    };
    
    // Never use this attribute directly, always use getUserInfo!!!
    var userInfo;
    
    this.getUserInfo = function () {
        if (!userInfo) {
            userInfo = this.callAPIGetSync({action: "query",
                                            meta: "userinfo",
                                            uiprop: "groups"});
        }
        return userInfo;
    };
    
    this.isLoggedIn = function () {
        return this.getUserInfo().query.userinfo.id != 0;
    };
    
    this.getUserName = function () {
        return this.getUserInfo().query.userinfo.name;
    };
    
    this.isUserBot = function () {
        var groups = this.getUserInfo().query.userinfo.groups;
        for (var g in groups) {
            if (groups[g] == 'bot') {
                return true;
            }
        }
        return false;
    };
    
    this.getBacklinks = function (bltitle, blnamespace, blcontinue) {
        var query = {action: "query",
                     list: "backlinks",
                     bltitle: bltitle,
                     bllimit: 5000};
        
        if (blnamespace) {
            query.blnamespace = blnamespace;
        }
        
        if (blcontinue) {
            query.blcontinue = blcontinue;
        }
        
        var res = WM.MW.callAPIGetSync(query);
        var backlinks = res.query.backlinks;
        
        if (res["query-continue"]) {
            blcontinue = res["query-continue"].backlinks.blcontinue;
            var cont = this.getBacklinks(bltitle, blnamespace, blcontinue);
            for (var sub in cont) {
                backlinks[sub] = cont[sub];
            }
        }
        
        return backlinks;
    };
};
