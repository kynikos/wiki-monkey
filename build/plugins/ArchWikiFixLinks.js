// Generated by CoffeeScript 1.12.2
module.exports.ArchWikiFixLinks = (function() {
  ArchWikiFixLinks.REQUIRES_GM = false;

  function ArchWikiFixLinks(WM) {
    this.WM = WM;
  }

  ArchWikiFixLinks.prototype.doReplace = function(txt) {
    var L, match, newText, prevId, re;
    re = /http:\/\/([a-z]+\.)?archlinux\.org(?!\.[a-z])/ig;
    txt = txt.replace(re, 'https://$1archlinux.org');
    re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/Category:([^\]]+?) (.+?)\]/ig;
    txt = txt.replace(re, '[[:Category:$1|$2]]');
    re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/Category:(.+?)\]/ig;
    txt = txt.replace(re, '[[:Category:$1]]');
    re = /https?:\/\/wiki\.archlinux\.org\/index\.php\/Category:([^\s]+)/ig;
    txt = txt.replace(re, '[[:Category:$1]]');
    re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/([^\]]+?) (.+?)\]/ig;
    txt = txt.replace(re, '[[$1|$2]]');
    re = /\[https?:\/\/wiki\.archlinux\.org\/index\.php\/(.+?)\]/ig;
    txt = txt.replace(re, '[[$1]]');
    re = /https?:\/\/wiki\.archlinux\.org\/index\.php\/([^\s]+)/ig;
    txt = txt.replace(re, '[[$1]]');
    re = /https?:\/\/wiki\.archlinux\.org(?!\.)/ig;
    if (re.test(txt)) {
      this.WM.Log.logWarning("It hasn't been possible to convert some " + "links to wiki.archlinux.org");
    }
    re = /\[https?:\/\/en\.wikipedia\.org\/wiki\/([^\]]+?) (.+?)\]/ig;
    txt = txt.replace(re, '[[wikipedia:$1|$2]]');
    re = /\[https?:\/\/en\.wikipedia\.org\/wiki\/(.+?)\]/ig;
    txt = txt.replace(re, '[[wikipedia:$1]]');
    re = /https?:\/\/en\.wikipedia\.org\/wiki\/([^\s]+)/ig;
    txt = txt.replace(re, '[[wikipedia:$1]]');
    re = /https?:\/\/([a-z]+?)\.wikipedia\.org(?!\.)/ig;
    if (re.test(txt)) {
      this.WM.Log.logWarning("It hasn't been possible to convert some " + "links to Wikipedia");
    }
    re = /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/? +(.+?)?\]/ig;
    newText = '';
    prevId = 0;
    while (true) {
      match = re.exec(txt);
      if (match) {
        if (match[1] === match[2]) {
          L = match[0].length;
          newText += txt.substring(prevId, re.lastIndex - L) + '{{Pkg|' + match[1] + '}}';
          prevId = re.lastIndex;
        }
      } else {
        break;
      }
    }
    newText += txt.substr(prevId);
    txt = newText;
    re = /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/?\]/ig;
    txt = txt.replace(re, '{{Pkg|$1}}');
    re = /([^\[])https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s\/]+)\/?/ig;
    txt = txt.replace(re, '$1{{Pkg|$2}}');
    re = /https?:\/\/(?:www\.)?archlinux\.org\/packages(?!\/?\s)/ig;
    if (re.test(txt)) {
      this.WM.Log.logWarning("It hasn't been possible to convert some " + "links to archlinux.org/packages");
    }
    re = /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/? +(.+?)?\]/ig;
    newText = '';
    prevId = 0;
    while (true) {
      match = re.exec(txt);
      if (match) {
        if (match[1] === match[2]) {
          L = match[0].length;
          newText += txt.substring(prevId, re.lastIndex - L) + '{{AUR|' + match[1] + '}}';
          prevId = re.lastIndex;
        }
      } else {
        break;
      }
    }
    newText += txt.substr(prevId);
    txt = newText;
    re = /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/?\]/ig;
    txt = txt.replace(re, '{{AUR|$1}}');
    re = /([^\[])https?:\/\/aur\.archlinux\.org\/packages\/([^\s\/]+)\/?/ig;
    txt = txt.replace(re, '$1{{AUR|$2}}');
    re = /https?:\/\/aur\.archlinux\.org(?!(?:\.|(?:\/?packages)?\/?\s))/ig;
    if (re.test(txt)) {
      this.WM.Log.logWarning("It hasn't been possible to convert some links to aur.archlinux.org (try the \"Fix old AUR links\" function, if installed)");
    }
    re = /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/? +(.+?)?\]/ig;
    newText = '';
    prevId = 0;
    while (true) {
      match = re.exec(txt);
      if (match) {
        if (match[1] === match[2]) {
          L = match[0].length;
          newText += txt.substring(prevId, re.lastIndex - L) + '{{Bug|' + match[1] + '}}';
          prevId = re.lastIndex;
        }
      } else {
        break;
      }
    }
    newText += txt.substr(prevId);
    txt = newText;
    re = /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/?\]/ig;
    txt = txt.replace(re, '{{Bug|$1}}');
    re = /([^\[])https?:\/\/bugs\.archlinux\.org\/task\/([^\s\/]+)\/?/ig;
    txt = txt.replace(re, '$1{{Bug|$2}}');
    re = /https?:\/\/bugs\.archlinux\.org\/task/ig;
    if (re.test(txt)) {
      this.WM.Log.logWarning("It hasn't been possible to convert some " + "links to bugs.archlinux.org/task");
    }
    return txt;
  };

  ArchWikiFixLinks.prototype.main = function(args, callNext) {
    var newtext, source;
    source = this.WM.Editor.readSource();
    newtext = this.doReplace(source);
    if (newtext !== source) {
      this.WM.Editor.writeSource(newtext);
      this.WM.Log.logInfo("Fixed links");
    } else {
      this.WM.Log.logInfo("No fixable links found");
    }
    if (callNext) {
      return callNext();
    }
  };

  return ArchWikiFixLinks;

})();
