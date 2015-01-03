// ==UserScript==
// @id wiki-monkey-local
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version local
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL file:///mnt/archive/Development/wiki-monkey/files/WikiMonkey-local.user.js
// @downloadURL file:///mnt/archive/Development/wiki-monkey/files/WikiMonkey-local.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/develop/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/develop/files/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.1.min.js
// @require file:///mnt/archive/Development/lib.js.generic/src/Async.js
// @require file:///mnt/archive/Development/lib.js.generic/src/Compatibility.js
// @require file:///mnt/archive/Development/lib.js.generic/src/CSS.js
// @require file:///mnt/archive/Development/lib.js.generic/src/DOM.js
// @require file:///mnt/archive/Development/lib.js.generic/src/HTTP.js
// @require file:///mnt/archive/Development/lib.js.generic/src/Obj.js
// @require file:///mnt/archive/Development/lib.js.generic/src/RegEx.js
// @require file:///mnt/archive/Development/lib.js.generic/src/Str.js
// @require file:///mnt/archive/Development/wiki-monkey/WikiMonkey.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/ArchPackages.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/ArchWiki.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Bot.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Cat.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Diff.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Editor.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Filters.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Interlanguage.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Log.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/MW.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Parser.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Tables.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/UI.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/WhatLinksHere.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiFixHeader.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiFixHeadings.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiFixLinks.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiNewTemplates.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiNPFilter.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiOldAURLinks.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiQuickReport.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiRCFilter.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiSaveTalk.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiSortContacts.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiSummaryToRelated.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiUpdatePackageTemplates.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ArchWikiWantedCategories.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/DeletePages.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ExpandContractions.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/FixBacklinkFragments.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/FixDoubleRedirects.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/FixFragments.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/FixLinkFragments.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/MultipleLineBreaks.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/SimpleReplace.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/SynchronizeInterlanguageLinks.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/UpdateCategoryTree.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiFixHeader", "Fix header", null],
        ["ArchWikiFixHeadings", "Fix headings", null],
        ["ArchWikiFixLinks", "Fix external links", null],
        ["FixFragments", "Fix section links", null],
        ["ArchWikiNewTemplates", "Use code templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Squash multiple line breaks", null],
        ["ArchWikiSummaryToRelated", "Convert summary to related", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ],
    [
        ["FixLinkFragments", "Fix external section links", null],
        ["SynchronizeInterlanguageLinks", "Sync interlanguage links"],
        ["ArchWikiOldAURLinks", "Fix old AUR links", null],
        ["ArchWikiUpdatePackageTemplates", "Update package templates", null]
    ]
]);

WM.UI.setDiff([
    [
        ["ArchWikiQuickReport", "Quick report",
         ["1", "ArchWiki:Reports", "add report"]]
    ],
    [
        ["ArchWikiSaveTalk", "Save discussion",
         ["User:Kynikos/Tasks", "add discussion"]]
    ]
]);

WM.UI.setSpecial([
    [
        ["UpdateCategoryTree", "Update category tree",
         [[{page: "Table of contents",
            root: "Category:English",
            alsoIn: "also in",
            indentType: ":",
            replace: null,
            keepAltName: false,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (العربية)",
            root: "Category:العربية",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(العربية\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: true},
           {page: "Table of Contents (Български)",
            root: "Category:Български",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Български\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Česky)",
            root: "Category:Česky",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Česky\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Dansk)",
            root: "Category:Dansk",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Dansk\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Ελληνικά)",
            root: "Category:Ελληνικά",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Ελληνικά\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of contents (Español)",
            root: "Category:Español",
            alsoIn: "también en",
            indentType: ":",
            replace: ["[ _]\\(Español\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (עברית)",
            root: "Category:עברית",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(עברית\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: true},
           {page: "Table of Contents (Hrvatski)",
            root: "Category:Hrvatski",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Hrvatski\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Magyar)",
            root: "Category:Magyar",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Magyar\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Indonesia)",
            root: "Category:Indonesia",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Indonesia\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Italiano)",
            root: "Category:Italiano",
            alsoIn: "anche in",
            indentType: ":",
            replace: ["[ _]\\(Italiano\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (日本語)",
            root: "Category:日本語",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(日本語\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (한국어)",
            root: "Category:한국어",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(한국어\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Lietuviškai)",
            root: "Category:Lietuviškai",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Lietuviškai\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Nederlands)",
            root: "Category:Nederlands",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Nederlands\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Polski)",
            root: "Category:Polski",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Polski\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Português)",
            root: "Category:Português",
            alsoIn: "também em",
            indentType: ":",
            replace: ["[ _]\\(Português\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of contents (Русский)",
            root: "Category:Русский",
            alsoIn: "Также в",
            indentType: ":",
            replace: ["[ _]\\(Русский\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Slovenský)",
            root: "Category:Slovenský",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Slovenský\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Српски)",
            root: "Category:Српски",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Српски\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (ไทย)",
            root: "Category:ไทย",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(ไทย\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (Українська)",
            root: "Category:Українська",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(Українська\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (简体中文)",
            root: "Category:简体中文",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(简体中文\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false},
           {page: "Table of Contents (正體中文)",
            root: "Category:正體中文",
            alsoIn: "also in",
            indentType: ":",
            replace: ["[ _]\\(正體中文\\)", "", ""],
            keepAltName: true,
            showIndices: true,
            rightToLeft: false}],
         "automatic update"]]
    ],
    [
        ["FixDoubleRedirects", "Fix double redirects", "fix double redirect"],
        ["ArchWikiSortContacts", "Sort Admins and Maintainers",
                    [["ArchWiki:Administrators", "ArchWiki:Maintainers"],
                     ["The following Administrators are currently inactive:",
                      "The following Maintainers are currently inactive:"],
                     "automatically sort list according to recent activity"]]
    ]
]);

WM.UI.setRecentChanges([
    [
        "ArchWikiRCFilter",
        "Default filter",
        {
            language: "English",
        }
    ]
]);

WM.UI.setNewPages([
    [
        "ArchWikiNPFilter",
        "Default filter",
        {
            language: "English",
        }
    ]
]);

WM.UI.setBot([
    ["SimpleReplace", "RegExp substitution", ["1"]],
    ["FixBacklinkFragments", "Fix links to specific sections of a target " +
                                "page", "fix links to specific sections"],
    ["SynchronizeInterlanguageLinks", "Synchronize interlanguage links",
     "synchronized interlanguage links with the other wikis"],
    ["ArchWikiUpdatePackageTemplates", "Check packages linked with Pkg/AUR " +
                "templates and possibly update them",
                ["update Pkg/AUR templates to reflect new package status"]],
    ["ArchWikiOldAURLinks", "Replace old-style direct AUR package links " +
            "with Template:AUR",
            ["replace old-style direct package links with Pkg/AUR templates"]],
    ["ArchWikiWantedCategories", "Create wanted categories", null],
    ["DeletePages", "Delete pages", "delete page"],
]);

WM.main();
