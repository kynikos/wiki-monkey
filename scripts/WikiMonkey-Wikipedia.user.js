// ==UserScript==
// @id wiki-monkey-wikipedia
// @name Wiki Monkey (Wikipedia)
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 2.0.1-wikipedia
// @description MediaWiki-compatible bot and editor assistant that runs in the browser (Wikipedia version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/scripts/WikiMonkey-Wikipedia.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/scripts/WikiMonkey-Wikipedia.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/2.0.1/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/2.0.1/auxiliary/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.3.min.js
// @require https://raw.github.com/kynikos/wiki-monkey/2.0.1/scripts/WikiMonkey-Wikipedia.include.js
// ==/UserScript==

WM.main({
    "Plugins": {
        "Bot": {
            "010SR": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "020BL": [
                "FixBacklinkFragments",
                [
                    "Fix links to specific sections of a target page"
                ],
                "fix links to specific sections"
            ]
        },
        "Diff": {},
        "Editor": {
            "040SL": [
                "FixFragments",
                [
                    "Text plugins",
                    "Fix section links"
                ],
                null
            ],
            "060EC": [
                "ExpandContractions",
                [
                    "Text plugins",
                    "Expand contractions"
                ],
                null
            ],
            "070ML": [
                "MultipleLineBreaks",
                [
                    "Text plugins",
                    "Squash multiple line breaks"
                ],
                null
            ],
            "110SR": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "210ES": [
                "FixLinkFragments",
                [
                    "Query plugins",
                    "Fix external section links"
                ],
                null
            ]
        },
        "NewPages": {},
        "RecentChanges": {},
        "Special": {
            "020DR": [
                "FixDoubleRedirects",
                [
                    "Fix double redirects"
                ],
                "fix double redirect"
            ]
        }
    }
});
