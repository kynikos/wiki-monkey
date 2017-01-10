// Generated by CoffeeScript 1.12.2
var CSS, HTTP,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CSS = require('../../lib.js.generic/dist/CSS');

HTTP = require('../../lib.js.generic/dist/HTTP');

module.exports.ArchWikiQuickReport = (function() {
  ArchWikiQuickReport.REQUIRES_GM = false;

  function ArchWikiQuickReport(WM) {
    this.WM = WM;
    this.mainEnd = bind(this.mainEnd, this);
    this.mainWrite = bind(this.mainWrite, this);
    this.mainGetEndTimestamp = bind(this.mainGetEndTimestamp, this);
  }

  ArchWikiQuickReport.prototype.makeUI = function(args) {
    var article, i, input, len, link, option, select, span, types, value;
    CSS.addStyleElement("#WikiMonkey-ArchWikiQuickReport > select, #WikiMonkey-ArchWikiQuickReport > input, #WikiMonkey-ArchWikiQuickReport > a {margin-left:0.33em;}");
    article = args[0];
    select = document.createElement('select');
    types = ["&lt;TYPE&gt;", "content", "style"];
    for (i = 0, len = types.length; i < len; i++) {
      value = types[i];
      option = document.createElement('option');
      option.setAttribute('value', value);
      option.innerHTML = value;
      select.appendChild(option);
    }
    select.id = "WikiMonkey-ArchWikiQuickReport-select";
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.id = "WikiMonkey-ArchWikiQuickReport-input";
    link = document.createElement('a');
    link.href = "/index.php/" + article;
    link.innerHTML = article;
    span = document.createElement('span');
    span.id = "WikiMonkey-ArchWikiQuickReport";
    span.appendChild(select);
    span.appendChild(input);
    span.appendChild(link);
    return span;
  };

  ArchWikiQuickReport.prototype.main = function(args, callNext) {
    var article, select, summary, type;
    article = args[0];
    summary = args[1];
    this.WM.Log.logInfo('Appending diff to ' + this.WM.Log.linkToWikiPage(article, article) + " ...");
    select = document.getElementById("WikiMonkey-ArchWikiQuickReport-select");
    type = select.options[select.selectedIndex].value;
    if (type !== 'content' && type !== 'style') {
      return this.WM.Log.logError('Select a valid report type');
    } else {
      return this.WM.Diff.getEndTimestamp(this.mainGetEndTimestamp, [article, type, summary, callNext]);
    }
  };

  ArchWikiQuickReport.prototype.mainGetEndTimestamp = function(enddate, args) {
    var article, callNext, summary, type;
    article = args[0];
    type = args[1];
    summary = args[2];
    callNext = args[3];
    return this.WM.MW.callQueryEdit(article, this.mainWrite, [type, summary, enddate, callNext]);
  };

  ArchWikiQuickReport.prototype.mainWrite = function(article, source, timestamp, edittoken, args) {
    var callNext, enddate, expsummary, newtext, notes, pEnddate, summary, title, type;
    type = args[0];
    summary = args[1];
    enddate = args[2];
    callNext = args[3];
    title = HTTP.getURIParameter(null, 'title');
    pEnddate = enddate.substr(0, 10) + "&nbsp;" + enddate.substr(11, 8);
    notes = document.getElementById("WikiMonkey-ArchWikiQuickReport-input").value;
    newtext = this.WM.Tables.appendRow(source, null, ["[" + location.href + " " + title + "]", pEnddate, type, notes]);
    expsummary = summary.replace(/(^|[^%])(%%)*%t/g, '$1$2[[' + title + ']]');
    expsummary = expsummary.replace(/%(.)/g, '$1');
    return this.WM.MW.callAPIPost({
      action: "edit",
      bot: "1",
      title: article,
      summary: expsummary,
      text: newtext,
      basetimestamp: timestamp,
      token: edittoken
    }, null, this.mainEnd, [article, callNext], null);
  };

  ArchWikiQuickReport.prototype.mainEnd = function(res, args) {
    var article, callNext;
    article = args[0];
    callNext = args[1];
    if (res.edit && res.edit.result === 'Success') {
      this.WM.Log.logInfo('Diff correctly appended to ' + this.WM.Log.linkToWikiPage(article, article));
      if (callNext) {
        return callNext();
      }
    } else {
      return this.WM.Log.logError('The diff has not been appended!\n' + res['error']['info'] + " (" + res['error']['code'] + ")");
    }
  };

  return ArchWikiQuickReport;

})();
