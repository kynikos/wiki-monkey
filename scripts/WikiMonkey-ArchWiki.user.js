// ==UserScript==
// @id wiki-monkey-archwiki
// @name Wiki Monkey (ArchWiki)
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 2.0.8-archwiki
// @description MediaWiki-compatible bot and editor assistant that runs in the browser (ArchWiki version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/scripts/WikiMonkey-ArchWiki.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/scripts/WikiMonkey-ArchWiki.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/2.0.8/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/2.0.8/auxiliary/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.3.min.js
// @require https://raw.github.com/kynikos/wiki-monkey/2.0.8/scripts/WikiMonkey-ArchWiki.include.js
// ==/UserScript==

if (sessionStorage.getItem('WikiMonkey-deprecation-message') != 'hidden') {
    $('<div>')
        .css({'display': 'none',
              'width': '100%',
              'background-color': '#e7a526',
              'text-align': 'center',
              'line-height': 2})
        .append('The latest release of Wiki Monkey needs to be installed manually: follow ',
                $('<a>')
                    .attr('href', 'https://github.com/kynikos/wiki-monkey/wiki/Getting-started')
                    .text('this link'),
                ' for instructions. Alternatively, ',
                $('<a>')
                    .attr('href', '#')
                    .text('hide')
                    .click(function (event) {
                        $(event.currentTarget).parent().slideUp();
                        sessionStorage.setItem('WikiMonkey-deprecation-message',
                                               'hidden');
                        return false;
                    }),
                ' this message for this session.')
        .prependTo('body')
        .slideDown();
}

WM.main({
    "Mods": {
        "Contributions": {
            "hide_rollback_links": true
        },
        "Editor": {
            "disable_edit_summary_submit_on_enter": true,
            "scroll_to_first_heading": false
        },
        "General": {
            "heading_number_style": false
        },
        "RecentChanges": {
            "hide_rollback_links": true
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
                    "add report for %t"
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
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
                    "automatic update",
                    false
                ]
            ],
            "020DR": [
                "FixDoubleRedirects",
                [
                    "Fix double redirects"
                ],
                "fix double redirect"
            ],
            "040ASCC": [
                "ArchWikiSortContacts",
                null,
                null
            ]
        }
    }
});
