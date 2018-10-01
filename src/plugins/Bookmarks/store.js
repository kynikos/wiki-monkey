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

module.exports = {
  namespaced: true,

  state: {
    shownFields: [
      // 'id',
      'url',
      // 'section_id',
      // 'section_number',
      'section_title',
      'wgPageName',
      // 'wgRelevantPageName'
      // 'wgCanonicalSpecialPageName'
      'wgCanonicalNamespace',
      // 'wgTitle'
      // 'wgAction'
      // 'wgIsArticle'
      // 'wgIsProbablyEditable'
      // 'wgRelevantPageIsProbablyEditable'
      // 'wgPageContentLanguage'
      // 'wgPageContentModel'
      // 'wgArticleId'
      // 'wgNamespaceNumber'
      // 'wgRevisionId'
      // 'wgCurRevisionId'
      // 'wgDiffOldId'
      // 'wgDiffNewId'
      'time_created',
      'time_updated',
    ],
    bookmarks: [],
    loading: false,
  },

  mutations: {
    updateShownFields(state, shownFields) {
      state.shownFields = shownFields
    },

    setLoading(state) {
      state.loading = true
    },

    storeBookmarks(state, bookmarks) {
      state.bookmarks = bookmarks
      state.loading = false
    },

    addBookmark(state, bookmark) {
      // BUG: Possibly update the existing id if already in the table
      state.bookmarks = [bookmark].concat(state.bookmarks)
      state.loading = false
    },

    removeBookmark(state, index) {
      state.bookmarks =
        state.bookmarks.slice(0, index).concat(state.bookmarks.slice(index + 1))
      state.loading = false
    },
  },

  actions: {
    async queryBookmarks({commit}) {
      commit('setLoading')
      const res = await WM.DB.get('bookmark')
      commit('storeBookmarks', res)
    },
    async saveBookmark({commit}, { // eslint-disable-line max-statements,max-lines-per-function
      sectionId = null,
      sectionNumber = null,
      sectionTitle = null,
    }) { // eslint-disable-line max-statements
      commit('setLoading')

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
        // 'wgCategories'  # TODO
      ].reduce((acc, item) => {
        acc[item] = mw.config.get(item)
        return acc
      }, {})

      // Don't rely on the current url's fragment
      const uri = new mw.Uri().clone()
      if (sectionId) {
        uri.fragment = sectionId
      } else {
        uri.fragment = null
      }
      data.url = uri.toString()

      data.section_id = sectionId
      data.section_number = sectionNumber
      data.section_title = sectionTitle

      const res = await WM.DB.post('bookmark', data)

      commit('addBookmark', res.bookmark)

      mw.notification.notify('Bookmark successfully saved.', {
        tag: 'WikiMonkey-Bookmarks',
        title: 'Wiki Monkey',
        type: 'info',
      })
    },
    async deleteBookmark({commit}, {id, index}) {
      commit('setLoading')

      await WM.DB.delete('bookmark', {id})

      commit('removeBookmark', index)

      mw.notification.notify('Bookmark successfully deleted.', {
        tag: 'WikiMonkey-Bookmarks',
        title: 'Wiki Monkey',
        type: 'info',
      })
    },
  },
}
