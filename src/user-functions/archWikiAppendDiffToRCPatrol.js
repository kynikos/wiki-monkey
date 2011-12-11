function UF_archWikiAppendDiffToRCPatrol() {
    var article = "User:Kynikos/RC_Patrol";
    var summary = "[[User:Kynikos/Wiki Monkey|Wiki Monkey]]: add diff";
    
    var diff = getURIParameter('diff');
    var xml = callAPIGet(["action=query", "prop=revisions",
                               "revids=" + diff, "rvprop=timestamp"]);
    var enddate = xml.getElementsByTagName('rev')[0].getAttribute('timestamp');
    
    var notes = this.nextSibling.value;
    
    xml = callAPIGet(["action=query", "prop=info|revisions",
                      "rvprop=content", "intoken=edit",
                      "titles=" + encodeURIComponent(article)]);
    
    var page = xml.getElementsByTagName('page')[0];
    var rev = xml.getElementsByTagName('rev')[0];
    var edittoken = page.getAttribute('edittoken');
    var timestamp = rev.getAttribute('timestamp');
    
    var source = "";
    // Firefox and other browsers split long text into multiple text nodes
    for each (var child in rev.childNodes) {
        if (child.nodeType == 3) {
            source += child.nodeValue;
        }
    }
    
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