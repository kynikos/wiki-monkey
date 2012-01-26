var GetBacklinks = new function () {
    this.main = function (args) {
        var xml = WM.callAPIGet(["action=query", "list=backlinks",
                                 "bltitle=" + ecodeURIComponent(WM.getTitle())]);
        var bls = new Array();
        var L = xml.getElementsByTagName('bl');
        for (var i = 0; i < L.length; i++) {
            bls.push(L[i].getAttribute('title'));
        }
        alert(bls);
    };
};
