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

{Vuex, styled} = require('../../../modules/libs')
store = require('../../store')
WM = require('../../../modules')

Commands = styled.div({
    display: 'flex'
    alignItems: 'center'
    justifyContent: 'space-between'
})

Select = styled.select({
    flex: 'auto'
    marginRight: '1em'
})

Button = styled.button({
    marginRight: '1em'
})

Checkbox = styled.input({
    marginRight: '0.4em'
})


module.exports = (page_type, Plugins) -> {
    # "Filter" is a standard HTML tag name
    name: 'Filters'

    computed: {
        Vuex.mapState('main/log', {
            logShown: 'display'
        })...
        Vuex.mapState('main/filter', [
            'selectedPluginIndex'
            'selectedPluginInstance'
            'enabled'
        ])...
    }

    methods: {
        Vuex.mapMutations('main', {
            hideUI: 'hide'
        })...
        Vuex.mapMutations('main/log', {
            showLog: 'show'
            hideLog: 'hide'
        })...
        Vuex.mapMutations('main/filter', [
            'selectPlugin'
            'disable'
        ])...
        executePlugin: ->
            @disable()
            @selectedPluginInstance["main_#{page_type}"]()
    }

    created: ->
        for Plugin, index in Plugins
            if Plugin.constructor.name is
                    WM.conf["default_#{page_type}_plugin"]
                @selectPlugin([index, new Plugin()])
                break
        if not @selectedPluginInstance
            @selectPlugin([0, new Plugins[0]()])

    render: (h) ->
        selectFilter = h(Select
            {
                attrs: {
                    disabled: not @enabled
                }
                on: {
                    change: (event) =>
                        index = event.target.selectedIndex
                        @selectPlugin([index, new Plugins[index]()])
                }
            }
            for Plugin, index in Plugins
                h('option', {
                    attrs: {
                        selected: index is @selectedPluginIndex
                    }
                }, [Plugin::conf.filter_label])
        )

        applyFilter = h(Button, {
            attrs: {
                disabled: not @enabled
            }
            on: {
                click: @executePlugin
            }
        }, ['Apply filter'])

        toggleLog = h(Checkbox, {
            attrs: {
                type: 'checkbox'
                checked: @logShown
            }
            on: {
                change: =>
                    if @logShown then @hideLog() else @showLog()
            }
        })

        commandsFilterDiv = h(Commands, [
            selectFilter
            applyFilter
            toggleLog
            h('span', ["Show log"])
        ])

        makeUI = @selectedPluginInstance.makeUI
        if makeUI instanceof Function
            pluginUI = h('div', {ref: 'pluginUI'}, [h(makeUI())])

        return h('div', [commandsFilterDiv, pluginUI])

    mounted: ->
        # The component is remounted if the interface is hidden and then
        # shown again, but the plugin shouldn't be executed again if it's
        # disabled
        if @enabled and WM.conf["default_#{page_type}_plugin_autoexecute"]
            @executePlugin()

            if not @$refs.pluginUI
                @hideUI()
}
