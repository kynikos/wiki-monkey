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

WM.UI = new function () {
    var editor = [];
    
    this.setEditor = function(rows) {
        editor = rows;
    }
    
    this.getEditor = function(rows) {
        return editor;
    }
    
    var diff = [];
    
    this.setDiff = function(rows) {
        diff = rows;
    }
    
    this.getDiff = function(rows) {
        return diff;
    }

    this.makeButtons = function (functions) {
        var divContainer = document.createElement('div');
        
        var buttonAll = document.createElement('input');
        buttonAll.setAttribute('type', 'button');
        buttonAll.setAttribute('value', 'Execute all');
        
        var buttonsN, divRow, buttonRow, divFunction, buttonFunction, makeUI;
        var rowsN = 0; 
        
        for each (var row in functions) {
            buttonRow = document.createElement('input');
            buttonRow.setAttribute('type', 'button');
            buttonRow.setAttribute('value', 'Execute row');
            buttonRow.style.marginRight = '0.67em';
            
            divRow = document.createElement('div');
            divRow.style.margin = '0.67em 0';
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
                divFunction.style.display = 'inline-block';
                divFunction.style.marginRight = '0.33em';
                divFunction.appendChild(buttonFunction);
                
                makeUI = eval("WM.Plugins." + f[0] + ".makeUI");
                if (makeUI instanceof Function) {
                    divFunction.appendChild(makeUI(f[2]));
                }
                
                divRow.appendChild(divFunction);
                
                buttonsN++;
            }
            divContainer.appendChild(divRow);
            
            if (buttonsN > 1) {
                buttonRow.style.backgroundColor = "#08c";
                buttonRow.style.borderColor = "blue";
                buttonRow.style.color = "white";
                buttonRow.style.fontWeight = "bold";
            }
            else {
                buttonRow.disabled = true;
            }
            
            rowsN++;
        }
        divRow = document.createElement('div');
        divRow.style.margin = '0.67em 0';
        if (rowsN > 1) {
            buttonAll.style.backgroundColor = "#08c";
            buttonAll.style.borderColor = "blue";
            buttonAll.style.color = "white";
            buttonAll.style.fontWeight = "bold";
            divRow.appendChild(buttonAll);
        }
        divContainer.appendChild(divRow);
        
        return divContainer;
    };
    
    this.makeUI = function () {
        var baseNode, nextNode, UI;
        
        if (document.getElementById('editform')) {
            baseNode = document.getElementById('wpSummaryLabel').parentNode.parentNode;
            nextNode = document.getElementById('wpSummaryLabel').parentNode.nextSibling;
            UI = this.getEditor();
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            baseNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0].parentNode;
            nextNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0];
            UI = this.getDiff();
        }
        
        var main = document.createElement('fieldset');
        var legend = document.createElement('legend');
        legend.innerHTML = 'Wiki Monkey';
        main.appendChild(legend);
        main.appendChild(this.makeButtons(UI));
        main.appendChild(WM.Log.makeLogArea());
        baseNode.insertBefore(main, nextNode);
    };
};
