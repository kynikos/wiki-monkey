// ==UserScript==
// @id wiki-monkey-local
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version local
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL file:///mnt/archive/Development/wiki-monkey/src/files/WikiMonkey-local.user.js
// @downloadURL file:///mnt/archive/Development/wiki-monkey/src/files/WikiMonkey-local.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/develop/src/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/develop/src/files/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require http://code.jquery.com/jquery-1.7.2.min.js
// @require file:///mnt/archive/Development/js-aux-lib/src/Async.js
// @require file:///mnt/archive/Development/js-aux-lib/src/Compatibility.js
// @require file:///mnt/archive/Development/js-aux-lib/src/DOM.js
// @require file:///mnt/archive/Development/js-aux-lib/src/HTTP.js
// @require file:///mnt/archive/Development/js-aux-lib/src/Obj.js
// @require file:///mnt/archive/Development/js-aux-lib/src/RegEx.js
// @require file:///mnt/archive/Development/js-aux-lib/src/Str.js
// @require file:///mnt/archive/Development/wiki-monkey/src/WikiMonkey.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/ArchWiki.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/Bot.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/Cat.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/Diff.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/Editor.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/Interlanguage.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/Log.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/MW.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/Parser.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/RecentChanges.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/Tables.js
// @require file:///mnt/archive/Development/wiki-monkey/src/modules/UI.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiFixHeader.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiFixHeadings.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiFixLinks.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiNewTemplates.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiOldAURLinks.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiQuickReport.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiRCFilter.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiSaveTalk.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ArchWikiWantedCategories.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/ExpandContractions.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/FixDoubleRedirects.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/MultipleLineBreaks.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/SimpleReplace.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/SynchronizeInterlanguageLinks.js
// @require file:///mnt/archive/Development/wiki-monkey/src/plugins/UpdateCategoryTree.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiFixHeader", "Fix header", null],
        ["ArchWikiFixHeadings", "Fix headings", null],
        ["ArchWikiFixLinks", "Fix links", null],
        ["ArchWikiNewTemplates", "Use code templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Multiple line breaks", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ],
    [
        ["SynchronizeInterlanguageLinks", "Sync interlanguage links",
         [function (title) {
             var language = WM.ArchWiki.detectLanguage(title)[1];
             // The language must correspond to a working interwiki tag
             return WM.ArchWiki.getInterlanguageTag(language);
         },
         WM.ArchWiki.getInterwikiLanguages()]],
        ["ArchWikiOldAURLinks", "Fix old AUR links", null]
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

WM.UI.setCategory([
    ["SimpleReplace", "RegExp substitution", ["1"]],
    ["SynchronizeInterlanguageLinks", "Synchronize interlanguage links",
     [function (title) {
         var language = WM.ArchWiki.detectLanguage(title)[1];
         // The language must correspond to a working interwiki tag
         return WM.ArchWiki.getInterlanguageTag(language);
     },
     WM.ArchWiki.getInterwikiLanguages(),
     "synchronized interlanguage links with the other wikis"]],
]);

WM.UI.setWhatLinksHere([
    ["SimpleReplace", "RegExp substitution", ["1"]],
    ["SynchronizeInterlanguageLinks", "Synchronize interlanguage links",
     [function (title) {
         var language = WM.ArchWiki.detectLanguage(title)[1];
         // The language must correspond to a working interwiki tag
         return WM.ArchWiki.getInterlanguageTag(language);
     },
     WM.ArchWiki.getInterwikiLanguages(),
     "synchronized interlanguage links with the other wikis"]],
]);

WM.UI.setLinkSearch([
    ["SimpleReplace", "RegExp substitution", ["1"]],
    ["SynchronizeInterlanguageLinks", "Synchronize interlanguage links",
     [function (title) {
         var language = WM.ArchWiki.detectLanguage(title)[1];
         // The language must correspond to a working interwiki tag
         return WM.ArchWiki.getInterlanguageTag(language);
     },
     WM.ArchWiki.getInterwikiLanguages(),
     "synchronized interlanguage links with the other wikis"]],
    ["ArchWikiOldAURLinks", "Replace old-style direct AUR package links with Template:AUR", ["replace old-style direct package links with Pkg/AUR templates"]]
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
           {page: "Table of Contents (Español)",
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
           {page: "Table of Contents (Русский)",
            root: "Category:Русский",
            alsoIn: "also in",
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
        ["FixDoubleRedirects", "Fix double redirects", "fix double redirect"]
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

WM.UI.setSpecialList([
    ["SimpleReplace", "RegExp substitution", ["1"]],
    ["SynchronizeInterlanguageLinks", "Synchronize interlanguage links",
     [function (title) {
         var language = WM.ArchWiki.detectLanguage(title)[1];
         // The language must correspond to a working interwiki tag
         return WM.ArchWiki.getInterlanguageTag(language);
     },
     WM.ArchWiki.getInterwikiLanguages(),
     "synchronized interlanguage links with the other wikis"]],
    ["ArchWikiWantedCategories", "Create wanted categories", null],
]);

WM.main();
