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
    
    // Can't use an IIFE here because this.callAPIGet wouldn't be accessible
    var userName = this.callAPIGet(["action=query", "meta=userinfo"]
                    ).getElementsByTagName('userinfo')[0].getAttribute('name');
    
    this.getUserName = function () {
        return userName;
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
    
    var appendToLog = function (text, color) {
        var tstamp = document.createElement('pre');
        tstamp.style.cssFloat = "left";
        tstamp.style.width = "5em";
        tstamp.style.margin = "0";
        tstamp.style.border = "none";
        tstamp.style.padding = "0";
        tstamp.style.fontSize = "0.9em";
        tstamp.style.color = '#eee';
        tstamp.style.backgroundColor = "transparent";
        var now = new Date();
        tstamp.innerHTML = now.toLocaleTimeString();
        
        var msg = document.createElement('pre');
        msg.style.margin = "0 0 0.5em 5em";
        msg.style.border = "none";
        msg.style.padding = "0";
        msg.style.color = (color) ? color : "#eee";
        msg.style.backgroundColor = "transparent";
        msg.innerHTML = text;
        
        var line = document.createElement('div');
        line.appendChild(tstamp);
        line.appendChild(msg);
        
        document.getElementById('WikiMonkeyLog').appendChild(line);
    };
    
    this.logDebug = function (text) {
        appendToLog(text, 'cyan');
    };
    
    this.logInfo = function (text) {
        appendToLog(text);
    };
    
    this.logWarning = function (text) {
        appendToLog(text, 'gold');
    };
    
    this.logError = function (text) {
        appendToLog(text, 'red');
    };

    var makeButtons = function (functions) {
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
    
    var makeLogArea = function () {
        log = document.createElement('div');
        log.id = 'WikiMonkeyLog';
        log.style.height = '10em';
        log.style.border = '2px solid #07b';
        log.style.padding = '0.5em';
        log.style.overflow = 'scroll';
        log.style.resize = 'vertical';
        log.style.backgroundColor = '#111';
        
        return log;
    };
    
    this.main = function (editFunctions, diffFunctions) {
        if (document.getElementById('editform')) {
            var baseNode = document.getElementById('wpSummaryLabel').parentNode.parentNode;
            var nextNode = document.getElementById('wpSummaryLabel').parentNode.nextSibling;
            
            var buttons = makeButtons(editFunctions);
            baseNode.insertBefore(buttons, nextNode);
            
            var log = makeLogArea(editFunctions);
            baseNode.insertBefore(log, nextNode);
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            var baseNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0].parentNode;
            var nextNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0];
            
            var buttons = makeButtons(diffFunctions);
            baseNode.insertBefore(buttons, nextNode);
            
            var log = makeLogArea(diffFunctions);
            baseNode.insertBefore(log, nextNode);
        }
    };
};
