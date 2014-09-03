// ==UserScript==
// @id wiki-monkey-bot
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.16.0-dev-bot
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/develop/src/configurations/WikiMonkey-bot.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/develop/src/configurations/WikiMonkey-bot.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/develop/src/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/develop/src/files/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Async.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Compatibility.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/CSS.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/DOM.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/HTTP.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Obj.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/RegEx.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Filters.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/modules/WhatLinksHere.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/FixBacklinkFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/FixDoubleRedirects.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/FixFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/FixLinkFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/SimpleReplace.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/src/plugins/UpdateCategoryTree.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["FixFragments", "Fix section links", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Squash multiple line breaks", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ],
    [
        ["FixLinkFragments", "Fix external section links", null]
    ]
]);

WM.UI.setDiff(null);

WM.UI.setSpecial([
    [
        ["UpdateCategoryTree", "Update category tree",
         [{}, "automatic update"]]
    ],
    [
        ["FixDoubleRedirects", "Fix double redirects", "fix double redirect"]
    ]
]);

WM.UI.setRecentChanges(null);

WM.UI.setNewPages(null);

WM.UI.setBot([
    ["SimpleReplace", "RegExp substitution", ["1"]],
    ["FixBacklinkFragments",
                        "Fix links to specific sections of a target page",
                        "fix links to specific sections"]
]);

WM.main();
