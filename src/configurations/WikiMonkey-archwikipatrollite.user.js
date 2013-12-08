// ==UserScript==
// @id wiki-monkey-archwikipatrollite
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.14.0-archwikipatrollite
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrollite.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrollite.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/files/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/js-aux-lib/1.3/src/Async.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.3/src/Compatibility.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.3/src/DOM.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.3/src/HTTP.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.3/src/Obj.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.3/src/RegEx.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.3/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/ArchPackages.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/RecentChanges.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/modules/WhatLinksHere.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/plugins/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.0/src/plugins/ArchWikiRCFilter.js
// ==/UserScript==

WM.UI.setEditor(null);

WM.UI.setDiff([
    [
        ["ArchWikiQuickReport", "Quick report",
         ["1", "ArchWiki:Reports", "add report"]]
    ]
]);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

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

WM.UI.setSpecialList(null);

WM.main();
