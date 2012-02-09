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
        
        GM_addStyle("#WikiMonkeyBot {}");  // ************************************
        
        var selectFunctions = document.createElement('select');
        
        for each (var f in functions) {
            option = document.createElement('option');
            option.innerHTML = f[1];
            selectFunctions.appendChild(option);
        }
        
        selectFunctions.addEventListener("change", (function (fns) {
            return function () {
                var select = document.getElementById('WikiMonkeyBot').getElementsByTagName('select')[0];
                var id = select.selectedIndex;
                var UI = document.getElementById('WikiMonkeyBotFunctionUI');
                var makeUI = eval("WM.Plugins." + fns[id][0] + ".makeUI");
                if (makeUI instanceof Function) {
                    UI.replaceChild(makeUI(fns[id][2]), UI.firstChild);
                }
            }
        })(functions), false);
        
        divContainer.appendChild(selectFunctions);
        
        var divFunction = document.createElement('div');
        divFunction.id = "WikiMonkeyBotFunctionUI";
        divContainer.appendChild(divFunction);
        
        var makeUI = eval("WM.Plugins." + functions[0][0] + ".makeUI");
        if (makeUI instanceof Function) {
            divFunction.appendChild(makeUI(functions[0][2]));
        }
        
        divContainer.appendChild(makeConfUI(listBase));
        
        return divContainer;
    };
    
    var makeConfUI = function (listBase) {
        var bot = document.createElement('div');
        bot.id = 'WikiMonkeyBotConf';
        
        GM_addStyle("#WikiMonkeyBotFilter {height:6em; resize:vertical;} " +
                    "a.WikiMonkeyBotSelected {background-color:#faa; padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotProcessing {background-color:#ff8; padding:0.2em 0.4em;} " +
                    "a.WikiMonkeyBotProcessed {background-color:#afa; padding:0.2em 0.4em;}");
        
        var instructions = document.createElement('p');
        instructions.innerHTML = 'Filter: each article in the list will be evaluated with each row in the text area, as regular expressions. If a line starts with "!" and the article matches, it will be excluded. For a literal "!" at the beginning of the line, escape it with "\\". The evaluations are made in a cascading way, so between two conflicting rules the last one prevails.';
        bot.appendChild(instructions);
        
        var filter = document.createElement('textarea');
        filter.id = 'WikiMonkeyBotFilter';
        // Disable bot onchange? *************************************************
        bot.appendChild(filter);
        
        var inversetag = document.createElement('p');
        inversetag.innerHTML = 'Inverse selection';
        var inverse = document.createElement('input');
        inverse.setAttribute('type', 'checkbox');
        inverse.id = 'WikiMonkeyBotInverse';
        inversetag.appendChild(inverse);
        bot.appendChild(inversetag);
        
        var items = listBase.getElementsByTagName('li');
        
        var preview = document.createElement('input');
        preview.setAttribute('type', 'button');
        preview.setAttribute('value', 'Preview filter');
        
        preview.addEventListener("click", (function (lis) {
            return function () {
                WM.Bot.previewFilter(lis);
            }
        })(items), false);
        
        bot.appendChild(preview);
        
        var start = document.createElement('input');
        start.setAttribute('type', 'button');
        start.setAttribute('value', 'Start bot');
        
        start.addEventListener("click", (function (lis) {
            return function () {
                WM.Bot.startAutomatic(lis);
            }
        })(items), false);
        
        //start.disabled = true;  // ***********************************************
        bot.appendChild(start);
        
        return bot;
    };
    
    var canProcessPage = function (title) {
        var rules = document.getElementById('WikiMonkeyBotFilter').value.split('\n');
        var inverse = document.getElementById('WikiMonkeyBotInverse').checked;
        var response = (inverse) ? true : false;
        var firstSlash, lastSlash, pattern, modifiers, regexp, test, negative;
        for each (rule in rules) {
            // Do not process the empty string (rough validation)
            if (rule) {
                firstSlash = rule.indexOf('/');
                lastSlash = rule.lastIndexOf('/');
                pattern = rule.substring(firstSlash + 1, lastSlash);
                modifiers = rule.substring(lastSlash + 1);
                regexp = new RegExp(pattern, modifiers);
                test = regexp.test(title);
                negative = rule.charAt(0) == '!';
                if (!negative != !test) {
                    response = (inverse) ? false : true;
                    break;
                }
            }
        }
        return response;
    };
    
    this.previewFilter = function (items) {
        WM.Log.logInfo('Updating filter preview, please wait...');
        // Disable bot ***********************************************************
        var link;
        for each (var item in items) {
            link = item.getElementsByTagName('a')[0];
            item.getElementsByTagName('a')[0].className = (canProcessPage(link.title)) ? 'WikiMonkeyBotSelected' : "";
        }
        WM.Log.logInfo('Preview updated');
    };
    
    this.startAutomatic = function (items) {
        WM.Log.logInfo('Starting bot...');
        // Disable preview *******************************************************
        // Disable other bots ****************************************************
        // Force start? **********************************************************
        // Warning banner in position:fixed? *************************************
        this.processItem(items, 0);
    };
    
    this.processItem = function (items, index) {
        var interval = 1000;  // *************************************************
        if (items[index]) {
            var link = items[index].getElementsByTagName('a')[0];
            var title = link.title;
            if (canProcessPage(title)) {
                WM.Log.logDebug('Wait ' + (interval / 1000) + ' seconds...');  // **************************************
                setTimeout((function (lis, id, ln, article) {
                    return function () {
                        ln.className = "WikiMonkeyBotProcessing";
                        WM.Log.logDebug(article);  // **************************************
                        ln.className = "WikiMonkeyBotProcessed";
                        // Do not increment directly in the function's call!
                        id++;
                        WM.Bot.processItem(lis, id);
                    };
                })(items, index, link, title), interval);
            }
            else {
                // Do not increment directly in the function's call!
                index++;
                WM.Bot.processItem(items, index);
            }
        }
        else {
            this.endAutomatic();
        }
    };
    
    this.endAutomatic = function () {
        // ***********************************************************************
        WM.Log.logInfo('Bot operations completed (check the log for warnings or errors)');
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
