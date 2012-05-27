WM.Plugins.SynchronizeInterlanguageLinks = new function () {
    var addNewLink = function (newlinks, lang, title, url) {
        newlinks[lang] = {
            title: title,
            url: url,
        };
        return newlinks;
    };
    
    var addVisitedLink = function (visitedlinks, lang, title, url, api) {
        visitedlinks[lang] = {
            title: title,
            url: url,
            api: api,
            iwmap: [],
        };
        return visitedlinks;
    };
    
    var addInterwikiMap = function(visitedlinks, lang, iwmap) {
        visitedlinks[lang].iwmap = iwmap;
        return visitedlinks;
    };
    
    this.collectLinks = function (visitedlinks, newlinks, whitelist, callEnd, callArgs) {
        var link;
        
        for (var tag in newlinks) {
            link = {};
            for (var key in newlinks[tag]) {
                link[key] = newlinks[tag][key];
            }
            break;
        }
        
        if (link) {
            delete newlinks[tag];
            
            WM.Log.logInfo("Reading " + link.url + "...");
            
            var paths = WM.MW.getWikiPaths(link.url);
            
            visitedlinks = addVisitedLink(visitedlinks, tag, link.title, link.url, paths.api);
            
            var title = link.title;
            
            var query = paths.api +
                        "?format=json" +
                        "&action=query" +
                        "&prop=langlinks" +
                        "&titles=" + encodeURIComponent(title) +
                        "&lllimit=500" +
                        "&llurl=1" +
                        "&redirect=1" +
                        "&meta=siteinfo" +
                        "&siprop=interwikimap" +
                        "&sifilteriw=local";
            
            WM.Plugins.SynchronizeInterlanguageLinks.collectLinksContinue(
                tag,
                query,
                visitedlinks,
                newlinks,
                whitelist,
                null,
                callEnd,
                callArgs
            );
        }
        else {
            callEnd(visitedlinks, whitelist, callArgs);
        }
    };
    
    this.collectLinksContinue = function (tag, query, visitedlinks, newlinks, whitelist, continue_, callEnd, callArgs) {
        if (continue_) {
            query += "&llcontinue=" + encodeURIComponent(continue_)
        }
        
        GM_xmlhttpRequest({
            method: "GET",
            url: query,
            onload: function (res) {
                // Currently only Scriptish supports the responseJSON method
                var json = (res.responseJSON) ? res.responseJSON : JSON.parse(res.responseText);
                res = json;
                
                // If the wiki has the API disabled, it will stop here
                if (res) {
                    var iwmap = res.query.interwikimap;
                    visitedlinks = addInterwikiMap(visitedlinks, tag, iwmap);
                    
                    for (var id in res.query.pages) {
                        var page = res.query.pages[id];
                        break;
                    }
                    var langlinks = page.langlinks;
                    
                    var conflict = false;
                    
                    if (langlinks) {
                        for (var l in langlinks) {
                            var link = langlinks[l];
                            if (whitelist.indexOf(link.lang) > -1) {
                                // Some old MediaWiki versions don't return the full URL
                                if (!link.url) {
                                    for (var iw in iwmap) {
                                        if (iwmap[iw].prefix == link.lang) {
                                            link.url = iwmap[iw].url.replace("$1", WM.Parser.convertSpacesToUnderscores(link["*"]));
                                            break;
                                        }
                                    }
                                }
                                
                                if (!visitedlinks[link.lang] && !newlinks[link.lang]) {
                                    newlinks = addNewLink(newlinks, link.lang, link["*"], link.url);
                                }
                                else if ((visitedlinks[link.lang] && visitedlinks[link.lang].url != link.url) ||
                                         (newlinks[link.lang] && newlinks[link.lang].url != link.url)) {
                                    conflict = true;
                                    WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link["*"] + "]]");
                                    break;
                                }
                            }
                            else {
                                WM.Log.logWarning("[[" + link.lang + ":" + link["*"] + "]] has been ignored");
                            }
                        }
                    }
                    
                    if (!conflict) {
                        if (res["query-continue"]) {
                            continue_ = res["query-continue"].langlinks.llcontinue;
                            WM.Plugins.SynchronizeInterlanguageLinks.collectLinksContinue(
                                tag,
                                query,
                                visitedlinks,
                                newlinks,
                                whitelist,
                                continue_,
                                callEnd,
                                callArgs
                            );
                        }
                        else {
                            WM.Plugins.SynchronizeInterlanguageLinks.collectLinks(
                                visitedlinks,
                                newlinks,
                                whitelist,
                                callEnd,
                                callArgs
                            );
                        }
                    }
                }
                else {
                    WM.Log.logError("It is likely that the API for this wiki is disabled");
                }
            },
            onerror: function (res) {
                WM.Log.logError("Failed query: " + res.finalUrl);
            }
        });
    };
    
    var updateLinks = function (source, lang, whitelist, links) {
        WM.Log.logInfo("Processing " + links[lang].url + "...");
        
        var iwmap = links[lang].iwmap;
        
        var linkList = "";
        
        for (var tag in links) {
            if (tag != lang) {
                var link = links[tag];
                var tagFound = false;
                for (var l in iwmap) {
                    if (iwmap[l].prefix == tag) {
                        if (WM.MW.getWikiPaths(iwmap[l].url).api == link.api) {
                            linkList += "[[" + tag + ":" + link.title + "]]\n";
                        }
                        else {
                            WM.Log.logWarning("On this wiki, " + tag + " interlanguage links point to a different wiki than the others, ignoring them");
                        }
                        tagFound = true;
                        break;
                    }
                }
                if (!tagFound) {
                    WM.Log.logWarning(tag + " interlanguage links are not supported by this wiki, ignoring them");
                }
            }
        }
        
        var regExp = new RegExp("(\\[\\[ *((" + whitelist.join("|") + ") *: *(.+?)) *\\]\\])\\s*", "gi");
        var matches = Alib.RegEx.matchAll(source, regExp);
        
        var cleanText = "";
        var textId = 0;
        for (var l in matches) {
            var link = matches[l];
            cleanText += source.substring(textId, link.index);
            textId = link.index + link.length;
        }
        cleanText += source.substring(textId);
        
        // Insert the new links at the index of the first previous link
        var firstLink = matches[0].index;
        var newText = cleanText.substr(0, firstLink) + linkList + cleanText.substr(firstLink);
        
        return newText;
    };
    
    this.main = function (args) {
        var tag = args[0]();
        var whitelist = args[1];
        
        WM.Log.logInfo("Synchronizing interlanguage links...");
        
        var title = WM.Editor.getTitle();
        var source = WM.Editor.readSource();
        
        WM.MW.callAPIGet(
            {
                action: "query",
                meta: "siteinfo",
                siprop: "interwikimap",
                sifilteriw: "local",
            },
            WM.Plugins.SynchronizeInterlanguageLinks.mainContinue,
            [tag, whitelist, title, source]
        );
    };
    
    this.mainContinue = function (res, args) {
        var tag = args[0];
        var whitelist = args[1];
        var title = args[2];
        var source = args[3];
        
        var iwmap = res.query.interwikimap;
        
        WM.MW.callAPIPost(
            {
                action: "parse",
                title: title,
                text: source,
                prop: "langlinks",
            },
            WM.Plugins.SynchronizeInterlanguageLinks.mainInitialize,
            [tag, whitelist, title, source, iwmap]
        );
    };
    
    this.mainInitialize = function (res, args) {
        var tag = args[0];
        var whitelist = args[1];
        var title = args[2];
        var source = args[3];
        var iwmap = args[4];
        
        var paths = WM.MW.getWikiPaths();
        var url = paths.articles + WM.Parser.convertSpacesToUnderscores(title);
        var visitedlinks = addVisitedLink({}, tag, title, url, paths.api)
        visitedlinks = addInterwikiMap(visitedlinks, tag, iwmap);
        var newlinks = {};
        var langlinks = res.parse.langlinks;
        
        if (langlinks) {
            var error = false;
            for (var l in langlinks) {
                var link = langlinks[l];
                if (whitelist.indexOf(link.lang) > -1) {
                    // Some old MediaWiki versions don't return the full URL
                    if (!link.url) {
                        for (var iw in iwmap) {
                            if (iwmap[iw].prefix == link.lang) {
                                link.url = iwmap[iw].url.replace("$1", WM.Parser.convertSpacesToUnderscores(link["*"]));
                                break;
                            }
                        }
                    }
                    
                    if (!visitedlinks[link.lang] && !newlinks[link.lang]) {
                        newlinks = addNewLink(newlinks, link.lang, link["*"], link.url);
                    }
                    else {
                        WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link["*"] + "]]");
                        error = true;
                    }
                }
                else {
                    WM.Log.logWarning("[[" + link.lang + ":" + link["*"] + "]] has been ignored");
                    error = true;
                }
            }
        
            if (!error) {
                WM.Plugins.SynchronizeInterlanguageLinks.collectLinks(
                    visitedlinks,
                    newlinks,
                    whitelist,
                    WM.Plugins.SynchronizeInterlanguageLinks.mainEnd,
                    [tag, source]
                );
            }
        }
        else {
            WM.Log.logInfo("No interlanguage links found");
        }
    };
    
    this.mainEnd = function (links, whitelist, args) {
        var tag = args[0];
        var source = args[1];
        
        var newText = updateLinks(source, tag, whitelist, links);
        
        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Sycnhronized interlanguage links");
        }
        else {
            WM.Log.logInfo("Interlanguage links were already synchronized");
        }
    };
    
    this.mainAuto = function (args, title, callBot) {
        var tag = args[0]();
        var whitelist = args[1];
        var summary = args[2];
        
        var paths = WM.MW.getWikiPaths();
        var url = paths.articles + WM.Parser.convertSpacesToUnderscores(title);
        var newlinks = addNewLink({}, tag, title, url);
        
        WM.Plugins.SynchronizeInterlanguageLinks.collectLinks(
            {},
            newlinks,
            whitelist,
            WM.Plugins.SynchronizeInterlanguageLinks.mainAutoRead,
            [title, tag, summary, callBot]
        );
    };
    
    this.mainAutoRead = function (links, whitelist, args) {
        var title = args[0];
        var tag = args[1];
        var summary = args[2];
        var callBot = args[3];
        
        WM.MW.callQueryEdit(title,
                            WM.Plugins.SynchronizeInterlanguageLinks.mainAutoWrite,
                            [tag, summary, callBot]);
    };
    
    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var tag = args[0];
        var summary = args[1];
        var callBot = args[2];
        
        var newText = updateLinks(source, tag, whitelist, links);
        
        if (newText != source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               WM.Plugins.SynchronizeInterlanguageLinks.mainAutoEnd,
                               callBot);
        }
        else {
            callBot(true);
        }
    };
    
    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(true);
        }
        else {
            callBot(false);
        }
    };
};
