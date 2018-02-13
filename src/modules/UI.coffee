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

{jss} = require('./libs')
{version} = require('../../package.json')


class module.exports
    constructor: (@WM, {display, displayLog, nextNode, UI}) ->
        styles =
            root:
                position: 'relative'
                
                '& fieldset':
                    margin: '0 0 1em 0'

        {classes} = jss.createStyleSheet(
            styles, {classNamePrefix: "WikiMonkey-"}).attach()

        main = document.createElement('fieldset')
        main.id = 'WikiMonkey'
        main.className = classes.root

        legend = document.createElement('legend')
        legend.appendChild(document.createTextNode('Wiki Monkey '))

        hide = document.createElement('a')
        hide.href = '#WikiMonkey'
        hide.innerHTML = '[hide]'
        hide.addEventListener("click", (event) ->
            event.preventDefault()
            wmmain = document.getElementById('WikiMonkeyMain')
            if wmmain.style.display == 'none'
                wmmain.style.display = 'block'
                this.innerHTML = '[hide]'
            else
                wmmain.style.display = 'none'
                this.innerHTML = '[show]'
        , false)
        legend.appendChild(hide)

        main.appendChild(legend)

        main2 = document.createElement('div')
        main2.id = 'WikiMonkeyMain'

        main2.appendChild(UI)

        logArea = @WM.Log._makeLogArea()
        if not displayLog
            logArea.style.display = 'none'

        main2.appendChild(logArea)

        if not display
            main2.style.display = 'none'
            hide.innerHTML = '[show]'

        main.appendChild(main2)

        nextNode.parentNode.insertBefore(main, nextNode)

        @WM.Log.logHidden("Wiki Monkey version: #{version}")
        date = new Date()
        @WM.Log.logHidden("Date: #{date.toString()}")
        @WM.Log.logHidden("URL: #{location.href}")
