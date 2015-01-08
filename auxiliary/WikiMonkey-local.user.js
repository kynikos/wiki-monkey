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
// @require https://code.jquery.com/jquery-2.1.3.min.js
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
// @require file:///mnt/archive/Development/wiki-monkey/modules/Cfg.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Diff.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Editor.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Filters.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Interlanguage.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Log.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Menu.js
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

WM.main({
    "PluginInstances": {
        "archWikiFixHeader": [
            "ArchWikiFixHeader",
            null
        ],
        "archWikiFixHeadings": [
            "ArchWikiFixHeadings",
            null
        ],
        "archWikiFixLinks": [
            "ArchWikiFixLinks",
            null
        ],
        "archWikiNewTemplates": [
            "ArchWikiNewTemplates",
            null
        ],
        "archWikiNPFilter": [
            "ArchWikiNPFilter",
            {"language": "English"}
        ],
        "archWikiOldAURLinks": [
            "ArchWikiOldAURLinks",
            null
        ],
        "archWikiOldAURLinksBot": [
            "ArchWikiOldAURLinks",
            "replace old-style direct package links with Pkg/AUR templates"
        ],
        "archWikiQuickReport": [
            "ArchWikiQuickReport",
            [
                "1",
                "ArchWiki:Reports",
                "add report"
            ]
        ],
        "archWikiRCFilter": [
            "ArchWikiRCFilter",
            {
                "language": "English"
            }
        ],
        "archWikiSaveTalk": [
            "ArchWikiSaveTalk",
            [
                "User:Kynikos/Tasks",
                "add discussion"
            ]
        ],
        "archWikiSortContacts": [
            "ArchWikiSortContacts",
            [
                ["ArchWiki:Administrators", "ArchWiki:Maintainers"],
                ["The following Administrators are currently inactive:",
                      "The following Maintainers are currently inactive:"],
                "automatically sort list according to recent activity"
            ]
        ],
        "archWikiSummaryToRelated": [
            "ArchWikiSummaryToRelated",
            null
        ],
        "archWikiUpdatePackageTemplates": [
            "ArchWikiUpdatePackageTemplates",
            null
        ],
        "archWikiUpdatePackageTemplatesBot": [
            "ArchWikiUpdatePackageTemplates",
            "update Pkg/AUR templates to reflect new package status"
        ],
        "archWikiWantedCategories": [
            "ArchWikiWantedCategories",
            null
        ],
        "deletePages": [
            "DeletePages",
            "delete page"
        ],
        "expandContractions": [
            "ExpandContractions",
            null
        ],
        "fixBacklinkFragments": [
            "FixBacklinkFragments",
            "fix links to specific sections"
        ],
        "fixDoubleRedirects": [
            "FixDoubleRedirects",
            "fix double redirect"
        ],
        "fixFragments": [
            "FixFragments",
            null
        ],
        "fixLinkFragments": [
            "FixLinkFragments",
            null
        ],
        "multipleLineBreaks": [
            "MultipleLineBreaks",
            null
        ],
        "simpleReplace": [
            "SimpleReplace",
            "1"
        ],
        "synchronizeInterlanguageLinks": [
            "SynchronizeInterlanguageLinks",
            null
        ],
        "synchronizeInterlanguageLinksBot": [
            "SynchronizeInterlanguageLinks",
            "synchronized interlanguage links with the other wikis"
        ],
        "updateCategoryTree": [
            "UpdateCategoryTree",
            [
                 [{"page": "Table of contents",
                    "root": "Category:English",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": null,
                    "keepAltName": false,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (العربية)",
                    "root": "Category:العربية",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(العربية\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": true},
                   {"page": "Table of Contents (Български)",
                    "root": "Category:Български",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Български\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Česky)",
                    "root": "Category:Česky",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Česky\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Dansk)",
                    "root": "Category:Dansk",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Dansk\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Ελληνικά)",
                    "root": "Category:Ελληνικά",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Ελληνικά\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of contents (Español)",
                    "root": "Category:Español",
                    "alsoIn": "también en",
                    "indentType": ":",
                    "replace": ["[ _]\\(Español\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (עברית)",
                    "root": "Category:עברית",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(עברית\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": true},
                   {"page": "Table of Contents (Hrvatski)",
                    "root": "Category:Hrvatski",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Hrvatski\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Magyar)",
                    "root": "Category:Magyar",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Magyar\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Indonesia)",
                    "root": "Category:Indonesia",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Indonesia\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Italiano)",
                    "root": "Category:Italiano",
                    "alsoIn": "anche in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Italiano\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (日本語)",
                    "root": "Category:日本語",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(日本語\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (한국어)",
                    "root": "Category:한국어",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(한국어\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Lietuviškai)",
                    "root": "Category:Lietuviškai",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Lietuviškai\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Nederlands)",
                    "root": "Category:Nederlands",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Nederlands\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Polski)",
                    "root": "Category:Polski",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Polski\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Português)",
                    "root": "Category:Português",
                    "alsoIn": "também em",
                    "indentType": ":",
                    "replace": ["[ _]\\(Português\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of contents (Русский)",
                    "root": "Category:Русский",
                    "alsoIn": "Также в",
                    "indentType": ":",
                    "replace": ["[ _]\\(Русский\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Slovenský)",
                    "root": "Category:Slovenský",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Slovenský\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Српски)",
                    "root": "Category:Српски",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Српски\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (ไทย)",
                    "root": "Category:ไทย",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(ไทย\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (Українська)",
                    "root": "Category:Українська",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(Українська\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (简体中文)",
                    "root": "Category:简体中文",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(简体中文\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false},
                   {"page": "Table of Contents (正體中文)",
                    "root": "Category:正體中文",
                    "alsoIn": "also in",
                    "indentType": ":",
                    "replace": ["[ _]\\(正體中文\\)", "", ""],
                    "keepAltName": true,
                    "showIndices": true,
                    "rightToLeft": false}],
                 "automatic update"
            ]
        ]
    },
    "Editor": [
        [
            ["Fix header", "archWikiFixHeader"],
            ["Fix headings", "archWikiFixHeadings"],
            ["Fix external links", "archWikiFixLinks"],
            ["Fix section links", "fixFragments"],
            ["Use code templates", "archWikiNewTemplates"],
            ["Expand contractions", "expandContractions"],
            ["Squash multiple line breaks", "multipleLineBreaks"],
            ["Convert summary to related", "archWikiSummaryToRelated"]
        ],
        [
            ["RegExp substitution", "simpleReplace"]
        ],
        [
            ["Fix external section links", "fixLinkFragments"],
            ["Sync interlanguage links",
                                    "synchronizeInterlanguageLinks"],
            ["Fix old AUR links", "archWikiOldAURLinks"],
            ["Update package templates",
                                    "archWikiUpdatePackageTemplates"]
        ]
    ],
    "Diff": [
        [
            ["Quick report", "archWikiQuickReport"]
        ],
        [
            ["Save discussion", "archWikiSaveTalk"]
        ]
    ],
    "Special": [
        [
            ["Update category tree", "updateCategoryTree"]
        ],
        [
            ["Fix double redirects", "fixDoubleRedirects"],
            ["Sort Admins and Maintainers", "archWikiSortContacts"]
        ]
    ],
    "RecentChanges": [
        ["Default filter", "archWikiRCFilter"]
    ],
    "NewPages": [
        ["Default filter", "archWikiNPFilter"]
    ],
    "Bot": [
        ["RegExp substitution", "simpleReplace"],
        ["Fix links to specific sections of a target page",
                                                "fixBacklinkFragments"],
        ["Synchronize interlanguage links",
                                    "synchronizeInterlanguageLinksBot"],
        ["Check packages linked with Pkg/AUR templates and possibly " +
                    "update them", "archWikiUpdatePackageTemplatesBot"],
        ["Replace old-style direct AUR package links with Template:AUR",
                                                "archWikiOldAURLinksBot"],
        ["Create wanted categories", "archWikiWantedCategories"],
        ["Delete pages", "deletePages"]
    ]
});
