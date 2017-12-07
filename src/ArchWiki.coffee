WM = require('./modules/_Init').WM

new WM(
    # Configuration files are generated automatically, don't keep them under
    # ./src/configurations/
    require("../build/configurations/ArchWiki-bot"),

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
    ['ArchWikiQuickReport',
        require("./plugins/ArchWikiQuickReport").ArchWikiQuickReport],
    ['ArchWikiSortContacts',
        require("./plugins/ArchWikiSortContacts").ArchWikiSortContacts],
    ['ArchWikiSummaryToRelated',
        require("./plugins/ArchWikiSummaryToRelated").ArchWikiSummaryToRelated],
    ['ArchWikiRCFilter',
        require("./plugins/ArchWikiRCFilter").ArchWikiRCFilter],
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
