WM.Plugins.ArchWikiSaveTalk = new function () {
    this.main = function (args) {
        var article = args[0];
        var summary = args[1];
        
        WM.Log.logInfo('Appending diff to ' + article + "...");
        
        var title = WM.getURIParameter('title');
        var enddate = WM.Diff.getEndTimestamp();
        
        if (WM.Tables.appendRow(article, null, ["[" + location.href + " " +
                                        title + "]", enddate], summary))
        {
            WM.Log.logInfo('Diff correctly appended to ' + article);
        }
        else {
            WM.Log.logError('The diff has not been appended!');
        }
    };
};
