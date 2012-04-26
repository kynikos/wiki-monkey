WM.Plugins.ArchWikiTurkishIwLinks = new function () {
    this.mainAuto = function (args, title) {
        var page = WM.MW.callQuery({prop: 'info',
                                    intoken: 'delete',
                                    titles: encodeURIComponent(title)});
        
        var deletetoken = page.deletetoken;
        
        var summary = "Turkish articles moved to http://archtr.org/wiki/";
        
        var res = WM.MW.callAPIPost({action: 'delete',
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
};
