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

CSS = require('../../lib.js.generic/dist/CSS')


class module.exports.FixBacklinkFragments
    @REQUIRES_GM = false

    constructor: (@WM) ->

    makeBotUI: (args) =>
        CSS.addStyleElement("#WikiMonkey-FixBacklinkFragments " +
                                "input[type='text'] {margin-left:0.33em;}")

        divMain = document.createElement('div')
        divMain.id = "WikiMonkey-FixBacklinkFragments"

        label = document.createElement('span')
        label.innerHTML = 'Target page:'
        divMain.appendChild(label)

        target = document.createElement('input')
        target.setAttribute('type', 'text')
        target.id = "WikiMonkey-FixBacklinkFragments-Target"

        if @WM.WhatLinksHere.isWhatLinksHerePage()
            target.value = @WM.WhatLinksHere.getTitle()

        divMain.appendChild(target)

        return divMain

    readTarget = ->
        return document.getElementById(
                            "WikiMonkey-FixBacklinkFragments-Target").value

    fixLinks: (source, target, sections) =>
        # Note that it's impossible to recognize any namespaces in the title
        #   without querying the server
        # Alternatively, a list of the known namespaces could be maintained
        #   for each wiki
        # Recognizing namespaces would let recognize more liberal link
        #   syntaxes (e.g. spaces around the colon)
        links = @WM.Parser.findInternalLinks(source, null, target)

        newText = ""
        prevId = 0

        for link in links
            newText += source.substring(prevId, link.index)
            newlink = link.rawLink

            rawfragment = link.fragment

            if rawfragment
                fixedFragment = @fixFragment(rawfragment, sections)

                if fixedFragment is true
                    null
                else if fixedFragment
                    oldlink = newlink
                    newlink = "[[" + target + "#" + fixedFragment +
                        (if link.anchor then "|" + link.anchor else "") + "]]"
                    @WM.Log.logInfo("Fixed broken link fragment: " + oldlink +
                        " -> " + @WM.Log.linkToWikiPage(link.link, newlink))
                else
                    @WM.Log.logWarning("Cannot fix broken link fragment: " +
                                    @WM.Log.linkToWikiPage(link.link, newlink))

            newText += newlink
            prevId = link.index + link.length

        newText += source.substr(prevId)

        # Without this check this plugin would be specific to ArchWiki
        if location.hostname == 'wiki.archlinux.org'
            newText = @fixArchWikiLinks(newText, target, sections)

        return newText

    fixArchWikiLinks: (source, target, sections) =>
        links = @WM.Parser.findTemplates(source, 'Related')

        newText1 = ""
        prevId = 0

        for link in links
            newText1 += source.substring(prevId, link.index)
            newText1 += @fixArchWikiLink(target, sections, link, 1)
            prevId = link.index + link.length

        newText1 += source.substr(prevId)

        links2 = @WM.Parser.findTemplates(newText1, 'Related2')

        newText2 = ""
        prevId = 0

        for link2 in links2
            newText2 += newText1.substring(prevId, link2.index)
            newText2 += @fixArchWikiLink(target, sections, link2, 2)
            prevId = link2.index + link2.length

        newText2 += newText1.substr(prevId)

        return newText2

    fixArchWikiLink: (target, sections, template, expectedArgs) =>
        args = template.arguments

        # Don't crash in case of malformed templates
        if args.length == expectedArgs
            link = args[0].value
            fragId = link.indexOf('#')

            if fragId > -1
                ltitle = link.substring(0, fragId)

                # Note that it's impossible to recognize any namespaces in the
                #   title without querying the server
                # Alternatively, a list of the known namespaces could be
                #   maintained for each wiki
                # Recognizing namespaces would let recognize more liberal link
                #   syntaxes (e.g. spaces around the colon)
                if @WM.Parser.compareArticleTitles(ltitle, target)
                    rawfragment = link.substr(fragId + 1)
                    fixedFragment = @fixFragment(rawfragment, sections)

                    if fixedFragment is true
                        null
                    else if fixedFragment
                        anchor = if args[1] then ("|" + args[1].value) else ""
                        newlink = "{{" + template.title + "|" + target +
                                        "#" + fixedFragment  + anchor + "}}"
                        @WM.Log.logInfo("Fixed broken link fragment: " +
                                        template.rawTransclusion + " -> " +
                                        @WM.Log.linkToWikiPage(link, newlink))
                        return newlink

                    else
                        @WM.Log.logWarning("Cannot fix broken link fragment: " +
                                                    @WM.Log.linkToWikiPage(link,
                                                    template.rawTransclusion))

        else
            @WM.Log.logWarning("Template:" + template.title + " must have " +
                        expectedArgs + " and only " + expectedArgs +
                        (if expectedArgs > 1 then " arguments: " else " argument: ") +
                        template.rawTransclusion)

        return template.rawTransclusion

    fixFragment: (rawfragment, sections) =>
        if rawfragment
            fragment = @WM.Parser.squashContiguousWhitespace(rawfragment)
                                                                    .trim()

            if sections.indexOf(fragment) < 0
                for section in sections
                    # The FixFragments and FixLinkFragments plugins also try
                    # to fix dot-encoded fragments however it's too dangerous
                    # to do it with this bot plugin, have the user fix
                    # fragments manually
                    if section.toLowerCase() == fragment.toLowerCase()
                        return section

                return false
            else
                return true
        else
            return true

    mainAuto: (args, title, callBot, chainArgs) ->
        summary = args

        target = readTarget()
        @WM.Log.logHidden("Target page: " + target)

        if target
            if chainArgs is null
                params =
                    'action': 'parse'
                    'prop': 'sections'
                    'page': target
                    'redirects': 1

                @WM.Log.logWarning("If some articles in the list are
                    linking to the target article
                    through a redirect, you should process the backlinks
                    of that redirect page separately through its
                    Special:WhatLinksHere page, as this plugin can only
                    fix links that exactly match the title of the target
                    article.\nIn order to save time you are advised to
                    hide the redirects in the page lists that allow to do
                    so.")

                @WM.MW.callAPIGet(params,
                         @mainAutoFindSections,
                         [title, target, summary, callBot],
                         null)
            else
                @mainAutoRead(target, chainArgs, title, summary, callBot)
        else
            @WM.Log.logError('The target page cannot be empty')
            callBot(false, null)

    mainAutoFindSections: (res, args) =>
        title = args[0]
        target = args[1]
        summary = args[2]
        callBot = args[3]
        sections = []

        if res.parse
            for section in res.parse.sections
                sections.push(@WM.Parser.squashContiguousWhitespace(
                                        section.line).trim())

            @mainAutoRead(target, sections, title, summary, callBot)

        else
            @WM.Log.logError("The set target page, " + target +
                                                    ", seems not to exist")

            if res.error
                callBot(res.error.code, sections)
            else
                callBot(false, sections)

    mainAutoRead: (target, sections, title, summary, callBot) =>
        @WM.MW.callQueryEdit(title,
                            @mainAutoWrite,
                            [target, summary, callBot, sections])

    mainAutoWrite: (title, source, timestamp, edittoken, args) =>
        target = args[0]
        summary = args[1]
        callBot = args[2]
        sections = args[3]

        newtext = @fixLinks(source, target, sections)

        if newtext != source
            @WM.MW.callAPIPost({
                                    action: "edit",
                                    bot: "1",
                                    title: title,
                                    summary: summary,
                                    text: newtext,
                                    basetimestamp: timestamp,
                                    token: edittoken
                                },
                                @mainAutoEnd,
                                [callBot, sections],
                                null)
        else
            callBot(0, sections)

    mainAutoEnd: (res, args) =>
        callBot = args[0]
        sections = args[1]

        if res.edit and res.edit.result == 'Success'
            callBot(1, sections)
        else if res.error
            @WM.Log.logError(res.error.info + " (" + res.error.code + ")")
            callBot(res.error.code, sections)
        else
            callBot(false, sections)
