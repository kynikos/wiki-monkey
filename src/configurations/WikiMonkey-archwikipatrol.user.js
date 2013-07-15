// ==UserScript==
// @id wiki-monkey-archwikipatrol
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.12.0-archwikipatrol
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrol.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrol.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/files/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/js-aux-lib/1.1/src/Async.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.1/src/Compatibility.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.1/src/DOM.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.1/src/HTTP.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.1/src/Obj.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.1/src/RegEx.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.1/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/RecentChanges.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/ArchWikiFixHeader.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/ArchWikiFixHeadings.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/ArchWikiFixLinks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/ArchWikiQuickReport.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/ArchWikiRCFilter.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/ArchWikiOldAURLinks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/SimpleReplace.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.12.0/src/plugins/SynchronizeInterlanguageLinks.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiFixHeader", "Fix header", null],
        ["ArchWikiFixHeadings", "Fix headings", null],
        ["ArchWikiFixLinks", "Fix links", null],
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
