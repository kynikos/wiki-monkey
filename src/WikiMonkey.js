/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2012 Dario Giovannetti <dev@dariogiovannetti.com>
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
    
    this.getBaseURL = function () {
        return (location.protocol + "//" + location.hostname + "/");
    };
    
    this.getLongTextNode = function (element) {
        // DEPRECATED, no longer used anywhere: delete?
        
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
        this.UI.makeUI();
    };
};
