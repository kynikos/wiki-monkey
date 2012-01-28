var ArchWikiQuickReport = new function () {
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
        
        var title = WM.getTitle();
        var diff = WM.getURIParameter('diff');
        var oldid = WM.getURIParameter('oldid');
        var xml, enddate;
        switch (diff) {
            case 'next':
                xml = WM.callAPIGet(["action=query", "prop=revisions",
                                  "titles=" + title, "rvlimit=2",
                                  "rvprop=timestamp", "rvdir=newer",
                                  "rvstartid=" + oldid]);
                enddate = xml.getElementsByTagName('rev')[1].getAttribute('timestamp');
                break;
            case 'prev':
                xml = WM.callAPIGet(["action=query", "prop=revisions",
                                  "revids=" + oldid, "rvprop=timestamp"]);
                enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
                break;
            default:
                xml = WM.callAPIGet(["action=query", "prop=revisions",
                                  "revids=" + diff, "rvprop=timestamp"]);
                enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
        }
        
        var notes = document.getElementById(inputId).value;
        
        xml = WM.callAPIGet(["action=query", "prop=info|revisions",
                             "rvprop=content", "intoken=edit",
                             "titles=" + encodeURIComponent(article)]);
        
        var page = xml.getElementsByTagName('page')[0];
        var rev = xml.getElementsByTagName('rev')[0];
        var edittoken = page.getAttribute('edittoken');
        var timestamp = rev.getAttribute('timestamp');
        
        var source = WM.getLongTextNode(rev);
        var endtable = source.lastIndexOf('|}');
        var part1 = source.substring(0, endtable);
        var part2 = source.substring(endtable);
        var newtext = part1 + "|-\n|[" + location.href + " " + WM.getTitle() +
                      "]\n|" + enddate + "\n|" + notes + "\n" + part2;
        
        xml = WM.callAPIPost(["action=edit", "bot=1",
                              "title=" + encodeURIComponent(article),
                              "summary=" + encodeURIComponent(summary),
                              "text=" + encodeURIComponent(newtext),
                              "basetimestamp=" + timestamp,
                              "token=" + encodeURIComponent(edittoken)]);
        
        if (xml.getElementsByTagName('edit')[0].getAttribute('result') == 'Success') {
            WM.logInfo('Diff correctly appended to ' + article);
        }
        else {
            WM.logError('The diff has not been appended!');
        }
    };
};
