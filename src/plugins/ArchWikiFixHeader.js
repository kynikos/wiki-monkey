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
        
        // Note that patterns get only left-side white space
        var res = storeMatches(source, /\s*(\{\{(DISPLAYTITLE:(.+?)|[Ll]owercase title)\}\})/g, false);
        elements.displaytitle = res[1];
        // Ignore __TOC__, __START__ and __END__
        res = storeMatches(res[0], /\s*(__(NOTOC|FORCETOC|NOEDITSECTION|NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|NOINDEX|STATICREDIRECT)__)/g, false);
        elements.behaviorswitches = res[1];
        res = storeMatches(res[0], /\s*(\[\[[Cc]ategory:(.+?)\]\])/g, false);
        elements.categories = res[1];
        res = storeMatches(res[0], /\s*(\{\{[Ii]18n\|(.+?)\}\})/g, true);
        elements.i18n = res[1];
        
        var content = res[0];
        
        // Find interlanguage links? *********************************************
        // (and remove duplicates)
        // (see also the bug about synchronizing interlanguage links among the
        //  various translations)
        // [[de:aaa]]
        // [[es:aaa]] (deprecate?)
        // [[fr:aaa]]
        // [[pl:aaa]] (deprecate?)
        // [[ro:aaa]]
        // [[sv:aaa]] (deprecate?)
        // [[uk:aaa]] (deprecate?)
        
        var newtext = "";
        
        // Deprecate Template:Lowercase ******************************************
        var L = elements.displaytitle.length;
        if (L) {
            newtext = elements.displaytitle[elements.displaytitle.length - 1][1];
            if (L > 1) {
                WM.Log.logWarning("Found multiple instances of {{DISPLAYTITLE:...}} or {{Lowercase title}}: only the last one has been used, the others have been deleted");
            }
        }
        
        var behaviorSwitches = [];
        for each (var sw in elements.behaviorswitches) {
            if (behaviorSwitches.indexOf(sw[1]) == -1) {
                behaviorSwitches.push(sw[1]);
            }
            else {
                WM.Log.logWarning("Removed duplicate of " + sw[1]);
            }
        }
        
        // if (behaviorSwitches) is always true
        if (behaviorSwitches.length) {
            if (newtext) {
                newtext += " ";
            }
            newtext += behaviorSwitches.join(" ");
        }
        
        if (newtext) {
            newtext += "\n";
        }
        
        var categories = [];
        for each (var cat in elements.categories) {
            if (categories.indexOf(cat[1]) == -1) {
                categories.push(cat[1]);
            }
            else {
                WM.Log.logWarning("Removed duplicate of " + cat[1]);
            }
        }
        
        // if (categories) is always true
        if (categories.length) {
            newtext += categories.join("\n");
            newtext += "\n";
        }
        else {
            WM.Log.logWarning("The article is not categorized");
        }
        
        var L = elements.i18n.length;
        if (L) {
            newtext += elements.i18n[0][1];
            if (L > 1) {
                WM.Log.logWarning("Found multiple instances of {{i18n|...}}: only the first one has been used, the others have been ignored");
            }
        }
        else {
            // Remove the language suffix (use a white list) *********************
            newtext += "{{i18n|" + WM.Editor.getTitle() + "}}";
            WM.Log.logInfo("Added Template:i18n");
        }
        newtext += "\n";
        
        var firstChar = content.search(/[^\s]/);
        content = content.substr(firstChar);
        
        var test = content.substr(0, 2);
        if (test != "{{" && test != "[[") {
            newtext += "\n";
        }
        
        newtext += content;
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Fixed header");
        }
    };
};
