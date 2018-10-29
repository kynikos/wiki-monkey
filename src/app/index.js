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

const {moment} = require('../modules/libs')
const {version} = require('../../package.json')

// Make sure to initialize the global style
require('./_components/styled')

const Store = require('./store')
const {WikiLink} = require('./_components/log/WikiLink')
const {PageLink} = require('./_components/log/PageLink')
const mods = require('./mods')

const {PageCommands} = require('./pageCommands')
const {SectionCommands} = require('./sectionCommands')
const MainTabs = require('./mainTabs')
const Bot = require('./bot')
const Filter = require('./filter')
const Menu = require('./menu')

// TODO: Document that the Wiki Snake (and for testing also the Wiki Monkey)
//       server certificates have to be added


const initTempLog = (store) => ({
  hidden(text) {
    return store.commit('log/hidden', text)
  },

  json(component, data) {
    return store.commit('log/json', [component, data])
  },

  debug(text) {
    return store.commit('log/debug', text)
  },

  info(text) {
    return store.commit('log/info', text)
  },

  warning(text) {
    return store.commit('log/warning', text)
  },

  error(text) {
    return store.commit('log/error', text)
  },

  WikiLink,
  PageLink,
})


module.exports.App = class {
  constructor() {
    this.store = (new Store()).vstore
    this.log = initTempLog(this.store)
  }

  run() { // eslint-disable-line complexity
    const bodyContent = $('#bodyContent')
    if (bodyContent) new MainTabs(bodyContent)

    const indicators = $('.mw-indicators:first')
    if (indicators) new PageCommands(indicators)

    const editSections = $('.mw-editsection')
    if (editSections.length) new SectionCommands(editSections)

    // MW seems a bit unreliable with capitalization, e.g. it's
    // "SpecialPages" but "Recentchanges"
    const specialPage = (function () {
      const spage = mw.config.get('wgCanonicalSpecialPageName')
      if (spage) {
        return spage.toLowerCase()
      }
      return spage
    }())

    // TODO: Recognize the editor with mw.config.get('wgAction')?
    if ($('#editform').length) {
      new Menu({
        pageType: 'editor',
        display: true,
        displayLog: true,
        nextNode: $('#wpSummaryLabel').parent().next()[0],
      })
      mods.modEditor()
    } else if (mw.config.get('wgDiffNewId')) {
      new Menu({
        pageType: 'diff',
        display: true,
        displayLog: true,
        nextNode: $('#bodyContent h2').first()[0],
      })
    } else if (mw.config.get('wgCanonicalNamespace') === 'Category') {
      new Bot({
        lists: [
          [$('#mw-pages')[0], 0, 'Pages'],
          [$('#mw-subcategories')[0], 0, 'Subcategories'],
        ],
        display: false,
        displayLog: true,
        nextNode: $('#contentSub')[0],
      })
    } else if (specialPage === 'whatlinkshere') {
      new Bot({
        lists: [
          [$('#mw-whatlinkshere-list')[0], 0, 'Pages'],
        ],
        display: false,
        displayLog: true,
        nextNode: $('#bodyContent form').first().next()[0],
      })
    } else if (specialPage === 'linksearch' &&
              $('#mw-content-text div.mw-spcontent').length) {
      const nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
      new Bot({
        lists: [
          [$(nextNode).first('ol.special').first()[0], 1, 'Pages'],
        ],
        display: false,
        displayLog: true,
        nextNode,
      })
    } else if (specialPage === 'prefixindex') {
      const nextNode = $('#mw-content-text div.mw-prefixindex-body').first()[0]
      new Bot({
        lists: [
          [
            $(nextNode).find('ul.mw-prefixindex-list').first()[0],
            0,
            'Pages',
          ],
        ],
        display: false,
        displayLog: true,
        nextNode,
      })
    } else if (specialPage === 'specialpages') {
      new Menu({
        pageType: 'special',
        display: true,
        displayLog: true,
        nextNode: $('#contentSub')[0],
      })
    } else if (specialPage === 'recentchanges') {
      new Filter({
        pageType: 'recentchanges',
        display: true,
        displayLog: false,
        nextNode: $('#mw-content-text h4').first()[0],
      })
      mods.modRecentChanges()
    } else if (specialPage === 'newpages') {
      new Filter({
        pageType: 'newpages',
        display: true,
        displayLog: false,
        nextNode: $('#mw-content-text ul').first()[0],
      })
    } else if (specialPage === 'protectedpages') {
      const nextNode = $('#mw-content-text table.mw-protectedpages').first()[0]
      new Bot({
        lists: [
          [$(nextNode).find('tbody').first()[0], 0, 'Pages'],
        ],
        display: false,
        displayLog: true,
        nextNode,
      })
    } else if (specialPage === 'contributions') {
      mods.modContributions()
    } else if ([
      'ancientpages',
      'brokenredirects',
      'deadendpages',
      'doubleredirects',
      'fewestrevisions',
      'lonelypages',
      'uncategorizedcategories',
      'uncategorizedpages',
      'uncategorizedtemplates',
      'unusedcategories',
      'unwatchedpages',
    ].includes(specialPage)) {
      const nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
      new Bot({
        lists: [
          [$(nextNode).find('ol').first()[0], 0, 'Pages'],
        ],
        display: false,
        displayLog: true,
        nextNode,
      })
    } else if ([
      'longpages',
      'shortpages',
    ].includes(specialPage)) {
      const nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
      new Bot({
        lists: [
          [$(nextNode).find('ol').first()[0], 1, 'Pages'],
        ],
        display: false,
        displayLog: true,
        nextNode,
      })
    } else if (specialPage === 'withoutinterwiki') {
      const nextNode = $('#mw-content-text div.mw-spcontent > p').first()[0]
      new Bot({
        lists: [
          [$(nextNode).nextAll('ol').first()[0], 0, 'Pages'],
        ],
        display: false,
        displayLog: true,
        nextNode,
      })
    } else if (specialPage === 'allpages') {
      const nextNode = $('#mw-content-text div.mw-allpages-nav').first()[0]
      new Bot({
        lists: [
          [$(nextNode).nextAll('div.mw-allpages-body').first()
            .find('ul').first()[0],
          0, 'Pages'],
        ],
        display: false,
        displayLog: true,
        nextNode,
      })
    }

    this.log.hidden(`Wiki Monkey version: ${version}`)
    this.log.hidden(`Date: ${moment().format('YYYY-MM-DD Z')}`)
    this.log.hidden(`URL: ${location.href}`)
  }
}
