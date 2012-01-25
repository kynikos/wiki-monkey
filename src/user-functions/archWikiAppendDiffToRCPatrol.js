function UF_archWikiAppendDiffToRCPatrol(fname, article) {
    var summary = "[[User:Kynikos/Wiki Monkey|Wiki Monkey]]: add diff";
    
    var title = getTitle();
    var diff = getURIParameter('diff');
    var oldid = getURIParameter('oldid');
    var xml, enddate;
    switch (diff) {
        case 'next':
            xml = callAPIGet(["action=query", "prop=revisions",
                              "titles=" + title, "rvlimit=2",
                              "rvprop=timestamp", "rvdir=newer",
                              "rvstartid=" + oldid]);
            enddate = xml.getElementsByTagName('rev')[1].getAttribute('timestamp');
            break;
        case 'prev':
            xml = callAPIGet(["action=query", "prop=revisions",
                              "revids=" + oldid, "rvprop=timestamp"]);
            enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
            break;
        default:
            xml = callAPIGet(["action=query", "prop=revisions",
                              "revids=" + diff, "rvprop=timestamp"]);
            enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
    }
    
    var notes = document.getElementById(fname).value;
    
    xml = callAPIGet(["action=query", "prop=info|revisions",
                      "rvprop=content", "intoken=edit",
                      "titles=" + encodeURIComponent(article)]);
    
    var page = xml.getElementsByTagName('page')[0];
    var rev = xml.getElementsByTagName('rev')[0];
    var edittoken = page.getAttribute('edittoken');
    var timestamp = rev.getAttribute('timestamp');
    
    var source = getLongTextNode(rev);
    var endtable = source.lastIndexOf('|}');
    var part1 = source.substring(0, endtable);
    var part2 = source.substring(endtable);
    var newtext = part1 + "|-\n|[" + location.href + " " + getTitle() +
                  "]\n|" + enddate + "\n|" + notes + "\n" + part2;
    
    xml = callAPIPost(["action=edit", "bot=1",
                       "title=" + encodeURIComponent(article),
                       "summary=" + encodeURIComponent(summary),
                       "text=" + encodeURIComponent(newtext),
                       "basetimestamp=" + timestamp,
                       "token=" + encodeURIComponent(edittoken)]);
    
    if (xml.getElementsByTagName('edit')[0].getAttribute('result') == 'Success') {
        alert('Diff correctly appended.');
    }
    else {
        alert('Error! The diff has not been appended.');
    }
}