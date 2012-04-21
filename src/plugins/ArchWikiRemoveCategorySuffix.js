WM.Plugins.ArchWikiRemoveCategorySuffix = new function () {
    var createCategory = function (args) {
        var [cat, cats, index, interval, blnamespace] = args;
        var summary = "prepare to move here the members of [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        
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
        
        var res = WM.MW.callAPIPost({action: 'edit',
                                 bot: '1',
                                 title: encodeURIComponent(title),
                                 summary: encodeURIComponent(summary),
                                 text: encodeURIComponent(text),
                                 createonly: '1',
                                 token: encodeURIComponent(edittoken)});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(title + " has not been created!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            var members = WM.Cat.getAllMembers(cat);
            recategorizeNextMember(cat, cats, index, interval, blnamespace, info, title, members, 0);
        }
    };
    
    var recategorizeNextMember = function (cat, cats, index, interval, blnamespace, info, title, members, mindex) {
        if (members[mindex]) {
            var member = members[mindex].title;
            WM.Log.logInfo("Processing member " + member + "...");
            setTimeout(recategorizeMember, interval, [cat, cats, index, interval, blnamespace, info, title, member, members, mindex]);
        }
        else {
            checkCategory(cat, cats, index, interval, blnamespace, info, title);
        }
    };
    
    var recategorizeMember = function (args) {
        var [cat, cats, index, interval, blnamespace, info, title, member, members, mindex] = args;
        var summary = "remove language suffix from [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        
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
        
        var sTitle = title.substr(9);
        
        var newText = source.replace(regExp, "[[Category:" + sTitle + "]]");
        
        var res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(member),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newText),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(member + " has not been updated!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            continueRecategorizingMembers(cat, cats, index, interval, blnamespace, info, title, members, mindex);
        }
    };
    
    var continueRecategorizingMembers = function (cat, cats, index, interval, blnamespace, info, title, members, mindex) {
        mindex++;
        recategorizeNextMember(cat, cats, index, interval, blnamespace, info, title, members, mindex);
    };
    
    var checkCategory = function (cat, cats, index, interval, blnamespace, info, title) {
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
                updateNextBacklink(cat, cats, index, interval, blnamespace, info, title, backlinks, 0);
            }
        }
    };
    
    var updateNextBacklink = function (cat, cats, index, interval, blnamespace, info, title, backlinks, bindex) {
        if (backlinks[bindex]) {
            var backlink = backlinks[bindex].title;
            WM.Log.logInfo("Processing backlink " + backlink + "...");
            setTimeout(updateBacklink, interval, [cat, cats, index, interval, blnamespace, info, title, backlink, backlinks, bindex]);
        }
        else {
            deleteCategory(cat, cats, index, interval, blnamespace, title);
        }
    };
    
    var updateBacklink = function (args) {
        var [cat, cats, index, interval, blnamespace, info, title, backlink, backlinks, bindex] = args;
        var summary = "removed language suffix from [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        
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
        
        var sTitle = title.substr(9);
        
        var newText = source.replace(regExp, "[[:Category:" + sTitle);
        
        var res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(backlink),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newText),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
        
        if (!res.edit || res.edit.result != "Success") {
            WM.Log.logError(backlink + " has not been updated!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            continueUpdatingBacklinks(cat, cats, index, interval, blnamespace, info, title, backlinks, bindex);
        }
    };
    
    var continueUpdatingBacklinks = function (cat, cats, index, interval, blnamespace, info, title, backlinks, bindex) {
        bindex++;
        updateNextBacklink(cat, cats, index, interval, blnamespace, info, title, backlinks, bindex);
    };
    
    var deleteCategory = function (cat, cats, index, interval, blnamespace, title) {
        var summary = "moved to [[:" + title + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        
        var page = WM.MW.callQuery({prop: 'info',
                                    intoken: 'delete',
                                    titles: encodeURIComponent(cat)});
        
        var deletetoken = page.deletetoken;
        
        var res = WM.MW.callAPIPost({action: 'delete',
                                     bot: '1',
                                     title: encodeURIComponent(cat),
                                     token: encodeURIComponent(deletetoken),
                                     reason: encodeURIComponent(summary)});
        
        if (!res['delete']) {
            WM.Log.logError(cat + " has not been deleted!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            continueIteration(cats, index, interval, blnamespace);
        }
    };
    
    var iterate = function (cats, index, interval, blnamespace) {
        if (cats[index]) {
            var cat = cats[index];
            
            WM.Log.logInfo("Processing category " + cat + "...");
            
            if (cat.substr(-10) == " (English)") {
                setTimeout(createCategory, interval, [cat, cats, index, interval, blnamespace]);
            }
            else {
                continueIteration(cats, index, interval, blnamespace);
            }
        }
        else {
            WM.Log.logInfo("_(English) suffix removed\nCheck the log and the history for problems\nUpdate the backlinks that have not been updated");
        }
    };
    
    var continueIteration = function (cats, index, interval, blnamespace) {
        index++;
        iterate(cats, index, interval, blnamespace);
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
        var root = args[0];
        var interval = 8000;
        var blnamespace = "0|1|4|5|6|7|10|11|12|13|14|15";
        WM.Log.logInfo("Removing _(English) suffix...");
        var tree = WM.Cat.getTree(root);
        var mcats = flattenTree(tree);
        var cats = removeDuplicates(mcats);
        iterate(cats, 0, interval, blnamespace);
    };
};
