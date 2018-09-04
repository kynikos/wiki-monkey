// Wiki Monkey - MediaWiki bot and editor-assistant user script
// Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
//
// This file is part of Wiki Monkey.
//
// Wiki Monkey is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Wiki Monkey is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

const {moment, hh} = require('./libs')
const {A, Br, Div} = hh
const {version} = require('../../package.json')
const WM = require('.')


module.exports = class exports {
  REPO_RAW_URL = 'https://raw.githubusercontent.com/kynikos/wiki-monkey'

  constructor() {
    this.check_obsolete_config()
    if (WM.conf.update_check_wdays) {
      this.check_and_notify()
    }
  }

  async check_and_notify() {
    if (this.should_check()) {
      const upstream_package = await $.getJSON(`${REPO_RAW_URL}/${WM.conf.update_check_branch}/package.json`)
      // Well, ok, this is assuming that if the versions are
      // different, upstream has the latest
      if (version !== upstream_package.version) {
        return this.display_notification([
          `Version ${upstream_package.version} is available.`,
          Br(),
          A(
            {href: 'https://github.com/kynikos/wiki-monkey/wiki/Changelog'}, // Noqa
            'Changelog'
          ),
          Br(),
          A('Run upgrade', {onclick: () => {
            return this.upgrade(upstream_package.version)
          },
          }),
        ])
      }
      return mw.storage.set(
        'WikiMonkey-last-update-check',
        moment().format('YYYY-MM-DD')
      )
    }
  }

  should_check() {
    let needle
    const lastupdcheck = mw.storage.get('WikiMonkey-last-update-check')
    if (!lastupdcheck) {
      return true
    }

    const diff = moment().diff(moment(lastupdcheck), 'days')
    // Preferably check on the configured day of the week, but don't let
    // more than 7 days pass without checking in any case
    if (diff >= 1 && (needle = moment().day(), WM.conf.update_check_wdays.includes(needle)) || diff >= 7) {
      return true
    }
    return false
  }

  display_notification(content, optionsoverride) {
    const options = {
      autoHide: false,
      tag: 'WikiMonkey-upgrade',
      title: 'Wiki Monkey',
      type: 'info',
    }
    $.extend(options, optionsoverride)
    return mw.notification.notify(content, options)
  }

  upgrade(upstream_version) {
    const page = `User:${mw.user.getName()}/common.js`
    const pagelink = WM.MW.linkArticle(page)

    this.display_notification(`Upgrading to version ${upstream_version}...`)

    // This regular expression must support all versions, including the
    // .min.js
    // TODO: Allow preventing upgrades per-line with //noupgrade comments?
    //       Don't upgrade commented lines?
    const regex = new RegExp(`\
(\
["']https?://.+?/kynikos/wiki-monkey/v\
)\
${mw.RegExp.escape(version)}\
(\
/dist/WikiMonkey-[^/]+\\.js["']\
)\
`, 'g')

    return WM.MW.api.edit(page, (revision) => {
      const newtext = revision.content.replace(
        regex,
        `$1${upstream_version}$2`
      )

      if (newtext === revision.content) {
        // Executing the query would return a 'nochange:true' result,
        // but we can test it before sending it
        return Promise.reject(new Error('Could not find Wiki Monkey loader line'))
      }

      return {
        text: newtext,
        summary: `Update Wiki Monkey to version ${upstream_version}`,
        bot: true,
      }
    }).done((result) => {
      console.log(result)
      return this.display_notification([
        'Upgrade successful: you need to refresh the open wiki page(s) \
in order to use the new version.',
        Br(),
        A(
          {href: 'https://github.com/kynikos/wiki-monkey/wiki/Changelog'},
          'Changelog'
        ),
      ])
    }).fail((code, error) => {
      console.error(code, error)
      return this.display_notification([
        `Could not complete the upgrade to version \
${upstream_version}: `,
        A({onclick: () => {
          return this.upgrade(upstream_version)
        },
        }, 'retry'),
        ' in case it was a temporary problem; it is also possible \
that Wiki Monkey is installed in a non-standard way in ',
        pagelink, ' and the upgrade should be executed manually; \
finally, it is possible that the upgrade was already launched \
and completed from another page: in this case refresh the page \
to verify.',
      ], {type: 'error'})
    })
  }

  check_obsolete_config() {
    // TODO: Remove in a later version
    const oldconf = localStorage.getItem('WikiMonkey')
    if (oldconf !== null) {
      const blob = new Blob([oldconf], {type: 'application/json'})
      const confhref = window.URL.createObjectURL(blob)
      return this.display_notification([
        'Wiki Monkey 4.0.0 uses a completely rewritten configuration \
system. After updating, your old configuration was not \
automatically imported, but it is still saved in your browser\'s \
localStorage. You can decide to export it and then merge it \
manually, or simply remove it and use the default configuration \
options.',
        Br(),
        A(
          {href: 'https://github.com/kynikos/wiki-monkey/wiki/Configuration'}, // Noqa
          'New configuration instructions'
        ),
        Br(),
        A({href: confhref}, 'View old configuration'),
        Br(),
        A(
          {href: confhref, download: 'wikimonkey_oldconf.json'},
          'Export old configuration'
        ),
        Br(),
        A({onclick: () => {
          localStorage.removeItem('WikiMonkey')
          return this.display_notification(
            'The old configuration was successfully removed.',
            {autoHide: true}
          )
        },
        }, 'Delete old configuration'),
      ])
    }
  }
}
