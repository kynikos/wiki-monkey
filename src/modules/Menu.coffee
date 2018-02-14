# Wiki Monkey - MediaWiki bot and editor-assistant user script
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

{jssc} = require('./libs')


class module.exports
    constructor: (@WM, @page_type, plugins) ->
        {classes} = jssc(
            menu:
                '& input.margin':
                    margin: "0 0.33em 0.33em 0"
        )

        mainDiv = $('<div/>')
            .attr('id', 'WikiMonkeyMenu')
            .addClass(classes.menu)
        groupActions = {}

        for Plugin in plugins
            plugin = new Plugin(@WM)
            pluginInst = plugin.conf["#{@page_type}_menu"]

            # This allows to disable an entry by giving it a menu_entry
            # parameter that evaluates to false
            if not pluginInst or not pluginInst.length
                continue

            if plugin.makeUI
                groupAction = [@warnInputNeeded, plugin]
            else
                groupAction = [@executeEntryAction, plugin]

            pluginInst.unshift("WikiMonkeyMenuRoot")
            currId = false

            for m in [0...pluginInst.length - 1]
                parentId = currId
                currId = pluginInst.slice(0, m + 1).join("-")
                                                    .replace(/ /g, "_")

                # I can't simply do $("#" + currId) because mainDiv
                # hasn't been added to the DOM tree yet
                menuSel = mainDiv.children("div[id='#{currId}']")

                if not menuSel.length
                    currMenu = $("<div/>")
                        .attr("id", currId)
                        .hide()
                        .appendTo(mainDiv)

                    groupActions[currId] = []

                    if m > 0
                        # I can't simply do $("#" + currId) because mainDiv
                        # hasn't been added to the DOM tree yet
                        parentMenu = mainDiv.children("div[id='#{parentId}']")

                        $('<input/>')
                            .attr('type', 'button')
                            .val('<')
                            .addClass('margin')
                            .click(makeChangeMenu(currMenu, parentMenu))
                            .appendTo(currMenu)

                        $('<input/>')
                            .attr('type', 'button')
                            .val(pluginInst[m])
                            .click(makeGroupAction(groupActions[currId]))
                            .appendTo(parentMenu)

                        $('<input/>')
                            .attr('type', 'button')
                            .val('>')
                            .addClass('margin')
                            .click(makeChangeMenu(parentMenu, currMenu))
                            .appendTo(parentMenu)
                else
                    currMenu = menuSel.first()

                groupActions[currId].push(groupAction)

            entry = $("<input/>")
                .attr('type', 'button')
                .val(pluginInst[pluginInst.length - 1])
                .addClass('margin')
                .appendTo(currMenu)

            if plugin.makeUI
                entry.click(@makeEntryUI(currMenu, plugin))
            else
                entry.click(@makeEntryAction(plugin))

        menus = mainDiv.children()

        if menus.length
            execAll = $('<input/>')
                .attr('type', 'button')
                .val("*")
                .addClass('margin')
                .click(makeGroupAction(groupActions["WikiMonkeyMenuRoot"]))

            # I can't simply do $("#" + currId) because mainDiv
            # hasn't been added to the DOM tree yet
            mainDiv
                .children("div[id='WikiMonkeyMenuRoot']")
                .first()
                .prepend(execAll)

            menus.first().show()
            return mainDiv[0]
        else
            return false

    makeChangeMenu = (currentMenu, changeMenu) ->
        return (event) ->
            currentMenu.hide()
            changeMenu.show()

    makeEntryUI: (currMenu, plugin) ->
        return (event) =>
            currMenu.hide()
            UIdiv = $('<div/>')

            $('<input/>')
                .attr('type', 'button')
                .val('<')
                .addClass('margin')
                .click( (event) ->
                    UIdiv.remove()
                    currMenu.show()
                )
                .appendTo(UIdiv)

            $('<input/>')
                .attr('type', 'button')
                .val('Execute')
                .click(@makeEntryAction(plugin))
                .appendTo(UIdiv)

            UI = plugin.makeUI()
            UIdiv.append(UI).insertAfter(currMenu)

    makeEntryAction: (plugin) ->
        return (event) =>
            @executeEntryAction(plugin, null)

    executeEntryAction: (plugin, callNext) =>
        @WM.Log.logHidden("Plugin: " + plugin.constructor.name)
        plugin["main_#{@page_type}"](callNext)

    warnInputNeeded: (plugin, callNext) =>
        @WM.Log.logWarning("Plugin " + plugin.constructor.name +
            " was not executed because it requires input from its interface.")

        if callNext
            callNext()

    makeGroupAction = (subGroupActions) ->
        return (event) ->
            executeGroupAction(subGroupActions, -1)

    executeGroupAction = (subGroupActions, id) ->
        id++
        if subGroupActions[id]
            fid = subGroupActions[id]
            callContinue = =>
                executeGroupAction(subGroupActions, id)
            fid[0](fid[1], callContinue)
