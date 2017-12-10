wmsetup = require('./modules/_Init')

wmsetup(
    # Configuration files are generated automatically, don't keep them under
    # ./src/configurations/
    require("../build/configurations/Wikipedia-bot"),

    # The require paths can't be constructed dynamically, or browserify won't
    # understand and import them
    {
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
