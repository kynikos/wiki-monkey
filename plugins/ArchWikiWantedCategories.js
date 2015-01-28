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

WM.Plugins.ArchWikiWantedCategories = new function () {
    "use strict";

    this.mainAuto = function (args, title, callBot, chainArgs) {
        title = title.replace(" (page does not exist)", "");

        WM.MW.callQuery({prop: "info",
                         intoken: "edit",
                         titles: title},
                         WM.Plugins.ArchWikiWantedCategories.mainAutoWrite,
                         [title, callBot]);
    };

    this.mainAutoWrite = function (page, args) {
        var title = args[0];
        var callBot = args[1];

        var edittoken = page.edittoken;

        var language = WM.ArchWiki.detectLanguage(title)[1];

        if (language != WM.ArchWiki.getLocalLanguage()) {
            var text = "[[Category:" + language + "]]";
            var summary = "wanted category";

            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: text,
                               createonly: "1",
                               token: edittoken},
                               null,
                               WM.Plugins.ArchWikiWantedCategories.mainAutoEnd,
                               callBot);
        }
        else {
            callBot(0, null);
        }
    };

    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(1, null);
        }
        else if (res.error) {
            WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            callBot(res.error.code, null);
        }
        else {
            callBot(false, null);
        }
    };
};
