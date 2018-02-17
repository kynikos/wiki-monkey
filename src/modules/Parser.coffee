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

RegEx = require('@kynikos/misc/dist/RegEx')
Str = require('@kynikos/misc/dist/Str')
App = require('../app')


class module.exports
    constructor: (@WM) ->

    squashContiguousWhitespace: (title) ->
        # MediaWiki treats consecutive whitespace characters in titles and
        #   section names as one
        # For example [[Main __ Page#First _ _section]] is the same as
        #   [[Main Page#First section]]
        # Consider trimming the returned text
        return title.replace(/[_ ]+/g, " ")

    neutralizeNowikiTags: (source) ->
        # Empty nowiki tags (<nowiki></nowiki>) must be neutralized as well,
        #   otherwise Tampermonkey will hang, see also
        #   https://github.com/kynikos/wiki-monkey/issues/133
        # Note that the concept of "nesting" doesn't make sense with <nowiki>
        #   tags, so do *not* use Str.findNestedEnclosures
        OPENLENGTH = 8
        CLOSELENGTH = 9
        tags = Str.findSimpleEnclosures(source, /<nowiki>/i,
                                    OPENLENGTH, /<\/nowiki>/i, CLOSELENGTH)
        maskedText = ""
        prevId = 0

        for tag in tags
            if tag[1]
                maskLength = tag[1] - tag[0] + CLOSELENGTH
                maskString = Str.padRight("", "x", maskLength)
                maskedText += source.substring(prevId, tag[0]) + maskString
                prevId = tag[1] + CLOSELENGTH
                continue
            else
                # If a <nowiki> tag is left open (no closing tag is found), it
                #   does its job until the end of the text
                # This also neutralizes the final \n, but it shouldn't matter
                maskLength = source.substr(tag[0]).length
                maskString = Str.padRight("", "x", maskLength)
                maskedText += source.substring(prevId, tag[0]) + maskString
                prevId = source.length
                break

        maskedText += source.substring(prevId)

        return maskedText

    dotEncode: (text) ->
        return encodeURIComponent(text).replace(/%/g, ".")

    dotEncodeLinkBreakingFragmentCharacters: (fragment) ->
        # These characters are known to break internal links if found in
        #   fragments
        # This function is not tested on link paths or anchors!
        fragment = fragment.replace(/\[/g, ".5B")
        fragment = fragment.replace(/\]/g, ".5D")
        fragment = fragment.replace(/\{/g, ".7B")
        fragment = fragment.replace(/\}/g, ".7D")
        fragment = fragment.replace(/\|/g, ".7C")
        return fragment

    prepareRegexpWhitespace = (title) ->
        # MediaWiki treats consecutive whitespace characters in titles and
        #   section names as one
        # For example [[Main __ Page#First _ _section]] is the same as
        #   [[Main Page#First section]]
        # Consider trimming the title before passing it here
        return title.replace(/[_ ]+/g, "[_ ]+")

    prepareTitleCasing = (pattern) ->
        firstChar = pattern.charAt(0)
        fcUpper = firstChar.toUpperCase()
        fcLower = firstChar.toLowerCase()
        if fcUpper != fcLower
            pattern = "[" + fcUpper + fcLower + "]" + pattern.substr(1)
        return pattern

    compareArticleTitles: (title1, title2) ->
        # Actually also namespaces should be kept into account,
        # e.g. 'Help:Title' and 'Help:title' should return true
        t1 = prepareTitleCasing(this.squashContiguousWhitespace(title1)
                                                                    .trim())
        t2 = prepareTitleCasing(this.squashContiguousWhitespace(title2)
                                                                    .trim())
        return t1 == t2

    findBehaviorSwitches: (source, word) ->
        source = this.neutralizeNowikiTags(source)
        regExp
        if word
            # Behavior switches aren't case-sensitive
            regExp = new RegExp("__" + mw.RegExp.escape(word) + "__", "gi")
        else
            # Behavior switches aren't case-sensitive
            regExp = new RegExp("__(TOC|NOTOC|FORCETOC|NOEDITSECTION|" +
                    "NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|" +
                    "NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|" +
                    "NOINDEX|STATICREDIRECT|START|END)__", "gi")
        return RegEx.matchAll(source, regExp)

    findLinksEngine: (source, titlePattern, specialOnly, caseSensitive) ->
        # Links cannot contain other links, not even in the alternative text
        #   (only the innermost links are valid)
        # Make sure to prepare whitespace in titlePattern like in
        #   prepareRegexpWhitespace
        # Do *not* use the g flag, or when using RegExp.exec the index will
        #   have to be reset at every loop
        flags = if caseSensitive then "" else "i"
        # The following colon/space combinations are valid
        #   "[[a:b#c|d]]"
        #   "[[ a:b#c|d]]"
        #   "[[ :a:b#c|d]]"
        #   "[[ : a:b#c|d]]"
        #   "[[:a:b#c|d]]"
        #   "[[: a:b#c|d]]"
        #   "[[::a:b#c|d]]"
        #   "[[: :a:b#c|d]]"
        #   "[[:: a:b#c|d]]"
        #   "[[: : a:b#c|d]]"
        # A link like "[[ ::a:b#c|d]]" isn't valid, but it would still be
        #   found when specialOnly is false (bug #166)
        special = if specialOnly then "(?:[ _]+:)?[ _]*" else "(?:\\:?[ _]*){0,2}"
        regExp = new RegExp("^" + special + "(" + titlePattern + ")" +
                    "[ _]*(?:\\|[_\\s]*([\\s\\S]+?)[_\\s]*)?[_\\s]*$", flags)
        nSource = @neutralizeNowikiTags(source)
        links = []
        dbraces = Str.findInnermostEnclosures(nSource, "[[", "]]")

        for dbrace in dbraces
            inText = source.substring(dbrace[0] + 2, dbrace[1])
            match = regExp.exec(inText)

            if match
                push = true

                if match[6]
                    # Incomplete templates in the alternative text have an
                    #   apparently weird behaviour, hard to reverse-engineer,
                    #   so issue a warning when one is found
                    #   See also the examples in @findTransclusionArguments
                    # Note that the title already doesn't allow "{" or "}"
                    nText = @neutralizeNowikiTags(match[6])
                    maskedText = Str.findNestedEnclosures(nText, "{{",
                                                                "}}", "x")[1]

                    if maskedText.search(/(\{\{|\}\})/) > -1
                        App.log.logWarning("[[" + match[0] + "]] seems to
                            contain part of a template, and the resulting
                            behaviour cannot be predicted by this
                            function, so the link will be ignored
                            altogether")
                        push = false

                if push
                    links.push(
                        "rawLink": "[[" + match[0] + "]]"
                        "link": match[1]
                        "rawTitle": match[2]
                        "namespace": match[3]
                        "title": match[4]
                        "fragment": match[5]
                        "anchor": match[6]
                        "index": dbrace[0]
                        "length": dbrace[1] + 2 - dbrace[0])

        return links

    findSectionLinks: (source) ->
        # Keep the capturing groups as required by @findLinksEngine
        fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?"
        titlePattern = "(()())#(" + fragmentChars + ")"
        return @findLinksEngine(source, titlePattern, false, true)

    findInternalLinks: (source, namespace, title) ->
        # Keep the capturing groups as required by @findLinksEngine
        namespaceChars = "[^\\n\\{\\}\\[\\]\\|\\:\\#]+?"
        titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?"
        fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?"

        if namespace
            rens = prepareRegexpWhitespace(mw.RegExp.escape(namespace))

            if title
                retitle = prepareRegexpWhitespace(mw.RegExp.escape(title))
                titlePattern = "((" + rens + ")[ _]*:[ _]*" +
                                        "(" + retitle + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?"

                # Namespaces wouldn't be case-sensitive, but titles are, so be
                #   safe and don't use the i flag
                caseSensitive = true
            else
                titlePattern = "((" + rens + ")[ _]*:[ _]*" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?"

                # Namespaces aren't case-sensitive
                caseSensitive = false
        else if title
            retitle = prepareRegexpWhitespace(mw.RegExp.escape(title))

            # Keep the capturing groups as required by @findLinksEngine
            titlePattern = "(()(" + retitle + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?"

            # Titles are case-sensitive
            caseSensitive = true
        else
            titlePattern = "((?:(" + namespaceChars + ")[ _]*:[ _]*)?" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?"
            caseSensitive = true

        return @findLinksEngine(source, titlePattern, false, caseSensitive)

    findInterwikiLinks: (source, wiki) ->
        return this.findInternalLinks(source, wiki)

    findSpecialLinks: (source, pattern) ->
        # Make sure to prepare whitespace in pattern like in
        #   prepareRegexpWhitespace
        # Keep the capturing groups as required by @findLinksEngine
        # See also WM.ArchWiki.findAllInterlanguageLinks
        titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?"
        fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?"
        titlePattern = "((" + pattern + ")[ _]*:[ _]*" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?"
        # Categories and language tags aren't case-sensitive
        return @findLinksEngine(source, titlePattern, true, false)

    findCategories: (source) ->
        return this.findSpecialLinks(source, "Category")

    findInterlanguageLinks: (source, language) ->
        # See also WM.ArchWiki.findAllInterlanguageLinks
        return this.findSpecialLinks(source, mw.RegExp.escape(language))

    findVariables: (source, variable) ->
        # There don't seem to exist variable names with whitespace, applying
        #   prepareRegexpWhitespace could be dangerous in this case
        pattern = mw.RegExp.escape(variable)
        return this.findVariablesPattern(source, pattern)

    findVariablesPattern: (source, pattern) ->
        # pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        #   GROUPS
        # There can't be an underscore before the variable name
        # There can't be a whitespace between the variable name and the colon
        nSource = this.neutralizeNowikiTags(source)
        results = []
        dbrackets = Str.findNestedEnclosures(nSource, "{{", "}}", "x")[0]

        for dbracket in dbrackets
            inText = source.substring(dbracket[0] + 2, dbracket[1])

            # Variables are case-sensitive
            # Do *not* use the g flag, or when using RegExp.exec the index
            #   will have to be reset at every loop
            regExp = new RegExp("^\\s*(" + pattern + ")" +
                                        "(?:\\:\\s*([\\s\\S]*?))?\\s*$", "")
            match = regExp.exec(inText)

            if match
                results.push(
                    "rawVariable": "{{" + match[0] + "}}"
                    "name": match[1]
                    "value": match[2]
                    "index": dbracket[0]
                    "length": dbracket[1] + 2 - dbracket[0])

        return results

    findTransclusionsEngine: (source, pattern, templatesOnly) ->
        # pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        #   GROUPS
        # Make sure to prepare whitespace in pattern like in
        #   prepareRegexpWhitespace
        # The difference between generic transclusions and templates is the
        #   possibility of a colon before the title which forces the
        #   transclusion of a page instead of a template
        # There can't be an underscore before the colon
        # The title must not be broken by new line characters; any underscores
        #   must be in the same line as the title, even though then they are
        #   considered as whitespace
        # Template names are case-sensitive, just make sure to prepare them
        #   with prepareTitleCasing
        # Do *not* use the g flag, or when using RegExp.exec the index will
        #   have to be reset at every loop
        regExp = new RegExp("^(\\s*" + (if templatesOnly then "" else ":?") +
                                        "[_ ]*(" + pattern + ")[_ ]*\\s*)" +
                                        "(?:\\|([\\s\\S]*))?$", "")

        nSource = @neutralizeNowikiTags(source)
        transclusions = []
        dbrackets = Str.findNestedEnclosures(nSource, "{{", "}}", "x")[0]

        for dbracket in dbrackets
            inText = source.substring(dbracket[0] + 2, dbracket[1])
            match = regExp.exec(inText)

            if match
                # 3 is the length of "{{" + the first "|"
                argIndex = dbracket[0] + match[1].length + 3

                transclusions.push(
                    "rawTransclusion": "{{" + match[0] + "}}"
                    "title": match[2]
                    "index": dbracket[0]
                    "length": dbracket[1] - dbracket[0] + 2
                    "arguments": @findTransclusionArguments(match, argIndex)
                )

        return transclusions

    findTransclusionArguments: (match, argIndex) ->
        rawArguments = match[3]
        args = []

        if rawArguments
            nArgs = @neutralizeNowikiTags(rawArguments)

            # Mask any inner links, so that their "|" characters won't be
            #   interpreted as belonging to the template
            #   Note that double braces ("[[]]") "escape" a pipe in a template
            #   argument even if a link is not correctly formed, e.g. [[|]] or
            #   using unallowed characters etc.
            maskedArgs = Str.findNestedEnclosures(nArgs, "[[", "]]", "x")[1]

            # Mask any inner templates, so that their "|" characters won't be
            #   interpreted as belonging to the outer template
            maskedArgs = Str.findNestedEnclosures(maskedArgs, "{{", "}}",
                                                                    "x")[1]

            # Also tables would have pipes, but using tables inside templates
            #   doesn't seem to be supported by MediaWiki, except if enclosing
            #   them in special parser functions, e.g.
            #   http://www.mediawiki.org/wiki/Extension:Pipe_Escape which
            #   would then be safely masked by the function above

            # Incomplete links and templates in the arguments text have an
            #   apparently weird behaviour, hard to reverse-engineer, so issue
            #   a warning when one is found
            #   Try for example the following cases:
            #     000{{hc|BBB[[AAA|ZZZ}}CCC]]111
            #     000{{hc|BBB[[AAA}}CCC|ZZZ]]111
            #     000[[BBB{{hc|AAA|ZZZ]]CCC}}111
            #     000{{hc|BBB[[AAA|ZZZ}}[[KKK]]111000{{hc|AAA|BBB}}111
            #     {{bc|{{Accuracy|[[test}}]]}}
            #     {{bc|{{Accuracy|[[test|}}]]}}
            #     {{Accuracy|[[}}]]
            #     {{Accuracy|[[test|}}]]
            #     [[{{Accuracy|]]}}
            #     [[test|{{Accuracy|]]}}
            #     [[test|{{Accuracy|]]
            #     [[test|{{ic|aaa]]}}
            #   Note that the title already doesn't allow "{", "}", "[" nor
            #     "]"
            if maskedArgs.search(/(\{\{|\}\}|\[\[|\]\])/) > -1
                App.log.logWarning("{{" + match[0] + "}} seems to
                    contain part of a link or template, and the resulting
                    behaviour cannot be predicted by this function, so
                    the whole template will be ignored altogether")
            else
                mArgs = maskedArgs.split("|")
                relIndex = 0

                for mArgument in mArgs
                    argL = mArgument.length
                    argument = rawArguments.substr(relIndex, argL)
                    eqIndex = mArgument.indexOf("=")

                    # eqIndex must be > 0, not -1, in fact the key must not be
                    #   empty
                    if eqIndex > 0
                        rawKey = argument.substring(0, eqIndex)
                        reKey = /^(\s*)(.+?)\s*$/
                        keyMatches = reKey.exec(rawKey)
                        key = keyMatches[2]
                        keyIndex = argIndex + (if keyMatches[1] then keyMatches[1].length else 0)

                        # 1 is the length of "="
                        value = argument.substr(eqIndex + 1)
                        valueIndex = argIndex + keyMatches[0].length + 1
                    else
                        key = null
                        keyIndex = null
                        value = argument
                        valueIndex = argIndex

                    args.push(
                        key: key
                        key_index: keyIndex
                        value: value
                        value_index: valueIndex
                    )

                    # 1 is the length of "|"
                    relIndex += argL + 1

        return args

    findTemplates: (source, template) ->
        if template
            pattern = mw.RegExp.escape(template)
            pattern = prepareRegexpWhitespace(pattern)
            pattern = prepareTitleCasing(pattern)
        else
            pattern = "[^\\n\\{\\}\\[\\]\\||\\#]+?"

        return this.findTemplatesPattern(source, pattern)

    findTemplatesPattern: (source, pattern) ->
        # pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        #   GROUPS
        # Make sure to prepare whitespace in pattern like in
        #   prepareRegexpWhitespace
        # Templates can't be transcluded with a colon before the title
        # The title must not be broken by new line characters; any underscores
        #   must be in the same line as the title, even though then they are
        #   considered as whitespace
        return @findTransclusionsEngine(source, pattern, true)

    findTransclusions: (source, namespace, title) ->
        # The difference from templates is the possibility of a colon before
        #   the title which forces the transclusion of a page instead of a
        #   template
        # There can't be an underscore before the colon
        # The title must not be broken by new line characters; any underscores
        #   must be in the same line as the title, even though then they are
        #   considered as whitespace
        titleChars = "[^\\n\\{\\}\\[\\]\\||\\#]+?"

        if namespace
            namespacePattern = mw.RegExp.escape(namespace)
            namespacePattern = prepareRegexpWhitespace(namespacePattern)
            namespacePattern = prepareTitleCasing(namespacePattern)

        if title
            titlePattern = mw.RegExp.escape(title)
            titlePattern = prepareRegexpWhitespace(titlePattern)
            titlePattern = prepareTitleCasing(titlePattern)

        if namespacePattern and titlePattern
            pattern = namespacePattern + "[ _]*:[ _]*" + titlePattern
        else if not namespacePattern and titlePattern
            pattern = titlePattern
        else if namespacePattern and not titlePattern
            pattern = namespacePattern + "[ _]*:" + titleChars
        else
            pattern = titleChars

        return @findTransclusionsEngine(source, pattern, false)

    findSectionHeadings: (source) ->
        # ======Title====== is the deepest level supported
        MAXLEVEL = 6

        sections = []
        minLevel = MAXLEVEL
        maxTocLevel = 0
        tocLevel = 1
        regExp = /^(\=+([ _]*(.+?)[ _]*)\=+)[ \t]*$/gm

        while true
            match = regExp.exec(source)

            if match
                L0 = match[0].length
                line = match[1]
                rawheading = match[2]
                heading = match[3]
                cleanheading = @squashContiguousWhitespace(heading)
                L1 = line.length
                level = 1
                start = "="
                end = "="

                # ==Title=== and ===Title== are both 2nd levels and so on
                # (the shortest sequence of = between the two sides is
                #  considered)

                # = and == are not titles
                # === is read as =(=)=, ==== is read as =(==)= (both 1st
                #                                               levels)
                # ===== is read as ==(=)== (2nd level) and so on

                while true
                    start = line.substr(level, 1)
                    end = line.substr(L1 - level - 1, 1)

                    if L1 - level * 2 > 2 and start == "=" and end == "="
                        level++
                    else
                        if level > MAXLEVEL
                            level = MAXLEVEL
                        else if level < minLevel
                            minLevel = level
                        break

                if level == minLevel
                    tocLevel = 1
                    prevLevels = {}
                    prevLevels[level] = 1
                    prevLevels.relMax = level
                    if maxTocLevel == 0
                        maxTocLevel = tocLevel
                else if level > prevLevels.relMax
                    tocLevel++
                    prevLevels[level] = tocLevel
                    prevLevels.relMax = level
                    if tocLevel > maxTocLevel
                        maxTocLevel = tocLevel
                else if level < prevLevels.relMax
                    if prevLevels[level]
                        tocLevel = prevLevels[level]
                    else
                        # tocPeer is the level immediately greater than the
                        # current one, and it should have the same tocLevel
                        # I must reset tocPeer here to the relative maximum
                        tocPeer = prevLevels.relMax
                        for pLevel in prevLevels
                            if pLevel > level and pLevel < tocPeer
                                tocPeer = pLevel
                        tocLevel = prevLevels[tocPeer]
                        prevLevels[level] = tocLevel
                    prevLevels.relMax = level

                sections.push(
                    line: line
                    rawheading: rawheading
                    heading: heading
                    cleanheading: cleanheading
                    level: level
                    tocLevel: tocLevel
                    index: (regExp.lastIndex - L0)
                    length0: L0
                    length1: L1
                )
            else
                break

        # Articles without sections
        if maxTocLevel == 0
            minLevel = 0

        return {sections: sections, minLevel: minLevel, maxTocLevel: maxTocLevel}
