WM.Plugins.ArchWikiQuickReport = new function () {
    this.makeUI = function (args) {
        var id = args[0];
                
        input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.id = id;
       
        return input;
    };
    
    this.main = function (args) {
        var inputId = args[0];
        var article = args[1];
        var summary = args[2];
        
        WM.Log.logInfo('Appending diff to ' + article + "...");
        
        var title = WM.getURIParameter('title');
        var diff = WM.getURIParameter('diff');
        var oldid = WM.getURIParameter('oldid');
        var xml, enddate;
        switch (diff) {
            case 'next':
                xml = WM.MW.callAPIGet(["action=query", "prop=revisions",
                                  "titles=" + title, "rvlimit=2",
                                  "rvprop=timestamp", "rvdir=newer",
                                  "rvstartid=" + oldid]);
                enddate = xml.getElementsByTagName('rev')[1].getAttribute('timestamp');
                break;
            case 'prev':
                xml = WM.MW.callAPIGet(["action=query", "prop=revisions",
                                  "revids=" + oldid, "rvprop=timestamp"]);
                enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
                break;
            default:
                xml = WM.MW.callAPIGet(["action=query", "prop=revisions",
                                  "revids=" + diff, "rvprop=timestamp"]);
                enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
        }
        
        var notes = document.getElementById(inputId).value;
        
        if (WM.Tables.appendRow(article, null, ["[" + location.href + " " +
                                        title + "]", enddate, notes], summary))
        {
            WM.Log.logInfo('Diff correctly appended to ' + article);
        }
        else {
            WM.Log.logError('The diff has not been appended!');
        }
    };
};
