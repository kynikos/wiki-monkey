WM.Plugins.ArchWikiTurkishIwLinks = new function () {
    this.mainAuto = function (args, title) {
        var pageid = WM.MW.callQuerySync({prop: "revisions",
                                      rvprop: "content",
                                      titles: title});
        
        var trSource = pageid.revisions[0]["*"];
        
        var trTitle = trSource.match(/\{\{ *[Mm]ark to delete \(Türkçe\) *\| *(.+?) *\}\}/)[1];
        
        var enTitle = title.match(/^(.+?) \(Türkçe\)$/)[1];
        
        var page = WM.MW.callQuerySync({prop: "info|revisions",
                                      rvprop: "content|timestamp",
                                      intoken: "edit",
                                      titles: enTitle});
        
        var edittoken = page.edittoken;
        var timestamp = page.revisions[0].timestamp;
        var enSource = page.revisions[0]["*"];
        
        var newText = enSource.replace(/(\{\{ *i18n)/gi, "[[tr:" + trTitle + "]]\n$1");
        
        if (newText != enSource) {
            var summary = "add Turkish interlanguage link";
            
            var res = WM.MW.callAPIPostSync({action: "edit",
                                     bot: "1",
                                     title: enTitle,
                                     summary: summary,
                                     text: newText,
                                     basetimestamp: timestamp,
                                     token: edittoken});
            
            if (res.edit && res.edit.result == 'Success') {
                return true;
            }
            else {
                WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
                return false;
            }
        }
        else {
            return true;
        }
    };
};
