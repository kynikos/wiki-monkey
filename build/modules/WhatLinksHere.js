// Generated by CoffeeScript 1.12.7
module.exports.WhatLinksHere = (function() {
  function WhatLinksHere(WM) {
    this.WM = WM;
    null;
  }

  WhatLinksHere.prototype.isWhatLinksHerePage = function() {
    if (document.getElementById('mw-whatlinkshere-list')) {
      return true;
    } else {
      return false;
    }
  };

  WhatLinksHere.prototype.getTitle = function() {
    return document.getElementById('contentSub').getElementsByTagName('a')[0].title;
  };

  return WhatLinksHere;

})();
