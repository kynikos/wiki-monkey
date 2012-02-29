WM.Plugins.ExpandContractions = new function () {
    this.main = function (args) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        // Note that 's and 'd are ambiguous
        // Note that JavaScript doesn't support look behind :(
        // Pay attention to preserve the original capitalization
        newtext = newtext.replace(/(you|we|they)'re/ig, '$1 are');
        newtext = newtext.replace(/(you|we|they)'ve/ig, '$1 have');
        newtext = newtext.replace(/(is|are|have|has|do|does)n't/ig, '$1 not');
        newtext = newtext.replace(/(c)an't/ig, '$1annot');
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Expanded contractions");
        }
    };
};
