WM.Plugins.ArchWikiFixHeadings = new function () {
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        
        var info = WM.Parser.findSectionHeadings(source);
        
        var increaseLevel;
        if (info.maxTocLevel < 6) {
            increaseLevel = 1;
        }
        else {
            increaseLevel = 0;
            WM.Log.logWarning("There are 6 levels of headings, it's been necessary to start creating them from level 1 although usually it's suggested to start from level 2");
        }
        
        var newtext = "";
        var prevId = 0;
        var section;
        
        for (var s in info.sections) {
            section = info.sections[s];
            newtext += source.substring(prevId, section.index);
            newtext += new Array(section.tocLevel + increaseLevel + 1).join("=");
            newtext += section.line.substr(section.level, section.length1 - 2 * section.level);
            newtext += new Array(section.tocLevel + increaseLevel + 1).join("=");
            prevId = section.index + section.length0;
        }
        newtext += source.substr(prevId);
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed section headings");
        }
        
        if (callNext) {
            callNext();
        }
    };
};
