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

WM.Diff = new function () {
    this.getEndTimestamp = function() {
        var title = WM.getURIParameter('title');
        var diff = WM.getURIParameter('diff');
        var oldid = WM.getURIParameter('oldid');
        var xml, enddate;
        
        switch (diff) {
            case 'next':
                xml = WM.MW.callAPIGet(["action=query", "prop=revisions",
                                  "titles=" + title, "rvlimit=2",
                                  "rvprop=timestamp", "rvdir=newer",
                                  "rvstartid=" + oldid]);
                enddate = xml.getElementsByTagName('rev')[1].getAttribute('timestamp');
                break;
            case 'prev':
                xml = WM.MW.callAPIGet(["action=query", "prop=revisions",
                                  "revids=" + oldid, "rvprop=timestamp"]);
                enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
                break;
            default:
                xml = WM.MW.callAPIGet(["action=query", "prop=revisions",
                                  "revids=" + diff, "rvprop=timestamp"]);
                enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
        }
        
        return enddate;
    };
};
