// ==UserScript==
// @id wiki-monkey-editor
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.com>
// @version 1.7.0-editor
// @description Perform automatic actions when editing wiki pages
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-editor.meta.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/modules/HTTP.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/plugins/ArchWikiNewTemplates.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/1.7.0/src/plugins/MultipleLineBreaks.js
// ==/UserScript==

WM.UI.setEditor([
    [
        ["ArchWikiNewTemplates", "Update templates", null],
        ["ExpandContractions", "Expand contractions", null],
        ["MultipleLineBreaks", "Multiple line breaks", null]
    ]
])

WM.UI.setDiff(null)

WM.UI.setWhatLinksHere(null)

WM.main()
