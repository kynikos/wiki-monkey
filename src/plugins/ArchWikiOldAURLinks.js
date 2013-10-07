WM.Plugins.ArchWikiOldAURLinks = new function () {
    var doReplace = function (source, call, callArgs) {
        var regExp = /\[(https?\:\/\/aur\.archlinux\.org\/packages\.php\?ID\=[0-9]+) ([^\]]+?)\]/g;
        var links = [];

        while (true) {
            var match = regExp.exec(source);
            if (match) {
                links.push(match);
            }
            else {
                break;
            }
        }

        var newText = source;

        WM.Plugins.ArchWikiOldAURLinks.doReplaceContinue(source, newText, links, 0, call, callArgs);
    };

    this.doReplaceContinue = function (source, newText, links, index, call, callArgs) {
        if (links[index]) {
            WM.Log.logInfo("Processing " + links[index][0] + "...");
            var query = {
                method: "GET",
                url: links[index][1],
                onload: function (res) {
                    var parser = new DOMParser();
                    var page = parser.parseFromString(res.responseText, "text/xml");
                    if (page.getElementById('pkgdetails')) {
                        var h2 = page.getElementById('pkgdetails').getElementsByTagName('h2')[0];
                        var pkgname = h2.innerHTML.split(" ")[2];
                        if (links[index][2] == pkgname) {
                            newText = newText.replace(links[index][0], "{{AUR|" + pkgname + "}}");
                        }
                        else {
                            WM.Log.logWarning("Couldn't replace: the link doesn't use the package name as the anchor text");
                        }
                    }
                    else {
                        WM.Log.logWarning("Couldn't replace: the package doesn't exist anymore");
                    }
                    index++;
                    WM.Plugins.ArchWikiOldAURLinks.doReplaceContinue(source, newText, links, index, call, callArgs);
                },
                onerror: function (res) {
                    WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
                },
            };
            try {
                GM_xmlhttpRequest(query);
            }
            catch (err) {
                WM.Log.logError(WM.MW.failedHTTPRequestError(err));
            }
        }
        else {
            call(source, newText, callArgs);
        }
    };

    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Replacing old-style direct AUR package links...");
        doReplace(source, WM.Plugins.ArchWikiOldAURLinks.mainEnd, callNext);
    };

    this.mainEnd = function (source, newtext, callNext) {
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Replaced old-style direct AUR package links");
        }
        else {
            WM.Log.logInfo("No replaceable old-style AUR package links found");
        }

        if (callNext) {
            callNext();
        }
    };

    this.mainAuto = function (args, title, callBot, chainArgs) {
        var summary = args[0];

        WM.MW.callQueryEdit(title,
                            WM.Plugins.ArchWikiOldAURLinks.mainAutoReplace,
                            [summary, callBot]);
    };

    this.mainAutoReplace = function (title, source, timestamp, edittoken, args) {
        var summary = args[0];
        var callBot = args[1];

        doReplace(source,
                  WM.Plugins.ArchWikiOldAURLinks.mainAutoWrite,
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
                               WM.Plugins.ArchWikiOldAURLinks.mainAutoEnd,
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
