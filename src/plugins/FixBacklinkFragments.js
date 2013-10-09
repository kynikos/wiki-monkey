WM.Plugins.FixBacklinkFragments = new function () {
    var fixLinks = function (source, target, sections) {
        var newString = source;

        // Note that it's impossible to recognize any namespaces in the title without querying the server
        // Alternatively, a list of the known namespaces could be maintained for each wiki
        // Recognizing namespaces would let recognize more liberal link syntaxes (e.g. spaces around the colon)
        var links = WM.Parser.findInternalLinks(source, null, target);

        for (var l = 0; l < links.length; l++) {
            var link = links[l];
            var rawfragment = link.match[5];

            if (rawfragment) {
                var fragment = WM.Parser.convertUnderscoresToSpaces(rawfragment);

                if (sections.indexOf(fragment) < 0) {
                    var fixed = false;

                    for (var s = 0; s < sections.length; s++) {
                        var section = sections[s];

                        if (section.toLowerCase() == fragment.toLowerCase()) {
                            var newlink = "[[" + link.match[4] + "#" + section + ((link.match[6]) ? "|" + link.match[6] : "") + "]]";
                            newString = Alib.Str.overwriteFor(newString, newlink, link.index, link.length);
                            WM.Log.logInfo("Fixed broken link fragment: " + link.match[0] + " -> " + newlink);
                            fixed = true;
                            break;
                        }
                    }

                    if (!fixed) {
                        WM.Log.logWarning("Cannot fix broken link fragment: " + link.match[0]);
                    }
                }
            }
        }

        return newString;
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var target =  WM.WhatLinksHere.getTitle();

        if (chainArgs === null) {
            var params = {
                'action': 'parse',
                'prop': 'sections',
                'page':target
            };

            WM.MW.callAPIGet(params,
                             null,
                             WM.Plugins.FixBacklinkFragments.mainAutoFindSections,
                             [title, target, args, callBot]);
        }
        else {
            WM.Plugins.FixBacklinkFragments.mainAutoRead(target, chainArgs, title, args, callBot);
        }
    };

    this.mainAutoFindSections = function (res, args) {
        var title = args[0];
        var target = args[1];
        var summary = args[2];
        var callBot = args[3];
        var sections = [];

        for (var s = 0; s < res.parse.sections.length; s++) {
            sections.push(res.parse.sections[s].line);
        }

        WM.Plugins.FixBacklinkFragments.mainAutoRead(target, sections, title, summary, callBot);
    };

    this.mainAutoRead = function (target, sections, title, summary, callBot) {
        WM.MW.callQueryEdit(title,
                            WM.Plugins.FixBacklinkFragments.mainAutoWrite,
                            [target, summary, callBot, sections]);
    };

    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var target = args[0];
        var summary = args[1];
        var callBot = args[2];
        var sections = args[3];

        var newtext = fixLinks(source, target, sections);

        if (newtext != source) {
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               null,
                               WM.Plugins.FixBacklinkFragments.mainAutoEnd,
                               [callBot, sections]);
        }
        else {
            callBot(0, sections);
        }
    };

    this.mainAutoEnd = function (res, args) {
        var callBot = args[0];
        var sections = args[1];

        if (res.edit && res.edit.result == 'Success') {
            callBot(1, sections);
        }
        else {
            WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
            callBot(false, sections);
        }
    };
};