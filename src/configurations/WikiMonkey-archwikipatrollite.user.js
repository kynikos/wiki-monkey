// ==UserScript==
// @id wiki-monkey-archwikipatrollite
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.11.1-archwikipatrollite
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrollite.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrollite.user.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/Async.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/Compatibility.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/HTTP.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/Obj.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/RegEx.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.1/src/plugins/ArchWikiQuickReport.js
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

WM.UI.setSpecialList(null);

WM.main();
