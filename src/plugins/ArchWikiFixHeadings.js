WM.Plugins.ArchWikiFixHeadings = new function () {
    this.main = function (args) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        newtext = "";
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed section headings");
        }
    };
};
