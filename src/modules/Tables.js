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

WM.Tables = new function () {
    this.appendRow = function (title, mark, values, summary) {
        xml = WM.MW.callAPIGet(["action=query", "prop=info|revisions",
                                "rvprop=content", "intoken=edit",
                                "titles=" + encodeURIComponent(title)]);
        
        var page = xml.getElementsByTagName('page')[0];
        var rev = xml.getElementsByTagName('rev')[0];
        var edittoken = page.getAttribute('edittoken');
        var timestamp = rev.getAttribute('timestamp');
        
        var source = WM.getLongTextNode(rev);
        
        var lastId = source.lastIndexOf('|}&lt;!--' + mark);
        var endtable = (lastId > -1) ? lastId : source.lastIndexOf('|}');
        
        var part1 = source.substring(0, endtable);
        var part2 = source.substring(endtable);
        
        var newtext = part1 + "|-\n|" + values.join("\n|") + "\n" + part2;
        
        xml = WM.MW.callAPIPost(["action=edit", "bot=1",
                              "title=" + encodeURIComponent(title),
                              "summary=" + encodeURIComponent(summary),
                              "text=" + encodeURIComponent(newtext),
                              "basetimestamp=" + timestamp,
                              "token=" + encodeURIComponent(edittoken)]);
        
        var edit = xml.getElementsByTagName('edit')[0];
        return (edit && edit.getAttribute('result') == 'Success') ? true : false;
    };
};
