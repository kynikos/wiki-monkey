WM.Plugins.SimpleReplace = new function () {
    this.makeUI = function (args) {
        var id = args[0];
        
        GM_addStyle("#WikiMonkey-SimpleReplace p {display:inline-block; margin-right:2em;} " +
                    "#WikiMonkey-SimpleReplace input[type='text'] {margin-left:0.33em;}");
        
        var divMain = document.createElement('div');
        divMain.id = "WikiMonkey-SimpleReplace";
        
        var par1 = document.createElement('p');
        
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
        
        var par2 = document.createElement('p');
        
        var newStringLabel = document.createElement('span');
        newStringLabel.innerHTML = 'New string:';
        
        var newString = document.createElement('input');
        newString.setAttribute('type', 'text');
        newString.id = "WikiMonkey-SimpleReplace-NewString-" + id;
        
        par2.appendChild(newStringLabel);
        par2.appendChild(newString);
        
        var par3 = document.createElement('p');
        
        var summaryLabel = document.createElement('span');
        summaryLabel.innerHTML = 'Edit summary:';
        
        var summary = document.createElement('input');
        summary.setAttribute('type', 'text');
        summary.id = "WikiMonkey-SimpleReplace-Summary-" + id;
        
        par3.appendChild(summaryLabel);
        par3.appendChild(summary);
        
        divMain.appendChild(par1);
        divMain.appendChild(par2);
        divMain.appendChild(par3);
        
        return divMain;
    };
    
    this.mainAuto = function (args, title) {
        var id = args[0];
        
        xml = WM.MW.callAPIGet(["action=query", "prop=info|revisions",
                                "rvprop=content", "intoken=edit",
                                "titles=" + encodeURIComponent(title)]);
        
        var page = xml.getElementsByTagName('page')[0];
        var rev = xml.getElementsByTagName('rev')[0];
        var edittoken = page.getAttribute('edittoken');
        var timestamp = rev.getAttribute('timestamp');
        
        var source = WM.getLongTextNode(rev);
        var original = source;
        
        var pattern = document.getElementById("WikiMonkey-SimpleReplace-RegExp-" + id).value;
        var ignoreCase = document.getElementById("WikiMonkey-SimpleReplace-IgnoreCase-" + id).checked;
        var newString = document.getElementById("WikiMonkey-SimpleReplace-NewString-" + id).value;
        
        var regexp = new RegExp(pattern, "g" + ((ignoreCase) ? "i" : ""));
        
        var newtext = source.replace(regexp, newString);
        
        if (newtext != original) {
            var summary = document.getElementById("WikiMonkey-SimpleReplace-Summary-" + id).value;
            
            xml = WM.MW.callAPIPost(["action=edit", "bot=1",
                                     "title=" + encodeURIComponent(title),
                                     "summary=" + encodeURIComponent(summary),
                                     "text=" + encodeURIComponent(newtext),
                                     "basetimestamp=" + timestamp,
                                     "token=" + encodeURIComponent(edittoken)]);
            
            var edit = xml.getElementsByTagName('edit')[0];
            return (edit && edit.getAttribute('result') == 'Success') ? true : false;
        }
        else {
            return true;
        }
    };
    
    this.main = function (args) {
        // TODO ******************************************************************
    };
};
