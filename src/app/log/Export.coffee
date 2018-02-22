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

LEVEL_TO_TAG =
    5: 'HDN'
    8: 'JSN'
    10: 'DBG'
    20: 'INF'
    30: 'WRN'
    40: 'ERR'

module.exports =
    name: 'Export'

    methods:
        composeSaveLogText: ->
            divs = @logarea.getElementsByTagName('div')
            text = ''

            for div in divs
                ps = div.getElementsByTagName('p')
                tstamp = ps[0].innerHTML
                level = classesToLevels[div.className]
                message = ps[1].innerHTML

                text += tstamp + '\t' + level + '\t' + message + '\n'

            return text

        composeSaveLogFilename: ->
            date = new Date()
            return 'WikiMonkey-' + date.getFullYear() +
                            Str.padLeft(String(date.getMonth() + 1), '0', 2) +
                            Str.padLeft(String(date.getDate()), '0', 2) +
                            Str.padLeft(String(date.getHours()), '0', 2) +
                            Str.padLeft(String(date.getMinutes()), '0', 2) +
                            '.log'

    render: (h) ->
        h('a', {
            domProps:
                href: '#'
                download: 'WikiMonkey.log'
            on:
                click: (event) =>
                    event.target.href = "data:text/plain;charset=utf-8,#{
                        encodeURIComponent(@composeSaveLogText())}"
                    event.target.download = @composeSaveLogFilename()

        }, '[save log]')
