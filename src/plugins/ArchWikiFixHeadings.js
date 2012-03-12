WM.Plugins.ArchWikiFixHeadings = new function () {
    var findSections = function (source) {
        // ======Title====== is the deepest level supported
        var MAXLEVEL = 6;
        
        var sections = [];
        var minLevel = MAXLEVEL;
        var maxTocLevel = 0;
        var tocLevel = 1;
        var regExp = /^\=+ *.+? *\=+$/gm;
        var match, line, L, level, prevLevels, start, end, tocPeer;
        
        while (true) {
            match = regExp.exec(source);
            
            if (match) {
                line = match[0];
                L = line.length;
                level = 1;
                start = "=";
                end = "=";
                
                // ==Title=== and ===Title== are both 2nd levels and so on
                // (the shortest sequence of = between the two sides is
                //  considered)
                
                // = and == are not titles
                // === is read as =(=)=, ==== is read as =(==)= (both 1st
                //                                               levels)
                // ===== is read as ==(=)== (2nd level) and so on
                
                while (true) {
                    start = line.substr(level, 1);
                    end = line.substr(L - level - 1, 1);
                    
                    if (L - level * 2 > 2 && start == "=" && end == "=") {
                        level++;
                    }
                    else {
                        if (level > MAXLEVEL) {
                            level = MAXLEVEL;
                            WM.Log.logWarning('"' + line + '"' + " is considered a level-" + MAXLEVEL + " heading");
                        }
                        else if (level < minLevel) {
                            minLevel = level;
                        }
                        break;
                    }
                }
                
                if (level == minLevel) {
                    tocLevel = 1;
                    prevLevels = {};
                    prevLevels[level] = 1;
                    prevLevels.relMax = level;
                }
                else if (level > prevLevels.relMax) {
                    tocLevel++;
                    prevLevels[level] = tocLevel;
                    prevLevels.relMax = level;
                    if (tocLevel > maxTocLevel) {
                        maxTocLevel = tocLevel;
                    }
                }
                else if (level < prevLevels.relMax) {
                    if (prevLevels[level]) {
                        tocLevel = prevLevels[level];
                    }
                    else {
                        // tocPeer is the level immediately greater than the
                        // current one, and it should have the same tocLevel
                        // I must reset tocPeer here to the relative maximum
                        tocPeer = prevLevels.relMax;
                        for (var pLevel in prevLevels) {
                            if (pLevel > level && pLevel < tocPeer) {
                                tocPeer = pLevel;
                            }
                        }
                        tocLevel = prevLevels[tocPeer];
                        prevLevels[level] = tocLevel;
                    }
                    prevLevels.relMax = level;
                }
                
                sections.push({match: match,
                               level: level,
                               tocLevel: tocLevel,
                               index: (regExp.lastIndex - L),
                               length: L});
            }
            else {
                break;
            }
        }
        
        // Articles without sections
        if (maxTocLevel == 0) {
            minLevel = 0;
        }
        
        return {sections: sections,
                minLevel: minLevel,
                maxTocLevel: maxTocLevel};
    };
    
    this.main = function (args) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        var info = findSections(newtext);
        
        for each (var match in info.sections) {  // ***********************************
            WM.Log.logDebug(JSON.stringify(match));
        }
        WM.Log.logDebug(info.minLevel + " " + info.maxTocLevel);  // ***********************************
        
        // If minLevel is 1 raise everything up by 1 unless maxLevel is > 5 ******
        // If maxLevel is > 6 raise a warning unless it is possible to lower *****
        //  all levels enough to make maxLevel < 7
        // Check that levels are increased by steps of 1 level *******************
        
        newtext = "";
        
        if (newtext != source) {
            //WM.Editor.writeSource(newtext);  // *******************************************
            WM.Log.logInfo("Fixed section headings");
        }
    };
};
