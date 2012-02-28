/*
 *  Wiki Monkey - Perform automatic actions when editing wiki pages.
 *  Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.com>
 * 
 *  This file is part of Wiki Monkey.
 * 
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 * 
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 * 
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.Cat = new function () {
    this.getTree = function (base) {
        var tree = {};
        tree[base] = walk(base, {});
        // return {base: walk(base, {})}; doesn't work
        return tree;
    };
    
    var walk = function (base, ancestors) {
        WM.Log.logInfo("Walking " + base + "...");
        
        var subCats = WM.Cat.getSubCategories(base);
        
        var tree = {};
        // Add base here in order to protect better from self-parenting categories
        ancestors[base] = true;
        var cat, subAncestors;
        
        for each (var subCat in subCats) {
            cat = subCat.title;
            
            // Protect from category loops
            if (ancestors[cat]) {
                tree[cat] = "loop";
            }
            else {
                // Create a copy of the object, not just a new reference
                subAncestors = JSON.parse(JSON.stringify(ancestors));
                tree[cat] = walk(cat, subAncestors);
            }
        }
        
        return tree;
    };
    
    this.getSubCategories = function (parent) {
        return getMembers(parent, "subcat", null);
    };
    
    var getMembers = function (name, cmtype, cmcontinue) {
        var query = {action: "query",
                     list: "categorymembers",
                     cmtitle: encodeURIComponent(name),
                     cmtype: cmtype,
                     cmlimit: 5000};
        
        if (cmcontinue) {
            query.cmcontinue = cmcontinue;
        }
        
        var res = WM.MW.callAPIGet(query);
        var members = res.query.categorymembers;
        
        if (res["query-continue"]) {
            cmcontinue = res["query-continue"].categorymembers.cmcontinue;
            var cont = this.getSubCategories(name, cmcontinue);
            for (var sub in cont) {
                members[sub] = cont[sub];
            }
        }
        
        return members;
    };
    
    this.getParents = function (child) {
        // Supports a maximum of 500 parents (5000 for bots)
        // Needs to implement query continue in order to support more
        var res = WM.MW.callAPIGet({action: "query",
                                    prop: "categories",
                                    titles: encodeURIComponent(child),
                                    cllimit: 5000});
        
        var pages = res.query.pages;
        
        var pageid;
        for each (pageid in pages) {
            break;
        }
        
        var parents = [];
        
        for each (var cat in pageid.categories) {
            parents.push(cat.title);
        }
        
        return parents;
    };
    
    this.getInfo = function (name) {
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
};
