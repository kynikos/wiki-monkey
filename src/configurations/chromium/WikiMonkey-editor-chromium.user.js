// ==UserScript==
// @id wiki-monkey-dev-editor-chromium
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 16dev-editor-chromium
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/chromium/WikiMonkey-editor-chromium.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/chromium/WikiMonkey-editor-chromium.user.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
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

var WM = new function () {
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
    
    this.getLongTextNode = function (element) {
        // DEPRECATED, no longer used anywhere: delete?
        
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
    
    this.Plugins = {};
    
    this.main = function () {
        this.UI.makeUI();
    };
};

WM.Bot = new function () {
    this.makeUI = function (functions, lists) {
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
                WM.Bot.selections.function_ = function (title) {
                    return eval("WM.Plugins." + fns[id][0] + ".mainAuto")(fns[id][2], title);
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
        WM.Bot.selections.function_ = function (title) {
            return eval("WM.Plugins." + functions[0][0] + ".mainAuto")(functions[0][2], title);
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
                WM.Bot.disableStartBot('Filters have changed, preview the selection');
            }, false);
        }
        
        var inversetag = document.createElement('span');
        inversetag.innerHTML = 'Inverse';
        
        preview.addEventListener("click", WM.Bot.previewFilter, false);
        
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
        
        start.addEventListener("click", WM.Bot.startAutomatic, false);
        
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
    
    this.enableStartBot = function () {
        document.getElementById('WikiMonkeyBotStartMsg').innerHTML = '';
        document.getElementById('WikiMonkeyBotStart').disabled = false;
    };
    
    this.disableStartBot = function (message) {
        document.getElementById('WikiMonkeyBotStartMsg').innerHTML = message;
        document.getElementById('WikiMonkeyBotStart').disabled = true;
    };
    
    this.enableStopBot = function (stopId) {
        var stop = document.createElement('input');
        stop.type = 'button';
        stop.value = 'Stop bot';
        stop.id = 'WikiMonkeyBotStop';
        
        stop.addEventListener("click", (function (id) {
            return function () {
                clearTimeout(id);
                // run disableStopBot() here, not in endAutomatic()
                WM.Bot.disableStopBot();
                WM.Bot.endAutomatic(true);
                WM.Log.logInfo('Bot stopped manually');
            }
        })(stopId), false);
        
        var start = document.getElementById('WikiMonkeyBotStart');
        start.parentNode.insertBefore(stop, start);
        start.style.display = 'none';
    };
    
    this.disableStopBot = function () {
        var stop = document.getElementById('WikiMonkeyBotStop');
        stop.parentNode.removeChild(stop);
        document.getElementById('WikiMonkeyBotStart').style.display = 'inline';
    };
    
    this.disableControls = function () {
        this.setEnableControls(true);
    };
    
    this.reEnableControls = function () {
        this.setEnableControls(false);
    };
    
    this.setEnableControls = function (flag) {
        var fsets = document.getElementById('WikiMonkeyBot').getElementsByTagName('fieldset');
        for (var f = 0; f < fsets.length; f++) {
            // HTML5-compliant
            fsets[f].disabled = flag;
        }
    };
    
    this.enableForceStart = function () {
        var force = document.getElementById('WikiMonkeyBotForceStart');
        force.getElementsByTagName('input')[0].disabled = false;
        force.style.display = 'inline';
    };
    
    this.disableForceStart = function () {
        var force = document.getElementById('WikiMonkeyBotForceStart');
        force.getElementsByTagName('input')[0].checked = false;
        force.getElementsByTagName('input')[0].disabled = true;
        force.style.display = 'none';
    };
    
    this.canForceStart = function () {
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
    
    this.previewFilter = function () {
        WM.Log.logInfo('Updating filter preview, please wait...');
        WM.Bot.disableStartBot('Updating filter preview...');
        
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
        (enable) ? WM.Bot.enableStartBot() : WM.Bot.disableStartBot('No pages selected, reset and preview the filter');
    };
    
    // GM_setValue can only store strings, bool and 32-bit integers (no 64-bit)
    this.botToken = "0";
    
    this.setBotToken = function () {
        var date = new Date();
        var token = date.getTime() + "";
        this.botToken = token;
        GM_setValue('BotToken', token);
    };
    
    this.resetBotToken = function (reset) {
        this.botToken = "0";
        if (reset) {
            GM_setValue('BotToken', "0");
        }
    };
    
    this.getBotToken = function () {
        return this.botToken;
    };
    
    this.checkOtherBotsRunning = function () {
        GMValue = GM_getValue('BotToken', "0");
        return (GMValue != "0") && (GMValue != this.getBotToken());
    };
    
    this.startAutomatic = function () {
        var items = WM.Bot.selections.list.current[0].getElementsByTagName('li');
        var linkId = WM.Bot.selections.list.current[1];
        if (WM.Bot.checkOtherBotsRunning() && !WM.Bot.canForceStart()) {
            WM.Log.logError('Another bot is running, aborting...');
            WM.Bot.enableForceStart();
        }
        else {
            WM.Bot.disableForceStart();
            WM.Bot.setBotToken();
            WM.Log.logInfo('Starting bot...');
            WM.Bot.disableStartBot('Bot is running...');
            WM.Bot.disableControls();
            WM.Bot.processItem(items, 0, linkId);
        }
    };
    
    this.processItem = function (items, index, linkId) {
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
                        WM.Bot.disableStopBot();
                        // Check here if other bots have been started,
                        // _not_ before setTimeout! 
                        if (!WM.Bot.checkOtherBotsRunning()) {
                            ln.className = "WikiMonkeyBotProcessing";
                            WM.Log.logInfo("Processing " + article + "...");
                            if (WM.Bot.selections.function_(article) === true) {
                                ln.className = "WikiMonkeyBotProcessed";
                                WM.Log.logInfo(article + " processed");
                                // Do not increment directly in the function's call!
                                id++;
                                WM.Bot.processItem(lis, id, linkId);
                            }
                            else {
                                ln.className = "WikiMonkeyBotFailed";
                                WM.Log.logError("Error processing " + article + ", stopping the bot");
                                WM.Bot.endAutomatic(true);
                            }
                        }
                        else {
                            WM.Log.logError('Another bot has been force-started, stopping...');
                            WM.Bot.endAutomatic(false);
                        }
                    };
                })(items, index, link, title), interval);
                this.enableStopBot(stopId);
            }
            else {
                // Do not increment directly in the function's call!
                index++;
                WM.Bot.processItem(items, index, linkId);
            }
        }
        else {
            this.endAutomatic(true);
        }
    };
    
    this.endAutomatic = function (reset) {
        this.resetBotToken(reset);
        WM.Log.logInfo('Bot operations completed (check the log for warnings or errors)');
        this.disableStartBot('Bot operations completed, reset and preview the filter');
        this.reEnableControls();
    };
    
    // Incomplete ****************************************************************
    /*var startSemiAutomatic = function (args) {
        // Remember a value
        GM_setValue('foo' + 'bar');
        
        // Alert all stored values
        for (var v in GM_listValues()) {
            var val = GM_listValues()[v];
            alert(val + ' : ' + GM_getValue(val));
        }
        
        // Reset array
        for (var v in GM_listValues()) {
            var val = GM_listValues()[v];
            GM_deleteValue(val);
        }
    };*/
};

WM.Cat = new function () {
    this.getTree = function (base) {
        var tree = {};
        tree[base] = walk(base, {});
        // return {base: walk(base, {})}; doesn't work
        return tree;
    };
    
    var walk = function (base, ancestors) {
        WM.Log.logInfo("Walking " + base + "...");
        
        var subCats = WM.Cat.getSubCategories(base);
        
        var tree = {};
        // Add base here in order to protect better from self-parenting categories
        ancestors[base] = true;
        var cat, subAncestors;
        
        for (var s in subCats) {
            cat = subCats[s].title;
            
            // Protect from category loops
            if (ancestors[cat]) {
                tree[cat] = "loop";
            }
            else {
                // Create a copy of the object, not just a new reference
                subAncestors = JSON.parse(JSON.stringify(ancestors));
                tree[cat] = walk(cat, subAncestors);
            }
        }
        
        return tree;
    };
    
    this.getSubCategories = function (parent) {
        return getMembers(parent, "subcat", null);
    };
    
    this.getAllMembers = function (parent) {
        return getMembers(parent, null, null);
    };
    
    var getMembers = function (name, cmtype, cmcontinue) {
        var query = {action: "query",
                     list: "categorymembers",
                     cmtitle: encodeURIComponent(name),
                     cmlimit: 5000};
        
        if (cmtype) {
            query.cmtype = cmtype;
        }
        
        if (cmcontinue) {
            query.cmcontinue = cmcontinue;
        }
        
        var res = WM.MW.callAPIGet(query);
        var members = res.query.categorymembers;
        
        if (res["query-continue"]) {
            cmcontinue = res["query-continue"].categorymembers.cmcontinue;
            var cont = this.getMembers(name, cmtype, cmcontinue);
            for (var sub in cont) {
                members[sub] = cont[sub];
            }
        }
        
        return members;
    };
    
    this.getParents = function (child) {
        // Supports a maximum of 500 parents (5000 for bots)
        // Needs to implement query continue in order to support more
        var pageid = WM.MW.callQuery({prop: "categories",
                                     titles: encodeURIComponent(child),
                                     cllimit: 5000});
        
        var parents = [];
        
        for (var cat in pageid.categories) {
            parents.push(pageid.categories[cat].title);
        }
        
        return parents;
    };
    
    this.getInfo = function (name) {
        var pageid = WM.MW.callQuery({prop: "categoryinfo",
                                     titles: encodeURIComponent(name)});
        return pageid.categoryinfo;
    };
};

WM.Diff = new function () {
    this.getEndTimestamp = function () {
        var title = WM.getURIParameter('title');
        var diff = WM.getURIParameter('diff');
        var oldid = WM.getURIParameter('oldid');
        var pageid, enddate;
        
        switch (diff) {
            case 'next':
                pageid = WM.MW.callQuery({prop: "revisions",
                                         titles: title,
                                         rvlimit: "2",
                                         rvprop: "timestamp",
                                         rvdir: "newer",
                                         rvstartid: oldid});
                enddate = pageid.revisions[1].timestamp;
                break;
            case 'prev':
                pageid = WM.MW.callQuery({prop: "revisions",
                                         revids: oldid,
                                         rvprop: "timestamp"});
                enddate = pageid.revisions[0].timestamp;
                break;
            default:
                pageid = WM.MW.callQuery({prop: "revisions",
                                         revids: diff,
                                         rvprop: "timestamp"});
                enddate = pageid.revisions[0].timestamp;
        }
        return enddate;
    };
};

WM.Editor = new function () {
    this.getTitle = function () {
        var title = WM.getURIParameter('title').replace(/_/g, " ");
        return title;
    };
    
    this.isSection = function () {
        return (WM.getURIParameter('section')) ? true : false;
    };
    
    this.readSource = function () {
        return document.getElementById('wpTextbox1').value;
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

WM.Log = new function () {
    this.makeLogArea = function () {
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
    var wikiUrls = (function () {
        var paths = {DEFAULT: {articles: "index.php",
                               api: "api.php"},
                     "archlinux.org": {articles: "index.php",
                                       api: "api.php"},
                     "wikipedia.org": {articles: "wiki",
                                       api: "w/api.php"}};
        
        var urls = paths[location.hostname.split(".").slice(1).join(".")];
        
        if (!urls) {
            urls = paths.DEFAULT;
        }
        
        for (var key in urls) {
            urls[key] = location.protocol + "//" + location.hostname + "/" + urls[key];
        }
        
        return urls;
    })();
    
    this.getArticlesBaseUrl = function () {
        return wikiUrls.articles;
    };
    
    this.callAPIGet = function (params) {
        var id = WM.HTTP.sendGetSyncRequest(wikiUrls.api + "?format=json" + joinParams(params));
        return JSON.parse(WM.HTTP.getResponseText(id));
    };
    
    this.callAPIPost = function (params) {
        var id = WM.HTTP.sendPostSyncRequest(wikiUrls.api, "format=json" + joinParams(params), "Content-type", "application/x-www-form-urlencoded");
        return JSON.parse(WM.HTTP.getResponseText(id));
    };
    
    var joinParams = function (params) {
        var string = "";
        for (var key in params) {
            string += ("&" + key + "=" + params[key]);
        }
        return string;
    };
    
    this.callQuery = function (params) {
        params.action = "query";
        var res = this.callAPIGet(params);
        var pages = res.query.pages;
        for (var id in pages) {
            break;
        }
        return pages[id];
    };
    
    // Never use this attribute directly, always use getUserInfo!!!
    var userInfo;
    
    this.getUserInfo = function () {
        if (!userInfo) {
            userInfo = this.callAPIGet({action: "query",
                                        meta: "userinfo",
                                        uiprop: "groups"});
        }
        return userInfo;
    };
    
    this.isLoggedIn = function () {
        return this.getUserInfo().query.userinfo.id != 0;
    };
    
    this.getUserName = function () {
        return this.getUserInfo().query.userinfo.name;
    };
    
    this.isUserBot = function () {
        var groups = this.getUserInfo().query.userinfo.groups;
        for (var g in groups) {
            if (groups[g] == 'bot') {
                return true;
            }
        }
        return false;
    };
    
    this.getBacklinks = function (bltitle, blnamespace, blcontinue) {
        var query = {action: "query",
                     list: "backlinks",
                     bltitle: encodeURIComponent(bltitle),
                     bllimit: 5000};
        
        if (blnamespace) {
            query.blnamespace = blnamespace;
        }
        
        if (blcontinue) {
            query.blcontinue = blcontinue;
        }
        
        var res = WM.MW.callAPIGet(query);
        var backlinks = res.query.backlinks;
        
        if (res["query-continue"]) {
            blcontinue = res["query-continue"].backlinks.blcontinue;
            var cont = this.getBacklinks(bltitle, blnamespace, blcontinue);
            for (var sub in cont) {
                backlinks[sub] = cont[sub];
            }
        }
        
        return backlinks;
    };
};

WM.Tables = new function () {
    this.appendRow = function (source, mark, values) {
        var lastId = source.lastIndexOf('|}&lt;!--' + mark);
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
    
    this.makeUI = function () {
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
            UI = (category) ? WM.Bot.makeUI(category, [[document.getElementById('mw-pages'), 0, "Pages"], [document.getElementById('mw-subcategories'), 0, "Subcategories"]]) : null;
        }
        else if (document.getElementById('mw-whatlinkshere-list')) {
            nextNode = document.getElementById('bodyContent').getElementsByTagName('form')[0].nextSibling;
            UI = (whatLinksHere) ? WM.Bot.makeUI(whatLinksHere, [[document.getElementById('mw-whatlinkshere-list'), 0, "Pages"]]) : null;
        }
        else if (document.getElementById('mw-linksearch-form') && document.getElementById('bodyContent').getElementsByTagName('ol')[0]) {
            nextNode = document.getElementById('mw-linksearch-form').nextSibling;
            UI = (linkSearch) ? WM.Bot.makeUI(linkSearch, [[document.getElementById('bodyContent').getElementsByTagName('ol')[0], 1, "Pages"]]) : null;
        }
        else if (location.href.indexOf(WM.MW.getArticlesBaseUrl() + "/Special:SpecialPages") > -1) {
            nextNode = document.getElementById('bodyContent');
            UI = (special) ? makeButtons(special) : null;
        }
        else {
            nextNode = document.getElementById('bodyContent');
            var nextNodeDivs = nextNode.getElementsByTagName('div');
            // Using for...in to loop through node lists is not supported by Chrome
            for (var div = 0; div < nextNodeDivs.length; div++) {
                if (nextNodeDivs[div].className == 'mw-spcontent') {
                    UI = (specialList) ? WM.Bot.makeUI(specialList, [[document.getElementById('bodyContent').getElementsByTagName('ol')[0], 0, "Pages"]]) : null;
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
            main.appendChild(WM.Log.makeLogArea());
            nextNode.parentNode.insertBefore(main, nextNode);
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
    
    this.main = function (args) {
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
        
        var ss = newtext.match(/[a-z]'s/gi);
        if (ss) {
            WM.Log.logWarning("Found " + ss.length + " instances of \"'s\": check if they can be replaced with \"is\", \"has\", ...");
        }
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Expanded contractions");
        }
    };
};

WM.Plugins.MultipleLineBreaks = new function () {
    this.main = function (args) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        newtext = newtext.replace(/[\n]{3,}/g, '\n\n');
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Removed multiple line breaks");
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
    
    this.main = function (args) {
        var id = args[0];
        
        var source = WM.Editor.readSource();
        var newtext = doReplace(source, id);
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Text substituted");
        }
    };
    
    this.mainAuto = function (args, title) {
        var id = args[0];
        
        var pageid = WM.MW.callQuery({prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: encodeURIComponent(title)});
        
        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];
        
        var newtext = doReplace(source, id);
        
        if (newtext != source) {
            var summary = document.getElementById("WikiMonkey-SimpleReplace-Summary-" + id).value;
            
            var res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(title),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newtext),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
        
            if (res.edit && res.edit.result == 'Success') {
                return true;
            }
            else {
                WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
                return false;
            }
        }
        else {
            return true;
        }
    };
};


WM.UI.setEditor([
    [
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Multiple line breaks", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ]
]);

WM.UI.setDiff(null);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setSpecialList(null);

WM.main();
