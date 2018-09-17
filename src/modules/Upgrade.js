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

const {moment, h} = require('./libs')
const {version} = require('../../package.json')
const WM = require('.')

const REPO_RAW_URL = 'https://raw.githubusercontent.com/kynikos/wiki-monkey'


module.exports = () => {
  checkObsoleteConfig()
  if (WM.conf.update_check_wdays) {
    checkAndNotify()
  }
}

const checkAndNotify = async () => {
  if (shouldCheck()) {
    const upstreamPackage = await $.getJSON(`${REPO_RAW_URL}/${WM.conf.update_check_branch}/package.json`)
    // Well, ok, this is assuming that if the versions are
    // different, upstream has the latest
    if (version !== upstreamPackage.version) {
      return displayNotification([
        `Version ${upstreamPackage.version} is available.`,
        h('br'),
        h(
          'a',
          {href: 'https://github.com/kynikos/wiki-monkey/wiki/Changelog'}, // Noqa
          'Changelog'
        ),
        h('br'),
        h('a', 'Run upgrade', {onclick: () => {
          return upgrade(upstreamPackage.version)
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

const shouldCheck = () => {
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

const displayNotification = (content, optionsoverride) => {
  const options = {
    autoHide: false,
    tag: 'WikiMonkey-upgrade',
    title: 'Wiki Monkey',
    type: 'info',
  }
  $.extend(options, optionsoverride)
  return mw.notification.notify(content, options)
}

const upgrade = (upstreamVersion) => { // eslint-disable-line max-lines-per-function
  const page = `User:${mw.user.getName()}/common.js`
  const pagelink = WM.MW.linkArticle(page)

  displayNotification(`Upgrading to version ${upstreamVersion}...`)

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
`, 'gu')

  return WM.MW.api.edit(page, (revision) => {
    const newtext = revision.content.replace(
      regex,
      `$1${upstreamVersion}$2`
    )

    if (newtext === revision.content) {
      // Executing the query would return a 'nochange:true' result,
      // but we can test it before sending it
      return Promise.reject(new Error('Could not find Wiki Monkey loader line'))
    }

    return {
      text: newtext,
      summary: `Update Wiki Monkey to version ${upstreamVersion}`,
      bot: true,
    }
  }).done((result) => {
    console.log(result)
    return displayNotification([
      'Upgrade successful: you need to refresh the open wiki page(s) \
in order to use the new version.',
      h('br'),
      h('a',
        {href: 'https://github.com/kynikos/wiki-monkey/wiki/Changelog'},
        'Changelog'
      ),
    ])
  }).fail((code, error) => {
    console.error(code, error)
    return displayNotification([
      `Could not complete the upgrade to version \
${upstreamVersion}: `,
      h('a', {onclick: () => {
        return upgrade(upstreamVersion)
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

const checkObsoleteConfig = () => {
  // TODO: Remove in a later version
  const oldconf = localStorage.getItem('WikiMonkey')
  if (oldconf !== null) {
    const blob = new Blob([oldconf], {type: 'application/json'})
    const confhref = window.URL.createObjectURL(blob)
    return displayNotification([
      'Wiki Monkey 4.0.0 uses a completely rewritten configuration \
system. After updating, your old configuration was not \
automatically imported, but it is still saved in your browser\'s \
localStorage. You can decide to export it and then merge it \
manually, or simply remove it and use the default configuration \
options.',
      h('br'),
      h(
        'a',
        {href: 'https://github.com/kynikos/wiki-monkey/wiki/Configuration'}, // Noqa
        'New configuration instructions'
      ),
      h('br'),
      h('a', {href: confhref}, 'View old configuration'),
      h('br'),
      h(
        'a',
        {href: confhref, download: 'wikimonkey_oldconf.json'},
        'Export old configuration'
      ),
      h('br'),
      h('a', {onclick: () => {
        localStorage.removeItem('WikiMonkey')
        return displayNotification(
          'The old configuration was successfully removed.',
          {autoHide: true}
        )
      },
      }, 'Delete old configuration'),
    ])
  }
}
