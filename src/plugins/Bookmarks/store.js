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
const {moment} = require('../../modules/libs')

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
      // 'time_created',
      // 'time_updated',
      'action_due',
      'time_due',
      // 'notes',
    ],
    allBookmarks: [],
    pageBookmarks: [],
    sectionBookmarks: {},
    // NOTE how the bookmarks array is left with the original sorting even
    // after sorting of filtering the table rows; this has also the consequence
    // that the index passed to the table's field formatter functions is
    // different in general from the bookmark indexes in the bookmarks array
    // Also don't use a computed value in the component because it could
    // generate race bugs
    allBookmarkIdToIndex: {},
    pageBookmarkIdToIndex: {},
    sectionBookmarkIdToIndex: {},
    tableLoading: false,
    pageLoading: false,
    sectionLoading: {},
  },

  mutations: {
    updateShownFields(state, shownFields) {
      state.shownFields = shownFields
    },

    setTableLoading(state) {
      state.tableLoading = true
    },

    setPageLoading(state) {
      state.pageLoading = true
    },

    setSectionLoading(state, sectionId) {
      state.sectionLoading = {
        ...state.sectionLoading,
        [sectionId]: true,
      }
    },

    storeAllBookmarks(state, allBookmarks) {
      state.allBookmarks = allBookmarks
      state.allBookmarkIdToIndex = mapIdToIndex(allBookmarks)
      state.tableLoading = false
    },

    storePageBookmarks(state, pageBookmarks) {
      state.pageBookmarks = pageBookmarks
      state.pageBookmarkIdToIndex = mapIdToIndex(pageBookmarks)
      state.pageLoading = false
    },

    storeSectionBookmarks(state, {sectionId, bookmarks}) {
      state.sectionBookmarks = {
        ...state.sectionBookmarks,
        [sectionId]: bookmarks,
      }
      state.sectionBookmarkIdToIndex = {
        ...state.sectionBookmarkIdToIndex,
        [sectionId]: mapIdToIndex(bookmarks),
      }
      state.sectionLoading = {
        ...state.sectionLoading,
        [sectionId]: false,
      }
    },

    addBookmark(state, newBookmark) {
      // TODO: Also update stored page and section bookmarks
      const index = state.allBookmarkIdToIndex[newBookmark.id]

      if (index == null) {
        // Just append the new bookmark and let the table's sorter functions
        // visualize its row where it should be; note that the bookmarks array
        // always keeps the original sorting
        state.allBookmarks = state.allBookmarks.concat(newBookmark)
        // Because the new bookmark has only been appended, I can just add the
        // new index to the mapping object, without having to update any others
        state.allBookmarkIdToIndex = {
          ...state.allBookmarkIdToIndex,
          [newBookmark.id]: state.allBookmarks.length - 1,
        }
      } else {
        state.allBookmarks = state.allBookmarks.slice(0, index)
          .concat(newBookmark)
          .concat(state.allBookmarks.slice(index + 1))
      }

      state.tableLoading = false
    },

    // Do *not* use the index from the table's field formatter function, since
    // in general it's different from the bookmark's index in the bookmarks
    // array, which is never resorted and keeps the original sort order
    removeBookmark(state, id) {
      // TODO: Also update stored page and section bookmarks
      const index = state.allBookmarkIdToIndex[id]
      const allBookmarks = state.allBookmarks.slice(0, index)
        .concat(state.allBookmarks.slice(index + 1))
      state.allBookmarks = allBookmarks
      // Of course don't just remove the key from allBookmarkIdToIndex, since
      // all the subsequent indices must be updated too, so just keep it simple
      // and update them all
      state.allBookmarkIdToIndex = mapIdToIndex(allBookmarks)
      state.tableLoading = false
    },
  },

  actions: {
    async queryAllBookmarks({commit}) {
      commit('setTableLoading')
      const res = await WM.DB.get('bookmark')
      commit('storeAllBookmarks', res)
    },
    async queryPageBookmarks({commit}) {
      commit('setPageLoading')
      const res = await WM.DB.get('bookmark/page', {
        wgArticleId: mw.config.get('wgArticleId'),
        wgPageName: mw.config.get('wgPageName'),
      })
      commit('storePageBookmarks', res)
    },
    async querySectionBookmarks({commit}, sectionId) {
      commit('setSectionLoading', sectionId)
      const res = await WM.DB.get('bookmark/section', {
        wgArticleId: mw.config.get('wgArticleId'),
        wgPageName: mw.config.get('wgPageName'),
        section_id: sectionId,
      })
      commit('storeSectionBookmarks', {sectionId, bookmarks: res})
    },
    async saveBookmark({commit}, {
      sectionId = null,
      sectionNumber = null,
      sectionTitle = null,
    }) {
      commit('setTableLoading')

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
      const uri = new mw.Uri()
      uri.fragment = sectionId || null
      data.url = uri.toString()

      data.section_id = sectionId
      data.section_number = sectionNumber
      data.section_title = sectionTitle

      // TODO
      data.action_due = 'TODO'
      data.time_due = moment().toISOString()
      data.notes = null

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
      commit('setTableLoading')

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
