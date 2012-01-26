// ==UserScript==
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @description Perform automatic actions when editing wiki pages
// @version development
// @icon http://github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/wikiMonkeyCore.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/user-functions/archWikiAppendDiffToRCPatrol.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/user-functions/archWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/user-functions/multipleLineBreaks.js
// ==/UserScript==

WM.main(
    [
        [
            ["ArchWikiNewTemplates", "Update templates", null],
            ["MultipleLineBreaks", "Multiple line breaks", null]
        ]
    ],
    [
        [
            ["ArchWikiAppendDiffToRCPatrol", "Append to patrol list",
             ["ArchWikiAppendDiffToRCPatrol-input",
              "User:Kynikos/RC_Patrol",
              "[[User:Kynikos/Wiki Monkey|Wiki Monkey]]: add diff"]]
        ]
    ]
);
