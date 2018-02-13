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

CSS = require('@kynikos/misc/dist/CSS')


class module.exports
    constructor: (@WM, functions, lists) ->
        @configuration =
            plugin_name: null
            function_: ->
            filters: []
            list:
                current: null
                previous: null
            visited: []

        # localStorage can only store strings
        @botToken = "0"

        divContainer = document.createElement('div')
        divContainer.id = 'WikiMonkeyBot'

        CSS.addStyleElement("#WikiMonkeyBot-PluginSelect {width:100%;
                                                    margin-bottom:1em;}
                    #WikiMonkeyBot-ListSelect {margin-bottom:1em;}
                    #WikiMonkeyBotFilter {height:6em; margin-bottom:1em;
                                                        resize:vertical;}
                    #WikiMonkeyBotStart, #WikiMonkeyBotStop
                                {margin-right:0.33em; margin-bottom:1em;
                                font-weight:bold;}
                    a.WikiMonkeyBotSelected {background-color:#faa;
                                                    padding:0.2em 0.4em;}
                    a.WikiMonkeyBotProcessing {background-color:#ff8;
                                                    padding:0.2em 0.4em;}
                    a.WikiMonkeyBotChanged {background-color:#afa;
                                                    padding:0.2em 0.4em;}
                    a.WikiMonkeyBotUnchanged {background-color:#aaf;
                                                    padding:0.2em 0.4em;}
                    a.WikiMonkeyBotBypassed {background-color:orangered;
                                                    padding:0.2em 0.4em;}
                    a.WikiMonkeyBotFailed {background-color:red;
                                                    padding:0.2em 0.4em;}")

        fdiv = @makeFunctionUI(functions)

        if fdiv
            divContainer.appendChild(fdiv)
            divContainer.appendChild(@makeConfUI(lists))
            return divContainer
        else
            return false

    makeFunctionUI: (functions) ->
        self = this
        fieldset = document.createElement('fieldset')

        legend = document.createElement('legend')
        legend.innerHTML = 'Plugin'

        selectFunctions = document.createElement('select')
        selectFunctions.id = 'WikiMonkeyBot-PluginSelect'

        ffunctions = []

        for Plugin in functions
            plugin = new Plugin(@WM)
            pluginInst = plugin.conf.bot_label

            # This allows to disable an entry by giving it any second
            # parameter that evaluates to false
            if not pluginInst or not pluginInst.length
                continue

            ffunctions.push(plugin)
            option = document.createElement('option')
            option.innerHTML = pluginInst

            if plugin.constructor.name is @WM.conf.default_bot_plugin
                option.selected = true

            selectFunctions.appendChild(option)

        if ffunctions.length
            selectFunctions.addEventListener("change", ( (ffunctions) ->
                return ->
                    select = document.getElementById(
                                                'WikiMonkeyBot-PluginSelect')
                    id = select.selectedIndex
                    UI = document.getElementById('WikiMonkeyBotFunction')
                    plugin = ffunctions[id]
                    # [1] Note that this must also be executed immediately,
                    #   see [2]
                    makeUI = plugin.makeBotUI
                    if makeUI instanceof Function
                        UI.replaceChild(makeUI(), UI.firstChild)
                    else
                        # Don't removeChild, otherwise if another plugin with
                        # interface is selected, replaceChild won't work
                        UI.replaceChild(document.createElement('div'),
                                                                UI.firstChild)
                    self.configuration.plugin_name = plugin.constructor.name
                    self.configuration.function_ = (title,
                                                    callContinue, chainArgs) ->
                        plugin.main_bot(title, callContinue, chainArgs)
            )(ffunctions), false)

            divFunction = document.createElement('div')
            divFunction.id = "WikiMonkeyBotFunction"

            plugin = ffunctions[selectFunctions.selectedIndex]

            # [2] Note that this is also executed onchange, see [1]
            makeUI = plugin.makeBotUI
            if makeUI instanceof Function
                divFunction.appendChild(makeUI())
            else
                divFunction.appendChild(document.createElement('div'))
            @configuration.plugin_name = plugin.constructor.name
            @configuration.function_ = (title, callContinue, chainArgs) ->
                plugin.main_bot(title, callContinue, chainArgs)

            fieldset.appendChild(legend)
            fieldset.appendChild(selectFunctions)
            fieldset.appendChild(divFunction)

            return fieldset
        else
            return false

    makeListSelector: (lists) ->
        self = this
        selectLists = document.createElement('select')
        selectLists.id = 'WikiMonkeyBot-ListSelect'

        for list in lists
            if list[0]
                option = document.createElement('option')
                option.innerHTML = list[2]
                selectLists.appendChild(option)

                if not @configuration.list.current
                    # [1] Note that this is also executed onchange, see [2]
                    @configuration.list.current = list

        selectLists.addEventListener("change", ( (lss) ->
            return ->
                select = document.getElementById(
                                                'WikiMonkeyBot-ListSelect')
                id = select.selectedIndex
                self.configuration.list.previous =
                                            self.configuration.list.current
                # [2] Note that this must also be executed immediately,
                #   see [1]
                self.configuration.list.current = lss[id]
        )(lists), false)

        return selectLists

    makeConfUI: (lists) ->
        self = this
        bot = document.createElement('div')

        fieldset = document.createElement('fieldset')

        legend = document.createElement('legend')
        legend.innerHTML = 'Filter'

        listSelect = @makeListSelector(lists)

        filter = document.createElement('textarea')
        filter.id = 'WikiMonkeyBotFilter'

        preview = document.createElement('input')
        preview.id = 'WikiMonkeyBotPreview'
        preview.type = 'button'
        preview.value = 'Preview'

        duplicates = document.createElement('input')
        duplicates.type = 'checkbox'
        duplicates.id = 'WikiMonkeyBotDuplicates'

        inverse = document.createElement('input')
        inverse.type = 'checkbox'
        inverse.id = 'WikiMonkeyBotInverse'

        elems = [filter, duplicates, inverse]

        for elem in elems
            elem.addEventListener("change", ->
                self._disableStartBot(
                                'Filters have changed, preview the selection')
            , false)

        duplicatestag = document.createElement('span')
        duplicatestag.innerHTML = 'Duplicates'

        inversetag = document.createElement('span')
        inversetag.innerHTML = 'Inverse'

        preview.addEventListener("click", @_previewFilter, false)

        fieldset.appendChild(legend)
        if listSelect.length > 1
            fieldset.appendChild(listSelect)
        fieldset.appendChild(filter)
        fieldset.appendChild(preview)
        fieldset.appendChild(duplicates)
        fieldset.appendChild(duplicatestag)
        fieldset.appendChild(inverse)
        fieldset.appendChild(inversetag)

        start = document.createElement('input')
        start.type = 'button'
        start.value = 'Start bot'
        start.id = 'WikiMonkeyBotStart'

        start.addEventListener("click", @_startAutomatic, false)

        start.disabled = true

        startMsg = document.createElement('span')
        startMsg.innerHTML = 'Set and preview the filter first'
        startMsg.id = 'WikiMonkeyBotStartMsg'

        forceStart = document.createElement('span')
        forceStart.id = 'WikiMonkeyBotForceStart'

        forceStartCB = document.createElement('input')
        forceStartCB.type = 'checkbox'
        forceStartCB.disabled = true

        forceStartLabel = document.createElement('span')
        forceStartLabel.innerHTML = 'Force start, stopping any other
                                                    currently running bots'

        forceStart.style.display = "none"
        forceStart.appendChild(forceStartCB)
        forceStart.appendChild(forceStartLabel)

        bot.appendChild(fieldset)
        bot.appendChild(start)
        bot.appendChild(startMsg)
        bot.appendChild(forceStart)

        return bot

    _enableStartBot: ->
        document.getElementById('WikiMonkeyBotStartMsg').innerHTML = ''
        document.getElementById('WikiMonkeyBotStart').disabled = false

    _disableStartBot: (message) ->
        document.getElementById('WikiMonkeyBotStartMsg').innerHTML = message
        document.getElementById('WikiMonkeyBotStart').disabled = true

    _enableStopBot: (stopId) ->
        self = this
        stop = document.createElement('input')
        stop.type = 'button'
        stop.value = 'Stop bot'
        stop.id = 'WikiMonkeyBotStop'

        stop.addEventListener("click", ( (id) ->
            return ->
                clearTimeout(id)
                # run _disableStopBot() here, not in _endAutomatic()
                self._disableStopBot()
                self._endAutomatic(true)
                self.WM.Log.logInfo('Bot stopped manually')
        )(stopId), false)

        start = document.getElementById('WikiMonkeyBotStart')
        start.parentNode.insertBefore(stop, start)
        start.style.display = 'none'

    _disableStopBot: ->
        stop = document.getElementById('WikiMonkeyBotStop')
        stop.parentNode.removeChild(stop)
        document.getElementById('WikiMonkeyBotStart').style.display = 'inline'

    _disableControls: ->
        @_setEnableControls(true)

    _reEnableControls: ->
        @_setEnableControls(false)

    _setEnableControls: (flag) ->
        fsets = document.getElementById('WikiMonkeyBot')
                                            .getElementsByTagName('fieldset')
        for fset in fsets
            # HTML5-compliant
            fset.disabled = flag

    _enableForceStart: ->
        force = document.getElementById('WikiMonkeyBotForceStart')
        force.getElementsByTagName('input')[0].disabled = false
        force.style.display = 'inline'

    _disableForceStart: ->
        force = document.getElementById('WikiMonkeyBotForceStart')
        force.getElementsByTagName('input')[0].checked = false
        force.getElementsByTagName('input')[0].disabled = true
        force.style.display = 'none'

    _canForceStart: ->
        return document.getElementById('WikiMonkeyBotForceStart')
                                    .getElementsByTagName('input')[0].checked

    makeFilters: ->
        @configuration.filters = []
        filters = document.getElementById('WikiMonkeyBotFilter')
                                                        .value.split('\n')

        for filter in filters
            # filter could be an empty string
            if filter
                firstSlash = filter.indexOf('/')
                lastSlash = filter.lastIndexOf('/')
                pattern = filter.substring(firstSlash + 1, lastSlash)
                modifiers = filter.substring(lastSlash + 1)
                negative = filter.charAt(0) == '!'

                try
                    regexp = new RegExp(pattern, modifiers)
                catch exc
                    @WM.Log.logError('Invalid regexp: ' + exc)
                    return false

                @configuration.filters.push([regexp, negative])
                # Do not return nor break, so that if among the filters
                #   there's an invalid regexp the function returns false

        return true

    canProcessPage: (link) ->
        # Exclude red links (they can be found in some special pages)
        if link.className.split(" ").indexOf("new") < 0
            # Don't use link.title because for example in Category pages all
            #   subpages would include "Category:", thus always matching
            #   filters like "/a/", "/t/" etc.
            title = link.innerHTML
            duplicates = document.getElementById('WikiMonkeyBotDuplicates')
                                                                    .checked

            if duplicates or @configuration.visited.indexOf(
                                                                title) < 0
                @configuration.visited.push(title)
                filters = @configuration.filters
                inverse = document.getElementById('WikiMonkeyBotInverse')
                                                                    .checked

                if filters.length > 0
                    for filter in filters
                        regexp = filter[0]
                        negative = filter[1]
                        test = regexp.test(title)

                        if test != negative
                            return if inverse then false else true

                    # No (test != negative) condition has been met in the loop
                    return if inverse then true else false
                else
                    return if inverse then false else true
            else
                return false
        else
            return false

    changeWikiMonkeyLinkClassName: (className, newClass) ->
        classes = className.split(" ")
        newClasses = []

        for cls in classes
            if cls.indexOf("WikiMonkey") < 0
                newClasses.push(cls)

        # Don't push in an else block inside the loop, so that if there was
        # no WikiMonkey class set, it will be added
        newClasses.push(newClass)

        return newClasses.join(" ")

    restoreOriginalLinkClassName: (className) ->
        classes = className.split(" ")
        origClasses = []

        for cls in classes
            if cls.indexOf("WikiMonkey") < 0
                origClasses.push(cls)

        return origClasses.join(" ")

    _previewFilter: =>
        @WM.Log.logInfo('Updating filter preview, please wait ...')
        @_disableStartBot('Updating filter preview ...')

        if @configuration.list.previous
            if @configuration.list.current[0].nodeName == 'TBODY'
                items = @configuration.list.previous[0]
                                                .getElementsByTagName('td')
            else
                items = @configuration.list.previous[0]
                                                .getElementsByTagName('li')
            linkId = @configuration.list.previous[1]

            for item in items
                link = item.getElementsByTagName('a')[linkId]

                # The list item could refer to an invalid title, represented
                # by e.g. <span class="mw-invalidtitle">Invalid title with
                # namespace "Category" and text ""</span>
                if link
                    link.className = @restoreOriginalLinkClassName(
                                                            link.className)

        @configuration.visited = []

        linkId = @configuration.list.current[1]
        enable = false
        N = 0

        if @makeFilters()
            if @configuration.list.current[0].nodeName == 'TBODY'
                items =
                    @configuration.list.current[0].getElementsByTagName(
                                                                        'td')
            else
                items =
                    @configuration.list.current[0].getElementsByTagName(
                                                                        'li')

            for item in items
                link = item.getElementsByTagName('a')[linkId]

                # Also test 'link' itself, because the list item could refer
                # to an invalid title, represented by e.g.
                # <span class="mw-invalidtitle">Invalid title with namespace
                # "Category" and text ""</span>
                if link
                    if @canProcessPage(link)
                        link.className = @changeWikiMonkeyLinkClassName(
                                    link.className, 'WikiMonkeyBotSelected')
                        enable = true
                        N++
                    else
                        link.className = @restoreOriginalLinkClassName(
                                                            link.className)

        @WM.Log.logInfo('Preview updated (' + N + ' pages selected)')

        if enable
            @_enableStartBot()
        else
            @_disableStartBot(
                            'No pages selected, reset and preview the filter')

    _setBotToken: ->
        date = new Date()
        token = date.getTime() + ""
        @botToken = token
        localStorage.setItem('WikiMonkeyBotToken', token)

    _resetBotToken: (reset) ->
        @botToken = "0"
        if reset
            localStorage.setItem('WikiMonkeyBotToken', "0")

    _getBotToken: ->
        return @botToken

    _checkOtherBotsRunning: ->
        value = localStorage.getItem('WikiMonkeyBotToken')

        # value may be null if it's never been stored in localStorage
        return value and value != "0" and value != @_getBotToken()

    _startAutomatic: =>
        if @_checkOtherBotsRunning() and not @_canForceStart()
            @WM.Log.logError("It's not possible to start the bot (without
                        forcing it) for one of the following reasons:<br>
                        * another bot instance is currently running<br>
                        * a previously running bot has stopped due to a
                                                page processing error<br>
                        * a previously running bot has stopped due to a
                                                    Javascript error<br>
                        * a previously running bot has been interrupted by
                                                    a browser page refresh")
            @_enableForceStart()
        else if @makeFilters()
            if @configuration.list.current[0].nodeName == 'TBODY'
                itemsDOM = @configuration.list.current[0]
                                                .getElementsByTagName('td')
            else
                itemsDOM = @configuration.list.current[0]
                                                .getElementsByTagName('li')

            # Passing the live collection with the callback function was
            #   causing it to be lost in an apparently random manner
            items = []

            for item in itemsDOM
                items.push(item)

            linkId = @configuration.list.current[1]

            @_disableForceStart()
            @_setBotToken()
            @WM.Log.logInfo('Starting bot ...')
            @WM.Log.logHidden("Plugin: " + @configuration.plugin_name)
            @WM.Log.logHidden("Filter: " + document.getElementById(
                                                'WikiMonkeyBotFilter').value)
            @_disableStartBot('Bot is running ...')
            @_disableControls()
            @configuration.visited = []

            @WM.MW.isUserBot(@_startAutomaticContinue, [items, linkId])

    _startAutomaticContinue: (botTest, args) =>
        items = args[0]
        linkId = args[1]

        @configuration.interval = if botTest then 3000 else 30000
        @_processItem(0, items, 0, linkId, null)

    makeCallContinue: (lis, id, linkId, ln, article) ->
        self = this
        return (status, resArgs) ->
            switch status
                # The article hasn't been saved
                when 0
                    ln.className = self.changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotUnchanged')
                    self.WM.Log.logInfo(self.WM.Log.linkToWikiPage(article, article) +
                                                    " processed (unchanged)")
                    id++
                    self._processItem(status, lis, id, linkId, resArgs)
                    break
                # The article has been saved
                when 1
                    ln.className = self.changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotChanged')
                    self.WM.Log.logInfo(self.WM.Log.linkToWikiPage(article, article) +
                                                    " processed (changed)")
                    id++
                    self._processItem(status, lis, id, linkId, resArgs)
                    break
                # The plugin has encountered a protectedpage error
                when 'protectedpage'
                    ln.className = self.changeWikiMonkeyLinkClassName(ln.className,
                                                    'WikiMonkeyBotBypassed')
                    self.WM.Log.logWarning("This user doesn't have the rights to " +
                                    "edit " + self.WM.Log.linkToWikiPage(article,
                                    article) + ", bypassing it ...")
                    id++
                    # Change status to 0 (page not changed)
                    self._processItem(0, lis, id, linkId, resArgs)
                    break
                # The plugin has encountered a critical error
                else
                    ln.className = self.changeWikiMonkeyLinkClassName(ln.className,
                                                        'WikiMonkeyBotFailed')
                    self.WM.Log.logError("Error processing " +
                                    self.WM.Log.linkToWikiPage(article, article) +
                                    ", stopping the bot")
                    self._endAutomatic(true)

    _processItem: (status, items, index, linkId, chainArgs) ->
        self = this
        if items[index]
            link = items[index].getElementsByTagName('a')[linkId]

            # Also test 'link' itself, because the list item could refer to an
            # invalid title, represented by e.g.
            # <span class="mw-invalidtitle">Invalid title with namespace
            # "Category" and text ""</span>
            if link and @canProcessPage(link)
                title = link.title

                if status == 0
                    interval = 1000
                else
                    interval = @configuration.interval

                @WM.Log.logInfo('Waiting ' + (interval / 1000) +
                                                            ' seconds ...')

                stopId = setTimeout(( (lis, id, ln, article, chainArgs) ->
                    return ->
                        # Stop must be disabled before any check is performed
                        self._disableStopBot()

                        # Check here if other bots have been started,
                        # _not_ before setTimeout!
                        if not self._checkOtherBotsRunning()
                            ln.className = self.changeWikiMonkeyLinkClassName(
                                    ln.className, 'WikiMonkeyBotProcessing')
                            self.WM.Log.logInfo("Processing " +
                                    self.WM.Log.linkToWikiPage(article, article) +
                                    " ...")

                            self.configuration.function_(article,
                                self.makeCallContinue(lis, id, linkId, ln, article),
                                chainArgs)
                        else
                            self.WM.Log.logError('Another bot has been ' +
                                                'force-started, stopping ...')
                            self._endAutomatic(false)
                )(items, index, link, title, chainArgs), interval)

                @_enableStopBot(stopId)
            else
                index++
                @_processItem(status, items, index, linkId, chainArgs)
        else
            @_endAutomatic(true)

    _endAutomatic: (reset) ->
        @_resetBotToken(reset)
        @WM.Log.logInfo('Bot operations completed (check the log for ' +
                                                        'warnings or errors)')
        @_disableStartBot('Bot operations completed, reset and preview ' +
                                                                'the filter')
        @_reEnableControls()
