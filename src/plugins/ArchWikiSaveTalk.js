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
        
        var res = WM.MW.callAPIGet({action: "query",
                                    prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: encodeURIComponent(article)});
        var pages = res.query.pages;
        
        var pageid;
        for each (pageid in pages) {
            break;
        }
        
        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];
        
        var newtext = WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", enddate]);
        
        res = WM.MW.callAPIPost({action: "edit",
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
            WM.Log.logError('The diff has not been appended!');
        }
    };
};
