WM.Plugins.UpdateCategoryTree = new function () {
    this.makeUI = function (args) {
        var tocs = args[0];
        
        var select = document.createElement('select');
        for (var key in tocs) {
            option = document.createElement('option');
            option.value = tocs[key];
            option.innerHTML = key;
            select.appendChild(option);
        }
        select.id = "UpdateCategoryTree-select";
        
        return select;
    };
    
    var recurse = function (indent, base, cmcontinue, ancestors) {
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
            text = indent  + "[[:" + base + "|" + base.substr(9) + "]] (" + getCategoryInfo(base).pages + ")\n";
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
    
    this.main = function (args) {
        var tocs = args[0];
        var summary = args[1];
        
        var select = document.getElementById("UpdateCategoryTree-select");
        var option = select.options[select.selectedIndex];
        var toc = option.innerHTML;
        var root = option.value;
        
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
        
        // Controllare la data dell'ultimo aggiornamento ed **********************
        // evitare di farlo se è troppo recente
        
        var tree = recurse("", root, null, {});
        
        alert(tree);  // *********************************************************
        
        // Inserire il testo in un punto preciso della pagina ********************
        
        var newtext = source;  // ************************************************
        
        if (newtext != source) {
            /*res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(toc),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newtext),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
            */
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
    };
};
