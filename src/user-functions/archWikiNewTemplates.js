function UF_archWikiNewTemplates() {
    var s = readSource();
    
    var re1 = /\{\{ *(?:[Cc]odeline|[Ff]ilename) *\|([^\|\=\{\n]+?)\}\}/g;
    var re2 = /\{\{ *[Cc]li *\|([^\|\=\{]+?)\}\}/g;
    var re3 = /\{\{ *[Cc]ommand *\|(?: *(?:command|name) *\=)?([^\|\=\{]+?)\|(?: *output *\=)?([^\|\=\{]+?)\| *prompt *\= *([\$#]) *\}\}/g;
    var re4 = /\{\{ *[Cc]ommand *\| *prompt *\= *([\$#]) *\|(?: *(?:command|name) *\=)?([^\|\=\{]+?)\|(?: *output *\=)?([^\|\=\{]+?)\}\}/g;
    var re5 = /\{\{ *[Cc]ommand *\|(?: *(?:command|name) *\=)?([^\|\=\{]+?)\|(?: *output *\=)?([^\|\=\{]+?)\}\}/g;
    var re6 = /\{\{ *[Ff]ile *\|(?: *name *\=)?([^\|\=\{]+?)\|(?: *content *\=)?([^\|\=\{]+?)\}\}/g;
    var re7 = /&lt;pre&gt;([^\|\=\{]+?)&lt;\/pre&gt;/g;
    var re8 = /&lt;code&gt;([^\|\=\{\n]+?)&lt;\/code&gt;/g;
    var re9 = /&lt;tt&gt;([^\|\=\{\n]+?)&lt;\/tt&gt;/g;
    var re10 = /\{\{ *[Pp]ackage Official *\|([^\|\=\{\n]+?)\}\}/g;
    var re11 = /\{\{ *[Pp]ackage AUR *\|([^\|\=\{\n]+?)\}\}/g;
    
    s = s.replace(re1, '{{ic|$1}}');
    s = s.replace(re2, '{{bc|$1}}');
    s = s.replace(re3, '{{hc|$3 $1|$2}}');
    s = s.replace(re4, '{{hc|$1 $2|$3}}');
    s = s.replace(re5, '{{hc|\$ $1|$2}}');
    s = s.replace(re6, '{{hc|$1|$2}}');
    s = s.replace(re7, '{{bc|$1}}');
    s = s.replace(re8, '{{ic|$1}}');
    s = s.replace(re9, '{{ic|$1}}');
    s = s.replace(re10, '{{Pkg|$1}}');
    s = s.replace(re11, '{{AUR|$1}}');
    
    writeSource(s);
    
    var tests = new Array();
    tests[0] = s.match(/\{\{ *[Cc]odeline/g);
    tests[1] = s.match(/\{\{ *[Ff]ilename/g);
    tests[2] = s.match(/\{\{ *[Cc]li/g);
    tests[3] = s.match(/\{\{ *[Ff]ile(?!name)/g);
    tests[4] = s.match(/\{\{ *[Cc]ommand/g);
    tests[5] = s.match(/&lt;pre/g);
    tests[6] = s.match(/&lt;code/g);
    tests[7] = s.match(/&lt;tt/g);
    tests[8] = s.match(/\{\{ *[Pp]ackage Official/g);
    tests[9] = s.match(/\{\{ *[Pp]ackage AUR/g);
        
    var ab = false;
    for each (var test in tests) 
        if (test)
            ab = true;
    
    if (ab) {
        alert('Migration to new templates:\n' +
              ((tests[0]) ? (tests[0].length + ' Codeline instances\n') : '') +
              ((tests[1]) ? (tests[1].length + ' Filename instances\n') : '') +
              ((tests[2]) ? (tests[2].length + ' Cli instances\n') : '') +
              ((tests[3]) ? (tests[3].length + ' File instances\n') : '') +
              ((tests[4]) ? (tests[4].length + ' Command instances\n') : '') +
              ((tests[5]) ? (tests[5].length + ' <pre> instances\n') : '') +
              ((tests[6]) ? (tests[6].length + ' <code> instances\n') : '') +
              ((tests[7]) ? (tests[7].length + ' <tt> instances\n') : '') +
              ((tests[8]) ? (tests[8].length + ' Package Official instances\n') : '') +
              ((tests[9]) ? (tests[9].length + ' Package AUR instances\n') : '') +
              'require manual intervention.');
    }
}
