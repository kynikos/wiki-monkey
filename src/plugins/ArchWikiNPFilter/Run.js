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

const {jssc} = require('../../modules/libs')
const WM = require('../../index')


module.exports = class {
  constructor(conf) {
    this.conf = conf

    jssc({
      '@global #mw-content-text > h5': {
        backgroundColor: '#afa',
      },
    })

    const contentDiv = $('#mw-content-text')
    const ul = contentDiv.find('ul').first()
    const liList = ul.children('li')

    for (const li of liList) {
      const link = $(li).find('a.mw-newpages-pagename').first()
      const [pureTitle, language] = WM.ArchWiki.detectLanguage(link[0].title)
      if (language !== this.conf.default_language) {
        this.moveArticle(contentDiv, li, language)
      }
    }

    return WM.App.log.info('Grouped articles by language')
  }

  moveArticle(contentDiv, li, language) {
    const langHs = contentDiv.children('h5')
    let langFound = false
    for (const HLang of langHs) {
      if (HLang.innerHTML === language) {
        const ul = $(HLang).next().append(li)
        langFound = true
        break
      }
    }

    if (!langFound) {
      return contentDiv.append(
        $('<h5>').text(language),
        $('<ul>').append(li)
      )
    }
  }
}
