WM.Plugins.ArchWikiWantedCategories = new function () {
    this.mainAuto = function (args, title, callBot, chainArgs) {
        title = title.replace(" (page does not exist)", "");

        WM.MW.callQuery({prop: "info",
                         intoken: "edit",
                         titles: title},
                         WM.Plugins.ArchWikiWantedCategories.mainAutoWrite,
                         [title, callBot]);
    };

    this.mainAutoWrite = function (page, args) {
        var title = args[0];
        var callBot = args[1];

        var edittoken = page.edittoken;

        var language = WM.ArchWiki.detectLanguage(title)[1];

        if (language != WM.ArchWiki.getLocalLanguage()) {
            var text = "[[Category:" + language + "]]";
            var summary = "wanted category";

            WM.MW.callAPIPost({action: "edit",
                               bot: "1",
                               title: title,
                               summary: summary,
                               text: text,
                               createonly: "1",
                               token: edittoken},
                               null,
                               WM.Plugins.ArchWikiWantedCategories.mainAutoEnd,
                               callBot);
        }
        else {
            callBot(0, null);
        }
    };

    this.mainAutoEnd = function (res, callBot) {
        if (res.edit && res.edit.result == 'Success') {
            callBot(1, null);
        }
        else {
            WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
            callBot(false, null);
        }
    };
};
