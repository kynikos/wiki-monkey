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
const storeModule = require('./store')
const {PageCommand} = require('./PageCommand')


module.exports = class Watchlist extends _Plugin {
  static pluginName = 'Watchlist'

  static requiresServer = false

  static confDefault = {
    enabled: true,
    minQueryInterval: 1800, // 30 minutes
  }

  install({store, personalToolsCommands, pageCommands}) {
    store('watchlist', storeModule(this.conf))
    // BUG[plugins]: The personalToolsCommands installation mode is broken since
    //    the introduction of MediaWiki's disappearing User menu
    //    https://www.mediawiki.org/wiki/Reading/Web/Desktop_Improvements/Features/User_menu
    //    See also #259
    // personalToolsCommands(PersonalToolsCommand(this.conf))
    pageCommands(PageCommand(this.conf))
  }
}
