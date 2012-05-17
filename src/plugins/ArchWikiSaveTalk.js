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
        
        var title = WM.getURIParameter('title');
        var enddate = WM.Diff.getEndTimestamp();
        
        var pageid = WM.MW.callQuerySync({prop: "info|revisions",
                                      rvprop: "content|timestamp",
                                      intoken: "edit",
                                      titles: encodeURIComponent(article)});
        
        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];
        
        var newtext = WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", enddate]);
        
        var res = WM.MW.callAPIPostSync({action: "edit",
                                 bot: "1",
                                 title: encodeURIComponent(article),
                                 summary: encodeURIComponent(summary),
                                 text: encodeURIComponent(newtext),
                                 basetimestamp: timestamp,
                                 token: encodeURIComponent(edittoken)});
        
        if (res.edit && res.edit.result == 'Success') {
            WM.Log.logInfo('Diff correctly appended to ' + article);
        }
        else {
            WM.Log.logError('The diff has not been appended!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
    };
};
