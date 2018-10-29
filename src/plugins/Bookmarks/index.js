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
const {PageCommand} = require('./PageCommand')
const {SectionCommand} = require('./SectionCommand')
const {TabPage} = require('./TabPage')


module.exports = class Bookmarks extends _Plugin {
  static confDefault = {
    // TODO: Only enable if the server is enabled
    enabled: true, // false, // TODO
    bookmarkActionChoices: [
      'reply',
      'check for reply',
      'watch abuse',
      'review edit',
      'fix style',
      'fix content',
    ],
    defaultBookmarkDelay: '1 day',
    bookmarkDelayChoices: [
      '15 minutes',
      '1 hour',
      '6 hours',
      '1 day',
      '2 days',
      '3 days',
      '1 week',
      '2 weeks',
      '1 month',
    ],
    allTableShownFields: [
      'wgCanonicalNamespace',
      'wgTitle',
      'section_title',
      'action_due',
      'time_due',
    ],
    pageTableShownFields: [
      'section_title',
      'action_due',
      'time_due',
      'notes',
    ],
    sectionTableShownFields: [
      'action_due',
      'time_due',
      'notes',
    ],
  }

  install({store, pageCommands, sectionCommands, mainTabs}) {
    store('bookmarks', storeModule(this.conf))
    pageCommands(PageCommand(this.conf))
    sectionCommands(SectionCommand(this.conf))
    mainTabs({
      name: 'bookmarks',
      tabTitle: 'Show the bookmarks interface',
      tabLabel: 'bookmarks',
      page: TabPage(this.conf),
    })
  }
}
