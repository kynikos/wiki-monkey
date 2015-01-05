// ==UserScript==
// @id wiki-monkey-archwikipatrollite
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.16.1-dev-archwikipatrollite
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/develop/configurations/WikiMonkey-archwikipatrollite.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/develop/configurations/WikiMonkey-archwikipatrollite.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/develop/auxiliary/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/develop/auxiliary/wiki-monkey-64.png
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
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/ArchPackages.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/modules/Cat.js
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
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiNPFilter.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/develop/plugins/ArchWikiRCFilter.js
// ==/UserScript==

WM.UI.setEditor(null);

WM.UI.setDiff([
    [
        ["ArchWikiQuickReport", "Quick report",
         ["1", "ArchWiki:Reports", "add report"]]
    ]
]);

WM.UI.setSpecial(null);

WM.UI.setRecentChanges([
    [
        "ArchWikiRCFilter",
        "Default filter",
        {
            language: "English",
        }
    ]
]);

WM.UI.setNewPages([
    [
        "ArchWikiNPFilter",
        "Default filter",
        {
            language: "English",
        }
    ]
]);

WM.UI.setBot(null);

WM.main();
