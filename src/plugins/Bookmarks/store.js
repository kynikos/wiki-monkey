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

module.exports = function storeModule(conf) {
  return {
    namespaced: true,

    state: {
      conf,
      allShownFields: conf.allTableShownFields,
      pageShownFields: conf.pageTableShownFields,
      sectionShownFields: conf.sectionTableShownFields,
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
      loading: false,
    },

    mutations: {
      updateAllShownFields(state, shownFields) {
        state.allShownFields = shownFields
      },

      updatePageShownFields(state, shownFields) {
        state.pageShownFields = shownFields
      },

      updateSectionShownFields(state, shownFields) {
        state.sectionShownFields = shownFields
      },

      setLoading(state) {
        state.loading = true
      },

      storeAllBookmarks(state, allBookmarks) {
        state.allBookmarks = allBookmarks
        state.allBookmarkIdToIndex = mapIdToIndex(allBookmarks)
        state.loading = false
      },

      storePageBookmarks(state, pageBookmarks) {
        state.pageBookmarks = pageBookmarks
        state.pageBookmarkIdToIndex = mapIdToIndex(pageBookmarks)
        state.loading = false
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
        state.loading = false
      },

      upsertBookmark(state, bookmark) {
        const allIndex = state.allBookmarkIdToIndex[bookmark.id]

        if (allIndex == null) {
          // The bookmark is not in allBookmarks (it's new)

          // Just append the new bookmark and let the table's sorter functions
          // visualize its row where it should be; note that the bookmarks array
          // always keeps the original sorting
          state.allBookmarks = state.allBookmarks.concat(bookmark)

          // Because the new bookmark has only been appended, I can just add the
          // new index to the mapping object, without having to update any others
          state.allBookmarkIdToIndex = {
            ...state.allBookmarkIdToIndex,
            [bookmark.id]: state.allBookmarks.length - 1,
          }
        } else {
          // The bookmark is already in allBookmarks, no need to update
          // allBookmarkIdToIndex

          state.allBookmarks = state.allBookmarks.slice(0, allIndex)
            .concat(bookmark)
            .concat(state.allBookmarks.slice(allIndex + 1))
        }

        // Don't merge the following blocks with that for allBookmarks above,
        // since allBookmarks is only queried the first time that the table is
        // visualised, so it may be still empty

        const wgArticleId = mw.config.get('wgArticleId')
        const wgPageName = mw.config.get('wgPageName')

        const pageIndex = state.pageBookmarkIdToIndex[bookmark.id]

        if (pageIndex == null) {
          // The bookmark is not in pageBookmarks (nor in sectionBookmarks,
          // but deal with it separately for clarity, don't optimize for the
          // sake of it)

          if (
            bookmark.wgArticleId === wgArticleId ||
            bookmark.wgPageName === wgPageName
          ) {
            // The bookmark does refer to this page

            // [analogous comment as for allBookmarks above]
            state.pageBookmarks = state.pageBookmarks.concat(bookmark)

            // [analogous comment as for allBookmarkIdToIndex above]
            state.pageBookmarkIdToIndex = {
              ...state.pageBookmarkIdToIndex,
              [bookmark.id]: state.pageBookmarks.length - 1,
            }
          }
        } else {
          // The bookmark is already in pageBookmarks (so it's already proved
          // that it refers to this page), no need to update
          // pageBookmarkIdToIndex

          state.pageBookmarks = state.pageBookmarks.slice(0, pageIndex)
            .concat(bookmark)
            .concat(state.pageBookmarks.slice(pageIndex + 1))
        }

        if (bookmark.section_id in state.sectionBookmarkIdToIndex) {
          // The section ID is in sectionBookmarks (so it's already proved that
          // the bookmark refers to this page)

          const sectionIndex = state.sectionBookmarkIdToIndex[
            bookmark.section_id][bookmark.id]

          if (sectionIndex == null) {
            // The bookmark is not in sectionBookmarks

            // [analogous comment as for allBookmarks above]
            state.sectionBookmarks[bookmark.section_id] =
              state.sectionBookmarks[bookmark.section_id].concat(bookmark)

            // [analogous comment as for allBookmarkIdToIndex above]
            state.sectionBookmarkIdToIndex[bookmark.section_id] = {
              ...state.sectionBookmarkIdToIndex[bookmark.section_id],
              [bookmark.id]: state.sectionBookmarks[bookmark.section_id].length - 1,
            }
          } else {
            // The bookmark is already in sectionBookmarks, no need to update
            // sectionBookmarkIdToIndex

            state.sectionBookmarks[bookmark.section_id] =
              state.sectionBookmarks[bookmark.section_id]
                .slice(0, sectionIndex)
                .concat(bookmark)
                .concat(state.sectionBookmarks[bookmark.section_id]
                  .slice(sectionIndex + 1))
          }
        } else if (
          bookmark.wgArticleId === wgArticleId ||
          bookmark.wgPageName === wgPageName
        ) {
          // Neither the section ID nor the bookmark are in sectionBookmarks
          // The bookmark does refer to this page

          state.sectionBookmarks[bookmark.section_id] = [bookmark]
          state.sectionBookmarkIdToIndex[bookmark.section_id] = {
            [bookmark.id]: 0,
          }
        }

        state.loading = false
      },

      // Do *not* use the index from the table's field formatter function, since
      // in general it's different from the bookmark's index in the bookmarks
      // array, which is never resorted and keeps the original sort order
      removeBookmark(state, bookmark) {
        const allIndex = state.allBookmarkIdToIndex[bookmark.id]
        const allBookmarks = state.allBookmarks.slice(0, allIndex)
          .concat(state.allBookmarks.slice(allIndex + 1))
        state.allBookmarks = allBookmarks
        // Of course don't just remove the key from allBookmarkIdToIndex, since
        // all the subsequent indices must be updated too, so just keep it simple
        // and update them all
        state.allBookmarkIdToIndex = mapIdToIndex(allBookmarks)

        const pageIndex = state.pageBookmarkIdToIndex[bookmark.id]
        if (pageIndex != null) {
          const pageBookmarks = state.pageBookmarks.slice(0, pageIndex)
            .concat(state.pageBookmarks.slice(pageIndex + 1))
          state.pageBookmarks = pageBookmarks
          // [analogous comment as for allBookmarkIdToIndex above]
          state.pageBookmarkIdToIndex = mapIdToIndex(pageBookmarks)
        }

        if (bookmark.section_id in state.sectionBookmarkIdToIndex) {
          const sectionIndex = state.sectionBookmarkIdToIndex[
            bookmark.section_id][bookmark.id]
          if (sectionIndex != null) {
            const sectionBookmarks = state.sectionBookmarks[bookmark.section_id]
              .slice(0, sectionIndex)
              .concat(state.sectionBookmarks[bookmark.section_id]
                .slice(sectionIndex + 1))
            state.sectionBookmarks[bookmark.section_id] = sectionBookmarks
            // [analogous comment as for allBookmarkIdToIndex above]
            state.sectionBookmarkIdToIndex[bookmark.section_id] =
              mapIdToIndex(sectionBookmarks)
          }
        }

        state.loading = false
      },
    },

    actions: {
      async queryAllBookmarks({commit}) {
        commit('setLoading')
        const res = await WM.DB.get('bookmark')
        commit('storeAllBookmarks', res)
      },
      async queryPageBookmarks({commit}) {
        commit('setLoading')
        const res = await WM.DB.get('bookmark/page', {
          // Currently the criterion to identify bookmarks belonging to the page
          // is to match the wgArticleId or the wgPageName (see also on the
          // server); if changing this, also the criteria in the mutations must
          // be changed accordingly, e.g. in upsertBookmark and removeBookmark
          wgArticleId: mw.config.get('wgArticleId'),
          wgPageName: mw.config.get('wgPageName'),
        })
        commit('storePageBookmarks', res)
      },
      async querySectionBookmarks({commit}, sectionId) {
        commit('setLoading')
        const res = await WM.DB.get('bookmark/section', {
          // Currently the criterion to identify bookmarks belonging to the
          // section is to match the wgArticleId or the wgPageName, and the
          // section_id (see also on the server); if changing this, also the
          // criteria in the mutations must be changed accordingly, e.g. in
          // upsertBookmark and removeBookmark
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
        bookmarkId = null,
        action = null,
        delay = null,
        notes = null,
      }) {
        commit('setLoading')

        let data

        if (bookmarkId == null) {
          data = [
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
        } else {
          data = {id: bookmarkId}
        }

        data.action_due = action
        // Duration units must comply with https://momentjs.com/docs/#/durations/
        // TODO: Return an error for invalid strings
        const [_, durationNumber, durationUnit] = delay.match(/(\d+) ?(.+)/u)
        data.time_due = moment().add(parseInt(durationNumber, 10), durationUnit)
          .toISOString()
        data.notes = notes

        let res

        if (bookmarkId == null) {
          res = await WM.DB.post('bookmark', data)
        } else {
          res = await WM.DB.patch('bookmark', data)
        }

        commit('upsertBookmark', res.bookmark)

        mw.notification.notify('Bookmark successfully saved.', {
          tag: 'WikiMonkey-Bookmarks',
          title: 'Wiki Monkey',
          type: 'info',
        })
      },
      // Do *not* use the index from the table's field formatter function, since
      // in general it's different from the bookmark's index in the bookmarks
      // array, which is never resorted and keeps the original sort order
      async deleteBookmark({commit}, bookmark) {
        commit('setLoading')

        await WM.DB.delete('bookmark', {id: bookmark.id})

        commit('removeBookmark', bookmark)

        mw.notification.notify('Bookmark successfully deleted.', {
          tag: 'WikiMonkey-Bookmarks',
          title: 'Wiki Monkey',
          type: 'info',
        })
      },
    },
  }
}
