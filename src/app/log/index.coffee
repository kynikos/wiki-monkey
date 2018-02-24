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

{Vuex, styled} = require('../../modules/libs')

LogFilter = require('./LogFilter')
Export = require('./Export')
Message = require('./Message')

MessageContainer = styled.div(
    height: '10em'
    border: '2px solid #07b'
    padding: '0.5em'
    overflow: 'auto'
    resize: 'vertical'
    backgroundColor: '#111'
)

module.exports =
    name: 'Log'

    computed: Vuex.mapState('log', [
        'display'
        'minLevel'
        'messages'
    ])

    render: (h) ->
        if not @display
            return null

        h('div', [
            h('p', [
                h(LogFilter)
                " "
                h(Export)
            ])
            h(MessageContainer
                (h(Message, {props: {text, level, tstamp, index}}) \
                 for {text, level, tstamp}, index in @messages \
                 when level >= @minLevel)

            )
        ])

    beforeUpdate: ->
        logarea = @$el.lastElementChild
        @isScrolledToBottom =
            logarea.scrollTop + logarea.clientHeight is logarea.scrollHeight

    updated: ->
        if @isScrolledToBottom
            logarea = @$el.lastElementChild
            logarea.scrollTop = logarea.scrollHeight - logarea.clientHeight
