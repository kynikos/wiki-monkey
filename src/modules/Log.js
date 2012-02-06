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

WM.Log = new function () {
    this.makeLogArea = function () {
        log = document.createElement('div');
        log.id = 'WikiMonkeyLog';
        log.style.height = '10em';
        log.style.border = '2px solid #07b';
        log.style.padding = '0.5em';
        log.style.overflow = 'scroll';
        log.style.resize = 'vertical';
        log.style.backgroundColor = '#111';
        
        return log;
    };
    
    var appendToLog = function (text, color) {
        var tstamp = document.createElement('pre');
        tstamp.style.cssFloat = "left";
        tstamp.style.width = "5em";
        tstamp.style.margin = "0";
        tstamp.style.border = "none";
        tstamp.style.padding = "0";
        tstamp.style.fontSize = "0.9em";
        tstamp.style.color = '#eee';
        tstamp.style.backgroundColor = "transparent";
        var now = new Date();
        tstamp.innerHTML = now.toLocaleTimeString();
        
        var msg = document.createElement('pre');
        msg.style.margin = "0 0 0.5em 5em";
        msg.style.border = "none";
        msg.style.padding = "0";
        msg.style.color = (color) ? color : "#eee";
        msg.style.backgroundColor = "transparent";
        msg.innerHTML = text;
        
        var line = document.createElement('div');
        line.appendChild(tstamp);
        line.appendChild(msg);
        
        document.getElementById('WikiMonkeyLog').appendChild(line);
    };
    
    this.logDebug = function (text) {
        appendToLog(text, 'cyan');
    };
    
    this.logInfo = function (text) {
        appendToLog(text);
    };
    
    this.logWarning = function (text) {
        appendToLog(text, 'gold');
    };
    
    this.logError = function (text) {
        appendToLog(text, 'red');
    };
};
