function UF_archWikiNewTemplates() {
    var s = readSource();
    
    var re1 = /\{\{ *(?:[Cc]odeline|[Ff]ilename) *\|/g;
    
    var re3 = /\{\{ *[Ff]ile\s*\|(?: *(?:name|1) *\=)?(\n*(?:(?!\{\{|\||&lt;[Nn][Oo][Ww][Ii][Kk][Ii]&gt;|\=).\n*)+?)\|(?: *(?:content|2) *\=)?(\n*(?:(?!\{\{|\=).\n*)*?)\}\}/g;
    var re4 = /\{\{ *[Ff]ile\s*\|(?: *(?:name|1) *\=)?(\n*(?:(?!\{\{|\||&lt;[Nn][Oo][Ww][Ii][Kk][Ii]&gt;|\=).\n*)+?)\|(?: *(?:content|2) *\=)?(\n*(?:(?!\{\{).\n*)*?)\}\}/g;
    var re5 = /\{\{ *[Ff]ile\s*\|(?: *(?:name|1) *\=)?(\n*(?:(?!\{\{|\||&lt;[Nn][Oo][Ww][Ii][Kk][Ii]&gt;).\n*)+?)\|(?: *(?:content|2) *\=)?(\n*(?:(?!\{\{).\n*)*?)\}\}/g;
    
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
    
    s = s.replace(re3, '{{hc|$1|$2}}');
    // Note the {{hc|1=$1|$2}} case is impossible
    s = s.replace(re4, '{{hc|$1|2=$2}}'); // Must come after re3
    s = s.replace(re5, '{{hc|1=$1|2=$2}}'); // Must come after re4
    
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
    
    writeSource(s);
    
    var tests = new Array();
    tests[0] = s.match(/\{\{ *[Cc]odeline/g);
    tests[1] = s.match(/\{\{ *[Ff]ilename/g);
    tests[2] = s.match(/\{\{ *[Ff]ile(?!name)/g);
    tests[3] = s.match(/&lt;pre/ig);
    tests[4] = s.match(/&lt;code/ig);
    tests[5] = s.match(/&lt;tt/ig);
    tests[6] = s.match(/\{\{ *[Pp]ackage Official/g);
    tests[7] = s.match(/\{\{ *[Pp]ackage AUR/g);
        
    var ab = false;
    for each (var test in tests) { 
        if (test) {
            ab = true;
            break;
        }
    }
    
    if (ab) {
        alert('Migration to new templates:\n' +
              ((tests[0]) ? (tests[0].length + ' Codeline instances\n') : '') +
              ((tests[1]) ? (tests[1].length + ' Filename instances\n') : '') +
              ((tests[2]) ? (tests[2].length + ' File instances\n') : '') +
              ((tests[3]) ? (tests[3].length + ' <pre> instances\n') : '') +
              ((tests[4]) ? (tests[4].length + ' <code> instances\n') : '') +
              ((tests[5]) ? (tests[5].length + ' <tt> instances\n') : '') +
              ((tests[6]) ? (tests[6].length + ' Package Official instances\n') : '') +
              ((tests[7]) ? (tests[7].length + ' Package AUR instances\n') : '') +
              'require manual intervention.');
    }
}
