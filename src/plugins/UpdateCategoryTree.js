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
    
    var recurse = function (indent, base, cmcontinue) {
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
            text = indent  + "[[:" + base + "]]\n";
        }
        
        var res = WM.MW.callAPIGet(query);
        var subCats = res.query.categorymembers;
        var cat, subIndent;
        
        for each (var subCat in subCats) {
            cat = subCat.title;
            subIndent = indent + "#";
            text += recurse(subIndent, cat, null);
        }
        
        if (res["query-continue"]) {
            cmcontinue = res["query-continue"].categorymembers.cmcontinue;
            text += recurse(indent, base, cmcontinue);
        }
        
        // Protect from loops ****************************************************
        // Show number of articles ***********************************************
        
        return text
    };
    
    this.main = function (args) {
        var tocs = args[0];
        var summary = args[1];
        
        var select = document.getElementById("UpdateCategoryTree-select");
        var option = select.options[select.selectedIndex];
        var toc = option.innerHTML;
        var root = option.value;
        
        WM.Log.logInfo('Updating ' + toc + "...");
        
        // Controllare la data dell'ultimo aggiornamento ed **********************
        // evitare di farlo se è troppo recente
        
        var newtext = recurse("", root, null);
        
        alert(newtext);  // ******************************************************
        
        // Inserire il testo in un punto preciso della pagina ********************
        
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
