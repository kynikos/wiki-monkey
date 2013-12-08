/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2013 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.Plugins.FixLinkFragments = new function () {
    this.processLink = function (title, links, index, source, newText, prevId, call, callArgs) {
        if (links[index]) {
            var link = links[index];
            var rawfragment = link.match[5];

            if (rawfragment) {
                WM.Log.logInfo("Processing " + link.match[0] + "...");

                var target = ((link.match[2]) ? link.match[2] + ":" : "") + link.match[4];

                // Note that it's impossible to recognize any namespaces in the title without querying the server
                // Alternatively, a list of the known namespaces could be maintained for each wiki
                // Recognizing namespaces would let recognize more liberal link syntaxes (e.g. spaces around the colon)
                if (!WM.Parser.compareArticleTitles(target, title)) {
                    var params = {
                        'action': 'parse',
                        'prop': 'sections',
                        'page': target,
                        'redirects': 1,
                    };

                    WM.MW.callAPIGet(params,
                                     null,
                                     WM.Plugins.FixLinkFragments.processLinkContinue,
                                     [link, target, rawfragment, links, index, source, newText, prevId, title, call, callArgs]);
                }
                else {
                    index++;
                    WM.Plugins.FixLinkFragments.processLink(title, links, index, source, newText, prevId, call, callArgs);
                }
            }
            else {
                index++;
                WM.Plugins.FixLinkFragments.processLink(title, links, index, source, newText, prevId, call, callArgs);
            }
        }
        else {
            newText += source.substr(prevId);
            call(newText, callArgs);
        }
    };

    this.processLinkContinue = function (res, args) {
        var link = args[0];
        var target = args[1];
        var rawfragment = args[2];
        var links = args[3];
        var index = args[4];
        var source = args[5];
        var newText = args[6];
        var prevId = args[7];
        var title = args[8];
        var call = args[9];
        var callArgs = args[10];

        // Check that the page is in the wiki (e.g. it's not an interwiki link)
        if (res.parse) {
            var sections = [];

            for (var s = 0; s < res.parse.sections.length; s++) {
                sections.push(WM.Parser.squashContiguousWhitespace(res.parse.sections[s].line).trim());
            }

            var fixedFragment = fixFragment(rawfragment, sections);

            newText += source.substring(prevId, link.index);

            if (fixedFragment === true) {
                newText += link.match[0];
            }
            else if (fixedFragment) {
                newText += "[[" + target + "#" + fixedFragment  + ((link.match[6]) ? "|" + link.match[6] : "") + "]]";
            }
            else {
                WM.Log.logWarning("Cannot fix broken link fragment: " + link.match[0]);
                newText += link.match[0];
            }

            prevId = link.index + link.length;
        }

        index++;
        WM.Plugins.FixLinkFragments.processLink(title, links, index, source, newText, prevId, call, callArgs);
    };

    var fixFragment = function (rawfragment, sections) {
        var fragment = WM.Parser.squashContiguousWhitespace(rawfragment).trim();

        if (sections.indexOf(fragment) < 0) {
            for (var s = 0; s < sections.length; s++) {
                var section = sections[s];
                var dotSection = WM.Parser.dotEncode(section);
                var dotFragment = WM.Parser.dotEncode(fragment);

                if (dotSection.toLowerCase() == dotFragment.toLowerCase()) {
                    if (fragment == dotFragment) {
                        // If the fragment was encoded, re-encode it because it
                        // could contain link-breaking characters (e.g. []|{})
                        // The condition would also be true if the fragment doesn't
                        // contain any encodable characters, but since section and
                        // fragment at most differ by capitalization, encoding the
                        // section won't have any effect
                        return dotSection;
                    }
                    else {
                        // If the fragment was not encoded, if the fragment
                        // contained link-breaking characters the link was already
                        // broken, and replacing it with section wouldn't make
                        // things worse; if the fragment didn't contain
                        // link-breaking characters, the section doesn't either,
                        // since section and fragment at most differ by
                        // capitalization, so it's safe to replace it
                        // If the fragment was *partially* encoded instead, a
                        // link-breaking character may have been encoded, so all
                        // link-breaking characters must be re-encoded here!
                        return WM.Parser.dotEncodeLinkBreakingFragmentCharacters(section);
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    };

    this.findArchWikiLinks = function (newText, callArgs) {
        var templates = WM.Parser.findTemplates(newText, 'Related');
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, 1, 0, newText, "", 0, WM.Plugins.FixLinkFragments.findArchWikiLinks2, callArgs);
    };

    this.findArchWikiLinks2 = function (newText, callArgs) {
        var templates = WM.Parser.findTemplates(newText, 'Related2');
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, 2, 0, newText, "", 0, WM.Plugins.FixLinkFragments.mainEnd, callArgs);
    };

    this.processArchWikiLink = function (title, templates, expectedArgs, index, source, newText, prevId, call, callArgs) {
        if (templates[index]) {
            var template = templates[index];
            var args = template.arguments;

            // Don't crash in case of malformed templates
            if (args.length == expectedArgs) {
                var link = args[0].value;
                var fragId = link.indexOf('#');

                if (fragId > -1) {
                    var rawtarget = link.substring(0, fragId);
                    var target = WM.Parser.squashContiguousWhitespace(rawtarget).trim();
                    var rawfragment = link.substr(fragId + 1);

                    if (rawfragment) {
                        // Note that it's impossible to recognize any namespaces in the title without querying the server
                        // Alternatively, a list of the known namespaces could be maintained for each wiki
                        // Recognizing namespaces would let recognize more liberal link syntaxes (e.g. spaces around the colon)
                        if (!WM.Parser.compareArticleTitles(target, title)) {
                            WM.Log.logInfo("Processing " + template.match[0] + "...");

                            var params = {
                                'action': 'parse',
                                'prop': 'sections',
                                'page': target,
                                'redirects': 1,
                            };

                            WM.MW.callAPIGet(params,
                                             null,
                                             WM.Plugins.FixLinkFragments.processArchWikiLinkContinue,
                                             [template, target, rawfragment, templates, expectedArgs, index, source, newText, prevId, title, call, callArgs]);
                        }
                        else {
                            index++;
                            WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
                        }
                    }
                    else {
                        index++;
                        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
                    }
                }
                else {
                    index++;
                    WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
                }
            }
            else {
                WM.Log.logWarning("Template:" + template.title + " must have " + expectedArgs + " and only " +
                expectedArgs + ((expectedArgs > 1) ? " arguments: " : " argument: ") + template.match[0]);
                index++;
                WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
            }
        }
        else {
            newText += source.substr(prevId);
            call(newText, callArgs);
        }
    };

    this.processArchWikiLinkContinue = function (res, args) {
        var template = args[0];
        var target = args[1];
        var rawfragment = args[2];
        var templates = args[3];
        var expectedArgs = args[4];
        var index = args[5];
        var source = args[6];
        var newText = args[7];
        var prevId = args[8];
        var title = args[9];
        var call = args[10];
        var callArgs = args[11];

        // Check that the page is in the wiki (e.g. it's not an interwiki link)
        if (res.parse) {
            var sections = [];

            for (var s = 0; s < res.parse.sections.length; s++) {
                sections.push(WM.Parser.squashContiguousWhitespace(res.parse.sections[s].line).trim());
            }

            var fixedFragment = fixFragment(rawfragment, sections);

            newText += source.substring(prevId, template.index);

            if (fixedFragment === true) {
                newText += template.match[0];
            }
            else if (fixedFragment) {
                var anchor = (template.arguments[1]) ? ("|" + template.arguments[1].value) : "";
                newText += "{{" + template.title + "|" + target + "#" + fixedFragment  + anchor + "}}";
            }
            else {
                WM.Log.logWarning("Cannot fix broken link fragment: " + template.match[0]);
                newText += template.match[0];
            }

            prevId = template.index + template.length;
        }

        index++;
        WM.Plugins.FixLinkFragments.processArchWikiLink(title, templates, expectedArgs, index, source, newText, prevId, call, callArgs);
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Fixing links to sections of other articles...");
        var links = WM.Parser.findInternalLinks(source, null, null);
        var title = WM.Editor.getTitle();
        WM.Plugins.FixLinkFragments.processLink(title, links, 0, source, "", 0, WM.Plugins.FixLinkFragments.mainContinue, callNext);
    };

    this.mainContinue = function (newText, callNext) {
        // Without this check this plugin would be specific to ArchWiki
        if (location.hostname == 'wiki.archlinux.org') {
            var templates = WM.Plugins.FixLinkFragments.findArchWikiLinks(newText, callNext);
        }
        else {
            WM.Plugins.FixLinkFragments.mainEnd(newText, callNext);
        }
    };

    this.mainEnd = function (newText, callNext) {
        var source = WM.Editor.readSource();

        if (newText != source) {
            WM.Editor.writeSource(newText);
            WM.Log.logInfo("Replaced links to sections of other articles");
        }
        else {
            WM.Log.logInfo("No fixable links to sections of other articles found");
        }

        if (callNext) {
            callNext();
        }
    };
};
