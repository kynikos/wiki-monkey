// ==UserScript==
// @id wiki-monkey-local
// @name Wiki Monkey (local)
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 2.0.2-local
// @description MediaWiki-compatible bot and editor assistant that runs in the browser (local version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL file:///mnt/archive/Development/wiki-monkey/auxiliary/WikiMonkey-local.user.js
// @downloadURL file:///mnt/archive/Development/wiki-monkey/auxiliary/WikiMonkey-local.user.js
// @icon file:///mnt/archive/Development/wiki-monkey/auxiliary/wiki-monkey.png
// @icon64 file:///mnt/archive/Development/wiki-monkey/auxiliary/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.3.min.js
// @require file:///mnt/archive/Development/lib.js.generic/src/GMAPIEmulation.js
// @require file:///mnt/archive/Development/lib.js.generic/src/Async.js
// @require file:///mnt/archive/Development/lib.js.generic/src/Compatibility.js
// @require file:///mnt/archive/Development/lib.js.generic/src/CSS.js
// @require file:///mnt/archive/Development/lib.js.generic/src/DOM.js
// @require file:///mnt/archive/Development/lib.js.generic/src/HTTP.js
// @require file:///mnt/archive/Development/lib.js.generic/src/Obj.js
// @require file:///mnt/archive/Development/lib.js.generic/src/RegEx.js
// @require file:///mnt/archive/Development/lib.js.generic/src/Str.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/_Init.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Bot.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Cat.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Cfg.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Diff.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Editor.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Filters.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Interlanguage.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Log.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Menu.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Mods.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/MW.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Parser.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/Tables.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/UI.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/WhatLinksHere.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/ArchPackages.js
// @require file:///mnt/archive/Development/wiki-monkey/modules/ArchWiki.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/ExpandContractions.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/FixBacklinkFragments.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/FixDoubleRedirects.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/FixFragments.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/FixLinkFragments.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/MultipleLineBreaks.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/SimpleReplace.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/SynchronizeInterlanguageLinks.js
// @require file:///mnt/archive/Development/wiki-monkey/plugins/UpdateCategoryTree.js
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
// ==/UserScript==

WM.main({
    "Mods": {
        "Editor": {
            "disable_edit_summary_submit_on_enter": true
        }
    },
    "Plugins": {
        "Bot": {
            "010SR": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "020BL": [
                "FixBacklinkFragments",
                [
                    "Fix links to specific sections of a target page"
                ],
                "fix links to specific sections"
            ],
            "030IL": [
                "SynchronizeInterlanguageLinks",
                [
                    "Synchronize interlanguage links"
                ],
                [
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    "synchronized interlanguage links with the other wikis"
                ]
            ],
            "040APT": [
                "ArchWikiUpdatePackageTemplates",
                [
                    "Check packages linked with Pkg/AUR templates and possibly update them"
                ],
                "update Pkg/AUR templates to reflect new package status"
            ],
            "050AAL": [
                "ArchWikiOldAURLinks",
                [
                    "Replace old-style direct AUR package links with Template:AUR"
                ],
                "replace old-style direct package links with Pkg/AUR templates"
            ],
            "060AWC": [
                "ArchWikiWantedCategories",
                [
                    "Create wanted categories"
                ],
                null
            ],
            "070DP": [
                "DeletePages",
                [
                    "Delete pages"
                ],
                "delete page"
            ]
        },
        "Diff": {
            "010AQR": [
                "ArchWikiQuickReport",
                [
                    "Quick report"
                ],
                [
                    "ArchWiki:Reports",
                    "add report"
                ]
            ],
            "020AST": [
                "ArchWikiSaveTalk",
                [
                    "Save discussion"
                ],
                [
                    "User:Kynikos/Tasks",
                    "add discussion"
                ]
            ]
        },
        "Editor": {
            "010AHE": [
                "ArchWikiFixHeader",
                [
                    "Text plugins",
                    "Fix header"
                ],
                null
            ],
            "020ASE": [
                "ArchWikiFixHeadings",
                [
                    "Text plugins",
                    "Fix headings"
                ],
                null
            ],
            "030AEL": [
                "ArchWikiFixLinks",
                [
                    "Text plugins",
                    "Fix external links"
                ],
                null
            ],
            "040SL": [
                "FixFragments",
                [
                    "Text plugins",
                    "Fix section links"
                ],
                null
            ],
            "050ACT": [
                "ArchWikiNewTemplates",
                [
                    "Text plugins",
                    "Use code templates"
                ],
                null
            ],
            "060EC": [
                "ExpandContractions",
                [
                    "Text plugins",
                    "Expand contractions"
                ],
                null
            ],
            "070ML": [
                "MultipleLineBreaks",
                [
                    "Text plugins",
                    "Squash multiple line breaks"
                ],
                null
            ],
            "080ASR": [
                "ArchWikiSummaryToRelated",
                [
                    "Text plugins",
                    "Convert summary to related"
                ],
                null
            ],
            "110SR": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "210ES": [
                "FixLinkFragments",
                [
                    "Query plugins",
                    "Fix external section links"
                ],
                null
            ],
            "220AIL": [
                "SynchronizeInterlanguageLinks",
                [
                    "Query plugins",
                    "Sync interlanguage links"
                ],
                [
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    null
                ]
            ],
            "230AAL": [
                "ArchWikiOldAURLinks",
                [
                    "Query plugins",
                    "Fix old AUR links"
                ],
                null
            ],
            "240APT": [
                "ArchWikiUpdatePackageTemplates",
                [
                    "Query plugins",
                    "Update package templates"
                ],
                null
            ]
        },
        "NewPages": {
            "010ANP": [
                "ArchWikiNPFilter",
                [
                    "Default filter"
                ],
                {
                    "language": "English"
                }
            ]
        },
        "RecentChanges": {
            "010ARC": [
                "ArchWikiRCFilter",
                [
                    "Default filter"
                ],
                {
                    "language": "English"
                }
            ]
        },
        "Special": {
            "010CTar": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Arabic"
                ],
                [
                    [
                        "ArchWiki",
                        "ar"
                    ],
                    "automatic update"
                ]
            ],
            "010CTbg": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Bulgarian"
                ],
                [
                    [
                        "ArchWiki",
                        "bg"
                    ],
                    "automatic update"
                ]
            ],
            "010CTcs": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Czech"
                ],
                [
                    [
                        "ArchWiki",
                        "cs"
                    ],
                    "automatic update"
                ]
            ],
            "010CTda": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Danish"
                ],
                [
                    [
                        "ArchWiki",
                        "da"
                    ],
                    "automatic update"
                ]
            ],
            "010CTel": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Greek"
                ],
                [
                    [
                        "ArchWiki",
                        "el"
                    ],
                    "automatic update"
                ]
            ],
            "010CTen": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "English"
                ],
                [
                    [
                        "ArchWiki",
                        "en"
                    ],
                    "automatic update"
                ]
            ],
            "010CTes": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Spanish"
                ],
                [
                    [
                        "ArchWiki",
                        "es"
                    ],
                    "automatic update"
                ]
            ],
            "010CThe": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Hebrew"
                ],
                [
                    [
                        "ArchWiki",
                        "he"
                    ],
                    "automatic update"
                ]
            ],
            "010CThr": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Croatian"
                ],
                [
                    [
                        "ArchWiki",
                        "hr"
                    ],
                    "automatic update"
                ]
            ],
            "010CThu": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Hungarian"
                ],
                [
                    [
                        "ArchWiki",
                        "hu"
                    ],
                    "automatic update"
                ]
            ],
            "010CTid": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Indonesian"
                ],
                [
                    [
                        "ArchWiki",
                        "id"
                    ],
                    "automatic update"
                ]
            ],
            "010CTit": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Italian"
                ],
                [
                    [
                        "ArchWiki",
                        "it"
                    ],
                    "automatic update"
                ]
            ],
            "010CTko": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Korean"
                ],
                [
                    [
                        "ArchWiki",
                        "ko"
                    ],
                    "automatic update"
                ]
            ],
            "010CTlt": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Lithuanian"
                ],
                [
                    [
                        "ArchWiki",
                        "lt"
                    ],
                    "automatic update"
                ]
            ],
            "010CTnl": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Dutch"
                ],
                [
                    [
                        "ArchWiki",
                        "nl"
                    ],
                    "automatic update"
                ]
            ],
            "010CTpl": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Polish"
                ],
                [
                    [
                        "ArchWiki",
                        "pl"
                    ],
                    "automatic update"
                ]
            ],
            "010CTpt": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Portuguese"
                ],
                [
                    [
                        "ArchWiki",
                        "pt"
                    ],
                    "automatic update"
                ]
            ],
            "010CTru": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Russian"
                ],
                [
                    [
                        "ArchWiki",
                        "ru"
                    ],
                    "automatic update"
                ]
            ],
            "010CTsk": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Slovak"
                ],
                [
                    [
                        "ArchWiki",
                        "sk"
                    ],
                    "automatic update"
                ]
            ],
            "010CTsr": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Serbian"
                ],
                [
                    [
                        "ArchWiki",
                        "sr"
                    ],
                    "automatic update"
                ]
            ],
            "010CTth": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Thai"
                ],
                [
                    [
                        "ArchWiki",
                        "th"
                    ],
                    "automatic update"
                ]
            ],
            "010CTuk": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Ukrainian"
                ],
                [
                    [
                        "ArchWiki",
                        "uk"
                    ],
                    "automatic update"
                ]
            ],
            "010CTzhcn": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Chinese (Simplified)"
                ],
                [
                    [
                        "ArchWiki",
                        "zh-cn"
                    ],
                    "automatic update"
                ]
            ],
            "010CTzhtw": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Chinese (Traditional)"
                ],
                [
                    [
                        "ArchWiki",
                        "zh-tw"
                    ],
                    "automatic update"
                ]
            ],
            "020DR": [
                "FixDoubleRedirects",
                [
                    "Fix double redirects"
                ],
                "fix double redirect"
            ],
            "030ASC": [
                "ArchWikiSortContacts",
                [
                    "Sort contacts",
                    "Sort Administrators"
                ],
                [
                    "ArchWiki:Administrators",
                    "The following Administrators are currently inactive:",
                    "automatically sort list according to recent activity"
                ]
            ],
            "040ASCM": [
                "ArchWikiSortContacts",
                [
                    "Sort contacts",
                    "Sort Maintainers"
                ],
                [
                    "ArchWiki:Maintainers",
                    "The following Maintainers are currently inactive:",
                    "automatically sort list according to recent activity"
                ]
            ]
        }
    }
});
