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

WM.Plugins.DeletePages = new function () {
    "use strict";

    this.mainAuto = function (args, title, chainArgs) {
        var summary = args;

        WM.MW.callQuery({prop: 'info',
                         intoken: 'delete',
                         titles: title},
                         WM.Plugins.DeletePages.mainAutoWrite,
                         [title, summary]);
    };

    this.mainAutoWrite = function (page, args) {
        var title = args[0];
        var summary = args[1];

        var deletetoken = page.deletetoken;

        WM.MW.callAPIPost({action: 'delete',
                           bot: '1',
                           title: title,
                           token: deletetoken,
                           reason: summary},
                           null,
                           WM.Plugins.DeletePages.mainAutoEnd,
                           [title, callBot]);
    };

    this.mainAutoEnd = function (res, args) {
        var title = args[0];
        var callBot = args[1];

        if (!res.delete) {
            if (res.error) {
                WM.Log.logError(WM.Log.linkToWikiPage(title, title) +
                                " has not been deleted!\n" +
                                res.error.info + " (" + res.error.code + ")");
                callBot(res.error.code, null);
            }
            else {
                callBot(false, null);
            }
        }
        else {
            callBot(1, null);
        }
    };
};
