// ==UserScript==
// @id wiki-monkey-editor
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.17.6-wikipedia
// @description MediaWiki-compatible bot and editor assistant that runs in the browser (Wikipedia version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-editor.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-editor.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/1.17.6/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/1.17.6/auxiliary/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.3.min.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.17.6/scripts/WikiMonkey-Wikipedia.include.js
// ==/UserScript==

WM.main({
    "Mods": {
        "Contributions": {
            "hide_rollback_links": true
        },
        "Editor": {
            "disable_edit_summary_submit_on_enter": true,
            "scroll_to_first_heading": false
        },
        "General": {
            "heading_number_style": false
        },
        "RecentChanges": {
            "hide_rollback_links": true
        }
    },
    "Plugins": {
        "Bot": {
            "010SR": [
                "SimpleReplace",
                null,
                null
            ],
            "020BL": [
                "FixBacklinkFragments",
                null,
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
                null,
                "fix double redirect"
            ]
        }
    }
});
