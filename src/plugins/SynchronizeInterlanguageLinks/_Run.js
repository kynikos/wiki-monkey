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

const WM = require('../../modules')


module.exports = class {
  detectLang(title, tag) {
    // Without this check this plugin would be specific to ArchWiki
    let pureTitle
    if (tag === 'ArchWiki') {
      const detect = WM.ArchWiki.detectLanguage(title)
      pureTitle = detect[0]
      tag = WM.ArchWiki.getInterlanguageTag(detect[1])
    } else {
      pureTitle = title
    }

    return [pureTitle, tag]
  }

  computeWhiteList(whitelist) {
    // Without this check this plugin would be specific to ArchWiki
    if (whitelist === 'ArchWiki') {
      return WM.ArchWiki.getInternalInterwikiLanguages()
    }
    return whitelist
  }

  computeSupportedLangs(supportedLangs) {
    // Without this check this plugin would be specific to ArchWiki
    if (supportedLangs === 'ArchWiki') {
      return WM.ArchWiki.getInterwikiLanguages()
    }
    return supportedLangs
  }
}
