// ==UserScript==
// @id wiki-monkey-editor-opera
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.15.1-editor-opera
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/opera/WikiMonkey-editor-opera.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/opera/WikiMonkey-editor-opera.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/1.15.1/src/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/1.15.1/src/files/wiki-monkey-64.png
// @include http://*.wikipedia.org/*
// @include https://wiki.archlinux.org/*
// ==/UserScript==

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

if (!GM_setValue || !GM_getValue || !GM_listValues || !GM_deleteValue) {
    var setWikiMonkeyGmApiEmulationCookie = function (value) {
        var name = "WikiMonkeyGmApiValuesEmulation";
        
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (3110400000));  // 36 days
        var expires = ";expires=" + expireDate.toUTCString();
        
        var path = ";path=/";
        
        document.cookie = name + "=" + escape(value) + expires + path;
    };
    
    var getWikiMonkeyGmApiEmulationCookie = function () {
        if (document.cookie.length > 0) {
            var cookieArray = document.cookie.split(';');
            var regExp = /^ *WikiMonkeyGmApiValuesEmulation\=(.+)$/;
            for (var i in cookieArray) {
                var match = regExp.exec(cookieArray[i]);
                if (match) {
                    return unescape(match[1]);
                }
            }
        }
        return null;
    };

    var GM_setValue = function (name, value) {
        var valueString = getWikiMonkeyGmApiEmulationCookie();
        var valueDict = (valueString) ? JSON.parse(valueString) : {};
        valueDict[name] = value;
        setWikiMonkeyGmApiEmulationCookie(JSON.stringify(valueDict));
        return value;
    };

    var GM_getValue = function (name, defaultValue) {
        var valueString = getWikiMonkeyGmApiEmulationCookie();
        var valueDict = (valueString) ? JSON.parse(valueString) : undefined;
        return (valueDict) ? valueDict[name] : defaultValue;
    };

    var GM_listValues = function () {
        var valueString = getWikiMonkeyGmApiEmulationCookie();
        if (valueString) {
            var valueDict = JSON.parse(valueString);
            var keys = [];
            for (var key in valueDict) {
                keys.push(key);
            }
            return keys;
        }
        else {
            return undefined;
        }
    };

    var GM_deleteValue = function (name) {
        var valueString = getWikiMonkeyGmApiEmulationCookie();
        var valueDict = (valueString) ? JSON.parse(valueString) : {};
        delete valueDict[name];
        setWikiMonkeyGmApiEmulationCookie(JSON.stringify(valueDict));
        return undefined;
    };
}

if (!GM_addStyle) {
    var GM_addStyle = function (css) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = css;
        head.appendChild(style);
    };
}

if (!GM_xmlhttpRequest) {
    var GM_xmlhttpRequest = function (params) {
        /* This function emulates GM_xmlhttpRequest only partially
         * Notably cross-origin requests are not supported
         *
         * params = {
         *     method: ,
         *     url: ,
         *     data: ,
         *     headers: ,
         *     user: ,
         *     password: ,
         *     onload: ,
         *     onerror: ,
         *     onreadystatechange: ,
         * 
         *     // Not yet implemented
         *     //binary: ,
         *     //mozBackgroundRequest: ,
         *     //overrideMimeType: ,
         *     //ignoreCache: ,
         *     //ignoreRedirect: ,
         *     //ignoreTempRedirect: ,
         *     //ignorePermanentRedirect: ,
         *     //failOnRedirect: ,
         *     //redirectionLimit: ,
         * }
         */
        if (!params.method) params.method = "GET";
        if (!params.data) params.data = null;
        if (!params.headers) params.headers = {};
        if (!params.user) params.user = null;
        if (!params.password) params.password = null;
        if (!params.onload) params.onload = function (req) {};
        if (!params.onerror) params.onerror = function (req) {};
        if (!params.onreadystatechange) params.onreadystatechange = function (req) {};
        params.async = true;
        
        var req = new XMLHttpRequest();
        
        req.open(params.method, params.url, params.async, params.user, params.password);
        
        for (var header in params.headers) {
            req.setRequestHeader(header, params.headers[header]);
        }
        
        req.onreadystatechange = function () {
            var response = {
                responseText: req.responseText,
                readyState: req.readyState,
                responseHeaders: req.getAllResponseHeaders(),
                status: req.status,
                statusText: req.statusText,
                // Not yet implemented
                //finalUrl: ,
            };
            
            try {
                response.responseJSON = JSON.parse(req.responseText);
            }
            catch (err) {
                response.responseJSON = undefined;
            }
            
            params.onreadystatechange(response);
            
            if (req.readyState == 4) {
                if (req.status == 200) {
                    params.onload(response);
                }
                else {
                    params.onerror(response);
                }
            }
        };
        
        req.send(params.data);
        
        return {
            abort: function () {
                req.abort();
            },
        }
    };
}

if (!Alib) var Alib = {};

Alib.Async = new function () {
    this.executeAsync = function (functions, id) {
        id++;
        if (functions[id]) {
            var fid = functions[id];
            var callContinue = function () {
                Alib.Async.executeAsync(functions, id);
            };
            fid[0](fid[1], callContinue);
        }
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
         *     callArgs: ,
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
         *     callArgs:
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
        if (params.stage === undefined) {
            params.parentIndex = null;
            params.siblingIndex = 0;
            params.ancestors = [];
            params.children = [];
            params.nodesList = [];
            params.stage = 1;
            this.recurseTreeAsync(params);
        }
        else {
            switch (params.stage) {
                case 1:
                    params.stage = 2;
                    // Prevent infinite loops
                    if (params.ancestors.indexOf(params.node) == -1) {
                        params.callChildren(params);
                        break;
                    }
                    else {
                        params.children = "loop";
                        // Do not break here!!!
                    }
                case 2:
                    params.nodesList.push({
                        node: params.node,
                        parentIndex: params.parentIndex,
                        siblingIndex: params.siblingIndex,
                        ancestors: params.ancestors.slice(0),
                        children: params.children.slice(0),
                    });
                    params.stage = 3;
                    params.callNode(params);
                    break;
                case 3:
                    if (params.children.length && params.children != "loop") {
                        // Go to the first child
                        params.ancestors.push(params.node);
                        params.node = params.children[0];
                        params.parentIndex = params.nodesList.length - 1;
                        params.siblingIndex = 0;
                        params.children = [];
                        params.stage = 1;
                        this.recurseTreeAsync(params);
                    }
                    else if (params.parentIndex != null) {
                        // Go to the next sibling
                        var parent = params.nodesList[params.parentIndex];
                        params.siblingIndex++;
                        params.node = parent.children[params.siblingIndex];
                        params.children = [];
                        if (params.node) {
                            params.stage = 1;
                        }
                        else {
                            // There are no more siblings
                            params.node = parent.node;
                            params.parentIndex = parent.parentIndex;
                            params.siblingIndex = parent.siblingIndex;
                            params.ancestors = parent.ancestors.slice(0);
                            params.stage = 3;
                        }
                        this.recurseTreeAsync(params);
                    }
                    else {
                        // End of recursion
                        params.callEnd(params);
                    }
                    break;
            }
        }
    };
};

if (!Alib) var Alib = {};

Alib.Compatibility = new function () {
    this.normalizeCarriageReturns = function (source) {
        // Opera and IE use \r\n instead of \n
        return source.replace(/\r\n/g, '\n');
    };
};

if (!Alib) var Alib = {};

Alib.DOM = new function () {
    this.getPreviousElementSibling = function (node) {
        while (node.previousSibling.nodeType != 1) {
            var node = node.previousSibling;
        }
        return node.previousSibling;
    }

    this.getNextElementSibling = function (node) {
        while (node.nextSibling.nodeType != 1) {
            var node = node.nextSibling;
        }
        return node.nextSibling;
    }

    this.getFirstElementChild = function (node) {
        return (node.firstChild.nodeType == 1) ? node.firstChild : this.getNextElementSibling(node.firstChild);
    }

    this.getLastElementChild = function (node) {
        return (node.lastChild.nodeType == 1) ? node.lastChild : this.getPreviousElementSibling(node.lastChild);
    }

    this.getChildElements = function (node) {
        var list = element.childNodes;
        var children = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].nodeType == 1) {
                children.push(list[i]);
            }
        }
        return children;
    }

    this.getChildrenByTagName = function (element, tag) {
        var list = element.childNodes;
        var children = [];
        for (var i = 0; i < list.length; i++) {
            var localName = list[i].localName;
            if (localName && localName.toLowerCase() == tag.toLowerCase()) {
                children.push(list[i]);
            }
        }
        return children;
    }

    this.isDescendantOf = function (descendant, ancestor, identity) {
        var response = false;
        if (identity && descendant.isSameNode(ancestor)) {
            response = true;
        }
        else {
            while (descendant != document.body) {
                if (descendant.parentNode.isSameNode(ancestor)) {
                    response = true;
                    break;
                }
                descendant = descendant.parentNode;
            }
        }
        return response;
    }

    this.getSiblingPositionByTagName = function (element) {
        var i = 0;
        var siblings = this.getChildrenByTagName(element.parentNode, element.localName);
        while (!siblings[i].isSameNode(element)) {
            i++;
        }
        return (i < siblings.length) ? i : -1;
    }

    this.getLongTextNode = function (element) {
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
};

if (!Alib) var Alib = {};

Alib.HTTP = new function () {
    this.getUrlLocation = function (url) {
        link = document.createElement('a');
        link.href = url;
        return link;
    };

    this.getURIParameters = function (uri) {
        if (uri) {
            var qstring = this.getUrlLocation(uri).search;
        }
        else {
            var qstring = location.search;
        }

        var qarray = qstring.substr(1).split('&');
        var qdict = new Object();
        var s = new Array();

        for (var par in qarray) {
            s = qarray[par].split('=');
            qdict[s[0]] = s[1];
        }

        return qdict;
    };

    this.getURIParameter = function (uri, name) {
        return this.getURIParameters(uri)[name];
    };

    this.sendGetAsyncRequest = function (url, call) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                call(req);
            }
        };
        req.open("GET", url, true);
        req.send();
    };

    this.sendGetSyncRequest = function (url) {
        var req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send();
        return req;
    };

    this.sendPostAsyncRequest = function (url, call, query, header, headervalue) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                call(req);
            }
        };
        req.open("POST", url, true);
        if (header && headervalue) {
            req.setRequestHeader(header, headervalue);
        }
        req.send(query);
    };

    this.sendPostSyncRequest = function (url, query, header, headervalue) {
        var req = new XMLHttpRequest();
        req.open("POST", url, false);
        if (header && headervalue) {
            req.setRequestHeader(header, headervalue);
        }
        req.send(query);
        return req;
    };
};

if (!Alib) var Alib = {};

Alib.Obj = new function () {
    this.getKeys = function (object) {
        var keys = [];
        for (var i in object) {
            keys.push(i);
        }
        return keys;
    };
    
    this.getValues = function (object) {
        var values = [];
        for (var i in object) {
            values.push(object[i]);
        }
        return values;
    };
    
    this.getFirstItem = function (object) {
        for (var i in object) {
            return object[i];
        }
    };
};

if (!Alib) var Alib = {};

Alib.RegEx = new function () {
    this.escapePattern = function (string) {
        /*
         * Escaping any other characters is not necessary, references:
         * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
         * - http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
         * - http://stackoverflow.com/questions/2593637/how-to-escape-regular-expression-in-javascript
         * - http://stackoverflow.com/questions/494035/how-do-you-pass-a-variable-to-a-regular-expression-javascript
         * - http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
         * - http://stackoverflow.com/questions/399078/what-special-characters-must-be-escaped-in-regular-expressions
         *
         * Note for Wiki Monkey: do *not* escape '\s' here so that it will be
         * safe to use prepareRegexpWhitespace in WM.Parser
         */
        return string.replace(/[-[\]{}()^$*+?.|\\]/g, "\\$&");
    };

    this.matchAll = function (source, regExp) {
        var result = [];
        while (true) {
            var match = regExp.exec(source);
            if (match) {
                var L = match[0].length;
                result.push({"match": match,
                             "index": regExp.lastIndex - L,
                             "length": L});
            }
            else {
                break;
            }
        }
        return result;
    };

    this.matchAllConditional = function (source, regExp, test) {
        var result = [];
        while (true) {
            var match = regExp.exec(source);
            if (match && test(match)) {
                var L = match[0].length;
                result.push({"match": match,
                             "index": regExp.lastIndex - L,
                             "length": L});
            }
            else {
                break;
            }
        }
        return result;
    };
};

if (!Alib) var Alib = {};

Alib.Str = new function () {
    this.insert = function (string, newString, id) {
        if (!id) id = 0;
        return string.substring(0, id) + newString + string.substr(id);
    };

    this.overwriteFor = function (string, newString, id, length) {
        if (!id) id = 0;
        if (!length || length < 0) length = 0;
        return string.substring(0, id) + newString + string.substr(id +
                                                                    length);
    };

    this.overwriteAt = function (string, newString, id) {
        return this.overwriteFor(string, newString, id, newString.length);
    };

    this.overwriteBetween = function (string, newString, id1, id2) {
        if (!id1) id1 = 0;
        if (!id2) id2 = id1;
        if (id1 > id2) {
            var tempid = id2;
            id2 = id1;
            id1 = tempid;
        }
        return string.substring(0, id1) + newString + string.substr(id2);
    };

    this.removeFor = function (string, id, length) {
        return this.overwriteFor(string, "", id, length);
    };

    this.removeBetween = function (string, id1, id2) {
        return this.overwriteBetween(string, "", id1, id2);
    };

    this.padLeft = function (string, filler, length) {
        while (string.length < length) {
            string = filler + string;
        }
        return string;
    };

    this.padRight = function (string, filler, length) {
        while (string.length < length) {
            string += filler;
        }
        return string;
    };

    this.findSimpleEnclosures = function (string, openTag, openLength,
                                                    closeTag, closeLength) {
        // openTag and closeTag can be strings or regular expressions
        // If the string is "<<>>" and the tags are "<" and ">", the result is
        //   [[0, 2], ]
        // Results are guaranteed to be in order of appearance in the original
        //   text
        var results = [];
        var searchIndex = 0;
        var oIndexRel = string.search(openTag);

        while (true) {
            if (oIndexRel > -1) {
                var oIndex = searchIndex + oIndexRel;
                var cIndexRel = string.substr(oIndex + openLength).search(
                                                                    closeTag);

                if (cIndexRel > -1) {
                    var cIndex = oIndex + openLength + cIndexRel;
                    results.push([oIndex, cIndex]);
                    searchIndex = cIndex + closeLength;

                    if (searchIndex < string.length) {
                        oIndexRel = string.substr(searchIndex).search(openTag);
                        continue;
                    }
                    else {
                        break;
                    }
                }
                else {
                    // A tag is left open (no closing tag is found)
                    // Let each implementation decide what to do in this case
                    //   (either consider the tag working until the end of text
                    //   or not)
                    results.push([oIndex, false]);
                    break;
                }
            }
            else {
                break;
            }
        }

        return results;
    };

    this.findNestedEnclosures = function (string, openTag, closeTag,
                                                                    maskChar) {
        // openTag and closeTag must be strings, *not* regular expressions,
        //   unlike this.findSimpleEnclosures
        // maskChar must be a *1*-character string and must *not* be part of
        //   neither openTag nor closeTag
        // If the string is "<<>>" and the tags are "<" and ">", the result is
        //   [[1, 2], [0, 3]]
        var openLength = openTag.length;
        var closeLength = closeTag.length;
        var results = [];
        var searchIndex = 0;
        var cIndexRel = string.indexOf(closeTag);
        var maskedString = string;

        while (true) {
            if (cIndexRel > -1) {
                var cIndex = searchIndex + cIndexRel;
                var oIndexRel = maskedString.substring(searchIndex, cIndex
                                                        ).lastIndexOf(openTag);

                if (oIndexRel > -1) {
                    var oIndex = searchIndex + oIndexRel;
                    results.push([oIndex, cIndex]);

                    var maskedString1 = maskedString.substring(0, oIndex);
                    var maskLength = cIndex - oIndex + closeLength;
                    var maskedString2 = this.padRight("", maskChar,
                                                                maskLength);
                    var maskedString3 = maskedString.substring(cIndex +
                                                                closeLength);
                    maskedString = maskedString1 + maskedString2 +
                                                                maskedString3;

                    // Do *not* increment searchIndex in this case, in fact in
                    //   we don't know yet whether there are more openTags
                    //   before the one found
                }
                else {
                    searchIndex = cIndex + closeLength;
                }

                cIndexRel = maskedString.substring(searchIndex).indexOf(
                                                                    closeTag);
                continue;
            }
            else {
                break;
            }
        }

        return [results, maskedString];
    };

    this.findInnermostEnclosures = function (string, openTag, closeTag) {
        // openTag and closeTag must be strings, *not* regular expressions,
        //   unlike this.findSimpleEnclosures
        // If the string is "<<>>" and the tags are "<" and ">", the result is
        //   [[1, 2], ]
        var openLength = openTag.length;
        var closeLength = closeTag.length;
        var results = [];
        var searchIndex = 0;

        while (true) {
            var cIndexRel = string.substring(searchIndex).indexOf(closeTag);

            if (cIndexRel > -1) {
                var cIndex = searchIndex + cIndexRel;
                var oIndexRel = string.substring(searchIndex, cIndex
                                                        ).lastIndexOf(openTag);

                if (oIndexRel > -1) {
                    var oIndex = searchIndex + oIndexRel;
                    results.push([oIndex, cIndex]);
                }

                searchIndex = cIndex + closeLength;
                continue;
            }
            else {
                break;
            }
        }

        return results;
    };
};

var WM = new function () {
    "use strict";

    this.Plugins = {};

    this.main = function () {
        this.MW._storeUserInfo(function () {
            WM.UI._makeUI();

            if (typeof GM_info !== 'undefined') {
                // GreaseMonkey/TamperMonkey
                WM.Log.logHidden('Wiki Monkey version: ' +
                                                    GM_info.script.version);
            }
            else if (typeof GM_getMetadata !== 'undefined') {
                // Scriptish
                WM.Log.logHidden('Wiki Monkey version: ' +
                                                    GM_getMetadata('version'));
            }

            var date = new Date();
            WM.Log.logHidden('Date: ' + date.toString());
            WM.Log.logHidden('URL: ' + location.href);
        });
    };
};

WM.Bot = new function () {
    "use strict";

    this._makeUI = function (functions, lists) {
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyBot';

        GM_addStyle("#WikiMonkeyBot-PluginSelect {width:100%; " +
                                                    "margin-bottom:1em;} " +
                    "#WikiMonkeyBot-ListSelect {margin-bottom:1em;} " +
                    "#WikiMonkeyBotFilter {height:6em; margin-bottom:1em; " +
                                                        "resize:vertical;} " +
                    "#WikiMonkeyBotStart, #WikiMonkeyBotStop " +
                                "{margin-right:0.33em; margin-bottom:1em; " +
                                "font-weight:bold;} " +
                    "a.WikiMonkeyBotSelected {background-color:#faa; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotProcessing {background-color:#ff8; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotChanged {background-color:#afa; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotUnchanged {background-color:#aaf; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotBypassed {background-color:orangered; " +
                                                    "padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotFailed {background-color:red; " +
                                                    "padding:0.2em 0.4em;}");

        divContainer.appendChild(makeFunctionUI(functions));
        divContainer.appendChild(makeConfUI(lists));

        return divContainer;
    };

    var makeFunctionUI = function (functions) {
        var fieldset = document.createElement('fieldset');

        var legend = document.createElement('legend');
        legend.innerHTML = 'Plugin';

        var selectFunctions = document.createElement('select');
        selectFunctions.id = 'WikiMonkeyBot-PluginSelect';

        var option;

        for (var f in functions) {
            option = document.createElement('option');
            option.innerHTML = functions[f][1];
            selectFunctions.appendChild(option);
        }

        selectFunctions.addEventListener("change", (function (fns) {
            return function () {
                var select = document.getElementById(
                                                'WikiMonkeyBot-PluginSelect');
                var id = select.selectedIndex;
                var UI = document.getElementById('WikiMonkeyBotFunction');
                // [1] Note that this must also be executed immediately,
                //   see [2]
                var makeUI = WM.Plugins[fns[id][0]].makeBotUI;
                if (makeUI instanceof Function) {
                    UI.replaceChild(makeUI(fns[id][2]), UI.firstChild);
                }
                else {
                    // Don't removeChild, otherwise if another plugin with
                    // interface is selected, replaceChild won't work
                    UI.replaceChild(document.createElement('div'),
                                                                UI.firstChild);
                }
                WM.Bot.selections.plugin = fns[id][0];
                WM.Bot.selections.function_ = function (title, callContinue,
                                                                chainArgs) {
                    WM.Plugins[fns[id][0]].mainAuto(fns[id][2],
                                            title, callContinue, chainArgs);
                };
            }
        })(functions), false);

        var divFunction = document.createElement('div');
        divFunction.id = "WikiMonkeyBotFunction";

        // [2] Note that this is also executed onchange, see [1]
        var makeUI = WM.Plugins[functions[0][0]].makeBotUI;
        if (makeUI instanceof Function) {
            divFunction.appendChild(makeUI(functions[0][2]));
        }
        else {
            divFunction.appendChild(document.createElement('div'));
        }
        // Don't use "this.selections"
        WM.Bot.selections.plugin = functions[0][0];
        WM.Bot.selections.function_ = function (title, callContinue,
                                                                chainArgs) {
            WM.Plugins[functions[0][0]].mainAuto(
                            functions[0][2], title, callContinue, chainArgs);
        };

        fieldset.appendChild(legend);
        fieldset.appendChild(selectFunctions);
        fieldset.appendChild(divFunction);

        return fieldset;
    };

    this.selections = {plugin: null,
                       function_: function () {},
                       filters: [],
                       list: {current: null,
                              previous: null},
                       visited: []};

    var makeListSelector = function (lists) {
        var selectLists = document.createElement('select');
        selectLists.id = 'WikiMonkeyBot-ListSelect';

        var option;

        for (var l in lists) {
            if (lists[l][0]) {
                option = document.createElement('option');
                option.innerHTML = lists[l][2];
                selectLists.appendChild(option);

                if (!WM.Bot.selections.list.current) {
                    // [1] Note that this is also executed onchange, see [2]
                    // Don't use "this.selections"
                    WM.Bot.selections.list.current = lists[l];
                }
            }
        }

        selectLists.addEventListener("change", (function (lss) {
            return function () {
                var select = document.getElementById(
                                                'WikiMonkeyBot-ListSelect');
                var id = select.selectedIndex;
                WM.Bot.selections.list.previous =
                                                WM.Bot.selections.list.current;
                // [2] Note that this must also be executed immediately,
                //   see [1]
                WM.Bot.selections.list.current = lss[id];
            }
        })(lists), false);

        return selectLists;
    };

    var makeConfUI = function (lists) {
        var bot = document.createElement('div');

        var fieldset = document.createElement('fieldset');

        var legend = document.createElement('legend');
        legend.innerHTML = 'Filter';

        var listSelect = makeListSelector(lists);

        var filter = document.createElement('textarea');
        filter.id = 'WikiMonkeyBotFilter';

        var preview = document.createElement('input');
        preview.id = 'WikiMonkeyBotPreview';
        preview.type = 'button';
        preview.value = 'Preview';

        var duplicates = document.createElement('input');
        duplicates.type = 'checkbox';
        duplicates.id = 'WikiMonkeyBotDuplicates';

        var inverse = document.createElement('input');
        inverse.type = 'checkbox';
        inverse.id = 'WikiMonkeyBotInverse';

        var elems = [filter, duplicates, inverse];

        for (var e in elems) {
            elems[e].addEventListener("change", function () {
                WM.Bot._disableStartBot(
                                'Filters have changed, preview the selection');
            }, false);
        }

        var duplicatestag = document.createElement('span');
        duplicatestag.innerHTML = 'Duplicates';

        var inversetag = document.createElement('span');
        inversetag.innerHTML = 'Inverse';

        preview.addEventListener("click", WM.Bot._previewFilter, false);

        fieldset.appendChild(legend);
        if (listSelect.length > 1) {
            fieldset.appendChild(listSelect);
        }
        fieldset.appendChild(filter);
        fieldset.appendChild(preview);
        fieldset.appendChild(duplicates);
        fieldset.appendChild(duplicatestag);
        fieldset.appendChild(inverse);
        fieldset.appendChild(inversetag);

        var start = document.createElement('input');
        start.type = 'button';
        start.value = 'Start bot';
        start.id = 'WikiMonkeyBotStart';

        start.addEventListener("click", WM.Bot._startAutomatic, false);

        start.disabled = true;

        var startMsg = document.createElement('span');
        startMsg.innerHTML = 'Set and preview the filter first';
        startMsg.id = 'WikiMonkeyBotStartMsg';

        var forceStart = document.createElement('span');
        forceStart.id = 'WikiMonkeyBotForceStart';

        var forceStartCB = document.createElement('input');
        forceStartCB.type = 'checkbox';
        forceStartCB.disabled = true;

        var forceStartLabel = document.createElement('span');
        forceStartLabel.innerHTML = 'Force start, stopping any other ' +
                                                    'currently running bots';

        forceStart.style.display = "none";
        forceStart.appendChild(forceStartCB);
        forceStart.appendChild(forceStartLabel);

        bot.appendChild(fieldset);
        bot.appendChild(start);
        bot.appendChild(startMsg);
        bot.appendChild(forceStart);

        return bot;
    };

    this._enableStartBot = function () {
        document.getElementById('WikiMonkeyBotStartMsg').innerHTML = '';
        document.getElementById('WikiMonkeyBotStart').disabled = false;
    };

    this._disableStartBot = function (message) {
        document.getElementById('WikiMonkeyBotStartMsg').innerHTML = message;
        document.getElementById('WikiMonkeyBotStart').disabled = true;
    };

    this._enableStopBot = function (stopId) {
        var stop = document.createElement('input');
        stop.type = 'button';
        stop.value = 'Stop bot';
        stop.id = 'WikiMonkeyBotStop';

        stop.addEventListener("click", (function (id) {
            return function () {
                clearTimeout(id);
                // run _disableStopBot() here, not in _endAutomatic()
                WM.Bot._disableStopBot();
                WM.Bot._endAutomatic(true);
                WM.Log.logInfo('Bot stopped manually');
            }
        })(stopId), false);

        var start = document.getElementById('WikiMonkeyBotStart');
        start.parentNode.insertBefore(stop, start);
        start.style.display = 'none';
    };

    this._disableStopBot = function () {
        var stop = document.getElementById('WikiMonkeyBotStop');
        stop.parentNode.removeChild(stop);
        document.getElementById('WikiMonkeyBotStart').style.display = 'inline';
    };

    this._disableControls = function () {
        this._setEnableControls(true);
    };

    this._reEnableControls = function () {
        this._setEnableControls(false);
    };

    this._setEnableControls = function (flag) {
        var fsets = document.getElementById('WikiMonkeyBot'
                                            ).getElementsByTagName('fieldset');
        for (var f = 0; f < fsets.length; f++) {
            // HTML5-compliant
            fsets[f].disabled = flag;
        }
    };

    this._enableForceStart = function () {
        var force = document.getElementById('WikiMonkeyBotForceStart');
        force.getElementsByTagName('input')[0].disabled = false;
        force.style.display = 'inline';
    };

    this._disableForceStart = function () {
        var force = document.getElementById('WikiMonkeyBotForceStart');
        force.getElementsByTagName('input')[0].checked = false;
        force.getElementsByTagName('input')[0].disabled = true;
        force.style.display = 'none';
    };

    this._canForceStart = function () {
        return document.getElementById('WikiMonkeyBotForceStart'
                                    ).getElementsByTagName('input')[0].checked;
    };

    var makeFilters = function () {
        WM.Bot.selections.filters = [];
        var filters = document.getElementById('WikiMonkeyBotFilter'
                                                        ).value.split('\n');

        for (var f in filters) {
            var filter = filters[f];

            // filter could be an empty string
            if (filter) {
                var firstSlash = filter.indexOf('/');
                var lastSlash = filter.lastIndexOf('/');
                var pattern = filter.substring(firstSlash + 1, lastSlash);
                var modifiers = filter.substring(lastSlash + 1);
                var negative = filter.charAt(0) == '!';
                var regexp;

                try {
                    regexp = new RegExp(pattern, modifiers);
                }
                catch (exc) {
                    WM.Log.logError('Invalid regexp: ' + exc);
                    return false;
                }

                WM.Bot.selections.filters.push([regexp, negative]);
                // Do not return nor break, so that if among the filters
                //   there's an invalid regexp the function returns false
            }
        }

        return true;
    };

    var canProcessPage = function (link) {
        // Exclude red links (they can be found in some special pages)
        if (link.className.split(" ").indexOf("new") < 0) {
            // Don't use link.title because for example in Category pages all
            //   subpages would include "Category:", thus always matching
            //   filters like "/a/", "/t/" etc.
            var title = link.innerHTML;
            var duplicates = document.getElementById('WikiMonkeyBotDuplicates'
                                                                    ).checked;

            if (duplicates || WM.Bot.selections.visited.indexOf(title) < 0) {
                WM.Bot.selections.visited.push(title);
                var filters = WM.Bot.selections.filters;
                var inverse = document.getElementById('WikiMonkeyBotInverse'
                                                                    ).checked;

                if (filters.length > 0) {
                    for (var f in filters) {
                        var regexp = filters[f][0];
                        var negative = filters[f][1];
                        var test = regexp.test(title);

                        if (test != negative) {
                            return (inverse) ? false : true;
                        }
                    }

                    // No (test != negative) condition has been met in the loop
                    return (inverse) ? true : false;
                }
                else {
                    return (inverse) ? false : true;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };

    var changeWikiMonkeyLinkClassName = function (className, newClass) {
        var classes = className.split(" ");
        var newClasses = [];

        for (var c = 0; c < classes.length; c++) {
            if (classes[c].indexOf("WikiMonkey") < 0) {
                newClasses.push(classes[c]);
            }
        }

        // Don't push in an else block inside the loop, so that if there was
        // no WikiMonkey class set, it will be added
        newClasses.push(newClass);

        return newClasses.join(" ");
    };

    var restoreOriginalLinkClassName = function (className) {
        var classes = className.split(" ");
        var origClasses = [];

        for (var c = 0; c < classes.length; c++) {
            if (classes[c].indexOf("WikiMonkey") < 0) {
                origClasses.push(classes[c]);
            }
        }

        return origClasses.join(" ");
    };

    this._previewFilter = function () {
        WM.Log.logInfo('Updating filter preview, please wait ...');
        WM.Bot._disableStartBot('Updating filter preview ...');

        var items, linkId, link;

        if (WM.Bot.selections.list.previous) {
            if (WM.Bot.selections.list.current[0].nodeName == 'TBODY') {
                items = WM.Bot.selections.list.previous[0
                                                ].getElementsByTagName('td');
            }
            else {
                items = WM.Bot.selections.list.previous[0
                                                ].getElementsByTagName('li');
            }
            linkId = WM.Bot.selections.list.previous[1];

            for (var i = 0; i < items.length; i++) {
                link = items[i].getElementsByTagName('a')[linkId];

                // The list item could refer to an invalid title, represented
                // by e.g. <span class="mw-invalidtitle">Invalid title with
                // namespace "Category" and text ""</span>
                if (link) {
                    link.className = restoreOriginalLinkClassName(
                                                            link.className);
                }
            }
        }

        WM.Bot.selections.visited = [];

        linkId = WM.Bot.selections.list.current[1];
        var enable = false;
        var N = 0;

        if (makeFilters()) {
            if (WM.Bot.selections.list.current[0].nodeName == 'TBODY') {
                items = WM.Bot.selections.list.current[0].getElementsByTagName(
                                                                        'td');
            }
            else {
                items = WM.Bot.selections.list.current[0].getElementsByTagName(
                                                                        'li');
            }

            for (var i = 0; i < items.length; i++) {
                link = items[i].getElementsByTagName('a')[linkId];

                // Also test 'link' itself, because the list item could refer
                // to an invalid title, represented by e.g.
                // <span class="mw-invalidtitle">Invalid title with namespace
                // "Category" and text ""</span>
                if (link) {
                    if (canProcessPage(link)) {
                        link.className = changeWikiMonkeyLinkClassName(
                                    link.className, 'WikiMonkeyBotSelected');
                        enable = true;
                        N++;
                    }
                    else {
                        link.className = restoreOriginalLinkClassName(
                                                            link.className);
                    }
                }
            }
        }

        WM.Log.logInfo('Preview updated (' + N + ' pages selected)');

        if (enable) {
            WM.Bot._enableStartBot();
        }
        else {
            WM.Bot._disableStartBot(
                            'No pages selected, reset and preview the filter');
        }
    };

    // GM_setValue can only store strings, bool and 32-bit integers (no 64-bit)
    this.botToken = "0";

    this._setBotToken = function () {
        var date = new Date();
        var token = date.getTime() + "";
        this.botToken = token;
        GM_setValue('BotToken', token);
    };

    this._resetBotToken = function (reset) {
        this.botToken = "0";
        if (reset) {
            GM_setValue('BotToken', "0");
        }
    };

    this._getBotToken = function () {
        return this.botToken;
    };

    this._checkOtherBotsRunning = function () {
        var GMValue = GM_getValue('BotToken', "0");
        return (GMValue != "0") && (GMValue != this._getBotToken());
    };

    this._startAutomatic = function () {
        if (WM.Bot._checkOtherBotsRunning() && !WM.Bot._canForceStart()) {
            WM.Log.logError('It\'s not possible to start the bot (without ' +
                        'forcing it) for one of the following reasons:<br>' +
                        '* another bot instance is currently running<br>' +
                        '* a previously running bot has stopped due to a ' +
                                                'page processing error<br>' +
                        '* a previously running bot has stopped due to a ' +
                                                    'Javascript error<br>' +
                        '* a previously running bot has been interrupted by ' +
                                                    'a browser page refresh');
            WM.Bot._enableForceStart();
        }
        else if (makeFilters()) {
            if (WM.Bot.selections.list.current[0].nodeName == 'TBODY') {
                var itemsDOM = WM.Bot.selections.list.current[0
                                                ].getElementsByTagName('td');
            }
            else {
                var itemsDOM = WM.Bot.selections.list.current[0
                                                ].getElementsByTagName('li');
            }

            // Passing the live collection with the callback function was
            //   causing it to be lost in an apparently random manner
            var items = [];

            for (var i = 0; i < itemsDOM.length; i++) {
                items.push(itemsDOM[i]);
            }

            var linkId = WM.Bot.selections.list.current[1];

            WM.Bot._disableForceStart();
            WM.Bot._setBotToken();
            WM.Log.logInfo('Starting bot ...');
            WM.Log.logHidden("Plugin: " + WM.Bot.selections.plugin);
            WM.Log.logHidden("Filter: " + document.getElementById(
                                                'WikiMonkeyBotFilter').value);
            WM.Bot._disableStartBot('Bot is running ...');
            WM.Bot._disableControls();
            WM.Bot.selections.visited = [];
            WM.Bot._processItem(0, items, 0, linkId, null);
        }
    };

    var makeCallContinue = function (lis, id, linkId, ln, article) {
        return function (status, resArgs) {
            switch (status) {
                // The article hasn't been saved
                case 0:
                    ln.className = changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotUnchanged');
                    WM.Log.logInfo(WM.Log.linkToWikiPage(article, article) +
                                                    " processed (unchanged)");
                    id++;
                    WM.Bot._processItem(status, lis, id, linkId, resArgs);
                    break;
                // The article has been saved
                case 1:
                    ln.className = changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotChanged');
                    WM.Log.logInfo(WM.Log.linkToWikiPage(article, article) +
                                                    " processed (changed)");
                    id++;
                    WM.Bot._processItem(status, lis, id, linkId, resArgs);
                    break;
                // The plugin has encountered a protectedpage error
                case 'protectedpage':
                    ln.className = changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotBypassed');
                    WM.Log.logWarning("This user doesn't have the rights to " +
                                    "edit " + WM.Log.linkToWikiPage(article,
                                    article) + ", bypassing it ...");
                    id++;
                    // Change status to 0 (page not changed)
                    WM.Bot._processItem(0, lis, id, linkId, resArgs);
                    break;
                // The plugin has encountered a critical error
                default:
                    ln.className = changeWikiMonkeyLinkClassName(ln.className,
                                                        'WikiMonkeyBotFailed');
                    WM.Log.logError("Error processing " +
                                    WM.Log.linkToWikiPage(article, article) +
                                    ", stopping the bot");
                    WM.Bot._endAutomatic(true);
            }
        };
    };

    this._processItem = function (status, items, index, linkId, chainArgs) {
        if (items[index]) {
            var link = items[index].getElementsByTagName('a')[linkId];

            // Also test 'link' itself, because the list item could refer to an
            // invalid title, represented by e.g.
            // <span class="mw-invalidtitle">Invalid title with namespace
            // "Category" and text ""</span>
            if (link && canProcessPage(link)) {
                var title = link.title;
                var interval;

                if (status === 0) {
                    interval = 1000;
                }
                else if (WM.MW.isUserBot()) {
                    interval = 3000;
                }
                else {
                    interval = 30000;
                }

                WM.Log.logInfo('Waiting ' + (interval / 1000) +
                                                            ' seconds ...');

                var stopId = setTimeout((function (lis, id, ln, article,
                                                                chainArgs) {
                    return function () {
                        // Stop must be disabled before any check is performed
                        WM.Bot._disableStopBot();

                        // Check here if other bots have been started,
                        // _not_ before setTimeout!
                        if (!WM.Bot._checkOtherBotsRunning()) {
                            ln.className = changeWikiMonkeyLinkClassName(
                                    ln.className, 'WikiMonkeyBotProcessing');
                            WM.Log.logInfo("Processing " +
                                    WM.Log.linkToWikiPage(article, article) +
                                    " ...");

                            WM.Bot.selections.function_(article,
                                makeCallContinue(lis, id, linkId, ln, article),
                                chainArgs);
                        }
                        else {
                            WM.Log.logError('Another bot has been ' +
                                                'force-started, stopping ...');
                            WM.Bot._endAutomatic(false);
                        }
                    };
                })(items, index, link, title, chainArgs), interval);

                this._enableStopBot(stopId);
            }
            else {
                index++;
                WM.Bot._processItem(status, items, index, linkId, chainArgs);
            }
        }
        else {
            this._endAutomatic(true);
        }
    };

    this._endAutomatic = function (reset) {
        this._resetBotToken(reset);
        WM.Log.logInfo('Bot operations completed (check the log for ' +
                                                        'warnings or errors)');
        this._disableStartBot('Bot operations completed, reset and preview ' +
                                                                'the filter');
        this._reEnableControls();
    };
};

WM.Cat = new function () {
    "use strict";

    this.recurseTree = function (params) {
        params.callChildren = WM.Cat._recurseTreeCallChildren;
        Alib.Async.recurseTreeAsync(params);
    };

    this.recurseTreeContinue = function (params) {
        Alib.Async.recurseTreeAsync(params);
    };

    this._recurseTreeCallChildren = function (params) {
        WM.Cat.getSubCategories(params.node,
                            WM.Cat._recurseTreeCallChildrenContinue, params);
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
                query.cmcontinue = res["query-continue"
                                                ].categorymembers.cmcontinue;
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

    this._getParentsAndInfoContinue = function (query, call, callArgs, parents,
                                                                        info) {
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
                this._getParentsAndInfoContinue(query, call, args, parents,
                                                                        info);
            }
            else {
                call(parents, info, args);
            }
        },
        callArgs);
    };
};

WM.Diff = new function () {
    "use strict";

    this.getEndTimestamp = function (call, callArgs) {
        var title = decodeURIComponent(Alib.HTTP.getURIParameter(null,
                                                                    'title'));
        var diff = Alib.HTTP.getURIParameter(null, 'diff');
        var oldid = Alib.HTTP.getURIParameter(null, 'oldid');

        var giveEndTimestamp = function (page, id) {
            call(page.revisions[id].timestamp, callArgs);
        };

        switch (diff) {
            case 'next':
                WM.MW.callQuery({prop: "revisions",
                                 titles: title,
                                 rvlimit: "2",
                                 rvprop: "timestamp",
                                 rvdir: "newer",
                                 rvstartid: oldid},
                                 giveEndTimestamp,
                                 1);
                break;
            case 'prev':
                WM.MW.callQuery({prop: "revisions",
                                 revids: oldid,
                                 rvprop: "timestamp"},
                                 giveEndTimestamp,
                                 0);
                break;
            default:
                WM.MW.callQuery({prop: "revisions",
                                 revids: diff,
                                 rvprop: "timestamp"},
                                 giveEndTimestamp,
                                 0);
        }
    };
};

WM.Editor = new function () {
    "use strict";

    this.getTitle = function () {
        return WM.Parser.squashContiguousWhitespace(decodeURIComponent(
                                    Alib.HTTP.getURIParameter(null, 'title')));
    };

    this.isSection = function () {
        return (Alib.HTTP.getURIParameter(null, 'section')) ? true : false;
    };

    this.readSource = function () {
        var value = document.getElementById('wpTextbox1').value;
        // For compatibility with Opera and IE
        return Alib.Compatibility.normalizeCarriageReturns(value);
    };

    this.writeSource = function (text) {
        document.getElementById('wpTextbox1').value = text;
    };

    this.readSummary = function () {
        return document.getElementById('wpSummary').getAttribute("value");
    };

    this.writeSummary = function (text) {
        document.getElementById('wpSummary').setAttribute("value", text);
    };

    this.appendToSummary = function (text) {
        document.getElementById('wpSummary').setAttribute("value",
                                                    this.readSummary() + text);
    };
};

WM.Filters = new function () {
    "use strict";

    this._makeUI = function (filters) {
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyFilters';

        GM_addStyle("#WikiMonkeyFilters-Select, #WikiMonkeyFilters-Apply " +
                        "{float:left;} " +
                    "#WikiMonkeyFilters-Select {width:100%; " +
                        "margin-right:-16em;} " +
                    "#WikiMonkeyFilters-Select > p {margin:0 17em 0 0;} " +
                    "#WikiMonkeyFilters-Select > p > select {width:100%;} " +
                    "#WikiMonkeyFilters-Apply > input[type='button'] " +
                        "{margin-right:1em;} " +
                    "#WikiMonkeyFilters-Apply > input[type='checkbox'] " +
                        "{margin-right:0.4em;} " +
                    "#WikiMonkeyFilters-Options {clear:both;}");

        var selectFilterDiv = document.createElement('div');
        selectFilterDiv.id = 'WikiMonkeyFilters-Select';

        var selectFilterP = document.createElement('p');

        var selectFilter = document.createElement('select');

        var option;

        for (var f in filters) {
            option = document.createElement('option');
            option.innerHTML = filters[f][1];
            selectFilter.appendChild(option);
        }

        selectFilter.addEventListener("change", (function (filters) {
            return function () {
                var id = document.getElementById('WikiMonkeyFilters-Select'
                            ).getElementsByTagName('select')[0].selectedIndex;
                var UI = document.getElementById('WikiMonkeyFilters-Options');
                // [1] Note that this must also be executed immediately,
                //   see [2]
                var makeUI = WM.Plugins[filters[id][0]].makeUI;
                if (makeUI instanceof Function) {
                    UI.replaceChild(makeUI(filters[id][2]), UI.firstChild);
                }
                else {
                    // Don't removeChild, otherwise if another plugin with
                    // interface is selected, replaceChild won't work
                    UI.replaceChild(document.createElement('div'),
                                                                UI.firstChild);
                }
            }
        })(filters), false);

        selectFilterP.appendChild(selectFilter);
        selectFilterDiv.appendChild(selectFilterP);

        var applyFilterDiv = document.createElement('div');
        applyFilterDiv.id = 'WikiMonkeyFilters-Apply';

        var applyFilter = document.createElement('input');
        applyFilter.type = 'button';
        applyFilter.value = 'Apply filter';
        applyFilter.addEventListener("click", function () {
            var id = document.getElementById('WikiMonkeyFilters-Select'
                            ).getElementsByTagName('select')[0].selectedIndex;
            WM.Plugins[filters[id][0]].main(filters[id][2]);
            this.disabled = true;
        }, false);

        applyFilterDiv.appendChild(applyFilter);

        var showLog = document.createElement('input');
        showLog.type = 'checkbox';
        showLog.addEventListener("change", function () {
            document.getElementById('WikiMonkeyLog').style.display =
                                            (this.checked) ? 'block' : 'none';
            document.getElementById('WikiMonkeyFilters').style.marginBottom =
                                                (this.checked) ? '1em' : '0';
        }, false);

        applyFilterDiv.appendChild(showLog);

        var showLogLabel = document.createElement('span');
        showLogLabel.innerHTML = 'Show Log';

        applyFilterDiv.appendChild(showLogLabel);

        var divFilter = document.createElement('div');
        divFilter.id = "WikiMonkeyFilters-Options";

        // [2] Note that this is also executed onchange, see [1]
        var makeUI = WM.Plugins[filters[0][0]].makeUI;
        if (makeUI instanceof Function) {
            divFilter.appendChild(makeUI(filters[0][2]));
        }
        else {
            divFilter.appendChild(document.createElement('div'));
        }

        divContainer.appendChild(selectFilterDiv);
        divContainer.appendChild(applyFilterDiv);
        divContainer.appendChild(divFilter);

        return divContainer;
    };
};

WM.Interlanguage = new function () {
    "use strict";

    this.parseLinks = function (supportedLangs, source, iwmap) {
        var parsedLinks = WM.Parser.findSpecialLinks(
            source,
            supportedLangs.join("|")
        );

        var langlinks = [];
        for (var p in parsedLinks) {
            var link = parsedLinks[p];
            // Do not store the tag lowercased, since it should be kept as
            // original
            var ltag = link.namespace;
            var ltitle = link.title + ((link.fragment) ?
                                                ("#" + link.fragment) : "");
            for (var iw in iwmap) {
                if (iwmap[iw].prefix.toLowerCase() == ltag.toLowerCase()) {
                    // Fix the url _before_ replacing $1
                    var lurl = WM.MW.fixInterwikiUrl(iwmap[iw].url);
                    lurl = lurl.replace("$1", encodeURIComponent(
                                WM.Parser.squashContiguousWhitespace(ltitle)));
                    break;
                }
            }
            langlinks.push({
                lang: ltag,
                title: ltitle,
                url: lurl,
                index: link.index,
                length: link.length,
            });
        }

        return langlinks;
    };

    this.queryLinks = function (api, queryTitle, title, supportedLangs,
                                    whitelist, firstPage, callEnd, callArgs) {
        var query = {
            action: "query",
            prop: "info|revisions",
            rvprop: "content|timestamp",
            intoken: "edit",
            titles: queryTitle,
            meta: "siteinfo",
            siprop: "interwikimap",
            sifilteriw: "local",
        }

        // When called by the bot, if the start page is a redirect itself, it
        // shoudln't be resolved
        if (!firstPage) {
            query.redirects = "1";
        }

        WM.MW.callAPIGet(
            query,
            api,
            function (res, args) {
                var page = Alib.Obj.getFirstItem(res.query.pages);
                if (page.revisions) {
                    var source = page.revisions[0]["*"];
                    var timestamp = page.revisions[0].timestamp;
                    var edittoken = page.edittoken;
                    var iwmap = res.query.interwikimap;
                    var langlinks = WM.Interlanguage.parseLinks(supportedLangs,
                                                                source, iwmap);
                }
                else {
                    // The requested article doesn't exist
                    var source = false;
                    var timestamp = false;
                    var edittoken = false;
                    var iwmap = res.query.interwikimap;
                    var langlinks = false;
                }

                callEnd(
                    api,
                    title,
                    supportedLangs,
                    whitelist,
                    false,
                    langlinks,
                    iwmap,
                    source,
                    timestamp,
                    edittoken,
                    args
                );
            },
            callArgs
        );
    };

    this.createNewLink = function (origTag, title, url) {
        return {
            origTag: origTag,
            title: title,
            url: url,
        };
    };

    this.createVisitedLink = function (origTag, title, url, iwmap, api, source,
                                                timestamp, edittoken, links) {
        var entry = {
            origTag: origTag,
            title: title,
            url: url,
            iwmap: iwmap,
            api: api,
            source: source,
            timestamp: timestamp,
            edittoken: edittoken,
            links: [],
        };
        for (var l in links) {
            entry.links.push(links[l]);
        }
        return entry;
    };

    this.collectLinks = function (visitedlinks, newlinks, supportedLangs,
                                    whitelist, firstPage, callEnd, callArgs) {
        for (var tag in newlinks) {
            var link = newlinks[tag];
            break;
        }

        if (link) {
            delete newlinks[tag];

            var url = link.url;

            // Don't use WM.MW.getTitleFromWikiUrl(decodeURI(url)) because
            // it wouldn't decode some characters like colons, which are
            // required to be decoded instead when making an API call
            var queryTitle = decodeURIComponent(WM.MW.getTitleFromWikiUrl(
                                                                        url));

            if (queryTitle) {
                var origTag = link.origTag;
                var title = link.title;
                var api = WM.MW.getWikiUrls(url).api;

                // If this is the first processed page, it's local for sure, so
                //   query its links in any case. This e.g. prevents the
                //   application from crashing in case the local page is in a
                //   language whose language tag is not in the white list
                // tag is already lower-cased
                if (firstPage || whitelist.indexOf(tag) > -1) {
                    WM.Log.logInfo("Reading " +
                                WM.Log.linkToPage(url, "[[" + origTag + ":" +
                                title + "]]") + " ...");

                    this.queryLinks(
                        api,
                        queryTitle,
                        title,
                        supportedLangs,
                        whitelist,
                        firstPage,
                        WM.Interlanguage._collectLinksContinue,
                        [url, tag, origTag, visitedlinks, newlinks, callEnd,
                                                                    callArgs]
                    );
                }
                else {
                    WM.Log.logWarning(WM.Log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " will not be checked because " + tag +
                                " is not included in the whitelist defined " +
                                "in the configuration");
                    WM.Interlanguage._collectLinksContinue(
                        api,
                        title,
                        supportedLangs,
                        whitelist,
                        firstPage,
                        // Don't pass a false value as langlinks because this
                        // link would be interpreted as pointing to a
                        // non-existing article
                        [],
                        false,
                        null,
                        null,
                        null,
                        [url, tag, origTag, visitedlinks, newlinks, callEnd,
                                                                    callArgs]
                    );

                }
            }
            else {
                WM.Log.logWarning("Cannot extract the page title from " +
                            WM.Log.linkToPage(url, decodeURI(url)) +
                            ", removing it if it" +
                            " was linked from the processed article");
                WM.Interlanguage.collectLinks(
                    visitedlinks,
                    newlinks,
                    supportedLangs,
                    whitelist,
                    firstPage,
                    callEnd,
                    callArgs
                );
            }
        }
        else {
            callEnd(visitedlinks, callArgs);
        }
    };

    this._collectLinksContinue = function (api, title, supportedLangs,
                                        whitelist, firstPage, langlinks, iwmap,
                                        source, timestamp, edittoken, args) {
        var url = args[0];
        var tag = args[1];
        var origTag = args[2];
        var visitedlinks = args[3];
        var newlinks = args[4];
        var callEnd = args[5];
        var callArgs = args[6];

        if (langlinks === false) {
            WM.Log.logWarning(WM.Log.linkToPage(url,
                                "[[" + origTag + ":" + title + "]]") +
                                " seems to point " +
                                "to a non-existing article, removing it if " +
                                "it was linked from the processed article");
        }
        else {
            visitedlinks[tag] = WM.Interlanguage.createVisitedLink(origTag,
                                            title, url, iwmap, api, source,
                                            timestamp, edittoken, langlinks);

            for (var l in langlinks) {
                var link = langlinks[l];
                var nlink = newlinks[link.lang.toLowerCase()];
                var vlink = visitedlinks[link.lang.toLowerCase()];

                if (!vlink && !nlink) {
                    newlinks[link.lang.toLowerCase()] =
                                            WM.Interlanguage.createNewLink(
                                            link.lang, link.title, link.url);
                }
                else if (vlink && vlink.url != link.url) {
                    // Just ignore any conflicting links and warn the user:
                    // if it's a real conflict, the user will investigate it,
                    // otherwise the user will ignore it
                    WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        WM.Log.linkToPage(vlink.url, "[[" + link.lang + ":" +
                        visitedlinks[link.lang.toLowerCase()].title + "]]"));
                }
                else if (nlink && nlink.url != link.url) {
                    // Just ignore any conflicting links and warn the user:
                    // if it's a real conflict, the user will investigate it,
                    // otherwise the user will ignore it
                    WM.Log.logWarning("Possibly conflicting interlanguage " +
                        "links: " + WM.Log.linkToPage(link.url, "[[" +
                        link.lang + ":" + link.title + "]]") + " and " +
                        WM.Log.linkToPage(nlink.url, "[[" + link.lang + ":" +
                        newlinks[link.lang.toLowerCase()].title + "]]"));
                }
            }
        }

        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            supportedLangs,
            whitelist,
            firstPage,
            callEnd,
            callArgs
        );
    };

    this.updateLinks = function (lang, url, iwmap, source, oldlinks,
                                                                    newlinks) {
        lang = lang.toLowerCase();
        var linkList = [];

        for (var tag in newlinks) {
            if (tag != lang) {
                var link = newlinks[tag];
                var tagFound = false;

                // New links that were not in the white list will have the
                // "iwmap" attribute false, "timestamp" and "edittoken" null
                // and "links" as an empty array
                // Note the difference between 'iwmap' and 'link.iwmap'
                for (var iw in iwmap) {
                    if (iwmap[iw].prefix.toLowerCase() == tag.toLowerCase()) {
                        if (WM.MW.getWikiUrls(iwmap[iw].url).api == link.api) {
                            linkList.push("[[" + link.origTag + ":" +
                                                            link.title + "]]");
                        }
                        else {
                            WM.Log.logWarning("On " + WM.Log.linkToPage(url,
                                    "[[" + link.origTag + ":" + link.title +
                                    "]]") + " , " + tag + " interlanguage " +
                                    "links point to a different wiki than " +
                                    "the others, ignoring them");
                        }

                        tagFound = true;
                        break;
                    }
                }

                if (!tagFound) {
                    WM.Log.logWarning(tag + " interlanguage links are not " +
                        "supported in " + WM.Log.linkToPage(url, "[[" +
                        link.origTag + ":" + link.title + "]]") +
                        " , ignoring them");
                }
            }
        }

        linkList.sort(
            function (a, b) {
                // Sorting is case sensitive by default
                if (a.toLowerCase() > b.toLowerCase())
                    return 1;
                if (b.toLowerCase() > a.toLowerCase())
                    return -1;
                else
                    return 0;
            }
        );

        var cleanText = "";
        var textId = 0;

        for (var l in oldlinks) {
            var link = oldlinks[l];
            cleanText += source.substring(textId, link.index);
            textId = link.index + link.length;
        }
        cleanText += source.substring(textId);

        if (oldlinks.length) {
            // Insert the new links at the index of the first previous link
            var firstLink = oldlinks[0].index;
        }
        else {
            var firstLink = 0;
        }

        var parts = [];
        // Do not add empty strings to parts, otherwise when it's joined
        //   unnecessary line breaks will be added

        var head = cleanText.substring(0, firstLink).trim();

        if (head) {
            parts.push(head);
        }

        var links = linkList.join("\n");

        if (links) {
            parts.push(links);
        }

        var body = cleanText.substr(firstLink).trim();

        if (body) {
            parts.push(body);
        }

        // Make sure to preserve the original white space at the end, otherwise
        //   the final (newText != source) may return true even when no actual
        //   change has been made
        // Note that /\s+$/ would return null in the absence of trailing
        //   whitespace, so a further check should be made, while /\s*$/
        //   safely returns an empty string in that case
        var trailws = /\s*$/;

        return parts.join("\n") + trailws.exec(source);
    };
};

WM.Log = new function () {
    "use strict";

    this._makeLogArea = function () {
        GM_addStyle("#WikiMonkeyLogArea {height:10em; " +
                        "border:2px solid #07b; padding:0.5em; " +
                        "overflow:auto; resize:vertical; " +
                        "background-color:#111;} " +
                    "#WikiMonkeyLogArea p.timestamp, " +
                        "#WikiMonkeyLog p.message {border:none; padding:0; " +
                        "font-family:monospace; color:#eee;} " +
                    "#WikiMonkeyLogArea p.timestamp {float:left; width:5em; " +
                        "margin:0 -5em 0 0; font-size:0.9em;} " +
                    "#WikiMonkeyLogArea p.message {margin:0 0 0.5em 5em;} " +
                    "#WikiMonkeyLogArea div.mhidden {display:none;} " +
                    "#WikiMonkeyLogArea div.mjson {display:none;} " +
                    "#WikiMonkeyLogArea div.mdebug p.message {color:cyan;} " +
                    "#WikiMonkeyLogArea div.minfo {} " +
                    // The .warning and .error classes are already used by
                    // MediaWiki, without associating them with an id and a tag
                    "#WikiMonkeyLogArea div.mwarning p.message " +
                        "{color:gold;} " +
                    "#WikiMonkeyLogArea div.merror p.message {color:red;} " +
                    "#WikiMonkeyLogArea a {color:inherit; " +
                                                "text-decoration:underline;}");

        var log = document.createElement('div');
        log.id = 'WikiMonkeyLog';

        var par = document.createElement('p');
        par.appendChild(makeFilterLink());
        par.appendChild(document.createTextNode(' '));
        par.appendChild(makeSaveLink());
        log.appendChild(par);

        var logarea = document.createElement('div');
        logarea.id = 'WikiMonkeyLogArea';
        log.appendChild(logarea);

        return log;
    };

    var makeFilterLink = function () {
        var link = document.createElement('a');
        link.href = '#WikiMonkey';
        link.innerHTML = computeFilterLinkAnchor();

        link.addEventListener("click", function () {
            // Change _currentInfoDisplayState *before* the loop, to prevent
            // race bugs
            WM.Log._currentInfoDisplayState = !WM.Log._currentInfoDisplayState;
            this.innerHTML = computeFilterLinkAnchor();

            var msgs = document.getElementById('WikiMonkeyLogArea'
                                            ).getElementsByClassName('minfo');

            for (var m = 0; m < msgs.length; m++) {
                msgs[m].style.display = computeInfoDisplayStyle();
            }

            scrollToBottom();
        }, false);

        return link;
    };

    var makeSaveLink = function () {
        var link = document.createElement('a');
        link.href = '#';
        link.download = 'WikiMonkey.log';
        link.innerHTML = '[save log]';
        link.id = 'WikiMonkeyLog-Save';

        link.addEventListener("click", function () {
            link.href = 'data:text/plain;charset=utf-8,' +
                                    encodeURIComponent(composeSaveLogText());
            link.download = composeSaveLogFilename();
        }, false);

        return link;
    };

    var classesToLevels = {'mhidden': 'HDN',
                           'mjson': 'JSN',
                           'mdebug': 'DBG',
                           'minfo': 'INF',
                           'mwarning': 'WRN',
                           'merror': 'ERR'};

    var composeSaveLogText = function () {
        var log = document.getElementById('WikiMonkeyLogArea');
        var divs = log.getElementsByTagName('div');
        var text = '';

        for (var d = 0; d < divs.length; d++) {
            var div = divs[d];
            var ps = div.getElementsByTagName('p');
            var tstamp = ps[0].innerHTML;
            var level = classesToLevels[div.className];
            var message = ps[1].innerHTML;

            text += tstamp + '\t' + level + '\t' + message + '\n';
        }

        return text;
    };

    var composeSaveLogFilename = function () {
        var date = new Date();
        return 'WikiMonkey-' + date.getFullYear() +
                        Alib.Str.padLeft(String(date.getMonth()), '0', 2) +
                        Alib.Str.padLeft(String(date.getDate()), '0', 2) +
                        Alib.Str.padLeft(String(date.getHours()), '0', 2) +
                        Alib.Str.padLeft(String(date.getMinutes()), '0', 2) +
                        '.log';
    };

    this._currentInfoDisplayState = true;

    var computeInfoDisplayStyle = function () {
        return (WM.Log._currentInfoDisplayState) ? 'block' : 'none';
    };

    var computeFilterLinkAnchor = function () {
        return (WM.Log._currentInfoDisplayState) ? '[hide info messages]' :
                                                        '[show info messages]';
    };

    var scrollToBottom = function () {
        var log = document.getElementById('WikiMonkeyLogArea');
        log.scrollTop = log.scrollHeight - log.clientHeight;
    };

    var appendMessage = function (text, type) {
        var tstamp = document.createElement('p');
        tstamp.className = 'timestamp';
        var now = new Date();
        tstamp.innerHTML = now.toLocaleTimeString();

        var msg = document.createElement('p');
        msg.className = 'message';
        // Do not allow the empty string, otherwise the resulting html element
        // may not be rendered by the browser
        msg.innerHTML = (text) ? text : " ";

        var line = document.createElement('div');
        line.appendChild(tstamp);
        line.appendChild(msg);
        line.className = type;

        if (type == 'minfo') {
            line.style.display = computeInfoDisplayStyle();
        }

        var log = document.getElementById('WikiMonkeyLogArea');

        var test = log.scrollTop + log.clientHeight == log.scrollHeight;

        log.appendChild(line);

        if (test) {
            scrollToBottom();
        }
    };

    this.logHidden = function (text) {
        appendMessage(text, 'mhidden');
    };

    this.logJson = function (component, data) {
        var text = JSON.stringify({"component": component, "data": data});
        appendMessage(text, 'mjson');
    };

    this.logDebug = function (text) {
        appendMessage(text, 'mdebug');
    };

    this.logInfo = function (text) {
        appendMessage(text, 'minfo');
    };

    this.logWarning = function (text) {
        appendMessage(text, 'mwarning');
    };

    this.logError = function (text) {
        appendMessage(text, 'merror');
    };

    this.linkToPage = function (url, anchor) {
        // Must return a string, not a DOM element
        return "<a href=\"" + url + "\">" + anchor + "</a>";
    };

    this.linkToWikiPage = function (title, anchor) {
        // Must return a string, not a DOM element
        // Use an absolute (full) URL so it will be usable in the downloadable
        //   version of the log
        // Do *not* use encodeURIComponent(title) because the passed title may
        //   have a fragment or a query string that would then be encoded
        //   MediaWiki should be able to correctly resolve the title anyway
        var wikiUrls = WM.MW.getWikiUrls();
        return "<a href=\"" + wikiUrls.short + title + "\">" + anchor + "</a>";
    };
};

WM.MW = new function () {
    "use strict";

    var wikiPaths = {
        known: {
            "^https?://[^\.]+\.wikipedia\.org": {
                short: "/wiki/",
                full: "/w/index.php",
                api: "/w/api.php"
            },
            "^https?://wiki\.archlinux\.org": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^https?://wiki\.archlinux\.de": {
                short: "/title/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.fr": {
                short: "/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.ro": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://(?:www\.)?archlinux\.fi": {
                short: "/wiki/",
                full: "/w/index.php",
                api: "/w/api.php"
            },
            "^http://wiki\.archlinux\.se": {
                short: "/index.php?title=",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://(?:www\.)?archtr\.org": {
                short: "/index.php?title=",
                full: "/wiki/index.php",
                api: "/wiki/api.php"
            },
            "^http://wiki\.archlinux\.rs": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.ir": {
                short: "/index.php/",
                full: "/index.php",
                api: "/api.php"
            },
        },
        default_: {
            short: "/index.php?title=",
            full: "/index.php",
            api: "/api.php"
        }
    };

    var interwikiFixes = [
        ["https://wiki.archlinux.org/index.php/$1_(",
                                "https://wiki.archlinux.org/index.php/$1%20("]
    ];

    var getWikiUrls = function (href) {
        // It's necessary to keep this function in a private attribute,
        // otherwise localWikiUrls cannot be initialized
        if (href) {
            for (var r in wikiPaths.known) {
                var re = new RegExp(r, "i");
                var match = re.exec(href);

                if (match) {
                    var hostname = match[0];
                    var paths = {};

                    for (var p in wikiPaths.known[r]) {
                        paths[p] = wikiPaths.known[r][p];
                    }

                    break;
                }
            }

            if (!paths) {
                var hostname = Alib.HTTP.getUrlLocation(href).hostname;
                var paths = {};

                for (var p in wikiPaths.default_) {
                    paths[p] = wikiPaths.default_[p];
                }
            }

            var urls = {};

            for (var key in paths) {
                urls[key] = hostname + paths[key];
            }
        }
        else {
            var urls = {};

            for (var p in localWikiUrls) {
                urls[p] = localWikiUrls[p];
            }
        }

        return urls;
    };

    // This variable must be assigned *after* getWikiUrls (!= this.getWikiUrls)
    var localWikiUrls = (function () {
        return getWikiUrls(location.href);
    })();

    this.getWikiUrls = function (href) {
        return getWikiUrls(href);
    };

    this.getTitleFromWikiUrl = function (url) {
        var title = Alib.HTTP.getURIParameters(url).title;

        // Test this *before* the short paths, in fact a short path may just be
        // the full one with the "title" parameter pre-added
        if (!title) {
            var pathname = Alib.HTTP.getUrlLocation(url).pathname;

            for (var r in wikiPaths.known) {
                var re = new RegExp(r, "i");
                var match = re.exec(url);

                if (match) {
                    if (pathname.indexOf(wikiPaths.known[r].short) == 0) {
                        title = pathname.substr(wikiPaths.known[r
                                                            ].short.length);
                    }
                    else {
                        title = false;
                    }

                    break;
                }
            }

            if (!title) {
                if (pathname.indexOf(wikiPaths.default_.short) == 0) {
                    title = pathname.substr(wikiPaths.default_.short.length);
                }
                else {
                    title = false;
                }
            }
        }

        return title;
    };

    this.failedQueryError = function (finalUrl) {
        return "Failed query: " + WM.Log.linkToPage(finalUrl, finalUrl) +
            "\nYou may have tried to use a " +
            "plugin which requires cross-origin HTTP requests, but you are " +
            "not using Scriptish (Firefox), Greasemonkey (Firefox), " +
            "Tampermonkey (Chrome/Chromium) or a similar extension";
    };

    this.failedHTTPRequestError = function (err) {
        return "Failed HTTP request - " + err + "\nYou may have tried to " +
            "use a plugin which requires cross-origin HTTP requests, but " +
            "you are not using Scriptish (Firefox), Greasemonkey (Firefox), " +
            "Tampermonkey (Chrome/Chromium) or a similar extension";
    };

    this.callAPIGet = function (params, api, call, callArgs) {
        if (!api) {
            api = localWikiUrls.api;
        }
        var query = {
            method: "GET",
            url: api + "?format=json" + joinParams(params),
            onload: function (res) {
                try {
                    // Currently only Scriptish supports the responseJSON
                    //   method
                    //var json = (res.responseJSON) ? res.responseJSON : JSON.parse(res.responseText);
                    // ... or not?
                    var json = (Alib.Obj.getFirstItem(res.responseJSON)) ?
                            res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("It is likely that the " +
                                                WM.Log.linkToPage(api, "API") +
                                                " for this wiki is disabled");
                }
                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be caught printing the same API error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
                if (confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                                "to retry?")) {
                    WM.Log.logInfo("Retrying ...");
                    WM.MW.callAPIGet(params, api, call, callArgs);
                }
            }
        };

        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError(WM.MW.failedHTTPRequestError(err));
        }
    };

    this.callAPIPost = function (params, api, call, callArgs) {
        if (!api) {
            api = localWikiUrls.api;
        }
        var query = {
            method: "POST",
            url: api,
            onload: function (res) {
                try {
                    // Currently only Scriptish supports the responseJSON
                    //   method
                    //var json = (res.responseJSON) ? res.responseJSON : JSON.parse(res.responseText);
                    // ... or not?
                    var json = (Alib.Obj.getFirstItem(res.responseJSON)) ?
                            res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("It is likely that the " +
                                                WM.Log.linkToPage(api, "API") +
                                                " for this wiki is disabled");
                }
                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be caught printing the same API error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
                if (confirm("Wiki Monkey error: Failed query\n\nDo you want " +
                                                                "to retry?")) {
                    WM.Log.logInfo("Retrying ...");
                    WM.MW.callAPIPost(params, api, call, callArgs);
                }
            }
        };

        var string = "format=json" + joinParams(params);

        // It's necessary to use try...catch because some browsers don't
        // support FormData yet and will throw an exception
        try {
            if (string.length > 8000) {
                query.data = new FormData();
                query.data.append("format", "json");
                for (var p in params) {
                    query.data.append(p, params[p]);
                }
                // Do not add "multipart/form-data" explicitly or the query
                //   will fail
                //query.headers = {"Content-type": "multipart/form-data"};
            }
            else {
                throw "string <= 8000 characters";
            }
        }
        catch (err) {
            query.data = string;
            query.headers = {"Content-type":
                                        "application/x-www-form-urlencoded"};
        }

        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError(WM.MW.failedHTTPRequestError(err));
        }
    };

    var joinParams = function (params) {
        var string = "";
        for (var key in params) {
            string += ("&" + key + "=" + encodeURIComponent(params[key]));
        }
        return string;
    };

    this.callQuery = function (params, call, callArgs) {
        params.action = "query";
        var callBack = function (res, args) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            call(page, args);
        };
        this.callAPIGet(params, null, callBack, callArgs);
    };

    this.callQueryEdit = function (title, call, callArgs) {
        var callBack = function (page, args) {
            var source = page.revisions[0]["*"];
            var timestamp = page.revisions[0].timestamp;
            var edittoken = page.edittoken;
            call(title, source, timestamp, edittoken, args);
        };
        this.callQuery({prop: "info|revisions",
                        rvprop: "content|timestamp",
                        intoken: "edit",
                        titles: title},
                        callBack,
                        callArgs);
    };

    var userInfo;

    this._storeUserInfo = function (call) {
        userInfo = this.callAPIGet({action: "query",
                                    meta: "userinfo",
                                    uiprop: "groups"},
                                    null,
                                    WM.MW._storeUserInfoEnd,
                                    call);
    };

    this._storeUserInfoEnd = function (res, call) {
        userInfo = res;
        call();
    }

    this.isLoggedIn = function () {
        return userInfo.query.userinfo.id != 0;
    };

    this.getUserName = function () {
        return userInfo.query.userinfo.name;
    };

    this.isUserBot = function () {
        var groups = userInfo.query.userinfo.groups;
        for (var g in groups) {
            if (groups[g] == 'bot') {
                return true;
            }
        }
        return false;
    };

    this.getBacklinks = function (bltitle, blnamespace, call, callArgs) {
        var query = {action: "query",
                     list: "backlinks",
                     bltitle: bltitle,
                     bllimit: 500};

        if (blnamespace) {
            query.blnamespace = blnamespace;
        }

        this._getBacklinksContinue(query, call, callArgs, []);
    };

    this._getBacklinksContinue = function (query, call, callArgs, backlinks) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            backlinks = backlinks.concat(res.query.backlinks);
            if (res["query-continue"]) {
                query.blcontinue = res["query-continue"].backlinks.blcontinue;
                WM.MW._getBacklinksContinue(query, call, args, backlinks);
            }
            else {
                call(backlinks, args);
            }
        },
        callArgs);
    };

    this.getLanglinks = function (title, iwmap, call, callArgs) {
        var query = {action: "query",
                     prop: "langlinks",
                     titles: title,
                     lllimit: 500,
                     llurl: "1",
                     redirects: "1"};

        if (iwmap) {
            query.meta = "siteinfo";
            query.siprop = "interwikimap";
            query.sifilteriw = "local";
        }

        this._getLanglinksContinue(query, call, callArgs, [], null);
    };

    this._getLanglinksContinue = function (query, call, callArgs, langlinks,
                                                                    iwmap) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            langlinks = langlinks.concat(page.langlinks);

            if (res.query.interwikimap) {
                iwmap = res.query.interwikimap;
            }

            if (query.meta) {
                delete query.meta;
                delete query.siprop;
                delete query.sifilteriw;
            }

            if (res["query-continue"]) {
                query.llcontinue = res["query-continue"].langlinks.llcontinue;
                WM.MW._getLanglinksContinue(query, call, args, langlinks,
                                                                        iwmap);
            }
            else {
                call(langlinks, iwmap, args);
            }
        },
        callArgs);
    };

    this.getInterwikiMap = function (title, call, callArgs) {
        var query =

        WM.MW.callAPIGet(
            {action: "query",
             meta: "siteinfo",
             siprop: "interwikimap",
             sifilteriw: "local"},
            null,
            function (res, args) {
                call(res.query.interwikimap, args);
            },
            callArgs
        );
    };

    this.fixInterwikiUrl = function (url) {
        for (var f = 0; f < interwikiFixes.length; f++) {
            var furl = url.replace(interwikiFixes[f][0], interwikiFixes[f][1]);

            if (furl != url) {
                return furl;
            }
        }

        // Return the unmodified url if no replacement has been done
        return url;
    };

    this.getSpecialList = function (qppage, siprop, call, callArgs) {
        var query = {action: "query",
                     list: "querypage",
                     qppage: qppage,
                     qplimit: 500};

        if (siprop) {
            query.meta = "siteinfo";
            query.siprop = siprop;
        }

        this._getSpecialListContinue(query, call, callArgs, [], {});
    };

    this._getSpecialListContinue = function (query, call, callArgs, results,
                                                                    siteinfo) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            results = results.concat(res.query.querypage.results);

            for (var key in res.query) {
                if (key != "querypage") {
                    siteinfo[key] = res.query[key];
                }
            }

            if (query.meta) {
                delete query.meta;
                delete query.siprop;
            }

            if (res["query-continue"]) {
                query.qpoffset = res["query-continue"].querypage.qpoffset;
                WM.MW._getSpecialListContinue(query, call, args, results,
                                                                    siteinfo);
            }
            else {
                call(results, siteinfo, args);
            }
        },
        callArgs);
    };

    this.getActiveUsers = function (augroup, call, callArgs) {
        var query = {action: "query",
                     list: "allusers",
                     augroup: augroup,
                     aulimit: 500,
                     auactiveusers: 1}

        this._getActiveUsersContinue(query, call, callArgs, []);
    };

    this._getActiveUsersContinue = function (query, call, callArgs, results) {
        WM.MW.callAPIGet(query, null, function (res, args) {
            results = results.concat(res.query.allusers);

            if (res["query-continue"]) {
                query.aufrom = res["query-continue"].allusers.aufrom;
                WM.MW._getActiveUsersContinue(query, call, args, results);
            }
            else {
                call(results, args);
            }
        },
        callArgs);
    };
};

WM.Parser = new function () {
    "use strict";

    this.squashContiguousWhitespace = function (title) {
        // MediaWiki treats consecutive whitespace characters in titles and
        //   section names as one
        // For example [[Main __ Page#First _ _section]] is the same as
        //   [[Main Page#First section]]
        // Consider trimming the returned text
        return title.replace(/[_ ]+/g, " ");
    };

    this.neutralizeNowikiTags = function (source) {
        // Empty nowiki tags (<nowiki></nowiki>) must be neutralized as well,
        //   otherwise Tampermonkey will hang, see also
        //   https://github.com/kynikos/wiki-monkey/issues/133
        // Note that the concept of "nesting" doesn't make sense with <nowiki>
        //   tags, so do *not* use Alib.Str.findNestedEnclosures
        var OPENLENGTH = 8;
        var CLOSELENGTH = 9;
        var tags = Alib.Str.findSimpleEnclosures(source, /<nowiki>/i,
                                    OPENLENGTH, /<\/nowiki>/i, CLOSELENGTH);
        var maskedText = "";
        var prevId = 0;

        for (var t = 0; t < tags.length; t++) {
            var tag = tags[t];

            if (tag[1]) {
                var maskLength = tag[1] - tag[0] + CLOSELENGTH;
                var maskString = Alib.Str.padRight("", "x", maskLength);
                maskedText += source.substring(prevId, tag[0]) + maskString;
                prevId = tag[1] + CLOSELENGTH;
                continue;
            }
            else {
                // If a <nowiki> tag is left open (no closing tag is found), it
                //   does its job until the end of the text
                // This also neutralizes the final \n, but it shouldn't matter
                var maskLength = source.substr(tag[0]).length;
                var maskString = Alib.Str.padRight("", "x", maskLength);
                maskedText += source.substring(prevId, tag[0]) + maskString;
                prevId = source.length;
                break;
            }
        }

        maskedText += source.substring(prevId);

        return maskedText;
    };

    this.dotEncode = function (text) {
        return encodeURIComponent(text).replace(/%/g, ".");
    };

    this.dotEncodeLinkBreakingFragmentCharacters = function (fragment) {
        // These characters are known to break internal links if found in
        //   fragments
        // This function is not tested on link paths or anchors!
        fragment = fragment.replace(/\[/g, ".5B");
        fragment = fragment.replace(/\]/g, ".5D");
        fragment = fragment.replace(/\{/g, ".7B");
        fragment = fragment.replace(/\}/g, ".7D");
        fragment = fragment.replace(/\|/g, ".7C");
        return fragment;
    };

    var prepareRegexpWhitespace = function (title) {
        // MediaWiki treats consecutive whitespace characters in titles and
        //   section names as one
        // For example [[Main __ Page#First _ _section]] is the same as
        //   [[Main Page#First section]]
        // Consider trimming the title before passing it here
        return title.replace(/[_ ]+/g, "[_ ]+");
    };

    var prepareTitleCasing = function (pattern) {
        var firstChar = pattern.charAt(0);
        var fcUpper = firstChar.toUpperCase();
        var fcLower = firstChar.toLowerCase();
        if (fcUpper != fcLower) {
            pattern = "[" + fcUpper + fcLower + "]" + pattern.substr(1);
        }
        return pattern;
    };

    this.compareArticleTitles = function (title1, title2) {
        // Actually also namespaces should be kept into account,
        // e.g. 'Help:Title' and 'Help:title' should return true
        var t1 = prepareTitleCasing(this.squashContiguousWhitespace(title1
                                                                    ).trim());
        var t2 = prepareTitleCasing(this.squashContiguousWhitespace(title2
                                                                    ).trim());
        return t1 == t2;
    };

    this.findBehaviorSwitches = function (source, word) {
        source = this.neutralizeNowikiTags(source);
        var regExp;
        if (word) {
            // Behavior switches aren't case-sensitive
            regExp = new RegExp("__" + Alib.RegEx.escapePattern(word) + "__",
                                                                        "gi");
        }
        else {
            // Behavior switches aren't case-sensitive
            regExp = new RegExp("__(TOC|NOTOC|FORCETOC|NOEDITSECTION|" +
                    "NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|" +
                    "NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|" +
                    "NOINDEX|STATICREDIRECT|START|END)__", "gi");
        }
        return Alib.RegEx.matchAll(source, regExp);
    };

    var findLinksEngine = function (source, titlePattern, specialOnly,
                                                            caseSensitive) {
        // Links cannot contain other links, not even in the alternative text
        //   (only the innermost links are valid)
        // Make sure to prepare whitespace in titlePattern like in
        //   prepareRegexpWhitespace
        // Do *not* use the g flag, or when using RegExp.exec the index will
        //   have to be reset at every loop
        var flags = (caseSensitive) ? "" : "i";
        // The following colon/space combinations are valid
        //   "[[a:b#c|d]]"
        //   "[[ a:b#c|d]]"
        //   "[[ :a:b#c|d]]"
        //   "[[ : a:b#c|d]]"
        //   "[[:a:b#c|d]]"
        //   "[[: a:b#c|d]]"
        //   "[[::a:b#c|d]]"
        //   "[[: :a:b#c|d]]"
        //   "[[:: a:b#c|d]]"
        //   "[[: : a:b#c|d]]"
        // A link like "[[ ::a:b#c|d]]" isn't valid, but it would still be
        //   found when specialOnly is false (bug #166)
        var special = (specialOnly) ? "(?:[ _]+:)?[ _]*" :
                                                        "(?:\\:?[ _]*){0,2}";
        var regExp = new RegExp("^" + special + "(" + titlePattern + ")" +
                    "[ _]*(?:\\|[_\\s]*([\\s\\S]+?)[_\\s]*)?[_\\s]*$", flags);
        var nSource = WM.Parser.neutralizeNowikiTags(source);
        var links = [];
        var dbraces = Alib.Str.findInnermostEnclosures(nSource, "[[", "]]");

        for (var e = 0; e < dbraces.length; e++) {
            var dbrace = dbraces[e];
            var inText = source.substring(dbrace[0] + 2, dbrace[1]);
            var match = regExp.exec(inText);

            if (match) {
                var push = true;

                if (match[6]) {
                    // Incomplete templates in the alternative text have an
                    //   apparently weird behaviour, hard to reverse-engineer,
                    //   so issue a warning when one is found
                    //   See also the examples in findTransclusionArguments
                    // Note that the title already doesn't allow "{" or "}"
                    var nText = WM.Parser.neutralizeNowikiTags(match[6]);
                    var maskedText = Alib.Str.findNestedEnclosures(nText, "{{",
                                                                "}}", "x")[1];

                    if (maskedText.search(/(\{\{|\}\})/) > -1) {
                        WM.Log.logWarning("[[" + match[0] + "]] seems to " +
                            "contain part of a template, and the resulting " +
                            "behaviour cannot be predicted by this " +
                            "function, so the link will be ignored " +
                            "altogether");
                        push = false;
                    }
                }

                if (push) {
                    links.push({"rawLink": "[[" + match[0] + "]]",
                                "link": match[1],
                                "rawTitle": match[2],
                                "namespace": match[3],
                                "title": match[4],
                                "fragment": match[5],
                                "anchor": match[6],
                                "index": dbrace[0],
                                "length": dbrace[1] + 2 - dbrace[0]});
                }
            }
        }

        return links;
    };

    this.findSectionLinks = function (source) {
        // Keep the capturing groups as required by findLinksEngine
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
        var titlePattern = "(()())#(" + fragmentChars + ")";
        return findLinksEngine(source, titlePattern, false, true);
    }

    this.findInternalLinks = function (source, namespace, title) {
        // Keep the capturing groups as required by findLinksEngine
        var namespaceChars = "[^\\n\\{\\}\\[\\]\\|\\:\\#]+?";
        var titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?";
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";

        if (namespace) {
            var rens = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                namespace));

            if (title) {
                var retitle = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                    title));
                var titlePattern = "((" + rens + ")[ _]*:[ _]*" +
                                        "(" + retitle + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

                // Namespaces wouldn't be case-sensitive, but titles are, so be
                //   safe and don't use the i flag
                var caseSensitive = true;
            }
            else {
                var titlePattern = "((" + rens + ")[ _]*:[ _]*" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

                // Namespaces aren't case-sensitive
                var caseSensitive = false;
            }
        }
        else if (title) {
            var retitle = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                    title));

            // Keep the capturing groups as required by findLinksEngine
            var titlePattern = "(()(" + retitle + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

            // Titles are case-sensitive
            var caseSensitive = true;
        }
        else {
            var titlePattern = "((?:(" + namespaceChars + ")[ _]*:[ _]*)?" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";
            var caseSensitive = true;
        }

        return findLinksEngine(source, titlePattern, false, caseSensitive);
    };

    this.findInterwikiLinks = function (source, wiki) {
        return this.findInternalLinks(source, wiki);
    };

    this.findSpecialLinks = function (source, pattern) {
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // Keep the capturing groups as required by findLinksEngine
        // See also WM.ArchWiki.findAllInterlanguageLinks
        var titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?";
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
        var titlePattern = "((" + pattern + ")[ _]*:[ _]*" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";
        // Categories and language tags aren't case-sensitive
        return findLinksEngine(source, titlePattern, true, false);
    };

    this.findCategories = function (source) {
        return this.findSpecialLinks(source, "Category");
    };

    this.findInterlanguageLinks = function (source, language) {
        // See also WM.ArchWiki.findAllInterlanguageLinks
        return this.findSpecialLinks(source, Alib.RegEx.escapePattern(
                                                                    language));
    };

    this.findVariables = function (source, variable) {
        // There don't seem to exist variable names with whitespace, applying
        //   prepareRegexpWhitespace could be dangerous in this case
        var pattern = Alib.RegEx.escapePattern(variable);
        return this.findVariablesPattern(source, pattern);
    };

    this.findVariablesPattern = function (source, pattern) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // There can't be an underscore before the variable name
        // There can't be a whitespace between the variable name and the colon
        var nSource = this.neutralizeNowikiTags(source);
        var results = [];
        var dbrackets = Alib.Str.findNestedEnclosures(nSource, "{{", "}}",
                                                                    "x")[0];

        for (var d = 0; d < dbrackets.length; d++) {
            var dbracket = dbrackets[d];
            var inText = source.substring(dbracket[0] + 2, dbracket[1]);

            // Variables are case-sensitive
            // Do *not* use the g flag, or when using RegExp.exec the index
            //   will have to be reset at every loop
            var regExp = new RegExp("^\\s*(" + pattern + ")" +
                                        "(?:\\:\\s*([\\s\\S]*?))?\\s*$", "");
            var match = regExp.exec(inText);

            if (match) {
                results.push({"rawVariable": "{{" + match[0] + "}}",
                            "name": match[1],
                            "value": match[2],
                            "index": dbracket[0],
                            "length": dbracket[1] + 2 - dbracket[0]});
            }
        }

        return results;
    };

    var findTransclusionsEngine = function (source, pattern, templatesOnly) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // The difference between generic transclusions and templates is the
        //   possibility of a colon before the title which forces the
        //   transclusion of a page instead of a template
        // There can't be an underscore before the colon
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        // Template names are case-sensitive, just make sure to prepare them
        //   with prepareTitleCasing
        // Do *not* use the g flag, or when using RegExp.exec the index will
        //   have to be reset at every loop
        var regExp = new RegExp("^(\\s*" + ((templatesOnly) ? "" : ":?") +
                                        "[_ ]*(" + pattern + ")[_ ]*\\s*)" +
                                        "(?:\\|([\\s\\S]*))?$", "");

        var nSource = WM.Parser.neutralizeNowikiTags(source);
        var transclusions = [];
        var dbrackets = Alib.Str.findNestedEnclosures(nSource, "{{", "}}",
                                                                    "x")[0];

        for (var d = 0; d < dbrackets.length; d++) {
            var dbracket = dbrackets[d];
            var inText = source.substring(dbracket[0] + 2, dbracket[1]);
            var match = regExp.exec(inText);

            if (match) {
                // 3 is the length of "{{" + the first "|"
                var argIndex = dbracket[0] + match[1].length + 3;

                transclusions.push({
                    "rawTransclusion": "{{" + match[0] + "}}",
                    "title": match[2],
                    "index": dbracket[0],
                    "length": dbracket[1] - dbracket[0] + 2,
                    "arguments": findTransclusionArguments(match, argIndex),
                });
            }
        }

        return transclusions;
    };

    var findTransclusionArguments = function (match, argIndex) {
        var rawArguments = match[3];
        var args = [];

        if (rawArguments) {
            var nArgs = WM.Parser.neutralizeNowikiTags(rawArguments);

            // Mask any inner links, so that their "|" characters won't be
            //   interpreted as belonging to the template
            //   Note that double braces ("[[]]") "escape" a pipe in a template
            //   argument even if a link is not correctly formed, e.g. [[|]] or
            //   using unallowed characters etc.
            var maskedArgs = Alib.Str.findNestedEnclosures(nArgs, "[[", "]]",
                                                                    "x")[1];

            // Mask any inner templates, so that their "|" characters won't be
            //   interpreted as belonging to the outer template
            maskedArgs = Alib.Str.findNestedEnclosures(maskedArgs, "{{", "}}",
                                                                    "x")[1];

            // Also tables would have pipes, but using tables inside templates
            //   doesn't seem to be supported by MediaWiki, except if enclosing
            //   them in special parser functions, e.g.
            //   http://www.mediawiki.org/wiki/Extension:Pipe_Escape which
            //   would then be safely masked by the function above

            // Incomplete links and templates in the arguments text have an
            //   apparently weird behaviour, hard to reverse-engineer, so issue
            //   a warning when one is found
            //   Try for example the following cases:
            //     000{{hc|BBB[[AAA|ZZZ}}CCC]]111
            //     000{{hc|BBB[[AAA}}CCC|ZZZ]]111
            //     000[[BBB{{hc|AAA|ZZZ]]CCC}}111
            //     000{{hc|BBB[[AAA|ZZZ}}[[KKK]]111000{{hc|AAA|BBB}}111
            //     {{bc|{{Accuracy|[[test}}]]}}
            //     {{bc|{{Accuracy|[[test|}}]]}}
            //     {{Accuracy|[[}}]]
            //     {{Accuracy|[[test|}}]]
            //     [[{{Accuracy|]]}}
            //     [[test|{{Accuracy|]]}}
            //     [[test|{{Accuracy|]]
            //     [[test|{{ic|aaa]]}}
            //   Note that the title already doesn't allow "{", "}", "[" nor
            //     "]"
            if (maskedArgs.search(/(\{\{|\}\}|\[\[|\]\])/) > -1) {
                WM.Log.logWarning("{{" + match[0] + "}} seems to " +
                    "contain part of a link or template, and the resulting " +
                    "behaviour cannot be predicted by this function, so " +
                    "the whole template will be ignored altogether");
            }
            else {
                var mArgs = maskedArgs.split("|");
                var relIndex = 0;

                for (var m = 0; m < mArgs.length; m++) {
                    var mArgument = mArgs[m];
                    var argL = mArgument.length;
                    var argument = rawArguments.substr(relIndex, argL);
                    var eqIndex = mArgument.indexOf("=");

                    // eqIndex must be > 0, not -1, in fact the key must not be
                    //   empty
                    if (eqIndex > 0) {
                        var rawKey = argument.substring(0, eqIndex);
                        var reKey = /^(\s*)(.+?)\s*$/;
                        var keyMatches = reKey.exec(rawKey);
                        var key = keyMatches[2];
                        var keyIndex = argIndex + ((keyMatches[1]) ?
                                                    keyMatches[1].length : 0);

                        // 1 is the length of "="
                        var value = argument.substr(eqIndex + 1);
                        var valueIndex = argIndex + keyMatches[0].length + 1;
                    }
                    else {
                        var key = null;
                        var keyIndex = null;
                        var value = argument;
                        var valueIndex = argIndex;
                    }

                    args.push({key: key,
                                    key_index: keyIndex,
                                    value: value,
                                    value_index: valueIndex});

                    // 1 is the length of "|"
                    relIndex += argL + 1;
                }
            }
        }

        return args;
    };

    this.findTemplates = function (source, template) {
        if (template) {
            var pattern = Alib.RegEx.escapePattern(template);
            pattern = prepareRegexpWhitespace(pattern);
            pattern = prepareTitleCasing(pattern);
        }
        else {
            var pattern = "[^\\n\\{\\}\\[\\]\\||\\#]+?";
        }

        return this.findTemplatesPattern(source, pattern);
    };

    this.findTemplatesPattern = function (source, pattern) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // Templates can't be transcluded with a colon before the title
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        return findTransclusionsEngine(source, pattern, true);
    };

    this.findTransclusions = function (source, namespace, title) {
        // The difference from templates is the possibility of a colon before
        //   the title which forces the transclusion of a page instead of a
        //   template
        // There can't be an underscore before the colon
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        var titleChars = "[^\\n\\{\\}\\[\\]\\||\\#]+?";

        if (namespace) {
            var namespacePattern = Alib.RegEx.escapePattern(namespace);
            namespacePattern = prepareRegexpWhitespace(namespacePattern);
            namespacePattern = prepareTitleCasing(namespacePattern);
        }

        if (title) {
            var titlePattern = Alib.RegEx.escapePattern(title);
            titlePattern = prepareRegexpWhitespace(titlePattern);
            titlePattern = prepareTitleCasing(titlePattern);
        }

        if (namespacePattern && titlePattern) {
            var pattern = namespacePattern + "[ _]*:[ _]*" + titlePattern;
        }
        else if (!namespacePattern && titlePattern) {
            var pattern = titlePattern;
        }
        else if (namespacePattern && !titlePattern) {
            var pattern = namespacePattern + "[ _]*:" + titleChars;
        }
        else {
            var pattern = titleChars;
        }

        return findTransclusionsEngine(source, pattern, false);
    };

    this.findSectionHeadings = function (source) {
        // ======Title====== is the deepest level supported
        var MAXLEVEL = 6;

        var sections = [];
        var minLevel = MAXLEVEL;
        var maxTocLevel = 0;
        var tocLevel = 1;
        var regExp = /^(\=+([ _]*(.+?)[ _]*)\=+)[ \t]*$/gm;
        var match, line, rawheading, heading, cleanheading, L0, L1, level,
                                            prevLevels, start, end, tocPeer;

        while (true) {
            match = regExp.exec(source);

            if (match) {
                L0 = match[0].length;
                line = match[1];
                rawheading = match[2];
                heading = match[3];
                cleanheading = WM.Parser.squashContiguousWhitespace(heading);
                L1 = line.length;
                level = 1;
                start = "=";
                end = "=";

                // ==Title=== and ===Title== are both 2nd levels and so on
                // (the shortest sequence of = between the two sides is
                //  considered)

                // = and == are not titles
                // === is read as =(=)=, ==== is read as =(==)= (both 1st
                //                                               levels)
                // ===== is read as ==(=)== (2nd level) and so on

                while (true) {
                    start = line.substr(level, 1);
                    end = line.substr(L1 - level - 1, 1);

                    if (L1 - level * 2 > 2 && start == "=" && end == "=") {
                        level++;
                    }
                    else {
                        if (level > MAXLEVEL) {
                            level = MAXLEVEL;
                        }
                        else if (level < minLevel) {
                            minLevel = level;
                        }
                        break;
                    }
                }

                if (level == minLevel) {
                    tocLevel = 1;
                    prevLevels = {};
                    prevLevels[level] = 1;
                    prevLevels.relMax = level;
                }
                else if (level > prevLevels.relMax) {
                    tocLevel++;
                    prevLevels[level] = tocLevel;
                    prevLevels.relMax = level;
                    if (tocLevel > maxTocLevel) {
                        maxTocLevel = tocLevel;
                    }
                }
                else if (level < prevLevels.relMax) {
                    if (prevLevels[level]) {
                        tocLevel = prevLevels[level];
                    }
                    else {
                        // tocPeer is the level immediately greater than the
                        // current one, and it should have the same tocLevel
                        // I must reset tocPeer here to the relative maximum
                        tocPeer = prevLevels.relMax;
                        for (var pLevel in prevLevels) {
                            if (pLevel > level && pLevel < tocPeer) {
                                tocPeer = pLevel;
                            }
                        }
                        tocLevel = prevLevels[tocPeer];
                        prevLevels[level] = tocLevel;
                    }
                    prevLevels.relMax = level;
                }

                sections.push({line: line,
                               rawheading: rawheading,
                               heading: heading,
                               cleanheading: cleanheading,
                               level: level,
                               tocLevel: tocLevel,
                               index: (regExp.lastIndex - L0),
                               length0: L0,
                               length1: L1});
            }
            else {
                break;
            }
        }

        // Articles without sections
        if (maxTocLevel == 0) {
            minLevel = 0;
        }

        return {sections: sections,
                minLevel: minLevel,
                maxTocLevel: maxTocLevel};
    };
};

WM.Tables = new function () {
    "use strict";

    this.appendRow = function (source, mark, values) {
        var lastId = source.lastIndexOf('|}' + mark);
        var endtable = (lastId > -1) ? lastId : source.lastIndexOf('|}');

        var row = "|-\n|" + values.join("\n|") + "\n";

        var newText = Alib.Str.insert(source, row, endtable);

        return newText;
    };
};

WM.UI = new function () {
    "use strict";

    var editor = null;

    this.setEditor = function(rows) {
        editor = rows;
    };

    var diff = null;

    this.setDiff = function(rows) {
        diff = rows;
    };

    var special = null;

    this.setSpecial = function(rows) {
        special = rows;
    };

    var recentChanges = null;

    this.setRecentChanges = function(rows) {
        recentChanges = rows;
    };

    var newPages = null;

    this.setNewPages = function(rows) {
        newPages = rows;
    }

    var bot = null;

    this.setBot = function(rows) {
        bot = rows;
    };

    var makeButtons = function (functions) {
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyButtons';

        GM_addStyle("#WikiMonkeyButtons div.row {position:relative; " +
                                                    "margin-bottom:0.33em;} " +
                    "#WikiMonkeyButtons div.shortcut {position:absolute;} " +
                    "#WikiMonkeyButtons div.shortcut > input, " +
                                "#WikiMonkeyButtonAll {width:8.33em; " +
                                "margin-bottom:0.33em; font-weight:bold;} " +
                    "#WikiMonkeyButtons div.plugins {margin-left:9em;} " +
                    "#WikiMonkeyButtons div.pluginUI {display:inline-block; " +
                                "margin-bottom:0.33em; margin-right:0.33em;}");

        var buttonAll = document.createElement('input');
        buttonAll.setAttribute('type', 'button');
        buttonAll.setAttribute('value', 'Execute all');
        buttonAll.id = "WikiMonkeyButtonAll";

        var allFunctions = [];
        var rowsN = 0;

        for (var r in functions) {
            var row = functions[r];

            var buttonRow = document.createElement('input');
            buttonRow.setAttribute('type', 'button');
            buttonRow.setAttribute('value', 'Execute row');

            var pRow = document.createElement('div');
            pRow.className = "shortcut";
            pRow.appendChild(buttonRow);

            var divPlugins = document.createElement('div');
            divPlugins.className = "plugins";

            var divRow = document.createElement('div');
            divRow.className = "row";
            divRow.appendChild(pRow);

            var rowFunctions = [];
            var buttonsN = 0;

            for (var f in row) {
                var ff = row[f];

                var buttonFunction = document.createElement('input');
                buttonFunction.setAttribute('type', 'button');
                buttonFunction.setAttribute('value', ff[1]);

                buttonFunction.addEventListener("click", (function (fn, arg) {
                    return function () {
                        WM.Log.logHidden("Plugin: " + fn);
                        WM.Plugins[fn].main(arg, null);
                    };
                })(ff[0], ff[2]), false);

                var exFunction = (function (plugin) {
                    return function (args, callNext) {
                        WM.Log.logHidden("Plugin: " + plugin);
                        WM.Plugins[plugin].main(args, callNext);
                    };
                })(ff[0]);

                rowFunctions.push([exFunction, ff[2]]);
                allFunctions.push([exFunction, ff[2]]);

                var divFunction = document.createElement('div');
                divFunction.className = 'pluginUI';
                divFunction.appendChild(buttonFunction);

                var makeUI = WM.Plugins[ff[0]].makeUI;
                if (makeUI instanceof Function) {
                    divFunction.appendChild(makeUI(ff[2]));
                }

                divPlugins.appendChild(divFunction);

                buttonsN++;
            }

            buttonRow.addEventListener("click", (function (rowFunctions) {
                return function () {
                    Alib.Async.executeAsync(rowFunctions, -1);
                };
            })(rowFunctions), false);

            divRow.appendChild(divPlugins);
            divContainer.appendChild(divRow);

            if (buttonsN <= 1) {
                buttonRow.disabled = true;
            }

            rowsN++;
        }

        buttonAll.addEventListener("click", (function (allFunctions) {
            return function () {
                Alib.Async.executeAsync(allFunctions, -1);
            };
        })(allFunctions), false);

        if (rowsN > 1) {
            divRow = document.createElement('div');
            divRow.className = "row";
            divRow.appendChild(buttonAll);
            divContainer.appendChild(divRow);
        }

        return divContainer;
    };

    this._makeUI = function () {
        var nextNode, UI;
        var display = true;
        var displayLog = true;

        if (document.getElementById('editform')) {
            nextNode = document.getElementById('wpSummaryLabel'
                                                    ).parentNode.nextSibling;
            UI = (editor) ? makeButtons(editor) : null;
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            nextNode = document.getElementById('bodyContent'
                                            ).getElementsByTagName('h2')[0];
            UI = (diff) ? makeButtons(diff) : null;
        }
        else if (document.getElementById('mw-subcategories') ||
                                        document.getElementById('mw-pages')) {
            nextNode = document.getElementById('bodyContent');
            UI = (bot) ? WM.Bot._makeUI(bot,
                            [[document.getElementById('mw-pages'), 0, "Pages"],
                            [document.getElementById('mw-subcategories'), 0,
                            "Subcategories"]]) : null;
            display = false;
        }
        else if (document.getElementById('mw-whatlinkshere-list')) {
            nextNode = document.getElementById('bodyContent'
                                ).getElementsByTagName('form')[0].nextSibling;
            UI = (bot) ? WM.Bot._makeUI(bot,
                            [[document.getElementById('mw-whatlinkshere-list'),
                            0, "Pages"]]) : null;
            display = false;
        }
        else if (document.getElementById('mw-linksearch-form') &&
                                        document.getElementById('bodyContent'
                                        ).getElementsByTagName('ol')[0]) {
            nextNode = document.getElementById('mw-linksearch-form'
                                                                ).nextSibling;
            UI = (bot) ? WM.Bot._makeUI(bot,
                        [[document.getElementById('bodyContent'
                        ).getElementsByTagName('ol')[0], 1, "Pages"]]) : null;
            display = false;
        }
        else if (document.getElementById('mw-prefixindex-list-table')) {
            nextNode = document.getElementById('mw-prefixindex-list-table');
            UI = (bot) ? WM.Bot._makeUI(bot,
                                [[nextNode.getElementsByTagName('tbody')[0],
                                0, "Pages"]]) : null;
            display = false;
        }
        else {
            var wikiUrls = WM.MW.getWikiUrls();
            var patt1 = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])SpecialPages", '');
            var patt2 = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])SpecialPages", '');
            var patt3 = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])RecentChanges", '');
            var patt4 = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])RecentChanges", '');
            var patt5 = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])NewPages", '');
            var patt6 = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])NewPages", '');

            if (location.href.search(patt1) > -1 ||
                                            location.href.search(patt2) > -1) {
                nextNode = document.getElementById('bodyContent');
                UI = (special) ? makeButtons(special) : null;
            }
            else if (location.href.search(patt3) > -1 ||
                                            location.href.search(patt4) > -1) {
                nextNode = document.getElementById('mw-content-text'
                                            ).getElementsByTagName('h4')[0];
                UI = (recentChanges) ? WM.Filters._makeUI(recentChanges) :
                                                                        null;
                displayLog = false;
            }
            else if (location.href.search(patt5) > -1 ||
                                            location.href.search(patt6) > -1) {
                nextNode = document.getElementById('mw-content-text'
                                            ).getElementsByTagName('ul')[0];
                UI = (newPages) ? WM.Filters._makeUI(newPages) : null;
                displayLog = false;
            }
            else if (document.getElementsByClassName('mw-spcontent'
                                                                ).length > 0) {
                nextNode = document.getElementsByClassName('mw-spcontent')[0];
                UI = (bot) ? WM.Bot._makeUI(bot,
                                    [[nextNode.getElementsByTagName('ol')[0],
                                    0, "Pages"]]) : null;
                display = false;
            }
            else if (document.getElementsByClassName('mw-allpages-table-chunk'
                                                                ).length > 0) {
                nextNode = document.getElementsByClassName(
                                                'mw-allpages-table-chunk')[0];
                UI = (bot) ? WM.Bot._makeUI(bot,
                                [[nextNode.getElementsByTagName('tbody')[0],
                                0, "Pages"]]) : null;
                display = false;
            }
        }

        if (UI) {
            GM_addStyle("#WikiMonkey {position:relative;} " +
                        "#WikiMonkey fieldset {margin:0 0 1em 0;}");

            var main = document.createElement('fieldset');
            main.id = 'WikiMonkey';

            var legend = document.createElement('legend');
            legend.appendChild(document.createTextNode('Wiki Monkey '));

            var hide = document.createElement('a');
            hide.href = '#WikiMonkey';
            hide.innerHTML = '[hide]';
            hide.addEventListener("click", function () {
                var wmmain = document.getElementById('WikiMonkeyMain');
                if (wmmain.style.display == 'none') {
                    wmmain.style.display = 'block';
                    this.innerHTML = '[hide]';
                }
                else {
                    wmmain.style.display = 'none';
                    this.innerHTML = '[show]';
                }
                return false;
            }, false);
            legend.appendChild(hide);

            legend.appendChild(document.createTextNode(' '));

            var help = document.createElement('a');
            help.href = 'https://github.com/kynikos/wiki-monkey/wiki'
            help.innerHTML = '[help]';
            legend.appendChild(help);

            main.appendChild(legend);

            var main2 = document.createElement('div');
            main2.id = 'WikiMonkeyMain';

            main2.appendChild(UI);

            var logArea = WM.Log._makeLogArea();
            if (!displayLog) {
                logArea.style.display = 'none';
            }
            main2.appendChild(logArea);

            if (!display) {
                main2.style.display = 'none';
                hide.innerHTML = '[show]';
            }
            main.appendChild(main2);

            nextNode.parentNode.insertBefore(main, nextNode);
        }
    };
};

WM.WhatLinksHere = new function () {
    "use strict";

    this.isWhatLinksHerePage = function () {
        return (document.getElementById('mw-whatlinkshere-list')) ? true :
                                                                        false;
    };

    this.getTitle = function () {
        return document.getElementById('contentSub').getElementsByTagName('a'
                                                                    )[0].title;
    };
};

WM.Plugins.ExpandContractions = new function () {
    "use strict";

    var replace = function (source, regExp, newString, checkString,
                                                                checkStrings) {
        var newtext = source.replace(regExp, newString);
        if (checkStrings.length > 1 && newtext != source) {
            WM.Log.logWarning("Replaced some \"" + checkString + "\" with \"" +
                        checkStrings[0] + "\": check that it didn't mean \"" +
                        checkStrings.slice(1).join("\" or \"") + "\" instead");
        }
        return newtext;
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = source;

        // Ignoring "I" since writing in 1st person isn't formal anyway
        // Note that JavaScript doesn't support look behind :(
        // Pay attention to preserve the original capitalization

        newtext = replace(newtext, /([a-z])'re/ig, '$1 are', "'re", ["are"]);
        newtext = replace(newtext, /([a-z])'ve/ig, '$1 have', "'ve", ["have"]);
        newtext = replace(newtext, /([a-z])'ll/ig, '$1 will', "'ll",
                                                            ["will", "shall"]);
        newtext = replace(newtext, /([a-z])'d/ig, '$1 would', "'d",
                                                            ["would", "had"]);
        newtext = replace(newtext, /(c)an't/ig, '$1annot', "can't",
                                                                ["cannot"]);
        newtext = replace(newtext, /(w)on't/ig, '$1ill not', "won't",
                                                                ["will not"]);
        newtext = replace(newtext, /([a-z])n't/ig, '$1 not', "n't", ["not"]);
        newtext = replace(newtext, /(here|there)'s/ig, '$1 is', "here/there's",
                                        ["here/there is", "here/there has"]);
        // Replacing he's, she's, that's, what's, where's, who's ... may be too
        //   dangerous
        newtext = replace(newtext, /([a-z])'s (been)/ig, '$1 has $2',
                                                    "'s been", ["has been"]);
        newtext = replace(newtext, /(let)'s/ig, '$1 us', "let's", ["let us"]);
        newtext = replace(newtext, /(it)'(s own)/ig, '$1$2', "it's own",
                                                                ["its own"]);

        var ss = newtext.match(/[a-z]'s/gi);
        if (ss) {
            WM.Log.logWarning("Found " + ss.length + " instances of \"'s\": " +
                    "check if they can be replaced with \"is\", \"has\", ...");
        }

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Expanded contractions");
        }

        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.FixFragments = new function () {
    "use strict";

    var fixLinks = function (source) {
        var title = WM.Editor.getTitle();
        var sections = WM.Parser.findSectionHeadings(source).sections;

        var slinks = WM.Parser.findSectionLinks(source);
        var newtext1 = "";
        var prevId = 0;

        for (var l = 0; l < slinks.length; l++) {
            var link = slinks[l];
            newtext1 += source.substring(prevId, link.index);
            newtext1 += fixLink(source, sections, link.rawLink, link.fragment,
                                                                link.anchor);
            prevId = link.index + link.length;
        }
        newtext1 += source.substr(prevId);

        // Note that it's impossible to recognize any namespaces in the title
        //   without querying the server
        // Alternatively, a list of the known namespaces could be maintained
        //   for each wiki
        // Recognizing namespaces would let recognize more liberal link
        //   syntaxes (e.g. spaces around the colon)
        var ilinks = WM.Parser.findInternalLinks(newtext1, null, title);
        var newtext2 = "";
        var prevId = 0;

        for (var l = 0; l < ilinks.length; l++) {
            var link = ilinks[l];
            newtext2 += newtext1.substring(prevId, link.index);
            var rawfragment = link.fragment;

            if (rawfragment) {
                newtext2 += fixLink(newtext1, sections, link.rawLink,
                                                    rawfragment, link.anchor);
            }
            else {
                newtext2 += link.rawLink;
            }

            prevId = link.index + link.length;
        }
        newtext2 += newtext1.substr(prevId);

        return newtext2;
    };

    var fixLink = function (source, sections, rawlink, rawfragment, lalt) {
        var fragment = WM.Parser.squashContiguousWhitespace(rawfragment
                                                                    ).trim();

        for (var s = 0; s < sections.length; s++) {
            var heading = sections[s].cleanheading;
            var dotHeading = WM.Parser.dotEncode(heading);
            var dotFragment = WM.Parser.dotEncode(fragment);

            if (dotHeading.toLowerCase() == dotFragment.toLowerCase()) {
                if (fragment == dotFragment) {
                    // If the fragment was encoded, re-encode it because it
                    // could contain link-breaking characters (e.g. []|{})
                    // The condition would also be true if the fragment doesn't
                    // contain any encodable characters, but since heading and
                    // fragment at most differ by capitalization, encoding the
                    // heading won't have any effect
                    return "[[#" + dotHeading + ((lalt) ? "|" + lalt : "") +
                                                                        "]]";
                }
                else {
                    // If the fragment was not encoded, if the fragment
                    // contained link-breaking characters the link was already
                    // broken, and replacing it with heading wouldn't make
                    // things worse; if the fragment didn't contain
                    // link-breaking characters, the heading doesn't either,
                    // since heading and fragment at most differ by
                    // capitalization, so it's safe to replace it
                    // If the fragment was *partially* encoded instead, a
                    // link-breaking character may have been encoded, so all
                    // link-breaking characters must be re-encoded here!
                    var escHeading =
                            WM.Parser.dotEncodeLinkBreakingFragmentCharacters(
                                                                    heading);
                    return "[[#" + escHeading + ((lalt) ? "|" + lalt : "") +
                                                                        "]]";
                }
            }
        }

        // It's not easy to use WM.Log.linkToWikiPage because pure fragments
        //   are not supported yet
        WM.Log.logWarning("Cannot fix broken section link: " + rawlink);
        return rawlink;
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = fixLinks(source);

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed section links");
        }
        else {
            WM.Log.logInfo("No fixable section links found");
        }

        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.FixLinkFragments = new function () {
    "use strict";

    this.processLink = function (title, links, index, source, newText, prevId,
                                                            call, callArgs) {
        if (links[index]) {
            var link = links[index];
            var rawfragment = link.fragment;

            if (rawfragment) {
                WM.Log.logInfo("Processing " +
                    WM.Log.linkToWikiPage(link.link, link.rawLink) + " ...");

                var target = ((link.namespace) ? link.namespace + ":" : "") +
                                                                    link.title;

                // Note that it's impossible to recognize any namespaces in the
                //   title without querying the server
                // Alternatively, a list of the known namespaces could be
                //   maintained for each wiki
                // Recognizing namespaces would let recognize more liberal link
                //   syntaxes (e.g. spaces around the colon)
                if (!WM.Parser.compareArticleTitles(target, title)) {
                    var params = {
                        'action': 'parse',
                        'prop': 'sections',
                        'page': target,
                        'redirects': 1,
                    };

                    WM.MW.callAPIGet(params,
                             null,
                             WM.Plugins.FixLinkFragments.processLinkContinue,
                             [link, target, rawfragment, links, index, source,
                                    newText, prevId, title, call, callArgs]);
                }
                else {
                    index++;
                    WM.Plugins.FixLinkFragments.processLink(title, links,
                            index, source, newText, prevId, call, callArgs);
                }
            }
            else {
                index++;
                WM.Plugins.FixLinkFragments.processLink(title, links, index,
                                    source, newText, prevId, call, callArgs);
            }
        }
        else {
            newText += source.substr(prevId);
            call(newText, callArgs);
        }
    };

    this.processLinkContinue = function (res, args) {
        var link = args[0];
        var target = args[1];
        var rawfragment = args[2];
        var links = args[3];
        var index = args[4];
        var source = args[5];
        var newText = args[6];
        var prevId = args[7];
        var title = args[8];
        var call = args[9];
        var callArgs = args[10];

        // Check that the page is in the wiki (e.g. it's not an interwiki link)
        if (res.parse) {
            var sections = [];

            for (var s = 0; s < res.parse.sections.length; s++) {
                sections.push(WM.Parser.squashContiguousWhitespace(
                                        res.parse.sections[s].line).trim());
            }

            var fixedFragment = fixFragment(rawfragment, sections);

            newText += source.substring(prevId, link.index);

            if (fixedFragment === true) {
                newText += link.rawLink;
            }
            else if (fixedFragment) {
                newText += "[[" + target + "#" + fixedFragment  +
                            ((link.anchor) ? "|" + link.anchor : "") + "]]";
            }
            else {
                WM.Log.logWarning("Cannot fix broken link fragment: " +
                            WM.Log.linkToWikiPage(link.link, link.rawLink));
                newText += link.rawLink;
            }

            prevId = link.index + link.length;
        }

        index++;
        WM.Plugins.FixLinkFragments.processLink(title, links, index, source,
                                            newText, prevId, call, callArgs);
    };

    var fixFragment = function (rawfragment, sections) {
        var fragment = WM.Parser.squashContiguousWhitespace(rawfragment
                                                                    ).trim();

        if (sections.indexOf(fragment) < 0) {
            for (var s = 0; s < sections.length; s++) {
                var section = sections[s];
                var dotSection = WM.Parser.dotEncode(section);
                var dotFragment = WM.Parser.dotEncode(fragment);

                if (dotSection.toLowerCase() == dotFragment.toLowerCase()) {
                    if (fragment == dotFragment) {
                        // If the fragment was encoded, re-encode it because it
                        // could contain link-breaking characters (e.g. []|{})
                        // The condition would also be true if the fragment
                        // doesn't contain any encodable characters, but since
                        // section and fragment at most differ by
                        // capitalization, encoding the section won't have any
                        // effect
                        return dotSection;
                    }
                    else {
                        // If the fragment was not encoded, if the fragment
                        // contained link-breaking characters the link was
                        // already broken, and replacing it with section
                        // wouldn't make things worse; if the fragment didn't
                        // contain link-breaking characters, the section
                        // doesn't either, since section and fragment at most
                        // differ by capitalization, so it's safe to replace it
                        // If the fragment was *partially* encoded instead, a
                        // link-breaking character may have been encoded, so
                        // all link-breaking characters must be re-encoded
                        // here!
                        return WM.Parser.dotEncodeLinkBreakingFragmentCharacters(
                                                                    section);
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    };

    this.findArchWikiLinks = function (newText, callArgs) {
        var templates = WM.Parser.findTemplates(newText, 'Related');
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, 1, 0,
                    newText, "", 0,
                    WM.Plugins.FixLinkFragments.findArchWikiLinks2, callArgs);
    };

    this.findArchWikiLinks2 = function (newText, callArgs) {
        var templates = WM.Parser.findTemplates(newText, 'Related2');
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, 2, 0,
                newText, "", 0, WM.Plugins.FixLinkFragments.mainEnd, callArgs);
    };

    this.processArchWikiLink = function (title, templates, expectedArgs, index,
                                    source, newText, prevId, call, callArgs) {
        if (templates[index]) {
            var template = templates[index];
            var args = template.arguments;

            // Don't crash in case of malformed templates
            if (args.length == expectedArgs) {
                var link = args[0].value;
                var fragId = link.indexOf('#');

                if (fragId > -1) {
                    var rawtarget = link.substring(0, fragId);
                    var target = WM.Parser.squashContiguousWhitespace(rawtarget
                                                                    ).trim();
                    var rawfragment = link.substr(fragId + 1);

                    if (rawfragment) {
                        // Note that it's impossible to recognize any
                        //   namespaces in the title without querying the
                        //   server
                        // Alternatively, a list of the known namespaces could
                        //   be maintained for each wiki
                        // Recognizing namespaces would let recognize more
                        //   liberal link syntaxes (e.g. spaces around the
                        //   colon)
                        if (!WM.Parser.compareArticleTitles(target, title)) {
                            WM.Log.logInfo("Processing " +
                                        WM.Log.linkToWikiPage(link,
                                        template.rawTransclusion) + " ...");

                            var params = {
                                'action': 'parse',
                                'prop': 'sections',
                                'page': target,
                                'redirects': 1,
                            };

                            WM.MW.callAPIGet(params,
                                 null,
                                 WM.Plugins.FixLinkFragments.processArchWikiLinkContinue,
                                 [template, target, rawfragment, templates,
                                 expectedArgs, index, source, newText,
                                 prevId, title, call, callArgs]);
                        }
                        else {
                            index++;
                            WM.Plugins.FixLinkFragments.processArchWikiLink(
                                    title, templates, expectedArgs, index,
                                    source, newText, prevId, call, callArgs);
                        }
                    }
                    else {
                        index++;
                        WM.Plugins.FixLinkFragments.processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs);
                    }
                }
                else {
                    index++;
                    WM.Plugins.FixLinkFragments.processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs);
                }
            }
            else {
                WM.Log.logWarning("Template:" + template.title +
                        " must have " + expectedArgs + " and only " +
                        expectedArgs +
                        ((expectedArgs > 1) ? " arguments: " : " argument: ") +
                        template.rawTransclusion);
                index++;
                WM.Plugins.FixLinkFragments.processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs);
            }
        }
        else {
            newText += source.substr(prevId);
            call(newText, callArgs);
        }
    };

    this.processArchWikiLinkContinue = function (res, args) {
        var template = args[0];
        var target = args[1];
        var rawfragment = args[2];
        var templates = args[3];
        var expectedArgs = args[4];
        var index = args[5];
        var source = args[6];
        var newText = args[7];
        var prevId = args[8];
        var title = args[9];
        var call = args[10];
        var callArgs = args[11];

        // Check that the page is in the wiki (e.g. it's not an interwiki link)
        if (res.parse) {
            var sections = [];

            for (var s = 0; s < res.parse.sections.length; s++) {
                sections.push(WM.Parser.squashContiguousWhitespace(
                                        res.parse.sections[s].line).trim());
            }

            var fixedFragment = fixFragment(rawfragment, sections);

            newText += source.substring(prevId, template.index);

            if (fixedFragment === true) {
                newText += template.rawTransclusion;
            }
            else if (fixedFragment) {
                var anchor = (template.arguments[1]) ? ("|" +
                                            template.arguments[1].value) : "";
                newText += "{{" + template.title + "|" + target + "#" +
                                                fixedFragment  + anchor + "}}";
            }
            else {
                WM.Log.logWarning("Cannot fix broken link fragment: " +
                    WM.Log.linkToWikiPage(target, template.rawTransclusion));
                newText += template.rawTransclusion;
            }

            prevId = template.index + template.length;
        }

        index++;
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates,
                expectedArgs, index, source, newText, prevId, call, callArgs);
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Fixing links to sections of other articles ...");
        var links = WM.Parser.findInternalLinks(source, null, null);
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processLink(title, links, 0, source, "", 0,
                        WM.Plugins.FixLinkFragments.mainContinue, callNext);
    };

    this.mainContinue = function (newText, callNext) {
        // Without this check this plugin would be specific to ArchWiki
        if (location.hostname == 'wiki.archlinux.org') {
            var templates = WM.Plugins.FixLinkFragments.findArchWikiLinks(
                                                            newText, callNext);
        }
        else {
            WM.Plugins.FixLinkFragments.mainEnd(newText, callNext);
        }
    };

    this.mainEnd = function (newText, callNext) {
        var source = WM.Editor.readSource();

        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Replaced links to sections of other articles");
        }
        else {
            WM.Log.logInfo("No fixable links to sections of other articles " +
                                                                    "found");
        }

        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.MultipleLineBreaks = new function () {
    "use strict";

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = source;

        newtext = newtext.replace(/[\n]{3,}/g, '\n\n');

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Removed multiple line breaks");
        }

        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.SimpleReplace = new function () {
    "use strict";

    var makeUI = function (id) {
        GM_addStyle("#WikiMonkey-SimpleReplace {display:inline-block;} " +
                    "#WikiMonkey-SimpleReplace div {display:inline-block;} " +
                    "#WikiMonkey-SimpleReplace input[type='text'] " +
                                                    "{margin-left:0.33em;}");

        var divMain = document.createElement('div');
        divMain.id = "WikiMonkey-SimpleReplace";

        var par1 = document.createElement('div');

        var regexpLabel = document.createElement('span');
        regexpLabel.innerHTML = 'RegExp pattern:';

        var regexp = document.createElement('input');
        regexp.setAttribute('type', 'text');
        regexp.id = "WikiMonkey-SimpleReplace-RegExp-" + id;

        var ignoreCase = document.createElement('input');
        ignoreCase.setAttribute('type', 'checkbox');
        ignoreCase.id = "WikiMonkey-SimpleReplace-IgnoreCase-" + id;

        var ignoreCaseLabel = document.createElement('span');
        ignoreCaseLabel.innerHTML = 'i';

        par1.appendChild(regexpLabel);
        par1.appendChild(regexp);
        par1.appendChild(ignoreCase);
        par1.appendChild(ignoreCaseLabel);

        var par2 = document.createElement('div');

        var newStringLabel = document.createElement('span');
        newStringLabel.innerHTML = 'New string:';

        var newString = document.createElement('input');
        newString.setAttribute('type', 'text');
        newString.id = "WikiMonkey-SimpleReplace-NewString-" + id;

        par2.appendChild(newStringLabel);
        par2.appendChild(newString);

        divMain.appendChild(par1);
        divMain.appendChild(par2);

        return divMain;
    };

    this.makeUI = function (args) {
        var id = args[0];

        var divMain = makeUI(id);

        GM_addStyle("#WikiMonkey-SimpleReplace div {margin-left:1em;}");

        return divMain;
    };

    this.makeBotUI = function (args) {
        var id = args[0];

        var divMain = makeUI(id);

        GM_addStyle("#WikiMonkey-SimpleReplace div {margin-right:2em;}");

        var par3 = document.createElement('div');

        var summaryLabel = document.createElement('span');
        summaryLabel.innerHTML = 'Edit summary:';

        var summary = document.createElement('input');
        summary.setAttribute('type', 'text');
        summary.id = "WikiMonkey-SimpleReplace-Summary-" + id;

        par3.appendChild(summaryLabel);
        par3.appendChild(summary);

        divMain.appendChild(par3);

        return divMain;
    };

    var readConfiguration = function (id) {
        return {pattern: document.getElementById(
                                "WikiMonkey-SimpleReplace-RegExp-" + id).value,
                ignoreCase: document.getElementById(
                        "WikiMonkey-SimpleReplace-IgnoreCase-" + id).checked,
                newString: document.getElementById(
                            "WikiMonkey-SimpleReplace-NewString-" + id).value,
        };
    };

    var doReplace = function (source, id) {
        var config = readConfiguration(id);
        var regexp = new RegExp(config.pattern,
                                    "g" + ((config.ignoreCase) ? "i" : ""));
        return source.replace(regexp, config.newString);
    };

    this.main = function (args, callNext) {
        var id = args[0];
        WM.Log.logHidden("Configuration: " +
                                        JSON.stringify(readConfiguration(id)));

        var source = WM.Editor.readSource();
        var newtext = doReplace(source, id);
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Text substituted");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var id = args[0];
        WM.Log.logHidden("Configuration: " +
                                        JSON.stringify(readConfiguration(id)));

        WM.MW.callQueryEdit(title,
                            WM.Plugins.SimpleReplace.mainAutoWrite,
                            [id, callBot]);
    };

    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var id = args[0];
        var callBot = args[1];

        var newtext = doReplace(source, id);

        if (newtext != source) {
            var summary = document.getElementById(
                            "WikiMonkey-SimpleReplace-Summary-" + id).value;

            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.SimpleReplace.mainAutoEnd,
                               callBot);
        }
        else {
            callBot(0, null);
        }
    };

    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(1, null);
        }
        else if (res.error) {
            WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            callBot(res.error.code, null);
        }
        else {
            callBot(false, null);
        }
    };
};

WM.UI.setEditor([
    [
        ["FixFragments", "Fix section links", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Squash multiple line breaks", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ],
    [
        ["FixLinkFragments", "Fix external section links", null]
    ]
]);

WM.UI.setDiff(null);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setRecentChanges(null);

WM.UI.setNewPages(null);

WM.UI.setSpecialList(null);

WM.main();
