WM.Plugins.ArchWikiWantedCategories = new function () {
    this.mainAuto = function (args, title) {
        title = title.replace(" (page does not exist)", "");
        
        var res = WM.MW.callAPIGet({action: "query",
                                    prop: "info",
                                    intoken: "edit",
                                    titles: encodeURIComponent(title)});
        var pages = res.query.pages;
        
        var pageid;
        for each (pageid in pages) {
            break;
        }
        
        var edittoken = pageid.edittoken;
        
        var language = title.match(/^(.+?)([ _]\(([^\(]+)\))?$/)[3];
        
        if (language && WM.ArchWiki.isCategoryLanguage(language)) {
            var text = "[[Category:" + language + "]]";
            var summary = "wanted category";
            
            res = WM.MW.callAPIPost({action: "edit",
                                     bot: "1",
                                     title: encodeURIComponent(title),
                                     summary: encodeURIComponent(summary),
                                     text: encodeURIComponent(text),
                                     createonly: "1",
                                     token: encodeURIComponent(edittoken)});
            
            return (res.edit && res.edit.result == 'Success') ? true : false;
        }
        else {
            return true;
        }
    };
};
