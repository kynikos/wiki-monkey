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

    this._makeUI = function (plugins) {
        Alib.CSS.addStyleElement(
                "#WikiMonkeyMenu input.margin {margin:0 0.33em 0.33em 0;}");

        var mainDiv = $('<div/>').attr('id', 'WikiMonkeyMenu');
        var groupActions = {};

        for (var pid in plugins) {
            var pluginConf = plugins[pid];
            var pluginName = pluginConf[0];
            var pluginInst = pluginConf[1];

            // This protects from configurations that define plugins
            // that are actually not installed
            // A try-catch doesn't work...
            if (WM.Plugins[pluginName]) {
                var plugin = WM.Plugins[pluginName];
            }
            else {
                continue;
            }

            // This allows to disable an entry by giving it any second
            // parameter that evaluates to false
            if (!pluginInst || !pluginInst.length) {
                continue;
            }

            if (plugin.makeUI) {
                var groupAction = [warnInputNeeded, pluginConf[0]];
            }
            else {
                var groupAction = [executeEntryAction, [plugin, pluginConf]];
            }

            pluginInst.unshift("WikiMonkeyMenuRoot");
            var currId = false;

            for (var m = 0; m < pluginInst.length - 1; m++) {
                var parentId = currId;
                currId = pluginInst.slice(0, m + 1).join("-")
                                                    .replace(/ /g, "_");

                // I can't simply do $("#" + currId) because mainDiv
                // hasn't been added to the DOM tree yet
                var menuSel = mainDiv.children("div[id='" + currId + "']");

                if (!menuSel.length) {
                    var currMenu = $("<div/>")
                        .attr("id", currId)
                        .hide()
                        .appendTo(mainDiv);

                    groupActions[currId] = [];

                    if (m > 0) {
                        // I can't simply do $("#" + currId) because mainDiv
                        // hasn't been added to the DOM tree yet
                        var parentMenu = mainDiv.children("div[id='" +
                                                            parentId + "']");

                        $('<input/>')
                            .attr('type', 'button')
                            .val('<')
                            .addClass('margin')
                            .click(makeChangeMenu(currMenu, parentMenu))
                            .appendTo(currMenu);

                        $('<input/>')
                            .attr('type', 'button')
                            .val(pluginInst[m])
                            .click(makeGroupAction(groupActions[currId]))
                            .appendTo(parentMenu);

                        $('<input/>')
                            .attr('type', 'button')
                            .val('>')
                            .addClass('margin')
                            .click(makeChangeMenu(parentMenu, currMenu))
                            .appendTo(parentMenu);
                    }
                }
                else {
                    var currMenu = menuSel.first();
                }

                groupActions[currId].push(groupAction);
            }

            var entry = $("<input/>")
                .attr('type', 'button')
                .val(pluginInst[pluginInst.length - 1])
                .addClass('margin')
                .appendTo(currMenu);

            if (plugin.makeUI) {
                entry.click(makeEntryUI(currMenu, plugin, pluginConf));
            }
            else {
                entry.click(makeEntryAction(plugin, pluginConf));
            }
        }

        var menus = mainDiv.children();

        if (menus.length) {
            var execAll = $('<input/>')
                .attr('type', 'button')
                .val("*")
                .addClass('margin')
                .click(makeGroupAction(groupActions["WikiMonkeyMenuRoot"]));

            // I can't simply do $("#" + currId) because mainDiv
            // hasn't been added to the DOM tree yet
            mainDiv
                .children("div[id='WikiMonkeyMenuRoot']")
                .first()
                .prepend(execAll);

            menus.first().show();
            return mainDiv[0];
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

    var makeEntryUI = function (currMenu, plugin, pluginConf) {
        return function (event) {
            currMenu.hide();
            var UIdiv = $('<div/>');

            $('<input/>')
                .attr('type', 'button')
                .val('<')
                .addClass('margin')
                .click(function (event) {
                    UIdiv.remove();
                    currMenu.show();
                })
                .appendTo(UIdiv);

            $('<input/>')
                .attr('type', 'button')
                .val('Execute')
                .click(makeEntryAction(plugin, pluginConf))
                .appendTo(UIdiv);

            var UI = plugin.makeUI(pluginConf[2]);
            UIdiv.append(UI).insertAfter(currMenu);
        };
    };

    var makeEntryAction = function (plugin, pluginConf) {
        return function (event) {
            executeEntryAction([plugin, pluginConf], null);
        };
    };

    var executeEntryAction = function (args, callNext) {
        var plugin = args[0];
        var pluginConf = args[1];
        WM.Log.logHidden("Plugin: " + pluginConf[0]);
        plugin.main(pluginConf[2], callNext);
    };

    var warnInputNeeded = function (pluginName, callNext) {
        WM.Log.logWarning("Plugin " + pluginName +
            " was not executed because it requires input from its interface.");

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
