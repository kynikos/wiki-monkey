WM.Plugins.UpdateCategoryTree = new function () {
    var recurse = function (tree, indent, baseIndex, showIndex, ancestors) {
        for (var cat in tree) {
            WM.Log.logInfo("Processing " + cat + "...");
            
            if (cat.substr(-9) == "(English)") {
                var summary = "rm English suffix from [[:" + cat + "]], see [[Talk:Table of Contents#English Category Names: Capitalization and Conflict with i18n]]";
                
                var res = WM.MW.callAPIGet({action: "query",
                                            prop: "info|revisions",
                                            rvprop: "content|timestamp",
                                            intoken: "edit",
                                            titles: encodeURIComponent(cat)});
                var pages = res.query.pages;
                
                var pageid;
                for each (pageid in pages) {
                    break;
                }
                
                var edittoken = pageid.edittoken;
                var timestamp = pageid.revisions[0].timestamp;
                var source = pageid.revisions[0]["*"];
                
                
                
                var info = WM.Cat.getInfo(cat);
                
                
                /*
                 * Create the renamed category with the old content
                 * Remember the number of members of the old category
                 * Recategorize the members of the old category: \[\[ *[Cc]ategory\: *[Cc]ategory[ _]Title[ _]\(English\) *\]\]
                 * Check the number of members in the new category corresponds with the previous one
                 * Update all the backlinks of the old category (avoid dangerous namespaces): \[\[\:[Cc]ategory\: *[Cc]ategory[ _]Title[ _]\(English\)
                 * Delete the old category 
                 */
                
                
                
                
                
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
            
            if (tree[cat] != "loop") {
                recurse(tree[cat]);
            }
        }
    };
    
    this.main = function (args) {
        WM.Log.logInfo('Removing _(English) suffix...');
        
        var tree = WM.Cat.getTree('Category:English');
        
        recurse(tree, "", "", false, {});
        
        WM.Log.logInfo('_(English) suffix removed, check the log and the hsitory for problems');
    };
};
