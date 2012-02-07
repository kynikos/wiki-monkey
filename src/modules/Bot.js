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
    // Incomplete ****************************************************************
    this.demo = function (args) {
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
