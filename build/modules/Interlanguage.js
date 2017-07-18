// Generated by CoffeeScript 1.12.7
var Obj,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Obj = require('../../lib.js.generic/dist/Obj');

module.exports.Interlanguage = (function() {
  function Interlanguage(WM) {
    this.WM = WM;
    this.updateLinks = bind(this.updateLinks, this);
    this._collectLinksContinue = bind(this._collectLinksContinue, this);
    this.collectLinks = bind(this.collectLinks, this);
    this.createVisitedLink = bind(this.createVisitedLink, this);
    this.createNewLink = bind(this.createNewLink, this);
    this.queryLinks = bind(this.queryLinks, this);
    this.parseLinks = bind(this.parseLinks, this);
  }

  Interlanguage.prototype.parseLinks = function(supportedLangs, source, iwmap) {
    var i, iw, j, langlinks, len, len1, link, ltag, ltitle, lurl, parsedLinks;
    parsedLinks = this.WM.Parser.findSpecialLinks(source, supportedLangs.join("|"));
    langlinks = [];
    for (i = 0, len = parsedLinks.length; i < len; i++) {
      link = parsedLinks[i];
      ltag = link.namespace;
      ltitle = link.title + (link.fragment ? "#" + link.fragment : "");
      for (j = 0, len1 = iwmap.length; j < len1; j++) {
        iw = iwmap[j];
        if (iw.prefix.toLowerCase() === ltag.toLowerCase()) {
          lurl = this.WM.MW.fixInterwikiUrl(iw.url);
          lurl = lurl.replace("$1", encodeURIComponent(this.WM.Parser.squashContiguousWhitespace(ltitle)));
          break;
        }
      }
      langlinks.push({
        lang: ltag,
        title: ltitle,
        url: lurl,
        index: link.index,
        length: link.length
      });
    }
    return langlinks;
  };

  Interlanguage.prototype.queryLinks = function(api, queryTitle, title, supportedLangs, whitelist, firstPage, callEnd, callArgs) {
    var query;
    query = {
      action: "query",
      prop: "info|revisions",
      rvprop: "content|timestamp",
      intoken: "edit",
      titles: queryTitle,
      meta: "siteinfo",
      siprop: "interwikimap",
      sifilteriw: "local"
    };
    if (!firstPage) {
      query.redirects = "1";
    }
    return this.WM.MW.callAPIGet(query, api, (function(_this) {
      return function(res, args) {
        var edittoken, error, iwmap, langlinks, page, source, timestamp;
        if (res.query.pages) {
          page = Obj.getFirstItem(res.query.pages);
          if (page.revisions) {
            error = null;
            source = page.revisions[0]["*"];
            timestamp = page.revisions[0].timestamp;
            edittoken = page.edittoken;
            iwmap = res.query.interwikimap;
            langlinks = _this.WM.Interlanguage.parseLinks(supportedLangs, source, iwmap);
          } else {
            error = 'nonexisting';
            source = false;
            timestamp = false;
            edittoken = false;
            iwmap = res.query.interwikimap;
            langlinks = false;
          }
        } else if (res.query.redirects) {
          error = 'unsolvedredirect';
          source = false;
          timestamp = false;
          edittoken = false;
          iwmap = res.query.interwikimap;
          langlinks = false;
        } else {
          error = 'unknown';
          source = false;
          timestamp = false;
          edittoken = false;
          iwmap = res.query.interwikimap;
          langlinks = false;
        }
        return callEnd(api, title, supportedLangs, whitelist, false, error, langlinks, iwmap, source, timestamp, edittoken, args);
      };
    })(this), callArgs, function(args) {
      return callEnd(api, title, supportedLangs, whitelist, false, 'unknown', false, false, false, false, false, args);
    });
  };

  Interlanguage.prototype.createNewLink = function(origTag, title, url) {
    return {
      origTag: origTag,
      title: title,
      url: url
    };
  };

  Interlanguage.prototype.createVisitedLink = function(origTag, title, url, iwmap, api, source, timestamp, edittoken, links) {
    var entry, i, len, link;
    entry = {
      origTag: origTag,
      title: title,
      url: url,
      iwmap: iwmap,
      api: api,
      source: source,
      timestamp: timestamp,
      edittoken: edittoken,
      links: []
    };
    for (i = 0, len = links.length; i < len; i++) {
      link = links[i];
      entry.links.push(link);
    }
    return entry;
  };

  Interlanguage.prototype.collectLinks = function(visitedlinks, newlinks, supportedLangs, whitelist, firstPage, callEnd, callArgs) {
    var api, link, origTag, queryTitle, tag, title, url;
    for (tag in newlinks) {
      link = newlinks[tag];
      break;
    }
    if (link) {
      delete newlinks[tag];
      url = link.url;
      queryTitle = decodeURIComponent(this.WM.MW.getTitleFromWikiUrl(url));
      if (queryTitle) {
        origTag = link.origTag;
        title = link.title;
        api = this.WM.MW.getWikiUrls(url).api;
        if (firstPage || whitelist.indexOf(tag) > -1) {
          this.WM.Log.logInfo("Reading " + this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " ...");
          return this.queryLinks(api, queryTitle, title, supportedLangs, whitelist, firstPage, this.WM.Interlanguage._collectLinksContinue, [url, tag, origTag, visitedlinks, newlinks, callEnd, callArgs]);
        } else {
          return this.WM.Interlanguage._collectLinksContinue(api, title, supportedLangs, whitelist, firstPage, 'notinwhitelist', null, false, null, null, null, [url, tag, origTag, visitedlinks, newlinks, callEnd, callArgs]);
        }
      } else {
        this.WM.Log.logWarning("Cannot extract the page title from " + this.WM.Log.linkToPage(url, decodeURI(url)) + ", removing it if it was linked from the processed article");
        return this.WM.Interlanguage.collectLinks(visitedlinks, newlinks, supportedLangs, whitelist, firstPage, callEnd, callArgs);
      }
    } else {
      return callEnd(visitedlinks, callArgs);
    }
  };

  Interlanguage.prototype._collectLinksContinue = function(api, title, supportedLangs, whitelist, firstPage, error, langlinks, iwmap, source, timestamp, edittoken, args) {
    var callArgs, callEnd, i, len, link, newlinks, nlink, origTag, tag, url, visitedlinks, vlink;
    url = args[0];
    tag = args[1];
    origTag = args[2];
    visitedlinks = args[3];
    newlinks = args[4];
    callEnd = args[5];
    callArgs = args[6];
    if (error === 'nonexisting') {
      this.WM.Log.logWarning(this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " seems to point to a non-existing article: removing it if it was linked from the processed article");
    } else {
      if (error === 'unsolvedredirect') {
        this.WM.Log.logWarning(this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " will not be checked because it points to an external redirect");
      } else if (error === 'unknown') {
        this.WM.Log.logWarning(this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " will not be checked because of an unspecified problem");
      } else if (error === 'notinwhitelist') {
        this.WM.Log.logWarning(this.WM.Log.linkToPage(url, "[[" + origTag + ":" + title + "]]") + " will not be checked because " + tag + " is not included in the whitelist defined in the configuration");
      }
      visitedlinks[tag] = this.WM.Interlanguage.createVisitedLink(origTag, title, url, iwmap, api, source, timestamp, edittoken, langlinks);
      for (i = 0, len = langlinks.length; i < len; i++) {
        link = langlinks[i];
        nlink = newlinks[link.lang.toLowerCase()];
        vlink = visitedlinks[link.lang.toLowerCase()];
        if (!vlink && !nlink) {
          newlinks[link.lang.toLowerCase()] = this.WM.Interlanguage.createNewLink(link.lang, link.title, link.url);
        } else if (vlink && vlink.url !== link.url) {
          this.WM.Log.logWarning("Possibly conflicting interlanguage links: " + this.WM.Log.linkToPage(link.url, "[[" + link.lang + ":" + link.title + "]]") + " and " + this.WM.Log.linkToPage(vlink.url, "[[" + link.lang + ":" + visitedlinks[link.lang.toLowerCase()].title + "]]"));
        } else if (nlink && nlink.url !== link.url) {
          this.WM.Log.logWarning("Possibly conflicting interlanguage links: " + this.WM.Log.linkToPage(link.url, "[[" + link.lang + ":" + link.title + "]]") + " and " + this.WM.Log.linkToPage(nlink.url, "[[" + link.lang + ":" + newlinks[link.lang.toLowerCase()].title + "]]"));
        }
      }
    }
    return this.WM.Interlanguage.collectLinks(visitedlinks, newlinks, supportedLangs, whitelist, firstPage, callEnd, callArgs);
  };

  Interlanguage.prototype.updateLinks = function(lang, url, iwmap, source, oldlinks, newlinks) {
    var body, cleanText, firstLink, head, i, iw, j, len, len1, link, linkList, links, parts, tag, tagFound, textId, trailws;
    lang = lang.toLowerCase();
    linkList = [];
    for (tag in newlinks) {
      if (tag !== lang) {
        link = newlinks[tag];
        tagFound = false;
        for (i = 0, len = iwmap.length; i < len; i++) {
          iw = iwmap[i];
          if (iw.prefix.toLowerCase() === tag.toLowerCase()) {
            if (this.WM.MW.getWikiUrls(iw.url).api === link.api) {
              linkList.push("[[" + link.origTag + ":" + link.title + "]]");
            } else {
              this.WM.Log.logWarning("On " + this.WM.Log.linkToPage(url, "[[" + link.origTag + ":" + link.title + "]]") + " , " + tag + " interlanguage links point to a different wiki than the others, ignoring them");
            }
            tagFound = true;
            break;
          }
        }
        if (!tagFound) {
          this.WM.Log.logWarning(tag + " interlanguage links are not supported in " + this.WM.Log.linkToPage(url, "[[" + link.origTag + ":" + link.title + "]]") + " , ignoring them");
        }
      }
    }
    linkList.sort(function(a, b) {
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
      if (b.toLowerCase() > a.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
    cleanText = "";
    textId = 0;
    for (j = 0, len1 = oldlinks.length; j < len1; j++) {
      link = oldlinks[j];
      cleanText += source.substring(textId, link.index);
      textId = link.index + link.length;
    }
    cleanText += source.substring(textId);
    if (oldlinks.length) {
      firstLink = oldlinks[0].index;
    } else {
      firstLink = 0;
    }
    parts = [];
    head = cleanText.substring(0, firstLink).trim();
    if (head) {
      parts.push(head);
    }
    links = linkList.join("\n");
    if (links) {
      parts.push(links);
    }
    body = cleanText.substr(firstLink).trim();
    if (body) {
      parts.push(body);
    }
    trailws = /\s*$/;
    return parts.join("\n") + trailws.exec(source);
  };

  return Interlanguage;

})();