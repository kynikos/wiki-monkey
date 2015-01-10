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

WM.Menu = new function () {
    "use strict";

    var mainDiv;

    this._makeUI = function (plugins) {
        Alib.CSS.addStyleElement(
                "#WikiMonkeyMenu input.margin {margin:0 0.33em 0.33em 0;}");

        mainDiv = $('<div/>').attr('id', 'WikiMonkeyMenu');

        if (makeSubMenus(null, plugins)) {
            mainDiv.children().last().show();
            return mainDiv[0];
        }
        else {
            return false;
        }
    };

    var makeSubMenus = function (superMenu, entries) {
        var menuDiv = $('<div/>');
        var groupActions = [];

        if (superMenu) {
            $('<input/>')
                .attr('type', 'button')
                .val('<')
                .addClass('margin')
                .click(makeChangeMenu(menuDiv, superMenu))
                .appendTo(menuDiv);
        }

        for (var e = 0; e < entries.length; e++) {
            var entry = $('<input/>')
                .attr('type', 'button')
                .val(entries[e][0]);

            if (typeof(entries[e][1]) === 'string') {
                var pluginInfo = WM.Cfg.getPlugin(entries[e][1]);

                if (pluginInfo[0].makeUI) {
                    entry.click(makeEntryUI(menuDiv, pluginInfo));
                    groupActions.push([warnInputNeeded, pluginInfo]);
                }
                else {
                    entry.click(makeEntryAction(pluginInfo));
                    groupActions.push([executeEntryAction, pluginInfo]);
                }

                entry
                    .addClass('margin')
                    .appendTo(menuDiv);
            }
            // This allows to disable an entry by giving it any second
            // parameter that evaluates to false
            else if (entries[e][1]) {
                var smres = makeSubMenus(menuDiv, entries[e][1]);
                var subMenuDiv = smres[0];
                var subGroupActions = smres[1];

                entry
                    .click(makeGroupAction(subGroupActions))
                    .appendTo(menuDiv);

                $('<input/>')
                    .attr('type', 'button')
                    .val('>')
                    .addClass('margin')
                    .click(makeChangeMenu(menuDiv, subMenuDiv))
                    .appendTo(menuDiv);
            }
        }

        if (menuDiv[0].hasChildNodes()) {
            menuDiv.hide().appendTo(mainDiv);
            return [menuDiv, groupActions];
        }
        else {
            return false;
        }
    };

    var makeChangeMenu = function (currentMenu, changeMenu) {
        return function (event) {
            currentMenu.hide();
            changeMenu.show();
        };
    };

    var makeEntryUI = function (menuDiv, pluginInfo) {
        return function (event) {
            menuDiv.hide();
            var UIdiv = $('<div/>');

            $('<input/>')
                .attr('type', 'button')
                .val('<')
                .addClass('margin')
                .click(function (event) {
                    UIdiv.remove();
                    menuDiv.show();
                })
                .appendTo(UIdiv);

            $('<input/>')
                .attr('type', 'button')
                .val('Execute')
                .click(makeEntryAction(pluginInfo))
                .appendTo(UIdiv);

            var UI = pluginInfo[0].makeUI(pluginInfo[2]);
            UIdiv.append(UI).insertAfter(menuDiv);
        };
    };

    var makeEntryAction = function (pluginInfo) {
        return function (event) {
            executeEntryAction(pluginInfo, null);
        };
    };

    var executeEntryAction = function (pluginInfo, callNext) {
        WM.Log.logHidden("Plugin: " + pluginInfo[1]);
        pluginInfo[0].main(pluginInfo[2], callNext);
    };

    var warnInputNeeded = function (pluginInfo, callNext) {
        WM.Log.logWarning("Plugin " + pluginInfo[1] +
                " not executed because it requires input from its interface.");

        if (callNext) {
            callNext();
        }
    };

    var makeGroupAction = function (subGroupActions) {
        return function (event) {
            Alib.Async.executeAsync(subGroupActions, -1);
        };
    };
};
