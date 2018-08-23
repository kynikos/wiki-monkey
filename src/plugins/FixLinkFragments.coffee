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

WM = require('../modules')
App = require('../app')
{Plugin} = require('./_Plugin')


class module.exports.FixLinkFragments extends Plugin
    @conf_default:
        enabled: true
        editor_menu: ["Query plugins", "Fix external section links"]

    processLink: (title, iwprefixes, links, index, source, newText, prevId,
                                                            call, callArgs) =>
        if links[index]
            link = links[index]
            rawfragment = link.fragment

            if not (link.namespace? and link.namespace.toLowerCase() in iwprefixes) and rawfragment
                App.log.info("Processing " +
                    App.log.WikiLink(link.link, link.rawLink) + " ...")

                target = (if link.namespace then link.namespace + ":" else "") +
                                                                    link.title

                # Note that it's impossible to recognize any namespaces in the
                #   title without querying the server
                # Alternatively, a list of the known namespaces could be
                #   maintained for each wiki
                # Recognizing namespaces would let recognize more liberal link
                #   syntaxes (e.g. spaces around the colon)
                if not WM.Parser.compareArticleTitles(target, title)
                    params =
                        'action': 'parse'
                        'prop': 'sections'
                        'page': target
                        'redirects': 1

                    WM.MW.callAPIGet(params,
                             @processLinkContinue,
                             [link, target, rawfragment, iwprefixes, links, index, source,
                                    newText, prevId, title, call, callArgs],
                             null)
                else
                    index++
                    @processLink(title, iwprefixes, links,
                            index, source, newText, prevId, call, callArgs)
            else
                index++
                @processLink(title, iwprefixes, links, index,
                                    source, newText, prevId, call, callArgs)
        else
            newText += source.substr(prevId)
            call(newText, iwprefixes, callArgs)

    processLinkContinue: (res, args) =>
        link = args[0]
        target = args[1]
        rawfragment = args[2]
        iwprefixes = args[3]
        links = args[4]
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
                sections.push(WM.Parser.squashContiguousWhitespace(
                                        section.line).trim())

            fixedFragment = @fixFragment(rawfragment, sections)

            newText += source.substring(prevId, link.index)

            if fixedFragment is true
                newText += link.rawLink
            else if fixedFragment
                newText += "[[" + target + "#" + fixedFragment  +
                            (if link.anchor then "|" + link.anchor else "") + "]]"
            else
                App.log.warning("Cannot fix broken link fragment: " +
                            App.log.WikiLink(link.link, link.rawLink))
                newText += link.rawLink

            prevId = link.index + link.length

        index++
        @processLink(title, iwprefixes, links, index, source,
                                            newText, prevId, call, callArgs)

    fixFragment: (rawfragment, sections) =>
        fragment = WM.Parser.squashContiguousWhitespace(rawfragment).trim()

        if sections.indexOf(fragment) < 0
            for section in sections
                dotSection = WM.Parser.dotEncode(section)
                dotFragment = WM.Parser.dotEncode(fragment)

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
                        return WM.Parser.dotEncodeLinkBreakingFragmentCharacters(
                                                                    section)
            return false
        else
            return true

    findArchWikiLinks: (newText, iwprefixes, callArgs) =>
        templates = WM.Parser.findTemplates(newText, 'Related')
        title = WM.Editor.getTitle()
        @processArchWikiLink(title, iwprefixes, templates, 1, 0,
                    newText, "", 0,
                    @findArchWikiLinks2, callArgs)

    findArchWikiLinks2: (newText, iwprefixes, callArgs) =>
        templates = WM.Parser.findTemplates(newText, 'Related2')
        title = WM.Editor.getTitle()
        @processArchWikiLink(title, iwprefixes, templates, 2, 0,
                newText, "", 0, @mainEnd, callArgs)

    processArchWikiLink: (title, iwprefixes, templates, expectedArgs, index,
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
                    target = WM.Parser.squashContiguousWhitespace(rawtarget).trim()
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
                        if not WM.Parser.compareArticleTitles(target, title)
                            App.log.info("Processing " +
                                        App.log.WikiLink(link,
                                        template.rawTransclusion) + " ...")

                            params =
                                'action': 'parse'
                                'prop': 'sections'
                                'page': target
                                'redirects': 1

                            WM.MW.callAPIGet(params,
                                 @processArchWikiLinkContinue,
                                 [template, target, rawfragment, iwprefixes, templates,
                                 expectedArgs, index, source, newText,
                                 prevId, title, call, callArgs],
                                 null)
                        else
                            index++
                            @processArchWikiLink(
                                    title, iwprefixes, templates, expectedArgs, index,
                                    source, newText, prevId, call, callArgs)
                    else
                        index++
                        @processArchWikiLink(title, iwprefixes,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs)
                else
                    index++
                    @processArchWikiLink(title, iwprefixes,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs)
            else
                App.log.warning("Template:" + template.title +
                        " must have " + expectedArgs + " and only " +
                        expectedArgs +
                        (if expectedArgs > 1 then " arguments: " else " argument: ") +
                        template.rawTransclusion)
                index++
                @processArchWikiLink(title, iwprefixes,
                                        templates, expectedArgs, index, source,
                                        newText, prevId, call, callArgs)

        else
            newText += source.substr(prevId)
            call(newText, iwprefixes, callArgs)

    processArchWikiLinkContinue: (res, args) =>
        template = args[0]
        target = args[1]
        rawfragment = args[2]
        iwprefixes = args[3]
        templates = args[4]
        expectedArgs = args[5]
        index = args[6]
        source = args[7]
        newText = args[8]
        prevId = args[9]
        title = args[10]
        call = args[11]
        callArgs = args[12]

        # Check that the page is in the wiki (e.g. it's not an interwiki link)
        if res.parse
            sections = []

            for section in res.parse.sections
                sections.push(WM.Parser.squashContiguousWhitespace(
                                        section.line).trim())

            fixedFragment = @fixFragment(rawfragment, sections)

            newText += source.substring(prevId, template.index)

            if fixedFragment is true
                newText += template.rawTransclusion
            else if fixedFragment
                anchor = if template.arguments[1] then ("|" + template.arguments[1].value) else ""
                newText += "{{" + template.title + "|" + target + "#" + fixedFragment  + anchor + "}}"
            else
                App.log.warning("Cannot fix broken link fragment: " +
                    App.log.WikiLink(target, template.rawTransclusion))
                newText += template.rawTransclusion

            prevId = template.index + template.length

        index++
        @processArchWikiLink(title, iwprefixes, templates,
                expectedArgs, index, source, newText, prevId, call, callArgs)

    main_editor: (callNext) ->
        source = WM.Editor.readSource()
        App.log.info("Fixing links to sections of other articles ...")
        title = WM.Editor.getTitle()
        res = await WM.MW.getInterwikiMap(title)
        iwprefixes = (iw.prefix for iw in res.query.interwikimap)
        links = WM.Parser.findInternalLinks(source, null, null)
        @processLink(title, iwprefixes, links, 0, source, "", 0,
                     @mainContinue, callNext)

    mainContinue: (newText, iwprefixes, callNext) =>
        # Without this check this plugin would be specific to ArchWiki
        if location.hostname == 'wiki.archlinux.org'
            templates = @findArchWikiLinks(newText, iwprefixes, callNext)
        else
            @mainEnd(newText, iwprefixes, callNext)

    mainEnd: (newText, iwprefixes, callNext) =>
        source = WM.Editor.readSource()

        if newText != source
            WM.Editor.writeSource(newText)
            App.log.info("Replaced links to sections of other articles")
        else
            App.log.info("No fixable links to sections of other articles " +
                                                                    "found")

        if callNext
            callNext()
