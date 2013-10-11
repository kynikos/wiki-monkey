/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2013 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.Plugins.ArchWikiPkgAUR = new function () {
    this.mainAuto = function (args, title) {
        // Out of date, should use WM.Parser *************************************

        var pageid = WM.MW.callQuerySync({prop: "info|revisions",
                                     rvprop: "content|timestamp",
                                     intoken: "edit",
                                     titles: title});

        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];

        var newtext = source.replace(/\{\{[Pp]ackage Official\|/g, "{{Pkg|");
        newtext = newtext.replace(/\{\{[Pp]ackage AUR\|/g, "{{AUR|");

        if (newtext != source) {
            var summary = "use new package templates, see [[Help:Style]]";

            var res = WM.MW.callAPIPostSync({action: "edit",
                                     bot: "1",
                                     title: title,
                                     summary: summary,
                                     text: newtext,
                                     basetimestamp: timestamp,
                                     token: edittoken});

            if (res.edit && res.edit.result == 'Success') {
                return true;
            }
            else {
                WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
                return false;
            }
        }
        else {
            return true;
        }
    };
};
