/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.UI = new function () {
    "use strict";

    this._makeUI = function () {
        var nextNode, UI;
        var display = true;
        var displayLog = true;

        WM.Mods.applyGeneralMods();

        if (document.getElementById('editform')) {
            nextNode = document.getElementById('wpSummaryLabel'
                                                    ).parentNode.nextSibling;
            var conf = WM.Cfg._getEditorPlugins();
            UI = (conf) ? WM.Menu._makeUI(conf) : null;
            WM.Mods.applyEditorMods();
        }
        else if (document.getElementById('mw-diff-otitle1')) {
            nextNode = document.getElementById('bodyContent'
                                            ).getElementsByTagName('h2')[0];
            var conf = WM.Cfg._getDiffPlugins();
            UI = (conf) ? WM.Menu._makeUI(conf) : null;
        }
        else if (document.getElementById('mw-subcategories') ||
                                        document.getElementById('mw-pages')) {
            nextNode = document.getElementById('bodyContent');
            var conf = WM.Cfg._getBotPlugins();
            UI = (conf) ? WM.Bot._makeUI(conf,
                            [[document.getElementById('mw-pages'), 0, "Pages"],
                            [document.getElementById('mw-subcategories'), 0,
                            "Subcategories"]]) : null;
            display = false;
        }
        else if (document.getElementById('mw-whatlinkshere-list')) {
            nextNode = document.getElementById('bodyContent'
                                ).getElementsByTagName('form')[0].nextSibling;
            var conf = WM.Cfg._getBotPlugins();
            UI = (conf) ? WM.Bot._makeUI(conf,
                            [[document.getElementById('mw-whatlinkshere-list'),
                            0, "Pages"]]) : null;
            display = false;
        }
        else if (document.getElementById('mw-linksearch-form') &&
                                        document.getElementById('bodyContent'
                                        ).getElementsByTagName('ol')[0]) {
            nextNode = document.getElementById('mw-linksearch-form'
                                                                ).nextSibling;
            var conf = WM.Cfg._getBotPlugins();
            UI = (conf) ? WM.Bot._makeUI(conf,
                        [[document.getElementById('bodyContent'
                        ).getElementsByTagName('ol')[0], 1, "Pages"]]) : null;
            display = false;
        }
        else if (document.getElementById('mw-prefixindex-list-table')) {
            nextNode = document.getElementById('mw-prefixindex-list-table');
            var conf = WM.Cfg._getBotPlugins();
            UI = (conf) ? WM.Bot._makeUI(conf,
                                [[nextNode.getElementsByTagName('tbody')[0],
                                0, "Pages"]]) : null;
            display = false;
        }
        /*
         * Making the interface shouldn't rely on saved configuration, in order
         * to always make it possible to fix a misconfiguration
         */
        else if (document.getElementById('mw-prefs-form')) {
            WM.Cfg._makeUI();
        }
        else {
            var wikiUrls = WM.MW.getWikiUrls();
            var patt1A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])SpecialPages", '');
            var patt1B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])SpecialPages", '');
            var patt2A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])RecentChanges", '');
            var patt2B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])RecentChanges", '');
            var patt3A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])NewPages", '');
            var patt3B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])NewPages", '');
            var patt4A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])ProtectedPages", '');
            var patt4B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])ProtectedPages", '');
            var patt5A = new RegExp(Alib.RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])Contributions", '');
            var patt5B = new RegExp(Alib.RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])Contributions", '');

            if (location.href.search(patt1A) > -1 ||
                                        location.href.search(patt1B) > -1) {
                nextNode = document.getElementById('bodyContent');
                var conf = WM.Cfg._getSpecialPlugins();
                UI = (conf) ? WM.Menu._makeUI(conf) : null;
            }
            else if (location.href.search(patt2A) > -1 ||
                                        location.href.search(patt2B) > -1) {
                nextNode = document.getElementById('mw-content-text'
                                            ).getElementsByTagName('h4')[0];
                var conf = WM.Cfg._getRecentChangesPlugins();
                UI = (conf) ? WM.Filters._makeUI(conf) : null;
                displayLog = false;
                WM.Mods.applyRecentChangesMods();
            }
            else if (location.href.search(patt3A) > -1 ||
                                        location.href.search(patt3B) > -1) {
                nextNode = document.getElementById('mw-content-text'
                                            ).getElementsByTagName('ul')[0];
                var conf = WM.Cfg._getNewPagesPlugins();
                UI = (conf) ? WM.Filters._makeUI(conf) : null;
                displayLog = false;
            }
            else if (location.href.search(patt4A) > -1 ||
                                        location.href.search(patt4B) > -1) {
                nextNode = document.getElementById('mw-content-text'
                                            ).getElementsByTagName('ul')[0];
                var conf = WM.Cfg._getBotPlugins();
                UI = (conf) ? WM.Bot._makeUI(conf,
                                    [[document.getElementById('mw-content-text'
                                            ).getElementsByTagName('ul')[0],
                                    0, "Pages"]]) : null;
                display = false;
            }
            else if (location.href.search(patt5A) > -1 ||
                                        location.href.search(patt5B) > -1) {
                WM.Mods.applyContributionsMods();
            }
            else if (document.getElementsByClassName('mw-spcontent'
                                                                ).length > 0) {
                nextNode = document.getElementsByClassName('mw-spcontent')[0];
                var conf = WM.Cfg._getBotPlugins();
                UI = (conf) ? WM.Bot._makeUI(conf,
                                    [[nextNode.getElementsByTagName('ol')[0],
                                    0, "Pages"]]) : null;
                display = false;
            }
            else if (document.getElementsByClassName('mw-allpages-table-chunk'
                                                                ).length > 0) {
                nextNode = document.getElementsByClassName(
                                                'mw-allpages-table-chunk')[0];
                var conf = WM.Cfg._getBotPlugins();
                UI = (conf) ? WM.Bot._makeUI(conf,
                                [[nextNode.getElementsByTagName('tbody')[0],
                                0, "Pages"]]) : null;
                display = false;
            }
        }

        if (UI) {
            Alib.CSS.addStyleElement("#WikiMonkey {position:relative;} " +
                        "#WikiMonkey fieldset {margin:0 0 1em 0;}");

            var main = document.createElement('fieldset');
            main.id = 'WikiMonkey';

            var legend = document.createElement('legend');
            legend.appendChild(document.createTextNode('Wiki Monkey '));

            var hide = document.createElement('a');
            hide.href = '#WikiMonkey';
            hide.innerHTML = '[hide]';
            hide.addEventListener("click", function () {
                var wmmain = document.getElementById('WikiMonkeyMain');
                if (wmmain.style.display == 'none') {
                    wmmain.style.display = 'block';
                    this.innerHTML = '[hide]';
                }
                else {
                    wmmain.style.display = 'none';
                    this.innerHTML = '[show]';
                }
                return false;
            }, false);
            legend.appendChild(hide);

            legend.appendChild(document.createTextNode(' '));

            var conf = document.createElement('a');
            conf.href = WM.MW.getWikiPaths().short +
                                            'Special:Preferences#wiki-monkey';
            conf.innerHTML = '[conf]';
            legend.appendChild(conf);

            legend.appendChild(document.createTextNode(' '));

            var help = document.createElement('a');
            help.href = 'https://github.com/kynikos/wiki-monkey/wiki'
            help.innerHTML = '[help]';
            legend.appendChild(help);

            main.appendChild(legend);

            var main2 = document.createElement('div');
            main2.id = 'WikiMonkeyMain';

            main2.appendChild(UI);

            var logArea = WM.Log._makeLogArea();
            if (!displayLog) {
                logArea.style.display = 'none';
            }
            main2.appendChild(logArea);

            if (!display) {
                main2.style.display = 'none';
                hide.innerHTML = '[show]';
            }
            main.appendChild(main2);

            nextNode.parentNode.insertBefore(main, nextNode);

            WM.Log.logHidden('Wiki Monkey version: ' + GM_info.script.version);
            var date = new Date();
            WM.Log.logHidden('Date: ' + date.toString());
            WM.Log.logHidden('URL: ' + location.href);
        }
    };
};
