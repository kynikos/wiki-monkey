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
    
    var readToC = function () {
        WM.Log.logInfo('Updating ' + this.params.params.page + "...");
        
        var minInterval;
        if (WM.MW.isUserBot()) {
            minInterval = 60000;
        }
        else {
            minInterval = 21600000;
        }
        
        WM.MW.callQuery({prop: "info|revisions",
                         rvprop: "content|timestamp",
                         intoken: "edit",
                         titles: encodeURIComponent(this.params.params.page)},
                        this.processToC);
    };
    
    this.processToC = function (pageid) {
        this.params.edittoken = pageid.edittoken;
        this.params.timestamp = pageid.revisions[0].timestamp;
        this.params.source = pageid.revisions[0]["*"];
        
        var now = new Date();
        var msTimestamp = Date.parse(timestamp);
        if (now.getTime() - msTimestamp >= minInterval) {
            var start = source.indexOf(this.params.startMark) + startMark.length;
            var end = source.lastIndexOf(this.params.endMark);
            
            if (start > -1 && end > -1) {
                this.params.part1 = source.substring(0, start);
                this.params.part2 = source.substring(end);
                (this.params.params.keepAltName) ? storeAlternativeNames() : {};
                WM.Cat.recurseTree(this.params.params.root,
                                   this.processCategory,
                                   this.writeToC);
            }
            else {
                WM.Log.logError("Cannot find insertion marks in " + this.params.params.page);
                iterateTocs();
            }
        }
        else {
            WM.Log.logWarning(this.params.params.page + ' has been updated too recently');
            iterateTocs();
        }
    };
    
    var storeAlternativeNames = function () {
        var dict = {};
        var regExp = /\[\[\:([Cc]ategory\:.+?)\|(.+?)\]\]/gm;
        while (true) {
            var match = regExp.exec(this.params.source);
            if (match) {
                dict[match[1]] = match[2];
            }
            else {
                break;
            }
        }
        this.params.altNames = dict;
    };
    
    this.processCategory = function (params) {
        WM.Log.logInfo("Processing " + params.node + "...");
        
        var text = "";
        
        for (var i = 0; i < params.ancestors.length; i++) {
            text += this.params.params.indentType;
        }
        
        if (this.params.params.showIndices) {
            var indices = [];
            var node = params;
            while (node.parentIndex) {
                indices.push(node.siblingIndex);
                node = params.nodesList[node.parentIndex];
            }
            text += (indices) ? ("<small>" + indices.reverse().join(".") + ".</small> ") : "";
        }
        
        var altName = (this.params.altNames[params.node]) ? this.params.altNames[params.node] : null;
        text += createCatLink(params.node, this.params.params.replace, altName) + " ";
        
        if (params.children == "loop") {
            text += "'''[LOOP]'''\n";
            WM.Log.logWarning("Loop in " + params.node);
        }
        else {
            var info = WM.Cat.getInfo(params.node);
            var parents = WM.Cat.getParents(params.node);
            
            text += "<small>(" + ((info) ? info.pages : 0) + ")";
            
            if (parents.length > 1) {
                outer_loop:
                for (var p in parents) {
                    var par = parents[p];
                    for (var anc in params.ancestors) {
                        if (par == anc) {
                            parents.splice(parents.indexOf(par), 1);
                            break outer_loop;
                        }
                    }
                }
                for (var i in parents) {
                    altName = (this.params.altNames[parents[i]]) ? this.params.altNames[parents[i]] : null;
                    parents[i] = createCatLink(parents[i], this.params.params.replace, altName);
                }
                text += " (" + this.params.params.alsoIn + " " + parents.join(", ") + ")";
            }
            
            text += "</small>\n";
        }
        
        this.params.treeText += text;
        
        WM.Cat.recurseTreeContinue(params);
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
    
    var writeToC = function (params) {
        var newtext = this.params.part1 + "\n" + this.params.treeText + this.params.part2;
        if (newtext != this.params.source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: encodeURIComponent(this.params.params.page),
                               summary: encodeURIComponent(this.params.summary),
                               text: encodeURIComponent(newtext),
                               basetimestamp: this.params.timestamp,
                               token: encodeURIComponent(this.params.edittoken)},
                              this.checkWrite);
        }
        else {
            WM.Log.logInfo(this.params.params.page + ' is already up to date');
            iterateTocs()
        }
    };
    
    this.checkWrite = function (res) {
        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo(this.params.params.page + ' correctly updated');
            iterateTocs()
        }
        else {
            WM.Log.logError(this.params.params.page + ' has not been updated!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };
    
    var iterateTocs = function () {
        this.params.index++;
        this.params.params = this.params.tocs[this.params.index];
        if (this.params.tocs[this.params.index]) {
            readToC();
        }
        else {
            WM.Log.logInfo("Operations completed, check the log for warnings or errors");
        }
    };
    
    this.params = {
        tocs: [],
        index: -1,
        params: {},
        edittoken: "",
        timestamp: "",
        source: "",
        part1: "",
        part2: "",
        treeText: "",
        startMark: "START AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK-->",
        endMark: "<!--END AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK",
        altNames: {},
        summary: ""
    };
    
    this.main = function (args) {
        var tocs = args[0];
        this.params.summary = args[1];
        
        var select = document.getElementById("UpdateCategoryTree-select");
        var value = select.options[select.selectedIndex].value;
        
        this.params.tocs = (value == '*') ? tocs : [tocs[select.selectedIndex]];
        
        iterateTocs();
    };
};
