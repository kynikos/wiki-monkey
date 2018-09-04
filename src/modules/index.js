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

const mwmodpromise = mw.loader.using(['mediawiki.api.edit',
  'mediawiki.notification',
  'mediawiki.Uri'])

// Initialize the libraries immediately (especially babel-polyfill)
require('./libs').init()

const Upgrade = require('./Upgrade')
const {App} = require('../app')

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

const {Plugin} = require('../plugins/_Plugin')


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

  Plugins = {
    bot: [],
    diff: [],
    editor: [],
    newpages: [],
    recentchanges: [],
    special: [],
  }

  constructor(wiki_name, ...rest) {
    this.init = this.init.bind(this)
    this.wiki_name = wiki_name;
    [...this.installed_plugins_temp] = rest
    this.setup()
    $.when(mwmodpromise, $.ready).done(this.init)
  }

  setup() { // eslint-disable-line max-statements,max-lines-per-function
    // Mw.loader.load() doesn't return a promise nor support callbacks
    // mw.loader.using() only supports MW modules
    // $.getScript() ignores the cache by default
    // In the end using $.ajax() with setup parameters would be the only
    // option to configure WM in a callback, therefore use a global
    // configuration object for simplicity
    const user_config = window.wikiMonkeyConfig || window.wikimonkey_config || {}

    for (const option in user_config) {
      const value = user_config[option]
      if (option in this.conf) {
        this.conf[option] = value
        delete user_config[option]
      }
    }

    for (const pmod of this.installed_plugins_temp) {
      for (const pname in pmod) {
        const PluginSub = pmod[pname]
        if (PluginSub.prototype instanceof Plugin) {
          try {
            PluginSub.__configure(this.wiki_name, user_config)
          } catch (error) {
            // TODO: Properly extend Error, but beware that Babel
            //       doesn't like it without specific plugins
            if (error.message === 'Plugin disabled') {
              continue
            }
            throw error
          }

          for (const interface_ in this.Plugins) {
            if (PluginSub.prototype[`main_${interface_}`]) {
              this.Plugins[interface_].push(PluginSub)
            }
          }
        }
      }
    }

    if (!$.isEmptyObject(user_config)) {
      console.warn('Unkown configuration options', user_config)
    }

    delete this.installed_plugins_temp

    return Object.assign(module.exports, {
      conf: this.conf,
      Plugins: this.Plugins,
    })
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

    new Upgrade()
    return App()
  }
}
