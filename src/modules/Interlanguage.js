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
    this.parseLinks = function (whitelist, source, iwmap) {
        var parsedLinks = WM.Parser.findSpecialLinks(
            source,
            whitelist.join("|")
        );
        
        var langlinks = [];
        for (var p in parsedLinks) {
            var link = parsedLinks[p];
            var ltag = link.match[2];
            var ltitle = link.match[3];
            for (var iw in iwmap) {
                if (iwmap[iw].prefix == ltag) {
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
                var source = page.revisions[0]["*"];
                var timestamp = page.revisions[0].timestamp;
                var edittoken = page.edittoken;
                var iwmap = res.query.interwikimap;
        
                var langlinks = WM.Interlanguage.parseLinks(whitelist, source, iwmap);
                
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
    
    this.createNewLink = function (title, url) {
        return {
            title: title,
            url: url,
        };
    };
    
    this.createVisitedLink = function (title, url, iwmap, api, source, timestamp, edittoken, links) {
        var entry = {
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
    
    this.collectLinks = function (visitedlinks, newlinks, whitelist, conflict, callEnd, callArgs) {
        if (!conflict) {
            for (var tag in newlinks) {
                var link = newlinks[tag];
                break;
            }
            
            if (link) {
                var title = link.title;
                var url = link.url;
                var api = WM.MW.getWikiPaths(url).api;
                
                delete newlinks[tag];
                
                WM.Log.logInfo("Reading " + url + "...");
                
                this.queryLinks(
                    api,
                    title,
                    whitelist,
                    WM.Interlanguage.collectLinksContinue,
                    [url, tag, visitedlinks, newlinks, callEnd, callArgs]
                );
            }
            else {
                callEnd(visitedlinks, callArgs);
            }
        }
        else {
            callEnd("conflict", callArgs);
        }
    };
    
    this.collectLinksContinue = function (api, title, whitelist, langlinks, iwmap, source, timestamp, edittoken, args) {
        var url = args[0];
        var tag = args[1];
        var visitedlinks = args[2];
        var newlinks = args[3];
        var callEnd = args[4];
        var callArgs = args[5];
        
        visitedlinks[tag] = WM.Interlanguage.createVisitedLink(title, url, iwmap, api, source, timestamp, edittoken, langlinks);
        
        var conflict = false;
        
        for (var l in langlinks) {
            var link = langlinks[l];
            if (!visitedlinks[link.lang] && !newlinks[link.lang]) {
                newlinks[link.lang] = this.createNewLink(link.title, link.url);
            }
            else if ((visitedlinks[link.lang] && visitedlinks[link.lang].url != link.url) ||
                     (newlinks[link.lang] && newlinks[link.lang].url != link.url)) {
                conflict = true;
                WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link.title + "]]");
                break;
            }
        }
        
        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            whitelist,
            conflict,
            callEnd,
            callArgs
        );
    };
    
    this.updateLinks = function (lang, url, iwmap, source, oldlinks, newlinks) {
        var linkList = "";
        
        for (var tag in newlinks) {
            if (tag != lang) {
                var link = newlinks[tag];
                var tagFound = false;
                for (var iw in iwmap) {
                    if (iwmap[iw].prefix == tag) {
                        if (WM.MW.getWikiPaths(iwmap[iw].url).api == link.api) {
                            linkList += "[[" + tag + ":" + link.title + "]]\n";
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
        
        var cleanText = "";
        var textId = 0;
        for (var l in oldlinks) {
            var link = oldlinks[l];
            cleanText += source.substring(textId, link.index);
            textId = link.index + link.length;
        }
        cleanText += source.substring(textId);
        
        // Insert the new links at the index of the first previous link
        var firstLink = oldlinks[0].index;
        
        var part1 = cleanText.substring(0, firstLink);
        var part2a = cleanText.substr(firstLink);
        var firstChar = part2a.search(/[^\s]/);
        var part2b = part2a.substr(firstChar);
        
        var newText = part1 + linkList + part2b;
        
        return newText;
    };
};
