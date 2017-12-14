wmsetup = require('./modules/_Init')

wmsetup(
    "ArchWiki",

    # The require paths can't be constructed dynamically, or browserify won't
    # understand and import them
    require("./plugins/ArchWikiFixHeader"),
    require("./plugins/ArchWikiFixHeadings"),
    require("./plugins/ArchWikiFixLinks"),
    require("./plugins/ArchWikiNewTemplates"),
    require("./plugins/ArchWikiNPFilter"),
    # The ArchPackages module is currently unusable
    #require("./plugins/ArchWikiOldAURLinks"),
    require("./plugins/ArchWikiQuickReport"),
    require("./plugins/ArchWikiSaveTalk"),
    require("./plugins/ArchWikiSortContacts"),
    require("./plugins/ArchWikiSummaryToRelated"),
    require("./plugins/ArchWikiRCFilter"),
    # The ArchPackages module is currently unusable
    #require("./plugins/ArchWikiUpdatePackageTemplates"),
    require("./plugins/ArchWikiWantedCategories"),
    require("./plugins/DeletePages"),
    require("./plugins/ExpandContractions"),
    require("./plugins/FixBacklinkFragments"),
    require("./plugins/FixDoubleRedirects"),
    require("./plugins/FixFragments"),
    require("./plugins/FixLinkFragments"),
    require("./plugins/MultipleLineBreaks"),
    require("./plugins/SimpleReplace"),
    require("./plugins/SynchronizeInterlanguageLinks"),
    require("./plugins/UpdateCategoryTree"),
)
