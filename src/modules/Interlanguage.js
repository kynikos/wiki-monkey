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

WM.Interlanguage = new function () {
    this.addNewLink = function (newlinks, lang, title, url) {
        newlinks[lang] = {
            title: title,
            url: url,
        };
        return newlinks;
    };
    
    this.addVisitedLink = function (visitedlinks, lang, title, url, api) {
        visitedlinks[lang] = {
            title: title,
            url: url,
            api: api,
            iwmap: [],
        };
        return visitedlinks;
    };
    
    this.addInterwikiMap = function(visitedlinks, lang, iwmap) {
        visitedlinks[lang].iwmap = iwmap;
        return visitedlinks;
    };
    
    this.collectLinks = function (visitedlinks, newlinks, whitelist, callEnd, callArgs) {
        for (var tag in newlinks) {
            var link = {};
            for (var key in newlinks[tag]) {
                link[key] = newlinks[tag][key];
            }
            break;
        }
        
        if (link) {
            delete newlinks[tag];
            
            WM.Log.logInfo("Reading " + link.url + "...");
            
            var paths = WM.MW.getWikiPaths(link.url);
            
            visitedlinks = WM.Interlanguage.addVisitedLink(visitedlinks, tag, link.title, link.url, paths.api);
            
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
            
            WM.Interlanguage.collectLinksContinue(
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
                    visitedlinks = WM.Interlanguage.addInterwikiMap(visitedlinks, tag, iwmap);
                    
                    var page = Alib.Obj.getFirstItem(res.query.pages);
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
                                    newlinks = WM.Interlanguage.addNewLink(newlinks, link.lang, link["*"], link.url);
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
                            WM.Interlanguage.collectLinksContinue(
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
                            WM.Interlanguage.collectLinks(
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
    
    this.updateLinks = function (source, lang, whitelist, links) {
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
        var newText = Alib.Str.insert(cleanText, linkList, firstLink);
        
        return newText;
    };
};
