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
const WM = require('../../modules')


module.exports = class {
  constructor(conf) {
    this.conf = conf

    const h4s = $('#mw-content-text .mw-changeslist > h4')

    if (h4s.eq(0).next()[0].localName.toLowerCase() !== 'div') {
      return WM.App.log.error('This filter is designed to work on top of \
MediaWiki\'s filter, which you can \
enable in your user preferences.')
    }
    jssc({
      '@global': {
        '#mw-content-text': {
          '& > div > h4': {
            backgroundColor: '#aaf',
          },
          '& > div > div > h5': {
            backgroundColor: '#afa',
          },
        },
      },
    })

    for (const h4 of h4s) {
      const groupDiv = $(h4).next()
      for (const articleTable of groupDiv.children('table')) {
        const link = $(articleTable).find('a.mw-changeslist-title')
          .first()
        if (link[0]) {
          const [pureTitle, language] = WM.ArchWiki.detectLanguage(link[0].title)
          if (language !== this.conf.default_language) {
            this.moveArticle(groupDiv, articleTable, language)
          }
        }
      }
    }

    return WM.App.log.info('Grouped articles by language')
  }

  moveArticle(groupDiv, articleTable, language) {
    const langHs = groupDiv.children('h5')
    let langFound = false
    for (let i = 0; i < langHs.length; i++) {
      const HLang = langHs[i]
      if (HLang.innerHTML === language) {
        if (i + 1 < langHs.length) {
          langHs.eq(i + 1).before(articleTable)
        } else {
          groupDiv.append(articleTable)
        }
        langFound = true
        break
      }
    }

    if (!langFound) {
      return groupDiv.append(
        $('<h5>').text(language),
        articleTable
      )
    }
  }
}
