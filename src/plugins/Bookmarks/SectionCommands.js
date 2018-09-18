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


module.exports = function (conf) { // eslint-disable-line max-lines-per-function
  return {
    name: 'BookmarksSectionCommands',

    props: {
      section: {
        type: Object,
        required: true,
      },
      headline: {
        type: Object,
        required: true,
      },
    },

    render(h) {
      return h('a', {
        attrs: {
          href: '#save',
          title: 'Bookmark this page',
        },
        on: {
          click(event) {
            event.preventDefault()

            const data = [
              'wgArticleId',
              'wgPageName',
              'wgRelevantPageName',
              'wgCanonicalSpecialPageName',
              'wgCanonicalNamespace',
              'wgNamespaceNumber',
              'wgTitle',
              'wgRevisionId',
              'wgCurRevisionId',
              'wgDiffOldId',
              'wgDiffNewId',
              'wgAction',
              'wgIsArticle',
              'wgIsProbablyEditable',
              'wgRelevantPageIsProbablyEditable',
              'wgPageContentLanguage',
              'wgPageContentModel',
            ].reduce(
              (acc, item) => {
                acc[item] = mw.config.get(item)
                return acc
              }
              , {}
            )
            data.url = location.href

            return WM.DB.put('bookmark', data).done((data2) => {
              console.debug('RESPONSE:', data2)
            }).fail((data2) => {
              console.debug('ERROR:', data2)
            })
          },
        },
      }, ['b'])
    },
  }
}
