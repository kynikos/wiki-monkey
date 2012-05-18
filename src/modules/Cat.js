/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2012 Dario Giovannetti <dev@dariogiovannetti.net>
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
    this.recurseTree = function (base, callCat, callEnd) {
        WM.recurseTreeAsync({
            node: base,
            callChildren: function (params) {
                var subCats = WM.Cat.getSubCategories(params.node);
                for (var s in subCats) {
                    params.children.push(subCats[s].title);
                }
            },
            callNode: callCat,
            callEnd: callEnd,
        });
    };
    
    this.recurseTreeContinue = function (args) {
        WM.recurseTreeAsync(args[0]);
    };
    
    this.getSubCategories = function (parent) {
        return getMembersSync(parent, "subcat", null);
    };
    
    this.getAllMembers = function (parent) {
        return getMembersSync(parent, null, null);
    };
    
    this.getMembers = function (name, cmtype, callEnd) {
        var query = {action: "query",
                     list: "categorymembers",
                     cmtitle: encodeURIComponent(name),
                     cmlimit: 5000};
        
        if (cmtype) {
            query.cmtype = cmtype;
        }
        
        this.getMembersContinue(query, callEnd, []);
    };
    
    this.getMembersContinue = function (query, callEnd, members) {
        WM.MW.callAPIGet(query, function (res) {
            members = members.concat(res.query.categorymembers);
            if (res["query-continue"]) {
                query.cmcontinue = res["query-continue"].categorymembers.cmcontinue;
                this.getMembersContinue(query, callEnd, members);
            }
            else {
                callEnd(members);
            }
        });
    };
    
    var getMembersSync = function (name, cmtype, cmcontinue) {
        var query = {action: "query",
                     list: "categorymembers",
                     cmtitle: encodeURIComponent(name),
                     cmlimit: 5000};
        
        if (cmtype) {
            query.cmtype = cmtype;
        }
        
        if (cmcontinue) {
            query.cmcontinue = cmcontinue;
        }
        
        var res = WM.MW.callAPIGetSync(query);
        var members = res.query.categorymembers;
        
        if (res["query-continue"]) {
            cmcontinue = res["query-continue"].categorymembers.cmcontinue;
            var cont = this.getMembersSync(name, cmtype, cmcontinue);
            for (var sub in cont) {
                members[sub] = cont[sub];
            }
        }
        
        return members;
    };
    
    this.getParents = function (child) {
        // Supports a maximum of 500 parents (5000 for bots)
        // Needs to implement query continue in order to support more
        var pageid = WM.MW.callQuerySync({prop: "categories",
                                     titles: encodeURIComponent(child),
                                     cllimit: 5000});
        
        var parents = [];
        
        for (var cat in pageid.categories) {
            parents.push(pageid.categories[cat].title);
        }
        
        return parents;
    };
    
    this.getInfo = function (name) {
        var pageid = WM.MW.callQuerySync({prop: "categoryinfo",
                                     titles: encodeURIComponent(name)});
        return pageid.categoryinfo;
    };
};
