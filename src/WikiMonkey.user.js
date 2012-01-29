// ==UserScript==
// @id wiki-monkey-development
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.com>
// @version development-201201292144
// @description Perform automatic actions when editing wiki pages
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/development/src/WikiMonkey.meta.js
// @icon http://github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/WikiMonkeyCore.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/MultipleLineBreaks.js
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
            ["ArchWikiQuickReport", "Quick report",
             ["ArchWikiQuickReport-input",
              "User:" + WM.getUserName() + "/RC_Patrol",
              "[[User:" + WM.getUserName() + "/Wiki Monkey|Wiki Monkey]]: add diff"]]
        ]
    ]
);
