WM.Plugins.ArchWikiRemoveCategorySuffix = new function () {
    this.createCategory = function (params) {
        // OUT OF DATE ***********************************************************
        
        WM.Log.logInfo("Processing category " + cat + "...");
        
        var cat = params.node;
        
        if (cat.substr(-10) == " (English)") {
            var summary = "prepare to move here the members of [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
            
            var oldpage = WM.MW.callQuerySync({prop: 'revisions|categoryinfo',
                                           rvprop: 'content',
                                           titles: cat});
            
            // CHECK THE CATEGORY STILL EXISTS, IT MAY HAVE BEEN DELETED *********
            // IN A PREVIOUS LOOP ************************************************
            
            var text = oldpage.revisions[0]['*'];
            var info = oldpage.categoryinfo;
            
            var title = cat.slice(0, -10);
            
            // The suffix should have already been removed from all the parent
            // categories
            
            var newpage = WM.MW.callQuerySync({prop: 'info',
                                           intoken: 'edit',
                                           titles: title});
            
            var edittoken = newpage.edittoken;
            
            var res = WM.MW.callAPIPostSync({action: 'edit',
                                     bot: '1',
                                     title: title,
                                     summary: summary,
                                     text: text,
                                     createonly: '1',
                                     token: edittoken});
            
            if (!res.edit || res.edit.result != "Success") {
                WM.Log.logError(title + " has not been created!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
            }
            else {
                var members = WM.Cat.getAllMembers(cat);
                recategorizeNextMember(cat, info, title, members, 0);
            }
        }
        else {
            setTimeout(WM.Cat.recurseTreeContinue, this.params.interval, [params]);
        }
    };
    
    var recategorizeNextMember = function (cat, info, title, members, mindex) {
        if (members[mindex]) {
            var member = members[mindex].title;
            WM.Log.logInfo("Processing member " + member + "...");
            setTimeout(recategorizeMember, this.params.interval, [cat, info, title, member, members, mindex]);
        }
        else {
            checkCategory(cat, info, title);
        }
    };
    
    var recategorizeMember = function (args) {
        var [cat, info, title, member, members, mindex] = args;
        var summary = "remove language suffix from [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        
        var page = WM.MW.callQuerySync({prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: member});
        
        var edittoken = page.edittoken;
        var timestamp = page.revisions[0].timestamp;
        var source = page.revisions[0]["*"];
        
        var reTitle = cat.replace(/[-[\]{}()*+?.,:!=\\^$|#\s]/g, "\\$&");
        reTitle = reTitle.replace(/\\ /g, "[ _]+");
        reTitle = reTitle.replace(/^Category\\:/gi, "Category *\\: *");
        reTitle = "\\[\\[ *" + reTitle + " *\\]\\]";
        
        var regExp = new RegExp(reTitle, "gi");
        
        var sTitle = title.substr(9);
        
        var newText = source.replace(regExp, "[[Category:" + sTitle + "]]");
        
        var res = WM.MW.callAPIPostSync({action: "edit",
                                     bot: "1",
                                     title: member,
                                     summary: summary,
                                     text: newText,
                                     basetimestamp: timestamp,
                                     token: edittoken});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(member + " has not been updated!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            continueRecategorizingMembers(cat, info, title, members, mindex);
        }
    };
    
    var continueRecategorizingMembers = function (cat, info, title, members, mindex) {
        mindex++;
        recategorizeNextMember(cat, info, title, members, mindex);
    };
    
    var checkCategory = function (cat, info, title) {
        var newinfo = WM.Cat.getInfo(title);
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
            else {
                var backlinks = WM.MW.getBacklinks(cat, blnamespace, null);
                updateNextBacklink(cat, info, title, backlinks, 0);
            }
        }
    };
    
    var updateNextBacklink = function (cat, info, title, backlinks, bindex) {
        if (backlinks[bindex]) {
            var backlink = backlinks[bindex].title;
            WM.Log.logInfo("Processing backlink " + backlink + "...");
            setTimeout(updateBacklink, this.params.interval, [cat, info, title, backlink, backlinks, bindex]);
        }
        else {
            deleteCategory(cat, title);
        }
    };
    
    var updateBacklink = function (args) {
        var [cat, info, title, backlink, backlinks, bindex] = args;
        var summary = "removed language suffix from [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        
        var page = WM.MW.callQuerySync({prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: backlink});
        
        var edittoken = page.edittoken;
        var timestamp = page.revisions[0].timestamp;
        var source = page.revisions[0]["*"];
        
        var reTitle = cat.replace(/[-[\]{}()*+?.,:!=\\^$|#\s]/g, "\\$&");
        reTitle = reTitle.replace(/\\ /g, "[ _]+");
        reTitle = reTitle.replace(/^Category\\:/gi, "Category *\\: *");
        reTitle = "\\[\\[\\: *" + reTitle;
        
        var regExp = new RegExp(reTitle, "gi");
        
        var sTitle = title.substr(9);
        
        var newText = source.replace(regExp, "[[:Category:" + sTitle);
        
        var res = WM.MW.callAPIPostSync({action: "edit",
                                     bot: "1",
                                     title: backlink,
                                     summary: summary,
                                     text: newText,
                                     basetimestamp: timestamp,
                                     token: edittoken});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(backlink + " has not been updated!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            continueUpdatingBacklinks(cat, info, title, backlinks, bindex);
        }
    };
    
    var continueUpdatingBacklinks = function (cat, info, title, backlinks, bindex) {
        bindex++;
        updateNextBacklink(cat, info, title, backlinks, bindex);
    };
    
    var deleteCategory = function (cat, title) {
        var summary = "moved to [[:" + title + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        
        var page = WM.MW.callQuerySync({prop: 'info',
                                    intoken: 'delete',
                                    titles: cat});
        
        var deletetoken = page.deletetoken;
        
        var res = WM.MW.callAPIPostSync({action: 'delete',
                                     bot: '1',
                                     title: cat,
                                     token: deletetoken,
                                     reason: summary});
        
        if (!res['delete']) {
            WM.Log.logError(cat + " has not been deleted!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            setTimeout(WM.Cat.recurseTreeContinue, this.params.interval, [params]);
        }
    };
    
    this.params = {
        root: "",
        interval: 8000,
        blnamespace: "0|1|4|5|6|7|8|9|10|11|12|13|14|15"
    };
    
    this.main = function (args) {
        this.params.root = args[0];
        WM.Log.logInfo("Removing _(English) suffix...");
        WM.Cat.recurseTree(root, this.createCategory, this.mainEnd);
    };
    
    this.mainEnd = function (params) {
        WM.Log.logInfo("_(English) suffix removed\nCheck the log and the history for problems\nUpdate the backlinks that have not been updated");
    };
};
