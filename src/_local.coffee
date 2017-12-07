WM = require('./modules/_Init').WM

new WM(
    # Configuration files are generated automatically, don't keep them under
    # ./src/configurations/
    require("../build/configurations/_local"),

    # The require paths can't be constructed dynamically, or browserify won't
    # understand and import them
    ['ArchWikiFixHeader',
        require("./plugins/ArchWikiFixHeader").ArchWikiFixHeader],
    ['ArchWikiFixHeadings',
        require("./plugins/ArchWikiFixHeadings").ArchWikiFixHeadings],
    ['ArchWikiFixLinks',
        require("./plugins/ArchWikiFixLinks").ArchWikiFixLinks],
    ['ArchWikiNewTemplates',
        require("./plugins/ArchWikiNewTemplates").ArchWikiNewTemplates],
    ['ArchWikiNPFilter',
        require("./plugins/ArchWikiNPFilter").ArchWikiNPFilter],
    # The ArchPackages module is currently unusable
    # ['ArchWikiOldAURLinks',
    #     require("./plugins/ArchWikiOldAURLinks").ArchWikiOldAURLinks],
    ['ArchWikiQuickReport',
        require("./plugins/ArchWikiQuickReport").ArchWikiQuickReport],
    ['ArchWikiSaveTalk',
        require("./plugins/ArchWikiSaveTalk").ArchWikiSaveTalk],
    ['ArchWikiSortContacts',
        require("./plugins/ArchWikiSortContacts").ArchWikiSortContacts],
    ['ArchWikiSummaryToRelated',
        require("./plugins/ArchWikiSummaryToRelated").ArchWikiSummaryToRelated],
    ['ArchWikiRCFilter',
        require("./plugins/ArchWikiRCFilter").ArchWikiRCFilter],
    # The ArchPackages module is currently unusable
    # ['ArchWikiUpdatePackageTemplates',
    #     require("./plugins/ArchWikiUpdatePackageTemplates").ArchWikiUpdatePackageTemplates],
    ['ArchWikiWantedCategories',
        require("./plugins/ArchWikiWantedCategories").ArchWikiWantedCategories],
    ['DeletePages',
        require("./plugins/DeletePages").DeletePages],
    ['ExpandContractions',
        require("./plugins/ExpandContractions").ExpandContractions],
    ['FixBacklinkFragments',
        require("./plugins/FixBacklinkFragments").FixBacklinkFragments],
    ['FixDoubleRedirects',
        require("./plugins/FixDoubleRedirects").FixDoubleRedirects],
    ['FixFragments',
        require("./plugins/FixFragments").FixFragments],
    ['FixLinkFragments',
        require("./plugins/FixLinkFragments").FixLinkFragments],
    ['MultipleLineBreaks',
        require("./plugins/MultipleLineBreaks").MultipleLineBreaks],
    ['SimpleReplace',
        require("./plugins/SimpleReplace").SimpleReplace],
    ['SynchronizeInterlanguageLinks',
        require("./plugins/SynchronizeInterlanguageLinks").SynchronizeInterlanguageLinks],
    ['UpdateCategoryTree',
        require("./plugins/UpdateCategoryTree").UpdateCategoryTree],
)
