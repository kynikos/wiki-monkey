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

WM.Plugins.ArchWikiQuickReport = new function () {
    "use strict";

    this.makeUI = function (args) {
        GM_addStyle("#WikiMonkey-ArchWikiQuickReport > select, " +
                    "#WikiMonkey-ArchWikiQuickReport > input, " +
                    "#WikiMonkey-ArchWikiQuickReport > a " +
                    "{margin-left:0.33em;}");

        var id = args[0];
        var article = args[1];

        var select = document.createElement('select');
        var types = ["&lt;TYPE&gt;", "content", "style"];
        var value, option;
        for (var v in types) {
            value = types[v];
            option = document.createElement('option');
            option.setAttribute('value', value);
            option.innerHTML = value;
            select.appendChild(option);
        }
        select.id = "WikiMonkey-ArchWikiQuickReport-select-" + id;

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.id = "WikiMonkey-ArchWikiQuickReport-input-" + id;

        var link = document.createElement('a');
        link.href = "/index.php/" + article;
        link.innerHTML = article;

        var span = document.createElement('span');
        span.id = "WikiMonkey-ArchWikiQuickReport";
        span.appendChild(select);
        span.appendChild(input);
        span.appendChild(link);

        return span;
    };

    this.main = function (args, callNext) {
        var id = args[0];
        var article = args[1];
        var summary = args[2];

        WM.Log.logInfo('Appending diff to ' +
                            WM.Log.linkToWikiPage(article, article) + " ...");

        var select = document.getElementById(
                                "WikiMonkey-ArchWikiQuickReport-select-" + id);
        var type = select.options[select.selectedIndex].value;

        if (type != 'content' && type != 'style') {
            WM.Log.logError('Select a valid report type');
        }
        else {
            WM.Diff.getEndTimestamp(
                            WM.Plugins.ArchWikiQuickReport.mainGetEndTimestamp,
                            [id, article, type, summary, callNext]);
        }
    };

    this.mainGetEndTimestamp = function (enddate, args) {
        var id = args[0];
        var article = args[1];
        var type = args[2];
        var summary = args[3];
        var callNext = args[4];

        WM.MW.callQueryEdit(article,
                            WM.Plugins.ArchWikiQuickReport.mainWrite,
                            [id, type, summary, enddate, callNext]);
    };

    this.mainWrite = function (article, source, timestamp, edittoken, args) {
        var id = args[0];
        var type = args[1];
        var summary = args[2];
        var enddate = args[3];
        var callNext = args[4];

        var title = Alib.HTTP.getURIParameter(null, 'title');
        var pEnddate = enddate.substr(0, 10) + "&nbsp;" +
                                                        enddate.substr(11, 8);
        var notes = document.getElementById(
                        "WikiMonkey-ArchWikiQuickReport-input-" + id).value;

        var newtext = WM.Tables.appendRow(source, null, ["[" + location.href +
                                    " " + title + "]", pEnddate, type, notes]);

        WM.MW.callAPIPost({action: "edit",
                           bot: "1",
                           title: article,
                           summary: summary,
                           text: newtext,
                           basetimestamp: timestamp,
                           token: edittoken},
                           null,
                           WM.Plugins.ArchWikiQuickReport.mainEnd,
                           [article, callNext]);
    };

    this.mainEnd = function (res, args) {
        var article = args[0];
        var callNext = args[1];

        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo('Diff correctly appended to ' +
                                    WM.Log.linkToWikiPage(article, article));
            if (callNext) {
                callNext();
            }
        }
        else {
            WM.Log.logError('The diff has not been appended!\n' +
                    res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };
};
