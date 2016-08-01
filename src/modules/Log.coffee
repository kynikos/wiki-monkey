# Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
# Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
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

CSS = require('../../lib.js.generic/dist/CSS')
Str = require('../../lib.js.generic/dist/Str')


class module.exports.Log
    constructor: (@WM) ->
        @_currentInfoDisplayState = true

    _makeLogArea: ->
        # The .warning and .error classes are already used by
        # MediaWiki, without associating them with an id and a tag
        CSS.addStyleElement("#WikiMonkeyLogArea {height:10em;
                        border:2px solid #07b; padding:0.5em;
                        overflow:auto; resize:vertical;
                        background-color:#111;}
                    #WikiMonkeyLogArea p.timestamp,
                        #WikiMonkeyLog p.message {border:none; padding:0;
                        font-family:monospace; color:#eee;}
                    #WikiMonkeyLogArea p.timestamp {float:left; width:5em;
                        margin:0 -5em 0 0; font-size:0.9em;}
                    #WikiMonkeyLogArea p.message {margin:0 0 0.5em 5em;}
                    #WikiMonkeyLogArea div.mhidden {display:none;}
                    #WikiMonkeyLogArea div.mjson {display:none;}
                    #WikiMonkeyLogArea div.mdebug p.message {color:cyan;}
                    #WikiMonkeyLogArea div.minfo {}
                    #WikiMonkeyLogArea div.mwarning p.message
                        {color:gold;}
                    #WikiMonkeyLogArea div.merror p.message {color:red;}
                    #WikiMonkeyLogArea a {color:inherit;
                                                text-decoration:underline;}");

        log = document.createElement('div')
        log.id = 'WikiMonkeyLog'

        par = document.createElement('p')
        par.appendChild(@makeFilterLink())
        par.appendChild(document.createTextNode(' '))
        par.appendChild(@makeSaveLink())
        log.appendChild(par)

        logarea = document.createElement('div')
        logarea.id = 'WikiMonkeyLogArea'
        log.appendChild(logarea)

        return log

    makeFilterLink: ->
        self = this
        link = document.createElement('a')
        link.href = '#WikiMonkey'
        link.innerHTML = @computeFilterLinkAnchor()

        link.addEventListener("click", ->
            # Change _currentInfoDisplayState *before* the loop, to prevent
            # race bugs
            self._currentInfoDisplayState = not self._currentInfoDisplayState
            this.innerHTML = self.computeFilterLinkAnchor()

            msgs = document.getElementById('WikiMonkeyLogArea')
                                            .getElementsByClassName('minfo')

            for msg in msgs
                msg.style.display = self.computeInfoDisplayStyle()

            @scrollToBottom()
        , false)

        return link

    makeSaveLink: ->
        self = this
        link = document.createElement('a')
        link.href = '#'
        link.download = 'WikiMonkey.log'
        link.innerHTML = '[save log]'
        link.id = 'WikiMonkeyLog-Save'

        link.addEventListener("click", ->
            link.href = 'data:text/plain;charset=utf-8,' +
                                    encodeURIComponent(self.composeSaveLogText())
            link.download = self.composeSaveLogFilename()
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
        log = document.getElementById('WikiMonkeyLogArea')
        divs = log.getElementsByTagName('div')
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
        return if @_currentInfoDisplayState then 'block' else 'none'

    computeFilterLinkAnchor: ->
        return if @_currentInfoDisplayState then '[hide info messages]' else
                                                        '[show info messages]'

    scrollToBottom: ->
        log = document.getElementById('WikiMonkeyLogArea')
        log.scrollTop = log.scrollHeight - log.clientHeight

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

        log = document.getElementById('WikiMonkeyLogArea')

        test = log.scrollTop + log.clientHeight == log.scrollHeight

        log.appendChild(line)

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
