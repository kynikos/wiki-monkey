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


class module.exports.ArchWikiFixHeader extends Plugin
    @conf_default:
        enabled: true
        editor_menu: ["Text plugins", "Fix header"]

    main_editor: (callNext) ->
        source = WM.Editor.readSource()

        language = WM.ArchWiki.detectLanguage(WM.Editor.getTitle())[1]

        header = ""
        content = source

        # <noinclude>
        content = content.replace(/^\s*<noinclude>/, "")
        if content != source
            header += "<noinclude>\n"

        # DISPLAYTITLE and Template:Lowercase_title
        displaytitle = WM.Parser.findVariables(content, "DISPLAYTITLE")
        lowercasetitle = WM.Parser.findTemplates(content, "Lowercase title")
        titlemods = displaytitle.concat(lowercasetitle)
        titlemods.sort( (a, b) ->
            return a.index - b.index
        )
        tempcontent = ""
        contentId = 0
        for titlemod in titlemods
            tempcontent += content.substring(contentId, titlemod.index)
            contentId = titlemod.index + titlemod.length

        tempcontent += content.substring(contentId)
        content = tempcontent
        dt = displaytitle.pop()
        lct = lowercasetitle.pop()
        dlct = ""
        if dt and not lct
            dlct = "{{DISPLAYTITLE:" + dt.value + "}}"
        else if not dt and lct
            dlct = "{{Lowercase title}}"
        else if dt and lct
            dlct = if dt.index < lct.index then "{{Lowercase title}}" else "{{DISPLAYTITLE:#{dt.value}}}"
        if displaytitle.length or lowercasetitle.length
            App.log.logWarning("Found multiple instances of
                {{DISPLAYTITLE:...}} or {{Lowercase title}}: only the last
                one has been used, the others have been deleted")

        # Behavior switches
        behaviorswitches = WM.Parser.findBehaviorSwitches(content)
        bslist = []
        tempcontent = ""
        contentId = 0
        for bswitch, b in behaviorswitches
            if bswitch.match[1] in ["TOC", "START", "END"]
                behaviorswitches.splice(b, 1)
            else
                if bswitch.match[0] not in bslist
                    bslist.push(bswitch.match[0])
                else
                    App.log.logWarning("Removed duplicate of
                                        #{bswitch.match[0]}")
                tempcontent += content.substring(contentId, bswitch.index)
                contentId = bswitch.index + bswitch.length

        tempcontent += content.substring(contentId)
        content = tempcontent

        if not dlct and bslist.length
            header += bslist.join(" ") + "\n"
        else if dlct and not bslist.length
            header += dlct + "\n"
        else if dlct and bslist.length
            header += dlct + " " + bslist.join(" ") + "\n"

        # Categories
        categories = WM.Parser.findCategories(content)
        catlist = []
        catlinks = []
        tempcontent = ""
        contentId = 0
        for cat in categories
            if cat.fragment
                App.log.logWarning(App.log.linkToWikiPage(cat.link,
                                    cat.rawLink) + " contains a fragment
                                    reference, but it doesn't make sense
                                    in categories and will be removed")

            cleantitle = WM.Parser.squashContiguousWhitespace(cat.title)
            cattext = "Category:" + cleantitle
            # Don't just pass cleantitle here, otherwise the language of
            #   root language categories won't be properly detected
            catlang = WM.ArchWiki.detectLanguage(cattext)[1]
            catlink = "[[" + cattext + (if cat.anchor then "|" + cat.anchor else "") + "]]"
            if language != catlang
                App.log.logWarning(App.log.linkToWikiPage(cat.link, cattext) +
                    " belongs to a different
                    language than the one of the title (" + language + ")")

            if catlist.indexOf(cattext) < 0
                catlist.push(cattext)
                catlinks.push(catlink)
            else
                App.log.logWarning("Removed duplicate of " +
                                    App.log.linkToWikiPage(cat.link, cattext))

            tempcontent += content.substring(contentId, cat.index)
            contentId = cat.index + cat.length

        if catlist.length
            header += catlinks.join("\n") + "\n"
        else
            App.log.logWarning("The article is not categorized")
        tempcontent += content.substring(contentId)
        content = tempcontent

        # Interlanguage links
        interlanguage = WM.ArchWiki.findAllInterlanguageLinks(content)
        iwlist = []
        iwlinks = []
        tempcontent = ""
        contentId = 0
        for link in interlanguage
            if link.anchor
                # Cannot use App.log.linkToWikiPage because local interlanguage
                #   links would not resolved correctly; linkToPage would need
                #   to find the URL instead, which seems too complicated for
                #   the purpose of this plugin
                App.log.logWarning(link.rawLink + " contains an alternative
                                    text, but it doesn't make sense in
                                    interlanguage links and will be removed")

            # Applying WM.Parser.squashContiguousWhitespace is dangerous here
            #   because we don't know how the target server handles whitespace
            linktitle = link.title
            linklang = link.namespace
            linktext = linklang + ":" + linktitle
            fulllink = "[[" + linktext + (if link.fragment then "#" + link.fragment else "") + "]]"
            if iwlist.indexOf(linktext) < 0
                iwlist.push(linktext)
                iwlinks.push(fulllink)
            else
                # Cannot use App.log.linkToWikiPage because local interlanguage
                #   links would not resolved correctly; linkToPage would need
                #   to find the URL instead, which seems too complicated for
                #   the purpose of this plugin
                App.log.logWarning("Removed duplicate of " + linktext)

            tempcontent += content.substring(contentId, link.index)
            contentId = link.index + link.length

        if iwlist.length
            iwlinks.sort()
            header += iwlinks.join("\n") + "\n"

        tempcontent += content.substring(contentId)
        content = tempcontent

        firstChar = content.search(/[^\s]/)
        content = content.substr(firstChar)

        newText = header + content

        if newText != source
            WM.Editor.writeSource(newText)
            App.log.logInfo("Fixed header")

        if callNext
            callNext()
