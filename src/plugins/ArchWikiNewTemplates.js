WM.Plugins.ArchWikiNewTemplates = new function () {
    this.main = function (args) {
        var s = WM.Editor.readSource();
        var original = s;
        
        var re1 = /\{\{ *(?:[Cc]odeline|[Ff]ilename) *\|/g;
        
        var re8 = /&lt;pre&gt;(((?!&lt;(pre|nowiki)&gt;)[^\=\|])*?((?!&lt;(pre|nowiki)&gt;)[^\=\|\}]))&lt;\/pre&gt;/ig;
        var re9 = /&lt;pre&gt;(((?!&lt;(pre|nowiki)&gt;)[^\|])*?((?!&lt;(pre|nowiki)&gt;)[^\|\}]))&lt;\/pre&gt;/ig;
        var re10 = /&lt;pre&gt;(\n*((?!&lt;(pre|nowiki)&gt;).\n*)+?)&lt;\/pre&gt;/ig;
        
        var re11 = /&lt;code&gt;(((?!&lt;(code|nowiki)&gt;)[^\=\|\n])*?((?!&lt;(code|nowiki)&gt;)[^\=\|\}\n]))&lt;\/code&gt;/ig;
        var re12 = /&lt;code&gt;(((?!&lt;(code|nowiki)&gt;)[^\|\n])*?((?!&lt;(code|nowiki)&gt;)[^\|\}\n]))&lt;\/code&gt;/ig;
        var re13 = /&lt;code&gt;(((?!&lt;(code|nowiki)&gt;)[^\n])+?)&lt;\/code&gt;/ig;
        
        var re14 = /&lt;tt&gt;(((?!&lt;(tt|nowiki)&gt;)[^\=\|\n])*?((?!&lt;(tt|nowiki)&gt;)[^\=\|\}\n]))&lt;\/tt&gt;/ig;
        var re15 = /&lt;tt&gt;(((?!&lt;(tt|nowiki)&gt;)[^\|\n])*?((?!&lt;(tt|nowiki)&gt;)[^\|\}\n]))&lt;\/tt&gt;/ig;
        var re16 = /&lt;tt&gt;(((?!&lt;(tt|nowiki)&gt;)[^\n])+?)&lt;\/tt&gt;/ig;
        
        var re17 = /\{\{ *[Pp]ackage Official *\|/g;
        var re18 = /\{\{ *[Pp]ackage AUR *\|/g;
        
        s = s.replace(re1, '{{ic|');
        
        s = s.replace(re8, '{{bc|$1}}');
        s = s.replace(re9, '{{bc|1=$1}}'); // Must come after re8
        s = s.replace(re10, '{{bc|<nowiki>$1</nowiki>}}'); // Must come after re9
        
        s = s.replace(re11, '{{ic|$1}}');
        s = s.replace(re12, '{{ic|1=$1}}'); // Must come after re11
        s = s.replace(re13, '{{ic|<nowiki>$1</nowiki>}}'); // Must come after re12
        
        s = s.replace(re14, '{{ic|$1}}');
        s = s.replace(re15, '{{ic|1=$1}}'); // Must come after re14
        s = s.replace(re16, '{{ic|<nowiki>$1</nowiki>}}'); // Must come after re15
        
        s = s.replace(re17, '{{Pkg|');
        s = s.replace(re18, '{{AUR|');
        
        WM.Editor.writeSource(s);
        
        if (s != original) {
            WM.Log.logInfo("Updated deprecated templates and HTML tags");
        }
        
        var tests = [
            ['Codeline', s.match(/\{\{ *[Cc]odeline/g)],
            ['Filename', s.match(/\{\{ *[Ff]ilename/g)],
            ['&lt;pre>', s.match(/&lt;pre/ig)],
            ['&lt;code>', s.match(/&lt;code/ig)],
            ['&lt;tt>', s.match(/&lt;tt/ig)],
            ['Package Official', s.match(/\{\{ *[Pp]ackage Official/g)],
            ['Package AUR', s.match(/\{\{ *[Pp]ackage AUR/g)]
        ]
        
        for each (var test in tests) { 
            if (test[1]) {
                WM.Log.logWarning(test[1].length + ' ' + test[0] + ' instances require manual intervention');
            }
        }
    };
};
