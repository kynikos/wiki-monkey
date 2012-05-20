WM.Plugins.ArchWikiSaveTalk = new function () {
    this.makeUI = function (args) {
        var article = args[0];
        
        var link = document.createElement('a');
        link.href = "/index.php/" + article;
        link.innerHTML = article;
        
        return link;
    };
    
    this.main = function (args) {
        var article = args[0];
        var summary = args[1];
        
        WM.Log.logInfo('Appending diff to ' + article + "...");
        
        WM.Diff.getEndTimestamp(WM.Plugins.ArchWikiSaveTalk.mainGetEndTimestamp,
                                [article, summary]);
    };
    
    this.mainGetEndTimestamp = function (enddate, args) {
        var article = args[0];
        var summary = args[1];
        
        WM.MW.callQuery({prop: "info|revisions",
                         rvprop: "content|timestamp",
                         intoken: "edit",
                         titles: article},
                         WM.Plugins.ArchWikiSaveTalk.mainWrite,
                         [article, summary, enddate]);
    };
    
    this.mainWrite = function (page, args) {
        var article = args[0];
        var summary = args[1];
        var enddate = args[2];
        
        var edittoken = page.edittoken;
        var timestamp = page.revisions[0].timestamp;
        var source = page.revisions[0]["*"];
        
        var title = WM.getURIParameter('title');
        
        var newtext = WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", enddate]);
        
        WM.MW.callAPIPost({action: "edit",
                           bot: "1",
                           title: article,
                           summary: summary,
                           text: newtext,
                           basetimestamp: timestamp,
                           token: edittoken},
                           WM.Plugins.ArchWikiSaveTalk.mainEnd,
                           article);
    };
    
    this.mainEnd = function (res, article) {
        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo('Diff correctly appended to ' + article);
        }
        else {
            WM.Log.logError('The diff has not been appended!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };
};
