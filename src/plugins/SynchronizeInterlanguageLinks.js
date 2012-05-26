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
                res = res.responseJSON;
                
                // If the wiki has disabled the API it will stop here
                if (res) {
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
        
        // ORDINARE I LINK SECONDO UN ORDINE ALFABETICO **************************
        //     prendere una funzione dal file di configurazione ******************
        
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
        
        var paths = WM.MW.getWikiPaths();
        var title = WM.Editor.getTitle();
        var newlinks = {};
        newlinks[tag] = {
            url: paths.articles + WM.Parser.convertSpacesToUnderscores(title),
            title: title,
        };
        
        // LA PAGINA NELL'EDITOR VA PARSATA SUBITO QUI ***************************
        //     creare delle funzioni per standardizzare la creazione *************
        //     degli elementi di newlinks e visitedlinks *************************
        var source = WM.Editor.readSource();
        
        WM.Plugins.SynchronizeInterlanguageLinks.collectLinks(
            {},
            newlinks,
            whitelist,
            WM.Plugins.SynchronizeInterlanguageLinks.mainEnd,
            [tag, source]
        );
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
        
        // RIUSCIRE AD EDITARE ANCHE LE PAGINE SULLE WIKI ESTERNE? ***************
        //     non sarebbe un comportamento coerente con la funzione del bot *****
        
        var paths = WM.MW.getWikiPaths();
        var newlinks = {};
        newlinks[tag] = {
            url: paths.articles + WM.Parser.convertSpacesToUnderscores(title),
            title: title,
        };
        
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
