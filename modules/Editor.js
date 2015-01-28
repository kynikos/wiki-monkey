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

WM.Editor = new function () {
    "use strict";

    this.getTitle = function () {
        return WM.Parser.squashContiguousWhitespace(decodeURIComponent(
                                    Alib.HTTP.getURIParameter(null, 'title')));
    };

    this.isSection = function () {
        return (Alib.HTTP.getURIParameter(null, 'section')) ? true : false;
    };

    this.readSource = function () {
        var value = document.getElementById('wpTextbox1').value;
        // For compatibility with Opera and IE
        return Alib.Compatibility.normalizeCarriageReturns(value);
    };

    this.writeSource = function (text) {
        document.getElementById('wpTextbox1').value = text;
    };

    this.readSummary = function () {
        return document.getElementById('wpSummary').getAttribute("value");
    };

    this.writeSummary = function (text) {
        document.getElementById('wpSummary').setAttribute("value", text);
    };

    this.appendToSummary = function (text) {
        document.getElementById('wpSummary').setAttribute("value",
                                                    this.readSummary() + text);
    };
};
