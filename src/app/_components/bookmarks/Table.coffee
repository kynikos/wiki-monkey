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

{Vue, Vuex, moment} = require('../../../modules/libs')
{ExpandedCell} = require('./ExpandedCell')


module.exports.Table = {
    name: 'Table'

    computed: {
        Vuex.mapState('bookmarks', [
            'shownFields'
            'bookmarks'
        ])...
    }

    render: (h) ->
        return h('div', [h('ElTable', {
            props: {
                data: @bookmarks
                stripe: true
                border: true
                maxHeight: 1000 # Fixed header
                vLoading: @bookmarks.length and true or false
                elementLoadingText: 'Loading...'
            }
        }, [
            h('ElTableColumn', {
                props: {type: 'expand'}
                scopedSlots: {
                    default: (props) ->
                        h(ExpandedCell, {props: {row: props.row}})
                }
            })
            h('ElTableColumn', {props: {
                prop: 'url'
                label: 'url'
                sortable: true
                formatter: (row, column, cellValue, index) ->
                    h('a', {attrs: {href: cellValue}}, ['link'])
            }}) if 'url' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgPageName'
                label: 'wgPageName'
                sortable: true
                formatter: (row, column, cellValue, index) ->
                    title = new mw.Title(cellValue)
                    return title.toText()
            }}) if 'wgPageName' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgRelevantPageName'
                label: 'wgRelevantPageName'
                sortable: true
                formatter: (row, column, cellValue, index) ->
                    title = new mw.Title(cellValue)
                    return title.toText()
            }}) if 'wgRelevantPageName' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgCanonicalSpecialPageName'
                label: 'wgCanonicalSpecialPageName'
                sortable: true
            }}) if 'wgCanonicalSpecialPageName' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgCanonicalNamespace'
                label: 'wgCanonicalNamespace'
                sortable: true
            }}) if 'wgCanonicalNamespace' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgTitle'
                label: 'wgTitle'
                sortable: true
            }}) if 'wgTitle' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgAction'
                label: 'wgAction'
                sortable: true
            }}) if 'wgAction' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgIsArticle'
                label: 'wgIsArticle'
                sortable: true
            }}) if 'wgIsArticle' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgIsProbablyEditable'
                label: 'wgIsProbablyEditable'
                sortable: true
            }}) if 'wgIsProbablyEditable' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgRelevantPageIsProbablyEditable'
                label: 'wgRelevantPageIsProbablyEditable'
                sortable: true
            }}) if 'wgRelevantPageIsProbablyEditable' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgPageContentLanguage'
                label: 'wgPageContentLanguage'
                sortable: true
            }}) if 'wgPageContentLanguage' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgPageContentModel'
                label: 'wgPageContentModel'
                sortable: true
            }}) if 'wgPageContentModel' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgArticleId'
                label: 'wgArticleId'
                sortable: true
            }}) if 'wgArticleId' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgNamespaceNumber'
                label: 'wgNamespaceNumber'
                sortable: true
            }}) if 'wgNamespaceNumber' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgRevisionId'
                label: 'wgRevisionId'
                sortable: true
            }}) if 'wgRevisionId' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgCurRevisionId'
                label: 'wgCurRevisionId'
                sortable: true
            }}) if 'wgCurRevisionId' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgDiffOldId'
                label: 'wgDiffOldId'
                sortable: true
            }}) if 'wgDiffOldId' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'wgDiffNewId'
                label: 'wgDiffNewId'
                sortable: true
            }}) if 'wgDiffNewId' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'time_created'
                label: 'time_created'
                sortable: true
                formatter: (row, column, cellValue, index) ->
                    moment(cellValue).format('YYYY-MM-DD dd HH:mm')
            }}) if 'time_created' in @shownFields
            h('ElTableColumn', {props: {
                prop: 'time_updated'
                label: 'time_updated'
                sortable: true
                formatter: (row, column, cellValue, index) ->
                    moment(cellValue).toISOString()
            }}) if 'time_updated' in @shownFields
        ])])
}
