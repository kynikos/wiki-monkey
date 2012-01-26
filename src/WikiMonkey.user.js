// ==UserScript==
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @description Perform automatic actions when editing wiki pages
// @version development
// @icon http://github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/WikiMonkeyCore.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/user-functions/ArchWikiAppendDiffToRCPatrol.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/user-functions/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/user-functions/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/user-functions/MultipleLineBreaks.js
// ==/UserScript==

WM.main(
    [
        [
            ["ArchWikiNewTemplates", "Update templates", null],
            ["ExpandContractions", "Expand contractions", null],
            ["MultipleLineBreaks", "Multiple line breaks", null]
        ]
    ],
    [
        [
            ["ArchWikiAppendDiffToRCPatrol", "Append to patrol list",
             ["ArchWikiAppendDiffToRCPatrol-input",
              "User:" + WM.getUserName() + "/RC_Patrol",
              "[[User:" + WM.getUserName() + "/Wiki Monkey|Wiki Monkey]]: add diff"]]
        ]
    ]
);
