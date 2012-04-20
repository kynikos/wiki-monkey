WM.Plugins.ArchWikiRemoveCategorySuffix = new function () {
    var createCategory = function (args) {
        var [cat, cats, index, interval] = args;
        var summary = "rm English suffix from [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        
        var oldpage = WM.MW.callQuery({prop: "revisions",
                                       rvprop: "content",
                                       titles: encodeURIComponent(cat)});
        
        var text = oldpage.revisions[0]["*"];
        
        var title = cat.slice(0, -10);
        
        // Bisogna modificare le categorie parenti *******************************
        
        var newpage = WM.MW.callQuery({prop: "info",
                                       intoken: "edit",
                                       titles: encodeURIComponent(title)});
        
        var edittoken = newpage.edittoken;
        /*
        var res = WM.MW.callAPIPost({action: "edit",
                                 bot: "1",
                                 title: encodeURIComponent(title),
                                 summary: encodeURIComponent(summary),
                                 text: encodeURIComponent(text),
                                 createonly: "1",
                                 token: encodeURIComponent(edittoken)});
        
        if (!res.edit || res.edit.result != 'Success') {
            WM.Log.logError(title + ' has not been created!');
        }
        */
        setTimeout(recategorizeMembers, interval, [cat, cats, index, summary, interval]);
    };
    
    var recategorizeMembers = function (args) {
        var [cat, cats, index, summary, interval] = args;
        
        // Remember the number of members of the old category ************************************************************************
        // Recategorize the members of the old category: \[\[ *[Cc]ategory\: *[Cc]ategory[ _]Title[ _]\(English\) *\]\]
        // Check the number of members in the new category corresponds with the previous one
        
        // var info = WM.Cat.getInfo(cat);
        
        updateBacklinks(cat, cats, index, summary, interval);
    };
    
    var updateBacklinks = function (cat, cats, index, summary, interval) {
        // Update all the backlinks of the old category (avoid dangerous namespaces): \[\[\:[Cc]ategory\: *[Cc]ategory[ _]Title[ _]\(English\) ************************************************************************
        
        deleteCategory(cat, cats, index, summary, interval);
    };
    
    var deleteCategory = function (cat, cats, index, summary, interval) {
        // Delete the old category ************************************************************************
        
        continueIteration(cats, index, interval);
    };
    
    var iterate = function (cats, index, interval) {
        var cat = cats[index];
        
        WM.Log.logInfo("Processing " + cat + "...");
        
        if (cat.substr(-10) == " (English)") {
            setTimeout(createCategory, interval, [cat, cats, index, interval]);
        }
        else {
            continueIteration(cats, index, interval);
        }
    };
    
    var continueIteration = function (cats, index, interval) {
        index++;
        if (cats[index]) {
            iterate(cats, index, interval);
        }
        else {
            WM.Log.logInfo('_(English) suffix removed, check the log and the hsitory for problems');
        }
    };
    
    var flattenTree = function (tree) {
        var siblings = [];
        for (var cat in tree) {
            siblings.push(cat);
            if (tree[cat] != "loop") {
                siblings = siblings.concat(flattenTree(tree[cat]));
            }
        }
        return siblings;
    };
    
    var removeDuplicates = function (mcats) {
        var cats = [];
        var dict = {};
        
        for (var cat in mcats) {
            if (!dict[cat]) {
                cats.push(cat);
                dict[cat] = true;
            }
        }
        
        return cats;
    };
    
    this.main = function (args) {
        var root = 'Category:About Arch';  // ************************************
        var interval = 2000;  // *************************************************
        WM.Log.logInfo('Removing _(English) suffix...');
        var tree = WM.Cat.getTree(root);
        var mcats = flattenTree(tree);
        var cats = removeDuplicates(mcats);
        iterate(cats, 0, interval);
    };
};
