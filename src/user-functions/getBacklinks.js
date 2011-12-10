function UF_getBacklinks() {
    var xml = callAPIGet(["action=query", "list=backlinks",
                          "bltitle=" + ecodeURIComponent(getTitle())]);
    var bls = new Array();
    var L = xml.getElementsByTagName('bl');
    for (var i = 0; i < L.length; i++) {
        bls.push(L[i].getAttribute('title'));
    }
    alert(bls);
}
