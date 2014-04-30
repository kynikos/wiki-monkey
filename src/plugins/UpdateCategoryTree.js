/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2014 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.Plugins.UpdateCategoryTree = new function () {
    "use strict";

    this.makeUI = function (args) {
        var tocs = args[0];

        GM_addStyle("#UpdateCategoryTree-select {margin-left:0.33em;}");

        var select = document.createElement('select');
        var option;
        for (var key in tocs) {
            option = document.createElement('option');
            option.value = tocs[key].page;
            option.innerHTML = tocs[key].page;
            select.appendChild(option);
        }
        option = document.createElement('option');
        option.value = '*';
        option.innerHTML = 'UPDATE ALL';
        select.appendChild(option);
        select.id = "UpdateCategoryTree-select";

        return select;
    };

    var readToC = function (args) {
        WM.Log.logInfo('Updating ' + WM.Log.linkToWikiPage(args.params.page,
                                                args.params.page) + " ...");
        WM.MW.callQueryEdit(args.params.page,
                            WM.Plugins.UpdateCategoryTree.processToC,
                            args);
    };

    this.processToC = function (title, source, timestamp, edittoken, args) {
        args.source = source;
        args.timestamp = timestamp;
        args.edittoken = edittoken;

        var minInterval = (WM.MW.isUserBot()) ? 60000 : 21600000;

        var now = new Date();
        var msTimestamp = Date.parse(args.timestamp);
        if (now.getTime() - msTimestamp >= minInterval) {
            var start = args.source.indexOf(args.startMark);
            var end = args.source.lastIndexOf(args.endMark);

            if (start > -1 && end > -1) {
                args.startId = start + args.startMark.length;
                args.endId = end;
                args.treeText = "";
                args.altNames = (args.params.keepAltName) ?
                                    storeAlternativeNames(args.source) : {};
                WM.Cat.recurseTree({node: args.params.root,
                    callNode: WM.Plugins.UpdateCategoryTree.processCategory,
                    callEnd: WM.Plugins.UpdateCategoryTree.writeToC,
                    callArgs: args});
            }
            else {
                WM.Log.logError("Cannot find insertion marks in " +
                    WM.Log.linkToWikiPage(args.params.page, args.params.page));
                iterateTocs(args);
            }
        }
        else {
            WM.Log.logWarning(WM.Log.linkToWikiPage(args.params.page,
                        args.params.page) + ' has been updated too recently');
            iterateTocs(args);
        }
    };

    var storeAlternativeNames = function (source) {
        var dict = {};
        var regExp = /\[\[\:([Cc]ategory\:.+?)\|(.+?)\]\]/gm;
        while (true) {
            var match = regExp.exec(source);
            if (match) {
                dict[match[1]] = match[2];
            }
            else {
                break;
            }
        }
        return dict;
    };

    this.processCategory = function (params) {
        var args = params.callArgs;

        WM.Log.logInfo("Processing " + WM.Log.linkToWikiPage(params.node,
                                                        params.node) + " ...");

        var text = "";

        for (var i = 0; i < params.ancestors.length; i++) {
            text += args.params.indentType;
        }

        if (args.params.showIndices) {
            var indices = [];
            var node = params;
            while (node.parentIndex != null) {
                indices.push(node.siblingIndex + 1);
                node = params.nodesList[node.parentIndex];
            }
            if (indices.length) {
                text += "<small>" + indices.reverse().join(".") + ".</small> ";
            }
        }

        var altName = (args.altNames[params.node]) ?
                                            args.altNames[params.node] : null;
        text += createCatLink(params.node, args.params.replace, altName);

        text += (args.params.rightToLeft) ? "&lrm; " : " ";

        if (params.children == "loop") {
            text += "'''[LOOP]'''\n";
            WM.Log.logWarning("Loop in " + WM.Log.linkToWikiPage(params.node,
                                                                params.node));
            WM.Plugins.UpdateCategoryTree.processCategoryEnd(params, args,
                                                                        text);
        }
        else {
            WM.Cat.getParentsAndInfo(
                params.node,
                WM.Plugins.UpdateCategoryTree.processCategoryAddSuffix,
                [params, args, text, altName]
            );
        }
    };

    this.processCategoryAddSuffix = function (parents, info, args_) {
        var params = args_[0];
        var args = args_[1];
        var text = args_[2];
        var altName = args_[3];

        text += "<small>(" + ((info) ? info.pages : 0) + ")";

        if (parents.length > 1) {
            outer_loop:
            for (var p in parents) {
                var par = parents[p].title;
                for (var a in params.ancestors) {
                    var anc = params.ancestors[a];
                    if (par == anc) {
                        parents.splice(p, 1);
                        break outer_loop;
                    }
                }
            }
            var parentTitles = [];
            for (var i in parents) {
                altName = (args.altNames[parents[i].title]) ?
                                        args.altNames[parents[i].title] : null;
                parentTitles.push(createCatLink(parents[i].title,
                                                args.params.replace, altName));
            }
            text += " (" + args.params.alsoIn + " " +
                                                parentTitles.join(", ") + ")";
        }

        text += "</small>\n";

        WM.Plugins.UpdateCategoryTree.processCategoryEnd(params, args, text);
    };

    this.processCategoryEnd = function (params, args, text) {
        args.treeText += text;

        params.callArgs = args;

        WM.Cat.recurseTreeContinue(params);
    };

    var createCatLink = function (cat, replace, altName) {
        var catName;
        if (altName) {
            catName = altName;
        }
        else if (replace) {
            var regExp = new RegExp(replace[0], replace[1]);
            catName = cat.substr(9).replace(regExp, replace[2]);
        }
        else {
            catName = cat.substr(9);
        }
        return "[[:" + cat + "|" + catName + "]]";
    };

    this.writeToC = function (params) {
        var args = params.callArgs;

        args.treeText = "\n" + args.treeText;
        var newtext = Alib.Str.overwriteBetween(args.source, args.treeText,
                                                    args.startId, args.endId);

        if (newtext != args.source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: args.params.page,
                               summary: args.summary,
                               text: newtext,
                               basetimestamp: args.timestamp,
                               token: args.edittoken},
                              null,
                              WM.Plugins.UpdateCategoryTree.checkWrite,
                              args);
        }
        else {
            WM.Log.logInfo(WM.Log.linkToWikiPage(args.params.page,
                                args.params.page) + ' is already up to date');
            iterateTocs(args);
        }
    };

    this.checkWrite = function (res, args) {
        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo(WM.Log.linkToWikiPage(args.params.page,
                                    args.params.page) + ' correctly updated');
            iterateTocs(args);
        }
        else {
            WM.Log.logError(WM.Log.linkToWikiPage(args.params.page,
                    args.params.page) + ' has not been updated!\n' +
                    res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };

    var iterateTocs = function (args) {
        args.index++;
        args.params = args.tocs[args.index];
        if (args.tocs[args.index]) {
            readToC(args);
        }
        else {
            WM.Log.logInfo("Operations completed, check the log for " +
                                                        "warnings or errors");
            if (args.callNext) {
                args.callNext();
            }
        }
    };

    this.main = function (args, callNext) {
        var tocs = args[0];
        var summary = args[1];

        var select = document.getElementById("UpdateCategoryTree-select");
        var value = select.options[select.selectedIndex].value;

        iterateTocs({
            tocs: (value == '*') ? tocs : [tocs[select.selectedIndex]],
            index: -1,
            params: {},
            edittoken: "",
            timestamp: "",
            source: "",
            startId: 0,
            endId: 0,
            treeText: "",
            startMark: "START AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK-->",
            endMark: "<!--END AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK",
            altNames: {},
            summary: args[1],
            callNext: callNext,
        });
    };
};
