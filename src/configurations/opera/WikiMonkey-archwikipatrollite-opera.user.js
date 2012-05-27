// ==UserScript==
// @id wiki-monkey-archwikipatrollite-opera
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version development-archwikipatrollite-opera
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/opera/WikiMonkey-archwikipatrollite-opera.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/opera/WikiMonkey-archwikipatrollite-opera.user.js
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
                responseJSON: JSON.parse(req.responseText),
                readyState: req.readyState,
                responseHeaders: req.getAllResponseHeaders(),
                status: req.status,
                statusText: req.statusText,
                // Not yet implemented
                //finalUrl: ,
            };
            
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
    
    this.findInterlanguageLinks = function (source, language) {
        var res;
        if (language) {
            res = WM.Parser.findInternalLinks(source, language);
        }
        else {
            var interwikiLanguages = this.getInterwikiLanguages();
            var regExp = new RegExp("\\[\\[ *((" + interwikiLanguages.join("|") + ") *: *(.+?)) *\\]\\]", "gi");
            res = Alib.RegEx.matchAll(source, regExp);
        }
        return res;
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
        WM.MW.callAPIGet(query, function (res) {
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
        WM.MW.callAPIGet(query, function (res) {
            var pages = res.query.pages;
            
            for (var id in pages) {
                break;
            }
            
            var page = pages[id];
            
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
        return getWikiPaths(href)
    };
    
    this.callAPIGet = function (params, call, callArgs) {
        GM_xmlhttpRequest({
            method: "GET",
            url: wikiPaths.local.api + "?format=json" + joinParams(params),
            onload: function (res) {
                // Currently only Scriptish supports the responseJSON method
                var json = (res.responseJSON) ? res.responseJSON : JSON.parse(res.responseText);
                call(json, callArgs);
            }
        });
    };
    
    this.callAPIPost = function (params, call, callArgs) {
        var query = {
            method: "POST",
            url: wikiPaths.local.api,
            onload: function (res) {
                // Currently only Scriptish supports the responseJSON method
                var json = (res.responseJSON) ? res.responseJSON : JSON.parse(res.responseText);
                call(json, callArgs);
            },
        }
        
        var string = "format=json" + joinParams(params);
        
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
            query.data = string;
            query.headers = {"Content-type": "application/x-www-form-urlencoded"};
        }
        
        GM_xmlhttpRequest(query);
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
            var pages = res.query.pages;
            for (var id in pages) {
                break;
            }
            call(pages[id], callArgs);
        };
        this.callAPIGet(params, callBack);
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
        WM.MW.callAPIGet(query, function (res) {
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
    
    this.getLanglinks = function (title, call, callArgs) {
        var query = {action: "query",
                     prop: "langlinks",
                     titles: title,
                     lllimit: 500,
                     llurl: "1",
                     redirect: "1"};
        
        this._getLanglinksContinue(query, call, callArgs, []);
    };
    
    this._getLanglinksContinue = function (query, call, callArgs, langlinks) {
        WM.MW.callAPIGet(query, function (res) {
            langlinks = langlinks.concat(res.query.langlinks);
            if (res["query-continue"]) {
                query.llcontinue = res["query-continue"].langlinks.llcontinue;
                this._getLanglinksContinue(query, call, callArgs, langlinks);
            }
            else {
                call(langlinks, callArgs);
            }
        });
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
        var tags = Alib.RegEx.matchAll(source, /<nowiki>[.\s]+?<\/nowiki>/gi);
        for (var t in tags) {
            var filler = "";
            while (filler.length < tags[t].length) {
                filler += "x";
            }
            source = source.substr(0, tags[t].index - 1) + filler + source.substr(tags[t].index + tags[t].length)
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
        var res;
        if (word) {
            var regExp = new RegExp("__" + Alib.RegEx.escapePattern(word) + "__", "g");
            res = Alib.RegEx.matchAll(source, regExp);
        }
        else {
            res = Alib.RegEx.matchAll(source, /__(TOC|NOTOC|FORCETOC|NOEDITSECTION|NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|NOINDEX|STATICREDIRECT|START|END)__/g);
        }
        return res;
    };
    
    this.findVariables = function (source, variable) {
        var regExp = new RegExp("\\{\\{ *" + Alib.RegEx.escapePattern(variable) + " *\\}\\}", "g");
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findVariableVariables = function (source, variable) {
        var regExp = new RegExp("\\{\\{ *" + Alib.RegEx.escapePattern(variable) + " *: *(.+?) *\\}\\}", "g");
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findInternalLinks = function (source, namespace) {
        var res;
        if (namespace) {
            var nsPattern = Alib.RegEx.escapePattern(namespace);
            nsPattern = prepareTitleCasing(nsPattern);
            var regExp = new RegExp("\\[\\[ *((" + nsPattern + ") *: *(.+?)) *\\]\\]", "g");
            res = Alib.RegEx.matchAll(source, regExp);
        }
        else {
            res = Alib.RegEx.matchAll(source, /\[\[ *((?:(.+?) *: *)?(.+?)) *\]\]/g);
        }
        return res;
    };
    
    this.findCategories = function (source) {
        return this.findInternalLinks(source, "Category");
    };
    
    this.findInterwikiLinks = function (source, wiki) {
        return this.findInternalLinks(source, wiki);
    };
    
    this.findTemplateTags = function (source, template) {
        var templatePattern = Alib.RegEx.escapePattern(template);
        templatePattern = prepareTitleCasing(templatePattern);
        var regExp = new RegExp("\\{\\{ *" + templatePattern, "g");
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findTemplates = function (source, template) {
        var nSource = this.neutralizeNowikiTags(source);
        var templatePattern = Alib.RegEx.escapePattern(template);
        templatePattern = prepareTitleCasing(templatePattern);
        var regExp = new RegExp("(\\{\\{ *(" + templatePattern + ")\\s*\\|)(\\s*(?:.(?!\\{\\{)\\s*)*?)\\}\\}", "g");
        var templates = [];
        
        do {
            var res = Alib.RegEx.matchAll(nSource, regExp);
            
            for (var t in res) {
                var match = res[t].match;
                var index = res[t].index;
                var L = res[t].length;
                var args = match[3].split("|");
                var arguments = [];
                var argId = index + match[1].length;
                
                for (var a in args) {
                    var argL = args[a].length;
                    var eqId = args[a].indexOf("=");
                    // eqId must be > 0, not -1, in fact the key must not be empty
                    if (eqId > 0) {
                        var rawKey = args[a].substr(0, eqId);
                        var reKey = /(\s*)(.+?)\s*/;
                        var keyMatches = reKey.exec(rawKey);
                        var key = keyMatches[2];
                        var keyId = argId + ((keyMatches[1]) ? keyMatches[1].length : 0);
                        
                        var nValue = args[a].substr(eqId + 1);
                        var valueId = argId + keyMatches[0].length;
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
                
                templates.push({
                    name: match[2],
                    index: index,
                    length: L,
                    arguments: arguments,
                });
                
                var filler = "";
                while (filler.length < L) {
                    filler += "x";
                }
                nSource = nSource.substr(0, res[t].index - 1) + filler + nSource.substr(res[t].index + L)
            }
        // Find also nested templates
        } while (res.length);
        
        return templates;
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
        
        var part1 = source.substring(0, endtable);
        var part2 = source.substring(endtable);
        
        return part1 + "|-\n|" + values.join("\n|") + "\n" + part2;
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
        
        var row, buttonsN, divRow, pRow, buttonRow, divPlugins, divFunction, buttonFunction, ff, buttons, makeUI;
        var rowsN = 0;
        
        for (var r in functions) {
            row = functions[r];
            
            buttonRow = document.createElement('input');
            buttonRow.setAttribute('type', 'button');
            buttonRow.setAttribute('value', 'Execute row');
            
            pRow = document.createElement('div');
            pRow.className = "shortcut";
            pRow.appendChild(buttonRow);
            
            divPlugins = document.createElement('div');
            divPlugins.className = "plugins";
            
            divRow = document.createElement('div');
            divRow.className = "row";
            divRow.appendChild(pRow);
            
            buttonsN = 0;
            
            for (var f in row) {
                ff = row[f];
                
                buttonFunction = document.createElement('input');
                buttonFunction.setAttribute('type', 'button');
                buttonFunction.setAttribute('value', ff[1]);
                
                buttons = [buttonFunction, buttonRow, buttonAll];
                
                for (var button in buttons) {
                    buttons[button].addEventListener("click", (function (fn, arg) {
                        return function () {
                            // window[string] doesn't work
                            eval("WM.Plugins." + fn + ".main")(arg);
                        }
                    })(ff[0], ff[2]), false);
                };
                
                divFunction = document.createElement('div');
                divFunction.className = 'pluginUI';
                divFunction.appendChild(buttonFunction);
                
                makeUI = eval("WM.Plugins." + ff[0] + ".makeUI");
                if (makeUI instanceof Function) {
                    divFunction.appendChild(makeUI(ff[2]));
                }
                
                divPlugins.appendChild(divFunction);
                
                buttonsN++;
            }
            
            divRow.appendChild(divPlugins);
            divContainer.appendChild(divRow);
            
            if (buttonsN <= 1) {
                buttonRow.disabled = true;
            }
            
            rowsN++;
        }
        
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
WM.Plugins.ArchWikiQuickReport = new function () {
    this.makeUI = function (args) {
        var id = args[0];
        var article = args[1];
        
        var select = document.createElement('select');
        var types = ["&lt;TYPE&gt;", "content", "style"];
        var value;
        for (var v in types) {
            value = types[v];
            option = document.createElement('option');
            option.setAttribute('value', value);
            option.innerHTML = value;
            select.appendChild(option);
        }
        select.id = "ArchWikiQuickReport-select-" + id;
        
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.id = "ArchWikiQuickReport-input-" + id;
        
        var link = document.createElement('a');
        link.href = "/index.php/" + article;
        link.innerHTML = article;
        
        var span = document.createElement('span');
        span.appendChild(select);
        span.appendChild(input);
        span.appendChild(link);
        
        return span;
    };
    
    this.main = function (args) {
        var id = args[0];
        var article = args[1];
        var summary = args[2];
        
        WM.Log.logInfo('Appending diff to ' + article + "...");
        
        var select = document.getElementById("ArchWikiQuickReport-select-" + id);
        var type = select.options[select.selectedIndex].value;
        
        if (type != 'content' && type != 'style') {
            WM.Log.logError('Select a valid report type');
        }
        else {
            WM.Diff.getEndTimestamp(WM.Plugins.ArchWikiQuickReport.mainGetEndTimestamp,
                                    [id, article, type, summary]);
        }
    };
    
    this.mainGetEndTimestamp = function (enddate, args) {
        var id = args[0];
        var article = args[1];
        var type = args[2];
        var summary = args[3];
        
        WM.MW.callQueryEdit(article,
                            WM.Plugins.ArchWikiQuickReport.mainWrite,
                            [id, type, summary, enddate]);
    };
    
    this.mainWrite = function (article, source, timestamp, edittoken, args) {
        var id = args[0];
        var type = args[1];
        var summary = args[2];
        var enddate = args[3];
        
        var title = Alib.HTTP.getURIParameter('title');
        var pEnddate = enddate.substr(0, 10) + " " + enddate.substr(11, 8);
        var notes = document.getElementById("ArchWikiQuickReport-input-" + id).value;
        
        var newtext = WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", pEnddate, type, notes]);
        
        WM.MW.callAPIPost({action: "edit",
                           bot: "1",
                           title: article,
                           summary: summary,
                           text: newtext,
                           basetimestamp: timestamp,
                           token: edittoken},
                           WM.Plugins.ArchWikiQuickReport.mainEnd,
                           article);
    };
    
    this.mainEnd = function (res, article) {
        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo('Diff correctly appended to ' + article);
        }
        else {
            WM.Log.logError('The diff has not been appended!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };
};


WM.UI.setEditor(null);

WM.UI.setDiff([
    [
        ["ArchWikiQuickReport", "Quick report",
         ["1", "ArchWiki:Reports", "add report"]]
    ]
]);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setSpecialList(null);

WM.main();
