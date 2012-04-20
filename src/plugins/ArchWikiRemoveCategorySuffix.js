WM.Plugins.ArchWikiRemoveCategorySuffix = new function () {
    var processCategory = function (args) {
        var [cat, cats, index] = args;
        var summary = "rm English suffix from [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
        createCategory(cat, cats, index);
    };
    
    var createCategory = function (cat, cats, index) {
        // Create the renamed category with the old content ************************************************************************
        /*var pageid = WM.MW.callQuery({prop: "info|revisions",
                                     rvprop: "content|timestamp",
                                     intoken: "edit",
                                     titles: encodeURIComponent(cat)});
        
        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];
        
        
        
        
        
        /*var res = WM.MW.callAPIPost({action: "edit",
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
        }*/
        
        recategorizeMembers(cat, cats, index);
    };
    
    var recategorizeMembers = function (cat, cats, index) {
        // Remember the number of members of the old category ************************************************************************
        // Recategorize the members of the old category: \[\[ *[Cc]ategory\: *[Cc]ategory[ _]Title[ _]\(English\) *\]\]
        // Check the number of members in the new category corresponds with the previous one
        
        // var info = WM.Cat.getInfo(cat);
        
        updateBacklinks(cat, cats, index);
    };
    
    var updateBacklinks = function (cat, cats, index) {
        // Update all the backlinks of the old category (avoid dangerous namespaces): \[\[\:[Cc]ategory\: *[Cc]ategory[ _]Title[ _]\(English\) ************************************************************************
        
        deleteCategory(cat, cats, index);
    };
    
    var deleteCategory = function (cat, cats, index) {
        // Delete the old category ************************************************************************
        
        continueIteration(cats, index);
    };
    
    var iterate = function (cats, index) {
        var interval = 2000;  // *************************************************
        var cat = cats[index];
        
        WM.Log.logInfo("Processing " + cat + "...");
        
        if (cat.substr(-9) == "(English)") {
            setTimeout(processCategory, interval, [cat, cats, index]);
        }
        else {
            continueIteration(cats, index);
        }
    };
    
    var continueIteration = function (cats, index) {
        index++;
        if (cats[index]) {
            iterate(cats, index);
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
    
    this.main = function (args) {
        var root = 'Category:About Arch';  // ************************************
        WM.Log.logInfo('Removing _(English) suffix...');
        var tree = WM.Cat.getTree(root);
        var cats = flattenTree(tree);
        iterate(cats, 0);
    };
};
