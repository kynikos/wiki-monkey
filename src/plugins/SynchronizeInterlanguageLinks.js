WM.Plugins.SynchronizeInterlanguageLinks = new function () {
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
            visitedlinks[tag] = link;
            
            WM.Log.logInfo("Reading " + link.url + "...");
            
            var paths = WM.MW.getWikiPaths(link.url);
            
            visitedlinks[tag].api = paths.api;
            
            var title = link.title;
            
            var query = paths.api +
                        "?format=json" +
                        "&action=query" +
                        "&prop=langlinks" +
                        "&titles=" + encodeURIComponent(title) +
                        "&lllimit=5000" +
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
            callEnd(visitedlinks, callArgs);
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
                res = res.responseJSON;
                
                var iwmap = res.query.interwikimap;
                visitedlinks[tag].iwmap = iwmap;
                
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
            },
            onerror: function (res) {
                WM.Log.logError("Failed query: " + res.finalUrl);
            }
        });
    };
    
    var createLinks = function (lang, links) {
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
        return linkList;
    };
    
    this.main = function (args) {
        var tag = args[0]();
        var whitelist = args[1];
        
        WM.Log.logInfo("Synchronizing interlanguage links...");
        
        var paths = WM.MW.getWikiPaths();
        var title = WM.Editor.getTitle();
        var newlinks = {};
        newlinks[tag] = {
            url: paths.articles + WM.Parser.convertSpacesToUnderscores(title),
            title: title,
        };
        
        // LA PAGINA NELL'EDITOR VA PARSATA SUBITO QUI ***************************
        var source = WM.Editor.readSource();
        
        WM.Plugins.SynchronizeInterlanguageLinks.collectLinks(
            {},
            newlinks,
            whitelist,
            WM.Plugins.SynchronizeInterlanguageLinks.mainEnd,
            [tag, whitelist, source]
        );
    };
    
    this.mainEnd = function (links, args) {
        var tag = args[0];
        var whitelist = args[1];
        var source = args[2];
        
        // FORSE NON TUTTE LE WIKI METTONO GLI INTERLINK IN ALTO *****************
        //     BISOGNEREBBE RIUSCIRE A METTERLI NEL POSTO PRECISO ****************
        //     prendere una funzione dal file di configurazione ******************
        // ORDINARE I LINK SECONDO UN ORDINE ALFABETICO **************************
        //     prendere una funzione dal file di configurazione ******************
        
        var textLinks = createLinks(tag, links);
        
        var regExp = new RegExp("\\s*(\\[\\[ *((" + whitelist.join("|") + ") *: *(.+?)) *\\]\\])", "gi");
        var matches = Alib.RegEx.matchAll(source, regExp);
        
        var newText = "";
        var textId = 0;
        for (var l in matches) {
            var link = matches[l];
            newText += source.substring(textId, link.index);
            textId = link.index + link.length;
        }
        newText += source.substring(textId);
        
        newText = textLinks + newText;
        
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
