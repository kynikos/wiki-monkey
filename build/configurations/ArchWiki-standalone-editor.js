module.exports = {
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
                null,
                null
            ],
            "020BL": [
                "FixBacklinkFragments",
                null,
                "fix links to specific sections"
            ],
            "030IL": [
                "SynchronizeInterlanguageLinks",
                null,
                [
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    "synchronized interlanguage links with the other wikis"
                ]
            ],
            "040APT": [
                "ArchWikiUpdatePackageTemplates",
                null,
                "update Pkg/AUR templates to reflect new package status"
            ],
            "050AAL": [
                "ArchWikiOldAURLinks",
                null,
                "replace old-style direct package links with Pkg/AUR templates"
            ]
        },
        "Diff": {
            "010AQR": [
                "ArchWikiQuickReport",
                null,
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
                null,
                null
            ],
            "240APT": [
                "ArchWikiUpdatePackageTemplates",
                null,
                null
            ]
        },
        "NewPages": {
            "010ANP": [
                "ArchWikiNPFilter",
                null,
                {
                    "language": "English"
                }
            ]
        },
        "RecentChanges": {
            "010ARC": [
                "ArchWikiRCFilter",
                null,
                {
                    "language": "English"
                }
            ]
        },
        "Special": {
            "010CTar": [
                "UpdateCategoryTree",
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
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
                null,
                "fix double redirect"
            ],
            "040ASCC": [
                "ArchWikiSortContacts",
                null,
                null
            ]
        }
    }
};