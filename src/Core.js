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

var WM = new function () {
    var queryString = (function () {
        var qa = location.search.substr(1).split('&');
        var qd = new Object();
        var s = new Array();
        for each (var p in qa) {
            s = p.split('=');
            qd[s[0]] = s[1];
        }
        return qd;
    })();
    
    this.getURIParameter = function (name) {
        return queryString[name];
    };
    
    this.getLongTextNode = function (element) {
        // Firefox and other browsers split long text into multiple text nodes
        var text = "";
        for each (var child in element.childNodes) {
            if (child.nodeType == 3) {
                text += child.nodeValue;
            }
        }
        return text;
    };
    
    this.Plugins = {};
    
    this.main = function () {
        var baseNode, nextNode, UI;
        
        if (document.getElementById('editform')) {
            baseNode = document.getElementById('wpSummaryLabel').parentNode.parentNode;
            nextNode = document.getElementById('wpSummaryLabel').parentNode.nextSibling;
            UI = this.UI.getEditor();
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            baseNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0].parentNode;
            nextNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0];
            UI = this.UI.getDiff();
        }
        
        baseNode.insertBefore(this.UI.makeButtons(UI), nextNode);
        baseNode.insertBefore(this.Log.makeLogArea(), nextNode);
    };
};
