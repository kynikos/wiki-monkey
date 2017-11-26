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


class module.exports.ArchWikiUpdatePackageTemplates
    @REQUIRES_GM = true

    constructor: (@WM) ->

    doUpdate: (source, call, callArgs) =>
        # Note that findTemplatesPattern puts the pattern in a capturing group
        #   (parentheses) by itself
        templates = @WM.Parser.findTemplatesPattern(source,
                                                "[Pp]kg|[Aa]ur|AUR|[Gg]rp")
        newText = ""

        if templates.length > 0
            @doUpdateContinue(source, newText, templates, 0, call, callArgs)
        else
            call(source, source, callArgs)

    doUpdateContinue: (source, newText, templates, index, call, callArgs) =>
        @WM.Log.logInfo("Processing " + templates[index].rawTransclusion +
                                                                    " ...")

        newText += source.substring((
                                if index == 0 then 0 else templates[index - 1].index +
                                templates[index - 1].length),
                                templates[index].index)

        switch templates[index].title.toLowerCase()
            when 'pkg'
                @doUpdateContinue2(
                    # Checks must be in reversed order because they are popped
                    [@checkGroup32lc,
                     @checkGroup32,
                     @checkGroup64lc,
                     @checkGroup64,
                     @checkAURlc,
                     @checkAUR,
                     @checkOfficiallc,
                     @checkOfficial],
                    source, newText, templates, index, call, callArgs)
            when 'aur'
                @doUpdateContinue2(
                    # Checks must be in reversed order because they are popped
                    [@checkGroup32lc,
                     @checkGroup32,
                     @checkGroup64lc,
                     @checkGroup64,
                     @checkOfficiallc,
                     @checkOfficial,
                     @checkAURlc,
                     @checkAUR],
                    source, newText, templates, index, call, callArgs)
            when 'grp'
                @doUpdateContinue2(
                    # Checks must be in reversed order because they are popped
                    [@checkAURlc,
                     @checkAUR,
                     @checkOfficiallc,
                     @checkOfficial,
                     @checkGroup32lc,
                     @checkGroup32,
                     @checkGroup64lc,
                     @checkGroup64],
                    source, newText, templates, index, call, callArgs)
            else
                newText += templates[index].rawTransclusion
                @doUpdateContinue3(
                    source, newText, templates, index, call, callArgs)

    doUpdateContinue2: (checks, source, newText, templates,
                                                    index, call, callArgs) =>
        check = checks.pop()

        if check
            check(checks, source, newText, templates, index, call, callArgs)
        else
            pkg = templates[index].arguments[0].value.trim()
            @WM.Log.logWarning(pkg +
                        " hasn't been found neither in the official " +
                        "repositories nor in the AUR nor as a package group")
            @WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates",
                    {
                        "error": "notfound"
                        "page": callArgs[0]
                        "pagelanguage": @WM.ArchWiki.detectLanguage(callArgs[0])[1]
                        "package": pkg
                    })

            newText += templates[index].rawTransclusion

            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)

    checkOfficial: (checks, source, newText, templates, index,
                                                            call, callArgs) =>
        pkgname = templates[index].arguments[0].value.trim()
        @WM.Log.logInfo("Looking for " + pkgname +
                                        " in the official repositories ...")

        @WM.ArchPackages.isOfficialPackage(pkgname,
                  @checkOfficial2,
                  [checks, source, newText, templates, index, call, callArgs])

    checkOfficiallc: (checks, source, newText, templates, index,
                                                            call, callArgs) =>
        pkgname = templates[index].arguments[0].value.trim()

        if pkgname.toLowerCase() != pkgname
            @WM.Log.logInfo("Looking for " + pkgname.toLowerCase() +
                            " (lowercase) in the official repositories ...")

            @WM.ArchPackages.isOfficialPackage(pkgname.toLowerCase(),
                  @checkOfficiallc2,
                  [checks, source, newText, templates, index, call, callArgs])
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkAUR: (checks, source, newText, templates, index, call, callArgs) =>
        pkgname = templates[index].arguments[0].value.trim()
        @WM.Log.logInfo("Looking for " + pkgname + " in the AUR ...")

        @WM.ArchPackages.isAURPackage(pkgname,
                 @checkAUR2,
                 [checks, source, newText, templates, index, call, callArgs])

    checkAURlc: (checks, source, newText, templates, index, call, callArgs) =>
        pkgname = templates[index].arguments[0].value.trim()

        if pkgname.toLowerCase() != pkgname
            @WM.Log.logInfo("Looking for " + pkgname.toLowerCase() +
                                                " (lowercase) in the AUR ...")

            @WM.ArchPackages.isAURPackage(pkgname.toLowerCase(),
                 @checkAURlc2,
                 [checks, source, newText, templates, index, call, callArgs])
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkGroup64: (checks, source, newText, templates, index,
                                                            call, callArgs) =>
        grpname = templates[index].arguments[0].value.trim()
        @WM.Log.logInfo("Looking for " + grpname +
                                            " as an x86_64 package group ...")

        @WM.ArchPackages.isPackageGroup64(grpname,
                  @checkGroup64_2,
                  [checks, source, newText, templates, index, call, callArgs])

    checkGroup64lc: (checks, source, newText, templates, index,
                                                            call, callArgs) =>
        grpname = templates[index].arguments[0].value.trim()

        if grpname.toLowerCase() != grpname
            @WM.Log.logInfo("Looking for " + grpname.toLowerCase() +
                                " (lowercase) as an x86_64 package group ...")

            @WM.ArchPackages.isPackageGroup64(grpname.toLowerCase(),
                  @checkGroup64lc2,
                  [checks, source, newText, templates, index, call, callArgs])
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkGroup32: (checks, source, newText, templates, index,
                                                            call, callArgs) =>
        grpname = templates[index].arguments[0].value.trim()
        @WM.Log.logInfo("Looking for " + grpname +
                                            " as an i686 package group ...")

        @WM.ArchPackages.isPackageGroup32(grpname,
                  @checkGroup32_2,
                  [checks, source, newText, templates, index, call, callArgs])

    checkGroup32lc: (checks, source, newText, templates, index,
                                                            call, callArgs) =>
        grpname = templates[index].arguments[0].value.trim()

        if grpname.toLowerCase() != grpname
            @WM.Log.logInfo("Looking for " + grpname.toLowerCase() +
                                " (lowercase) as an i686 package group ...")

            @WM.ArchPackages.isPackageGroup32(grpname.toLowerCase(),
                  @checkGroup32lc2,
                  [checks, source, newText, templates, index, call, callArgs])
        else
            @doUpdateContinue2(checks, source, newText, templates, index, call,
                                                                    callArgs)

    checkOfficial2: (res, args) =>
        checks = args[0]
        source = args[1]
        newText = args[2]
        templates = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        template = templates[index]
        pkgname = template.arguments[0].value.trim()

        if res
            if template.title.toLowerCase() != 'pkg'
                newtemplate = "{{Pkg|" + pkgname + "}}"
                newText += newtemplate
                @WM.Log.logInfo("Replacing template with " + newtemplate)
            else
                newText += template.rawTransclusion

            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkOfficiallc2: (res, args) =>
        checks = args[0]
        source = args[1]
        newText = args[2]
        templates = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        template = templates[index]
        pkgname = template.arguments[0].value.trim()

        if res
            newtemplate = "{{Pkg|" + pkgname.toLowerCase() + "}}"
            newText += newtemplate
            @WM.Log.logInfo("Replacing template with " + newtemplate)

            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkAUR2: (res, args) =>
        checks = args[0]
        source = args[1]
        newText = args[2]
        templates = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        template = templates[index]
        pkgname = template.arguments[0].value.trim()

        if res
            if template.title.toLowerCase() != 'aur'
                newtemplate = "{{AUR|" + pkgname + "}}"
                newText += newtemplate
                @WM.Log.logInfo("Replacing template with " + newtemplate)
            else
                newText += template.rawTransclusion

            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkAURlc2: (res, args) =>
        checks = args[0]
        source = args[1]
        newText = args[2]
        templates = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        template = templates[index]
        pkgname = template.arguments[0].value.trim()

        if res
            newtemplate = "{{AUR|" + pkgname.toLowerCase() + "}}"
            newText += newtemplate
            @WM.Log.logInfo("Replacing template with " + newtemplate)

            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkGroup64_2: (res, args) =>
        checks = args[0]
        source = args[1]
        newText = args[2]
        templates = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        template = templates[index]
        grpname = template.arguments[0].value.trim()

        if res
            if template.title.toLowerCase() != 'grp'
                newtemplate = "{{Grp|" + grpname + "}}"
                newText += newtemplate
                @WM.Log.logInfo("Replacing template with " + newtemplate)
            else
                newText += template.rawTransclusion

            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkGroup64lc2: (res, args) =>
        checks = args[0]
        source = args[1]
        newText = args[2]
        templates = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        template = templates[index]
        grpname = template.arguments[0].value.trim()

        if res
            newtemplate = "{{Grp|" + grpname.toLowerCase() + "}}"
            newText += newtemplate
            @WM.Log.logInfo("Replacing template with " + newtemplate)

            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkGroup32_2: (res, args) =>
        checks = args[0]
        source = args[1]
        newText = args[2]
        templates = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        template = templates[index]
        grpname = template.arguments[0].value.trim()

        if res
            newText += template.rawTransclusion
            @WM.Log.logWarning(grpname + " is a package group for i686 only, " +
                                    "and Template:Grp only supports x86_64")
            @WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates",
                    {
                        "error": "group64",
                        "page": callArgs[0],
                        "pagelanguage": @WM.ArchWiki.detectLanguage(callArgs[0])[1],
                        "package": grpname
                    })
            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    checkGroup32lc2: (res, args) =>
        checks = args[0]
        source = args[1]
        newText = args[2]
        templates = args[3]
        index = args[4]
        call = args[5]
        callArgs = args[6]

        template = templates[index]
        grpname = template.arguments[0].value.trim()

        if res
            newText += template.rawTransclusion
            @WM.Log.logWarning(grpname + " is a package group for i686 only, " +
                                    "and Template:Grp only supports x86_64")
            @WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates",
                    {
                        "error": "group64",
                        "page": callArgs[0],
                        "pagelanguage": @WM.ArchWiki.detectLanguage(callArgs[0])[1],
                        "package": grpname
                    })
            @doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs)
        else
            @doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs)

    doUpdateContinue3: (source, newText, templates, index, call, callArgs) =>
        index++

        if templates[index]
            @doUpdateContinue(source,
                                    newText, templates, index, call, callArgs)
        else
            newText += source.substring(templates[index - 1].index +
                                                templates[index - 1].length)
            call(source, newText, callArgs)

    main: (args, callNext) ->
        title = @WM.Editor.getTitle()
        source = @WM.Editor.readSource()
        @WM.Log.logInfo("Updating package templates ...")
        @doUpdate(source, @mainEnd, [title, callNext])

    mainEnd: (source, newtext, args) =>
        callNext = args[1]

        if newtext != source
            @WM.Editor.writeSource(newtext)
            @WM.Log.logInfo("Updated package templates")
        else
            @WM.Log.logInfo("No automatically updatable package templates " +
                                                                    "found")

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

        @doUpdate(source,
                  @mainAutoWrite,
                  [title, edittoken, timestamp, summary, callBot])

    mainAutoWrite: (source, newtext, args) =>
        title = args[0]
        edittoken = args[1]
        timestamp = args[2]
        summary = args[3]
        callBot = args[4]

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
