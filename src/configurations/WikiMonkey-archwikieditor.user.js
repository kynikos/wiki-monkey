// ==UserScript==
// @id wiki-monkey-archwikieditor
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.10.1-archwikieditor
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikieditor.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikieditor.user.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/HTTP.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/plugins/ArchWikiFixHeader.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/plugins/ArchWikiFixHeadings.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.10.1/src/plugins/SimpleReplace.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiFixHeader", "Fix header", null],
        ["ArchWikiFixHeadings", "Fix headings", null],
        ["ArchWikiNewTemplates", "Use code templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Multiple line breaks", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ]
]);

WM.UI.setDiff(null);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setSpecialList(null);

WM.main();
