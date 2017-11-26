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

RegEx = require('../../lib.js.generic/dist/RegEx')


class module.exports.ArchWikiOldAURLinks
    @REQUIRES_GM = true

    constructor: (@WM) ->

    doReplace: (source, call, callArgs) =>
        regExp = /\[(https?\:\/\/aur\.archlinux\.org\/packages\.php\?ID\=([0-9]+)) ([^\]]+?)\]/g
        links = RegEx.matchAll(source, regExp)
        newText = source

        if links.length > 0
            @WM.ArchPackages.getAURInfo(links[0].match[2],
                           @doReplaceContinue,
                           [source, newText, links, 0, call, callArgs])
        else
            call(source, newText, callArgs)

    doReplaceContinue: (res, args) =>
        source = args[0]
        newText = args[1]
        links = args[2]
        index = args[3]
        call = args[4]
        callArgs = args[5]

        link = links[index]

        @WM.Log.logInfo("Processing " + @WM.Log.linkToPage(link.match[1],
                                                    link.match[0]) + " ...")

        if res.type == "error"
            @WM.Log.logError("The AUR's RPC interface returned an error: " +
                                                                res.results)
            call(-1, -1, callArgs)
        else
            if res.resultcount > 0
                pkgname = res.results.Name

                if link.match[3] == pkgname
                    newlink = "{{AUR|" + pkgname + "}}"
                    newText = newText.replace(link.match[0], newlink)
                    @WM.Log.logInfo("Checked and replaced link with " +
                                                                    newlink)
                    @doReplaceContinue2(source,
                                        newText, links, index, call, callArgs)
                else
                    @WM.Log.logWarning("Couldn't replace: the link doesn't
                                        use the package name (" + pkgname +
                                        ") as the anchor text")
                    @doReplaceContinue2(source,
                                        newText, links, index, call, callArgs)
            else
                @WM.ArchPackages.isOfficialPackage(link.match[3],
                      @checkIfOfficial,
                      [link, source, newText, links, index, call, callArgs])

    checkIfOfficial: (res, args) =>
        link = args[0]
        source = args[1]
        newText = args[2]
        links = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        if res
            newlink = "{{Pkg|" + link.match[3] + "}}"
            newText = newText.replace(link.match[0], newlink)
            @WM.Log.logInfo("Replaced link with " + newlink)
            @WM.Log.logWarning("The package doesn't exist anymore in the
                        AUR, but a package with the same name as the link
                        anchor has been found in the official repositories")
        else
            @WM.Log.logWarning("Couldn't replace: the package doesn't exist
                              anymore in the AUR and there's no package in
                              the official repositories that has the same
                              name as the link anchor")

        @doReplaceContinue2(source, newText, links, index, call, callArgs)

    doReplaceContinue2: (source, newText, links, index, call, callArgs) =>
        index++

        if links[index]
            @WM.ArchPackages.getAURInfo(links[index].match[2],
                           @doReplaceContinue,
                           [source, newText, links, index, call, callArgs])
        else
            call(source, newText, callArgs)

    main: (args, callNext) ->
        source = @WM.Editor.readSource()
        @WM.Log.logInfo("Replacing old-style direct AUR package links ...")
        @doReplace(source, @mainEnd, callNext)

    mainEnd: (source, newtext, callNext) =>
        if source == -1
            callNext = false
        else if newtext != source
            @WM.Editor.writeSource(newtext)
            @WM.Log.logInfo("Replaced old-style direct AUR package links")
        else
            @WM.Log.logInfo("No automatically replaceable old-style AUR " +
                                                        "package links found")

        if callNext
            callNext()

    mainAuto: (args, title, callBot, chainArgs) ->
        summary = args

        @WM.MW.callQueryEdit(title,
                            @mainAutoReplace,
                            [summary, callBot])

    mainAutoReplace: (title, source, timestamp, edittoken, args) =>
        summary = args[0]
        callBot = args[1]

        @doReplace(source,
                  @mainAutoWrite,
                  [title, edittoken, timestamp, summary, callBot])

    mainAutoWrite: (source, newtext, args) =>
        title = args[0]
        edittoken = args[1]
        timestamp = args[2]
        summary = args[3]
        callBot = args[4]

        if source == -1
            callBot(false, null)
        else if newtext != source
            @WM.MW.callAPIPost({
                                action: "edit"
                                bot: "1"
                                title: title
                                summary: summary
                                text: newtext
                                basetimestamp: timestamp
                                token: edittoken
                               },
                               null,
                               @mainAutoEnd,
                               callBot,
                               null)
        else
            callBot(0, null)

    mainAutoEnd: (res, callBot) =>
        if res.edit and res.edit.result == 'Success'
            callBot(1, null)
        else if res.error
            @WM.Log.logError(res.error.info + " (" + res.error.code + ")")
            callBot(res.error.code, null)
        else
            callBot(false, null)
