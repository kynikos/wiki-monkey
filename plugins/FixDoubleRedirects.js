/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2015 Dario Giovannetti <dev@dariogiovannetti.net>
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
    "use strict";

    this.main = function (args, callNext) {
        var summary = args;

        WM.Log.logInfo("Fixing double redirects ...");

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

        WM.Plugins.FixDoubleRedirects.iterateList(results, namespaces,
                                                        [summary, callNext]);
    };

    this.iterateList = function (doubleRedirects, namespaces, args) {
        var summary = args[0];
        var callNext = args[1];

        var doubleRedirect = doubleRedirects.pop();

        if (doubleRedirect) {
            WM.MW.callQueryEdit(doubleRedirect.title,
                            WM.Plugins.FixDoubleRedirects.readMiddleRedirect,
                            [doubleRedirect, doubleRedirects, namespaces,
                             summary, callNext]);
        }
        else {
            WM.Log.logInfo("Fixed double redirects");
            if (callNext) {
                callNext();
            }
        }
    };

    this.readMiddleRedirect = function (doubleRedirectTitle,
                            doubleRedirectSource, timestamp, edittoken, args) {
        var doubleRedirect = args[0];
        var doubleRedirects = args[1];
        var namespaces = args[2];
        var summary = args[3];
        var callNext = args[4];
        var middleRedirectTitle = namespaces[
                                doubleRedirect.databaseResult.nsb]['*'] + ':' +
                                doubleRedirect.databaseResult.tb;

        WM.MW.callQuery({prop: "revisions",
                         rvprop: "content",
                         titles: middleRedirectTitle},
                         WM.Plugins.FixDoubleRedirects.processDoubleRedirect,
                         [doubleRedirect, doubleRedirectTitle,
                          doubleRedirectSource, timestamp, edittoken,
                          doubleRedirects, namespaces, summary, callNext]);
    };

    this.processDoubleRedirect = function (middleRedirect, args) {
        var middleRedirectSource = middleRedirect.revisions[0]["*"];
        var doubleRedirect = args[0];
        var doubleRedirectTitle = args[1];
        var doubleRedirectSource = args[2];
        var timestamp = args[3];
        var edittoken = args[4];
        var doubleRedirects = args[5];
        var namespaces = args[6];
        var summary = args[7];
        var callNext = args[8];

        WM.Log.logInfo("Processing " + WM.Log.linkToWikiPage(
                        doubleRedirectTitle, doubleRedirectTitle) + " ...");

        var rawOldTarget = doubleRedirectSource.match(/\s*#redirect *[^\n]+/i);
        var oldTarget = WM.Parser.findInternalLinks(rawOldTarget[0], null)[0];

        var rawMiddleTarget = middleRedirectSource.match(
                                                    /\s*#redirect *[^\n]+/i);
        var middleTarget = WM.Parser.findInternalLinks(rawMiddleTarget[0],
                                                                    null)[0];

        if (oldTarget.fragment) {
            var newTargetFragment = "#" + oldTarget.fragment;
        }
        else if (middleTarget.fragment) {
            var newTargetFragment = "#" + middleTarget.fragment;
        }
        else {
            var newTargetFragment = "";
        }

        if (oldTarget.anchor) {
            var newTargetAltAnchor = "|" + oldTarget.anchor;
        }
        else if (middleTarget.anchor) {
            var newTargetAltAnchor = "|" + middleTarget.anchor;
        }
        else {
            var newTargetAltAnchor = "";
        }

        var newTargetInterlanguage = (doubleRedirect.databaseResult.iwc) ?
                                doubleRedirect.databaseResult.iwc + ":" : "";
        var newTargetNamespace = (namespaces[
                                doubleRedirect.databaseResult.nsc]["*"]) ?
                                WM.Parser.squashContiguousWhitespace(
                                namespaces[doubleRedirect.databaseResult.nsc][
                                "*"]) + ":" : "";
        var newTargetTitle = WM.Parser.squashContiguousWhitespace(
                                            doubleRedirect.databaseResult.tc);

        var newTarget = "[[" + newTargetInterlanguage +
                        newTargetNamespace + newTargetTitle +
                        newTargetFragment + newTargetAltAnchor + "]]";
        var newText = Alib.Str.overwriteFor(doubleRedirectSource, newTarget,
                                            oldTarget.index, oldTarget.length);

        if (newText != doubleRedirectSource) {
            WM.MW.callAPIPost(
                    {action: "edit",
                     bot: "1",
                     title: doubleRedirectTitle,
                     summary: summary,
                     text: newText,
                     b1asetimestamp: timestamp,
                     token: edittoken},
                    null,
                    WM.Plugins.FixDoubleRedirects.processDoubleRedirectEnd,
                    [doubleRedirects, namespaces, summary, callNext]);
        }
        else {
            WM.Log.logWarning("Could not fix " +
                                WM.Log.linkToWikiPage(doubleRedirectTitle,
                                doubleRedirectTitle));
            WM.Plugins.FixDoubleRedirects.iterateList(doubleRedirects,
                                        namespaces, [summary, callNext]);
        }
    };

    this.processDoubleRedirectEnd = function (res, args) {
        var doubleRedirects = args[0];
        var namespaces = args[1];
        var summary = args[2];
        var callNext = args[3];

        if (res.edit && res.edit.result == 'Success') {
            WM.Plugins.FixDoubleRedirects.iterateList(doubleRedirects,
                                            namespaces, [summary, callNext]);
        }
        else {
            WM.Log.logError(res['error']['info'] +
                                            " (" + res['error']['code'] + ")");
        }
    };
};
