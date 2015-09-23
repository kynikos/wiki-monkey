/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
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
    "use strict";

    var makeUI = function () {
        Alib.CSS.addStyleElement("#WikiMonkey-SimpleReplace div " +
                                                "{margin-bottom:0.33em;} " +
                            "#WikiMonkey-SimpleReplace input[type='text'] " +
                                        "{margin-left:0.33em; width:60%;}");

        var divMain = document.createElement('div');
        divMain.id = "WikiMonkey-SimpleReplace";

        var par1 = document.createElement('div');

        var regexpLabel = document.createElement('span');
        regexpLabel.innerHTML = 'RegExp pattern:';

        var regexp = document.createElement('input');
        regexp.setAttribute('type', 'text');
        regexp.id = "WikiMonkey-SimpleReplace-RegExp";

        var ignoreCase = document.createElement('input');
        ignoreCase.setAttribute('type', 'checkbox');
        ignoreCase.id = "WikiMonkey-SimpleReplace-IgnoreCase";

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
        newString.id = "WikiMonkey-SimpleReplace-NewString";

        par2.appendChild(newStringLabel);
        par2.appendChild(newString);

        divMain.appendChild(par1);
        divMain.appendChild(par2);

        return divMain;
    };

    this.makeUI = function (args) {
        return makeUI();
    };

    this.makeBotUI = function (args) {
        var divMain = makeUI();
        var par3 = document.createElement('div');

        var summaryLabel = document.createElement('span');
        summaryLabel.innerHTML = 'Edit summary:';

        var summary = document.createElement('input');
        summary.setAttribute('type', 'text');
        summary.id = "WikiMonkey-SimpleReplace-Summary";

        par3.appendChild(summaryLabel);
        par3.appendChild(summary);

        divMain.appendChild(par3);

        return divMain;
    };

    var configuration;

    var storeConfiguration = function () {
        configuration = {pattern: document.getElementById(
                                "WikiMonkey-SimpleReplace-RegExp").value,
                ignoreCase: document.getElementById(
                        "WikiMonkey-SimpleReplace-IgnoreCase").checked,
                newString: document.getElementById(
                            "WikiMonkey-SimpleReplace-NewString").value,
        };

        WM.Log.logHidden("Pattern: " + configuration.pattern);
        WM.Log.logHidden("Ignore case: " + configuration.ignoreCase);
        WM.Log.logHidden("New string: " + configuration.newString);
    };

    var storeRegExp = function () {
        configuration.regExp = new RegExp(configuration.pattern,
                                "g" + ((configuration.ignoreCase) ? "i" : ""));
    };

    this.main = function (args, callNext) {
        storeConfiguration();

        try {
            storeRegExp();
        }
        catch (exc) {
            WM.Log.logError("Invalid pattern: " + exc);
            // Block the execution of this function
            return false;
        }

        var source = WM.Editor.readSource();
        var newtext = source.replace(configuration.regExp,
                                                    configuration.newString);

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Text substituted");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        storeConfiguration();

        try {
            storeRegExp();
        }
        catch (exc) {
            WM.Log.logError("Invalid pattern: " + exc);
            callBot(false, null);
            // Block the execution of this function
            return false;
        }

        var summary = document.getElementById(
                                    "WikiMonkey-SimpleReplace-Summary").value;

        if (summary != "") {
            WM.MW.callQueryEdit(title,
                                WM.Plugins.SimpleReplace.mainAutoWrite,
                                [summary, callBot]);
        }
        else {
            WM.Log.logError("The edit summary cannot be empty");
            callBot(false, null);
        }
    };

    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var summary = args[0];
        var callBot = args[1];

        var newtext = source.replace(configuration.regExp,
                                                    configuration.newString);

        if (newtext != source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.SimpleReplace.mainAutoEnd,
                               callBot,
                               null);
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
