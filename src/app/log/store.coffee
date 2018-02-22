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

module.exports =
    namespaced: true

    state:
        display: true
        minLevel: 10
        messages: []

    mutations:
        show: (state, show = true) ->
            state.display = show

        hide: (state) ->
            state.display = false

        toggle: (state) ->
            state.display = not state.display

        toggleMinLevel: (state) ->
            state.minLevel = if state.minLevel is 10 then 21 else 10

        hidden: (state, text) ->
            state.messages.push({
                text
                level: 5
                tstamp: new Date()
            })

        json: (state, [component, data]) ->
            text = JSON.stringify({"component": component, "data": data})
            state.messages.push({
                text
                level: 8
                tstamp: new Date()
            })

        debug: (state, text) ->
            state.messages.push({
                text
                level: 10
                tstamp: new Date()
            })

        info: (state, text) ->
            state.messages.push({
                text
                level: 20
                tstamp: new Date()
            })

        warning: (state, text) ->
            state.messages.push({
                text
                level: 30
                tstamp: new Date()
            })

        error: (state, text) ->
            state.messages.push({
                text
                level: 40
                tstamp: new Date()
            })
