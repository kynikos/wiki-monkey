WM.Plugins.ArchWikiTemplateAUR = new function () {
    var doReplace = function (source) {
        var regExp = /\[(https?\:\/\/aur\.archlinux\.org\/packages\.php\?ID\=[0-9]+) ([^\]]+?)\]/g;
        var match, res, page;
        var links = {};
        /*
        while (true) {
            match = regExp.exec(source);
            
            if (match) {
                links[match[0]] = match;
                res = $.ajax({
                    async: false,
                    url: "https://wiki.archlinux.org/index.php/Main_Page",
                    //url: "https://aur.archlinux.org/",
                    //url: match[1],
                    //type: 'GET',
                    //type: 'POST',
                    //dataType: 'html'
                });
                */
                var ret = GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://aur.archlinux.org/",
                    onload: function (res) {
                        //WM.Log.logDebug(JSON.stringify(res.responseText));
                        var parser = new DOMParser();
                        page = parser.parseFromString(res.responseText, "text/xml");
                        //page = $.parseXML(res.responseText);
                        var links = page.getElementsByTagName('a');
                        for (var i = 0; links.length; i++) {
                            WM.Log.logDebug(links[i].innerHTML);  // ****************************************
                        }
                    }
                });
                /*
                var parser = new DOMParser();
                page = parser.parseFromString(res.responseText, "text/xml");
                //page = $.parseXML(res.responseText);
                var nodes = page.childNodes[0].childNodes;
                for (var aaa = 0; nodes.length; aaa++) {
                    WM.Log.logDebug(aaa);  // ****************************************
                }
            }
            else {
                break;
            }
        }*/
        
        var newText = source;
        
        for (var link in links) {
            if (links[link]) {
                //newText = newText.replace(link, links[link]);  // ****************
            }
        }
        
        return newText;
    };
    
    this.main = function (args) {
        var source = WM.Editor.readSource();
        var newtext = doReplace(source);
        if (newtext != source) {
            WM.Editor.writeSource(newtext);
            WM.Log.logInfo("Replaced direct package links");
        }
    };
    
    this.mainAuto = function (args, title) {
        var summary = args[0];
        
        var res = WM.MW.callAPIGet({action: "query",
                                    prop: "info|revisions",
                                    rvprop: "content|timestamp",
                                    intoken: "edit",
                                    titles: encodeURIComponent(title)});
        var pages = res.query.pages;
        
        var pageid;
        for each (pageid in pages) {
            break;
        }
        
        var edittoken = pageid.edittoken;
        var timestamp = pageid.revisions[0].timestamp;
        var source = pageid.revisions[0]["*"];
        
        var newtext = doReplace(source);
        
        if (newtext != source) {
            res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(title),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(newtext),
                                     basetimestamp: timestamp,
                                     token: encodeURIComponent(edittoken)});
        
            return (res.edit && res.edit.result == 'Success') ? true : false;
        }
        else {
            return true;
        }
    };
};
