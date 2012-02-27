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
    this.getTree = function (indent, base, cmcontinue, ancestors) {
        WM.Log.logInfo("Processing " + base + "...");
        
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
            var info = getCategoryInfo(base);
            var parents = getParentCategories(base);
            text = indent  + "[[:" + base + "|" + base.substr(9) + "]] ";
            text += "(" + ((info) ? info.pages : 0) + ") ";
            if (parents.length > 1) {
                outer_loop:
                for each (var par in parents) {
                    for (var anc in ancestors) {
                        if (par == anc) {
                            parents.splice(parents.indexOf(par), 1);
                            break outer_loop;
                        }
                    }
                }
                for (var i in parents) {
                    parents[i] = "[[:" + parents[i] + "|" + parents[i].substr(9) + "]]";
                }
                text += "(" + WM.Plugins.UpdateCategoryTree.i18n.current.alsoIn + " " + parents.join(", ") + ")";
            }
            text += "\n";
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
                text += subIndent  + "'''LOOP:''' [[:" + cat + "|" + cat.substr(9) + "]]\n";
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
};
