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

{Vue, Vuex} = require('../modules/libs')
store = require('./store')
{version} = require('../../package.json')
route = require('./router')
Log = require('./log')

{linkToWikiPage} = require('./_common/WikiLink')
{linkToPage} = require('./_common/PageLink')


module.exports.App = ->
    {ui, display, displayLog, nextNode} = route()

    module.exports.log = {
        logHidden: (text) ->
            store.commit('log/hidden', text)

        logJson: (component, data) ->
            store.commit('log/json', [component, data])

        logDebug: (text) ->
            store.commit('log/debug', text)

        logInfo: (text) ->
            store.commit('log/info', text)

        logWarning: (text) ->
            store.commit('log/warning', text)

        logError: (text) ->
            store.commit('log/error', text)

        linkToWikiPage: (args...) ->
            linkToWikiPage(args...)

        linkToPage: (args...) ->
            linkToPage(args...)
    }

    if not ui
        return false

    store.commit('show', display)
    store.commit('log/show', displayLog)

    root = document.createElement('div')
    $(nextNode).before(root)

    new Vue(
        el: root

        store: store

        computed: Vuex.mapState([
            'display'
        ])

        methods: Vuex.mapMutations([
            'toggle'
        ])

        render: (h) ->
            wmmain = h('div', {attrs: {id: 'WikiMonkeyMain'}}, [h(Log)])

            legend = h('legend', [
                'Wiki Monkey '
                h('a'
                    {
                        attrs: {href: '#'}
                        on:
                            click: (event) =>
                                event.preventDefault()
                                @toggle()
                    }
                    @display and '[hide]' or '[show]'
                )
            ])

            return h('fieldset', {
                attrs: {id: 'WikiMonkey'}
            }, [
                legend
                wmmain if @display
            ])

        mounted: ->
            $('#WikiMonkeyMain').prepend(ui)

            module.exports.log.logHidden("Wiki Monkey version: #{version}")
            date = new Date()
            module.exports.log.logHidden("Date: #{date.toString()}")
            module.exports.log.logHidden("URL: #{location.href}")

        updated: ->
            $wmmain = $('#WikiMonkeyMain')
            if $wmmain.children().length < 2
                $wmmain.prepend(ui)
    )
