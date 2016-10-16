# Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
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

Str = require('../../lib.js.generic/dist/Str')


class module.exports.UpdateCategoryTree
    @REQUIRES_GM = false

    constructor: (@WM) ->

    main: (args, callNext) ->
        inparams = args[0]
        summary = args[1]
        # The third argument was added in 2.0.7, therefore previous
        # configurations don't have it
        if args[2]?
            showRootAlsoIn = args[2]
        else
            showRootAlsoIn = false
            @WM.Log.logInfo("The configuration does not specify the " +
                           "showRootAlsoIn value, defaulting to false")

        if inparams.constructor is Array
            if inparams[0] == "ArchWiki"
                params = @WM.ArchWiki.getTableOfContents(inparams[1])
            else
                @WM.Log.logError("Unrecognized parameter")
                return false
        else
            params = inparams

        @WM.MW.isUserBot(this.mainContinue, [params, showRootAlsoIn, summary,
                                            callNext])

    mainContinue: (botTest, args) =>
        @readToC({
            params: args[0]
            minInterval: if botTest then 60000 else 21600000
            edittoken: ""
            timestamp: ""
            source: ""
            startId: 0
            endId: 0
            treeText: ""
            startMark: "START AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK-->"
            endMark: "<!--END AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK"
            altNames: {}
            showRootAlsoIn: args[1]
            summary: args[2]
            callNext: args[3]
        })

    readToC: (args) =>
        @WM.Log.logInfo('Updating ' + @WM.Log.linkToWikiPage(args.params.page,
                                                args.params.page) + " ...")
        @WM.MW.callQueryEdit(args.params.page,
                            @processToC,
                            args)

    processToC: (title, source, timestamp, edittoken, args) =>
        args.source = source
        args.timestamp = timestamp
        args.edittoken = edittoken

        now = new Date()
        msTimestamp = Date.parse(args.timestamp)
        if now.getTime() - msTimestamp >= args.minInterval
            start = args.source.indexOf(args.startMark)
            end = args.source.lastIndexOf(args.endMark)

            if start > -1 and end > -1
                args.startId = start + args.startMark.length
                args.endId = end
                args.treeText = ""
                args.altNames = if args.params.keepAltName then @storeAlternativeNames(args.source) else {}
                @WM.Cat.recurseTree({
                    node: args.params.root,
                    callNode: @processCategory,
                    callEnd: @writeToC,
                    callArgs: args
                })
            else
                @WM.Log.logError("Cannot find insertion marks in " +
                    @WM.Log.linkToWikiPage(args.params.page, args.params.page))
                if args.callNext
                    args.callNext()
        else
            @WM.Log.logWarning(@WM.Log.linkToWikiPage(args.params.page,
                        args.params.page) + ' has been updated too recently')
            if args.callNext
                args.callNext()

    storeAlternativeNames: (source) =>
        dict = {}
        regExp = /\[\[\:([Cc]ategory\:.+?)\|(.+?)\]\]/gm
        while true
            match = regExp.exec(source)
            if match
                dict[match[1].toLowerCase()] = match[2]
            else
                break
        return dict

    processCategory: (params) =>
        args = params.callArgs

        @WM.Log.logInfo("Processing " + @WM.Log.linkToWikiPage(params.node,
                                                        params.node) + " ...")

        text = ""

        for [0...params.ancestors.length]
            text += args.params.indentType

        if args.params.showIndices
            indices = []
            node = params
            while node.parentIndex != null
                indices.push(node.siblingIndex + 1)
                node = params.nodesList[node.parentIndex]
            if indices.length
                text += "<small>" + indices.reverse().join(".") + ".</small> "

        altName = if args.altNames[params.node.toLowerCase()] then args.altNames[params.node.toLowerCase()] else null
        text += @createCatLink(params.node, args.params.replace, altName)

        text += if args.params.rightToLeft then "&lrm; " else " "

        if params.children == "loop"
            text += "'''[LOOP]'''\n"
            @WM.Log.logWarning("Loop in " + @WM.Log.linkToWikiPage(params.node,
                                                                params.node))
            @processCategoryEnd(params, args, text)
        else
            @WM.Cat.getParentsAndInfo(
                params.node,
                @processCategoryAddSuffix,
                [params, args, text, altName]
            )

    processCategoryAddSuffix: (parents, info, args_) =>
        params = args_[0]
        args = args_[1]
        text = args_[2]
        altName = args_[3]

        currParent = params.ancestors[params.ancestors.length - 1]
        alsoParents = []
        text += "<small>(" + (if info then info.pages else 0) + ")"

        # Allow hiding the "also in" (whose currParent is undefined) links for
        # the root item, since the root's parent category would be displayed
        # there
        if currParent or args.showRootAlsoIn
            for par in parents
                if currParent != par.title and not ("hidden" in par)
                    alsoParents.push(par)

            if alsoParents.length
                parentTitles = []
                for i in alsoParents
                    altName = if args.altNames[alsoParents[i].title.toLowerCase()] then args.altNames[alsoParents[i].title.toLowerCase()] else null
                    parentTitles.push(@createCatLink(alsoParents[i].title,
                                                args.params.replace, altName))

                text += " (" + args.params.alsoIn + " " +
                                                parentTitles.join(", ") + ")"

        text += "</small>\n"

        @processCategoryEnd(params, args, text)

    processCategoryEnd: (params, args, text) =>
        args.treeText += text

        params.callArgs = args

        @WM.Cat.recurseTreeContinue(params)

    createCatLink: (cat, replace, altName) =>
        if altName
            catName = altName
        else if replace
            regExp = new RegExp(replace[0], replace[1])
            catName = cat.substr(9).replace(regExp, replace[2])
        else
            catName = cat.substr(9)
        return "[[:" + cat + "|" + catName + "]]"

    writeToC: (params) =>
        args = params.callArgs

        args.treeText = "\n" + args.treeText
        newtext = Str.overwriteBetween(args.source, args.treeText,
                                                    args.startId, args.endId)

        if newtext != args.source
            @WM.MW.callAPIPost({
                    action: "edit"
                    bot: "1"
                    minor: "1"
                    title: args.params.page
                    summary: args.summary
                    text: newtext
                    basetimestamp: args.timestamp
                    token: args.edittoken
                },
                null,
                @checkWrite,
                args,
                null)
        else
            @WM.Log.logInfo(@WM.Log.linkToWikiPage(args.params.page,
                                args.params.page) + ' is already up to date')

            if args.callNext
                args.callNext()

    checkWrite: (res, args) =>
        if res.edit and res.edit.result == 'Success'
            @WM.Log.logInfo(@WM.Log.linkToWikiPage(args.params.page,
                                    args.params.page) + ' correctly updated')

            if args.callNext
                args.callNext()

        else
            @WM.Log.logError(@WM.Log.linkToWikiPage(args.params.page,
                    args.params.page) + ' has not been updated!\n' +
                    res['error']['info'] + " (" + res['error']['code'] + ")")
