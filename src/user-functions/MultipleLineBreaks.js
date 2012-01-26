var MultipleLineBreaks = new function () {
    this.main = function (args) {
        var s = WM.readSource();
        var original = s;
        
        s = s.replace(/[\n]{3,}/g, '\n\n');
        
        WM.writeSource(s);
        
        if (s != original) {
            WM.logInfo("Removed multiple line breaks");
        }
    };
};
