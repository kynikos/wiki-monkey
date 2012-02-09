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
    };
    
    var diff = [];
    
    this.setDiff = function(rows) {
        diff = rows;
    };
    
    var whatLinksHere = [];
    
    this.setWhatLinksHere = function(rows) {
        whatLinksHere = rows;
    };
    
    this.makeUI = function () {
        var baseNode, nextNode, UI;
        
        if (document.getElementById('editform')) {
            baseNode = document.getElementById('wpSummaryLabel').parentNode.parentNode;
            nextNode = document.getElementById('wpSummaryLabel').parentNode.nextSibling;
            UI = WM.Editor.makeUI(editor);
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            nextNode = document.getElementById('bodyContent').getElementsByTagName('h2')[0];
            baseNode = nextNode.parentNode;
            UI = WM.Editor.makeUI(diff);
        }
        else if (document.getElementById('mw-whatlinkshere-list')) {
            baseNode = document.getElementById('bodyContent')
            nextNode = baseNode.getElementsByTagName('form')[0].nextSibling;
            UI = WM.Bot.makeUI(whatLinksHere, document.getElementById('mw-whatlinkshere-list'));
        }
        
        var main = document.createElement('fieldset');
        main.id = 'WikiMonkey';
        
        GM_addStyle("#WikiMonkeyHelp {float:right; position:relative; top:-1.2em; left:0.4em;}");
        
        var legend = document.createElement('legend');
        legend.innerHTML = 'Wiki Monkey';
        main.appendChild(legend);

        var help = document.createElement('p');
        help.id = 'WikiMonkeyHelp';
        var helpln = document.createElement('a');
        helpln.href = 'index.php/User:Kynikos/Wiki_Monkey'
        helpln.innerHTML = 'help';
        help.appendChild(helpln);
        main.appendChild(help);
        
        main.appendChild(UI);
        main.appendChild(WM.Log.makeLogArea());
        baseNode.insertBefore(main, nextNode);
    };
};
