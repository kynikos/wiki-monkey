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
    this.recurseTree = function (params) {
        params.callChildren = WM.Cat.recurseTreeCallChildren;
        WM.recurseTreeAsync(params);
    };
    
    this.recurseTreeContinue = function (params) {
        WM.recurseTreeAsync(params);
    };
    
    this.recurseTreeCallChildren = function (params) {
        WM.Cat.getSubCategories(params.node, WM.Cat.recurseTreeCallChildrenContinue, params);
    };
    
    this.recurseTreeCallChildrenContinue = function (subCats, params) {
        for (var s in subCats) {
            params.children.push(subCats[s].title);
        }
        WM.recurseTreeAsync(params);
    };
    
    this.getSubCategories = function (parent, call, callArgs) {
        WM.Cat.getMembers(parent, "subcat", call, callArgs);
    };
    
    this.getAllMembers = function (parent, call, callArgs) {
        WM.Cat.getMembers(parent, null, call, callArgs);
    };
    
    this.getMembers = function (name, cmtype, call, callArgs) {
        var query = {action: "query",
                     list: "categorymembers",
                     cmtitle: name,
                     cmlimit: 5000};
        
        if (cmtype) {
            query.cmtype = cmtype;
        }
        
        this.getMembersContinue(query, call, callArgs, []);
    };
    
    this.getMembersContinue = function (query, call, callArgs, members) {
        WM.MW.callAPIGet(query, function (res) {
            members = members.concat(res.query.categorymembers);
            if (res["query-continue"]) {
                query.cmcontinue = res["query-continue"].categorymembers.cmcontinue;
                this.getMembersContinue(query, call, callArgs, members);
            }
            else {
                call(members, callArgs);
            }
        });
    };
    
    this.getParents = function (child) {
        // Supports a maximum of 500 parents (5000 for bots)
        // Needs to implement query continue in order to support more
        var pageid = WM.MW.callQuerySync({prop: "categories",
                                     titles: child,
                                     cllimit: 5000});
        
        var parents = [];
        
        if (pageid.categories) {
            for (var cat in pageid.categories) {
                parents.push(pageid.categories[cat].title);
            }
        }
        
        return parents;
    };
    
    this.getInfo = function (name) {
        var pageid = WM.MW.callQuerySync({prop: "categoryinfo",
                                     titles: name});
        return pageid.categoryinfo;
    };
};
