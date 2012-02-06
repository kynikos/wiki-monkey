WM.Plugins.MultipleLineBreaks = new function () {
    this.main = function (args) {
        var s = WM.Editor.readSource();
        var original = s;
        
        s = s.replace(/[\n]{3,}/g, '\n\n');
        
        WM.Editor.writeSource(s);
        
        if (s != original) {
            WM.Log.logInfo("Removed multiple line breaks");
        }
    };
};
