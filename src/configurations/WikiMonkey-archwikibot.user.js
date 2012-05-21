// ==UserScript==
// @id wiki-monkey-dev-archwikibot
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 16dev-archwikibot
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/WikiMonkey-archwikibot.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/WikiMonkey-archwikibot.user.js
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
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiTemplateAUR.js
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
    ],
    [
        ["ArchWikiTemplateAUR", "Use Template:AUR", null]
    ]
]);

WM.UI.setDiff([
    [
        ["ArchWikiQuickReport", "Quick report",
         ["1", "ArchWiki:Reports", "add report"]]
    ]
]);

WM.UI.setCategory([
    ["SimpleReplace", "RegExp substitution", ["1"]]
]);

WM.UI.setWhatLinksHere([
    ["SimpleReplace", "RegExp substitution", ["1"]]
]);

WM.UI.setLinkSearch([
    ["SimpleReplace", "RegExp substitution", ["1"]],
    ["ArchWikiTemplateAUR", "Replace direct AUR package links with Template:AUR", ["replace direct package links with Pkg/AUR templates"]]
]);

WM.UI.setSpecial([
    [
        ["UpdateCategoryTree", "Update main ToC",
         [[{page: "Table of Contents",
            root: "Category:English",
            alsoIn: "also in",
            indentType: ":",
            replace: null,
            keepAltName: false,
            showIndices: true},
           {page: "Table of Contents (Dansk)",
            root: "Category:Dansk",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Dansk\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Español)",
            root: "Category:Español",
            alsoIn: "también en",
            indentType: ":",
            replace: ["[ _]\\(Español\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Hrvatski)",
            root: "Category:Hrvatski",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Hrvatski\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Indonesia)",
            root: "Category:Indonesia",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Indonesia\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Italiano)",
            root: "Category:Italiano",
            alsoIn: "anche in",
            indentType: ":",
            replace: ["[ _]\\(Italiano\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Lietuviškai)",
            root: "Category:Lietuviškai",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Lietuviškai\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Magyar)",
            root: "Category:Magyar",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Magyar\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Nederlands)",
            root: "Category:Nederlands",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Nederlands\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Polski)",
            root: "Category:Polski",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Polski\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Português)",
            root: "Category:Português",
            alsoIn: "também em",
            indentType: ":",
            replace: ["[ _]\\(Português\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Slovenský)",
            root: "Category:Slovenský",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Slovenský\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Svenska)",
            root: "Category:Svenska",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Svenska\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Česky)",
            root: "Category:Česky",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Česky\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Ελληνικά)",
            root: "Category:Ελληνικά",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Ελληνικά\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Български)",
            root: "Category:Български",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Български\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Русский)",
            root: "Category:Русский",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Русский\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Српски)",
            root: "Category:Српски",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Српски\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (Українська)",
            root: "Category:Українська",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Українська\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           // rtl scripts create buggy output
           /*{page: "Table of Contents (עברית)",
              root: "Category:עברית",
              alsoIn: "also in",
              indentType: ":",
              replace: ["[ _]\\(עברית\\)", "", ""],
              keepAltName: true,
              showIndices: true},*/
           {page: "Table of Contents (ไทย)",
            root: "Category:ไทย",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(ไทย\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (日本語)",
            root: "Category:日本語",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(日本語\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (正體中文)",
            root: "Category:正體中文",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(正體中文\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (简体中文)",
            root: "Category:简体中文",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(简体中文\\)", "", ""],
            keepAltName: true,
            showIndices: true},
           {page: "Table of Contents (한국어)",
            root: "Category:한국어",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(한국어\\)", "", ""],
            keepAltName: true,
            showIndices: true}],
         "[[Wiki Monkey]]: automatic update"]]
    ]
]);

WM.UI.setSpecialList([
    ["SimpleReplace", "RegExp substitution", ["1"]]
]);

WM.main();
