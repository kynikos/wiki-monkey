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

function mapIdToIndex(bookmarks) {
  return bookmarks.reduce((acc, bm, index) => {
    acc[bm.id] = index
    return acc
  }, {})
}

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
    // NOTE how the bookmarks array is left with the original sorting even
    // after sorting of filtering the table rows; this has also the consequence
    // that the index passed to the table's field formatter functions is
    // different in general from the bookmark indexes in the bookmarks array
    // Also don't use a computed value in the component because it could
    // generate race bugs
    bookmarkIdToIndex: {},
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
      state.bookmarkIdToIndex = mapIdToIndex(bookmarks)
      state.loading = false
    },

    addBookmark(state, newBookmark) {
      const index = state.bookmarkIdToIndex[newBookmark.id]

      if (index == null) {
        // Just append the new bookmark and let the table's sorter functions
        // visualize its row where it should be; note that the bookmarks array
        // always keeps the original sorting
        state.bookmarks = state.bookmarks.concat(newBookmark)
        // Because the new bookmark has only been appended, I can just add the
        // new index to the mapping object, without having to update any others
        state.bookmarkIdToIndex = {
          ...state.bookmarkIdToIndex,
          [newBookmark.id]: state.bookmarks.length - 1,
        }
      } else {
        state.bookmarks = state.bookmarks.slice(0, index)
          .concat(newBookmark)
          .concat(state.bookmarks.slice(index + 1))
      }

      state.loading = false
    },

    // Do *not* use the index from the table's field formatter function, since
    // in general it's different from the bookmark's index in the bookmarks
    // array, which is never resorted and keeps the original sort order
    removeBookmark(state, id) {
      const index = state.bookmarkIdToIndex[id]
      const bookmarks = state.bookmarks.slice(0, index)
        .concat(state.bookmarks.slice(index + 1))
      state.bookmarks = bookmarks
      // Of course don't just remove the key from bookmarkIdToIndex, since all
      // the subsequent indices must be updated too, so just keep it simple and
      // update them all
      state.bookmarkIdToIndex = mapIdToIndex(bookmarks)
      state.loading = false
    },
  },

  actions: {
    async queryBookmarks({commit}) {
      commit('setLoading')
      const res = await WM.DB.get('bookmark')
      commit('storeBookmarks', res)
    },
    async saveBookmark({commit}, {
      sectionId = null,
      sectionNumber = null,
      sectionTitle = null,
    }) {
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
    // Do *not* use the index from the table's field formatter function, since
    // in general it's different from the bookmark's index in the bookmarks
    // array, which is never resorted and keeps the original sort order
    async deleteBookmark({commit}, id) {
      commit('setLoading')

      await WM.DB.delete('bookmark', {id})

      commit('removeBookmark', id)

      mw.notification.notify('Bookmark successfully deleted.', {
        tag: 'WikiMonkey-Bookmarks',
        title: 'Wiki Monkey',
        type: 'info',
      })
    },
  },
}
