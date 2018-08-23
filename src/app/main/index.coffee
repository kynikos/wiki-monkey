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

{Vue, Vuex} = require('../../modules/libs')
store = require('../store')
Log = require('./log')


module.exports.Main = ({ui, display, displayLog, nextNode}) ->
    store.commit('main/show', display)
    store.commit('main/log/show', displayLog)

    root = document.createElement('div')
    $(nextNode).before(root)

    new Vue({
        el: root

        store: store

        computed: Vuex.mapState('main', [
            'display'
        ])

        methods: {
            Vuex.mapMutations('main', [
                'toggle'
            ])...
            Vuex.mapMutations('main/log', {
                hidden: 'hidden'
            })...
        }

        render: (h) ->
            wmmain = h('div', [h(ui), h(Log)])

            legend = h('legend', [
                'Wiki Monkey '
                h('a'
                    {
                        attrs: {href: '#'}
                        on: {
                            click: (event) =>
                                event.preventDefault()
                                @toggle()
                        }
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
    })
