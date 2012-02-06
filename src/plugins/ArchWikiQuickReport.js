WM.Plugins.ArchWikiQuickReport = new function () {
    this.makeUI = function (args) {
        var id = args[0];
        
        var select = document.createElement('select');
        var values = ["<TYPE>", "content", "style"];
        for (var val in values) {
            option = document.createElement('option');
            option.setAttribute('value', values[val]);
            option.innerHTML = values[val];
            select.appendChild(option);
        }
        select.id = "ArchWikiQuickReport-select-" + id;
        
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.id = "ArchWikiQuickReport-input-" + id;
        
        var span = document.createElement('span');
        span.appendChild(select);
        span.appendChild(input);
        
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
        else if (WM.Tables.appendRow(article, null, ["[" + location.href +
                            " " + title + "]", enddate, type, notes], summary))
        {
            WM.Log.logInfo('Diff correctly appended to ' + article);
        }
        else {
            WM.Log.logError('The diff has not been appended!');
        }
    };
};
