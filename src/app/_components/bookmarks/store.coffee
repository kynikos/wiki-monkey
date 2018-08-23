# Wiki Monkey - MediaWiki bot and editor-assistant user script
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

WM = require('../../../modules')

module.exports = {
    namespaced: true

    state: {
        shownFields: [
            'url'
            'wgPageName'
            # 'wgRelevantPageName'
            # 'wgCanonicalSpecialPageName'
            'wgCanonicalNamespace'
            # 'wgTitle'
            # 'wgAction'
            # 'wgIsArticle'
            # 'wgIsProbablyEditable'
            # 'wgRelevantPageIsProbablyEditable'
            # 'wgPageContentLanguage'
            # 'wgPageContentModel'
            # 'wgArticleId'
            # 'wgNamespaceNumber'
            # 'wgRevisionId'
            # 'wgCurRevisionId'
            # 'wgDiffOldId'
            # 'wgDiffNewId'
            'time_created'
            'time_updated'
        ]
        bookmarks: []
    }

    mutations: {
        updateShownFields: (state, shownFields) ->
            state.shownFields = shownFields

        storeBookmarks: (state, bookmarks) ->
            state.bookmarks = bookmarks
    }

    actions: {
        queryBookmarks: ({commit}) ->
            res = await WM.DB.get('bookmark')
            commit('storeBookmarks', res)
    }
}
