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
        Alib.Async.recurseTreeAsync(params);
    };
    
    this.recurseTreeContinue = function (params) {
        Alib.Async.recurseTreeAsync(params);
    };
    
    this.recurseTreeCallChildren = function (params) {
        WM.Cat.getSubCategories(params.node, WM.Cat.recurseTreeCallChildrenContinue, params);
    };
    
    this.recurseTreeCallChildrenContinue = function (subCats, params) {
        for (var s in subCats) {
            params.children.push(subCats[s].title);
        }
        Alib.Async.recurseTreeAsync(params);
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
        
        this._getMembersContinue(query, call, callArgs, []);
    };
    
    this._getMembersContinue = function (query, call, callArgs, members) {
        WM.MW.callAPIGet(query, function (res) {
            members = members.concat(res.query.categorymembers);
            if (res["query-continue"]) {
                query.cmcontinue = res["query-continue"].categorymembers.cmcontinue;
                this._getMembersContinue(query, call, callArgs, members);
            }
            else {
                call(members, callArgs);
            }
        });
    };
    
    this.getParents = function (name, call, callArgs) {
        var query = {action: "query",
                     prop: "categories",
                     titles: name,
                     cllimit: 5000};
        
        this._getParentsContinue(query, call, callArgs, []);
    };
    
    this._getParentsContinue = function (query, call, callArgs, parents) {
        WM.MW.callAPIGet(query, function (res) {
            var pages = res.query.pages;
            
            for (var id in pages) {
                break;
            }
            
            var page = pages[id];
            
            if (page.categories) {
                parents = parents.concat(page.categories);
            }
            
            if (res["query-continue"]) {
                query.clcontinue = res["query-continue"].categories.clcontinue;
                this._getParentsContinue(query, call, callArgs, parents);
            }
            else {
                var parentTitles = [];
                
                for (var par in parents) {
                    parentTitles.push(parents[par].title);
                }
                
                call(parentTitles, callArgs);
            }
        });
    };
    
    this.getInfo = function (name, call, callArgs) {
        WM.MW.callQuery({prop: "categoryinfo",
                         titles: name},
                         WM.Cat._getInfoContinue,
                         [call, callArgs]);
    };
    
    this._getInfoContinue = function (page, args) {
        args[0](page.categoryinfo, args[1]);
    };
};
