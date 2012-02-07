WM.Plugins.ExpandContractions = new function () {
    this.main = function (args) {
        var s = WM.Editor.readSource();
        var original = s;
        
        // Note that 's and 'd are ambiguous
        // Note that JavaScript doesn't support look behind :(
        s = s.replace(/(you|we|they)'re/ig, '$1 are');
        s = s.replace(/(you|we|they)'ve/ig, '$1 have');
        s = s.replace(/(is|are|have|has|do|does)n't/ig, '$1 not');
        s = s.replace(/can't/ig, 'cannot');
        
        WM.Editor.writeSource(s);
        
        if (s != original) {
            WM.Log.logInfo("Expanded contractions");
        }
    };
};
