// ==UserScript==
// @id wiki-monkey-archwikieditor-opera
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version development-archwikieditor-opera
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/opera/WikiMonkey-archwikieditor-opera.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/opera/WikiMonkey-archwikieditor-opera.user.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @include https://wiki.archlinux.org/*
// ==/UserScript==

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

Alib.HTTP = new function () {
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
    
    this.getURLParts = function (url) {
        var re = /^(.+?\:\/\/)([^\/]+)(.+?)(\?.+)$/i;
        var match = re.match(url);
        return {
            protocol: match[1],
            hostname: match[2],
            path: match[3],
            query: match[4],
        };
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
        return string.replace(/[-[\]{}()*+?.,:!=\\^$|#\s]/g, "\\$&");
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
};

if (!Alib) var Alib = {};

Alib.Str = new function () {
    this.insert = function (string, newString, id) {
        if (!id) id = 0;
        return string.substring(0, id) + newString + string.substr(id);
    };
    
    this.overwriteAt = function (string, newString, id) {
        if (!id) id = 0;
        return string.substring(0, id) + newString + string.substr(id + newString.length);
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
    
    this.overwriteFor = function (string, newString, id, length) {
        if (!id) id = 0;
        if (!length || length < 0) length = 0;
        return string.substring(0, id) + newString + string.substr(id + length);
    };
    
    this.removeBetween = function (string, id1, id2) {
        return this.overwriteBetween(string, "", id1, id2);
    };
    
    this.removeFor = function (string, id, length) {
        return this.overwriteFor(string, "", id, length);
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
};

var WM = new function () {
    this.Plugins = {};
    
    this.main = function () {
        this.MW._storeUserInfo(WM.UI._makeUI);
    };
};

WM.ArchWiki = new function () {
    var namespaces = {
        "Media": -2,
        "Special": -1,
        "": 0,
        "Talk": 1,
        "User": 2,
        "User talk": 3,
        "ArchWiki": 4,
        "ArchWiki talk": 5,
        "File": 6,
        "File talk": 7,
        "MediaWiki": 8,
        "MediaWiki talk": 9,
        "Template": 10,
        "Template talk": 11,
        "Help": 12,
        "Help talk": 13,
        "Category": 14,
        "Category talk": 15,
    };
    
    var languages = {
        local: "English",
        names: {
            "Български": {subtag: "bg", english: "Bulgarian"},
            "Česky": {subtag: "cs", english: "Czech"},
            "Dansk": {subtag: "da", english: "Danish"},
            "Deutsch": {subtag: "de", english: "German"},
            "Ελληνικά": {subtag: "el", english: "Greek"},
            "English": {subtag: "en", english: "English"},
            "Español": {subtag: "es", english: "Spanish"},
            "فارسی": {subtag: "fa", english: "Persian"},
            "Suomi": {subtag: "fi", english: "Finnish"},
            "Français": {subtag: "fr", english: "French"},
            "עברית": {subtag: "he", english: "Hebrew"},
            "Hrvatski": {subtag: "hr", english: "Croatian"},
            "Magyar": {subtag: "hu", english: "Hungarian"},
            "Indonesia": {subtag: "id", english: "Indonesian"},
            "Italiano": {subtag: "it", english: "Italian"},
            "日本語": {subtag: "ja", english: "Japanese"},
            "한국어": {subtag: "ko", english: "Korean"},
            "Lietuviškai": {subtag: "lt", english: "Lithuanian"},
            "Nederlands": {subtag: "nl", english: "Dutch"},
            "Polski": {subtag: "pl", english: "Polish"},
            "Português": {subtag: "pt", english: "Portuguese"},
            "Română": {subtag: "ro", english: "Romanian"},
            "Русский": {subtag: "ru", english: "Russian"},
            "Slovenský": {subtag: "sk", english: "Slovak"},
            "Српски": {subtag: "sr", english: "Serbian"},
            "Svenska": {subtag: "sv", english: "Swedish"},
            "ไทย": {subtag: "th", english: "Thai"},
            "Türkçe": {subtag: "tr", english: "Turkish"},
            "Українська": {subtag: "uk", english: "Ukrainian"},
            "简体中文": {subtag: "zh-CN", english: "Chinese (Simplified)"},
            "正體中文": {subtag: "zh-TW", english: "Chinese (Traditional)"}
        },
        categories: [
            "Български",
            "Česky",
            "Dansk",
            "Ελληνικά",
            "English",
            "Español",
            "Suomi",
            "Français",
            "עברית",
            "Hrvatski",
            "Magyar",
            "Indonesia",
            "Italiano",
            "日本語",
            "한국어",
            "Lietuviškai",
            "Nederlands",
            "Polski",
            "Português",
            "Русский",
            "Slovenský",
            "Српски",
            "Svenska",
            "ไทย",
            "Українська",
            "简体中文",
            "正體中文"
        ],
        i18n: [
            "Български",
            "Česky",
            "Dansk",
            "Ελληνικά",
            "English",
            "Español",
            "עברית",
            "Hrvatski",
            "Magyar",
            "Indonesia",
            "Italiano",
            "日本語",
            "한국어",
            "Lietuviškai",
            "Nederlands",
            "Polski",
            "Português",
            "Русский",
            "Slovenský",
            "Српски",
            "Svenska",
            "ไทย",
            "Українська",
            "简体中文",
            "正體中文"
        ],
        interwiki: {
            all: ["de", "en", "es", "fa", "fi", "fr", "pl", "pt-br", "ro",
                  "sv", "tr", "uk"],
            alive: ["de", "en", "fa", "fi", "fr", "ro", "sv", "tr"],
            dead: ["es", "pl", "pt-br", "uk"],
            languages: {
                "Deutsch": "de",
                "English": "en",
                "Español": "es",
                "فارسی": "fa",
                "Suomi": "fi",
                "Français": "fr",
                "Polski": "pl",
                "Português": "pt-br",
                "Română": "ro",
                "Svenska": "sv",
                "Türkçe": "tr",
                "Українська": "uk",
                
            }
        }
    };
    
    this.getNamespaceId = function (name) {
        return namespaces[name];
    };
    
    this.getLocalLanguage = function () {
        return languages.local;
    };
    
    this.getCategoryLanguages = function () {
        return languages.categories;
    };
    
    this.isCategoryLanguage = function (lang) {
        return languages.categories.indexOf(lang) > -1;
    };
    
    this.getI18nLanguages = function () {
        return languages.i18n;
    };
    
    this.isI18nLanguage = function (lang) {
        return languages.i18n.indexOf(lang) > -1;
    };
    
    this.getInterwikiLanguages = function () {
        return languages.interwiki.all;
    };
    
    this.isInterwikiLanguage = function (lang) {
        return languages.interwiki.all.indexOf(lang) > -1;
    };
    
    this.getAliveInterwikiLanguages = function () {
        return languages.interwiki.alive;
    };
    
    this.isAliveInterwikiLanguage = function (lang) {
        return languages.interwiki.alive.indexOf(lang) > -1;
    };
    
    this.getDeadInterwikiLanguages = function () {
        return languages.interwiki.dead;
    };
    
    this.isDeadInterwikiLanguage = function (lang) {
        return languages.interwiki.dead.indexOf(lang) > -1;
    };
    
    this.getInterlanguageTag = function (language) {
        return languages.interwiki.languages[language];
    };
        
    this.detectLanguage = function (title) {
        var matches = title.match(/^(.+?)([ _]\(([^\(]+)\))?$/);
        var detectedLanguage = matches[3];
        var pureTitle;
        if (!detectedLanguage || !WM.ArchWiki.isCategoryLanguage(detectedLanguage)) {
            // Language categories are exceptions
            var testLangCat = matches[1].match(/^ *[Cc]ategory *: *(.+?) *$/);
            if (testLangCat && WM.ArchWiki.isCategoryLanguage(testLangCat[1])) {
                detectedLanguage = testLangCat[1];
                pureTitle = matches[1];
            }
            else {
                detectedLanguage = languages.local;
                pureTitle = matches[0];
            }
        }
        else {
            pureTitle = matches[1];
        }
        return [pureTitle, detectedLanguage];
    };
    
    this.findAllInterlanguageLinks = function (source) {
        // See also WM.Parser.findInterlanguageLinks!!!
        var interwikiLanguages = this.getInterwikiLanguages();
        return WM.Parser.findSpecialLinks(source, interwikiLanguages.join("|"));
    };
};

WM.Bot = new function () {
    this._makeUI = function (functions, lists) {
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyBot';
        
        GM_addStyle("#WikiMonkeyBot-PluginSelect {width:100%; margin-bottom:1em;} " +
                    "#WikiMonkeyBot-ListSelect {margin-bottom:1em;} " +
                    "#WikiMonkeyBotFilter {height:6em; margin-bottom:1em; resize:vertical;} " +
                    "#WikiMonkeyBotStart, #WikiMonkeyBotStop {margin-right:0.33em; margin-bottom:1em; font-weight:bold;} " +
                    "a.WikiMonkeyBotSelected {background-color:#faa; padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotProcessing {background-color:#ff8; padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotProcessed {background-color:#afa; padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotFailed {background-color:orangered; padding:0.2em 0.4em;}");
        
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
        
        for (var f in functions) {
            option = document.createElement('option');
            option.innerHTML = functions[f][1];
            selectFunctions.appendChild(option);
        }
        
        selectFunctions.addEventListener("change", (function (fns) {
            return function () {
                var select = document.getElementById('WikiMonkeyBot-PluginSelect');
                var id = select.selectedIndex;
                var UI = document.getElementById('WikiMonkeyBotFunction');
                // [1] Note that this must also be executed immediately, see [2]
                var makeUI = eval("WM.Plugins." + fns[id][0] + ".makeBotUI");
                if (makeUI instanceof Function) {
                    UI.replaceChild(makeUI(fns[id][2]), UI.firstChild);
                }
                else {
                    // Don't removeChild, otherwise if another plugin with
                    // interface is selected, replaceChild won't work
                    UI.replaceChild(document.createElement('div'), UI.firstChild);
                }
                WM.Bot.selections.function_ = function (title, callContinue) {
                    eval("WM.Plugins." + fns[id][0] + ".mainAuto")(fns[id][2], title, callContinue);
                };
            }
        })(functions), false);
        
        var divFunction = document.createElement('div');
        divFunction.id = "WikiMonkeyBotFunction";
        
        // [2] Note that this is also executed onchange, see [1]
        var makeUI = eval("WM.Plugins." + functions[0][0] + ".makeBotUI");
        if (makeUI instanceof Function) {
            divFunction.appendChild(makeUI(functions[0][2]));
        }
        else {
            divFunction.appendChild(document.createElement('div'));
        }
        // Don't use "this.selections"
        WM.Bot.selections.function_ = function (title, callContinue) {
            eval("WM.Plugins." + functions[0][0] + ".mainAuto")(functions[0][2], title, callContinue);
        };
        
        fieldset.appendChild(legend);
        fieldset.appendChild(selectFunctions);
        fieldset.appendChild(divFunction);
        
        return fieldset;
    };
    
    this.selections = {function_: function () {},
                       list: {current: null,
                              previous: null}};
    
    var makeListSelector = function (lists) {
        var selectLists = document.createElement('select');
        selectLists.id = 'WikiMonkeyBot-ListSelect';
        
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
                var select = document.getElementById('WikiMonkeyBot-ListSelect');
                var id = select.selectedIndex;
                WM.Bot.selections.list.previous = WM.Bot.selections.list.current;
                // [2] Note that this must also be executed immediately, see [1]
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
        
        var inverse = document.createElement('input');
        inverse.type = 'checkbox';
        inverse.id = 'WikiMonkeyBotInverse';
        
        var elems = [filter, inverse];
        
        for (var e in elems) {
            elems[e].addEventListener("change", function () {
                WM.Bot._disableStartBot('Filters have changed, preview the selection');
            }, false);
        }
        
        var inversetag = document.createElement('span');
        inversetag.innerHTML = 'Inverse';
        
        preview.addEventListener("click", WM.Bot._previewFilter, false);
        
        fieldset.appendChild(legend);
        if (listSelect.length > 1) {
            fieldset.appendChild(listSelect);
        }
        fieldset.appendChild(filter);
        fieldset.appendChild(preview);
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
        forceStartLabel.innerHTML = 'Force start, stopping the currently running bot';
        
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
        var fsets = document.getElementById('WikiMonkeyBot').getElementsByTagName('fieldset');
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
        return document.getElementById('WikiMonkeyBotForceStart').getElementsByTagName('input')[0].checked;
    };
    
    var canProcessPage = function (title) {
        var rules = document.getElementById('WikiMonkeyBotFilter').value.split('\n');
        var inverse = document.getElementById('WikiMonkeyBotInverse').checked;
        var response = (inverse) ? true : false;
        var rule, firstSlash, lastSlash, pattern, modifiers, regexp, test, negative;
        for (var r in rules) {
            rule = rules[r];
            if (rule) {
                firstSlash = rule.indexOf('/');
                lastSlash = rule.lastIndexOf('/');
                pattern = rule.substring(firstSlash + 1, lastSlash);
                modifiers = rule.substring(lastSlash + 1);
                negative = rule.charAt(0) == '!';
                try {
                    regexp = new RegExp(pattern, modifiers);
                }
                catch (exc) {
                    WM.Log.logError('Invalid regexp: ' + exc);
                    break;
                }
                test = regexp.test(title);
                if (!negative != !test) {
                    response = (inverse) ? false : true;
                    // Do not break, so that if among the rules there's
                    // an invalid regexp the function returns false
                }
            }
        }
        return response;
    };
    
    this._previewFilter = function () {
        WM.Log.logInfo('Updating filter preview, please wait...');
        WM.Bot._disableStartBot('Updating filter preview...');
        
        var items, linkId, link;
        
        if (WM.Bot.selections.list.previous) {
            items = WM.Bot.selections.list.previous[0].getElementsByTagName('li');
            linkId = WM.Bot.selections.list.previous[1];
            for (var i = 0; i < items.length; i++) {
                link = items[i].getElementsByTagName('a')[linkId];
                link.className = '';
            }
        }
        
        items = WM.Bot.selections.list.current[0].getElementsByTagName('li');
        linkId = WM.Bot.selections.list.current[1];
        var enable = false;
        var N = 0;
        for (var i = 0; i < items.length; i++) {
            link = items[i].getElementsByTagName('a')[linkId];
            if (canProcessPage(link.title)) {
                link.className = 'WikiMonkeyBotSelected';
                enable = true;
                N++;
            }
            else {
                link.className = '';
            }
        }
        WM.Log.logInfo('Preview updated (' + N + ' pages selected)');
        (enable) ? WM.Bot._enableStartBot() : WM.Bot._disableStartBot('No pages selected, reset and preview the filter');
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
        GMValue = GM_getValue('BotToken', "0");
        return (GMValue != "0") && (GMValue != this._getBotToken());
    };
    
    this._startAutomatic = function () {
        var items = WM.Bot.selections.list.current[0].getElementsByTagName('li');
        var linkId = WM.Bot.selections.list.current[1];
        if (WM.Bot._checkOtherBotsRunning() && !WM.Bot._canForceStart()) {
            WM.Log.logError('Another bot is running, aborting...');
            WM.Bot._enableForceStart();
        }
        else {
            WM.Bot._disableForceStart();
            WM.Bot._setBotToken();
            WM.Log.logInfo('Starting bot...');
            WM.Bot._disableStartBot('Bot is running...');
            WM.Bot._disableControls();
            WM.Bot._processItem(items, 0, linkId);
        }
    };
    
    this._processItem = function (items, index, linkId) {
        var interval;
        if (WM.MW.isUserBot()) {
            interval = 10000;
        }
        else {
            interval = 90000;
        }
        
        if (items[index]) {
            var link = items[index].getElementsByTagName('a')[linkId];
            var title = link.title;
            if (canProcessPage(title)) {
                WM.Log.logInfo('Waiting ' + (interval / 1000) + ' seconds...');
                var stopId = setTimeout((function (lis, id, ln, article) {
                    return function () {
                        // Stop must be disabled before any check is performed
                        WM.Bot._disableStopBot();
                        // Check here if other bots have been started,
                        // _not_ before setTimeout! 
                        if (!WM.Bot._checkOtherBotsRunning()) {
                            ln.className = "WikiMonkeyBotProcessing";
                            WM.Log.logInfo("Processing " + article + "...");
                            WM.Bot.selections.function_(article, function (res) {
                                if (res === true) {
                                    ln.className = "WikiMonkeyBotProcessed";
                                    WM.Log.logInfo(article + " processed");
                                    // Do not increment directly in the function's call!
                                    id++;
                                    WM.Bot._processItem(lis, id, linkId);
                                }
                                else {
                                    ln.className = "WikiMonkeyBotFailed";
                                    WM.Log.logError("Error processing " + article + ", stopping the bot");
                                    WM.Bot._endAutomatic(true);
                                }
                            });
                        }
                        else {
                            WM.Log.logError('Another bot has been force-started, stopping...');
                            WM.Bot._endAutomatic(false);
                        }
                    };
                })(items, index, link, title), interval);
                this._enableStopBot(stopId);
            }
            else {
                // Do not increment directly in the function's call!
                index++;
                WM.Bot._processItem(items, index, linkId);
            }
        }
        else {
            this._endAutomatic(true);
        }
    };
    
    this._endAutomatic = function (reset) {
        this._resetBotToken(reset);
        WM.Log.logInfo('Bot operations completed (check the log for warnings or errors)');
        this._disableStartBot('Bot operations completed, reset and preview the filter');
        this._reEnableControls();
    };
};

WM.Cat = new function () {
    this.recurseTree = function (params) {
        params.callChildren = WM.Cat._recurseTreeCallChildren;
        Alib.Async.recurseTreeAsync(params);
    };
    
    this.recurseTreeContinue = function (params) {
        Alib.Async.recurseTreeAsync(params);
    };
    
    this._recurseTreeCallChildren = function (params) {
        WM.Cat.getSubCategories(params.node, WM.Cat._recurseTreeCallChildrenContinue, params);
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
        WM.MW.callAPIGet(query, null, function (res) {
            members = members.concat(res.query.categorymembers);
            if (res["query-continue"]) {
                query.cmcontinue = res["query-continue"].categorymembers.cmcontinue;
                this._getMembersContinue(query, call, callArgs, members);
            }
            else {
                call(members, callArgs);
            }
        });
    };
    
    this.getParents = function (name, call, callArgs) {
        var query = {action: "query",
                     prop: "categories",
                     titles: name,
                     cllimit: 500};
        
        this._getParentsContinue(query, call, callArgs, []);
    };
    
    this._getParentsContinue = function (query, call, callArgs, parents) {
        WM.MW.callAPIGet(query, null, function (res) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            
            if (page.categories) {
                parents = parents.concat(page.categories);
            }
            
            if (res["query-continue"]) {
                query.clcontinue = res["query-continue"].categories.clcontinue;
                this._getParentsContinue(query, call, callArgs, parents);
            }
            else {
                var parentTitles = [];
                
                for (var par in parents) {
                    parentTitles.push(parents[par].title);
                }
                
                call(parentTitles, callArgs);
            }
        });
    };
    
    this.getInfo = function (name, call, callArgs) {
        WM.MW.callQuery({prop: "categoryinfo",
                         titles: name},
                         WM.Cat._getInfoContinue,
                         [call, callArgs]);
    };
    
    this._getInfoContinue = function (page, args) {
        args[0](page.categoryinfo, args[1]);
    };
};

WM.Diff = new function () {
    this.getEndTimestamp = function (call, callArgs) {
        var title = Alib.HTTP.getURIParameter('title');
        var diff = Alib.HTTP.getURIParameter('diff');
        var oldid = Alib.HTTP.getURIParameter('oldid');
        
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
    this.getTitle = function () {
        return WM.Parser.convertUnderscoresToSpaces(decodeURIComponent(Alib.HTTP.getURIParameter('title')));
    };
    
    this.isSection = function () {
        return (Alib.HTTP.getURIParameter('section')) ? true : false;
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
        document.getElementById('wpSummary').setAttribute("value", this.readSummary() + text);
    };
};

WM.Interlanguage = new function () {
    this.parseLinks = function (whitelist, source, iwmap) {
        var parsedLinks = WM.Parser.findSpecialLinks(
            source,
            whitelist.join("|")
        );
        
        var langlinks = [];
        for (var p in parsedLinks) {
            var link = parsedLinks[p];
            var ltag = link.match[2];
            var ltitle = link.match[3];
            for (var iw in iwmap) {
                if (iwmap[iw].prefix == ltag) {
                    var lurl = iwmap[iw].url.replace("$1", WM.Parser.convertSpacesToUnderscores(ltitle));
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
    
    this.queryLinks = function (api, title, whitelist, callEnd, callArgs) {
        WM.MW.callAPIGet(
            {
                action: "query",
                prop: "info|revisions",
                rvprop: "content|timestamp",
                intoken: "edit",
                titles: title,
                redirects: "1",
                meta: "siteinfo",
                siprop: "interwikimap",
                sifilteriw: "local",
            },
            api,
            function (res, args) {
                var page = Alib.Obj.getFirstItem(res.query.pages);
                if (page.revisions) {
                    var source = page.revisions[0]["*"];
                    var timestamp = page.revisions[0].timestamp;
                    var edittoken = page.edittoken;
                    var iwmap = res.query.interwikimap;
                    var langlinks = WM.Interlanguage.parseLinks(whitelist, source, iwmap);
                }
                else {
                    // The requested article doesn't exist
                    var source = "missing";
                    var timestamp = null;
                    var edittoken = null;
                    var iwmap = res.query.interwikimap;
                    var langlinks = "missing";
                }
                
                callEnd(
                    api,
                    title,
                    whitelist,
                    langlinks,
                    iwmap,
                    source,
                    timestamp,
                    edittoken,
                    callArgs
                );
            }
        );
    };
    
    this.createNewLink = function (title, url) {
        return {
            title: title,
            url: url,
        };
    };
    
    this.createVisitedLink = function (title, url, iwmap, api, source, timestamp, edittoken, links) {
        var entry = {
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
    
    this.collectLinks = function (visitedlinks, newlinks, whitelist, error, callEnd, callArgs) {
        // If error is "missing" it should be possible to continue safely
        if (error != "conflict") {
            for (var tag in newlinks) {
                var link = newlinks[tag];
                break;
            }
            
            if (link) {
                var title = link.title;
                var url = link.url;
                var api = WM.MW.getWikiPaths(url).api;
                
                delete newlinks[tag];
                
                WM.Log.logInfo("Reading " + url + "...");
                
                this.queryLinks(
                    api,
                    title,
                    whitelist,
                    WM.Interlanguage.collectLinksContinue,
                    [url, tag, visitedlinks, newlinks, callEnd, callArgs]
                );
            }
            else {
                callEnd(visitedlinks, callArgs);
            }
        }
        else {
            callEnd(error, callArgs);
        }
    };
    
    this.collectLinksContinue = function (api, title, whitelist, langlinks, iwmap, source, timestamp, edittoken, args) {
        var url = args[0];
        var tag = args[1];
        var visitedlinks = args[2];
        var newlinks = args[3];
        var callEnd = args[4];
        var callArgs = args[5];
            
        var error = "";
        
        if (langlinks != "missing") {
            visitedlinks[tag] = WM.Interlanguage.createVisitedLink(title, url, iwmap, api, source, timestamp, edittoken, langlinks);
            
            for (var l in langlinks) {
                var link = langlinks[l];
                if (!visitedlinks[link.lang] && !newlinks[link.lang]) {
                    newlinks[link.lang] = WM.Interlanguage.createNewLink(link.title, link.url);
                }
                else if ((visitedlinks[link.lang] && visitedlinks[link.lang].url != link.url) ||
                         (newlinks[link.lang] && newlinks[link.lang].url != link.url)) {
                    error = "conflict";
                    WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link.title + "]]");
                    break;
                }
            }
        }
        else {
            error = "missing";
            WM.Log.logWarning("[[" + tag + ":" + title + "]] seems to point to a non-existing article, removing it");
        }
        
        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            whitelist,
            error,
            callEnd,
            callArgs
        );
    };
    
    this.updateLinks = function (lang, url, iwmap, source, oldlinks, newlinks) {
        var linkList = "";
        
        for (var tag in newlinks) {
            if (tag != lang) {
                var link = newlinks[tag];
                var tagFound = false;
                for (var iw in iwmap) {
                    if (iwmap[iw].prefix == tag) {
                        if (WM.MW.getWikiPaths(iwmap[iw].url).api == link.api) {
                            linkList += "[[" + tag + ":" + link.title + "]]\n";
                        }
                        else {
                            WM.Log.logWarning("On " + url + ", " + tag + " interlanguage links point to a different wiki than the others, ignoring them");
                        }
                        tagFound = true;
                        break;
                    }
                }
                if (!tagFound) {
                    WM.Log.logWarning(tag + " interlanguage links are not supported in " + url + ", ignoring them");
                }
            }
        }
        
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
        
        var part1 = cleanText.substring(0, firstLink);
        var part2a = cleanText.substr(firstLink);
        var firstChar = part2a.search(/[^\s]/);
        var part2b = part2a.substr(firstChar);
        
        var newText = part1 + linkList + part2b;
        
        return newText;
    };
};

WM.Log = new function () {
    this._makeLogArea = function () {
        log = document.createElement('div');
        log.id = 'WikiMonkeyLog';
        
        GM_addStyle("#WikiMonkeyLog {height:10em; border:2px solid #07b; padding:0.5em; overflow:auto; resize:vertical; background-color:#111;} " +
                    "#WikiMonkeyLog pre.timestamp, #WikiMonkeyLog pre.message {overflow:hidden; resize:none;} " +
                    "#WikiMonkeyLog pre.timestamp {float:left; width:5em; margin:0; border:none; padding:0; font-size:0.9em; color:#eee; background-color:transparent;} " +
                    "#WikiMonkeyLog pre.message {margin:0 0 0.5em 5em; border:none; padding:0; color:#eee; background-color:transparent;} " +
                    "#WikiMonkeyLog pre.mdebug {color:cyan;} " +
                    // The .warning and .error classes are already used by
                    // MediaWiki, without associating them with an id and a tag
                    "#WikiMonkeyLog pre.mwarning {color:gold;} " +
                    "#WikiMonkeyLog pre.merror {color:red;}");
        
        return log;
    };
    
    var appendMessage = function (text, type) {
        var tstamp = document.createElement('pre');
        tstamp.className = 'timestamp';
        var now = new Date();
        tstamp.innerHTML = now.toLocaleTimeString();
        
        var msg = document.createElement('pre');
        msg.className = 'message' + ((type) ? " " + type : "");
        // Do not allow the empty string, otherwise the resulting html element
        // may not be rendered by the browser
        msg.innerHTML = (text) ? text : " ";
        
        var line = document.createElement('div');
        line.appendChild(tstamp);
        line.appendChild(msg);
        
        var log = document.getElementById('WikiMonkeyLog');
        
        test = log.scrollTop + log.clientHeight == log.scrollHeight;
        
        log.appendChild(line);
        
        if (test) {
            log.scrollTop = log.scrollHeight - log.clientHeight;
        }
    };
    
    this.logDebug = function (text) {
        appendMessage(text, 'mdebug');
    };
    
    this.logInfo = function (text) {
        appendMessage(text);
    };
    
    this.logWarning = function (text) {
        appendMessage(text, 'mwarning');
    };
    
    this.logError = function (text) {
        appendMessage(text, 'merror');
    };
};

WM.MW = new function () {
    var wikiPaths = {
        known: {
            "^https?://[^\.]+\.wikipedia\.org": {
                articles: "/wiki/",
                api: "/w/api.php"
            },
            "^https?://wiki\.archlinux\.org": {
                articles: "/index.php/",
                api: "/api.php"
            },
            "^https?://wiki\.archlinux\.de": {
                articles: "/title/",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.fr": {
                articles: "/",
                api: "/api.php"
            },
            "^http://wiki\.archlinux\.ro": {
                articles: "/index.php/",
                api: "/api.php"
            },
            "^http://(?:www\.)?archlinux\.fi": {
                articles: "/wiki/",
                api: "/w/api.php"
            },
            "^http://wiki\.archlinux\.se": {
                articles: "/index.php?title=",
                api: "/api.php"
            },
            "^http://(?:www\.)?archtr\.org": {
                articles: "/index.php?title=",
                api: "/wiki/api.php"
            },
            "^http://wiki\.archlinux\.ir": {
                articles: "/index.php/",
                api: "/api.php"
            },
        },
        default_: {
            articles: "/index.php?title=",
            api: "/api.php"
        },
        local: {},
    };
    
    var getWikiPaths = function (href) {
        // It's necessary to keep this function in a private attribute,
        // otherwise wikiPaths.local cannot be initialized
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
                var hostname = Alib.HTTP.getURLParts(href).hostname;
                var paths = {};
                for (var p in wikiPaths.default_) {
                    paths[p] = wikiPaths.default_[p];
                }
            }
            for (var key in paths) {
                paths[key] = hostname + paths[key];
            }
        }
        else {
            var paths = {};
            for (var p in wikiPaths.local) {
                paths[p] = wikiPaths.local[p];
            }
        }
        return paths;
    };
    
    wikiPaths.local = (function () {
        return getWikiPaths(location.href);
    })();
    
    this.getWikiPaths = function (href) {
        return getWikiPaths(href);
    };
    
    this.callAPIGet = function (params, api, call, callArgs) {
        if (!api) {
            api = wikiPaths.local.api;
        }
        var query = {
            method: "GET",
            url: api + "?format=json" + joinParams(params),
            onload: function (res) {
                try {
                    // Currently only Scriptish supports the responseJSON method
                    var json = (res.responseJSON) ? res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("It is likely that the API for this wiki is disabled, see " + api);
                }
                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be catched printing the same API error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError("Failed query: " + res.finalUrl + "\nYou may " +
                                "have tried to use a plugin which requires " +
                                "cross-origin HTTP requests, but you are not " +
                                "using Scriptish (Firefox), Greasemonkey " +
                                "(Firefox), Tampermonkey (Chrome/Chromium) " +
                                "or a similar extension");
            }
        };
        
        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError("Failed HTTP request - " + err + "\nYou may have " +
                            "tried to use a plugin which requires cross-origin " +
                            "HTTP requests, but you are not using Scriptish " +
                            "(Firefox), Greasemonkey (Firefox), Tampermonkey " +
                            "(Chrome/Chromium) or a similar extension");
        }
    };
    
    this.callAPIPost = function (params, api, call, callArgs) {
        if (!api) {
            api = wikiPaths.local.api;
        }
        var query = {
            method: "POST",
            url: api,
            onload: function (res) {
                try {
                    // Currently only Scriptish supports the responseJSON method
                    var json = (res.responseJSON) ? res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("It is likely that the API for this wiki is disabled, see " + api);
                }
                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be catched printing the same API error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError("Failed query: " + res.finalUrl + "\nYou may " +
                                "have tried to use a plugin which requires " +
                                "cross-origin HTTP requests, but you are not " +
                                "using Scriptish (Firefox), Greasemonkey " +
                                "(Firefox), Tampermonkey (Chrome/Chromium) " +
                                "or a similar extension");
            }
        };
        
        var string = "format=json" + joinParams(params);
        
        // It's necessary to use try...catch because some browsers don't
        // support FormData yet and will throw an exception
        try {
            // Temporarily disable multipart/form-data requests ******************
            // because Tampermonkey doesn't support them, see ********************
            // http://forum.tampermonkey.net/viewtopic.php?f=17&t=271 ************
            throw "Temporarily disabled, see bug #91";  // ***********************
            
            if (string.length > 8000) {
                query.data = new FormData();
                query.data.append("format", "json");
                for (var p in params) {
                    query.data.append(p, params[p]);
                }
                // Do not add "multipart/form-data" explicitly or the query will fail
                //query.headers = {"Content-type": "multipart/form-data"};
            }
            else {
                throw "string < 8000 characters";
            }
        }
        catch (err) {
            query.data = string;
            query.headers = {"Content-type": "application/x-www-form-urlencoded"};
        }
        
        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError("Failed HTTP request - " + err + "\nYou may have " +
                            "tried to use a plugin which requires cross-origin " +
                            "HTTP requests, but you are not using Scriptish " +
                            "(Firefox), Greasemonkey (Firefox), Tampermonkey " +
                            "(Chrome/Chromium) or a similar extension");
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
        var callBack = function (res) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            call(page, callArgs);
        };
        this.callAPIGet(params, null, callBack);
    };
    
    this.callQueryEdit = function (title, call, callArgs) {
        var callBack = function (page, args) {
            source = page.revisions[0]["*"];
            timestamp = page.revisions[0].timestamp;
            edittoken = page.edittoken;
            call(title, source, timestamp, edittoken, callArgs);
        };
        this.callQuery({prop: "info|revisions",
                        rvprop: "content|timestamp",
                        intoken: "edit",
                        titles: title},
                        callBack);
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
        WM.MW.callAPIGet(query, null, function (res) {
            backlinks = backlinks.concat(res.query.backlinks);
            if (res["query-continue"]) {
                query.blcontinue = res["query-continue"].backlinks.blcontinue;
                this._getBacklinksContinue(query, call, callArgs, backlinks);
            }
            else {
                call(backlinks, callArgs);
            }
        });
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
    
    this._getLanglinksContinue = function (query, call, callArgs, langlinks, iwmap) {
        WM.MW.callAPIGet(query, null, function (res) {
            var page = Alib.Obj.getFirstItem(res.query.pages);
            langlinks = langlinks.concat(page.langlinks);
            iwmap = res.query.interwikimap;
            
            if (query.meta) {
                delete query.meta;
                delete query.siprop;
                delete query.sifilteriw;
            }
            
            if (res["query-continue"]) {
                query.llcontinue = res["query-continue"].langlinks.llcontinue;
                this._getLanglinksContinue(query, call, callArgs, langlinks, iwmap);
            }
            else {
                call(langlinks, iwmap, callArgs);
            }
        });
    };
    
    this.getInterwikiMap = function (title, call, callArgs) {
        var query = 
        
        WM.MW.callAPIGet(
            {
                action: "query",
                meta: "siteinfo",
                siprop: "interwikimap",
                sifilteriw: "local",
            },
            null,
            function (res) {
                call(res.query.interwikimap, callArgs);
            }
        );
    };
};

WM.Parser = new function () {
    this.convertUnderscoresToSpaces = function (title) {
        return title.replace(/_/g, " ");
    };
    
    this.convertSpacesToUnderscores = function (title) {
        return title.replace(/ /g, "_");
    };
    
    this.neutralizeNowikiTags = function (source) {
        // /<nowiki>[.\s]+?<\/nowiki>/gi doesn't work
        var tags = Alib.RegEx.matchAll(source, /<nowiki>(.?\s?)+?<\/nowiki>/gi);
        for (var t in tags) {
            var filler = Alib.Str.padRight("", "x", tags[t].length);
            source = Alib.Str.overwriteAt(source, filler, tags[t].index);
        }
        return source;
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
    
    this.findBehaviorSwitches = function (source, word) {
        source = this.neutralizeNowikiTags(source);
        var regExp;
        if (word) {
            // Behavior switches aren't case-sensitive
            regExp = new RegExp("__" + Alib.RegEx.escapePattern(word) + "__", "gi");
        }
        else {
            // Behavior switches aren't case-sensitive
            regExp = /__(TOC|NOTOC|FORCETOC|NOEDITSECTION|NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|NOINDEX|STATICREDIRECT|START|END)__/gi;
        }
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findInternalLinks = function (source, namespace) {
        source = this.neutralizeNowikiTags(source);
        var regExp;
        if (namespace) {
            // Namespaces aren't case-sensitive
            regExp = new RegExp("\\[\\[:?[ _]*:?[ _]*((" + Alib.RegEx.escapePattern(namespace) + ")[ _]*:[ _]*(.+?)(?:[ _]*\\|\\s*(.+?))?)\\s*\\]\\]", "gi");
        }
        else {
            // Namespaces aren't case-sensitive
            regExp = /\[\[:?[ _]*:?[ _]*((?:(.+?)[ _]*:[ _]*)?(.+?)(?:[ _]*\|\s*(.+?))?)\s*\]\]/gi;
        }
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findInterwikiLinks = function (source, wiki) {
        return this.findInternalLinks(source, wiki);
    };
    
    this.findSpecialLinks = function (source, pattern) {
        // See also WM.ArchWiki.findAllInterlanguageLinks!!!
        source = this.neutralizeNowikiTags(source);
        // Categories and language tags aren't case-sensitive
        var regExp = new RegExp("\\[\\[(?:[ _]+:)?[ _]*((?:(" + pattern + ")[ _]*:[ _]*)(.+?)(?:[ _]*\\|\\s*(.+?))?)\\s*\\]\\]", "gi");
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findCategories = function (source) {
        return this.findSpecialLinks(source, "Category");
    };
    
    this.findInterlanguageLinks = function (source, language) {
        // See also WM.ArchWiki.findAllInterlanguageLinks!!!
        return this.findSpecialLinks(source, Alib.RegEx.escapePattern(language));
    };
    
    this.findVariables = function (source, variable) {
        source = this.neutralizeNowikiTags(source);
        // Variables are case-sensitive
        // There can't be an underscore before the variable name
        // There can't be a whitespace between the variable name and the colon
        var regExp = new RegExp("\\{\\{\\s*((" + Alib.RegEx.escapePattern(variable) + ")(?:\\:[_\\s]*((?:.(?!\\{\\{)[_\\s]*?)+?))?)[_\\s]*\\}\\}", "g");
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    var findTransclusionsEngine = function (source, regExp) {
        var nSource = WM.Parser.neutralizeNowikiTags(source);
        var transclusions = [];
        
        do {
            var res = Alib.RegEx.matchAll(nSource, regExp);
            
            for (var t in res) {
                var match = res[t].match;
                var index = res[t].index;
                var L = res[t].length;
                var arguments = [];
                if (match[3]) {
                    var args = match[3].split("|");
                    // 1 is the length of |
                    var argId = index + match[1].length + 1;
                    
                    for (var a in args) {
                        var argL = args[a].length;
                        var eqId = args[a].indexOf("=");
                        // eqId must be > 0, not -1, in fact the key must not be empty
                        if (eqId > 0) {
                            var rawKey = args[a].substring(0, eqId);
                            var reKey = /^(\s*)(.+?)\s*$/;
                            var keyMatches = reKey.exec(rawKey);
                            var key = keyMatches[2];
                            var keyId = argId + ((keyMatches[1]) ? keyMatches[1].length : 0);
                            
                            // 1 is the length of =
                            var nValue = args[a].substr(eqId + 1);
                            var valueId = argId + keyMatches[0].length + 1;
                            var valueL = argL - eqId - 1;
                        }
                        else {
                            var key = null;
                            var keyId = null;
                            var nValue = args[a];
                            var valueId = argId;
                            var valueL = argL;
                        }
                        
                        var value = source.substr(valueId, valueL);
                        
                        arguments.push({key: key,
                                        key_index: keyId,
                                        value: value,
                                        value_index: valueId});
                        
                        // 1 is the length of |
                        argId = argId + argL + 1;
                    }
                }
                
                transclusions.push({
                    title: match[2],
                    match: match,
                    index: index,
                    length: L,
                    arguments: arguments,
                });
                
                var filler = Alib.Str.padRight("", "x", L);
                nSource = Alib.Str.overwriteAt(nSource, filler, res[t].index);
            }
        // Find also nested transclusions
        } while (res.length);
        
        return transclusions;
    };
    
    this.findTemplates = function (source, template) {
        // Templates can't be transcluded with a colon before the title
        // The title must not be broken by new line characters
        if (template) {
            var pattern = Alib.RegEx.escapePattern(template);
            pattern = prepareTitleCasing(pattern);
        }
        else {
            var pattern = ".+?";
        }
        var regExp = new RegExp("(\\{\\{\\s*[_ ]*(" + pattern + ")[_\\s]*)(?:\\|((?:\\s*.(?!\\{\\{)\\s*)*?))?\\}\\}", "g");
        return findTransclusionsEngine(source, regExp);
    };
    
    this.findTransclusions = function (source, namespace, title) {
        // The difference from templates is the possibility of a colon before
        // the title which forces the transclusion of a page instead of a
        // template
        // The title must not be broken by newline characters
        if (namespace) {
            var namespacePattern = Alib.RegEx.escapePattern(namespace);
            namespacePattern = prepareTitleCasing(namespacePattern);
        }
        if (title) {
            var titlePattern = Alib.RegEx.escapePattern(title);
            titlePattern = prepareTitleCasing(titlePattern);
        }
        
        if (namespacePattern && titlePattern) {
            var pattern = namespacePattern + "[ _]*:[ _]*" + titlePattern;
        }
        else if (!namespacePattern && titlePattern) {
            var pattern = titlePattern;
        }
        else if (namespacePattern && !titlePattern) {
            var pattern = namespacePattern + "[ _]*:.+?";
        }
        else {
            var pattern = ".+?";
        }
        
        // There can't be an underscore before the colon
        var regExp = new RegExp("(\\{\\{\\s*:?[ _]*(" + pattern + ")[_\\s]*)(?:\\|((?:\\s*.(?!\\{\\{)\\s*)*?))?\\}\\}", "g");
        return findTransclusionsEngine(source, regExp);
    };
        
    this.findSectionHeadings = function (source) {
        // ======Title====== is the deepest level supported
        var MAXLEVEL = 6;
        
        var sections = [];
        var minLevel = MAXLEVEL;
        var maxTocLevel = 0;
        var tocLevel = 1;
        var regExp = /^(\=+ *.+? *\=+)[ \t]*$/gm;
        var match, line, L0, L1, level, prevLevels, start, end, tocPeer;
        
        while (true) {
            match = regExp.exec(source);
            
            if (match) {
                L0 = match[0].length;
                line = match[1];
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
    this.appendRow = function (source, mark, values) {
        var lastId = source.lastIndexOf('|}<!--' + mark);
        var endtable = (lastId > -1) ? lastId : source.lastIndexOf('|}');
        
        var row = "|-\n|" + values.join("\n|") + "\n";
        
        var newText = Alib.Str.insert(source, row, endtable);
        
        return newText;
    };
};

WM.UI = new function () {
    var editor = null;
    
    this.setEditor = function(rows) {
        editor = rows;
    };
    
    var diff = null;
    
    this.setDiff = function(rows) {
        diff = rows;
    };
    
    var category = null;
    
    this.setCategory = function(rows) {
        category = rows;
    };
    
    var whatLinksHere = null;
    
    this.setWhatLinksHere = function(rows) {
        whatLinksHere = rows;
    };
    
    var linkSearch = null;
    
    this.setLinkSearch = function(rows) {
        linkSearch = rows;
    };
    
    var special = null;
    
    this.setSpecial = function(rows) {
        special = rows;
    };
    
    var specialList = null;
    
    this.setSpecialList = function(rows) {
        specialList = rows;
    };
    
    this._executeAsync = function (functions, id) {
        id++;
        if (functions[id]) {
            var fid = functions[id];
            var callContinue = function () {
                WM.UI._executeAsync(functions, id);
            };
            fid[0](fid[1], callContinue);
        }
    };
    
    var makeButtons = function (functions) {
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyButtons';
        
        GM_addStyle("#WikiMonkeyButtons div.shortcut {position:absolute;} " +
                    "#WikiMonkeyButtons div.shortcut > input, #WikiMonkeyButtonAll {font-weight:bold;} " +
                    "#WikiMonkeyButtons div.row {margin-bottom:0.67em;} " +
                    "#WikiMonkeyButtons div.plugins {margin-left:9em;} " +
                    "#WikiMonkeyButtons div.pluginUI {display:inline-block; margin-right:0.33em;}");
        
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
                        // window[string] doesn't work
                        eval("WM.Plugins." + fn + ".main")(arg, null);
                    }
                })(ff[0], ff[2]), false);
                
                // window[string] doesn't work
                var exFunction = eval("WM.Plugins." + ff[0] + ".main");
                rowFunctions.push([exFunction, ff[2]]);
                allFunctions.push([exFunction, ff[2]]);
                
                var divFunction = document.createElement('div');
                divFunction.className = 'pluginUI';
                divFunction.appendChild(buttonFunction);
                
                var makeUI = eval("WM.Plugins." + ff[0] + ".makeUI");
                if (makeUI instanceof Function) {
                    divFunction.appendChild(makeUI(ff[2]));
                }
                
                divPlugins.appendChild(divFunction);
                
                buttonsN++;
            }
            
            buttonRow.addEventListener("click", (function (rowFunctions) {
                return function () {
                    WM.UI._executeAsync(rowFunctions, -1);
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
                WM.UI._executeAsync(allFunctions, -1);
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
        
        if (document.getElementById('editform')) {
            nextNode = document.getElementById('wpSummaryLabel').parentNode.nextSibling;
            UI = (editor) ? makeButtons(editor) : null;
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            nextNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0];
            UI = (diff) ? makeButtons(diff) : null;
        }
        else if (document.getElementById('mw-subcategories') || document.getElementById('mw-pages')) {
            nextNode = document.getElementById('bodyContent');
            UI = (category) ? WM.Bot._makeUI(category, [[document.getElementById('mw-pages'), 0, "Pages"], [document.getElementById('mw-subcategories'), 0, "Subcategories"]]) : null;
        }
        else if (document.getElementById('mw-whatlinkshere-list')) {
            nextNode = document.getElementById('bodyContent').getElementsByTagName('form')[0].nextSibling;
            UI = (whatLinksHere) ? WM.Bot._makeUI(whatLinksHere, [[document.getElementById('mw-whatlinkshere-list'), 0, "Pages"]]) : null;
        }
        else if (document.getElementById('mw-linksearch-form') && document.getElementById('bodyContent').getElementsByTagName('ol')[0]) {
            nextNode = document.getElementById('mw-linksearch-form').nextSibling;
            UI = (linkSearch) ? WM.Bot._makeUI(linkSearch, [[document.getElementById('bodyContent').getElementsByTagName('ol')[0], 1, "Pages"]]) : null;
        }
        else if (location.href.indexOf(WM.MW.getWikiPaths().articles + "Special:SpecialPages") > -1) {
            nextNode = document.getElementById('bodyContent');
            UI = (special) ? makeButtons(special) : null;
        }
        else {
            nextNode = document.getElementById('bodyContent');
            var nextNodeDivs = nextNode.getElementsByTagName('div');
            // Using for...in to loop through node lists is not supported by Chrome
            for (var div = 0; div < nextNodeDivs.length; div++) {
                if (nextNodeDivs[div].className == 'mw-spcontent') {
                    UI = (specialList) ? WM.Bot._makeUI(specialList, [[document.getElementById('bodyContent').getElementsByTagName('ol')[0], 0, "Pages"]]) : null;
                    break;
                }
            }
        }
        
        if (UI) {
            var main = document.createElement('fieldset');
            main.id = 'WikiMonkey';
            
            GM_addStyle("#WikiMonkey {position:relative;} " +
                        "#WikiMonkey fieldset {margin:0 0 1em 0;} " +
                        "#WikiMonkeyHelp {position:absolute; top:1em; right:0.6em;}");
            
            var legend = document.createElement('legend');
            legend.innerHTML = 'Wiki Monkey';
            main.appendChild(legend);
    
            var help = document.createElement('p');
            help.id = 'WikiMonkeyHelp';
            var helpln = document.createElement('a');
            helpln.href = 'https://github.com/kynikos/wiki-monkey/wiki'
            helpln.innerHTML = 'help';
            help.appendChild(helpln);
            main.appendChild(help);
            
            main.appendChild(UI);
            main.appendChild(WM.Log._makeLogArea());
            nextNode.parentNode.insertBefore(main, nextNode);
        }
    };
};
WM.Plugins.ArchWikiFixHeader = new function () {
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        
        var detLang = WM.ArchWiki.detectLanguage(WM.Editor.getTitle());
        var pureTitle = detLang[0];
        var language = detLang[1];
        
        var header = "";
        var content = source;
        
        // <noinclude>
        var content = content.replace(/^\s*<noinclude>/, "");
        if (content != source) {
            header += "<noinclude>\n";
        }
        
        // DISPLAYTITLE and Template:Lowercase_title
        var displaytitle = WM.Parser.findVariables(content, "DISPLAYTITLE");
        var lowercasetitle = WM.Parser.findTemplates(content, "Lowercase title");
        var titlemods = displaytitle.concat(lowercasetitle);
        titlemods.sort(function (a, b) {
            return a.index - b.index;
        });
        var tempcontent = "";
        var contentId = 0;
        for (var t in titlemods) {
            tempcontent += content.substring(contentId, titlemods[t].index);
            contentId = titlemods[t].index + titlemods[t].length;
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        var dt = displaytitle.pop();
        var lct = lowercasetitle.pop();
        var dlct = "";
        if (dt && !lct) {
            var dlct = "{{DISPLAYTITLE:" + dt.match[2] + "}}";
        }
        else if (!dt && lct) {
            var dlct = "{{Lowercase title}}";
        }
        else if (dt && lct) {
            var dlct = (dt.index < lct.index) ? "{{Lowercase title}}" : "{{DISPLAYTITLE:" + dt.match[2] + "}}";
        }
        if (displaytitle.length || lowercasetitle.length) {
            WM.Log.logWarning("Found multiple instances of {{DISPLAYTITLE:...}} or {{Lowercase title}}: only the last one has been used, the others have been deleted");
        }
        
        // Behavior switches
        var behaviorswitches = WM.Parser.findBehaviorSwitches(content);
        var bslist = [];
        var tempcontent = "";
        var contentId = 0;
        for (var b in behaviorswitches) {
            var bs = behaviorswitches[b].match[1];
            if (bs == "TOC" || bs == "START" || bs == "END") {
                behaviorswitches.splice(b, 1);
            }
            else {
                if (bslist.indexOf(behaviorswitches[b].match[0]) == -1) {
                    bslist.push(behaviorswitches[b].match[0]);
                }
                else {
                    WM.Log.logWarning("Removed duplicate of " + behaviorswitches[b].match[0]);
                }
                tempcontent += content.substring(contentId, behaviorswitches[b].index);
                contentId = behaviorswitches[b].index + behaviorswitches[b].length;
            }
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        
        if (!dlct && bslist.length) {
            header += bslist.join(" ") + "\n";
        }
        else if (dlct && !bslist.length) {
            header += dlct + "\n";
        }
        else if (dlct && bslist.length) {
            header += dlct + " " + bslist.join(" ") + "\n";
        }
        
        // Categories
        var categories = WM.Parser.findCategories(content);
        var catlist = [];
        var tempcontent = "";
        var contentId = 0;
        for (var c in categories) {
            var cat = categories[c];
            var catlang = WM.ArchWiki.detectLanguage(cat.match[1])[1];
            if (language != catlang) {
                WM.Log.logWarning(cat.match[1] + " belongs to a different language than the one of the title (" + language + ")");
            }
            if (catlist.indexOf(cat.match[0]) == -1) {
                catlist.push(cat.match[0]);
            }
            else {
                WM.Log.logWarning("Removed duplicate of " + cat.match[1]);
            }
            tempcontent += content.substring(contentId, cat.index);
            contentId = cat.index + cat.length;
        }
        if (catlist.length) {
            header += catlist.join("\n") + "\n";
        }
        else {
            WM.Log.logWarning("The article is not categorized");
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        
        // Interlanguage links
        var interlanguage = WM.ArchWiki.findAllInterlanguageLinks(content);
        var iwlist = [];
        var tempcontent = "";
        var contentId = 0;
        for (var l in interlanguage) {
            var link = interlanguage[l];
            if (iwlist.indexOf(link.match[0]) == -1) {
                // Remove also dead interlanguage links
                if (WM.ArchWiki.isAliveInterwikiLanguage(link.match[2])) {
                    iwlist.push(link.match[0]);
                }
                else {
                    WM.Log.logWarning("Removed dead interlanguage link: " + link.match[1]);
                }
            }
            else {
                WM.Log.logWarning("Removed duplicate of " + link.match[1]);
            }
            tempcontent += content.substring(contentId, link.index);
            contentId = link.index + link.length;
        }
        if (iwlist.length) {
            header += iwlist.join("\n") + "\n";
        }
        tempcontent += content.substring(contentId);
        content = tempcontent;
        
        // Template:i18n
        var i18ns = WM.Parser.findTemplates(content, "i18n");
        var i18n = i18ns.pop();
        if (i18ns.length) {
            WM.Log.logWarning("Found multiple instances of Template:i18n : only the first one has been used, the others have been ignored");
        }
        if (i18n) {
            var parsedTitle = WM.Parser.convertUnderscoresToSpaces(i18n.arguments[0].value);
            var test1 = pureTitle.substr(0, 1).toLowerCase() != parsedTitle.substr(0, 1).toLowerCase();
            var test2 = pureTitle.substr(1) != parsedTitle.substr(1);
            
            if (test1 || test2) {
                header += "{{i18n|" + pureTitle + "}}";
                WM.Log.logWarning("Updated Template:i18n since it wasn't matching the current article title");
            }
            else {
                header += "{{i18n|" + parsedTitle + "}}";
            }
            content = Alib.Str.removeFor(content, i18n.index, i18n.length);
        }
        else {
            header += "{{i18n|" + pureTitle + "}}";
            WM.Log.logInfo("Added Template:i18n");
        }
        header += "\n\n";
        
        var firstChar = content.search(/[^\s]/);
        content = content.substr(firstChar);
        
        var newText = header + content;
        
        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Fixed header");
        }
        
        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.ArchWikiFixHeadings = new function () {
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        
        var info = WM.Parser.findSectionHeadings(source);
        
        var increaseLevel;
        if (info.maxTocLevel < 6) {
            increaseLevel = 1;
        }
        else {
            increaseLevel = 0;
            WM.Log.logWarning("There are 6 levels of headings, it's been necessary to start creating them from level 1 although usually it's suggested to start from level 2");
        }
        
        var newtext = "";
        var prevId = 0;
        var section;
        
        for (var s in info.sections) {
            section = info.sections[s];
            newtext += source.substring(prevId, section.index);
            newtext += new Array(section.tocLevel + increaseLevel + 1).join("=");
            newtext += section.line.substr(section.level, section.length1 - 2 * section.level);
            newtext += new Array(section.tocLevel + increaseLevel + 1).join("=");
            prevId = section.index + section.length0;
        }
        newtext += source.substr(prevId);
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed section headings");
        }
        
        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.ArchWikiNewTemplates = new function () {
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        var re8 = /<pre>(((?!<(pre|nowiki)>)[^\=\|])*?((?!<(pre|nowiki)>)[^\=\|\}]))<\/pre>/ig;
        var re9 = /<pre>(((?!<(pre|nowiki)>)[^\|])*?((?!<(pre|nowiki)>)[^\|\}]))<\/pre>/ig;
        var re10 = /<pre>(\n*((?!<(pre|nowiki)>).\n*)+?)<\/pre>/ig;
        
        var re11 = /<code>(((?!<(code|nowiki)>)[^\=\|\n])*?((?!<(code|nowiki)>)[^\=\|\}\n]))<\/code>/ig;
        var re12 = /<code>(((?!<(code|nowiki)>)[^\|\n])*?((?!<(code|nowiki)>)[^\|\}\n]))<\/code>/ig;
        var re13 = /<code>(((?!<(code|nowiki)>)[^\n])+?)<\/code>/ig;
        
        var re14 = /<tt>(((?!<(tt|nowiki)>)[^\=\|\n])*?((?!<(tt|nowiki)>)[^\=\|\}\n]))<\/tt>/ig;
        var re15 = /<tt>(((?!<(tt|nowiki)>)[^\|\n])*?((?!<(tt|nowiki)>)[^\|\}\n]))<\/tt>/ig;
        var re16 = /<tt>(((?!<(tt|nowiki)>)[^\n])+?)<\/tt>/ig;
        
        newtext = newtext.replace(re8, '{{bc|$1}}');
        newtext = newtext.replace(re9, '{{bc|1=$1}}'); // Must come after re8
        newtext = newtext.replace(re10, '{{bc|<nowiki>$1</nowiki>}}'); // Must come after re9
        
        newtext = newtext.replace(re11, '{{ic|$1}}');
        newtext = newtext.replace(re12, '{{ic|1=$1}}'); // Must come after re11
        newtext = newtext.replace(re13, '{{ic|<nowiki>$1</nowiki>}}'); // Must come after re12
        
        newtext = newtext.replace(re14, '{{ic|$1}}');
        newtext = newtext.replace(re15, '{{ic|1=$1}}'); // Must come after re14
        newtext = newtext.replace(re16, '{{ic|<nowiki>$1</nowiki>}}'); // Must come after re15
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Turned HTML tags into proper templates");
        }
        
        var tests = [
            ['&lt;pre>', newtext.match(/<pre/ig)],
            ['&lt;code>', newtext.match(/<code/ig)],
            ['&lt;tt>', newtext.match(/<tt/ig)]
        ];
        
        for (var test in tests) { 
            if (tests[test][1]) {
                WM.Log.logWarning(tests[test][1].length + ' ' + tests[test][0] + ' instances require manual intervention');
            }
        }
        
        if (callNext) {
            callNext();
        }
    };
};

WM.Plugins.ArchWikiTemplateAUR = new function () {
    var doReplace = function (source, call, callArgs) {
        var regExp = /\[(https?\:\/\/aur\.archlinux\.org\/packages\.php\?ID\=[0-9]+) ([^\]]+?)\]/g;
        var links = [];
        
        while (true) {
            var match = regExp.exec(source);
            if (match) {
                links.push(match);
            }
            else {
                break;
            }
        }
        
        var newText = source;
        
        WM.Plugins.ArchWikiTemplateAUR.doReplaceContinue(source, newText, links, 0, call, callArgs);
    };
    
    this.doReplaceContinue = function (source, newText, links, index, call, callArgs) {
        if (links[index]) {
            WM.Log.logInfo("Processing " + links[index][0] + "...");
            var query = {
                method: "GET",
                url: links[index][1],
                onload: function (res) {
                    var parser = new DOMParser();
                    var page = parser.parseFromString(res.responseText, "text/xml");
                    var divs = page.getElementsByTagName('div');
                    for (var i = 0; i < divs.length; i++) {
                        if (divs[i].className == "pgboxbody") {
                            var span = divs[i].getElementsByTagName('span')[0];
                            var pkgname = span.innerHTML.split(" ")[0];
                            if (links[index][2] == pkgname) {
                                newText = newText.replace(links[index][0],
                                                          "{{AUR|" + pkgname + "}}");
                            }
                            break;
                        }
                    }
                    index++;
                    WM.Plugins.ArchWikiTemplateAUR.doReplaceContinue(source, newText, links, index, call, callArgs);
                },
                onerror: function (res) {
                    WM.Log.logError("Failed query: " + res.finalUrl + "\nYou may " +
                                    "have tried to use a plugin which requires " +
                                    "cross-origin HTTP requests, but you are not " +
                                    "using Scriptish (Firefox), Greasemonkey " +
                                    "(Firefox), Tampermonkey (Chrome/Chromium) " +
                                    "or a similar extension");
                },
            };
            try {
                GM_xmlhttpRequest(query);
            }
            catch (err) {
                WM.Log.logError("Failed HTTP request - " + err + "\nYou may have " +
                                "tried to use a plugin which requires cross-origin " +
                                "HTTP requests, but you are not using Scriptish " +
                                "(Firefox), Greasemonkey (Firefox), Tampermonkey " +
                                "(Chrome/Chromium) or a similar extension");
            }
        }
        else {
            call(source, newText, callArgs);
        }
    };
    
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Replacing direct AUR package links...");
        doReplace(source, WM.Plugins.ArchWikiTemplateAUR.mainEnd, callNext);
    };
    
    this.mainEnd = function (source, newtext, callNext) {
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Replaced direct AUR package links");
        }
        else {
            WM.Log.logInfo("No replaceable AUR package links found");
        }
        
        if (callNext) {
            callNext();
        }
    };
    
    this.mainAuto = function (args, title, callBot) {
        var summary = args[0];
        
        WM.MW.callQueryEdit(title,
                            WM.Plugins.ArchWikiTemplateAUR.mainAutoReplace,
                            [summary, callBot]);
    };
    
    this.mainAutoReplace = function (title, source, timestamp, edittoken, args) {
        var summary = args[0];
        var callBot = args[1];
        
        doReplace(source,
                  WM.Plugins.ArchWikiTemplateAUR.mainAutoWrite,
                  [title, edittoken, timestamp, summary, callBot]);
    };
    
    this.mainAutoWrite = function (source, newtext, args) {
        var title = args[0];
        var edittoken = args[1];
        var timestamp = args[2];
        var summary = args[3];
        var callBot = args[4];
        
        if (newtext != source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.ArchWikiTemplateAUR.mainAutoEnd,
                               callBot);
        }
        else {
            callBot(true);
        }
    };
    
    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(true);
        }
        else {
            callBot(false);
        }
    };
};

WM.Plugins.ExpandContractions = new function () {
    var replace = function (source, regExp, newString, checkString, checkStrings) {
        var newtext = source.replace(regExp, newString);
        if (checkStrings.length > 1 && newtext != source) {
            WM.Log.logWarning("Replaced some \"" + checkString + "\" with \"" + checkStrings[0] + "\": check that it didn't mean \"" + checkStrings.slice(1).join("\" or \"") + "\" instead");
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
        newtext = replace(newtext, /([a-z])'ll/ig, '$1 will', "'ll", ["will", "shall"]);
        newtext = replace(newtext, /([a-z])'d/ig, '$1 would', "'d", ["would", "had"]);
        newtext = replace(newtext, /(c)an't/ig, '$1annot', "can't", ["cannot"]);
        newtext = replace(newtext, /(w)on't/ig, '$1ill not', "won't", ["will not"]);
        newtext = replace(newtext, /([a-z])n't/ig, '$1 not', "n't", ["not"]);
        newtext = replace(newtext, /(here|there)'s/ig, '$1 is', "here/there's", ["here/there is", "here/there has"]);
        // Replacing he's, she's, that's, what's, where's, who's ... may be too dangerous
        newtext = replace(newtext, /([a-z])'s (been)/ig, '$1 has $2', "'s been", ["has been"]);
        newtext = replace(newtext, /(let)'s/ig, '$1 us', "let's", ["let us"]);
        newtext = replace(newtext, /(it)'(s own)/ig, '$1$2', "it's own", ["its own"]);
        
        var ss = newtext.match(/[a-z]'s/gi);
        if (ss) {
            WM.Log.logWarning("Found " + ss.length + " instances of \"'s\": check if they can be replaced with \"is\", \"has\", ...");
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

WM.Plugins.MultipleLineBreaks = new function () {
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
    this.makeUI = function (args) {
        var id = args[0];
        
        GM_addStyle("#WikiMonkey-SimpleReplace {display:inline-block;} " +
                    "#WikiMonkey-SimpleReplace div {display:inline-block; margin-right:2em;} " +
                    "#WikiMonkey-SimpleReplace input[type='text'] {margin-left:0.33em;}");
        
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
    
    this.makeBotUI = function (args) {
        var id = args[0];
        
        // this.makeUI doesn't work
        var divMain = WM.Plugins.SimpleReplace.makeUI(args);
        
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
    
    var doReplace = function (source, id) {
        var pattern = document.getElementById("WikiMonkey-SimpleReplace-RegExp-" + id).value;
        var ignoreCase = document.getElementById("WikiMonkey-SimpleReplace-IgnoreCase-" + id).checked;
        var newString = document.getElementById("WikiMonkey-SimpleReplace-NewString-" + id).value;
        
        var regexp = new RegExp(pattern, "g" + ((ignoreCase) ? "i" : ""));
        
        return source.replace(regexp, newString);
    };
    
    this.main = function (args, callNext) {
        var id = args[0];
        
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
    
    this.mainAuto = function (args, title, callBot) {
        var id = args[0];
        
        WM.MW.callQueryEdit(title,
                            WM.Plugins.SimpleReplace.mainAutoWrite,
                            [id, callBot]);
    };
        
    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var id = args[0];
        var callBot = args[1];
        
        var newtext = doReplace(source, id);
        
        if (newtext != source) {
            var summary = document.getElementById("WikiMonkey-SimpleReplace-Summary-" + id).value;
            
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
            callBot(true);
        }
    };
    
    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(true);
        }
        else {
            WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
            callBot(false);
        }
    };
};

WM.Plugins.SynchronizeInterlanguageLinks = new function () {
    this.main = function (args, callNext) {
        var tag = args[0]();
        var whitelist = args[1];
        
        WM.Log.logInfo("Synchronizing interlanguage links...");
        
        var title = WM.Editor.getTitle();
        
        WM.MW.getInterwikiMap(
            title,
            WM.Plugins.SynchronizeInterlanguageLinks.mainContinue,
            [tag, whitelist, title, callNext]
        );
    };
    
    this.mainContinue = function (iwmap, args) {
        var tag = args[0];
        var whitelist = args[1];
        var title = args[2];
        var callNext = args[3];
        
        var source = WM.Editor.readSource();
        
        var langlinks = WM.Interlanguage.parseLinks(whitelist, source, iwmap);
        
        var paths = WM.MW.getWikiPaths();
        var url = paths.articles + WM.Parser.convertSpacesToUnderscores(title);
        var api = paths.api;
        
        var visitedlinks = {};
        visitedlinks[tag] = WM.Interlanguage.createVisitedLink(title, url, iwmap, api, source, null, null, langlinks);
        
        var newlinks = {};
        
        WM.Log.logInfo("Reading " + url + "...");
        
        if (langlinks) {
            var conflict = false;
            for (var l in langlinks) {
                var link = langlinks[l];
                if (!visitedlinks[link.lang] && !newlinks[link.lang]) {
                    newlinks[link.lang] = WM.Interlanguage.createNewLink(link.title, link.url);
                }
                else if ((visitedlinks[link.lang] && visitedlinks[link.lang].url != link.url) ||
                         (newlinks[link.lang] && newlinks[link.lang].url != link.url)) {
                    conflict = true;
                    WM.Log.logError("Conflicting interlanguage links: [[" + link.lang + ":" + link.title + "]]");
                    break;
                }
            }
        
            if (!conflict) {
                WM.Interlanguage.collectLinks(
                    visitedlinks,
                    newlinks,
                    whitelist,
                    false,
                    WM.Plugins.SynchronizeInterlanguageLinks.mainEnd,
                    [tag, url, source, langlinks, iwmap, callNext]
                );
            }
        }
        else {
            WM.Log.logInfo("No interlanguage links found");
            if (callNext) {
                callNext();
            }
        }
    };
    
    this.mainEnd = function (links, args) {
        var tag = args[0];
        var url = args[1];
        var source = args[2];
        var langlinks = args[3];
        var iwmap = args[4];
        var callNext = args[5];
        
        if (links != "conflict") {
            var newText = WM.Interlanguage.updateLinks(tag, url, iwmap, source, langlinks, links);
            
            if (newText != source) {
                WM.Editor.writeSource(newText);
                WM.Log.logInfo("Sycnhronized interlanguage links");
            }
            else {
                WM.Log.logInfo("Interlanguage links were already synchronized");
            }
        
            if (callNext) {
                callNext();
            }
        }
    };
    
    this.mainAuto = function (args, title, callBot) {
        var tag = args[0]();
        var whitelist = args[1];
        var summary = args[2];
        
        var paths = WM.MW.getWikiPaths();
        var url = paths.articles + WM.Parser.convertSpacesToUnderscores(title);
        
        var visitedlinks = {};
        
        var newlinks = {};
        newlinks[link.lang] = WM.Interlanguage.createNewLink(title, url);
        
        WM.Interlanguage.collectLinks(
            visitedlinks,
            newlinks,
            whitelist,
            false,
            WM.Plugins.SynchronizeInterlanguageLinks.mainAutoWrite,
            [title, url, tag, summary, callBot]
        );
    };
    
    this.mainAutoWrite = function (links, args) {
        var title = args[0];
        var url = args[1];
        var tag = args[2];
        var summary = args[3];
        var callBot = args[4];
        
        if (links != "conflict") {
            var iwmap = links[tag].iwmap;
            var source = links[tag].source;
            var langlinks = links[tag].links;
            var timestamp = links[tag].timestamp;
            var edittoken = links[tag].edittoken;
            
            var newText = WM.Interlanguage.updateLinks(tag, url, iwmap, source, langlinks, links);
            
            if (newText != source) {
                WM.MW.callAPIPost({action: "edit",
                                   bot: "1",
                                   title: title,
                                   summary: summary,
                                   text: newText,
                                   basetimestamp: timestamp,
                                   token: edittoken},
                                   null,
                                   WM.Plugins.SynchronizeInterlanguageLinks.mainAutoEnd,
                                   callBot);
            }
            else {
                callBot(true);
            }
        }
        else {
            callBot(false);
        }
    };
    
    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(true);
        }
        else {
            callBot(false);
        }
    };
};


WM.UI.setEditor([
    [
        ["ArchWikiFixHeader", "Fix header", null],
        ["ArchWikiFixHeadings", "Fix headings", null],
        ["ArchWikiNewTemplates", "Use code templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Multiple line breaks", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ],
    [
        ["SynchronizeInterlanguageLinks", "Sync interlanguage links",
         [function () {
             var title = WM.Editor.getTitle();
             var language = WM.ArchWiki.detectLanguage(title)[1];
            // The language must correspond to a working interwiki tag
             return WM.ArchWiki.getInterlanguageTag(language);
         },
         WM.ArchWiki.getAliveInterwikiLanguages()]],
        ["ArchWikiTemplateAUR", "Use Template:AUR", null]
    ]
]);

WM.UI.setDiff(null);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setSpecialList(null);

WM.main();
