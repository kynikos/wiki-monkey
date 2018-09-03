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


const Cls = module.exports.Plugin = class Plugin {
  // Don't create default objects here, or they'll be shared among the
  // subclasses unless overridden
  // conf_default = {}
  // wiki_to_conf_default = {}
  // conf = {}
  static initClass() {
    this.prototype.main_bot = null
    this.prototype.main_diff = null
    this.prototype.main_editor = null
    this.prototype.main_newpages = null
    this.prototype.main_recentchanges = null
    this.prototype.main_special = null
  }

  static __configure(wiki_name, user_config) {
    // Do generate a new object for each plugin
    this.prototype.conf = {}

    if (this.conf_default != null) {
      $.extend(this.prototype.conf, this.conf_default)
    }

    if (this.wiki_to_conf_default != null && wiki_name in this.wiki_to_conf_default) {
      $.extend(this.prototype.conf, this.wiki_to_conf_default[wiki_name])
    }

    if (this.name in user_config) {
      // Don't just use $.extend() so it's possible to see if there are
      // unknown options and possibly warn the user
      for (const option in user_config[this.name]) {
        const value = user_config[this.name][option]
        if (option in this.prototype.conf) {
          this.prototype.conf[option] = value
          delete user_config[this.name][option]
        }
      }
    }

    if (!this.prototype.conf.enabled) {
      delete user_config[this.name]
      // TODO: Properly extend Error, but beware that Babel doesn't like
      //       it without specific plugins
      throw new Error('Plugin disabled')
    }

    if ($.isEmptyObject(user_config[this.name])) {
      return delete user_config[this.name]
    }
  }

  constructor() {}
}
Cls.initClass()
