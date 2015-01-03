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

WM.Bot = new function () {
    "use strict";

    this._makeUI = function (functions, lists) {
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyBot';

        Alib.CSS.addStyleElement("#WikiMonkeyBot-PluginSelect {width:100%; " +
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
                WM.Bot.configuration.plugin = fns[id][0];
                WM.Bot.configuration.function_ = function (title, callContinue,
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
        // Don't use "this.configuration"
        WM.Bot.configuration.plugin = functions[0][0];
        WM.Bot.configuration.function_ = function (title, callContinue,
                                                                chainArgs) {
            WM.Plugins[functions[0][0]].mainAuto(
                            functions[0][2], title, callContinue, chainArgs);
        };

        fieldset.appendChild(legend);
        fieldset.appendChild(selectFunctions);
        fieldset.appendChild(divFunction);

        return fieldset;
    };

    this.configuration = {plugin: null,
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

                if (!WM.Bot.configuration.list.current) {
                    // [1] Note that this is also executed onchange, see [2]
                    // Don't use "this.configuration"
                    WM.Bot.configuration.list.current = lists[l];
                }
            }
        }

        selectLists.addEventListener("change", (function (lss) {
            return function () {
                var select = document.getElementById(
                                                'WikiMonkeyBot-ListSelect');
                var id = select.selectedIndex;
                WM.Bot.configuration.list.previous =
                                            WM.Bot.configuration.list.current;
                // [2] Note that this must also be executed immediately,
                //   see [1]
                WM.Bot.configuration.list.current = lss[id];
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
        WM.Bot.configuration.filters = [];
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

                WM.Bot.configuration.filters.push([regexp, negative]);
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

            if (duplicates || WM.Bot.configuration.visited.indexOf(
                                                                title) < 0) {
                WM.Bot.configuration.visited.push(title);
                var filters = WM.Bot.configuration.filters;
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

        if (WM.Bot.configuration.list.previous) {
            if (WM.Bot.configuration.list.current[0].nodeName == 'TBODY') {
                items = WM.Bot.configuration.list.previous[0
                                                ].getElementsByTagName('td');
            }
            else {
                items = WM.Bot.configuration.list.previous[0
                                                ].getElementsByTagName('li');
            }
            linkId = WM.Bot.configuration.list.previous[1];

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

        WM.Bot.configuration.visited = [];

        linkId = WM.Bot.configuration.list.current[1];
        var enable = false;
        var N = 0;

        if (makeFilters()) {
            if (WM.Bot.configuration.list.current[0].nodeName == 'TBODY') {
                items =
                    WM.Bot.configuration.list.current[0].getElementsByTagName(
                                                                        'td');
            }
            else {
                items =
                    WM.Bot.configuration.list.current[0].getElementsByTagName(
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

    // localStorage can only store strings
    this.botToken = "0";

    this._setBotToken = function () {
        var date = new Date();
        var token = date.getTime() + "";
        this.botToken = token;
        localStorage.setItem('BotToken', token);
    };

    this._resetBotToken = function (reset) {
        this.botToken = "0";
        if (reset) {
            localStorage.setItem('BotToken', "0");
        }
    };

    this._getBotToken = function () {
        return this.botToken;
    };

    this._checkOtherBotsRunning = function () {
        var value = localStorage.getItem('BotToken');

        // value may be null if it's never been stored in localStorage
        return value && value != "0" && value != this._getBotToken();
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
            if (WM.Bot.configuration.list.current[0].nodeName == 'TBODY') {
                var itemsDOM = WM.Bot.configuration.list.current[0
                                                ].getElementsByTagName('td');
            }
            else {
                var itemsDOM = WM.Bot.configuration.list.current[0
                                                ].getElementsByTagName('li');
            }

            // Passing the live collection with the callback function was
            //   causing it to be lost in an apparently random manner
            var items = [];

            for (var i = 0; i < itemsDOM.length; i++) {
                items.push(itemsDOM[i]);
            }

            var linkId = WM.Bot.configuration.list.current[1];

            WM.Bot._disableForceStart();
            WM.Bot._setBotToken();
            WM.Log.logInfo('Starting bot ...');
            WM.Log.logHidden("Plugin: " + WM.Bot.configuration.plugin);
            WM.Log.logHidden("Filter: " + document.getElementById(
                                                'WikiMonkeyBotFilter').value);
            WM.Bot._disableStartBot('Bot is running ...');
            WM.Bot._disableControls();
            WM.Bot.configuration.visited = [];

            WM.MW.isUserBot(WM.Bot._startAutomaticContinue, [items, linkId]);
        }
    };

    this._startAutomaticContinue = function (botTest, args) {
        var items = args[0];
        var linkId = args[1];

        WM.Bot.configuration.interval = (botTest) ? 3000 : 30000;
        WM.Bot._processItem(0, items, 0, linkId, null);
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

                if (status === 0) {
                    var interval = 1000;
                }
                else {
                    var interval = WM.Bot.configuration.interval;
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

                            WM.Bot.configuration.function_(article,
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
