WM.Plugins.ArchWikiNewTemplates = new function () {
    this.main = function (args, callNext) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        var re8 = /<pre>(((?!<(pre|nowiki)>)[^\=\|])*?((?!<(pre|nowiki)>)[^\=\|\}]))<\/pre>/ig;
        var re9 = /<pre>(((?!<(pre|nowiki)>)[^\|])*?((?!<(pre|nowiki)>)[^\|\}]))<\/pre>/ig;
        var re10 = /<pre>(\n*((?!<(pre|nowiki)>).\n*)+?)<\/pre>/ig;
        
        var re11 = /<code>(((?!<(code|nowiki)>)[^\=\|\n])*?((?!<(code|nowiki)>)[^\=\|\}\n]))<\/code>/ig;
        var re12 = /<code>(((?!<(code|nowiki)>)[^\|\n])*?((?!<(code|nowiki)>)[^\|\}\n]))<\/code>/ig;
        var re13 = /<code>(((?!<(code|nowiki)>)[^\n])+?)<\/code>/ig;
        
        var re14 = /<tt>(((?!<(tt|nowiki)>)[^\=\|\n])*?((?!<(tt|nowiki)>)[^\=\|\}\n]))<\/tt>/ig;
        var re15 = /<tt>(((?!<(tt|nowiki)>)[^\|\n])*?((?!<(tt|nowiki)>)[^\|\}\n]))<\/tt>/ig;
        var re16 = /<tt>(((?!<(tt|nowiki)>)[^\n])+?)<\/tt>/ig;
        
        newtext = newtext.replace(re8, '{{bc|$1}}');
        newtext = newtext.replace(re9, '{{bc|1=$1}}'); // Must come after re8
        newtext = newtext.replace(re10, '{{bc|<nowiki>$1</nowiki>}}'); // Must come after re9
        
        newtext = newtext.replace(re11, '{{ic|$1}}');
        newtext = newtext.replace(re12, '{{ic|1=$1}}'); // Must come after re11
        newtext = newtext.replace(re13, '{{ic|<nowiki>$1</nowiki>}}'); // Must come after re12
        
        newtext = newtext.replace(re14, '{{ic|$1}}');
        newtext = newtext.replace(re15, '{{ic|1=$1}}'); // Must come after re14
        newtext = newtext.replace(re16, '{{ic|<nowiki>$1</nowiki>}}'); // Must come after re15
        
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Turned HTML tags into proper templates");
        }
        
        var tests = [
            ['&lt;pre>', newtext.match(/<pre/ig)],
            ['&lt;code>', newtext.match(/<code/ig)],
            ['&lt;tt>', newtext.match(/<tt/ig)]
        ];
        
        for (var test in tests) { 
            if (tests[test][1]) {
                WM.Log.logWarning(tests[test][1].length + ' ' + tests[test][0] + ' instances require manual intervention');
            }
        }
        
        if (callNext) {
            callNext();
        }
    };
};