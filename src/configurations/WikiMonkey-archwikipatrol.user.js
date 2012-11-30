// ==UserScript==
// @id wiki-monkey-archwikipatrol
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.11.2-archwikipatrol
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrol.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrol.user.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/Async.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/Compatibility.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/HTTP.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/Obj.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/RegEx.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.0/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/ArchWikiFixHeader.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/ArchWikiFixHeadings.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/ArchWikiOldAURLinks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/SimpleReplace.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.11.2/src/plugins/SynchronizeInterlanguageLinks.js
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
    ],
    [
        ["SynchronizeInterlanguageLinks", "Sync interlanguage links",
         [function (title) {
             var language = WM.ArchWiki.detectLanguage(title)[1];
            // The language must correspond to a working interwiki tag
             return WM.ArchWiki.getInterlanguageTag(language);
         },
         WM.ArchWiki.getInterwikiLanguages()]],
        ["ArchWikiOldAURLinks", "Fix old AUR links", null]
    ]
]);

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
