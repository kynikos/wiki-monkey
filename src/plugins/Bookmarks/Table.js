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
const {PopoverEdit} = require('./PopoverEdit')


module.exports.Table = {
  name: 'BookmarksTable',

  props: {
    shownFields: {
      type: Array,
      required: true,
    },
    bookmarks: {
      type: Array,
      required: true,
    },
    sectionId: {
      type: String,
      required: false,
    },
    sectionNumber: {
      type: Number,
      required: false,
    },
    sectionTitle: {
      type: String,
      required: false,
    },
  },

  computed: {
    ...Vuex.mapState('plugins/bookmarks', [
      'loading',
    ]),
  },

  methods: {
    ...Vuex.mapActions('plugins/bookmarks', [
      'deleteBookmark',
    ]),
  },

  render(h) { // eslint-disable-line complexity
    return h('div', [h('ElTable', {
      ref: 'table',
      props: {
        rowKey: 'id',
        data: this.bookmarks,
        // TODO: The default style is quite poor...
        //       All columns are equally sized
        //       Words are wrapped
        //       Stripes are barely visible
        stripe: true,
        border: true,
        maxHeight: 1000, // Fixed header
        defaultSort: {
          prop: 'time_due',
          order: 'ascending',
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
      this.shownFields.includes('action_due') && h('ElTableColumn', {props: {
        prop: 'action_due',
        label: 'action_due',
        sortable: true,
      }}),
      this.shownFields.includes('time_due') && h('ElTableColumn', {props: {
        prop: 'time_due',
        label: 'time_due',
        sortable: true,
        formatter(row, column, cellValue, index) { // eslint-disable-line max-params
          return moment(cellValue).format('YYYY-MM-DD dd HH:mm')
        },
      }}),
      this.shownFields.includes('notes') && h('ElTableColumn', {props: {
        prop: 'notes',
        label: 'notes',
        sortable: true,
      }}),
      h('ElTableColumn', {props: {
        renderHeader: (hh, {column, index}) => {
          return [
            '[ ',
            hh(PopoverEdit, {
              props: {
                sectionId: this.sectionId,
                sectionNumber: this.sectionNumber,
                sectionTitle: this.sectionTitle,
                href: '#new-section-bookmark',
                title: this.sectionId == null
                  ? 'Add a bookmark for this page'
                  : 'Add a bookmark for this section',
              },
            }, ['+']),
            ' ]',
          ]
        },
        formatter: (row, column, cellValue, index) => { // eslint-disable-line max-params
          // TODO: Allow moving bookmarks up/down
          //       Maybe each row has a button to start a "move" operation;
          //       After selecting the row to be moved, all the other rows
          //       receive "move above" and "move below" options
          //       Maybe even better, allow "tagging" bookmarks with the next
          //       action to do on it, e.g. "reply", "check for replies",
          //       "explain idea", "review", "fix" etc., and allow setting a
          //       time delay to do it, e.g. 1 hour, 6 hours, 1 day, 1 week etc.
          //       so that the bookmarks are easily sortable in the table by
          //       "due date"
          //       Also allow saving liberal notes for each bookmark
          //       The best thing is if these actions can be done not (only)
          //       from the table, but directly from the bookmarked pages/sections
          // TODO: Allow changing the page/section that a bookmark refers to e.g.
          //       by pasting a new url; this is useful to update bookmarks to
          //       pages/sections that have been moved
          return [
            '[ ',
            h(popoverConfirm, {
              props: {
                question: 'Really delete this bookmark?',
                textConfirm: 'delete',
                // Do *not* use the index from the table's field formatter
                // function, since in general it's different from the bookmark's
                // index in the bookmarks array, which is never resorted and
                // keeps the original sort order
                onConfirm: () => { this.deleteBookmark(row) },
              },
            }, [h('a', {
              attrs: {
                href: '#delete-bookmark',
                title: 'Delete bookmark',
              },
              on: {
                click: (event) => {
                  event.preventDefault()
                },
              },
            }, ['d'])]),
            ' ]',
          ]
        },
      }}),
    ])])
  },
}
