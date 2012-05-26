WM.Plugins.SynchronizeInterlanguageLinks = new function () {
    this.collectLinks = function (visitedlinks, newlinks, whitelist, callEnd, callArgs) {
        var link;
        
        for (var tag in newlinks) {
            link = newlinks[tag];
            break;
        }
        
        if (link) {
            delete newlinks[tag];
            visitedlinks[tag] = link;
            
            WM.Log.logInfo("Processing " + link.url + "...");
            
            var paths = WM.MW.getWikiPaths(link.url);
            var title = link.title;
            var query = paths.api +
                        "?format=json" +
                        "&action=query" +
                        "&prop=langlinks" +
                        "&titles=" + encodeURIComponent(title) +
                        "&lllimit=5000" +
                        "&llurl=1" +
                        "&redirect=1";
                        
            WM.Plugins.SynchronizeInterlanguageLinks.collectLinksContinue(query, visitedlinks, newlinks, whitelist, null, callEnd, callArgs);
        }
        else {
            WM.Plugins.SynchronizeInterlanguageLinks.callEnd(visitedlinks, callArgs);
        }
    };
    
    this.collectLinksContinue = function (query, visitedlinks, newlinks, whitelist, continue_, callEnd, callArgs) {
        if (continue_) query += "&llcontinue=" + encodeURIComponent(continue_);
        GM_xmlhttpRequest({
            method: "GET",
            url: query,
            onload: function (res) {
                for (var id in res.query.pages) {
                    var page = res.query.pages[id];
                    break;
                }
                var langlinks = page.langlinks;
                
                var conflict = false;
                
                if (langlinks) {
                    for (var link in langlinks) {
                        if (whitelist.indexOf(link.lang) > -1) {
                            if (!visitedlinks[link.lang] && !newlinks[link.lang]) {
                                newlinks[link.lang] = {
                                    url: link.url,
                                    title: link["*"],
                                }
                            }
                            else if ((visitedlinks[link.lang] && visitedlinks[link.lang].url != link.url) ||
                                     (newlinks[link.lang] && newlinks[link.lang].url != link.url)) {
                                conflict = true;
                                WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link["*"] + "]]");
                                break;
                            }
                        }
                        else {
                            WM.Log.logWarning("[[" + link.lang + ":" + conflict["*"] + "]] has been ignored");
                        }
                    }
                }
                
                if (!conflict) {
                    if (res["query-continue"]) {
                        continue_ = res["query-continue"].langlinks.llcontinue;
                        WM.Plugins.SynchronizeInterlanguageLinks.collectLinksContinue(query, visitedlinks, newlinks, whitelist, continue_, callEnd, callArgs);
                    }
                    else {
                        WM.Plugins.SynchronizeInterlanguageLinks.collectlinks(visitedlinks, newlinks, whitelist, callEnd, callArgs);
                    }
                }
            },
            onerror: function (res) {
                WM.Log.logError("Failed query: " + res.finalUrl);
            }
        });
    };
    
    this.createLinks = function (links) {
        // ***********************************************************************
        // Warning per i tag non supportati dalla wiki corrente
        // Controllare che l'url corrisponda con quello settato localmente
        // Non mettere l'interlink per la lingua corrente
        // Se chiamata dall'editor deve aggiornare solo la pagina, altrimenti
        //     provare ad aggiornarle tutte
        
        
        
        
    };
    
    this.main = function (args) {
        var tag = args[0]();
        var whitelist = args[1];
        
        WM.Log.logInfo("Synchronizing interlanguage links...");
        
        var newlinks = {};
        newlinks[tag] = {
            url: location.href,
            title: WM.Editor.getTitle(),
        };
        
        WM.Plugins.SynchronizeInterlanguageLinks.collectLinks({}, newlinks, whitelist, WM.Plugins.SynchronizeInterlanguageLinks.mainEnd);
    };
    
    this.mainEnd = function (links, args) {
        // ***********************************************************************
        var source = WM.Editor.readSource();
        
        
        
        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Sycnhronized interlanguage links");
        }
    };
    
    this.mainAuto = function (args, title, callBot) {
        // ***********************************************************************
        var summary = args[0];
        
        WM.MW.callQueryEdit(title,
                            WM.Plugins.SynchronizeInterlanguageLinks.mainAutoReplace,
                            [summary, callBot]);
    };
    
    this.mainAutoReplace = function (title, source, timestamp, edittoken, args) {
        // ***********************************************************************
        var summary = args[0];
        var callBot = args[1];
        
        doReplace(source,
                  WM.Plugins.SynchronizeInterlanguageLinks.mainAutoWrite,
                  [title, edittoken, timestamp, summary, callBot]);
    };
    
    this.mainAutoWrite = function (source, newtext, args) {
        // ***********************************************************************
        var title = args[0];
        var edittoken = args[1];
        var timestamp = args[2];
        var summary = args[3];
        var callBot = args[4];
        
        if (newtext != source) {
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
        // ***********************************************************************
        if (res.edit && res.edit.result == 'Success') {
            callBot(true);
        }
        else {
            callBot(false);
        }
    };
};
