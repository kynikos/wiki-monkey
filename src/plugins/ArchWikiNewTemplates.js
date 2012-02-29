WM.Plugins.ArchWikiNewTemplates = new function () {
    this.main = function (args) {
        var source = WM.Editor.readSource();
        var newtext = source;
        
        var re8 = /&lt;pre&gt;(((?!&lt;(pre|nowiki)&gt;)[^\=\|])*?((?!&lt;(pre|nowiki)&gt;)[^\=\|\}]))&lt;\/pre&gt;/ig;
        var re9 = /&lt;pre&gt;(((?!&lt;(pre|nowiki)&gt;)[^\|])*?((?!&lt;(pre|nowiki)&gt;)[^\|\}]))&lt;\/pre&gt;/ig;
        var re10 = /&lt;pre&gt;(\n*((?!&lt;(pre|nowiki)&gt;).\n*)+?)&lt;\/pre&gt;/ig;
        
        var re11 = /&lt;code&gt;(((?!&lt;(code|nowiki)&gt;)[^\=\|\n])*?((?!&lt;(code|nowiki)&gt;)[^\=\|\}\n]))&lt;\/code&gt;/ig;
        var re12 = /&lt;code&gt;(((?!&lt;(code|nowiki)&gt;)[^\|\n])*?((?!&lt;(code|nowiki)&gt;)[^\|\}\n]))&lt;\/code&gt;/ig;
        var re13 = /&lt;code&gt;(((?!&lt;(code|nowiki)&gt;)[^\n])+?)&lt;\/code&gt;/ig;
        
        var re14 = /&lt;tt&gt;(((?!&lt;(tt|nowiki)&gt;)[^\=\|\n])*?((?!&lt;(tt|nowiki)&gt;)[^\=\|\}\n]))&lt;\/tt&gt;/ig;
        var re15 = /&lt;tt&gt;(((?!&lt;(tt|nowiki)&gt;)[^\|\n])*?((?!&lt;(tt|nowiki)&gt;)[^\|\}\n]))&lt;\/tt&gt;/ig;
        var re16 = /&lt;tt&gt;(((?!&lt;(tt|nowiki)&gt;)[^\n])+?)&lt;\/tt&gt;/ig;
        
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
            ['&lt;pre>', newtext.match(/&lt;pre/ig)],
            ['&lt;code>', newtext.match(/&lt;code/ig)],
            ['&lt;tt>', newtext.match(/&lt;tt/ig)]
        ];
        
        for each (var test in tests) { 
            if (test[1]) {
                WM.Log.logWarning(test[1].length + ' ' + test[0] + ' instances require manual intervention');
            }
        }
    };
};
