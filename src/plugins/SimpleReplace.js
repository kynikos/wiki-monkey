WM.Plugins.SimpleReplace = new function () {
    this.makeUI = function (args) {
        var id = args[0];
        
        GM_addStyle("#WikiMonkey-SimpleReplace input[type='text'] {margin-left:0.33em;} " +
                    "#WikiMonkey-SimpleReplace span:nth-of-type(2) {margin-right:2em;}");
        
        var divMain = document.createElement('div');
        divMain.id = "WikiMonkey-SimpleReplace";
        
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
        
        var newStringLabel = document.createElement('span');
        newStringLabel.innerHTML = 'New string:';
        
        var newString = document.createElement('input');
        newString.setAttribute('type', 'text');
        newString.id = "WikiMonkey-SimpleReplace-NewString-" + id;
        
        divMain.appendChild(regexpLabel);
        divMain.appendChild(regexp);
        divMain.appendChild(ignoreCase);
        divMain.appendChild(ignoreCaseLabel);
        divMain.appendChild(newStringLabel);
        divMain.appendChild(newString);
        
        return divMain;
    };
    
    this.mainAuto = function (args, title) {
        // ***********************************************************************
        WM.Log.logDebug("PROCESS THE ARTICLE");  // ******************************
    };
    
    this.main = function (args) {
        // ***********************************************************************
    };
};
