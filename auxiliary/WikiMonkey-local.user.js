// ==UserScript==
// @id wiki-monkey-local
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version local
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
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
    "Plugins": {
        "Bot": {
            "10": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "20": [
                "FixBacklinkFragments",
                [
                    "Fix links to specific sections of a target page"
                ],
                "fix links to specific sections"
            ],
            "30": [
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
            "40": [
                "ArchWikiUpdatePackageTemplates",
                [
                    "Check packages linked with Pkg/AUR templates and possibly update them"
                ],
                "update Pkg/AUR templates to reflect new package status"
            ],
            "50": [
                "ArchWikiOldAURLinks",
                [
                    "Replace old-style direct AUR package links with Template:AUR"
                ],
                "replace old-style direct package links with Pkg/AUR templates"
            ],
            "60": [
                "ArchWikiWantedCategories",
                [
                    "Create wanted categories"
                ],
                null
            ],
            "70": [
                "DeletePages",
                [
                    "Delete pages"
                ],
                "delete page"
            ]
        },
        "Diff": {
            "10": [
                "ArchWikiQuickReport",
                [
                    "Quick report"
                ],
                [
                    "1",
                    "ArchWiki:Reports",
                    "add report"
                ]
            ],
            "20": [
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
            "10": [
                "ArchWikiFixHeader",
                [
                    "Text plugins",
                    "Fix header"
                ],
                null
            ],
            "100": [
                "FixLinkFragments",
                [
                    "Query plugins",
                    "Fix external section links"
                ],
                null
            ],
            "110": [
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
            "120": [
                "ArchWikiOldAURLinks",
                [
                    "Query plugins",
                    "Fix old AUR links"
                ],
                null
            ],
            "130": [
                "ArchWikiUpdatePackageTemplates",
                [
                    "Query plugins",
                    "Update package templates"
                ],
                null
            ],
            "20": [
                "ArchWikiFixHeadings",
                [
                    "Text plugins",
                    "Fix headings"
                ],
                null
            ],
            "30": [
                "ArchWikiFixLinks",
                [
                    "Text plugins",
                    "Fix external links"
                ],
                null
            ],
            "40": [
                "FixFragments",
                [
                    "Text plugins",
                    "Fix section links"
                ],
                null
            ],
            "50": [
                "ArchWikiNewTemplates",
                [
                    "Text plugins",
                    "Use code templates"
                ],
                null
            ],
            "60": [
                "ExpandContractions",
                [
                    "Text plugins",
                    "Expand contractions"
                ],
                null
            ],
            "70": [
                "MultipleLineBreaks",
                [
                    "Text plugins",
                    "Squash multiple line breaks"
                ],
                null
            ],
            "80": [
                "ArchWikiSummaryToRelated",
                [
                    "Text plugins",
                    "Convert summary to related"
                ],
                null
            ],
            "90": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ]
        },
        "NewPages": {
            "10": [
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
            "10": [
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
            "10": [
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
            "100": [
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
            "110": [
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
            "120": [
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
            "130": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Japanese"
                ],
                [
                    [
                        "ArchWiki",
                        "ja"
                    ],
                    "automatic update"
                ]
            ],
            "140": [
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
            "150": [
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
            "160": [
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
            "170": [
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
            "180": [
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
            "190": [
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
            "20": [
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
            "200": [
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
            "210": [
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
            "220": [
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
            "230": [
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
            "240": [
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
            "250": [
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
            "260": [
                "FixDoubleRedirects",
                [
                    "Fix double redirects"
                ],
                "fix double redirect"
            ],
            "270": [
                "ArchWikiSortContacts",
                [
                    "Sort Admins and Maintainers"
                ],
                [
                    [
                        "ArchWiki:Administrators",
                        "ArchWiki:Maintainers"
                    ],
                    [
                        "The following Administrators are currently inactive:",
                        "The following Maintainers are currently inactive:"
                    ],
                    "automatically sort list according to recent activity"
                ]
            ],
            "30": [
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
            "40": [
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
            "50": [
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
            "60": [
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
            "70": [
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
            "80": [
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
            "90": [
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
            ]
        }
    }
});
