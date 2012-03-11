// ==UserScript==
// @id wiki-monkey-dev-bot
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.com>
// @version 12dev-bot
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/WikiMonkey-bot.meta.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/HTTP.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiFixHeader.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiFixHeadings.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiSaveTalk.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/SimpleReplace.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/UpdateCategoryTree.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiFixHeader", "Fix header", null],
        ["ArchWikiFixHeadings", "Fix headings", null],
        ["ArchWikiNewTemplates", "Use code templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Multiple line breaks", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
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

WM.UI.setWhatLinksHere([
    ["SimpleReplace", "RegExp substitution", ["1"]]
])

WM.UI.setSpecial([
    [
        ["UpdateCategoryTree", "Update main ToC",
         [{"Table of Contents": {root: "Category:English",
                                 alsoIn: "also in",
                                 indentType: "*",
                                 replace: ["[ _]\\(English\\)", "", ""]},
           "Table of Contents (Français)": {root: "Category:Français",
                                            alsoIn: "aussi dans",
                                            indentType: "#",
                                            replace: ["[ _]\\(Français\\)", "", ""]},
           "Table of Contents (Indonesia)": {root: "Category:Indonesia",
                                             alsoIn: "also in",
                                             indentType: "#",
                                             replace: ["[ _]\\(Indonesia\\)", "", ""]},
           "Table of Contents (Italiano)": {root: "Category:Italiano",
                                            alsoIn: "anche in",
                                            indentType: "#",
                                            replace: ["[ _]\\(Italiano\\)", "", ""]},
           "Table of Contents (Magyar)": {root: "Category:Magyar",
                                          alsoIn: "also in",
                                          indentType: "#",
                                          replace: ["[ _]\\(Magyar\\)", "", ""]},
           "Table of Contents (Polski)": {root: "Category:Polski",
                                          alsoIn: "also in",
                                          indentType: "#",
                                          replace: ["[ _]\\(Polski\\)", "", ""]},
           "Table of Contents (Slovenský)": {root: "Category:Slovenský",
                                             alsoIn: "also in",
                                             indentType: "#",
                                             replace: ["[ _]\\(Slovenský\\)", "", ""]},
           "Table of Contents (Suomi)": {root: "Category:Suomi",
                                         alsoIn: "also in",
                                         indentType: "#",
                                         replace: ["[ _]\\(Suomi\\)", "", ""]},
           "Table of Contents (Svenska)": {root: "Category:Svenska",
                                           alsoIn: "also in",
                                           indentType: "#",
                                           replace: ["[ _]\\(Svenska\\)", "", ""]},
           "Table of Contents (Türkçe)": {root: "Category:Türkçe",
                                          alsoIn: "also in",
                                          indentType: "#",
                                          replace: ["[ _]\\(Türkçe\\)", "", ""]},
           "Table of Contents (Ελληνικά)": {root: "Category:Ελληνικά",
                                            alsoIn: "also in",
                                            indentType: "#",
                                            replace: ["[ _]\\(Ελληνικά\\)", "", ""]},
           "Table of Contents (Български)": {root: "Category:Български",
                                             alsoIn: "also in",
                                             indentType: "#",
                                             replace: ["[ _]\\(Български\\)", "", ""]},
           "Table of Contents (Српски)": {root: "Category:Српски",
                                          alsoIn: "also in",
                                          indentType: "#",
                                 replace: ["[ _]\\(Српски\\)", "", ""]},
           // rtl scripts create buggy output
           /*"Table of Contents (עברית)": {root: "Category:עברית",
                                         alsoIn: "also in",
                                         indentType: "#",
                                         replace: ["[ _]\\(עברית\\)", "", ""]},*/
           "Table of Contents (ไทย)": {root: "Category:ไทย",
                                       alsoIn: "also in",
                                       indentType: "#",
                                       replace: ["[ _]\\(ไทย\\)", "", ""]},
           "Table of Contents (日本語)": {root: "Category:日本語",
                                         alsoIn: "also in",
                                         indentType: "#",
                                         replace: ["[ _]\\(日本語\\)", "", ""]}},
         "[[Wiki Monkey]]: automatic update"]]
    ]
])

WM.main()
