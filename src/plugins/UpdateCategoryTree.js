WM.Plugins.UpdateCategoryTree = new function () {
    this.makeUI = function (args) {
        var tocs = args[0];
        
        var select = document.createElement('select');
        var option;
        for (var key in tocs) {
            option = document.createElement('option');
            option.value = tocs[key].page;
            option.innerHTML = tocs[key].page;
            select.appendChild(option);
        }
        option = document.createElement('option');
        option.value = '*';
        option.innerHTML = 'UPDATE ALL';
        select.appendChild(option);
        select.id = "UpdateCategoryTree-select";
        
        return select;
    };
    
    var readToC = function (args) {
        var params = args[0];
        var tocs = args[1];
        var index = args[2];
        var summary = args[3];
        var timeout = args[4];
        
        WM.Log.logInfo('Updating ' + params.page + "...");
        
        var minInterval;
        if (WM.MW.isUserBot()) {
            minInterval = 60000;
        }
        else {
            minInterval = 21600000;
        }
        
        var startMark = "START AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK-->";
        var endMark = "<!--END AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK";
        
        var pageid = WM.MW.callQuerySync({prop: "info|revisions",
                                      rvprop: "content|timestamp",
                                      intoken: "edit",
                                      titles: encodeURIComponent(params.page)});
        
        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];
        
        var now = new Date();
        var msTimestamp = Date.parse(timestamp);
        if (now.getTime() - msTimestamp >= minInterval) {
            var start = source.indexOf(startMark) + startMark.length;
            var end = source.lastIndexOf(endMark);
            
            if (start > -1 && end > -1) {
                var part1 = source.substring(0, start);
                var part2 = source.substring(end);
                setTimeout(getTree, timeout, [params, tocs, index, summary, timeout, timestamp, edittoken, source, part1, part2]);
            }
            else {
                WM.Log.logError("Cannot find insertion marks in " + params.page);
                iterateTocs(tocs, index, summary, timeout);
            }
        }
        else {
            WM.Log.logWarning(params.page + ' has been updated too recently');
            iterateTocs(tocs, index, summary, timeout);
        }
    };
    
    var storeAlternativeNames = function (source) {
        var dict = {};
        var regExp = /\[\[\:([Cc]ategory\:.+?)\|(.+?)\]\]/gm;
        var match;
        
        while (true) {
            match = regExp.exec(source);
            if (match) {
                dict[match[1]] = match[2];
            }
            else {
                break;
            }
        }
        
        return dict;
    };
    
    var getTree = function (args) {
        var params = args[0];
        var tocs = args[1];
        var index = args[2];
        var summary = args[3];
        var timeout = args[4];
        var timestamp = args[5];
        var edittoken = args[6];
        var source = args[7];
        var part1 = args[8];
        var part2 = args[9];
        
        var tree = WM.Cat.getTree(params.root);
        setTimeout(recurseTree, timeout, [params, tocs, index, summary, timeout, timestamp, edittoken, source, part1, part2, tree]);
    };
    
    var recurseTree = function (args) {
        var params = args[0];
        var tocs = args[1];
        var index = args[2];
        var summary = args[3];
        var timeout = args[4];
        var timestamp = args[5];
        var edittoken = args[6];
        var source = args[7];
        var part1 = args[8];
        var part2 = args[9];
        var tree = args[10];
        
        var altNames = (params.keepAltName) ? storeAlternativeNames(source) : {};
        var treeText = recurse(tree, params, altNames, "", "", false, {});
        var newtext = part1 + "\n" + treeText + part2;
        setTimeout(writeToC, timeout, [params, tocs, index, summary, timeout, timestamp, edittoken, source, newtext]);
    };
    
    var createCatLink = function (cat, replace, altName) {
        var catName;
        if (altName) {
            catName = altName;
        }
        else if (replace) {
            var regExp = new RegExp(replace[0], replace[1]);
            catName = cat.substr(9).replace(regExp, replace[2]);
        }
        else {
            catName = cat.substr(9);
        }
        return "[[:" + cat + "|" + catName + "]]";
    };
    
    var recurse = function (tree, params, altNames, indent, baseIndex, showIndex, ancestors) {
        var altName, info, parents, subAncestors, subIndent, index, idString, subIndex, par;
        var id = 1;
        var text = "";
        
        for (var cat in tree) {
            WM.Log.logInfo("Processing " + cat + "...");
            
            index = (showIndex) ? (baseIndex + id + ".") : "";
            
            idString = (index) ? ("<small>" + index + "</small> ") : "";
            altName = (altNames[cat]) ? altNames[cat] : null;
            text += indent + idString + createCatLink(cat, params.replace, altName) + " ";
            
            if (tree[cat] == "loop") {
                text += "'''[LOOP]'''\n";
                WM.Log.logWarning("Loop in " + cat);
            }
            else {
                info = WM.Cat.getInfo(cat);
                parents = WM.Cat.getParents(cat);
                
                text += "<small>(" + ((info) ? info.pages : 0) + ")";
                
                if (parents.length > 1) {
                    outer_loop:
                    for (var p in parents) {
                        par = parents[p];
                        for (var anc in ancestors) {
                            if (par == anc) {
                                parents.splice(parents.indexOf(par), 1);
                                break outer_loop;
                            }
                        }
                    }
                    for (var i in parents) {
                        altName = (altNames[parents[i]]) ? altNames[parents[i]] : null;
                        parents[i] = createCatLink(parents[i], params.replace, altName);
                    }
                    text += " (" + params.alsoIn + " " + parents.join(", ") + ")";
                }
                
                text += "</small>\n";
                
                // Create a copy of the object, not just a new reference
                subAncestors = JSON.parse(JSON.stringify(ancestors));
                
                subAncestors[cat] = true;
                subIndent = indent + params.indentType;
                subIndex = (index) ? index : baseIndex;
                
                text += recurse(tree[cat], params, altNames, subIndent, subIndex, params.showIndices, subAncestors);
            }
            
            id++;
        }
        
        return text
    };
    
    var writeToC = function (args) {
        var params = args[0];
        var tocs = args[1];
        var index = args[2];
        var summary = args[3];
        var timeout = args[4];
        var timestamp = args[5];
        var edittoken = args[6];
        var source = args[7];
        var newtext = args[8];
        
        if (newtext != source) {
            var res = WM.MW.callAPIPostSync({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(params.page),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newtext),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
            
            if (res.edit && res.edit.result == 'Success') {
                WM.Log.logInfo(params.page + ' correctly updated');
            }
            else {
                WM.Log.logError(params.page + ' has not been updated!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
            }
        }
        else {
            WM.Log.logInfo(params.page + ' is already up to date');
        }
        
        iterateTocs(tocs, index, summary, timeout)
    };
    
    var iterateTocs = function (tocs, index, summary, timeout) {
        index++;
        if (tocs[index]) {
            setTimeout(readToC, timeout, [tocs[index], tocs, index, summary, timeout]);
        }
        else {
            WM.Log.logInfo("Operations completed, check the log for warnings or errors");
        }
    };
    
    this.main = function (args) {
        var tocs = args[0];
        var summary = args[1];
        
        var timeout = 100;
        
        var select = document.getElementById("UpdateCategoryTree-select");
        var value = select.options[select.selectedIndex].value;
        
        if (value == '*') {
            iterateTocs(tocs, -1, summary, timeout);
        }
        else {
            var rtocs = [tocs[select.selectedIndex]];
            iterateTocs(rtocs, -1, summary, timeout);
        }
    };
};
