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
const {PageNew} = require('./PageNew')
const {PageManager} = require('./PageManager')
const {SectionNew} = require('./SectionNew')
const {SectionManager} = require('./SectionManager')
const {TabPage} = require('./TabPage')


module.exports = class Bookmarks extends _Plugin {
  static confDefault = {
    enabled: false,
    // TODO: Only enable if the server is enabled
  }

  install({store, pageCommands, sectionCommands, mainTabs}) {
    store('bookmarks', storeModule)
    pageCommands(PageManager(this.conf))
    pageCommands(PageNew(this.conf))
    sectionCommands(SectionManager(this.conf))
    sectionCommands(SectionNew(this.conf))
    mainTabs({
      name: 'bookmarks',
      tabTitle: 'Show the bookmarks interface',
      tabLabel: 'bookmarks',
      page: TabPage(this.conf),
    })
  }
}
