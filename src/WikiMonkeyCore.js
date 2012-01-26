/*
 *  Wiki Monkey - Perform automatic actions when editing wiki pages.
 *  Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.com>
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
    
    /*
     * WARNING!!!
     * ALWAYS PUSH TO THIS ARRAY: NEVER POP, SORT, REVERSE OR CHANGE THE
     * INDEXES IN ANY WAY
     * COROLLARY (KNOWN BUG): This causes a minor memory leak (elements cannot
     * be removed)
     */
    var xmlhttp = new Array();
    
    var sendGetAsyncRequest = function (url, cfunc) {
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
    
    var sendGetSyncRequest = function (url) {
        var L = xmlhttp.push(new XMLHttpRequest());
        var id = L - 1;
        var xh = xmlhttp[id];
        xh.open("GET", url, false);
        xh.send();
        return id;
    };
    
    var sendPostAsyncRequest = function (url, cfunc, string, header, headervalue) {
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
    
    var sendPostSyncRequest = function (url, string, header, headervalue) {
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
    
    this.callAPIGet = function (params) {
        var id = sendGetSyncRequest("api.php?format=xml&" + params.join('&'));
        var parser = new DOMParser();
        return parser.parseFromString(xmlhttp[id].responseText, "text/xml");
    };
    
    this.callAPIPost = function (params) {
        var id = sendPostSyncRequest("api.php", "format=xml&" + params.join('&'), "Content-type", "application/x-www-form-urlencoded");
        var parser = new DOMParser();
        return parser.parseFromString(xmlhttp[id].responseText, "text/xml");
    };
    
    this.getURIParameter = function (name) {
        return queryString[name];
    };
    
    this.getTitle = function () {
        return queryString['title'];
    };
    
    this.isSection = function () {
        return (queryString['section']) ? true : false;
    };
    
    this.readSource = function () {
        return document.getElementById('wpTextbox1').innerHTML;
    };
    
    this.writeSource = function (text) {
        document.getElementById('wpTextbox1').innerHTML = text;
    };
    
    this.readSummary = function () {
        return document.getElementById('wpSummary').getAttribute("value");
    };
    
    this.writeSummary = function (text) {
        document.getElementById('wpSummary').setAttribute("value", text);
    };
    
    this.appendToSummary = function (text) {
        document.getElementById('wpSummary').setAttribute("value", readSummary() + text);
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

    var makeUI = function (functions) {
        var divContainer = document.createElement('div');
        
        var buttonAll = document.createElement('input');
        buttonAll.setAttribute('type', 'button');
        buttonAll.setAttribute('value', 'Execute all');
        
        var divRow, buttonRow, divFunction, buttonFunction, makeUI;
        
        for each (var row in functions) {
            buttonRow = document.createElement('input');
            buttonRow.setAttribute('type', 'button');
            buttonRow.setAttribute('value', 'Execute row');
            buttonRow.style.marginRight = '0.67em';
            
            divRow = document.createElement('div');
            divRow.style.margin = '0.67em 0';
            divRow.appendChild(buttonRow);
            
            for each (var f in row) {
                buttonFunction = document.createElement('input');
                buttonFunction.setAttribute('type', 'button');
                buttonFunction.setAttribute('value', f[1]);
                
                for each (var button in [buttonFunction, buttonRow, buttonAll]) {
                    button.addEventListener("click", (function (fn, arg) {
                        return function () {
                            // window[string] doesn't work
                            eval(fn + ".main")(arg);
                        }
                    })(f[0], f[2]), false);
                };
                
                divFunction = document.createElement('div');
                divFunction.style.display = 'inline-block';
                divFunction.style.marginRight = '0.33em';
                divFunction.appendChild(buttonFunction);
                
                makeUI = eval(f[0] + ".makeUI");
                if (makeUI instanceof Function) {
                    divFunction.appendChild(makeUI(f[2]));
                }
                
                divRow.appendChild(divFunction);
            }
            divContainer.appendChild(divRow);
        }
        divRow = document.createElement('div');
        divRow.style.margin = '0.67em 0';
        divRow.appendChild(buttonAll);
        divContainer.appendChild(divRow);
        
        return divContainer;
    };
    
    this.main = function (editFunctions, diffFunctions) {
        if (document.getElementById('editform')) {
            var container = makeUI(editFunctions);
            document.getElementById('wpSummaryLabel'
                ).parentNode.parentNode.insertBefore(container,
                document.getElementById('wpSummaryLabel').parentNode.nextSibling);
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            var container = makeUI(diffFunctions);
            document.getElementById('bodyContent'
                ).getElementsByTagName('h2')[0].parentNode.insertBefore(container,
                document.getElementById('bodyContent').getElementsByTagName('h2')[0]);
        }
    };
};
