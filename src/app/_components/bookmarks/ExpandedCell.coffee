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

{Vue, Vuex} = require('../../../modules/libs')


module.exports.ExpandedCell = {
    name: 'ExpandedCell'

    computed: {
        Vuex.mapState('bookmarks', [
            'shownFields'
        ])...
    }

    props: {
        row: {
            type: Object
            required: true
        }
    }

    render: (h) ->
        return h('div', [
            h('div', [
                'url: '
                @row.url
            ]) if 'url' not in @shownFields
            h('div', [
                'wgPageName: '
                @row.wgPageName
            ]) if 'wgPageName' not in @shownFields
            h('div', [
                'wgRelevantPageName: '
                @row.wgRelevantPageName
            ]) if 'wgRelevantPageName' not in @shownFields
            h('div', [
                'wgCanonicalSpecialPageName: '
                @row.wgCanonicalSpecialPageName
            ]) if 'wgCanonicalSpecialPageName' not in @shownFields
            h('div', [
                'wgCanonicalNamespace: '
                @row.wgCanonicalNamespace
            ]) if 'wgCanonicalNamespace' not in @shownFields
            h('div', [
                'wgTitle: '
                @row.wgTitle
            ]) if 'wgTitle' not in @shownFields
            h('div', [
                'wgAction: '
                @row.wgAction
            ]) if 'wgAction' not in @shownFields
            h('div', [
                'wgIsArticle: '
                @row.wgIsArticle
            ]) if 'wgIsArticle' not in @shownFields
            h('div', [
                'wgIsProbablyEditable: '
                @row.wgIsProbablyEditable
            ]) if 'wgIsProbablyEditable' not in @shownFields
            h('div', [
                'wgRelevantPageIsProbablyEditable: '
                @row.wgRelevantPageIsProbablyEditable
            ]) if 'wgRelevantPageIsProbablyEditable' not in @shownFields
            h('div', [
                'wgPageContentLanguage: '
                @row.wgPageContentLanguage
            ]) if 'wgPageContentLanguage' not in @shownFields
            h('div', [
                'wgPageContentModel: '
                @row.wgPageContentModel
            ]) if 'wgPageContentModel' not in @shownFields
            h('div', [
                'wgArticleId: '
                @row.wgArticleId
            ]) if 'wgArticleId' not in @shownFields
            h('div', [
                'wgNamespaceNumber: '
                @row.wgNamespaceNumber
            ]) if 'wgNamespaceNumber' not in @shownFields
            h('div', [
                'wgRevisionId: '
                @row.wgRevisionId
            ]) if 'wgRevisionId' not in @shownFields
            h('div', [
                'wgCurRevisionId: '
                @row.wgCurRevisionId
            ]) if 'wgCurRevisionId' not in @shownFields
            h('div', [
                'wgDiffOldId: '
                @row.wgDiffOldId
            ]) if 'wgDiffOldId' not in @shownFields
            h('div', [
                'wgDiffNewId: '
                @row.wgDiffNewId
            ]) if 'wgDiffNewId' not in @shownFields
            h('div', [
                'time_created: '
                @row.time_created
            ]) if 'time_created' not in @shownFields
            h('div', [
                'time_updated: '
                @row.time_updated
            ]) if 'time_updated' not in @shownFields
        ])
}
