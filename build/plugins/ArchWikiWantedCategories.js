// Generated by CoffeeScript 1.12.2
module.exports.ArchWikiWantedCategories = (function() {
  ArchWikiWantedCategories.REQUIRES_GM = false;

  function ArchWikiWantedCategories(WM) {
    this.WM = WM;
  }

  ArchWikiWantedCategories.prototype.mainAuto = function(args, title, callBot, chainArgs) {
    title = title.replace(" (page does not exist)", "");
    return this.WM.MW.callQuery({
      prop: "info",
      intoken: "edit",
      titles: title
    }, this.mainAutoWrite, [title, callBot], null);
  };

  ArchWikiWantedCategories.prototype.mainAutoWrite = function(page, args) {
    var callBot, edittoken, language, summary, text, title;
    title = args[0];
    callBot = args[1];
    edittoken = page.edittoken;
    language = this.WM.ArchWiki.detectLanguage(title)[1];
    if (language !== this.WM.ArchWiki.getLocalLanguage()) {
      text = "[[Category:" + language + "]]";
      summary = "wanted category";
      return this.WM.MW.callAPIPost({
        action: "edit",
        bot: "1",
        title: title,
        summary: summary,
        text: text,
        createonly: "1",
        token: edittoken
      }, null, this.mainAutoEnd, callBot, null);
    } else {
      return callBot(0, null);
    }
  };

  ArchWikiWantedCategories.prototype.mainAutoEnd = function(res, callBot) {
    if (res.edit && res.edit.result === 'Success') {
      return callBot(1, null);
    } else if (res.error) {
      this.WM.Log.logError(res.error.info + " (" + res.error.code + ")");
      return callBot(res.error.code, null);
    } else {
      return callBot(false, null);
    }
  };

  return ArchWikiWantedCategories;

})();
