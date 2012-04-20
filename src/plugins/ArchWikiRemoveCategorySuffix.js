WM.Plugins.ArchWikiRemoveCategorySuffix = new function () {
    var createCategory = function (args) {
        var [cat, cats, index, interval] = args;
        var summary = "rm English suffix from [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        // Controlla se il summary va bene per tutti gli edit/delete *************
        
        var oldpage = WM.MW.callQuery({prop: 'revisions|categoryinfo',
                                       rvprop: 'content',
                                       titles: encodeURIComponent(cat)});
        
        var text = oldpage.revisions[0]['*'];
        var info = oldpage.categoryinfo;
        
        var title = cat.slice(0, -10);
        
        // The suffix should have already been removed from all the parent
        // categories
        
        var newpage = WM.MW.callQuery({prop: 'info',
                                       intoken: 'edit',
                                       titles: encodeURIComponent(title)});
        
        var edittoken = newpage.edittoken;
        /*
        var res = WM.MW.callAPIPost({action: 'edit',
                                 bot: '1',
                                 title: encodeURIComponent(title),
                                 summary: encodeURIComponent(summary),
                                 text: encodeURIComponent(text),
                                 createonly: '1',
                                 token: encodeURIComponent(edittoken)});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(title + " has not been created!");
        }
        else { */
            var members = WM.Cat.getAllMembers(cat);
            WM.Log.logDebug(JSON.stringify(members));  // ************************
            recategorizeNextMember(cat, cats, index, summary, interval, info, title, members, 0);
        //}
    };
    
    var recategorizeNextMember = function (cat, cats, index, summary, interval, info, title, members, mindex) {
        if (members[mindex]) {
            var member = members[mindex].title;
            WM.Log.logInfo("Processing " + member + "...");
            setTimeout(recategorizeMember, interval, [cat, cats, index, summary, interval, info, title, member, members, mindex]);
        }
        else {
            checkCategory(cat, cats, index, summary, interval, info, title);
        }
    };
    
    var recategorizeMember = function (args) {
        var [cat, cats, index, summary, interval, info, title, member, members, mindex] = args;
        
        var page = WM.MW.callQuery({prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: encodeURIComponent(member)});
        
        var edittoken = page.edittoken;
        var timestamp = page.revisions[0].timestamp;
        var source = page.revisions[0]["*"];
        
        var reTitle = cat.replace(/[-[\]{}()*+?.,:!=\\^$|#\s]/g, "\\$&");
        reTitle = reTitle.replace(/\\ /g, "[ _]+");
        reTitle = reTitle.replace(/^Category\\:/gi, "Category *\\: *");
        reTitle = "\\[\\[ *" + reTitle + " *\\]\\]";
        
        var regExp = new RegExp(reTitle, "gi");
        WM.Log.logDebug(regExp);  // *********************************************
        
        var newText = source.replace(regExp, "[[Category:" + title + "]]");
        /*
        var res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(member),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newText),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(member + " has not been updated!");
        }
        else { */
            continueRecategorizingMembers(cat, cats, index, summary, interval, info, title, members, mindex);
        //}
    };
    
    var continueRecategorizingMembers = function (cat, cats, index, summary, interval, info, title, members, mindex) {
        mindex++;
        recategorizeNextMember(cat, cats, index, summary, interval, info, title, members, mindex);
    };
    
    var checkCategory = function (cat, cats, index, summary, interval, info, title) {
        /*var newinfo = WM.Cat.getInfo(title);
        var error = false;
        
        for (var key in info) {
            if (info[key] != newinfo[key]) {
                WM.Log.logError(title + " has a different number of members " + JSON.stringify(newinfo) + " than the original " + cat + " " + JSON.stringify(info));
                error = true;
                break;
            }
        }
        
        if (!error) {
            var oldinfo = WM.Cat.getInfo(cat);
            if (oldinfo.size != 0) {
                WM.Log.logError(cat + " has not been emptied!");
            }
            else {*/
                var backlinks = WM.MW.getBacklinks(cat, null, null);
                WM.Log.logDebug(JSON.stringify(backlinks));  // ************************
                updateNextBacklink(cat, cats, index, summary, interval, info, title, backlinks, 0);
            /*}
        }*/
    };
    
    var updateNextBacklink = function (cat, cats, index, summary, interval, info, title, backlinks, bindex) {
        if (backlinks[bindex]) {
            var backlink = backlinks[bindex].title;
            
            
            
            // Avoid dangerous namespaces ********************************************
            
            
            
            WM.Log.logInfo("Processing " + backlink + "...");
            setTimeout(updateBacklink, interval, [cat, cats, index, summary, interval, info, title, backlink, backlinks, bindex]);
        }
        else {
            deleteCategory(cat, cats, index, summary, interval);
        }
    };
    
    var updateBacklink = function (args) {
        var [cat, cats, index, summary, interval, info, title, backlink, backlinks, bindex] = args;
        
        var page = WM.MW.callQuery({prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: encodeURIComponent(backlink)});
        
        var edittoken = page.edittoken;
        var timestamp = page.revisions[0].timestamp;
        var source = page.revisions[0]["*"];
        
        var reTitle = cat.replace(/[-[\]{}()*+?.,:!=\\^$|#\s]/g, "\\$&");
        reTitle = reTitle.replace(/\\ /g, "[ _]+");
        reTitle = reTitle.replace(/^Category\\:/gi, "Category *\\: *");
        reTitle = "\\[\\[\\: *" + reTitle;
        
        var regExp = new RegExp(reTitle, "gi");
        WM.Log.logDebug(regExp);  // *********************************************
        
        var newText = source.replace(regExp, "[[:Category:" + title);
        /*
        var res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(backlink),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newText),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(backlink + " has not been updated!");
        }
        else { */
            continueUpdatingBacklinks(cat, cats, index, summary, interval, info, title, backlinks, bindex);
        //}
    };
    
    var continueUpdatingBacklinks = function (cat, cats, index, summary, interval, info, title, backlinks, bindex) {
        bindex++;
        updateNextBacklink(cat, cats, index, summary, interval, info, title, backlinks, bindex);
    };
    
    var deleteCategory = function (cat, cats, index, summary, interval) {
        var page = WM.MW.callQuery({prop: 'info',
                                    intoken: 'delete',
                                    titles: encodeURIComponent(cat)});
        
        var edittoken = page.edittoken;
        /*
        var res = WM.MW.callAPIPost({action: 'delete',
                                     bot: '1',
                                     title: encodeURIComponent(cat),
                                     token: encodeURIComponent(edittoken),
                                     reason: encodeURIComponent(summary)});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(cat + " has not been deleted!");
        }
        else { */
            continueIteration(cats, index, interval);
        //}
    };
    
    var iterate = function (cats, index, interval) {
        if (cats[index]) {
            var cat = cats[index];
            
            WM.Log.logInfo("Processing " + cat + "...");
            
            if (cat.substr(-10) == " (English)") {
                setTimeout(createCategory, interval, [cat, cats, index, interval]);
            }
            else {
                continueIteration(cats, index, interval);
            }
        }
        else {
            WM.Log.logInfo("_(English) suffix removed\nCheck the log and the history for problems\nUpdate the backlinks that have not been updated");
        }
    };
    
    var continueIteration = function (cats, index, interval) {
        index++;
        iterate(cats, index, interval);
    };
    
    var flattenTree = function (tree) {
        var siblings = [];
        for (var cat in tree) {
            siblings.push(cat);
            if (tree[cat] != 'loop') {
                siblings = siblings.concat(flattenTree(tree[cat]));
            }
        }
        return siblings;
    };
    
    var removeDuplicates = function (mcats) {
        var cats = [];
        var dict = {};
        
        for each (var cat in mcats) {
            if (!dict[cat]) {
                cats.push(cat);
                dict[cat] = true;
            }
        }
        
        return cats;
    };
    
    this.main = function (args) {
        var root = "Category:LG (English)";  // ************************************
        var interval = 2000;  // *************************************************
        WM.Log.logInfo("Removing _(English) suffix...");
        var tree = WM.Cat.getTree(root);
        var mcats = flattenTree(tree);
        var cats = removeDuplicates(mcats);
        iterate(cats, 0, interval);
    };
};
