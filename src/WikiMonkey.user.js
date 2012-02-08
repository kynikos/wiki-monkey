// ==UserScript==
// @id wiki-monkey
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.com>
// @version 1.6.1
// @description Perform automatic actions when editing wiki pages
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/WikiMonkey.meta.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/Core.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/modules/HTTP.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/plugins/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/plugins/ArchWikiSaveTalk.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.6.1/src/plugins/MultipleLineBreaks.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiNewTemplates", "Update templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Multiple line breaks", null]
    ]
])

WM.UI.setDiff([
    [
        ["ArchWikiQuickReport", "Quick report",
         ["1", "User:" + WM.MW.getUserName() + "/RC_Patrol", "+ diff"]]
    ],
    [
        ["ArchWikiSaveTalk", "Save discussion",
         ["User:" + WM.MW.getUserName() + "/Discussions", "+ diff"]]
    ]
])

WM.main()
