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

{Plugin} = require('./_Plugin')


class module.exports.FixLinkFragments extends Plugin
    @conf_default:
        editor_menu: ["Query plugins", "Fix external section links"]

    processLink: (title, links, index, source, newText, prevId,
                                                            call, callArgs) =>
        if links[index]
            link = links[index]
            rawfragment = link.fragment

            if rawfragment
                @WM.Log.logInfo("Processing " +
                    @WM.Log.linkToWikiPage(link.link, link.rawLink) + " ...")

                target = (if link.namespace then link.namespace + ":" else "") +
                                                                    link.title

                # Note that it's impossible to recognize any namespaces in the
                #   title without querying the server
                # Alternatively, a list of the known namespaces could be
                #   maintained for each wiki
                # Recognizing namespaces would let recognize more liberal link
                #   syntaxes (e.g. spaces around the colon)
                if not @WM.Parser.compareArticleTitles(target, title)
                    params =
                        'action': 'parse'
                        'prop': 'sections'
                        'page': target
                        'redirects': 1

                    @WM.MW.callAPIGet(params,
                             @processLinkContinue,
                             [link, target, rawfragment, links, index, source,
                                    newText, prevId, title, call, callArgs],
                             null)
                else
                    index++
                    @processLink(title, links,
                            index, source, newText, prevId, call, callArgs)
            else
                index++
                @processLink(title, links, index,
                                    source, newText, prevId, call, callArgs)
        else
            newText += source.substr(prevId)
            call(newText, callArgs)

    processLinkContinue: (res, args) =>
        link = args[0]
        target = args[1]
        rawfragment = args[2]
        links = args[3]
        index = args[4]
        source = args[5]
        newText = args[6]
        prevId = args[7]
        title = args[8]
        call = args[9]
        callArgs = args[10]

        # Check that the page is in the wiki (e.g. it's not an interwiki link)
        if res.parse
            sections = []

            for section in res.parse.sections
                sections.push(@WM.Parser.squashContiguousWhitespace(
                                        section.line).trim())

            fixedFragment = @fixFragment(rawfragment, sections)

            newText += source.substring(prevId, link.index)

            if fixedFragment is true
                newText += link.rawLink
            else if fixedFragment
                newText += "[[" + target + "#" + fixedFragment  +
                            (if link.anchor then "|" + link.anchor else "") + "]]"
            else
                @WM.Log.logWarning("Cannot fix broken link fragment: " +
                            @WM.Log.linkToWikiPage(link.link, link.rawLink))
                newText += link.rawLink

            prevId = link.index + link.length

        index++
        @processLink(title, links, index, source,
                                            newText, prevId, call, callArgs)

    fixFragment: (rawfragment, sections) =>
        fragment = @WM.Parser.squashContiguousWhitespace(rawfragment).trim()

        if sections.indexOf(fragment) < 0
            for section in sections
                dotSection = @WM.Parser.dotEncode(section)
                dotFragment = @WM.Parser.dotEncode(fragment)

                if dotSection.toLowerCase() == dotFragment.toLowerCase()
                    if fragment == dotFragment
                        # If the fragment was encoded, re-encode it because it
                        # could contain link-breaking characters (e.g. []|{})
                        # The condition would also be true if the fragment
                        # doesn't contain any encodable characters, but since
                        # section and fragment at most differ by
                        # capitalization, encoding the section won't have any
                        # effect
                        return dotSection
                    else
                        # If the fragment was not encoded, if the fragment
                        # contained link-breaking characters the link was
                        # already broken, and replacing it with section
                        # wouldn't make things worse; if the fragment didn't
                        # contain link-breaking characters, the section
                        # doesn't either, since section and fragment at most
                        # differ by capitalization, so it's safe to replace it
                        # If the fragment was *partially* encoded instead, a
                        # link-breaking character may have been encoded, so
                        # all link-breaking characters must be re-encoded
                        # here!
                        return @WM.Parser.dotEncodeLinkBreakingFragmentCharacters(
                                                                    section)
            return false
        else
            return true

    findArchWikiLinks: (newText, callArgs) =>
        templates = @WM.Parser.findTemplates(newText, 'Related')
        title = @WM.Editor.getTitle()
        @processArchWikiLink(title, templates, 1, 0,
                    newText, "", 0,
                    @findArchWikiLinks2, callArgs)

    findArchWikiLinks2: (newText, callArgs) =>
        templates = @WM.Parser.findTemplates(newText, 'Related2')
        title = @WM.Editor.getTitle()
        @processArchWikiLink(title, templates, 2, 0,
                newText, "", 0, @mainEnd, callArgs)

    processArchWikiLink: (title, templates, expectedArgs, index,
                                    source, newText, prevId, call, callArgs) =>
        if templates[index]
            template = templates[index]
            args = template.arguments

            # Don't crash in case of malformed templates
            if args.length == expectedArgs
                link = args[0].value
                fragId = link.indexOf('#')

                if fragId > -1
                    rawtarget = link.substring(0, fragId)
                    target = @WM.Parser.squashContiguousWhitespace(rawtarget).trim()
                    rawfragment = link.substr(fragId + 1)

                    if rawfragment
                        # Note that it's impossible to recognize any
                        #   namespaces in the title without querying the
                        #   server
                        # Alternatively, a list of the known namespaces could
                        #   be maintained for each wiki
                        # Recognizing namespaces would let recognize more
                        #   liberal link syntaxes (e.g. spaces around the
                        #   colon)
                        if not @WM.Parser.compareArticleTitles(target, title)
                            @WM.Log.logInfo("Processing " +
                                        @WM.Log.linkToWikiPage(link,
                                        template.rawTransclusion) + " ...")

                            params =
                                'action': 'parse'
                                'prop': 'sections'
                                'page': target
                                'redirects': 1

                            @WM.MW.callAPIGet(params,
                                 @processArchWikiLinkContinue,
                                 [template, target, rawfragment, templates,
                                 expectedArgs, index, source, newText,
                                 prevId, title, call, callArgs],
                                 null)
                        else
                            index++
                            @processArchWikiLink(
                                    title, templates, expectedArgs, index,
                                    source, newText, prevId, call, callArgs)
                    else
                        index++
                        @processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs)
                else
                    index++
                    @processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs)
            else
                @WM.Log.logWarning("Template:" + template.title +
                        " must have " + expectedArgs + " and only " +
                        expectedArgs +
                        (if expectedArgs > 1 then " arguments: " else " argument: ") +
                        template.rawTransclusion)
                index++
                @processArchWikiLink(title,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs)

        else
            newText += source.substr(prevId)
            call(newText, callArgs)

    processArchWikiLinkContinue: (res, args) =>
        template = args[0]
        target = args[1]
        rawfragment = args[2]
        templates = args[3]
        expectedArgs = args[4]
        index = args[5]
        source = args[6]
        newText = args[7]
        prevId = args[8]
        title = args[9]
        call = args[10]
        callArgs = args[11]

        # Check that the page is in the wiki (e.g. it's not an interwiki link)
        if res.parse
            sections = []

            for section in res.parse.sections
                sections.push(@WM.Parser.squashContiguousWhitespace(
                                        section.line).trim())

            fixedFragment = @fixFragment(rawfragment, sections)

            newText += source.substring(prevId, template.index)

            if fixedFragment is true
                newText += template.rawTransclusion
            else if fixedFragment
                anchor = if template.arguments[1] then ("|" + template.arguments[1].value) else ""
                newText += "{{" + template.title + "|" + target + "#" + fixedFragment  + anchor + "}}"
            else
                @WM.Log.logWarning("Cannot fix broken link fragment: " +
                    @WM.Log.linkToWikiPage(target, template.rawTransclusion))
                newText += template.rawTransclusion

            prevId = template.index + template.length

        index++
        @processArchWikiLink(title, templates,
                expectedArgs, index, source, newText, prevId, call, callArgs)

    main_editor: (callNext) ->
        source = @WM.Editor.readSource()
        @WM.Log.logInfo("Fixing links to sections of other articles ...")
        links = @WM.Parser.findInternalLinks(source, null, null)
        title = @WM.Editor.getTitle()
        @processLink(title, links, 0, source, "", 0,
                        @mainContinue, callNext)

    mainContinue: (newText, callNext) =>
        # Without this check this plugin would be specific to ArchWiki
        if location.hostname == 'wiki.archlinux.org'
            templates = @findArchWikiLinks(newText, callNext)
        else
            @mainEnd(newText, callNext)

    mainEnd: (newText, callNext) =>
        source = @WM.Editor.readSource()

        if newText != source
            @WM.Editor.writeSource(newText)
            @WM.Log.logInfo("Replaced links to sections of other articles")
        else
            @WM.Log.logInfo("No fixable links to sections of other articles " +
                                                                    "found")

        if callNext
            callNext()
