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

WM = require('../../modules')
{Vue, Vuex, styled} = require('../../modules/libs')
store = require('../store')
Fieldset = require('../_components/fieldset')

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


module.exports = ({pageType, Plugins, display, displayLog, nextNode}) ->
    store.commit('fieldset/show', display)
    store.commit('log/show', displayLog)

    root = document.createElement('div')
    $(nextNode).before(root)

    new Vue({
        el: root

        store: store

        computed: {
            Vuex.mapState('log', {
                logShown: 'display'
            })...
            Vuex.mapState('filter', [
                'selectedPluginIndex'
                'selectedPluginInstance'
                'enabled'
            ])...
        }

        methods: {
            Vuex.mapMutations('fieldset', {
                hideUI: 'hide'
            })...
            Vuex.mapMutations('log', {
                showLog: 'show'
                hideLog: 'hide'
            })...
            Vuex.mapMutations('filter', [
                'selectPlugin'
                'disable'
            ])...
            executePlugin: ->
                @disable()
                @selectedPluginInstance["main_#{pageType}"]()
        }

        created: ->
            for Plugin, index in Plugins
                if Plugin.constructor.name is
                        WM.conf["default_#{pageType}_plugin"]
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

            return h(Fieldset, [
                h('div', [commandsFilterDiv, pluginUI])
            ])

        mounted: ->
            # The component is remounted if the interface is hidden and then
            # shown again, but the plugin shouldn't be executed again if it's
            # disabled
            if @enabled and WM.conf["default_#{pageType}_plugin_autoexecute"]
                @executePlugin()

                if not @$refs.pluginUI
                    @hideUI()
    })
