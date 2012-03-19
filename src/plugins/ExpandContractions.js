WM.Plugins.ExpandContractions = new function () {
    var replace = function (source, regExp, newString, checkRegExp, checkString, checkStrings) {
        var newtext = source.replace(regExp, newString);
        if (checkStrings.length > 1 && newtext != source) {
            WM.Log.logWarning("Replaced some \"" + checkString + "\" with \"" + checkStrings[0] + "\": check that it didn't mean \"" + checkStrings.slice(1).join("\" or \"") + "\" instead");
        }
        var check = newtext.match(checkRegExp);
        if (check) {
            WM.Log.logWarning("Couldn't replace " + check.length + " instances of \"" + checkString + "\": check if they can be replaced with \"" + checkStrings.join("\" or \"") + "\"");
        }
        return newtext;
    };
    
    this.main = function (args) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        // Ignoring "I" since writing in 1st person isn't formal anyway
        // Note that JavaScript doesn't support look behind :(
        // Pay attention to preserve the original capitalization
        
        newtext = replace(newtext, /([a-z])'re/ig, '$1 are', /'re/ig, "'re", ["are"]);
        newtext = replace(newtext, /([a-z])'ve/ig, '$1 have', /'ve/ig, "'ve", ["have"]);
        newtext = replace(newtext, /([a-z])'ll/ig, '$1 will', /'ll/ig, "'ll", ["will", "shall"]);
        newtext = replace(newtext, /([a-z])'d/ig, '$1 would', /'d/ig, "'d", ["would", "had"]);
        newtext = replace(newtext, /(c)an't/ig, '$1annot', /can't/ig, "can't", ["cannot"]);
        newtext = replace(newtext, /(w)on't/ig, '$1ill not', /won't/ig, "won't", ["will not"]);
        newtext = replace(newtext, /([a-z])n't/ig, '$1 not', /n't/ig, "n't", ["not"]);
        newtext = replace(newtext, /(here|there)'s/ig, '$1 is', /(here|there)'s/ig, "here/there's", ["here/there is", "here/there has"]);
        // Replacing he's, she's, that's, what's, where's, who's ... may be too dangerous
        newtext = replace(newtext, /(let)'s/ig, '$1 us', /let's/ig, "let's", ["let us"]);
        
        var ss = newtext.match(/'s/gi);
        if (ss) {
            WM.Log.logWarning("Found " + ss.length + " instances of \"'s\": check if they can be replaced with \"is\", \"has\", ...");
        }
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Expanded contractions");
        }
    };
};
