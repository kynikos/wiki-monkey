// Generated by CoffeeScript 1.12.2
var WM, WM_;

WM_ = require('./modules/_Init').WM;

WM = new WM_(['ExpandContractions', require("./plugins/ExpandContractions").ExpandContractions], ['FixBacklinkFragments', require("./plugins/FixBacklinkFragments").FixBacklinkFragments], ['FixDoubleRedirects', require("./plugins/FixDoubleRedirects").FixDoubleRedirects], ['FixFragments', require("./plugins/FixFragments").FixFragments], ['FixLinkFragments', require("./plugins/FixLinkFragments").FixLinkFragments], ['MultipleLineBreaks', require("./plugins/MultipleLineBreaks").MultipleLineBreaks], ['SimpleReplace', require("./plugins/SimpleReplace").SimpleReplace], ['SynchronizeInterlanguageLinks', require("./plugins/SynchronizeInterlanguageLinks").SynchronizeInterlanguageLinks], ['UpdateCategoryTree', require("./plugins/UpdateCategoryTree").UpdateCategoryTree]);

WM.main(require("../build/configurations/Wikipedia-bot"));
