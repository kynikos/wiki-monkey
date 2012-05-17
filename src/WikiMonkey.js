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

var WM = new function () {
    var queryString = (function () {
        var qa = location.search.substr(1).split('&');
        var qd = new Object();
        var s = new Array();
        for (var p in qa) {
            s = qa[p].split('=');
            qd[s[0]] = s[1];
        }
        return qd;
    })();
    
    this.getURIParameter = function (name) {
        return queryString[name];
    };
    
    this.getLongTextNode = function (element) {
        // DEPRECATED, no longer used anywhere: delete?
        
        // Firefox and other browsers split long text into multiple text nodes
        var text = "";
        var nodes = element.childNodes;
        var child;
        for (var c = 0; c < nodes.length; c++) {
            child = nodes[c];
            if (child.nodeType == 3) {
                text += child.nodeValue;
            }
        }
        return text;
    };
    
    this.recurseTreeAsync = function (params) {
        /*
         * params = {
         *     node: ,
         *     parentIndex: ,
         *     siblingIndex: ,
         *     ancestors: ,
         *     children: ,
         *     callChildren: ,
         *     callNode: ,
         *     callEnd: ,
         *     stage: ,
         *     nodesList:
         * }
         * 
         * nodesList: [
         *     {
         *         node: ,
         *         parentIndex: ,
         *         siblingIndex: ,
         *         ancestors: [...],
         *         children: [...]
         *     },
         *     {...}
         * ]
         * 
         * Example:
         * 
         * recurseTreeAsync({
         *     node: ,
         *     callChildren: ,
         *     callNode: ,
         *     callEnd: ,
         * });
         * 
         * callChildren(params) {
         *     params.children = ;
         *     recurseTreeAsync(params);
         * }
         * 
         * callNode(params) {
         *     recurseTreeAsync(params);
         * }
         * 
         * callEnd(params) {}
         */
        // TESTARE I LOOP E LE CATEGORIE AUTO-CATEGORIZZATE!!! *******************
        switch (params.stage) {
            case 0:
                params.stage = 1;
                // Prevent infinite loops
                if (params.ancestors.indexOf(params.node) == -1) {
                    params.callChildren(params);
                    break;
                }
                else {
                    params.children = "loop";
                    // Do not break here!!!
                }
            case 1:
                params.nodesList.push({
                    node: params.node,
                    parentIndex: params.parentIndex,
                    siblingIndex: params.siblingIndex,
                    ancestors: params.ancestors,
                    children: params.children
                });
                params.stage = 2;
                params.callNode(params);
                break;
            case 2:
                if (params.children && params.children != "loop") {
                    // Go to the first child
                    params.ancestors.push(params.node);
                    params.node = params.children[0];
                    params.parentIndex = params.nodesList.length - 1;
                    params.siblingIndex = 0;
                    params.children = [];
                    params.stage = 0;
                    this.recurseTreeAsync(params);
                }
                else if (params.parentIndex != null) {
                    // Go to the next sibling
                    var parent = params.nodesList[params.parentIndex];
                    params.siblingIndex++;
                    params.node = parent.children[params.siblingIndex];
                    if (!params.node) {
                        // There are no more siblings
                        params.siblingIndex = parent.siblingIndex + 1;
                        params.node = params.nodesList[params.siblingIndex];
                        params.parentIndex = parent.parentIndex;
                        params.ancestors = parent.ancestors;
                    }
                    params.children = [];
                    params.stage = 0;
                    this.recurseTreeAsync(params);
                }
                else {
                    // End of recursion
                    callEnd(params);
                }
                break;
            default:
                params.nodesList = [{
                    node: params.node,
                    parentIndex: null,
                    siblingIndex: 0,
                    ancestors: [],
                    children: []
                }];
                params.stage = 0;
                this.recurseTreeAsync(params);
        }
    };
    
    this.Plugins = {};
    
    this.main = function () {
        this.UI.makeUI();
    };
};
