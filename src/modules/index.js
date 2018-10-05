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

const mwmodpromise = mw.loader.using([
  'mediawiki.api.edit',
  'mediawiki.notification',
  'mediawiki.Title',
  'mediawiki.Uri',
])

// Initialize the libraries immediately (especially babel-polyfill)
require('./libs').init()

const {upgradePeriodical} = require('./Upgrade')
const {App} = require('../app')
const Store = require('../app/store')
const {PageCommands} = require('../app/pageCommands')
const {SectionCommands} = require('../app/sectionCommands')
const MainTabs = require('../app/mainTabs')
const Menu = require('../app/menu')
const Filter = require('../app/filter')
const Bot = require('../app/bot')

// The ArchPackages module is currently unusable
// ArchPackages = require('./ArchPackages')
const ArchWiki = require('./ArchWiki')
const Cat = require('./Cat')
const Clipboard = require('./Clipboard')
const DB = require('./DB')
const Diff = require('./Diff')
const Editor = require('./Editor')
const Interlanguage = require('./Interlanguage')
const MW = require('./MW')
const Parser = require('./Parser')
const Tables = require('./Tables')
const WhatLinksHere = require('./WhatLinksHere')

const {_Plugin} = require('../plugins/_Plugin')

// TODO: Allow the user to start WM manually with a button instead of loading
//       it automatically at every page load; currently WM can only be
//       enabled/disabled by editing the User's common.js page


module.exports.WikiMonkey = class WikiMonkey {
  conf = {
    default_bot_plugin: 'SimpleReplace',
    default_recentchanges_plugin: 'ArchWikiRCFilter',
    default_recentchanges_plugin_autoexecute: true,
    default_newpages_plugin: 'ArchWikiNPFilter',
    default_newpages_plugin_autoexecute: true,
    update_check_wdays: [6],
    update_check_branch: 'master',
    hide_rollback_links: true,
    disable_edit_summary_submit_on_enter: true,
    scroll_to_first_heading: false,
    database_server: 'https://localhost:13502/',
  }

  constructor(wikiName, ...installedPluginsTemp) {
    this.wikiName = wikiName
    this.installedPluginsTemp = installedPluginsTemp
    this.setup()
    Promise.all([mwmodpromise, $.ready]).then(() => this.init())
  }

  setup() {
    // mw.loader.load() doesn't return a promise nor support callbacks
    // mw.loader.using() only supports MW modules
    // $.getScript() ignores the cache by default
    // In the end using $.ajax() with setup parameters would be the only
    // option to configure WM in a callback, therefore use a global
    // configuration object for simplicity
    const userConfig = window.wikiMonkeyConfig || window.wikimonkey_config || {}

    for (const option in userConfig) {
      const value = userConfig[option]
      if (option in this.conf) {
        this.conf[option] = value
        delete userConfig[option]
      }
    }

    for (const Plugin of this.installedPluginsTemp) {
      if (!(Plugin.prototype instanceof _Plugin)) {
        throw new Error('Plugins must extend _Plugin')
      }

      let plugin
      try {
        plugin = new Plugin({
          wikiName: this.wikiName,
          userConfig,
        })
      } catch (error) {
        // TODO: Properly extend Error, but beware that Babel
        //       doesn't like it without specific plugins
        if (error.message === 'Plugin disabled') {
          continue
        }
        throw error
      }

      plugin.install({
        store: Store.installPlugin.bind(Store),
        pageCommands: PageCommands.installPlugin.bind(PageCommands, plugin),
        sectionCommands:
          SectionCommands.installPlugin.bind(SectionCommands, plugin),
        mainTabs: MainTabs.installPlugin.bind(MainTabs, plugin),
        editor: Menu.installEditorPlugin.bind(Menu, plugin),
        diff: Menu.installDiffPlugin.bind(Menu, plugin),
        special: Menu.installSpecialPlugin.bind(Menu, plugin),
        recentChanges: Filter.installRecentChangesPlugin.bind(Filter, plugin),
        newPages: Filter.installNewPagesPlugin.bind(Filter, plugin),
        bot: Bot.installPlugin.bind(Bot, plugin),
      })
    }

    if (!$.isEmptyObject(userConfig)) {
      console.warn('Unkown configuration options', userConfig)
    }

    delete this.installedPluginsTemp

    module.exports.conf = this.conf
  }

  init() {
    Object.assign(module.exports, {
      // The ArchPackages module is currently unusable
      // ArchPackages: new ArchPackages()
      ArchWiki: new ArchWiki(),
      Cat: new Cat(),
      Clipboard,
      DB: this.conf.database_server && new DB() || null,
      Diff: new Diff(),
      Editor: new Editor(),
      Interlanguage: new Interlanguage(),
      MW: new MW(),
      Parser: new Parser(),
      Tables: new Tables(),
      WhatLinksHere: new WhatLinksHere(),
    })

    upgradePeriodical()

    const app = new App()
    module.exports.App = app
    app.run()
  }
}
