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

WM.Plugins.ArchWikiTurkishIwLinks = new function () {
    this.mainAuto = function (args, title) {
        // OUT OF DATE #####################################################################

        var pageid = WM.MW.callQuerySync({prop: "revisions",
                                      rvprop: "content",
                                      titles: title});

        var trSource = pageid.revisions[0]["*"];

        var trTitle = trSource.match(/\{\{ *[Mm]ark to delete \(Türkçe\) *\| *(.+?) *\}\}/)[1];

        var enTitle = title.match(/^(.+?) \(Türkçe\)$/)[1];

        var page = WM.MW.callQuerySync({prop: "info|revisions",
                                      rvprop: "content|timestamp",
                                      intoken: "edit",
                                      titles: enTitle});

        var edittoken = page.edittoken;
        var timestamp = page.revisions[0].timestamp;
        var enSource = page.revisions[0]["*"];

        var newText = enSource.replace(/(\{\{ *i18n)/gi, "[[tr:" + trTitle + "]]\n$1");

        if (newText != enSource) {
            var summary = "add Turkish interlanguage link";

            var res = WM.MW.callAPIPostSync({action: "edit",
                                     bot: "1",
                                     title: enTitle,
                                     summary: summary,
                                     text: newText,
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
