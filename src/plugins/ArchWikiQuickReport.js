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
        
        var title = WM.getURIParameter('title');
        var enddate = WM.Diff.getEndTimestamp();
        var select = document.getElementById("ArchWikiQuickReport-select-" + id);
        var type = select.options[select.selectedIndex].value;
        var notes = document.getElementById("ArchWikiQuickReport-input-" + id).value;
        
        if (type != 'content' && type != 'style') {
            WM.Log.logError('Select a valid report type');
        }
        else {
            var pageid = WM.MW.callQuerySync({prop: "info|revisions",
                                          rvprop: "content|timestamp",
                                          intoken: "edit",
                                          titles: encodeURIComponent(article)});
            
            var edittoken = pageid.edittoken;
            var timestamp = pageid.revisions[0].timestamp;
            var source = pageid.revisions[0]["*"];
            
            var newtext = WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", enddate, type, notes]);
            
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
        }
    };
};
