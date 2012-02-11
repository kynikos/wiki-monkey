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

WM.Editor = new function () {
    this.makeUI = function (functions) {
        // This interface is used also by WM.Diff
        var divContainer = document.createElement('div');
        divContainer.id = 'WikiMonkeyButtons';
        
        GM_addStyle("#WikiMonkeyButtons input.shortcut {font-weight:bold; margin-right:0.67em;} " +
                    "#WikiMonkeyButtons div.row {margin-bottom:0.67em;} " +
                    "#WikiMonkeyButtons div.pluginUI {display:inline-block; margin-right:0.33em;}");
        
        var buttonAll = document.createElement('input');
        buttonAll.setAttribute('type', 'button');
        buttonAll.setAttribute('value', 'Execute all');
        buttonAll.className = "shortcut";
        
        var buttonsN, divRow, buttonRow, divFunction, buttonFunction, makeUI;
        var rowsN = 0;
        
        for each (var row in functions) {
            buttonRow = document.createElement('input');
            buttonRow.setAttribute('type', 'button');
            buttonRow.setAttribute('value', 'Execute row');
            buttonRow.className = "shortcut";
            
            divRow = document.createElement('div');
            divRow.className = "row";
            divRow.appendChild(buttonRow);
            
            buttonsN = 0;
            
            for each (var f in row) {
                buttonFunction = document.createElement('input');
                buttonFunction.setAttribute('type', 'button');
                buttonFunction.setAttribute('value', f[1]);
                
                for each (var button in [buttonFunction, buttonRow, buttonAll]) {
                    button.addEventListener("click", (function (fn, arg) {
                        return function () {
                            // window[string] doesn't work
                            eval("WM.Plugins." + fn + ".main")(arg);
                        }
                    })(f[0], f[2]), false);
                };
                
                divFunction = document.createElement('div');
                divFunction.className = 'pluginUI';
                divFunction.appendChild(buttonFunction);
                
                makeUI = eval("WM.Plugins." + f[0] + ".makeUI");
                if (makeUI instanceof Function) {
                    divFunction.appendChild(makeUI(f[2]));
                }
                
                divRow.appendChild(divFunction);
                
                buttonsN++;
            }
            divContainer.appendChild(divRow);
            
            if (buttonsN <= 1) {
                buttonRow.disabled = true;
            }
            
            rowsN++;
        }
        divRow = document.createElement('div');
        divRow.className = 'row';
        if (rowsN > 1) {
            divRow.appendChild(buttonAll);
        }
        divContainer.appendChild(divRow);
        
        return divContainer;
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
        document.getElementById('wpSummary').setAttribute("value", this.readSummary() + text);
    };
};
