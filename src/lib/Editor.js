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

const WM = require('%/index')


module.exports = class Editor {
  constructor() {}

  getTitle() {
    return WM.Parser.squashContiguousWhitespace(mw.config.get('wgPageName'))
  }

  isSection() {
    if ($('[name=wpSection]').eq(0).val()) {
      return true
    }
    return false
  }

  readSource() {
    return $('#wpTextbox1').val()
  }

  writeSource(text) {
    return $('#wpTextbox1').val(text)
  }

  readSummary() {
    return $('#wpSummary').val()
  }

  writeSummary(text) {
    return $('#wpSummary').val(text)
  }

  appendToSummary(text) {
    return $('#wpSummary').val(this.readSummary() + text)
  }
}
