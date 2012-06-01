WM.Plugins.SynchronizeInterlanguageLinks = new function () {
    this.main = function (args, callNext) {
        var title = WM.Editor.getTitle();
        
        var tag = args[0](title);
        var whitelist = args[1];
        
        WM.Log.logInfo("Synchronizing interlanguage links...");
        
        WM.MW.getInterwikiMap(
            title,
            WM.Plugins.SynchronizeInterlanguageLinks.mainContinue,
            [tag, whitelist, title, callNext]
        );
    };
    
    this.mainContinue = function (iwmap, args) {
        var tag = args[0];
        var whitelist = args[1];
        var title = args[2];
        var callNext = args[3];
        
        var source = WM.Editor.readSource();
        
        var langlinks = WM.Interlanguage.parseLinks(whitelist, source, iwmap);
        
        var paths = WM.MW.getWikiPaths();
        var url = paths.articles + WM.Parser.convertSpacesToUnderscores(title);
        var api = paths.api;
        
        var visitedlinks = {};
        visitedlinks[tag] = WM.Interlanguage.createVisitedLink(title, url, iwmap, api, source, null, null, langlinks);
        
        var newlinks = {};
        
        WM.Log.logInfo("Reading " + url + "...");
        
        if (langlinks) {
            var conflict = false;
            for (var l in langlinks) {
                var link = langlinks[l];
                if (!visitedlinks[link.lang] && !newlinks[link.lang]) {
                    newlinks[link.lang] = WM.Interlanguage.createNewLink(link.title, link.url);
                }
                else if ((visitedlinks[link.lang] && visitedlinks[link.lang].url != link.url) ||
                         (newlinks[link.lang] && newlinks[link.lang].url != link.url)) {
                    conflict = true;
                    WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link.title + "]]");
                    break;
                }
            }
        
            if (!conflict) {
                WM.Interlanguage.collectLinks(
                    visitedlinks,
                    newlinks,
                    whitelist,
                    false,
                    WM.Plugins.SynchronizeInterlanguageLinks.mainEnd,
                    [tag, url, source, langlinks, iwmap, callNext]
                );
            }
        }
        else {
            WM.Log.logInfo("No interlanguage links found");
            if (callNext) {
                callNext();
            }
        }
    };
    
    this.mainEnd = function (links, args) {
        var tag = args[0];
        var url = args[1];
        var source = args[2];
        var langlinks = args[3];
        var iwmap = args[4];
        var callNext = args[5];
        
        if (links != "conflict") {
            var newText = WM.Interlanguage.updateLinks(tag, url, iwmap, source, langlinks, links);
            
            if (newText != source) {
                WM.Editor.writeSource(newText);
                WM.Log.logInfo("Synchronized interlanguage links");
            }
            else {
                WM.Log.logInfo("Interlanguage links were already synchronized");
            }
        
            if (callNext) {
                callNext();
            }
        }
    };
    
    this.mainAuto = function (args, title, callBot) {
        var tag = args[0](title);
        var whitelist = args[1];
        var summary = args[2];
        
        var paths = WM.MW.getWikiPaths();
        var url = paths.articles + WM.Parser.convertSpacesToUnderscores(title);
        
        var visitedlinks = {};
        
        var newlinks = {};
        newlinks[tag] = WM.Interlanguage.createNewLink(title, url);
        
        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            whitelist,
            false,
            WM.Plugins.SynchronizeInterlanguageLinks.mainAutoWrite,
            [title, url, tag, summary, callBot]
        );
    };
    
    this.mainAutoWrite = function (links, args) {
        var title = args[0];
        var url = args[1];
        var tag = args[2];
        var summary = args[3];
        var callBot = args[4];
        
        if (links != "conflict") {
            var iwmap = links[tag].iwmap;
            var source = links[tag].source;
            var langlinks = links[tag].links;
            var timestamp = links[tag].timestamp;
            var edittoken = links[tag].edittoken;
            
            var newText = WM.Interlanguage.updateLinks(tag, url, iwmap, source, langlinks, links);
            
            if (newText != source) {
                WM.MW.callAPIPost({action: "edit",
                                   bot: "1",
                                   title: title,
                                   summary: summary,
                                   text: newText,
                                   basetimestamp: timestamp,
                                   token: edittoken},
                                   null,
                                   WM.Plugins.SynchronizeInterlanguageLinks.mainAutoEnd,
                                   callBot);
            }
            else {
                callBot(true);
            }
        }
        else {
            callBot(false);
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
