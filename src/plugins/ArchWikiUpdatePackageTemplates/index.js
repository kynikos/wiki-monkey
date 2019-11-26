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

const {_Plugin} = require('%/plugins/_Plugin')
const RunEditor = require('./RunEditor')
const RunBot = require('./RunBot')


module.exports = class ArchWikiUpdatePackageTemplates extends _Plugin {
  static requiresServer = false

  static confDefault = {
    // TODO: Disabled because the ArchPackages module is currently unusable
    enabled: false,
    editor_menu: ['Query plugins', 'Update package templates'],
    bot_label: 'Check packages linked with Pkg/AUR templates and \
possibly update them',
    edit_summary: 'update Pkg/AUR templates to reflect new package status',
  }

  install({editor, bot}) {
    editor((callNext) => new RunEditor(this.conf, callNext))
    bot((title, callBot, chainArgs) => {
      return new RunBot(this.conf, title, callBot, chainArgs)
    })
  }
}
