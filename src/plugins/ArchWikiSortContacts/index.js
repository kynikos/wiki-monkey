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
const Run = require('./Run')


module.exports = class ArchWikiSortContacts extends _Plugin {
  // This plugin was originally based on list=allusers, but because of bug
  //  #208 it can't rely on that anymore, so it was rewritten with
  //  60bb2ac2a2dcd0b15b7aac80725c83151173eeb3
  // See also https://bbs.archlinux.org/viewtopic.php?id=192389 and
  //  https://lists.wikimedia.org/pipermail/mediawiki-l/2015-January/043850.html

  static requiresServer = false

  static confDefault = {
    enabled: false,
    special_menu: ['Sort staff contacts'],
    edit_summary: 'automatically sort list according to recent activity',
    pages: [{
      title: 'ArchWiki:Administrators',
      recent_days: 30,
      inactive_limit: 30,
      inactive_message: 'The following Administrators are currently \
inactive (less than 30 edits in the last 30 days):',
    },
    {
      title: 'ArchWiki:Maintainers',
      recent_days: 30,
      inactive_limit: 10,
      inactive_message: 'The following Maintainers are currently \
inactive (less than 10 edits in the last 30 days):',
    }],
  }

  install({special}) {
    special((callNext) => new Run(this.conf, callNext))
  }
}
