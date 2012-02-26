WM.Plugins.UpdateCategoryTree = new function () {
    this.makeUI = function (args) {
        var tocs = args[0];
        
        var select = document.createElement('select');
        var option;
        for (var key in tocs) {
            option = document.createElement('option');
            option.value = tocs[key];
            option.innerHTML = key;
            select.appendChild(option);
        }
        option = document.createElement('option');
        option.value = 'ALL';
        option.innerHTML = 'UPDATE ALL';
        select.appendChild(option);
        select.id = "UpdateCategoryTree-select";
        
        return select;
    };
    
    var recurse = function (indent, base, cmcontinue, ancestors) {
        WM.Log.logInfo("Processing " + base + "...");
        
        var text = "";
        
        var query = {action: "query",
                     list: "categorymembers",
                     cmtitle: encodeURIComponent(base),
                     cmtype: "subcat",
                     cmlimit: 5000};
        
        if (cmcontinue) {
            query.cmcontinue = cmcontinue;
        }
        else {
            var info = getCategoryInfo(base);
            text = indent  + "[[:" + base + "|" + base.substr(9) + "]] (" + ((info) ? info.pages : 0) + ")\n";
        }
        
        var res = WM.MW.callAPIGet(query);
        var subCats = res.query.categorymembers;
        var cat, subIndent, subAncestors;
        
        for each (var subCat in subCats) {
            cat = subCat.title;
            subIndent = indent + "#";
            
            // Make a copy of the object, not a new reference
            subAncestors = JSON.parse(JSON.stringify(ancestors));
            
            // Protect from category loops
            if (ancestors[cat]) {
                text = subIndent  + "'''LOOP:''' [[:" + cat + "|" + cat.substr(9) + "]]\n";
                WM.Log.logWarning("Loop: " + base + " and " + cat + " are reciprocal ancestors");
            }
            else {
                subAncestors[base] = true;
                text += recurse(subIndent, cat, null, subAncestors);
            }
        }
        
        if (res["query-continue"]) {
            cmcontinue = res["query-continue"].categorymembers.cmcontinue;
            text += recurse(indent, base, cmcontinue, ancestors);
        }
        
        return text
    };
    
    var getCategoryInfo = function (name) {
        var res = WM.MW.callAPIGet({action: "query",
                                    prop: "categoryinfo",
                                    titles: encodeURIComponent(name)});
        var pages = res.query.pages;
        
        var pageid;
        for each (pageid in pages) {
            break;
        }
        
        return pageid.categoryinfo;
    };
    
    var updateToC = function (toc, root, summary, minInterval) {
        var startMark = "START AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK";
        var endMark = "END AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK";
        
        WM.Log.logInfo('Updating ' + toc + "...");
        
        var res = WM.MW.callAPIGet({action: "query",
                                    prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: encodeURIComponent(toc)});
        var pages = res.query.pages;
        
        var pageid;
        for each (pageid in pages) {
            break;
        }
        
        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];
        
        var now = new Date();
        var msTimestamp = Date.parse(timestamp);
        if (now.getTime() - msTimestamp >= minInterval) {
            var start = source.indexOf(startMark + '--&gt;');
            var end = source.lastIndexOf('&lt;!--' + endMark);
            
            if (start > -1 && end > -1) {
                var part1 = source.substring(0, start);
                var part2 = source.substring(end);
                
                var tree = recurse("", root, null, {});
                
                var newtext = part1 + tree + part2;
                
                if (newtext != source) {
                    res = WM.MW.callAPIPost({action: "edit",
                                             bot: "1",
                                             title: encodeURIComponent(toc),
                                             summary: encodeURIComponent(summary),
                                             text: encodeURIComponent(newtext),
                                             basetimestamp: timestamp,
                                             token: encodeURIComponent(edittoken)});
                    
                    if (res.edit && res.edit.result == 'Success') {
                        WM.Log.logInfo(toc + ' correctly updated');
                    }
                    else {
                        WM.Log.logError(toc + ' has not been updated!');
                    }
                }
                else {
                    WM.Log.logInfo(toc + ' is already up to date');
                }
            }
            else {
                WM.Log.logError("Cannot find insertion marks in " + toc);
            }
        }
        else {
            WM.Log.logWarning(toc + ' has been updated too recently');
        }
    };
    
    this.main = function (args) {
        var tocs = args[0];
        var summary = args[1];
        
        var minInterval;
        if (WM.MW.isUserBot()) {
            minInterval = 60000;
        }
        else {
            minInterval = 86400000;
        }
        
        var select = document.getElementById("UpdateCategoryTree-select");
        var option = select.options[select.selectedIndex];
        var toc = option.innerHTML;
        var root = option.value;
        
        if (root == 'ALL') {
            for (var key in tocs) {
                updateToC(key, tocs[key], summary, minInterval);
            }
        }
        else {
            updateToC(toc, root, summary, minInterval);
        }
    };
};
