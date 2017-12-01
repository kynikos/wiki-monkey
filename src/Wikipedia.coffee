WM = require('./modules/_Init').WM

new WM(
    # Configuration files are generated automatically, don't keep them under
    # ./src/configurations/
    require("../build/configurations/Wikipedia-bot"),

    # The require paths can't be constructed dynamically, or browserify won't
    # understand and import them
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
