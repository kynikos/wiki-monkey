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
const Run = require('./Run')


module.exports = class UpdateCategoryTree extends _Plugin {
  static requiresServer = false

  static confDefault = {
    enabled: false,
    special_menu: ['Update category trees'],
    edit_summary: 'automatic update',
    show_root_also_in: false,
    pages: [],
  }

  static wikiToConfDefault = {
    ArchWiki: {
      pages: ['ar', 'bg', 'cs', 'da', 'el', 'en', 'es', 'fi', 'he', 'hr',
        'hu', 'id', 'it', 'ko', 'lt', 'nl', 'pl', 'pt', 'ru', 'sk',
        'sr', 'sv', 'th', 'tr', 'uk', 'zh-hans', 'zh-hant'],
    },
    Wikipedia: {},
  }

  install({special}) {
    special((callNext) => new Run(this.conf, callNext))
  }
}
