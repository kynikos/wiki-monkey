WM.Plugins.DeletePage = new function () {
    this.mainAuto = function (args, title) {
        var summary = args[0];
        
        var page = WM.MW.callQuerySync({prop: 'info',
                                    intoken: 'delete',
                                    titles: encodeURIComponent(title)});
        
        var deletetoken = page.deletetoken;
        
        var res = WM.MW.callAPIPostSync({action: 'delete',
                                     bot: '1',
                                     title: encodeURIComponent(title),
                                     token: encodeURIComponent(deletetoken),
                                     reason: encodeURIComponent(summary)});
        
        if (!res['delete']) {
            WM.Log.logError(cat + " has not been deleted!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
            return false;
        }
        else {
            return true;
        }
    };
    
    this.main = function (args) {
        var [title, summary] = args;
        
        WM.Log.logInfo("Deleting " + title + "...");
        
        var page = WM.MW.callQuerySync({prop: 'info',
                                    intoken: 'delete',
                                    titles: encodeURIComponent(title)});
        
        var deletetoken = page.deletetoken;
        
        var res = WM.MW.callAPIPostSync({action: 'delete',
                                     bot: '1',
                                     title: encodeURIComponent(title),
                                     token: encodeURIComponent(deletetoken),
                                     reason: encodeURIComponent(summary)});
        
        if (!res['delete']) {
            WM.Log.logError(cat + " has not been deleted!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            WM.Log.logInfo(title + " deleted");
        }
    };
};
