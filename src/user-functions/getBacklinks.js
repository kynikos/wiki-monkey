function UF_getBacklinks() {
    parser = new DOMParser();
    xml = parser.parseFromString(getBacklinks(), "text/xml");
    var bls = new Array();
    var L = xml.getElementsByTagName('bl');
    for (var i = 0; i < L.length; i++) {
        bls.push(L[i].getAttribute('title'));
    }
    alert(bls);
}
