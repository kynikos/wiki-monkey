// Generated by CoffeeScript 1.12.2
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports.ArchWikiSortContacts = (function() {
  var endMark, regExp, startMark;

  ArchWikiSortContacts.REQUIRES_GM = false;

  function ArchWikiSortContacts(WM) {
    this.WM = WM;
    this.writePage = bind(this.writePage, this);
    this.updateList = bind(this.updateList, this);
    this.storeUserContribs = bind(this.storeUserContribs, this);
    this.iterateUsers = bind(this.iterateUsers, this);
    this.parseList = bind(this.parseList, this);
  }

  startMark = "START AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK-->";

  endMark = "<!--END AUTO LIST - DO NOT REMOVE OR MODIFY THIS MARK";

  regExp = new RegExp("^\\*.*?\\[\\[User:(.+?)\\|.+?" + "(?: \\<!-- associated bot: (.+?) -->.*)?$", "");

  ArchWikiSortContacts.prototype.main = function(args, callNext) {
    var inactiveIntro, inactiveLimit, page, recentDays, summary;
    page = args[0];
    recentDays = args[1];
    inactiveLimit = args[2];
    inactiveIntro = args[3];
    summary = args[4];
    this.WM.Log.logInfo("Sorting " + this.WM.Log.linkToWikiPage(page, page) + " ...");
    return this.WM.MW.callQueryEdit(page, this.parseList, [recentDays, inactiveLimit, inactiveIntro, summary, callNext]);
  };

  ArchWikiSortContacts.prototype.parseList = function(title, source, timestamp, edittoken, args) {
    var callNext, date, endList, inactiveIntro, inactiveLimit, recentDays, startList, summary, ucend, ucstart, users, usersArray;
    recentDays = args[0];
    inactiveLimit = args[1];
    inactiveIntro = args[2];
    summary = args[3];
    callNext = args[4];
    startList = source.indexOf(startMark);
    endList = source.indexOf(endMark);
    if (startList > -1 && endList > -1) {
      startList += startMark.length;
      date = new Date();
      ucstart = Math.floor(Date.now() / 1000);
      ucend = ucstart - 86400 * recentDays;
      users = {
        active: [],
        inactive: []
      };
      usersArray = source.substring(startList, endList).split("\n");
      return this.iterateUsers(usersArray, -1, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext);
    } else {
      return this.WM.Log.logError("Cannot find the needed marks");
    }
  };

  ArchWikiSortContacts.prototype.iterateUsers = function(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext) {
    var match, ucuser, userString;
    index++;
    if (index < usersArray.length) {
      userString = usersArray[index];
      match = regExp.exec(userString);
      if (match) {
        ucuser = match[1].charAt(0).toUpperCase() + match[1].substr(1);
        if (match[2]) {
          ucuser += "|" + match[2].charAt(0).toUpperCase() + match[2].substr(1);
        }
        this.WM.Log.logInfo("Querying " + ucuser + " ...");
        return this.WM.MW.getUserContribs(ucuser, ucstart, ucend, this.storeUserContribs, [usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext]);
      } else if (userString !== "" && userString.indexOf(inactiveIntro) !== 0) {
        return this.WM.Log.logError("An entry in the list may not be correctly " + "formatted");
      } else {
        return this.iterateUsers(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext);
      }
    } else {
      return this.updateList(users, title, source, startList, endList, timestamp, edittoken, inactiveIntro, summary, callNext);
    }
  };

  ArchWikiSortContacts.prototype.storeUserContribs = function(results, args) {
    var callNext, edits, edittoken, endList, inactiveIntro, inactiveLimit, index, source, startList, summary, timestamp, title, ucend, ucstart, users, usersArray;
    usersArray = args[0];
    index = args[1];
    ucstart = args[2];
    ucend = args[3];
    users = args[4];
    title = args[5];
    source = args[6];
    startList = args[7];
    endList = args[8];
    timestamp = args[9];
    edittoken = args[10];
    inactiveLimit = args[11];
    inactiveIntro = args[12];
    summary = args[13];
    callNext = args[14];
    edits = results.length;
    if (edits < inactiveLimit) {
      users.inactive.push({
        "text": usersArray[index],
        "edits": edits
      });
    } else {
      users.active.push({
        "text": usersArray[index],
        "edits": edits
      });
    }
    return this.iterateUsers(usersArray, index, ucstart, ucend, users, title, source, startList, endList, timestamp, edittoken, inactiveLimit, inactiveIntro, summary, callNext);
  };

  ArchWikiSortContacts.prototype.updateList = function(users, title, source, startList, endList, timestamp, edittoken, inactiveIntro, summary, callNext) {
    var i, j, len, len1, newList, newText, ref, ref1, sorter, user;
    sorter = function(a, b) {
      if (a.edits < b.edits) {
        return 1;
      } else if (a.edits > b.edits) {
        return -1;
      } else {
        return 0;
      }
    };
    users.active.sort(sorter);
    users.inactive.sort(sorter);
    newList = "\n";
    ref = users.active;
    for (i = 0, len = ref.length; i < len; i++) {
      user = ref[i];
      newList += user.text + "\n";
    }
    if (users.inactive.length > 0) {
      newList += "\n" + inactiveIntro + "\n\n";
      ref1 = users.inactive;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        user = ref1[j];
        newList += user.text + "\n";
      }
    }
    newText = source.substring(0, startList) + newList + source.substring(endList);
    if (newText !== source) {
      return this.WM.MW.callAPIPost({
        action: "edit",
        bot: "1",
        minor: "1",
        title: title,
        summary: summary,
        text: newText,
        b1asetimestamp: timestamp,
        token: edittoken
      }, null, this.writePage, [title, callNext], null);
    } else {
      this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(title, title) + " was already up to date");
      if (callNext) {
        return callNext();
      }
    }
  };

  ArchWikiSortContacts.prototype.writePage = function(res, args) {
    var callNext, title;
    title = args[0];
    callNext = args[1];
    if (res.edit && res.edit.result === 'Success') {
      this.WM.Log.logInfo(this.WM.Log.linkToWikiPage(title, title) + " was correctly updated");
      if (callNext) {
        return callNext();
      }
    } else {
      return this.WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
    }
  };

  return ArchWikiSortContacts;

})();
