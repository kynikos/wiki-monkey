WM.Plugins.ArchWikiSaveTalk = new function () {
    this.makeUI = function (args) {
        var article = args[0];
        
        var link = document.createElement('a');
        link.href = "/index.php/" + article;
        link.innerHTML = article;
        
        return link;
    };
    
    this.main = function (args, callNext) {
        var article = args[0];
        var summary = args[1];
        
        WM.Log.logInfo('Appending diff to ' + article + "...");
        
        WM.Diff.getEndTimestamp(WM.Plugins.ArchWikiSaveTalk.mainGetEndTimestamp,
                                [article, summary, callNext]);
    };
    
    this.mainGetEndTimestamp = function (enddate, args) {
        var article = args[0];
        var summary = args[1];
        var callNext = args[2];
        
        WM.MW.callQueryEdit(article,
                            WM.Plugins.ArchWikiSaveTalk.mainWrite,
                            [summary, enddate, callNext]);
    };
    
    this.mainWrite = function (article, source, timestamp, edittoken, args) {
        var summary = args[0];
        var enddate = args[1];
        var callNext = args[2];
        
        var title = Alib.HTTP.getURIParameter('title');
        var pEnddate = enddate.substr(0, 10) + "&nbsp;" + enddate.substr(11, 8);
        
        var newtext = WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", pEnddate]);
        
        WM.MW.callAPIPost({action: "edit",
                           bot: "1",
                           title: article,
                           summary: summary,
                           text: newtext,
                           basetimestamp: timestamp,
                           token: edittoken},
                           null,
                           WM.Plugins.ArchWikiSaveTalk.mainEnd,
                           [article, callNext]);
    };
    
    this.mainEnd = function (res, args) {
        var article = args[0];
        var callNext = args[1];
        
        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo('Diff correctly appended to ' + article);
            if (callNext) {
                callNext();
            }
        }
        else {
            WM.Log.logError('The diff has not been appended!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };
};
