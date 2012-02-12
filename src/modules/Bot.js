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

WM.Bot = new function () {
    this.makeUI = function (functions, listBase) {
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyBot';
        
        GM_addStyle("#WikiMonkeyBotSelection {width:100%; margin-bottom:1em;} " +
                    "#WikiMonkeyBotFilter {height:6em; margin-bottom:1em; resize:vertical;} " +
                    "#WikiMonkeyBotStart, #WikiMonkeyBotStop {margin-right:0.33em; margin-bottom:1em; font-weight:bold;} " +
                    "a.WikiMonkeyBotSelected {background-color:#faa; padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotProcessing {background-color:#ff8; padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotProcessed {background-color:#afa; padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotFailed {background-color:orangered; padding:0.2em 0.4em;}");
        
        divContainer.appendChild(makeFunctionUI(functions));
        divContainer.appendChild(makeConfUI(listBase));
        
        return divContainer;
    };
    
    var makeFunctionUI = function (functions) {
        var fieldset = document.createElement('fieldset');
        
        var legend = document.createElement('legend');
        legend.innerHTML = 'Plugin';
        
        var selectFunctions = document.createElement('select');
        selectFunctions.id = 'WikiMonkeyBotSelection';
        
        for each (var f in functions) {
            option = document.createElement('option');
            option.innerHTML = f[1];
            selectFunctions.appendChild(option);
        }
        
        selectFunctions.addEventListener("change", (function (fns) {
            return function () {
                var select = document.getElementById('WikiMonkeyBot').getElementsByTagName('select')[0];
                var id = select.selectedIndex;
                var UI = document.getElementById('WikiMonkeyBotFunction');
                // [1] Note that this must also be executed immediately, see [2]
                var makeUI = eval("WM.Plugins." + fns[id][0] + ".makeUI");
                if (makeUI instanceof Function) {
                    UI.replaceChild(makeUI(fns[id][2]), UI.firstChild);
                }
                else {
                    // Don't removeChild, otherwise if another plugin with
                    // interface is selected, replaceChild won't work
                    UI.replaceChild(document.createElement('div'), UI.firstChild);
                }
                WM.Bot.selectedFunction = function (title) {
                    return eval("WM.Plugins." + fns[id][0] + ".mainAuto")(fns[id][2], title);
                };
            }
        })(functions), false);
        
        var divFunction = document.createElement('div');
        divFunction.id = "WikiMonkeyBotFunction";
        
        // [2] Note that this is also executed onchange, see [1]
        var makeUI = eval("WM.Plugins." + functions[0][0] + ".makeUI");
        if (makeUI instanceof Function) {
            divFunction.appendChild(makeUI(functions[0][2]));
        }
        else {
            divFunction.appendChild(document.createElement('div'));
        }
        // Don't use "this.selectedFunction", use "WM.Bot.selectedFunction"
        WM.Bot.selectedFunction = function (title) {
            return eval("WM.Plugins." + functions[0][0] + ".mainAuto")(functions[0][2], title);
        };
        
        fieldset.appendChild(legend);
        fieldset.appendChild(selectFunctions);
        fieldset.appendChild(divFunction);
        
        return fieldset;
    };
    
    this.selectedFunction = function () {};
    
    var makeConfUI = function (listBase) {
        var bot = document.createElement('div');
        
        var fieldset = document.createElement('fieldset');
        
        var legend = document.createElement('legend');
        legend.innerHTML = 'Filter';
        
        var filter = document.createElement('textarea');
        filter.id = 'WikiMonkeyBotFilter';
        
        var preview = document.createElement('input');
        preview.id = 'WikiMonkeyBotPreview';
        preview.type = 'button';
        preview.value = 'Preview';
        
        var inverse = document.createElement('input');
        inverse.type = 'checkbox';
        inverse.id = 'WikiMonkeyBotInverse';
        
        for each (var elem in [filter, inverse]) {
            elem.addEventListener("change", function () {
                WM.Bot.disableStartBot('Filters have changed, preview the selection');
            }, false);
        }
        
        var inversetag = document.createElement('span');
        inversetag.innerHTML = 'Inverse';
        
        var items = listBase.getElementsByTagName('li');
        
        preview.addEventListener("click", (function (lis) {
            return function () {
                WM.Bot.previewFilter(lis);
            }
        })(items), false);
        
        fieldset.appendChild(legend);
        fieldset.appendChild(filter);
        fieldset.appendChild(preview);
        fieldset.appendChild(inverse);
        fieldset.appendChild(inversetag);
        
        var start = document.createElement('input');
        start.type = 'button';
        start.value = 'Start bot';
        start.id = 'WikiMonkeyBotStart';
        
        start.addEventListener("click", (function (lis) {
            return function () {
                WM.Bot.startAutomatic(lis);
            }
        })(items), false);
        
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
    
    var disabledControls = [];
    
    this.disableControls = function () {
        this.setEnableControls(true);
        
        //This was the code for doing this previously
        /*document.getElementById('WikiMonkeyBotSelection').disabled = true;
        disabledControls.push(document.getElementById('WikiMonkeyBotSelection'));
        
        var baseNodes = [document.getElementById('WikiMonkeyBotFunction'),
                     document.getElementById('WikiMonkeyBotFilter').parentNode]
        for each (var base in baseNodes) {
            for each (var tag in ['input', 'select', 'textarea']) {
                for each (var elem in base.getElementsByTagName(tag)) {
                    if (!elem.disabled) {
                        elem.disabled = true;
                        disabledControls.push(elem);
                    }
                } 
            }
        }*/
    };
    
    this.reEnableControls = function () {
        this.setEnableControls(false);
        
        //This was the code for doing this previously
        /*for each (var elem in disabledControls) {
            elem.disabled = false;
        }*/
    };
    
    this.setEnableControls = function (flag) {
        for each (var elem in document.getElementById('WikiMonkeyBot').getElementsByTagName('fieldset')) {
            // HTML5-compliant
            elem.disabled = flag;
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
        var error = false;
        var response = (inverse) ? true : false;
        var firstSlash, lastSlash, pattern, modifiers, regexp, test, negative;
        for each (rule in rules) {
            if (rule) {
                firstSlash = rule.indexOf('/');
                lastSlash = rule.lastIndexOf('/');
                if (firstSlash > -1 && lastSlash > -1 && firstSlash != lastSlash) {
                    pattern = rule.substring(firstSlash + 1, lastSlash);
                    modifiers = rule.substring(lastSlash + 1);
                    negative = rule.charAt(0) == '!';
                    if (modifiers.match(/^(g?i?|ig)$/)) {
                        regexp = new RegExp(pattern, modifiers);
                        test = regexp.test(title);
                        if (!negative != !test) {
                            response = (inverse) ? false : true;
                            // Do not break, so that if among the rules there's
                            // an invalid regexp the function returns false
                        }
                    }
                    else {
                        error = true;
                    }
                }
                else {
                    error = true;
                }
                
                if (error) {
                    WM.Log.logError('Invalid regexp: ' + rule);
                    return false;
                }
            }
        }
        return response;
    };
    
    this.previewFilter = function (items) {
        WM.Log.logInfo('Updating filter preview, please wait...');
        this.disableStartBot('Updating filter preview...');
        var enable = false;
        var link;
        for each (var item in items) {
            link = item.getElementsByTagName('a')[0];
            if (canProcessPage(link.title)) {
                link.className = 'WikiMonkeyBotSelected';
                enable = true;
            }
            else {
                link.className = '';
            }
        }
        WM.Log.logInfo('Preview updated');
        (enable) ? this.enableStartBot() : this.disableStartBot('No pages selected, reset and preview the filter');
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
    
    this.startAutomatic = function (items) {
        if (this.checkOtherBotsRunning() && !this.canForceStart()) {
            WM.Log.logError('Another bot is running, aborting...');
            this.enableForceStart();
        }
        else {
            this.disableForceStart();
            this.setBotToken();
            WM.Log.logInfo('Starting bot...');
            this.disableStartBot('Bot is running...');
            this.disableControls();
            this.processItem(items, 0);
        }
    };
    
    this.processItem = function (items, index) {
        var interval;
        if (WM.MW.isUserBot()) {
            interval = 10000;
        }
        else {
            interval = 120000;
        }
        
        if (!this.checkOtherBotsRunning()) {
            if (items[index]) {
                var link = items[index].getElementsByTagName('a')[0];
                var title = link.title;
                if (canProcessPage(title)) {
                    WM.Log.logInfo('Waiting ' + (interval / 1000) + ' seconds...');
                    var stopId = setTimeout((function (lis, id, ln, article) {
                        return function () {
                            WM.Bot.disableStopBot();
                            ln.className = "WikiMonkeyBotProcessing";
                            WM.Log.logInfo("Processing " + article + "...");
                            if (WM.Bot.selectedFunction(article) === true) {
                                ln.className = "WikiMonkeyBotProcessed";
                                WM.Log.logInfo(article + " processed");
                                // Do not increment directly in the function's call!
                                id++;
                                WM.Bot.processItem(lis, id);
                            }
                            else {
                                ln.className = "WikiMonkeyBotFailed";
                                WM.Log.logError("Error processing " + article + ", stopping the bot");
                                WM.Bot.endAutomatic(true);
                            }
                        };
                    })(items, index, link, title), interval);
                    this.enableStopBot(stopId);
                }
                else {
                    // Do not increment directly in the function's call!
                    index++;
                    WM.Bot.processItem(items, index);
                }
            }
            else {
                this.endAutomatic(true);
            }
        }
        else {
            WM.Log.logError('Another bot has been force-started, stopping...');
            this.endAutomatic(false);
        }
    };
    
    this.endAutomatic = function (reset) {
        this.resetBotToken(reset);
        WM.Log.logInfo('Bot operations completed (check the log for warnings or errors)');
        this.disableStartBot('Bot operations completed, reset and preview the filter');
        this.reEnableControls();
    };
    
    // Incomplete ****************************************************************
    var startSemiAutomatic = function (args) {
        // Remember a value
        GM_setValue('foo' + 'bar');
        
        // Alert all stored values
        for each (var val in GM_listValues()) {
          alert(val + ' : ' + GM_getValue(val));
        }
        
        // Reset array
        for each (var key in GM_listValues()) {
          GM_deleteValue(key);
        }
    };
};
