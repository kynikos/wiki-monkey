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

{jssc} = require('../modules/libs')
WM = require('../modules')
App = require('../app')
{Plugin} = require('./_Plugin')


class module.exports.SimpleReplace extends Plugin
    @conf_default:
        enabled: true
        editor_menu: ["RegExp substitution"]
        bot_label: "RegExp substitution"

    makeUI = ->
        {classes} = jssc(
            simpleReplace:
                '& div':
                    marginBottom: '0.33em'

                "& input[type='text']":
                    marginLeft: '0.33em'
                    width: '60%'
        )

        divMain = document.createElement('div')
        divMain.id = "WikiMonkey-SimpleReplace"
        divMain.className = classes.simpleReplace

        par1 = document.createElement('div')

        regexpLabel = document.createElement('span')
        regexpLabel.innerHTML = 'RegExp pattern:'

        regexp = document.createElement('input')
        regexp.setAttribute('type', 'text')
        regexp.id = "WikiMonkey-SimpleReplace-RegExp"

        ignoreCase = document.createElement('input')
        ignoreCase.setAttribute('type', 'checkbox')
        ignoreCase.id = "WikiMonkey-SimpleReplace-IgnoreCase"

        ignoreCaseLabel = document.createElement('span')
        ignoreCaseLabel.innerHTML = 'i'

        par1.appendChild(regexpLabel)
        par1.appendChild(regexp)
        par1.appendChild(ignoreCase)
        par1.appendChild(ignoreCaseLabel)

        par2 = document.createElement('div')

        newStringLabel = document.createElement('span')
        newStringLabel.innerHTML = 'New string:'

        newString = document.createElement('input')
        newString.setAttribute('type', 'text')
        newString.id = "WikiMonkey-SimpleReplace-NewString"

        par2.appendChild(newStringLabel)
        par2.appendChild(newString)

        divMain.appendChild(par1)
        divMain.appendChild(par2)

        return divMain

    makeUI: ->
        return makeUI()

    makeBotUI: ->
        divMain = makeUI()
        par3 = document.createElement('div')

        summaryLabel = document.createElement('span')
        summaryLabel.innerHTML = 'Edit summary:'

        summary = document.createElement('input')
        summary.setAttribute('type', 'text')
        summary.id = "WikiMonkey-SimpleReplace-Summary"

        par3.appendChild(summaryLabel)
        par3.appendChild(summary)

        divMain.appendChild(par3)

        return divMain

    configuration = null

    storeConfiguration: =>
        configuration =
            pattern: document.getElementById(
                                "WikiMonkey-SimpleReplace-RegExp").value
            ignoreCase: document.getElementById(
                                "WikiMonkey-SimpleReplace-IgnoreCase").checked
            newString: document.getElementById(
                                "WikiMonkey-SimpleReplace-NewString").value

        App.log.hidden("Pattern: " + configuration.pattern)
        App.log.hidden("Ignore case: " + configuration.ignoreCase)
        App.log.hidden("New string: " + configuration.newString)

    storeRegExp = ->
        configuration.regExp = new RegExp(configuration.pattern,
                        "g" + (if configuration.ignoreCase then "i" else ""))

    main_editor: (callNext) ->
        @storeConfiguration()

        try
            storeRegExp()
        catch exc
            App.log.error("Invalid pattern: " + exc)
            # Block the execution of this function
            return false

        source = WM.Editor.readSource()
        newtext = source.replace(configuration.regExp,
                                                    configuration.newString)

        if newtext != source
            WM.Editor.writeSource(newtext)
            App.log.info("Text substituted")

        if callNext
            callNext()

    main_bot: (title, callBot, chainArgs) ->
        @storeConfiguration()

        try
            storeRegExp()
        catch exc
            App.log.error("Invalid pattern: " + exc)
            callBot(false, null)
            # Block the execution of this function
            return false

        summary = document.getElementById(
                                    "WikiMonkey-SimpleReplace-Summary").value

        if summary != ""
            WM.MW.callQueryEdit(title,
                                @mainAutoWrite,
                                [summary, callBot])
        else
            App.log.error("The edit summary cannot be empty")
            callBot(false, null)

    mainAutoWrite: (title, source, timestamp, edittoken, args) =>
        summary = args[0]
        callBot = args[1]

        newtext = source.replace(configuration.regExp,
                                                    configuration.newString)

        if newtext != source
            WM.MW.callAPIPost({action: "edit", bot: "1", title: title, summary: summary, text: newtext, basetimestamp: timestamp, token: edittoken},
                               @mainAutoEnd,
                               callBot,
                               null)
        else
            callBot(0, null)

    mainAutoEnd: (res, callBot) =>
        if res.edit and res.edit.result == 'Success'
            callBot(1, null)
        else if res.error
            App.log.error(res.error.info + " (" + res.error.code + ")")
            callBot(res.error.code, null)
        else
            callBot(false, null)
