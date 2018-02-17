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

{jssc} = require('../modules/libs')
WM = require('../modules')


class module.exports
    constructor: (@WM, @page_type, plugins) ->
        {classes} = jssc(
            commands:
                display: 'flex'
                alignItems: 'center'
                justifyContent: 'space-between'

                '& > select':
                    flex: 'auto'
                    marginRight: '1em'

                "& > input[type='button']":
                    marginRight: '1em'

                "& input[type='checkbox']":
                    marginRight: '0.4em'
        )

        filters = []
        selectFilter = $('<select/>').change(@updateFilterUI(filters))

        for Plugin in plugins
            plugin = new Plugin(@WM)
            pluginInst = plugin.conf.filter_label

            # This allows to disable an entry by giving it any second
            # parameter that evaluates to false
            if not pluginInst
                continue

            filters.push(plugin)
            option = $('<option/>').text(pluginInst)

            if plugin.constructor.name is WM.conf["default_#{@page_type}_plugin"]
                option[0].selected = true

            option.appendTo(selectFilter)

        if filters.length
            commandsFilterDiv = $('<div/>')
                .attr('id', 'WikiMonkeyFilters-Commands')
                .addClass(classes.commands)

            commandsFilterDiv.append(selectFilter)

            $('<input/>')
                .attr('type', 'button')
                .val('Apply filter')
                .click(@executePlugin(filters))
                .appendTo(commandsFilterDiv)

            $('<input/>')
                .attr('type', 'checkbox')
                .change(@toggleLog)
                .appendTo(commandsFilterDiv)

            $('<span/>')
                .text('Show Log')
                .appendTo(commandsFilterDiv)

            divFilter = $('<div/>')
                .attr('id', "WikiMonkeyFilters-Options")

            # This allows updateFilterUI replace it the first time
            $('<div/>').appendTo(divFilter)
            @doUpdateFilterUI(divFilter, filters, selectFilter[0].selectedIndex)

            div = $('<div/>')
                .attr('id', 'WikiMonkeyFilters')
                .append(commandsFilterDiv)
                .append(divFilter)
            return div[0]
        else
            return false

    updateFilterUI: (filters) =>
        return (event) =>
            UI = $('#WikiMonkeyFilters-Options')
            select = $('#WikiMonkeyFilters-Commands')
                .find('select')
                .first()
            id = select[0].selectedIndex

            @doUpdateFilterUI(UI, filters, id)

    doUpdateFilterUI: (UI, filters, id) ->
        makeUI = filters[id].makeUI

        if makeUI instanceof Function
            UI.children().first().replaceWith(makeUI())
        else
            # Don't remove, otherwise if another plugin with interface is
            # selected, replaceWith won't work
            UI.children().first().replaceWith($('<div/>'))

    executePlugin: (filters) =>
        return (event) =>
            select = $('#WikiMonkeyFilters-Commands')
                .find('select')
                .first()
            id = select[0].selectedIndex

            filters[id]["main_#{@page_type}"]()

            event.target.disabled = true

    toggleLog: (event) ->
        if @checked
            $('#WikiMonkeyLog').show()
        else
            $('#WikiMonkeyLog').hide()
