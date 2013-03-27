/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2013 Dario Giovannetti <dev@dariogiovannetti.net>
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
    this.parseLinks = function (whitelist, source, iwmap) {
        var parsedLinks = WM.Parser.findSpecialLinks(
            source,
            whitelist.join("|")
        );
        
        var langlinks = [];
        for (var p in parsedLinks) {
            var link = parsedLinks[p];
            // Do not store the tag lowercased, since it should be kept as
            // original if there are no conflicts
            var ltag = link.match[2];
            var ltitle = link.match[3];
            for (var iw in iwmap) {
                if (iwmap[iw].prefix.toLowerCase() == ltag.toLowerCase()) {
                    var lurl = iwmap[iw].url.replace("$1", WM.Parser.convertSpacesToUnderscores(ltitle));
                    break;
                }
            }
            langlinks.push({
                lang: ltag,
                title: ltitle,
                url: lurl,
                index: link.index,
                length: link.length,
            });
        }
        
        return langlinks;
    };
    
    this.queryLinks = function (api, title, whitelist, callEnd, callArgs) {
        WM.MW.callAPIGet(
            {
                action: "query",
                prop: "info|revisions",
                rvprop: "content|timestamp",
                intoken: "edit",
                titles: title,
                redirects: "1",
                meta: "siteinfo",
                siprop: "interwikimap",
                sifilteriw: "local",
            },
            api,
            function (res, args) {
                var page = Alib.Obj.getFirstItem(res.query.pages);
                if (page.revisions) {
                    var source = page.revisions[0]["*"];
                    var timestamp = page.revisions[0].timestamp;
                    var edittoken = page.edittoken;
                    var iwmap = res.query.interwikimap;
                    var langlinks = WM.Interlanguage.parseLinks(whitelist, source, iwmap);
                }
                else {
                    // The requested article doesn't exist
                    var source = "missing";
                    var timestamp = null;
                    var edittoken = null;
                    var iwmap = res.query.interwikimap;
                    var langlinks = "missing";
                }
                
                callEnd(
                    api,
                    title,
                    whitelist,
                    langlinks,
                    iwmap,
                    source,
                    timestamp,
                    edittoken,
                    callArgs
                );
            }
        );
    };
    
    this.createNewLink = function (origTag, title, url) {
        return {
            origTag: origTag,
            title: title,
            url: url,
        };
    };
    
    this.createVisitedLink = function (origTag, title, url, iwmap, api, source, timestamp, edittoken, links) {
        var entry = {
            origTag: origTag,
            title: title,
            url: url,
            iwmap: iwmap,
            api: api,
            source: source,
            timestamp: timestamp,
            edittoken: edittoken,
            links: [],
        };
        for (var l in links) {
            entry.links.push(links[l]);
        }
        return entry;
    };
    
    this.collectLinks = function (visitedlinks, newlinks, whitelist, error, callEnd, callArgs) {
        // If error is "missing" it should be possible to continue safely
        if (error != "conflict") {
            for (var tag in newlinks) {
                var link = newlinks[tag];
                break;
            }
            
            if (link) {
                var origTag = link.origTag;
                var title = link.title;
                var url = link.url;
                var api = WM.MW.getWikiPaths(url).api;
                
                delete newlinks[tag];
                
                WM.Log.logInfo("Reading " + url + "...");
                
                this.queryLinks(
                    api,
                    title,
                    whitelist,
                    WM.Interlanguage._collectLinksContinue,
                    [url, tag, origTag, visitedlinks, newlinks, callEnd, callArgs]
                );
            }
            else {
                callEnd(visitedlinks, callArgs);
            }
        }
        else {
            callEnd(error, callArgs);
        }
    };
    
    this._collectLinksContinue = function (api, title, whitelist, langlinks, iwmap, source, timestamp, edittoken, args) {
        var url = args[0];
        var tag = args[1];
        var origTag = args[2];
        var visitedlinks = args[3];
        var newlinks = args[4];
        var callEnd = args[5];
        var callArgs = args[6];
            
        var error = "";
        
        if (langlinks != "missing") {
            visitedlinks[tag] = WM.Interlanguage.createVisitedLink(origTag, title, url, iwmap, api, source, timestamp, edittoken, langlinks);
            
            for (var l in langlinks) {
                var link = langlinks[l];
                if (!visitedlinks[link.lang.toLowerCase()] && !newlinks[link.lang.toLowerCase()]) {
                    newlinks[link.lang.toLowerCase()] = WM.Interlanguage.createNewLink(link.lang, link.title, link.url);
                }
                else if (visitedlinks[link.lang.toLowerCase()] && visitedlinks[link.lang.toLowerCase()].url != link.url) {
                    error = "conflict";
                    WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link.title + "]] and [[" + link.lang + ":" + visitedlinks[link.lang].title + "]]");
                    break;
                }
                else if (newlinks[link.lang.toLowerCase()] && newlinks[link.lang.toLowerCase()].url != link.url) {
                    error = "conflict";
                    WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link.title + "]] and [[" + link.lang + ":" + newlinks[link.lang].title + "]]");
                    break;
                }
            }
        }
        else {
            error = "missing";
            WM.Log.logWarning("[[" + tag + ":" + title + "]] seems to point to a non-existing article, removing it");
        }
        
        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            whitelist,
            error,
            callEnd,
            callArgs
        );
    };
    
    this.updateLinks = function (lang, url, iwmap, source, oldlinks, newlinks) {
        lang = lang.toLowerCase();
        var linkList = [];
        
        for (var tag in newlinks) {
            if (tag != lang) {
                var link = newlinks[tag];
                var tagFound = false;
                for (var iw in iwmap) {
                    if (iwmap[iw].prefix.toLowerCase() == tag.toLowerCase()) {
                        if (WM.MW.getWikiPaths(iwmap[iw].url).api == link.api) {
                            linkList.push("[[" + link.origTag + ":" + link.title + "]]\n");
                        }
                        else {
                            WM.Log.logWarning("On " + url + ", " + tag + " interlanguage links point to a different wiki than the others, ignoring them");
                        }
                        tagFound = true;
                        break;
                    }
                }
                if (!tagFound) {
                    WM.Log.logWarning(tag + " interlanguage links are not supported in " + url + ", ignoring them");
                }
            }
        }
        
        linkList.sort(
            function (a, b) {
                // Sorting is case sensitive by default
                if (a.toLowerCase() > b.toLowerCase())
                    return 1;
                if (b.toLowerCase() > a.toLowerCase())
                    return -1;
                else
                    return 0;
            }
        );
        
        var cleanText = "";
        var textId = 0;
        for (var l in oldlinks) {
            var link = oldlinks[l];
            cleanText += source.substring(textId, link.index);
            textId = link.index + link.length;
        }
        cleanText += source.substring(textId);
        
        if (oldlinks.length) {
            // Insert the new links at the index of the first previous link
            var firstLink = oldlinks[0].index;
        }
        else {
            var firstLink = 0;
        }
        
        var part1 = cleanText.substring(0, firstLink);
        var part2a = cleanText.substr(firstLink);
        var firstChar = part2a.search(/[^\s]/);
        var part2b = part2a.substr(firstChar);
        
        var newText = part1 + linkList.join("") + part2b;
        
        return newText;
    };
};
