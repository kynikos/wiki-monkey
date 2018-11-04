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


module.exports._Plugin = class _Plugin {
  static requiresServer = null
  // Don't create default objects here, or they'll be shared among the
  // subclasses unless overridden
  // static confDefault = {}
  // static wikiToConfDefault = {}
  // conf = {}

  install(install) { // eslint-disable-line class-methods-use-this
    throw Error('Not implemented')
  }

  constructor({wikiName, serverUrl, userConfigs, defaultAllPluginsDisabled}) {
    // requiresServer must be explicitly defined as true or false by each
    // plugin
    if (this.constructor.requiresServer == null) {
      throw new Error(`Plugin ${this.constructor.name} does not define \
'requiresServer'.`)
    }

    // Do generate a new object for each plugin
    this.conf = {}

    if (this.constructor.confDefault != null) {
      $.extend(this.conf, this.constructor.confDefault)
    }

    if (
      this.constructor.wikiToConfDefault != null &&
      wikiName in this.constructor.wikiToConfDefault
    ) {
      $.extend(this.conf, this.constructor.wikiToConfDefault[wikiName])
    }

    if (defaultAllPluginsDisabled) {
      this.conf.enabled = false
    }

    for (const userConfig of userConfigs) {
      if (this.constructor.name in userConfig) {
        // Don't just use $.extend() so it's possible to see if there are
        // unknown options and possibly warn the user
        for (const option in userConfig[this.constructor.name]) {
          const value = userConfig[this.constructor.name][option]
          if (option in this.conf) {
            this.conf[option] = value
            // Remove the option from userConfig so at the end it's possible to
            // list the unused/unknown configuration options
            delete userConfig[this.constructor.name][option]
          }
        }
      }
    }

    if (!this.conf.enabled || !serverUrl && this.constructor.requiresServer) {
      for (const userConfig of userConfigs) {
        // Remove the option from userConfig so at the end it's possible to
        // list the unused/unknown configuration options
        delete userConfig[this.constructor.name]
      }
      // TODO: Properly extend Error, but beware that Babel doesn't like
      //       it without specific plugins
      throw new Error('Plugin disabled')
    }

    for (const userConfig of userConfigs) {
      if ($.isEmptyObject(userConfig[this.constructor.name])) {
        // Remove the plugin from userConfig so at the end it's possible to
        // list the unused/unknown configuration options
        delete userConfig[this.constructor.name]
      }
    }
  }
}
