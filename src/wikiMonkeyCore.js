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

var xmlhttp;

function _sendAsyncRequest(url, cfunc) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            cfunc();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function _sendSyncRequest(url) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
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
    return document.getElementById('wpSummary').innerHTML;
}

function writeSummary(text) {
    document.getElementById('wpSummary').innerHTML = text;
}

function appendToSummary(text) {
    document.getElementById('wpSummary').innerHTML += text;
}

function getBacklinks() {
    _sendSyncRequest("api.php?action=query&list=backlinks&bltitle=" + getTitle() + "&format=xml");
    return xmlhttp.responseText;
}

function main(functions) {
    if (document.getElementById('editform')) {
        var bcorrect = document.createElement('input');
        bcorrect.setAttribute('type', 'button');
        bcorrect.setAttribute('value', 'Correct source');
        bcorrect.style.marginRight = '0.33em';
        for each (var f in functions) {
            bcorrect.addEventListener("click", f, false);
        }
        
        var buttons = document.getElementById('wpSave').parentNode;
        buttons.insertBefore(bcorrect, buttons.getElementsByTagName('span')[0]);
    }
}
