wmsetup = require('./modules/_Init')

wmsetup(
    "Wikipedia",

    # The require paths can't be constructed dynamically, or browserify won't
    # understand and import them
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
