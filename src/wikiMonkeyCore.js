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

function _getQueryString() {
    var qa = location.search.substr(1).split('&');
    
    var qd = new Object();
    var s = new Array();
    for each (var p in qa) {
        s = p.split('=');
        qd[s[0]] = s[1];
    }
    
    return qd;
}

// Get query string parameters only once
var querystring = _getQueryString();

/*
 * WARNING!!!
 * ALWAYS PUSH TO THIS ARRAY: NEVER POP, SORT, REVERSE OR CHANGE THE INDEXES IN
 * ANY WAY
 * COROLLARY (KNOWN BUG): This causes a minor memory leak (elements cannot be
 * removed)
 */
var xmlhttp = new Array();

function sendGetAsyncRequest(url, cfunc) {
    var L = xmlhttp.push(new XMLHttpRequest());
    var id = L - 1;
    var xh = xmlhttp[id];
    xh.onreadystatechange = function() {
        if (xh.readyState == 4 && xh.status == 200) {
            cfunc();
        }
    };
    xh.open("GET", url, true);
    xh.send();
    return id;
}

function sendGetSyncRequest(url) {
    var L = xmlhttp.push(new XMLHttpRequest());
    var id = L - 1;
    var xh = xmlhttp[id];
    xh.open("GET", url, false);
    xh.send();
    return id;
}

function sendPostAsyncRequest(url, cfunc, string, header, headervalue) {
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
}

function sendPostSyncRequest(url, string, header, headervalue) {
    var L = xmlhttp.push(new XMLHttpRequest());
    var id = L - 1;
    var xh = xmlhttp[id];
    xh.open("POST", url, false);
    if (header && headervalue) {
        xh.setRequestHeader(header, headervalue);
    }
    xh.send(string);
    return id;
}

function callAPIGet(params) {
    var id = sendGetSyncRequest("api.php?format=xml&" + params.join('&'));
    var parser = new DOMParser();
    return parser.parseFromString(xmlhttp[id].responseText, "text/xml");
}

function callAPIPost(params) {
    var id = sendPostSyncRequest("api.php", "format=xml&" + params.join('&'), "Content-type", "application/x-www-form-urlencoded");
    var parser = new DOMParser();
    return parser.parseFromString(xmlhttp[id].responseText, "text/xml");
}

function getURIParameter(name) {
    return querystring[name];
}

function getTitle() {
    return querystring['title'];
}

function isSection() {
    return (querystring['section']) ? true : false;
}

function readSource() {
    return document.getElementById('wpTextbox1').innerHTML;
}

function writeSource(text) {
    document.getElementById('wpTextbox1').innerHTML = text;
}

function readSummary() {
    return document.getElementById('wpSummary').getAttribute("value");
}

function writeSummary(text) {
    document.getElementById('wpSummary').setAttribute("value", text);
}

function appendToSummary(text) {
    document.getElementById('wpSummary').setAttribute("value", readSummary() + text);
}

function getLongTextNode(element) {
    // Firefox and other browsers split long text into multiple text nodes
    var text = "";
    for each (var child in element.childNodes) {
        if (child.nodeType == 3) {
            text += child.nodeValue;
        }
    }
    return text;
}

function create_buttons(page, functions) {
    var container = document.createElement('div');
    
    var ball = document.createElement('input');
    ball.setAttribute('type', 'button');
    ball.setAttribute('value', 'Execute all');
    
    var par, brow, button;
    
    for each (var row in functions[page]) {
        par = document.createElement('p');
        
        brow = document.createElement('input');
        brow.setAttribute('type', 'button');
        brow.setAttribute('value', 'Execute row');
            
        brow.style.marginRight = '0.67em';
            
        par.style.margin = '0.67em 0';
        
        par.appendChild(brow);
        
        for each (var f in row) {
            button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('value', f[1]);
            
            button.addEventListener("click", f[0], false);
            brow.addEventListener("click", f[0], false);
            ball.addEventListener("click", f[0], false);
            
            par.appendChild(button);
            
            if (f[2]) {
                input = document.createElement('input');
                input.setAttribute('type', 'text');
                
                par.appendChild(input);
                
                input.style.marginRight = '0.33em';
            }
            else {
                button.style.marginRight = '0.33em';
            }
        }
        container.appendChild(par);
    }
    par = document.createElement('p');
            
    par.style.margin = '0.67em 0';
    
    par.appendChild(ball);
    container.appendChild(par);
    
    return container;
}

function main(functions) {
    
    if (document.getElementById('editform')) {
        var container = create_buttons(0, functions);
        document.getElementById('wpSummaryLabel'
            ).parentNode.parentNode.insertBefore(container,
            document.getElementById('wpSummaryLabel').parentNode.nextSibling);
    }
    else if (document.getElementById('mw-diff-otitle1')) {
        var container = create_buttons(1, functions);
        document.getElementById('bodyContent'
            ).getElementsByTagName('h2')[0].parentNode.insertBefore(container,
            document.getElementById('bodyContent').getElementsByTagName('h2')[0]);
    }
}
