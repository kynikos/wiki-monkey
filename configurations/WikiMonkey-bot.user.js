// ==UserScript==
// @id wiki-monkey-bot
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.16.1-dev-bot
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/develop/configurations/WikiMonkey-bot.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/develop/configurations/WikiMonkey-bot.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/develop/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/develop/auxiliary/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.3.min.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Async.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Compatibility.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/CSS.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/DOM.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/HTTP.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Obj.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/RegEx.js
// @require https://raw.github.com/kynikos/lib.js.generic/master/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Cfg.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Filters.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/WhatLinksHere.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/FixBacklinkFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/FixDoubleRedirects.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/FixFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/FixLinkFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/SimpleReplace.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/UpdateCategoryTree.js
// ==/UserScript==

WM.main({
    "Editor": [
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
    ],
    "Diff": null,
    "Special": [
        [
            ["UpdateCategoryTree", "Update category tree",
             [{}, "automatic update"]]
        ],
        [
            ["FixDoubleRedirects", "Fix double redirects",
                                                        "fix double redirect"]
        ]
    ],
    "RecentChanges": null,
    "NewPages": null,
    "Bot": [
        ["SimpleReplace", "RegExp substitution", ["1"]],
        ["FixBacklinkFragments",
                            "Fix links to specific sections of a target page",
                            "fix links to specific sections"]
    ]
});
