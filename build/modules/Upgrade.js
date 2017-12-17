// Generated by CoffeeScript 2.0.3
  // Wiki Monkey - MediaWiki bot and editor-assistant user script
  // Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>

  // This file is part of Wiki Monkey.

  // Wiki Monkey is free software: you can redistribute it and/or modify
  // it under the terms of the GNU General Public License as published by
  // the Free Software Foundation, either version 3 of the License, or
  // (at your option) any later version.

  // Wiki Monkey is distributed in the hope that it will be useful,
  // but WITHOUT ANY WARRANTY; without even the implied warranty of
  // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  // GNU General Public License for more details.

  // You should have received a copy of the GNU General Public License
  // along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
var A, Br, Div, moment,
  indexOf = [].indexOf;

({moment, A, Br, Div} = require('./libs'));

module.exports = (function() {
  var VERSION_URL;

  class exports {
    constructor(WM) {
      this.WM = WM;
    }

    async check_and_notify() {
      var upstream_version;
      if (this.should_check()) {
        upstream_version = (await $.get(VERSION_URL));
        // Well, ok, this is assuming that if the versions are
        // different, upstream has the latest
        if (this.WM.VERSION !== upstream_version) {
          return this.display_notification([
            `Version ${upstream_version} is available.`,
            Br(),
            A('Run upgrade',
            {
              onclick: () => {
                return this.upgrade(upstream_version);
              }
            })
          ]);
        } else {
          return mw.storage.set('WikiMonkey-last-update-check', moment().format('YYYY-MM-DD'));
        }
      }
    }

    should_check() {
      var diff, lastupdcheck, ref;
      lastupdcheck = mw.storage.get('WikiMonkey-last-update-check');
      if (!lastupdcheck) {
        return true;
      }
      diff = moment().diff(moment(lastupdcheck), 'days');
      // Preferably check on the configured day of the week, but don't let
      // more than 7 days pass without checking in any case
      if ((diff >= 1 && (ref = moment().day(), indexOf.call(this.WM.conf.update_check_wdays, ref) >= 0)) || diff >= 7) {
        return true;
      }
      return false;
    }

    display_notification(content, optionsoverride) {
      var options;
      options = {
        autoHide: false,
        tag: 'WikiMonkey-upgrade',
        title: 'Wiki Monkey',
        type: 'info'
      };
      $.extend(options, optionsoverride);
      return mw.notification.notify(content, options);
    }

    upgrade(upstream_version) {
      var page, pagelink, regex;
      page = `User:${mw.user.getName()}/common.js`;
      pagelink = this.WM.MW.linkArticle(page);
      this.display_notification(`Upgrading to version ${upstream_version}...`);
      // TODO: Allow preventing upgrades per-line with //noupgrade comments?
      //       Don't upgrade commented lines?
      regex = new RegExp("([\"']https?://[^/]+/kynikos/wiki-monkey/" + `v)${mw.RegExp.escape(this.WM.VERSION)}(/dist/` + "WikiMonkey-[^/]+\\.js[\"'])", 'g');
      return this.WM.MW.api.edit(page, (revision) => {
        var newtext;
        newtext = revision.content.replace(regex, `$1${upstream_version}$2`);
        if (newtext === revision.content) {
          // Executing the query would return a 'nochange:true' result,
          // but we can test it before sending it
          return Promise.reject(new Error("Could not find Wiki Monkey loader line"));
        }
        return {
          text: newtext,
          summary: `Update Wiki Monkey to version ${upstream_version}`,
          bot: true
        };
      }).done((result) => {
        console.log(result);
        return this.display_notification("Upgrade successful: you need to refresh the open wiki page(s) in order to use the new version.");
      }).fail((code, error) => {
        console.error(code, error);
        return this.display_notification([
          `Could not complete the upgrade to version ${upstream_version}: `,
          A({
            onclick: () => {
              return this.upgrade(upstream_version);
            }
          },
          "retry"),
          " in case it was a temporary problem; it is also possible that Wiki Monkey is installed in a non-standard way in ",
          pagelink,
          " and the upgrade should be executed manually; finally, it is possible that the upgrade was already launched and completed from another page: in this case refresh the page to verify."
        ], {
          type: 'error'
        });
      });
    }

  };

  VERSION_URL = 'https://raw.githubusercontent.com/kynikos/wiki-monkey/master/VERSION';

  return exports;

})();
