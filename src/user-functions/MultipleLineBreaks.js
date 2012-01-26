var MultipleLineBreaks = new function () {
    this.main = function (args) {
        var s = WM.readSource();
        
        s = s.replace(/[\n]{3,}/g, '\n\n');
        
        WM.writeSource(s);
    };
};
