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
Str = require('../../lib.js.generic/dist/Str')


class module.exports.Log
    constructor: (@WM) ->
        @_currentInfoDisplayState = true

        # The .warning and .error classes are already used by
        # MediaWiki, without associating them with an id and a tag
        styles =
            log:
                height: '10em'
                border: '2px solid #07b'
                padding: '0.5em'
                overflow: 'auto'
                resize: 'vertical'
                'background-color': '#111'

                '& p.timestamp, & p.message':
                    border: 'none'
                    padding: 0
                    'font-family': 'monospace'
                    color: '#eee'

                '& p.timestamp':
                    margin: '0 1em 0 0'
                    'white-space': 'nowrap'

                '& p.message':
                    margin: 0

                '& div.mdebug, & div.minfo, & div.mwarning, & div.merror':
                    display: 'flex'

                '& div.mhidden':
                    display: 'none'

                '& div.mjson':
                    display: 'none'

                '& div.mdebug p.message':
                    color: 'cyan'

                '& div.mwarning p.message':
                    color: 'gold'

                '& div.merror p.message':
                     color: 'red'

                '& a':
                    color: 'inherit'
                    'text-decoration': 'underline'

        {classes} = jss.createStyleSheet(
            styles, {classNamePrefix: "WikiMonkey-"}).attach()
        @classes = classes

    _makeLogArea: ->
        log = document.createElement('div')
        log.id = 'WikiMonkeyLog'

        par = document.createElement('p')
        par.appendChild(@makeFilterLink())
        par.appendChild(document.createTextNode(' '))
        par.appendChild(@makeSaveLink())
        log.appendChild(par)

        @logarea = document.createElement('div')
        @logarea.className = @classes.log
        log.appendChild(@logarea)

        return log

    makeFilterLink: ->
        link = document.createElement('a')
        link.href = '#WikiMonkey'
        link.innerHTML = @computeFilterLinkAnchor()

        link.addEventListener("click", (event) =>
            event.preventDefault()
            # Change _currentInfoDisplayState *before* the loop, to prevent
            # race bugs
            @_currentInfoDisplayState = not @_currentInfoDisplayState
            link.innerHTML = @computeFilterLinkAnchor()

            msgs = @logarea.getElementsByClassName('minfo')

            for msg in msgs
                msg.style.display = @computeInfoDisplayStyle()

            @scrollToBottom()
        , false)

        return link

    makeSaveLink: ->
        link = document.createElement('a')
        link.href = '#'
        link.download = 'WikiMonkey.log'
        link.innerHTML = '[save log]'
        link.id = 'WikiMonkeyLog-Save'

        link.addEventListener("click", =>
            link.href = 'data:text/plain;charset=utf-8,' +
                                    encodeURIComponent(@composeSaveLogText())
            link.download = @composeSaveLogFilename()
        , false)

        return link

    classesToLevels =
        'mhidden': 'HDN'
        'mjson': 'JSN'
        'mdebug': 'DBG'
        'minfo': 'INF'
        'mwarning': 'WRN'
        'merror': 'ERR'

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

    computeInfoDisplayStyle: ->
        return if @_currentInfoDisplayState then 'flex' else 'none'

    computeFilterLinkAnchor: ->
        return if @_currentInfoDisplayState then '[hide info messages]' else
                                                        '[show info messages]'

    scrollToBottom: ->
        @logarea.scrollTop = @logarea.scrollHeight - @logarea.clientHeight

    appendMessage: (text, type) ->
        tstamp = document.createElement('p')
        tstamp.className = 'timestamp'
        now = new Date()
        tstamp.innerHTML = now.toLocaleTimeString()

        msg = document.createElement('p')
        msg.className = 'message'
        # Do not allow the empty string, otherwise the resulting html element
        # may not be rendered by the browser
        msg.innerHTML = if text then text else " "

        line = document.createElement('div')
        line.appendChild(tstamp)
        line.appendChild(msg)
        line.className = type

        if type == 'minfo'
            line.style.display = @computeInfoDisplayStyle()

        # This test must be done *before* appending the new line
        test = @logarea.scrollTop + @logarea.clientHeight == \
                                                        @logarea.scrollHeight

        @logarea.appendChild(line)

        if test
            @scrollToBottom()

    logHidden: (text) ->
        @appendMessage(text, 'mhidden')

    logJson: (component, data) ->
        text = JSON.stringify({"component": component, "data": data})
        @appendMessage(text, 'mjson')

    logDebug: (text) ->
        @appendMessage(text, 'mdebug')

    logInfo: (text) ->
        @appendMessage(text, 'minfo')

    logWarning: (text) ->
        @appendMessage(text, 'mwarning')

    logError: (text) ->
        @appendMessage(text, 'merror')

    linkToPage: (url, anchor) ->
        # Must return a string, not a DOM element
        return "<a href=\"" + url + "\">" + anchor + "</a>"

    linkToWikiPage: (title, anchor) ->
        # Must return a string, not a DOM element
        # Use an absolute (full) URL so it will be usable in the downloadable
        #   version of the log
        # Do *not* use encodeURIComponent(title) because the passed title may
        #   have a fragment or a query string that would then be encoded
        #   MediaWiki should be able to correctly resolve the title anyway
        wikiUrls = @WM.MW.getWikiUrls()
        return "<a href=\"" + wikiUrls.short + title + "\">" + anchor + "</a>"
