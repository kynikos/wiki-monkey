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

const {_Plugin} = require('../_Plugin')
const storeModule = require('./store')
const PageCommands = require('./PageCommands')
const SectionCommands = require('./SectionCommands')
const TabPage = require('./TabPage')


module.exports = class Bookmarks extends _Plugin {
  static confDefault = {
    enabled: false,
  }

  install({store, pageCommands, sectionCommands, mainTabs}) {
    store('bookmarks', storeModule)
    pageCommands(PageCommands(this.conf))
    sectionCommands(SectionCommands(this.conf))
    mainTabs({
      name: 'bookmarks',
      tabTitle: 'Show the bookmarks interface',
      tabComponent: 'bookmarks',
      page: TabPage(this.conf),
    })
  }
}
