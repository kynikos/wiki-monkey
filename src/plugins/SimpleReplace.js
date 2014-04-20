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

WM.Plugins.SimpleReplace = new function () {
    var makeUI = function (id) {
        GM_addStyle("#WikiMonkey-SimpleReplace {display:inline-block;} " +
                    "#WikiMonkey-SimpleReplace div {display:inline-block;} " +
                    "#WikiMonkey-SimpleReplace input[type='text'] " +
                                                    "{margin-left:0.33em;}");

        var divMain = document.createElement('div');
        divMain.id = "WikiMonkey-SimpleReplace";

        var par1 = document.createElement('div');

        var regexpLabel = document.createElement('span');
        regexpLabel.innerHTML = 'RegExp pattern:';

        var regexp = document.createElement('input');
        regexp.setAttribute('type', 'text');
        regexp.id = "WikiMonkey-SimpleReplace-RegExp-" + id;

        var ignoreCase = document.createElement('input');
        ignoreCase.setAttribute('type', 'checkbox');
        ignoreCase.id = "WikiMonkey-SimpleReplace-IgnoreCase-" + id;

        var ignoreCaseLabel = document.createElement('span');
        ignoreCaseLabel.innerHTML = 'i';

        par1.appendChild(regexpLabel);
        par1.appendChild(regexp);
        par1.appendChild(ignoreCase);
        par1.appendChild(ignoreCaseLabel);

        var par2 = document.createElement('div');

        var newStringLabel = document.createElement('span');
        newStringLabel.innerHTML = 'New string:';

        var newString = document.createElement('input');
        newString.setAttribute('type', 'text');
        newString.id = "WikiMonkey-SimpleReplace-NewString-" + id;

        par2.appendChild(newStringLabel);
        par2.appendChild(newString);

        divMain.appendChild(par1);
        divMain.appendChild(par2);

        return divMain;
    };

    this.makeUI = function (args) {
        var id = args[0];

        var divMain = makeUI(id);

        GM_addStyle("#WikiMonkey-SimpleReplace div {margin-left:1em;}");

        return divMain;
    };

    this.makeBotUI = function (args) {
        var id = args[0];

        var divMain = makeUI(id);

        GM_addStyle("#WikiMonkey-SimpleReplace div {margin-right:2em;}");

        var par3 = document.createElement('div');

        var summaryLabel = document.createElement('span');
        summaryLabel.innerHTML = 'Edit summary:';

        var summary = document.createElement('input');
        summary.setAttribute('type', 'text');
        summary.id = "WikiMonkey-SimpleReplace-Summary-" + id;

        par3.appendChild(summaryLabel);
        par3.appendChild(summary);

        divMain.appendChild(par3);

        return divMain;
    };

    var readConfiguration = function (id) {
        return {pattern: document.getElementById(
                                "WikiMonkey-SimpleReplace-RegExp-" + id).value,
                ignoreCase: document.getElementById(
                        "WikiMonkey-SimpleReplace-IgnoreCase-" + id).checked,
                newString: document.getElementById(
                            "WikiMonkey-SimpleReplace-NewString-" + id).value,
        };
    };

    var doReplace = function (source, id) {
        var config = readConfiguration(id);
        var regexp = new RegExp(config.pattern,
                                    "g" + ((config.ignoreCase) ? "i" : ""));
        return source.replace(regexp, config.newString);
    };

    this.main = function (args, callNext) {
        var id = args[0];
        WM.Log.logHidden("Configuration: " +
                                        JSON.stringify(readConfiguration(id)));

        var source = WM.Editor.readSource();
        var newtext = doReplace(source, id);
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Text substituted");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var id = args[0];
        WM.Log.logHidden("Configuration: " +
                                        JSON.stringify(readConfiguration(id)));

        WM.MW.callQueryEdit(title,
                            WM.Plugins.SimpleReplace.mainAutoWrite,
                            [id, callBot]);
    };

    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var id = args[0];
        var callBot = args[1];

        var newtext = doReplace(source, id);

        if (newtext != source) {
            var summary = document.getElementById(
                            "WikiMonkey-SimpleReplace-Summary-" + id).value;

            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.SimpleReplace.mainAutoEnd,
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
