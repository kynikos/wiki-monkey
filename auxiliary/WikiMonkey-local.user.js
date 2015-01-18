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
            null
        ],
        "synchronizeInterlanguageLinks": [
            "SynchronizeInterlanguageLinks",
            [
                "ArchWiki",
                "ArchWiki",
                "ArchWiki",
                null
            ]
        ],
        "synchronizeInterlanguageLinksBot": [
            "SynchronizeInterlanguageLinks",
            [
                "ArchWiki",
                "ArchWiki",
                "ArchWiki",
                "synchronized interlanguage links with the other wikis"
            ]
        ],
        "updateCategoryTreeAr": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "ar"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeBg": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "bg"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeCs": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "cs"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeDa": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "da"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeEl": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "el"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeEn": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "en"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeEs": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "es"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeHe": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "he"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeHr": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "hr"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeHu": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "hu"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeId": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "id"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeIt": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "it"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeJa": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "ja"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeKo": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "ko"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeLt": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "lt"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeNl": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "nl"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreePl": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "pl"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreePt": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "pt"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeRu": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "ru"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeSk": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "sk"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeSr": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "sr"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeTh": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "th"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeUk": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "uk"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeZhCn": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "zh-cn"
                ],
                "automatic update"
            ]
        ],
        "updateCategoryTreeZhTw": [
            "UpdateCategoryTree",
            [
                [
                    "ArchWiki",
                    "zh-tw"
                ],
                "automatic update"
            ]
        ]
    },
    "Editor": [
        [
            "Text plugins", [
                ["Fix header", "archWikiFixHeader"],
                ["Fix headings", "archWikiFixHeadings"],
                ["Fix external links", "archWikiFixLinks"],
                ["Fix section links", "fixFragments"],
                ["Use code templates", "archWikiNewTemplates"],
                ["Expand contractions", "expandContractions"],
                ["Squash multiple line breaks", "multipleLineBreaks"],
                ["Convert summary to related", "archWikiSummaryToRelated"]
            ]
        ],
        ["RegExp substitution", "simpleReplace"],
        [
            "Query plugins", [
                ["Fix external section links", "fixLinkFragments"],
                ["Sync interlanguage links",
                                        "synchronizeInterlanguageLinks"],
                ["Fix old AUR links", "archWikiOldAURLinks"],
                ["Update package templates",
                                        "archWikiUpdatePackageTemplates"]
            ]
        ]
    ],
    "Diff": [
        ["Quick report", "archWikiQuickReport"],
        ["Save discussion", "archWikiSaveTalk"]
    ],
    "Special": [
        [
            "Update category trees", [
                ["Arabic", "updateCategoryTreeAr"],
                ["Bulgarian", "updateCategoryTreeBg"],
                ["Chinese (Simplified)", "updateCategoryTreeZhCn"],
                ["Chinese (Traditional)", "updateCategoryTreeZhTw"],
                ["Croatian", "updateCategoryTreeHr"],
                ["Czech", "updateCategoryTreeCs"],
                ["Danish", "updateCategoryTreeDa"],
                ["Dutch", "updateCategoryTreeNl"],
                ["English", "updateCategoryTreeEn"],
                ["Greek", "updateCategoryTreeEl"],
                ["Hebrew", "updateCategoryTreeHe"],
                ["Hungarian", "updateCategoryTreeHu"],
                ["Indonesian", "updateCategoryTreeId"],
                ["Italian", "updateCategoryTreeIt"],
                ["Japanese", "updateCategoryTreeJa"],
                ["Korean", "updateCategoryTreeKo"],
                ["Lithuanian", "updateCategoryTreeLt"],
                ["Polish", "updateCategoryTreePl"],
                ["Portuguese", "updateCategoryTreePt"],
                ["Russian", "updateCategoryTreeRu"],
                ["Serbian", "updateCategoryTreeSr"],
                ["Slovak", "updateCategoryTreeSk"],
                ["Spanish", "updateCategoryTreeEs"],
                ["Thai", "updateCategoryTreeTh"],
                ["Ukrainian", "updateCategoryTreeUk"]
            ]
        ],
        ["Fix double redirects", "fixDoubleRedirects"],
        ["Sort Admins and Maintainers", "archWikiSortContacts"]
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
