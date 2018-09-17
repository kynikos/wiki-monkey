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
const {Vue, Vuex, styled} = require('../../modules/libs')


module.exports.PageCommands = class {
  constructor(container) { // eslint-disable-line max-lines-per-function
    // Add as a "page status indicator"
    // https://www.mediawiki.org/wiki/Help:Page_status_indicators

    const root = document.createElement('div')
    $(container).prepend(root)
    const articleLink = WM.Parser.squashContiguousWhitespace(`[[${mw.config.get('wgPageName')}]]`)

    return new Vue({
      el: root,

      store: WM.App.store,

      computed: {
        ...Vuex.mapState('main', {
          mainIsShown: 'shown',
        }),
      },

      methods: {
        ...Vuex.mapActions('main', {
          toggleMain: 'toggleAlone',
        }),
      },

      render(h) { // eslint-disable-line max-lines-per-function
        return h('div', {
          class: {'mw-indicator': true},
        }, [
          '[ ',
          h('a', {
            attrs: {
              href: '#wiki-monkey',
              title: `${this.mainIsShown && 'Close' || 'Open'} the main \
  Wiki Monkey interface`,
            },
            on: {
              click: (event) => {
                event.preventDefault()
                return this.toggleMain()
              },
            },
          }, ['WM']),
          ' | ',
          h('a', {
            attrs: {
              href: '#copy-article-wiki-link',
              title: `Copy \"${articleLink}\" to the clipboard`,
              'data-clipboard-text': articleLink,
            },
            on: {
              click(event) {
                return event.preventDefault()
              },
            },
            ref: 'copyArticleWikiLink',
          }, ['c']),
          ' | ',
          h('a', {
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

                return WM.DB.put('bookmark', data).done((data) => {
                  console.debug('RESPONSE:', data)
                }).fail((data) => {
                  console.debug('ERROR:', data)
                })
              },
            },
          }, ['b']),
          ' ]',
        ])
      },

      mounted() {
        return WM.Clipboard.enable(this.$refs.copyArticleWikiLink)
      },
    })
  }
}
