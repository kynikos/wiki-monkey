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

Vue = require('vue')
{jssc, A, Div, Fieldset, Legend} = require('./libs')
{version} = require('../../package.json')


module.exports = ({WM, display, displayLog, nextNode, ui}) ->
    {classes} = jssc(
        root:
            position: 'relative'

            '& fieldset':
                margin: '0 0 1em 0'
    )

    logArea = WM.Log._makeLogArea()

    root = Div()
    $(nextNode).before(root)

    new Vue(
        el: root

        data:
            display: display

        render: (e) ->
            self = this

            wmmain = e('div', {attrs: {id: 'WikiMonkeyMain'}})

            legend = e('legend', [
                'Wiki Monkey '
                e('a'
                    {
                        attrs: {href: '#WikiMonkey'}
                        on:
                            click: (event) ->
                                event.preventDefault()
                                self.display = not self.display
                    }
                    @display and '[hide]' or '[show]'
                )
            ])

            return e('fieldset', {
                attrs: {id: 'WikiMonkey', class: classes.root}
            }, [
                legend
                wmmain if @display
            ])

        mounted: ->
            if not displayLog
                $(logArea).hide()

            $('#WikiMonkeyMain').append(ui, logArea)

            WM.Log.logHidden("Wiki Monkey version: #{version}")
            date = new Date()
            WM.Log.logHidden("Date: #{date.toString()}")
            WM.Log.logHidden("URL: #{location.href}")

        updated: ->
            $wmmain = $('#WikiMonkeyMain')
            if not $wmmain.children().length
                $wmmain.append(ui, logArea)
    )
