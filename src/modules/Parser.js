/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2014 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.Parser = new function () {
    this.squashContiguousWhitespace = function (title) {
        // MediaWiki treats consecutive whitespace characters in titles and
        //   section names as one
        // For example [[Main __ Page#First _ _section]] is the same as
        //   [[Main Page#First section]]
        // Consider trimming the returned text
        return title.replace(/[_ ]+/g, " ");
    };

    this.neutralizeNowikiTags = function (source) {
        // Empty nowiki tags (<nowiki></nowiki>) must be neutralized as well,
        //   otherwise Tampermonkey will hang, see also
        //   https://github.com/kynikos/wiki-monkey/issues/133
        // Note that the concept of "nesting" doesn't make sense with <nowiki>
        //   tags, so do *not* use Alib.Str.findNestedEnclosures
        var OPENLENGTH = 8;
        var CLOSELENGTH = 9;
        var tags = Alib.Str.findSimpleEnclosures(source, /<nowiki>/i,
                                    OPENLENGTH, /<\/nowiki>/i, CLOSELENGTH);
        var maskedText = "";
        var prevId = 0;

        for (var t = 0; t < tags.length; t++) {
            var tag = tags[t];

            if (tag[1]) {
                var maskLength = tag[1] - tag[0] + CLOSELENGTH;
                var maskString = Alib.Str.padRight("", "x", maskLength);
                maskedText += source.substring(prevId, tag[0]) + maskString;
                prevId = tag[1] + CLOSELENGTH;
                continue;
            }
            else {
                // If a <nowiki> tag is left open (no closing tag is found), it
                //   does its job until the end of the text
                // This also neutralizes the final \n, but it shouldn't matter
                var maskLength = source.substr(tag[0]).length;
                var maskString = Alib.Str.padRight("", "x", maskLength);
                maskedText += source.substring(prevId, tag[0]) + maskString;
                prevId = source.length;
                break;
            }
        }

        maskedText += source.substring(prevId);

        return maskedText;
    };

    this.dotEncode = function (text) {
        return encodeURIComponent(text).replace(/%/g, ".");
    };

    this.dotEncodeLinkBreakingFragmentCharacters = function (fragment) {
        // These characters are known to break internal links if found in
        //   fragments
        // This function is not tested on link paths or anchors!
        fragment = fragment.replace(/\[/g, ".5B");
        fragment = fragment.replace(/\]/g, ".5D");
        fragment = fragment.replace(/\{/g, ".7B");
        fragment = fragment.replace(/\}/g, ".7D");
        fragment = fragment.replace(/\|/g, ".7C");
        return fragment;
    };

    var prepareRegexpWhitespace = function (title) {
        // MediaWiki treats consecutive whitespace characters in titles and
        //   section names as one
        // For example [[Main __ Page#First _ _section]] is the same as
        //   [[Main Page#First section]]
        // Consider trimming the title before passing it here
        return title.replace(/[_ ]+/g, "[_ ]+");
    };

    var prepareTitleCasing = function (pattern) {
        var firstChar = pattern.charAt(0);
        var fcUpper = firstChar.toUpperCase();
        var fcLower = firstChar.toLowerCase();
        if (fcUpper != fcLower) {
            pattern = "[" + fcUpper + fcLower + "]" + pattern.substr(1);
        }
        return pattern;
    };

    this.compareArticleTitles = function (title1, title2) {
        // Actually also namespaces should be kept into account,
        // e.g. 'Help:Title' and 'Help:title' should return true
        var t1 = prepareTitleCasing(this.squashContiguousWhitespace(title1
                                                                    ).trim());
        var t2 = prepareTitleCasing(this.squashContiguousWhitespace(title2
                                                                    ).trim());
        return t1 == t2;
    };

    this.findBehaviorSwitches = function (source, word) {
        source = this.neutralizeNowikiTags(source);
        var regExp;
        if (word) {
            // Behavior switches aren't case-sensitive
            regExp = new RegExp("__" + Alib.RegEx.escapePattern(word) + "__",
                                                                        "gi");
        }
        else {
            // Behavior switches aren't case-sensitive
            regExp = new RegExp("__(TOC|NOTOC|FORCETOC|NOEDITSECTION|" +
                    "NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|" +
                    "NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|" +
                    "NOINDEX|STATICREDIRECT|START|END)__", "gi");
        }
        return Alib.RegEx.matchAll(source, regExp);
    };

    var findLinksEngine = function (source, titlePattern, specialOnly,
                                                            caseSensitive) {
        // Links cannot contain other links, not even in the alternative text
        //   (only the innermost links are valid)
        // Make sure to prepare whitespace in titlePattern like in
        //   prepareRegexpWhitespace
        // Do *not* use the g flag, or when using RegExp.exec the index will
        //   have to be reset at every loop
        var flags = (caseSensitive) ? "" : "i";
        // The following colon/space combinations are valid
        //   "[[a:b#c|d]]"
        //   "[[ a:b#c|d]]"
        //   "[[ :a:b#c|d]]"
        //   "[[ : a:b#c|d]]"
        //   "[[:a:b#c|d]]"
        //   "[[: a:b#c|d]]"
        //   "[[::a:b#c|d]]"
        //   "[[: :a:b#c|d]]"
        //   "[[:: a:b#c|d]]"
        //   "[[: : a:b#c|d]]"
        // A link like "[[ ::a:b#c|d]]" isn't valid, but it would still be
        //   found when specialOnly is false (bug #166)
        var special = (specialOnly) ? "(?:[ _]+:)?[ _]*" : "(?:\\:?[ _]*){0,2}" ;
        var regExp = new RegExp("^" + special + "(" + titlePattern + ")" +
                    "[ _]*(?:\\|[_\\s]*([\\s\\S]+?)[_\\s]*)?[_\\s]*$", flags);
        var nSource = WM.Parser.neutralizeNowikiTags(source);
        var links = [];
        var dbraces = Alib.Str.findInnermostEnclosures(nSource, "[[", "]]");

        for (var e = 0; e < dbraces.length; e++) {
            var dbrace = dbraces[e];
            var inText = source.substring(dbrace[0] + 2, dbrace[1]);
            var match = regExp.exec(inText);

            if (match) {
                var push = true;

                if (match[6]) {
                    // Incomplete templates in the alternative text have an
                    //   apparently weird behaviour, hard to reverse-engineer,
                    //   so issue a warning when one is found
                    //   See also the examples in findTransclusionArguments
                    // Note that the title already doesn't allow "{" or "}"
                    var nText = WM.Parser.neutralizeNowikiTags(match[6]);
                    var maskedText = Alib.Str.findNestedEnclosures(nText, "{{",
                                                                "}}", "x")[1];

                    if (maskedText.search(/(\{\{|\}\})/) > -1) {
                        WM.Log.logWarning("[[" + match[0] + "]] seems to " +
                            "contain part of a template, and the resulting " +
                            "behaviour cannot be predicted by this " +
                            "function, so the link will be ignored " +
                            "altogether");
                        push = false;
                    }
                }

                if (push) {
                    links.push({"rawLink": "[[" + match[0] + "]]",
                                "link": match[1],
                                "rawTitle": match[2],
                                "namespace": match[3],
                                "title": match[4],
                                "fragment": match[5],
                                "anchor": match[6],
                                "index": dbrace[0],
                                "length": dbrace[1] + 2 - dbrace[0]});
                }
            }
        }

        return links;
    };

    this.findSectionLinks = function (source) {
        // Keep the capturing groups as required by findLinksEngine
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
        var titlePattern = "(()())#(" + fragmentChars + ")";
        return findLinksEngine(source, titlePattern, false, true);
    }

    this.findInternalLinks = function (source, namespace, title) {
        // Keep the capturing groups as required by findLinksEngine
        var namespaceChars = "[^\\n\\{\\}\\[\\]\\|\\:\\#]+?";
        var titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?";
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";

        if (namespace) {
            var rens = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                namespace));

            if (title) {
                var retitle = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                    title));
                var titlePattern = "((" + rens + ")[ _]*:[ _]*" +
                                        "(" + retitle + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

                // Namespaces wouldn't be case-sensitive, but titles are, so be
                //   safe and don't use the i flag
                var caseSensitive = true;
            }
            else {
                var titlePattern = "((" + rens + ")[ _]*:[ _]*" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

                // Namespaces aren't case-sensitive
                var caseSensitive = false;
            }
        }
        else if (title) {
            var retitle = prepareRegexpWhitespace(Alib.RegEx.escapePattern(
                                                                    title));

            // Keep the capturing groups as required by findLinksEngine
            var titlePattern = "(()(" + retitle + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";

            // Titles are case-sensitive
            var caseSensitive = true;
        }
        else {
            var titlePattern = "((?:(" + namespaceChars + ")[ _]*:[ _]*)?" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";
            var caseSensitive = true;
        }

        return findLinksEngine(source, titlePattern, false, caseSensitive);
    };

    this.findInterwikiLinks = function (source, wiki) {
        return this.findInternalLinks(source, wiki);
    };

    this.findSpecialLinks = function (source, pattern) {
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // Keep the capturing groups as required by findLinksEngine
        // See also WM.ArchWiki.findAllInterlanguageLinks
        var titleChars = "[^\\n\\{\\}\\[\\]\\|\\#]+?";
        var fragmentChars = "[^\\n\\{\\}\\[\\]\\|]*?";
        var titlePattern = "((" + pattern + ")[ _]*:[ _]*" +
                                        "(" + titleChars + "))" +
                                        "(?:[ _]*#(" + fragmentChars + "))?";
        // Categories and language tags aren't case-sensitive
        return findLinksEngine(source, titlePattern, true, false);
    };

    this.findCategories = function (source) {
        return this.findSpecialLinks(source, "Category");
    };

    this.findInterlanguageLinks = function (source, language) {
        // See also WM.ArchWiki.findAllInterlanguageLinks
        return this.findSpecialLinks(source, Alib.RegEx.escapePattern(
                                                                    language));
    };

    this.findVariables = function (source, variable) {
        // There don't seem to exist variable names with whitespace, applying
        //   prepareRegexpWhitespace could be dangerous in this case
        var pattern = Alib.RegEx.escapePattern(variable);
        return this.findVariablesPattern(source, pattern);
    };

    this.findVariablesPattern = function (source, pattern) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // There can't be an underscore before the variable name
        // There can't be a whitespace between the variable name and the colon
        nSource = this.neutralizeNowikiTags(source);
        var results = [];
        var dbrackets = Alib.Str.findNestedEnclosures(nSource, "{{", "}}",
                                                                    "x")[0];

        for (var d = 0; d < dbrackets.length; d++) {
            var dbracket = dbrackets[d];
            var inText = source.substring(dbracket[0] + 2, dbracket[1]);

            // Variables are case-sensitive
            // Do *not* use the g flag, or when using RegExp.exec the index
            //   will have to be reset at every loop
            var regExp = new RegExp("^\\s*(" + pattern + ")" +
                                        "(?:\\:\\s*([\\s\\S]*?))?\\s*$", "");
            var match = regExp.exec(inText);

            if (match) {
                results.push({"rawVariable": "{{" + match[0] + "}}",
                            "name": match[1],
                            "value": match[2],
                            "index": dbracket[0],
                            "length": dbracket[1] + 2 - dbracket[0]});
            }
        }

        return results;
    };

    var findTransclusionsEngine = function (source, pattern, templatesOnly) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // The difference between generic transclusions and templates is the
        //   possibility of a colon before the title which forces the
        //   transclusion of a page instead of a template
        // There can't be an underscore before the colon
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        // Template names are case-sensitive, just make sure to prepare them
        //   with prepareTitleCasing
        // Do *not* use the g flag, or when using RegExp.exec the index will
        //   have to be reset at every loop
        var regExp = new RegExp("^(\\s*" + ((templatesOnly) ? "" : ":?") +
                                        "[_ ]*(" + pattern + ")[_ ]*\\s*)" +
                                        "(?:\\|([\\s\\S]*))?$", "");

        var nSource = WM.Parser.neutralizeNowikiTags(source);
        var transclusions = [];
        var dbrackets = Alib.Str.findNestedEnclosures(nSource, "{{", "}}",
                                                                    "x")[0];

        for (var d = 0; d < dbrackets.length; d++) {
            var dbracket = dbrackets[d];
            var inText = source.substring(dbracket[0] + 2, dbracket[1]);
            var match = regExp.exec(inText);

            if (match) {
                // 3 is the length of "{{" + the first "|"
                var argIndex = dbracket[0] + match[1].length + 3;

                transclusions.push({
                    "rawTransclusion": "{{" + match[0] + "}}",
                    "title": match[2],
                    "index": dbracket[0],
                    "length": dbracket[1] - dbracket[0] + 2,
                    "arguments": findTransclusionArguments(match, argIndex),
                });
            }
        }

        return transclusions;
    };

    var findTransclusionArguments = function (match, argIndex) {
        var rawArguments = match[3];
        var arguments = [];

        if (rawArguments) {
            var nArgs = WM.Parser.neutralizeNowikiTags(rawArguments);

            // Mask any inner links, so that their "|" characters won't be
            //   interpreted as belonging to the template
            //   Note that double braces ("[[]]") "escape" a pipe in a template
            //   argument even if a link is not correctly formed, e.g. [[|]] or
            //   using unallowed characters etc.
            var maskedArgs = Alib.Str.findNestedEnclosures(nArgs, "[[", "]]",
                                                                    "x")[1];

            // Mask any inner templates, so that their "|" characters won't be
            //   interpreted as belonging to the outer template
            maskedArgs = Alib.Str.findNestedEnclosures(maskedArgs, "{{", "}}",
                                                                    "x")[1];

            // Also tables would have pipes, but using tables inside templates
            //   doesn't seem to be supported by MediaWiki, except if enclosing
            //   them in special parser functions, e.g.
            //   http://www.mediawiki.org/wiki/Extension:Pipe_Escape which
            //   would then be safely masked by the function above

            // Incomplete links and templates in the arguments text have an
            //   apparently weird behaviour, hard to reverse-engineer, so issue
            //   a warning when one is found
            //   Try for example the following cases:
            //     000{{hc|BBB[[AAA|ZZZ}}CCC]]111
            //     000{{hc|BBB[[AAA}}CCC|ZZZ]]111
            //     000[[BBB{{hc|AAA|ZZZ]]CCC}}111
            //     000{{hc|BBB[[AAA|ZZZ}}[[KKK]]111000{{hc|AAA|BBB}}111
            //     {{bc|{{Accuracy|[[test}}]]}}
            //     {{bc|{{Accuracy|[[test|}}]]}}
            //     {{Accuracy|[[}}]]
            //     {{Accuracy|[[test|}}]]
            //     [[{{Accuracy|]]}}
            //     [[test|{{Accuracy|]]}}
            //     [[test|{{Accuracy|]]
            //     [[test|{{ic|aaa]]}}
            //   Note that the title already doesn't allow "{", "}", "[" nor
            //     "]"
            if (maskedArgs.search(/(\{\{|\}\}|\[\[|\]\])/) > -1) {
                WM.Log.logWarning("[[" + match[0] + "]] seems to " +
                    "contain part of a link or template, and the resulting " +
                    "behaviour cannot be predicted by this function, so " +
                    "the whole template will be ignored altogether");
            }
            else {
                var mArgs = maskedArgs.split("|");
                var relIndex = 0;

                for (var m = 0; m < mArgs.length; m++) {
                    var mArgument = mArgs[m];
                    var argL = mArgument.length;
                    var argument = rawArguments.substr(relIndex, argL);
                    var eqIndex = mArgument.indexOf("=");

                    // eqIndex must be > 0, not -1, in fact the key must not be
                    //   empty
                    if (eqIndex > 0) {
                        var rawKey = argument.substring(0, eqIndex);
                        var reKey = /^(\s*)(.+?)\s*$/;
                        var keyMatches = reKey.exec(rawKey);
                        var key = keyMatches[2];
                        var keyIndex = argIndex + ((keyMatches[1]) ?
                                                    keyMatches[1].length : 0);

                        // 1 is the length of "="
                        var value = argument.substr(eqIndex + 1);
                        var valueIndex = argIndex + keyMatches[0].length + 1;
                    }
                    else {
                        var key = null;
                        var keyIndex = null;
                        var value = argument;
                        var valueIndex = argIndex;
                    }

                    arguments.push({key: key,
                                    key_index: keyIndex,
                                    value: value,
                                    value_index: valueIndex});

                    // 1 is the length of "|"
                    relIndex += argL + 1;
                }
            }
        }

        return arguments;
    };

    this.findTemplates = function (source, template) {
        if (template) {
            var pattern = Alib.RegEx.escapePattern(template);
            pattern = prepareRegexpWhitespace(pattern);
            pattern = prepareTitleCasing(pattern);
        }
        else {
            var pattern = "[^\\n\\{\\}\\[\\]\\||\\#]+?";
        }

        return this.findTemplatesPattern(source, pattern);
    };

    this.findTemplatesPattern = function (source, pattern) {
        // pattern must be a string and IT MUST NOT HAVE ANY CAPTURING
        //   GROUPS
        // Make sure to prepare whitespace in pattern like in
        //   prepareRegexpWhitespace
        // Templates can't be transcluded with a colon before the title
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        return findTransclusionsEngine(source, pattern, true);
    };

    this.findTransclusions = function (source, namespace, title) {
        // The difference from templates is the possibility of a colon before
        //   the title which forces the transclusion of a page instead of a
        //   template
        // There can't be an underscore before the colon
        // The title must not be broken by new line characters; any underscores
        //   must be in the same line as the title, even though then they are
        //   considered as whitespace
        var titleChars = "[^\\n\\{\\}\\[\\]\\||\\#]+?";

        if (namespace) {
            var namespacePattern = Alib.RegEx.escapePattern(namespace);
            namespacePattern = prepareRegexpWhitespace(namespacePattern);
            namespacePattern = prepareTitleCasing(namespacePattern);
        }

        if (title) {
            var titlePattern = Alib.RegEx.escapePattern(title);
            titlePattern = prepareRegexpWhitespace(titlePattern);
            titlePattern = prepareTitleCasing(titlePattern);
        }

        if (namespacePattern && titlePattern) {
            var pattern = namespacePattern + "[ _]*:[ _]*" + titlePattern;
        }
        else if (!namespacePattern && titlePattern) {
            var pattern = titlePattern;
        }
        else if (namespacePattern && !titlePattern) {
            var pattern = namespacePattern + "[ _]*:" + titleChars;
        }
        else {
            var pattern = titleChars;
        }

        return findTransclusionsEngine(source, pattern, false);
    };

    this.findSectionHeadings = function (source) {
        // ======Title====== is the deepest level supported
        var MAXLEVEL = 6;

        var sections = [];
        var minLevel = MAXLEVEL;
        var maxTocLevel = 0;
        var tocLevel = 1;
        var regExp = /^(\=+([ _]*(.+?)[ _]*)\=+)[ \t]*$/gm;
        var match, line, rawheading, heading, cleanheading, L0, L1, level,
                                            prevLevels, start, end, tocPeer;

        while (true) {
            match = regExp.exec(source);

            if (match) {
                L0 = match[0].length;
                line = match[1];
                rawheading = match[2];
                heading = match[3];
                cleanheading = WM.Parser.squashContiguousWhitespace(heading);
                L1 = line.length;
                level = 1;
                start = "=";
                end = "=";

                // ==Title=== and ===Title== are both 2nd levels and so on
                // (the shortest sequence of = between the two sides is
                //  considered)

                // = and == are not titles
                // === is read as =(=)=, ==== is read as =(==)= (both 1st
                //                                               levels)
                // ===== is read as ==(=)== (2nd level) and so on

                while (true) {
                    start = line.substr(level, 1);
                    end = line.substr(L1 - level - 1, 1);

                    if (L1 - level * 2 > 2 && start == "=" && end == "=") {
                        level++;
                    }
                    else {
                        if (level > MAXLEVEL) {
                            level = MAXLEVEL;
                        }
                        else if (level < minLevel) {
                            minLevel = level;
                        }
                        break;
                    }
                }

                if (level == minLevel) {
                    tocLevel = 1;
                    prevLevels = {};
                    prevLevels[level] = 1;
                    prevLevels.relMax = level;
                }
                else if (level > prevLevels.relMax) {
                    tocLevel++;
                    prevLevels[level] = tocLevel;
                    prevLevels.relMax = level;
                    if (tocLevel > maxTocLevel) {
                        maxTocLevel = tocLevel;
                    }
                }
                else if (level < prevLevels.relMax) {
                    if (prevLevels[level]) {
                        tocLevel = prevLevels[level];
                    }
                    else {
                        // tocPeer is the level immediately greater than the
                        // current one, and it should have the same tocLevel
                        // I must reset tocPeer here to the relative maximum
                        tocPeer = prevLevels.relMax;
                        for (var pLevel in prevLevels) {
                            if (pLevel > level && pLevel < tocPeer) {
                                tocPeer = pLevel;
                            }
                        }
                        tocLevel = prevLevels[tocPeer];
                        prevLevels[level] = tocLevel;
                    }
                    prevLevels.relMax = level;
                }

                sections.push({line: line,
                               rawheading: rawheading,
                               heading: heading,
                               cleanheading: cleanheading,
                               level: level,
                               tocLevel: tocLevel,
                               index: (regExp.lastIndex - L0),
                               length0: L0,
                               length1: L1});
            }
            else {
                break;
            }
        }

        // Articles without sections
        if (maxTocLevel == 0) {
            minLevel = 0;
        }

        return {sections: sections,
                minLevel: minLevel,
                maxTocLevel: maxTocLevel};
    };
};
