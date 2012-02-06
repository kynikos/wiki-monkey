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

WM.HTTP = new function () {
    /*
     * WARNING!!!
     * ALWAYS PUSH TO THIS ARRAY: NEVER POP, SORT, REVERSE OR CHANGE THE
     * INDEXES IN ANY WAY
     * COROLLARY (KNOWN BUG): This causes a minor memory leak (elements cannot
     * be removed)
     */
    var xmlhttp = new Array();
    
    this.sendGetAsyncRequest = function (url, cfunc) {
        var L = xmlhttp.push(new XMLHttpRequest());
        var id = L - 1;
        var xh = xmlhttp[id];
        xh.onreadystatechange = function () {
            if (xh.readyState == 4 && xh.status == 200) {
                cfunc();
            }
        };
        xh.open("GET", url, true);
        xh.send();
        return id;
    };
    
    this.sendGetSyncRequest = function (url) {
        var L = xmlhttp.push(new XMLHttpRequest());
        var id = L - 1;
        var xh = xmlhttp[id];
        xh.open("GET", url, false);
        xh.send();
        return id;
    };
    
    this.sendPostAsyncRequest = function (url, cfunc, string, header, headervalue) {
        var L = xmlhttp.push(new XMLHttpRequest());
        var id = L - 1;
        var xh = xmlhttp[id];
        xh.onreadystatechange = function() {
            if (xh.readyState == 4 && xh.status == 200) {
                cfunc();
            }
        };
        xh.open("POST", url, true);
        if (header && headervalue) {
            xh.setRequestHeader(header, headervalue);
        }
        xh.send(string);
        return id;
    };
    
    this.sendPostSyncRequest = function (url, string, header, headervalue) {
        var L = xmlhttp.push(new XMLHttpRequest());
        var id = L - 1;
        var xh = xmlhttp[id];
        xh.open("POST", url, false);
        if (header && headervalue) {
            xh.setRequestHeader(header, headervalue);
        }
        xh.send(string);
        return id;
    };
    
    this.getResponseText = function (id) {
        return xmlhttp[id].responseText;
    }
};
