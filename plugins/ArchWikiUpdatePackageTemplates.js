/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2014 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.Plugins.ArchWikiUpdatePackageTemplates = new function () {
    "use strict";

    var doUpdate = function (source, call, callArgs) {
        // Note that findTemplatesPattern puts the pattern in a capturing group
        //   (parentheses) by itself
        var templates = WM.Parser.findTemplatesPattern(source,
                                                "[Pp]kg|[Aa]ur|AUR|[Gg]rp");
        var newText = "";

        if (templates.length > 0) {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue(source,
                                        newText, templates, 0, call, callArgs);
        }
        else {
            call(source, source, callArgs);
        }
    };

    this.doUpdateContinue = function (source, newText, templates, index, call,
                                                                    callArgs) {
        WM.Log.logInfo("Processing " + templates[index].rawTransclusion +
                                                                    " ...");

        newText += source.substring((
                                (index == 0) ? 0 : templates[index - 1].index +
                                templates[index - 1].length),
                                templates[index].index);

        switch (templates[index].title.toLowerCase()) {
            case 'pkg':
                WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(
                    // Checks must be in reversed order because they are popped
                    [WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup32lc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup32,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup64lc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup64,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAURlc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAUR,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficiallc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficial],
                    source, newText, templates, index, call, callArgs);
                break;
            case 'aur':
                WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(
                    // Checks must be in reversed order because they are popped
                    [WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup32lc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup32,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup64lc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup64,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficiallc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficial,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAURlc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAUR],
                    source, newText, templates, index, call, callArgs);
                break;
            case 'grp':
                WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(
                    // Checks must be in reversed order because they are popped
                    [WM.Plugins.ArchWikiUpdatePackageTemplates.checkAURlc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAUR,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficiallc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficial,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup32lc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup32,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup64lc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup64],
                    source, newText, templates, index, call, callArgs);
                break;
            default:
                newText += templates[index].rawTransclusion;
                WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(
                    source, newText, templates, index, call, callArgs);
        }
    };

    this.doUpdateContinue2 = function (checks, source, newText, templates,
                                                    index, call, callArgs) {
        var check = checks.pop();

        if (check) {
            check(checks, source, newText, templates, index, call, callArgs);
        }
        else {
            var pkg = templates[index].arguments[0].value.trim();
            WM.Log.logWarning(pkg +
                        " hasn't been found neither in the official " +
                        "repositories nor in the AUR nor as a package group");
            WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates",
                    {"error": "notfound",
                    "page": callArgs[0],
                    "pagelanguage": WM.ArchWiki.detectLanguage(callArgs[0])[1],
                    "package": pkg});

            newText += templates[index].rawTransclusion;

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
    };

    this.checkOfficial = function (checks, source, newText, templates, index,
                                                            call, callArgs) {
        var pkgname = templates[index].arguments[0].value.trim();
        WM.Log.logInfo("Looking for " + pkgname +
                                        " in the official repositories ...");

        WM.ArchPackages.isOfficialPackage(pkgname,
                  WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficial2,
                  [checks, source, newText, templates, index, call, callArgs]);
    };

    this.checkOfficiallc = function (checks, source, newText, templates, index,
                                                            call, callArgs) {
        var pkgname = templates[index].arguments[0].value.trim();

        if (pkgname.toLowerCase() != pkgname) {
            WM.Log.logInfo("Looking for " + pkgname.toLowerCase() +
                            " (lowercase) in the official repositories ...");

            WM.ArchPackages.isOfficialPackage(pkgname.toLowerCase(),
                  WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficiallc2,
                  [checks, source, newText, templates, index, call, callArgs]);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkAUR = function (checks, source, newText, templates, index, call,
                                                                    callArgs) {
        var pkgname = templates[index].arguments[0].value.trim();
        WM.Log.logInfo("Looking for " + pkgname + " in the AUR ...");

        WM.ArchPackages.isAURPackage(pkgname,
                 WM.Plugins.ArchWikiUpdatePackageTemplates.checkAUR2,
                 [checks, source, newText, templates, index, call, callArgs]);
    };

    this.checkAURlc = function (checks, source, newText, templates, index,
                                                            call, callArgs) {
        var pkgname = templates[index].arguments[0].value.trim();

        if (pkgname.toLowerCase() != pkgname) {
            WM.Log.logInfo("Looking for " + pkgname.toLowerCase() +
                                                " (lowercase) in the AUR ...");

            WM.ArchPackages.isAURPackage(pkgname.toLowerCase(),
                 WM.Plugins.ArchWikiUpdatePackageTemplates.checkAURlc2,
                 [checks, source, newText, templates, index, call, callArgs]);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkGroup64 = function (checks, source, newText, templates, index,
                                                            call, callArgs) {
        var grpname = templates[index].arguments[0].value.trim();
        WM.Log.logInfo("Looking for " + grpname +
                                            " as an x86_64 package group ...");

        WM.ArchPackages.isPackageGroup64(grpname,
                  WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup64_2,
                  [checks, source, newText, templates, index, call, callArgs]);
    };

    this.checkGroup64lc = function (checks, source, newText, templates, index,
                                                            call, callArgs) {
        var grpname = templates[index].arguments[0].value.trim();

        if (grpname.toLowerCase() != grpname) {
            WM.Log.logInfo("Looking for " + grpname.toLowerCase() +
                                " (lowercase) as an x86_64 package group ...");

            WM.ArchPackages.isPackageGroup64(grpname.toLowerCase(),
                  WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup64lc2,
                  [checks, source, newText, templates, index, call, callArgs]);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkGroup32 = function (checks, source, newText, templates, index,
                                                            call, callArgs) {
        var grpname = templates[index].arguments[0].value.trim();
        WM.Log.logInfo("Looking for " + grpname +
                                            " as an i686 package group ...");

        WM.ArchPackages.isPackageGroup32(grpname,
                  WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup32_2,
                  [checks, source, newText, templates, index, call, callArgs]);
    };

    this.checkGroup32lc = function (checks, source, newText, templates, index,
                                                            call, callArgs) {
        var grpname = templates[index].arguments[0].value.trim();

        if (grpname.toLowerCase() != grpname) {
            WM.Log.logInfo("Looking for " + grpname.toLowerCase() +
                                " (lowercase) as an i686 package group ...");

            WM.ArchPackages.isPackageGroup32(grpname.toLowerCase(),
                  WM.Plugins.ArchWikiUpdatePackageTemplates.checkGroup32lc2,
                  [checks, source, newText, templates, index, call, callArgs]);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkOfficial2 = function (res, args) {
        var checks = args[0];
        var source = args[1];
        var newText = args[2];
        var templates = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        var template = templates[index];
        var pkgname = template.arguments[0].value.trim();

        if (res) {
            if (template.title.toLowerCase() != 'pkg') {
                var newtemplate = "{{Pkg|" + pkgname + "}}";
                newText += newtemplate;
                WM.Log.logInfo("Replacing template with " + newtemplate);
            }
            else {
                newText += template.rawTransclusion;
            }

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkOfficiallc2 = function (res, args) {
        var checks = args[0];
        var source = args[1];
        var newText = args[2];
        var templates = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        var template = templates[index];
        var pkgname = template.arguments[0].value.trim();

        if (res) {
            var newtemplate = "{{Pkg|" + pkgname.toLowerCase() + "}}";
            newText += newtemplate;
            WM.Log.logInfo("Replacing template with " + newtemplate);

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkAUR2 = function (res, args) {
        var checks = args[0];
        var source = args[1];
        var newText = args[2];
        var templates = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        var template = templates[index];
        var pkgname = template.arguments[0].value.trim();

        if (res) {
            if (template.title.toLowerCase() != 'aur') {
                var newtemplate = "{{AUR|" + pkgname + "}}";
                newText += newtemplate;
                WM.Log.logInfo("Replacing template with " + newtemplate);
            }
            else {
                newText += template.rawTransclusion;
            }

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkAURlc2 = function (res, args) {
        var checks = args[0];
        var source = args[1];
        var newText = args[2];
        var templates = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        var template = templates[index];
        var pkgname = template.arguments[0].value.trim();

        if (res) {
            var newtemplate = "{{AUR|" + pkgname.toLowerCase() + "}}";
            newText += newtemplate;
            WM.Log.logInfo("Replacing template with " + newtemplate);

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkGroup64_2 = function (res, args) {
        var checks = args[0];
        var source = args[1];
        var newText = args[2];
        var templates = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        var template = templates[index];
        var grpname = template.arguments[0].value.trim();

        if (res) {
            if (template.title.toLowerCase() != 'grp') {
                var newtemplate = "{{Grp|" + grpname + "}}";
                newText += newtemplate;
                WM.Log.logInfo("Replacing template with " + newtemplate);
            }
            else {
                newText += template.rawTransclusion;
            }

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkGroup64lc2 = function (res, args) {
        var checks = args[0];
        var source = args[1];
        var newText = args[2];
        var templates = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        var template = templates[index];
        var grpname = template.arguments[0].value.trim();

        if (res) {
            var newtemplate = "{{Grp|" + grpname.toLowerCase() + "}}";
            newText += newtemplate;
            WM.Log.logInfo("Replacing template with " + newtemplate);

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkGroup32_2 = function (res, args) {
        var checks = args[0];
        var source = args[1];
        var newText = args[2];
        var templates = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        var template = templates[index];
        var grpname = template.arguments[0].value.trim();

        if (res) {
            newText += template.rawTransclusion;
            WM.Log.logWarning(grpname + " is a package group for i686 only, " +
                                    "and Template:Grp only supports x86_64");
            WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates",
                    {"error": "group64",
                    "page": callArgs[0],
                    "pagelanguage": WM.ArchWiki.detectLanguage(callArgs[0])[1],
                    "package": grpname});
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.checkGroup32lc2 = function (res, args) {
        var checks = args[0];
        var source = args[1];
        var newText = args[2];
        var templates = args[3];
        var index = args[4];
        var call = args[5];
        var callArgs = args[6];

        var template = templates[index];
        var grpname = template.arguments[0].value.trim();

        if (res) {
            newText += template.rawTransclusion;
            WM.Log.logWarning(grpname + " is a package group for i686 only, " +
                                    "and Template:Grp only supports x86_64");
            WM.Log.logJson("Plugins.ArchWikiUpdatePackageTemplates",
                    {"error": "group64",
                    "page": callArgs[0],
                    "pagelanguage": WM.ArchWiki.detectLanguage(callArgs[0])[1],
                    "package": grpname});
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks,
                            source, newText, templates, index, call, callArgs);
        }
    };

    this.doUpdateContinue3 = function (source, newText, templates, index, call,
                                                                    callArgs) {
        index++;

        if (templates[index]) {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue(source,
                                    newText, templates, index, call, callArgs);
        }
        else {
            newText += source.substring(templates[index - 1].index +
                                                templates[index - 1].length);
            call(source, newText, callArgs);
        }
    };

    this.main = function (args, callNext) {
        var title = WM.Editor.getTitle();
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Updating package templates ...");
        doUpdate(source, WM.Plugins.ArchWikiUpdatePackageTemplates.mainEnd,
                                                            [title, callNext]);
    };

    this.mainEnd = function (source, newtext, args) {
        var callNext = args[1];

        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Updated package templates");
        }
        else {
            WM.Log.logInfo("No automatically updatable package templates " +
                                                                    "found");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var summary = args;

        WM.MW.callQueryEdit(title,
                    WM.Plugins.ArchWikiUpdatePackageTemplates.mainAutoReplace,
                    [summary, callBot]);
    };

    this.mainAutoReplace = function (title, source, timestamp, edittoken,
                                                                        args) {
        var summary = args[0];
        var callBot = args[1];

        doUpdate(source,
                  WM.Plugins.ArchWikiUpdatePackageTemplates.mainAutoWrite,
                  [title, edittoken, timestamp, summary, callBot]);
    };

    this.mainAutoWrite = function (source, newtext, args) {
        var title = args[0];
        var edittoken = args[1];
        var timestamp = args[2];
        var summary = args[3];
        var callBot = args[4];

        if (newtext != source) {
            WM.MW.callAPIPost({action: "edit",
                       bot: "1",
                       title: title,
                       summary: summary,
                       text: newtext,
                       basetimestamp: timestamp,
                       token: edittoken},
                       null,
                       WM.Plugins.ArchWikiUpdatePackageTemplates.mainAutoEnd,
                       callBot);
        }
        else {
            callBot(0, null);
        }
    };

    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(1, null);
        }
        else if (res.error) {
            WM.Log.logError(res.error.info + " (" + res.error.code + ")");
            callBot(res.error.code, null);
        }
        else {
            callBot(false, null);
        }
    };
};
