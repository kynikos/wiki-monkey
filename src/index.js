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
require('./lib/index').init()
const {h: hh} = require('./lib/index')

const {upgradePeriodical} = require('./lib/Upgrade')
const {App} = require('./app')
const Store = require('./app/store')
const {PageCommands} = require('./app/pageCommands')
const {SectionCommands} = require('./app/sectionCommands')
const MainTabs = require('./app/mainTabs')
const Menu = require('./app/menu')
const Filter = require('./app/filter')
const Bot = require('./app/bot')

// The ArchPackages module is currently unusable
// ArchPackages = require('./ArchPackages')
const ArchWiki = require('./lib/ArchWiki')
const Cat = require('./lib/Cat')
const Clipboard = require('./lib/Clipboard')
const DB = require('./lib/DB')
const Diff = require('./lib/Diff')
const Editor = require('./lib/Editor')
const Interlanguage = require('./lib/Interlanguage')
const MW = require('./lib/MW')
const Parser = require('./lib/Parser')
const Tables = require('./lib/Tables')
const WhatLinksHere = require('./lib/WhatLinksHere')

const {_Plugin} = require('./plugins/_Plugin')


module.exports.WikiMonkey = class WikiMonkey {
  conf = {
    default_bot_plugin: 'SimpleReplace',
    default_recentchanges_plugin: 'ArchWikiRCFilter',
    default_recentchanges_plugin_autoexecute: true,
    default_newpages_plugin: 'ArchWikiNPFilter',
    default_newpages_plugin_autoexecute: true,
    default_all_plugins_disabled: false,
    update_check_wdays: [6],
    update_check_branch: 'master',
    hide_rollback_links: true,
    disable_edit_summary_submit_on_enter: true,
    scroll_to_first_heading: false,
  }

  constructor(wikiName, installedPlugins) {
    this.wikiName = wikiName

    // If this version of Wiki Monkey was downloaded from a wiki-snake server,
    // it will have been served patched with a _WIKI_MONKEY_SERVER_URL global
    // variable
    this.serverUrl = window._WIKI_MONKEY_SERVER_URL || false

    this.setup(installedPlugins)
    Promise.all([mwmodpromise, $.ready]).then(() => this.init())
  }

  makeLocalConfig() { // eslint-disable-line class-methods-use-this
    // I need to abstract this method because it's also used to generate a
    // basic configuration to export from the maintenance screen

    let localConfig = {
      // Use '#' in front of 'default' so also a possible user explicitly named
      // 'Default' is supported ('#' isn't allowed in user names)
      '#default': {},
      [mw.config.get('wgUserName')]: {},
    }

    const localConfigRaw = localStorage.getItem('wikiMonkeyUserConfig')

    if (localConfigRaw) {
      localConfig = {
        ...localConfig,
        ...JSON.parse(localConfigRaw),
      }
    }

    return localConfig
  }

  importLocalConfig(config) { // eslint-disable-line class-methods-use-this
    // TODO Validate the file, especially check that it has the root #default
    //      or UserName keys
    localStorage.setItem('wikiMonkeyUserConfig', JSON.stringify(config))

    mw.notification.notify(
      [
        'The configurtaion was imported successfully, but it will be loaded \
only the next time that this page is ',
        hh('a', {
          // Using "href: '.'" sends to the Main page
          href: '#reload-page',
          title: 'Reload this page',
          onclick: (event) => {
            event.preventDefault()
            location.reload()
          },
        }, 'reloaded'),
        ' (same for any other open wiki pages).',
      ],
      {
        autoHide: false,
        tag: 'WikiMonkey-config-import',
        title: 'Wiki Monkey import configuration.',
        type: 'info',
      },
    )
  }

  makeComputedConfig() {
    return {
      ...this.conf,
      ...this.enabledPlugins.reduce((acc, plugin) => {
        acc[plugin.constructor.name] = plugin.conf
        return acc
      }, {}),
    }
  }

  setup(installedPlugins) {
    const localConfig = this.makeLocalConfig()

    const nameToUserConfig = {
      // TODO: If the wiki-snake server is enabled, allow loading configuration
      //       also from a dotfile
      localDefault: localConfig['#default'],
      localUser: localConfig[mw.config.get('wgUserName')],
      // mw.loader.load() doesn't return a promise nor support callbacks
      // mw.loader.using() only supports MW modules
      // $.getScript() ignores the cache by default
      // In the end using $.ajax() with setup parameters would be the only
      // option to configure WM in a callback, therefore use a global
      // configuration object for simplicity
      userScript: window.wikiMonkeyConfig || window.wikimonkey_config || {},
    }

    const userConfigs = [
      // The configuration in localStorage is less "noticeable" and may be
      // "forgotten", so to prevent unexpected behavior it's better if the
      // configuration in the User's common.js page overrides the localStorage
      // one, i.e. process the localStorage configuration first
      nameToUserConfig.localDefault,
      nameToUserConfig.localUser,
      nameToUserConfig.userScript,
    ]

    for (const userConfig of userConfigs) {
      for (const option in userConfig) {
        const value = userConfig[option]
        if (option in this.conf) {
          this.conf[option] = value
          // Remove the option from userConfig so at the end it's possible to
          // list the unused/unknown configuration options
          delete userConfig[option]
        }
      }
    }

    const enabledPlugins = []
    const disabledPlugins = []

    for (const Plugin of installedPlugins) {
      if (!(Plugin.prototype instanceof _Plugin)) {
        throw new Error('Plugins must extend _Plugin')
      }

      let plugin
      try {
        plugin = new Plugin({
          wikiName: this.wikiName,
          userConfigs,
          defaultAllPluginsDisabled: this.conf.default_all_plugins_disabled,
        })
      } catch (error) {
        // TODO: Properly extend Error, but beware that Babel
        //       doesn't like it without specific plugins
        if (error.message === 'Plugin disabled') {
          disabledPlugins.push(Plugin)
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

      enabledPlugins.push(plugin)
    }

    for (const [configName, userConfig] of Object.entries(nameToUserConfig)) {
      if (!$.isEmptyObject(userConfig)) {
        console.warn(`Unkown ${configName} configuration options`, userConfig)
      }
    }

    Object.assign(module.exports, {
      makeLocalConfig: this.makeLocalConfig,
      importLocalConfig: this.importLocalConfig,
      makeComputedConfig: this.makeComputedConfig,
      conf: this.conf,
      enabledPlugins,
      disabledPlugins,
    })
  }

  init() {
    Object.assign(module.exports, {
      // The ArchPackages module is currently unusable
      // ArchPackages: new ArchPackages()
      ArchWiki: new ArchWiki(),
      Cat: new Cat(),
      Clipboard,
      DB: this.serverUrl && new DB(this.serverUrl) || null,
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
