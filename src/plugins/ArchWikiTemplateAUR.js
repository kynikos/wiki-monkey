WM.Plugins.ArchWikiTemplateAUR = new function () {
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
        
        WM.Plugins.ArchWikiTemplateAUR.doReplaceContinue(source, newText, links, 0, call, callArgs);
    };
    
    this.doReplaceContinue = function (source, newText, links, index, call, callArgs) {
        if (links[index]) {
            WM.Log.logInfo("Processing " + links[index][0] + "...");
            GM_xmlhttpRequest({
                method: "GET",
                url: links[index][1],
                onload: function (res) {
                    var parser = new DOMParser();
                    var page = parser.parseFromString(res.responseText, "text/xml");
                    var divs = page.getElementsByTagName('div');
                    for (var i = 0; i < divs.length; i++) {
                        if (divs[i].className == "pgboxbody") {
                            var span = divs[i].getElementsByTagName('span')[0];
                            var pkgname = span.innerHTML.split(" ")[0];
                            if (links[index][2] == pkgname) {
                                newText = newText.replace(links[index][0],
                                                          "{{AUR|" + pkgname + "}}");
                            }
                            break;
                        }
                    }
                    index++;
                    WM.Plugins.ArchWikiTemplateAUR.doReplaceContinue(source, newText, links, index, call, callArgs);
                }
            });
        }
        else {
            call(source, newText, callArgs);
        }
    };
    
    this.main = function (args) {
        var source = WM.Editor.readSource();
        WM.Log.logInfo("Replacing direct AUR package links...");
        doReplace(source, WM.Plugins.ArchWikiTemplateAUR.mainEnd);
    };
    
    this.mainEnd = function (source, newtext) {
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Replaced direct AUR package links");
        }
    };
    
    this.mainAuto = function (args, title, callBot) {
        var summary = args[0];
        
        WM.MW.callQueryEdit(title,
                            WM.Plugins.ArchWikiTemplateAUR.mainAutoReplace,
                            [summary, callBot]);
    };
    
    this.mainAutoReplace = function (title, source, timestamp, edittoken, args) {
        var summary = args[0];
        var callBot = args[1];
        
        doReplace(source,
                  WM.Plugins.ArchWikiTemplateAUR.mainAutoWrite,
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
                               WM.Plugins.ArchWikiTemplateAUR.mainAutoEnd,
                               callBot);
        }
        else {
            callBot(true);
        }
    };
    
    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(true);
        }
        else {
            callBot(false);
        }
    };
};
