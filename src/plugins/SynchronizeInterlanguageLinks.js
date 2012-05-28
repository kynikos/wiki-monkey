WM.Plugins.SynchronizeInterlanguageLinks = new function () {
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
        var visitedlinks = WM.Interlanguage.addVisitedLink({}, tag, title, url, paths.api)
        visitedlinks = WM.Interlanguage.addInterwikiMap(visitedlinks, tag, iwmap);
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
                        newlinks = WM.Interlanguage.addNewLink(newlinks, link.lang, link["*"], link.url);
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
                WM.Interlanguage.collectLinks(
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
        
        var newText = WM.Interlanguage.updateLinks(source, tag, whitelist, links);
        
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
        var newlinks = WM.Interlanguage.addNewLink({}, tag, title, url);
        
        WM.Interlanguage.collectLinks(
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
        
        var newText = WM.Interlanguage.updateLinks(source, tag, whitelist, links);
        
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
