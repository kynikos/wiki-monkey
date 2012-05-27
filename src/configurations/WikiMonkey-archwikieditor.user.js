// ==UserScript==
// @id wiki-monkey-archwikieditor
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version development-archwikieditor
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/WikiMonkey-archwikieditor.meta.js
// @downloadURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/WikiMonkey-archwikieditor.user.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/Async.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/Compatibility.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/HTTP.js
// @require https://raw.github.com/kynikos/js-aux-lib/master/src/RegEx.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/ArchWiki.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Parser.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiFixHeader.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiFixHeadings.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ArchWikiTemplateAUR.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/SimpleReplace.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/SynchronizeInterlanguageLinks.js
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
         [function () {
             var title = WM.Editor.getTitle();
             var language = WM.ArchWiki.detectLanguage(title)[1];
             return WM.ArchWiki.getInterlanguageTag(language);
         },
         WM.ArchWiki.getAliveInterwikiLanguages()]
        ],
        ["ArchWikiTemplateAUR", "Use Template:AUR", null]
    ]
]);

WM.UI.setDiff(null);

WM.UI.setCategory(null);

WM.UI.setWhatLinksHere(null);

WM.UI.setLinkSearch(null);

WM.UI.setSpecial(null);

WM.UI.setSpecialList(null);

WM.main();
