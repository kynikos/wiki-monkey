WM.Plugins.ArchWikiPkgAUR = new function () {
    this.mainAuto = function (args, title) {
        var res = WM.MW.callAPIGet({action: "query",
                                    prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: encodeURIComponent(title)});
        var pages = res.query.pages;
        
        var pageid;
        for each (pageid in pages) {
            break;
        }
        
        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];
        
        var newtext = source.replace(/\{\{[Pp]ackage Official\|/g, "{{Pkg|");
        newtext = newtext.replace(/\{\{[Pp]ackage AUR\|/g, "{{AUR|");
        
        if (newtext != source) {
            var summary = "use new package templates, see [[Help:Style]]";
            
            res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(title),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newtext),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
        
            return (res.edit && res.edit.result == 'Success') ? true : false;
        }
        else {
            return true;
        }
    };
};
