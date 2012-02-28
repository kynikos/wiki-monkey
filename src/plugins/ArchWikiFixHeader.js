WM.Plugins.ArchWikiFixHeader = new function () {
    var storeMatches = function (source, regExp, single) {
        var match, L, i;
        var result = [];
        while (true) {
            match = regExp.exec(source);
            if (match) {
                L = match[0].length;
                result.push(match);
                i = regExp.lastIndex;
                source = source.substring(0, i - L) + source.substring(i);
                regExp.lastIndex = i - L;
                if (single) {
                    break;
                }
            }
            else {
                break;
            }
        }
        return [source, result];
    };
    
    this.main = function (args) {
        var source = WM.Editor.readSource();
        
        var elements = {};
        
        var res = storeMatches(source, /\s*(\{\{(DISPLAYTITLE:(.+?)|[Ll]owercase title)\}\})\s*/g, false);
        elements.displaytitle = res[1];
        // Ignore __TOC__, __START__ and __END__
        res = storeMatches(res[0], /\s*(__(NOTOC|FORCETOC|NOEDITSECTION|NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|NOINDEX|STATICREDIRECT)__)\s*/g, false);
        elements.behaviorswitches = res[1];
        res = storeMatches(res[0], /\s*(\[\[[Cc]ategory:(.+?)\]\])\s*/g, false);
        elements.categories = res[1];
        res = storeMatches(res[0], /\s*(\{\{[Ii]18n\|(.+?)\}\})\s*/g, true);
        elements.i18n = res[1];
        
        var content = res[0];
        
        // Find interlanguage links? *********************************************
        // (and remove duplicates) ***********************************************
        // (see also the bug about synchronizing interlanguage *******************
        //  links among the various translations) ********************************
        // [[de:aaa]]
        // [[es:aaa]] (deprecate?)
        // [[fr:aaa]]
        // [[pl:aaa]] (deprecate?)
        // [[ro:aaa]]
        // [[sv:aaa]] (deprecate?)
        // [[uk:aaa]] (deprecate?)
        
        WM.Log.logDebug(JSON.stringify(elements));  // ***************************
        
        var newtext = "";
        
        // Deprecate Template:Lowercase ******************************************
        var L = elements.displaytitle.length;
        if (L) {
            newtext = elements.displaytitle[elements.displaytitle.length - 1][1];
            if (L > 1) {
                WM.Log.logWarning("Found multiple instances of {{DISPLAYTITLE:...}} or {{Lowercase title}}: only the last one has been used, the others have been deleted");
            }
        }
        
        // Remove duplicates *****************************************************
        var behaviorSwitches = [];
        for each (var sw in elements.behaviorswitches) {
            behaviorSwitches.push(sw[1]);
        }
        
        if (newtext) {
            if (behaviorSwitches) {
                newtext += " ";
                newtext += behaviorSwitches.join(" ");
            }
            newtext += "\n";
        }
        
        // Remove duplicates *****************************************************
        var categories = [];
        for each (var cat in elements.categories) {
            categories.push(cat[1]);
        }
        if (categories) {
            newtext += categories.join("\n");
            newtext += "\n";
        }
        else {
            WM.Log.logWarning("The article is not categorized");
        }
        
        var L = elements.i18n.length;
        if (L) {
            newtext += elements.i18n[0][1];
            newtext += "\n\n";
            if (L > 1) {
                WM.Log.logWarning("Found multiple instances of {{i18n|...}}: only the first one has been used, the others have been ignored");
            }
        }
        else {
            // If i18n is not found I have to create it **************************
            // after finding the right language suffix ***************************
        }
        
        newtext += content;
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed header");
        }
    };
};
