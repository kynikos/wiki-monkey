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


class module.exports.FixFragments extends Plugin
    @conf_default:
        enabled: true
        editor_menu: ["Text plugins", "Fix section links"]

    fixLinks: (source) ->
        title = WM.Editor.getTitle()
        sections = @WM.Parser.findSectionHeadings(source).sections

        slinks = @WM.Parser.findSectionLinks(source)
        newtext1 = ""
        prevId = 0

        for link in slinks
            newtext1 += source.substring(prevId, link.index)
            newtext1 += @fixLink(source, sections, link.rawLink, link.fragment,
                                                                link.anchor)
            prevId = link.index + link.length

        newtext1 += source.substr(prevId)

        # Note that it's impossible to recognize any namespaces in the title
        #   without querying the server
        # Alternatively, a list of the known namespaces could be maintained
        #   for each wiki
        # Recognizing namespaces would let recognize more liberal link
        #   syntaxes (e.g. spaces around the colon)
        ilinks = @WM.Parser.findInternalLinks(newtext1, null, title)
        newtext2 = ""
        prevId = 0

        for link in ilinks
            newtext2 += newtext1.substring(prevId, link.index)
            rawfragment = link.fragment

            if rawfragment
                newtext2 += @fixLink(newtext1, sections, link.rawLink,
                                                    rawfragment, link.anchor)
            else
                newtext2 += link.rawLink

            prevId = link.index + link.length

        newtext2 += newtext1.substr(prevId)

        return newtext2

    fixLink: (source, sections, rawlink, rawfragment, lalt) ->
        fragment = @WM.Parser.squashContiguousWhitespace(rawfragment).trim()

        for section in sections
            heading = section.cleanheading
            dotHeading = @WM.Parser.dotEncode(heading)
            dotFragment = @WM.Parser.dotEncode(fragment)

            if dotHeading.toLowerCase() == dotFragment.toLowerCase()
                if fragment == dotFragment
                    # If the fragment was encoded, re-encode it because it
                    # could contain link-breaking characters (e.g. []|{})
                    # The condition would also be true if the fragment doesn't
                    # contain any encodable characters, but since heading and
                    # fragment at most differ by capitalization, encoding the
                    # heading won't have any effect
                    return "[[#" + dotHeading + (if lalt then "|" + lalt else "") + "]]"
                else
                    # If the fragment was not encoded, if the fragment
                    # contained link-breaking characters the link was already
                    # broken, and replacing it with heading wouldn't make
                    # things worse; if the fragment didn't contain
                    # link-breaking characters, the heading doesn't either,
                    # since heading and fragment at most differ by
                    # capitalization, so it's safe to replace it
                    # If the fragment was *partially* encoded instead, a
                    # link-breaking character may have been encoded, so all
                    # link-breaking characters must be re-encoded here!
                    escHeading = @WM.Parser.dotEncodeLinkBreakingFragmentCharacters(heading)
                    return "[[#" + escHeading + (if lalt then "|" + lalt else "") + "]]"

        # It's not easy to use App.log.linkToWikiPage because pure fragments
        #   are not supported yet
        App.log.logWarning("Cannot fix broken section link: " + rawlink)
        return rawlink

    main_editor: (callNext) ->
        source = WM.Editor.readSource()
        newtext = @fixLinks(source)

        if newtext != source
            WM.Editor.writeSource(newtext)
            App.log.logInfo("Fixed section links")
        else
            App.log.logInfo("No fixable section links found")

        if callNext
            callNext()
