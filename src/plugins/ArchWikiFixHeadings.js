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

const WM = require('../modules')
const App = require('../app')
const {Plugin} = require('./_Plugin')


module.exports.ArchWikiFixHeadings = class ArchWikiFixHeadings extends Plugin {
  static get conf_default() {
    return {
      enabled: true,
      editor_menu: ['Text plugins', 'Fix headings'],
    }
  }

  main_editor(callNext) {
    let increaseLevel
    const source = WM.Editor.readSource()

    const info = WM.Parser.findSectionHeadings(source)

    if (WM.Editor.isSection()) {
      increaseLevel = info.minLevel - 1
    } else if (info.maxTocLevel < 6) {
      increaseLevel = 1
    } else {
      increaseLevel = 0
      App.log.warning('There are 6 levels of headings, it has \
been necessary to start creating them from level 1 \
although usually it is suggested to start from level 2')
    }

    let newtext = ''
    let prevId = 0

    for (const section of info.sections) {
      newtext += source.substring(prevId, section.index)
      newtext += new Array(section.tocLevel + increaseLevel + 1).join('=')
      newtext += section.rawheading
      newtext += new Array(section.tocLevel + increaseLevel + 1).join('=')
      prevId = section.index + section.length0
    }

    newtext += source.substr(prevId)

    if (newtext !== source) {
      WM.Editor.writeSource(newtext)
      App.log.info('Fixed section headings')
    }

    if (callNext) {
      return callNext()
    }
  }
}
