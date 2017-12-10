wmsetup = require('./modules/_Init')

wmsetup(
    # Configuration files are generated automatically, don't keep them under
    # ./src/configurations/
    require("../build/configurations/ArchWiki-bot"),

    # The require paths can't be constructed dynamically, or browserify won't
    # understand and import them
    {
        ArchWikiFixHeader: require("./plugins/ArchWikiFixHeader")
        ArchWikiFixHeadings: require("./plugins/ArchWikiFixHeadings")
        ArchWikiFixLinks: require("./plugins/ArchWikiFixLinks")
        ArchWikiNewTemplates: require("./plugins/ArchWikiNewTemplates")
        ArchWikiNPFilter: require("./plugins/ArchWikiNPFilter")
        ArchWikiQuickReport: require("./plugins/ArchWikiQuickReport")
        ArchWikiSortContacts: require("./plugins/ArchWikiSortContacts")
        ArchWikiSummaryToRelated: require("./plugins/ArchWikiSummaryToRelated")
        ArchWikiRCFilter: require("./plugins/ArchWikiRCFilter")
        ExpandContractions: require("./plugins/ExpandContractions")
        FixBacklinkFragments: require("./plugins/FixBacklinkFragments")
        FixDoubleRedirects: require("./plugins/FixDoubleRedirects")
        FixFragments: require("./plugins/FixFragments")
        FixLinkFragments: require("./plugins/FixLinkFragments")
        MultipleLineBreaks: require("./plugins/MultipleLineBreaks")
        SimpleReplace: require("./plugins/SimpleReplace")
        SynchronizeInterlanguageLinks: require("./plugins/SynchronizeInterlanguageLinks")
        UpdateCategoryTree: require("./plugins/UpdateCategoryTree")
    },
)
