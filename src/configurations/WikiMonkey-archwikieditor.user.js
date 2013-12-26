// ==UserScript==
// @id wiki-monkey-archwikieditor
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 1.14.3-archwikieditor
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikieditor.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikieditor.user.js
// @icon https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/files/wiki-monkey.png
// @icon64 https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/files/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/js-aux-lib/1.4/src/Async.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.4/src/Compatibility.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.4/src/DOM.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.4/src/HTTP.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.4/src/Obj.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.4/src/RegEx.js
// @require https://raw.github.com/kynikos/js-aux-lib/1.4/src/Str.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/ArchPackages.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/Interlanguage.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/RecentChanges.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/modules/WhatLinksHere.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/ArchWikiFixHeader.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/ArchWikiFixHeadings.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/ArchWikiFixLinks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/ArchWikiOldAURLinks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/ArchWikiSummaryToRelated.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/ArchWikiUpdatePackageTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/FixFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/FixLinkFragments.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/SimpleReplace.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.14.3/src/plugins/SynchronizeInterlanguageLinks.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiFixHeader", "Fix header", null],
        ["ArchWikiFixHeadings", "Fix headings", null],
        ["ArchWikiFixLinks", "Fix external links", null],
        ["FixFragments", "Fix section links", null],
        ["ArchWikiNewTemplates", "Use code templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Squash multiple line breaks", null],
        ["ArchWikiSummaryToRelated", "Convert summary to related", null]
    ],
    [
        ["SimpleReplace", "RegExp substitution", ["1"]]
    ],
    [
        ["FixLinkFragments", "Fix external section links", null],
        ["SynchronizeInterlanguageLinks", "Sync interlanguage links",
         [function (title) {
             var detect = WM.ArchWiki.detectLanguage(title);
             var tag = WM.ArchWiki.getInterlanguageTag(detect[1]);
             // The language must correspond to a working interwiki tag
             return [tag, detect[0]];
         },
         WM.ArchWiki.getInterwikiLanguages()]],
        ["ArchWikiOldAURLinks", "Fix old AUR links", null],
        ["ArchWikiUpdatePackageTemplates", "Update package templates", null]
    ]
]);

WM.UI.setDiff(null);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setRecentChanges(null);

WM.UI.setSpecialList(null);

WM.main();
