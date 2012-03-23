// ==UserScript==
// @id wiki-monkey-dev-patrol
// @name Wiki Monkey
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.com>
// @version 15dev-patrol
// @description MediaWiki-compatible bot and editor assistant that runs in the browser
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL https://raw.github.com/kynikos/wiki-monkey/development/src/configurations/WikiMonkey-patrol.meta.js
// @icon http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey.png
// @icon64 http://cloud.github.com/downloads/kynikos/wiki-monkey/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/WikiMonkey.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Bot.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Cat.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Diff.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Editor.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/HTTP.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Log.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/MW.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/Tables.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/modules/UI.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/ExpandContractions.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/MultipleLineBreaks.js
// @require https://raw.github.com/kynikos/wiki-monkey/development/src/plugins/SimpleReplace.js
// ==/UserScript==

WM.UI.setEditor([
    [
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

WM.main();

// Temporary warning about the configuration name change
if (document.getElementById("WikiMonkey")) {
    var WMinterface = document.getElementById("WikiMonkey");
    var warning = document.createElement('p');
    warning.style.backgroundColor = 'orangered';
    warning.style.color = 'white';
    warning.style.fontWeight = 'bold';
    warning.style.padding = '0.4em';
    var span = document.createElement('span');
    span.innerHTML = 'Since Wiki Monkey 1.9.0, the "patrol" configuration has ';
    span.innerHTML += 'been renamed "archwikipatrol", because the name "patrol" ';
    span.innerHTML += 'will be used for a more generic configuration from now on. ';
    span.innerHTML += 'If you want to continue using the ArchWiki-specific ';
    span.innerHTML += 'tools you must:';
    warning.appendChild(span);
    var list = document.createElement('ol');
    var item = document.createElement('li');
    item.innerHTML = 'manually install ';
    item.innerHTML += '<a href="https://raw.github.com/kynikos/wiki-monkey/master/src/configurations/WikiMonkey-archwikipatrol.user.js">the "archwikipatrol" configuration</a>';
    list.appendChild(item);
    item = document.createElement('li');
    item.innerHTML = 'uninstall the current "patrol" configuration in Firefox\'s ';
    item.innerHTML += '"Add-ons Manager" -> "User Scripts"';
    list.appendChild(item);
    item = document.createElement('li');
    item.innerHTML = 're-enable the automatic updates for "archwikipatrol" if you were using them before';
    list.appendChild(item);
    warning.appendChild(list);
    var span = document.createElement('span');
    span.innerHTML = 'For more detailed installation instructions see ';
    span.innerHTML += '<a href="https://wiki.archlinux.org/index.php/Wiki_Monkey">this article</a>. ';
    span.innerHTML += 'Thank you, I apologize for the inconvenience.';
    warning.appendChild(span);
    WMinterface.insertBefore(warning, WMinterface.firstChild.nextSibling);
}
