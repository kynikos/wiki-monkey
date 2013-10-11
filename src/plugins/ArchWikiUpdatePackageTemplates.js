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

WM.Plugins.ArchWikiUpdatePackageTemplates = new function () {
    var doUpdate = function (source, call, callArgs) {
        // Note that findTemplatesPattern puts the pattern in a capturing group (parentheses) by itself
        var templates = WM.Parser.findTemplatesPattern(source, "[Pp]kg|[Aa]ur|AUR");
        var newText = "";

        if (templates.length > 0) {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue(source, newText, templates, 0, call, callArgs);
        }
        else {
            call(source, source, callArgs);
        }
    };

    this.doUpdateContinue = function (source, newText, templates, index, call, callArgs) {
        WM.Log.logInfo("Processing " + templates[index].match[0] + "...");

        newText += source.substring(((index == 0) ? 0 : templates[index - 1].index + templates[index - 1].length),
                                    templates[index].index);

        switch (templates[index].title.toLowerCase()) {
            case 'pkg':
                WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(
                    // Checks must be in reversed order because they are popped
                    [WM.Plugins.ArchWikiUpdatePackageTemplates.checkAURlc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAUR,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficiallc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficial],
                    source, newText, templates, index, call, callArgs);
                break;
            case 'aur':
                WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(
                    // Checks must be in reversed order because they are popped
                    [WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficiallc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficial,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAURlc,
                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAUR],
                    source, newText, templates, index, call, callArgs);
                break;
            default:
                newText += templates[index].match[0];
                WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(
                    source, newText, templates, index, call, callArgs);
        }
    };

    this.doUpdateContinue2 = function (checks, source, newText, templates, index, call, callArgs) {
        var check = checks.pop();

        if (check) {
            check(checks, source, newText, templates, index, call, callArgs);
        }
        else {
            WM.Log.logWarning(templates[index].arguments[0].value.trim() + " hasn't been found neither in the official repositories nor in the AUR");

            newText += templates[index].match[0];

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source, newText, templates, index, call, callArgs);
        }
    };

    this.checkOfficial = function (checks, source, newText, templates, index, call, callArgs) {
        var pkgname = templates[index].arguments[0].value.trim();
        WM.Log.logInfo("Looking for " + pkgname + " in the official repositories...");

        WM.ArchPackages.isOfficialPackage(pkgname,
                                          WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficial2,
                                          [checks, source, newText, templates, index, call, callArgs]);
    };

    this.checkOfficiallc = function (checks, source, newText, templates, index, call, callArgs) {
        var pkgname = templates[index].arguments[0].value.trim();

        if (pkgname.toLowerCase() != pkgname) {
            WM.Log.logInfo("Looking for " + pkgname.toLowerCase() + " (lowercase) in the official repositories...");

            WM.ArchPackages.isOfficialPackage(pkgname.toLowerCase(),
                                              WM.Plugins.ArchWikiUpdatePackageTemplates.checkOfficiallc2,
                                              [checks, source, newText, templates, index, call, callArgs]);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
        }
    };

    this.checkAUR = function (checks, source, newText, templates, index, call, callArgs) {
        var pkgname = templates[index].arguments[0].value.trim();
        WM.Log.logInfo("Looking for " + pkgname + " in the AUR...");

        WM.ArchPackages.isAURPackage(pkgname,
                                     WM.Plugins.ArchWikiUpdatePackageTemplates.checkAUR2,
                                     [checks, source, newText, templates, index, call, callArgs]);
    };

    this.checkAURlc = function (checks, source, newText, templates, index, call, callArgs) {
        var pkgname = templates[index].arguments[0].value.trim();

        if (pkgname.toLowerCase() != pkgname) {
            WM.Log.logInfo("Looking for " + pkgname.toLowerCase() + " (lowercase) in the AUR...");

            WM.ArchPackages.isAURPackage(pkgname.toLowerCase(),
                                         WM.Plugins.ArchWikiUpdatePackageTemplates.checkAURlc2,
                                         [checks, source, newText, templates, index, call, callArgs]);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
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
                newText += template.match[0];
            }

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source, newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
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

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source, newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
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
                newText += template.match[0];
            }

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source, newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
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

            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue3(source, newText, templates, index, call, callArgs);
        }
        else {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue2(checks, source, newText, templates, index, call, callArgs);
        }
    };

    this.doUpdateContinue3 = function (source, newText, templates, index, call, callArgs) {
        index++;

        if (templates[index]) {
            WM.Plugins.ArchWikiUpdatePackageTemplates.doUpdateContinue(source, newText, templates, index, call, callArgs);
        }
        else {
            newText += source.substring(templates[index - 1].index + templates[index - 1].length);
            call(source, newText, callArgs);
        }
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Updating package templates...");
        doUpdate(source, WM.Plugins.ArchWikiUpdatePackageTemplates.mainEnd, callNext);
    };

    this.mainEnd = function (source, newtext, callNext) {
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Updated package templates");
        }
        else {
            WM.Log.logInfo("No automatically updatable package templates found");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var summary = args[0];

        WM.MW.callQueryEdit(title,
                            WM.Plugins.ArchWikiUpdatePackageTemplates.mainAutoReplace,
                            [summary, callBot]);
    };

    this.mainAutoReplace = function (title, source, timestamp, edittoken, args) {
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
        else {
            callBot(false, null);
        }
    };
};
