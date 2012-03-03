WM.Plugins.ArchWikiFixHeadings = new function () {
    var findSections = function (source) {
        // ======Title====== is the deepest level supported
        
        // ==Title=== and ===Title== are both 2nd levels and so on
        // (the shortest sequence of = between the two sides is considered)
        
        // = and == are not titles
        // === is read as =(=)=, ==== is read as =(==)= (both 1st levels)
        // ===== is read as ==(=)== (2nd level) and so on
        
        var sections = [];
        var minLevel = 6;
        var maxLevel = 1;
        var regExp = /^\=+ *.+? *\=+$/gm;
        var match, line, L, level, start, end;
        
        while (true) {
            match = regExp.exec(source);
            if (match) {
                line = match[0];
                L = line.length;
                level = 1;
                start = "=";
                end = "=";
                while (true) {
                    start = line.substr(level, 1);
                    end = line.substr(L - level - 1, 1);
                    if (L - level * 2 > 2 && level < 6 && start == "=" && end == "=") {
                        level++;
                    }
                    else {
                        if (level < minLevel) {
                            minLevel = level;
                        }
                        if (level > maxLevel) {
                            maxLevel = level;
                        }
                        break;
                    }
                }
                sections.push({match: match,
                               level: level,
                               index: (regExp.lastIndex - L),
                               length: L});
            }
            else {
                break;
            }
        }
        
        // Articles without sections
        if (minLevel > maxLevel) {
            minLevel = 0;
            maxLevel = 0;
        }
        
        return {sections: sections,
                minLevel: minLevel,
                maxLevel: maxLevel};
    };
    
    this.main = function (args) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        var info = findSections(newtext);
        
        for each (var match in info.sections) {  // ***********************************
            WM.Log.logDebug(JSON.stringify(match));
        }
        WM.Log.logDebug(info.minLevel + " " + info.maxLevel);  // ****************
        
        newtext = "";
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed section headings");
        }
    };
};
