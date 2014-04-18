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

WM.Plugins.ArchWikiDeprecateFaq = new function () {
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();

        var faqs = WM.Parser.findTemplates(source, 'FAQ');
        var index = 0;
        var newText = "";

        for (var f = 0; f < faqs.length; f++) {
            var faq = faqs[f];
            var heading = faq.arguments[0].value.trim();

            if (faq.arguments.length == 2) {
                if (heading.indexOf("\n") > -1) {
                    WM.Log.logWarning("Cannot replace " + faq.rawTransclusion +
                            " because the question spans multiple lines");
                    newText += source.substring(index, faq.index + faq.length);
                }
                else {
                    newText += source.substring(index, faq.index) + "=== " +
                        heading + " ===\n\n" + faq.arguments[1].value.trim();
                }
            }
            else {
                WM.Log.logWarning("Cannot replace " + faq.rawTransclusion +
                        " because it has an unexpected number of arguments");
                newText += source.substring(index, faq.index + faq.length);
            }

            index = faq.index + faq.length;
        }

        newText += source.substr(index);

        if (faq) {
            WM.Editor.writeSource(newText);
            WM.Log.logWarning("Replaced Template:FAQ with simple level-3 " +
                                    "sections: check that the sections " +
                                    "don't require a higher level and that " +
                                    "no unneeded white space has been added");
        }

        if (callNext) {
            callNext();
        }
    };
};
