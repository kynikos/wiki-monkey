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

const {Vuex, moment} = require('../../modules/libs')
const {popoverConfirm} = require('../../app/_components/popoverConfirm')
const {ExpandedCell} = require('./ExpandedCell')


module.exports.Table = {
  name: 'Table',

  computed: {
    ...Vuex.mapState('plugins/bookmarks', [
      'shownFields',
      'loading',
      'bookmarks',
    ]),
  },

  methods: {
    ...Vuex.mapActions('plugins/bookmarks', [
      'deleteBookmark',
    ]),
  },

  render(h) { // eslint-disable-line max-lines-per-function,complexity
    return h('div', [h('ElTable', {
      ref: 'table',
      props: {
        data: this.bookmarks,
        // TODO: The default style is quite poor...
        stripe: true,
        border: true,
        maxHeight: 1000, // Fixed header
        defaultSort: {
          prop: 'time_updated',
          order: 'descending',
        },
      },
      attrs: {
        'element-loading-text': 'Loading...',
      },
      directives: [
        {
          name: 'loading',
          value: this.loading,
        },
      ],
    }, [
      // TODO: Also enable select checkboxes to delete/move multiple rows at
      //       once? In that case remove the individual deleve/move controls
      //       per row
      h('ElTableColumn', {
        props: {type: 'expand'},
        scopedSlots: {
          default(props) {
            return h(ExpandedCell, {props: {row: props.row}})
          },
        },
      }),
      this.shownFields.includes('id') && h('ElTableColumn', {props: {
        prop: 'id',
        label: 'id',
        sortable: true,
      }}),
      this.shownFields.includes('url') && h('ElTableColumn', {props: {
        prop: 'url',
        label: 'url',
        sortable: true,
        formatter(row, column, cellValue, index) { // eslint-disable-line max-params
          return h('a', {attrs: {href: cellValue}}, ['link'])
        },
      }}),
      this.shownFields.includes('section_id') && h('ElTableColumn', {props: {
        prop: 'section_id',
        label: 'section_id',
        sortable: true,
      }}),
      this.shownFields.includes('section_number') && h('ElTableColumn', {props: {
        prop: 'section_number',
        label: 'section_number',
        sortable: true,
      }}),
      this.shownFields.includes('section_title') && h('ElTableColumn', {props: {
        prop: 'section_title',
        label: 'section_title',
        sortable: true,
      }}),
      this.shownFields.includes('wgPageName') && h('ElTableColumn', {props: {
        prop: 'wgPageName',
        label: 'wgPageName',
        sortable: true,
        formatter(row, column, cellValue, index) { // eslint-disable-line max-params
          const title = new mw.Title(cellValue)
          return title.toText()
        },
      }}),
      this.shownFields.includes('wgRelevantPageName') && h('ElTableColumn', {props: {
        prop: 'wgRelevantPageName',
        label: 'wgRelevantPageName',
        sortable: true,
        formatter(row, column, cellValue, index) { // eslint-disable-line max-params
          const title = new mw.Title(cellValue)
          return title.toText()
        },
      }}),
      this.shownFields.includes('wgCanonicalSpecialPageName') && h('ElTableColumn', {props: {
        prop: 'wgCanonicalSpecialPageName',
        label: 'wgCanonicalSpecialPageName',
        sortable: true,
      }}),
      this.shownFields.includes('wgCanonicalNamespace') && h('ElTableColumn', {props: {
        prop: 'wgCanonicalNamespace',
        label: 'wgCanonicalNamespace',
        sortable: true,
      }}),
      this.shownFields.includes('wgTitle') && h('ElTableColumn', {props: {
        prop: 'wgTitle',
        label: 'wgTitle',
        sortable: true,
      }}),
      this.shownFields.includes('wgAction') && h('ElTableColumn', {props: {
        prop: 'wgAction',
        label: 'wgAction',
        sortable: true,
      }}),
      this.shownFields.includes('wgIsArticle') && h('ElTableColumn', {props: {
        prop: 'wgIsArticle',
        label: 'wgIsArticle',
        sortable: true,
      }}),
      this.shownFields.includes('wgIsProbablyEditable') && h('ElTableColumn', {props: {
        prop: 'wgIsProbablyEditable',
        label: 'wgIsProbablyEditable',
        sortable: true,
      }}),
      this.shownFields.includes('wgRelevantPageIsProbablyEditable') && h('ElTableColumn', {props: {
        prop: 'wgRelevantPageIsProbablyEditable',
        label: 'wgRelevantPageIsProbablyEditable',
        sortable: true,
      }}),
      this.shownFields.includes('wgPageContentLanguage') && h('ElTableColumn', {props: {
        prop: 'wgPageContentLanguage',
        label: 'wgPageContentLanguage',
        sortable: true,
      }}),
      this.shownFields.includes('wgPageContentModel') && h('ElTableColumn', {props: {
        prop: 'wgPageContentModel',
        label: 'wgPageContentModel',
        sortable: true,
      }}),
      this.shownFields.includes('wgArticleId') && h('ElTableColumn', {props: {
        prop: 'wgArticleId',
        label: 'wgArticleId',
        sortable: true,
      }}),
      this.shownFields.includes('wgNamespaceNumber') && h('ElTableColumn', {props: {
        prop: 'wgNamespaceNumber',
        label: 'wgNamespaceNumber',
        sortable: true,
      }}),
      this.shownFields.includes('wgRevisionId') && h('ElTableColumn', {props: {
        prop: 'wgRevisionId',
        label: 'wgRevisionId',
        sortable: true,
      }}),
      this.shownFields.includes('wgCurRevisionId') && h('ElTableColumn', {props: {
        prop: 'wgCurRevisionId',
        label: 'wgCurRevisionId',
        sortable: true,
      }}),
      this.shownFields.includes('wgDiffOldId') && h('ElTableColumn', {props: {
        prop: 'wgDiffOldId',
        label: 'wgDiffOldId',
        sortable: true,
      }}),
      this.shownFields.includes('wgDiffNewId') && h('ElTableColumn', {props: {
        prop: 'wgDiffNewId',
        label: 'wgDiffNewId',
        sortable: true,
      }}),
      this.shownFields.includes('time_created') && h('ElTableColumn', {props: {
        prop: 'time_created',
        label: 'time_created',
        sortable: true,
        formatter(row, column, cellValue, index) { // eslint-disable-line max-params
          return moment(cellValue).format('YYYY-MM-DD dd HH:mm')
        },
      }}),
      this.shownFields.includes('time_updated') && h('ElTableColumn', {props: {
        prop: 'time_updated',
        label: 'time_updated',
        sortable: true,
        formatter(row, column, cellValue, index) { // eslint-disable-line max-params
          return moment(cellValue).format('YYYY-MM-DD dd HH:mm')
        },
      }}),
      h('ElTableColumn', {props: {
        formatter: (row, column, cellValue, index) => { // eslint-disable-line max-params
          // TODO: Allow moving bookmarks up/down
          return h(popoverConfirm, {
            props: {
              tooltip: 'Delete',
              question: 'Really delete this bookmark?',
              textConfirm: 'Delete',
              onConfirm: () => { this.deleteBookmark(row.id) },
              textCancel: 'Cancel',
              buttonProps: {
                icon: 'el-icon-delete',
                size: 'mini',
                type: 'text',
              },
            },
          })
        },
      }}),
    ])])
  },
}
