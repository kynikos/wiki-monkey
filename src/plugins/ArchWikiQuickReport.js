WM.Plugins.ArchWikiQuickReport = new function () {
    this.makeUI = function (args) {
        var id = args[0];
        var article = args[1];
        
        var select = document.createElement('select');
        var types = ["&lt;TYPE&gt;", "content", "style"];
        var value;
        for (var v in types) {
            value = types[v];
            option = document.createElement('option');
            option.setAttribute('value', value);
            option.innerHTML = value;
            select.appendChild(option);
        }
        select.id = "ArchWikiQuickReport-select-" + id;
        
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.id = "ArchWikiQuickReport-input-" + id;
        
        var link = document.createElement('a');
        link.href = "/index.php/" + article;
        link.innerHTML = article;
        
        var span = document.createElement('span');
        span.appendChild(select);
        span.appendChild(input);
        span.appendChild(link);
        
        return span;
    };
    
    this.main = function (args) {
        var id = args[0];
        var article = args[1];
        var summary = args[2];
        
        WM.Log.logInfo('Appending diff to ' + article + "...");
        
        var select = document.getElementById("ArchWikiQuickReport-select-" + id);
        var type = select.options[select.selectedIndex].value;
        
        if (type != 'content' && type != 'style') {
            WM.Log.logError('Select a valid report type');
        }
        else {
            WM.Diff.getEndTimestamp(WM.Plugins.ArchWikiQuickReport.mainGetEndTimestamp,
                                    [id, article, type, summary]);
        }
    };
    
    this.mainGetEndTimestamp = function (enddate, args) {
        var id = args[0];
        var article = args[1];
        var type = args[2];
        var summary = args[3];
        
        WM.MW.callQueryEdit(article,
                            WM.Plugins.ArchWikiQuickReport.mainWrite,
                            [id, type, summary, enddate]);
    };
    
    this.mainWrite = function (article, source, timestamp, edittoken, args) {
        var id = args[0];
        var type = args[1];
        var summary = args[2];
        var enddate = args[3];
        
        var title = Alib.HTTP.getURIParameter('title');
        var pEnddate = enddate.substr(0, 10) + " " + enddate.substr(11, 8);
        var notes = document.getElementById("ArchWikiQuickReport-input-" + id).value;
        
        var newtext = WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", pEnddate, type, notes]);
        
        WM.MW.callAPIPost({action: "edit",
                           bot: "1",
                           title: article,
                           summary: summary,
                           text: newtext,
                           basetimestamp: timestamp,
                           token: edittoken},
                           WM.Plugins.ArchWikiQuickReport.mainEnd,
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
