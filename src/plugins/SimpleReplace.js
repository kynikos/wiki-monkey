WM.Plugins.SimpleReplace = new function () {
    this.makeUI = function (args) {
        var id = args[0];
        
        GM_addStyle("#WikiMonkey-SimpleReplace {display:inline-block;} " +
                    "#WikiMonkey-SimpleReplace div {display:inline-block; margin-right:2em;} " +
                    "#WikiMonkey-SimpleReplace input[type='text'] {margin-left:0.33em;}");
        
        var divMain = document.createElement('div');
        divMain.id = "WikiMonkey-SimpleReplace";
        
        var par1 = document.createElement('div');
        
        var regexpLabel = document.createElement('span');
        regexpLabel.innerHTML = 'RegExp pattern:';
        
        var regexp = document.createElement('input');
        regexp.setAttribute('type', 'text');
        regexp.id = "WikiMonkey-SimpleReplace-RegExp-" + id;
        
        var ignoreCase = document.createElement('input');
        ignoreCase.setAttribute('type', 'checkbox');
        ignoreCase.id = "WikiMonkey-SimpleReplace-IgnoreCase-" + id;
        
        var ignoreCaseLabel = document.createElement('span');
        ignoreCaseLabel.innerHTML = 'i';
        
        par1.appendChild(regexpLabel);
        par1.appendChild(regexp);
        par1.appendChild(ignoreCase);
        par1.appendChild(ignoreCaseLabel);
        
        var par2 = document.createElement('div');
        
        var newStringLabel = document.createElement('span');
        newStringLabel.innerHTML = 'New string:';
        
        var newString = document.createElement('input');
        newString.setAttribute('type', 'text');
        newString.id = "WikiMonkey-SimpleReplace-NewString-" + id;
        
        par2.appendChild(newStringLabel);
        par2.appendChild(newString);
        
        divMain.appendChild(par1);
        divMain.appendChild(par2);
        
        return divMain;
    };
    
    this.makeBotUI = function (args) {
        var id = args[0];
        
        // this.makeUI doesn't work
        var divMain = WM.Plugins.SimpleReplace.makeUI(args);
        
        var par3 = document.createElement('div');
        
        var summaryLabel = document.createElement('span');
        summaryLabel.innerHTML = 'Edit summary:';
        
        var summary = document.createElement('input');
        summary.setAttribute('type', 'text');
        summary.id = "WikiMonkey-SimpleReplace-Summary-" + id;
        
        par3.appendChild(summaryLabel);
        par3.appendChild(summary);
        
        divMain.appendChild(par3);
        
        return divMain;
    };
    
    var doReplace = function (source, id) {
        var pattern = document.getElementById("WikiMonkey-SimpleReplace-RegExp-" + id).value;
        var ignoreCase = document.getElementById("WikiMonkey-SimpleReplace-IgnoreCase-" + id).checked;
        var newString = document.getElementById("WikiMonkey-SimpleReplace-NewString-" + id).value;
        
        var regexp = new RegExp(pattern, "g" + ((ignoreCase) ? "i" : ""));
        
        return source.replace(regexp, newString);
    };
    
    this.main = function (args) {
        var id = args[0];
        
        var source = WM.Editor.readSource();
        var newtext = doReplace(source, id);
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Text substituted");
        }
    };
    
    this.mainAuto = function (args, title, callBot) {
        var id = args[0];
        
        WM.MW.callQueryEdit(title,
                            WM.Plugins.SimpleReplace.mainAutoWrite,
                            [id, callBot]);
    };
        
    this.mainAutoWrite = function (title, source, timestamp, edittoken, args) {
        var id = args[0];
        var callBot = args[1];
        
        var newtext = doReplace(source, id);
        
        if (newtext != source) {
            var summary = document.getElementById("WikiMonkey-SimpleReplace-Summary-" + id).value;
            
            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: newtext,
                               basetimestamp: timestamp,
                               token: edittoken},
                               WM.Plugins.SimpleReplace.mainAutoEnd,
                               callBot);
        }
        else {
            callBot(true);
        }
    };
    
    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(true);
        }
        else {
            WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
            callBot(false);
        }
    };
};
