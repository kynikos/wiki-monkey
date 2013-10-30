/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2013 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.Plugins.FixDoubleRedirects = new function () {
    this.main = function (args, callNext) {
        var summary = args;

        WM.Log.logInfo("Fixing double redirects...");

        WM.MW.getSpecialList("DoubleRedirects",
                             "namespaces",
                             WM.Plugins.FixDoubleRedirects.reverseResults,
                             [summary, callNext]);
    };

    this.reverseResults = function (results, siteinfo, args) {
        var summary = args[0];
        var callNext = args[1];

        var namespaces = siteinfo.namespaces;

        results.reverse();

        WM.Plugins.FixDoubleRedirects.iterateList(results, namespaces, [summary, callNext]);
    };

    this.iterateList = function (results, namespaces, args) {
        var summary = args[0];
        var callNext = args[1];

        var page = results.pop();

        if (page) {
            WM.MW.callQueryEdit(page.title,
                                WM.Plugins.FixDoubleRedirects.processPage,
                                [page, results, namespaces, summary, callNext]);
        }
        else {
            WM.Log.logInfo("Fixed double redirects");
            if (callNext) {
                callNext();
            }
        }
    };

    this.processPage = function (title, source, timestamp, edittoken, args) {
        var page = args[0];
        var results = args[1];
        var namespaces = args[2];
        var summary = args[3];
        var callNext = args[4];

        WM.Log.logInfo("Processing " + title + "...");

        var rawTarget = source.match(/\s*#redirect *[^\n]+/i);

        if (source.indexOf(rawTarget[0]) == 0) {
            var target = WM.Parser.findInternalLinks(rawTarget[0], null)[0];

            var targetEnd = target.index + target.length;
            var newTarget = "#REDIRECT [[" + ((namespaces[page.databaseResult.nsc]["*"]) ? WM.Parser.squashContiguousWhitespace(namespaces[page.databaseResult.nsc]["*"]) + ":" : "") + WM.Parser.squashContiguousWhitespace(page.databaseResult.tc) + "]]";
            var newtext = Alib.Str.overwriteFor(source, newTarget, 0, targetEnd);

            if (newtext != source) {
                WM.MW.callAPIPost({action: "edit",
                                   bot: "1",
                                   title: title,
                                   summary: summary,
                                   text: newtext,
                                   b1asetimestamp: timestamp,
                                   token: edittoken},
                                   null,
                                   WM.Plugins.FixDoubleRedirects.processPageEnd,
                                   [results, namespaces, summary, callNext]);
            }
            else {
                WM.Log.logWarning("Couldn't fix " + title);
                WM.Plugins.FixDoubleRedirects.iterateList(results, namespaces, [summary, callNext]);
            }
        }
        else {
            WM.Log.logWarning("Couldn't fix " + title);
            WM.Plugins.FixDoubleRedirects.iterateList(results, namespaces, [summary, callNext]);
        }
    };

    this.processPageEnd = function (res, args) {
        var results = args[0];
        var namespaces = args[1];
        var summary = args[2];
        var callNext = args[3];

        if (res.edit && res.edit.result == 'Success') {
            WM.Plugins.FixDoubleRedirects.iterateList(results, namespaces, [summary, callNext]);
        }
        else {
            WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };
};
