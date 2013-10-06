/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2013 Dario Giovannetti <dev@dariogiovannetti.net>
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
        params.callChildren = WM.Cat._recurseTreeCallChildren;
        Alib.Async.recurseTreeAsync(params);
    };

    this.recurseTreeContinue = function (params) {
        Alib.Async.recurseTreeAsync(params);
    };

    this._recurseTreeCallChildren = function (params) {
        WM.Cat.getSubCategories(params.node, WM.Cat._recurseTreeCallChildrenContinue, params);
    };

    this._recurseTreeCallChildrenContinue = function (subCats, params) {
        for (var s in subCats) {
            params.children.push(subCats[s].title);
        }
        Alib.Async.recurseTreeAsync(params);
    };

    this.getSubCategories = function (parent, call, callArgs) {
        WM.Cat._getMembers(parent, "subcat", call, callArgs);
    };

    this.getAllMembers = function (parent, call, callArgs) {
        WM.Cat._getMembers(parent, null, call, callArgs);
    };

    this._getMembers = function (name, cmtype, call, callArgs) {
        var query = {action: "query",
                     list: "categorymembers",
                     cmtitle: name,
                     cmlimit: 500};

        if (cmtype) {
            query.cmtype = cmtype;
        }

        this._getMembersContinue(query, call, callArgs, []);
    };

    this._getMembersContinue = function (query, call, callArgs, members) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            members = members.concat(res.query.categorymembers);
            if (res["query-continue"]) {
                query.cmcontinue = res["query-continue"].categorymembers.cmcontinue;
                this._getMembersContinue(query, call, args, members);
            }
            else {
                call(members, args);
            }
        },
        callArgs);
    };

    this.getParentsAndInfo = function (name, call, callArgs) {
        var query = {action: "query",
                     prop: "categories|categoryinfo",
                     titles: name,
                     cllimit: 500};

        this._getParentsAndInfoContinue(query, call, callArgs, [], null);
    };

    this._getParentsAndInfoContinue = function (query, call, callArgs, parents, info) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            var page = Alib.Obj.getFirstItem(res.query.pages);

            if (page.categories) {
                parents = parents.concat(page.categories);
            }

            if (page.categoryinfo) {
                info = page.categoryinfo;
            }

            if (res["query-continue"]) {
                // Request categoryinfo only once
                query.prop = "categories";
                query.clcontinue = res["query-continue"].categories.clcontinue;
                this._getParentsAndInfoContinue(query, call, args, parents, info);
            }
            else {
                call(parents, info, args);
            }
        },
        callArgs);
    };
};
