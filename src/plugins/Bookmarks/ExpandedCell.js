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

const {Vue, Vuex} = require('../../modules/libs')


module.exports.ExpandedCell = {
  name: 'ExpandedCell',

  computed: {
    ...Vuex.mapState('plugins/bookmarks', [
      'shownFields',
    ]),
  },

  props: {
    row: {
      type: Object,
      required: true,
    },
  },

  render(h) { // eslint-disable-line max-lines-per-function,complexity
    return h('div', [
      !this.shownFields.includes('id') && h('div', [
        'id: ',
        this.row.id,
      ]),
      !this.shownFields.includes('url') && h('div', [
        'url: ',
        this.row.url,
      ]),
      !this.shownFields.includes('section_id') && h('div', [
        'section_id: ',
        this.row.section_id,
      ]),
      !this.shownFields.includes('section_number') && h('div', [
        'section_number: ',
        this.row.section_number,
      ]),
      !this.shownFields.includes('section_title') && h('div', [
        'section_title: ',
        this.row.section_title,
      ]),
      !this.shownFields.includes('wgPageName') && h('div', [
        'wgPageName: ',
        this.row.wgPageName,
      ]),
      !this.shownFields.includes('wgRelevantPageName') && h('div', [
        'wgRelevantPageName: ',
        this.row.wgRelevantPageName,
      ]),
      !this.shownFields.includes('wgCanonicalSpecialPageName') && h('div', [
        'wgCanonicalSpecialPageName: ',
        this.row.wgCanonicalSpecialPageName,
      ]),
      !this.shownFields.includes('wgCanonicalNamespace') && h('div', [
        'wgCanonicalNamespace: ',
        this.row.wgCanonicalNamespace,
      ]),
      !this.shownFields.includes('wgTitle') && h('div', [
        'wgTitle: ',
        this.row.wgTitle,
      ]),
      !this.shownFields.includes('wgAction') && h('div', [
        'wgAction: ',
        this.row.wgAction,
      ]),
      !this.shownFields.includes('wgIsArticle') && h('div', [
        'wgIsArticle: ',
        this.row.wgIsArticle,
      ]),
      !this.shownFields.includes('wgIsProbablyEditable') && h('div', [
        'wgIsProbablyEditable: ',
        this.row.wgIsProbablyEditable,
      ]),
      !this.shownFields.includes('wgRelevantPageIsProbablyEditable') && h('div', [
        'wgRelevantPageIsProbablyEditable: ',
        this.row.wgRelevantPageIsProbablyEditable,
      ]),
      !this.shownFields.includes('wgPageContentLanguage') && h('div', [
        'wgPageContentLanguage: ',
        this.row.wgPageContentLanguage,
      ]),
      !this.shownFields.includes('wgPageContentModel') && h('div', [
        'wgPageContentModel: ',
        this.row.wgPageContentModel,
      ]),
      !this.shownFields.includes('wgArticleId') && h('div', [
        'wgArticleId: ',
        this.row.wgArticleId,
      ]),
      !this.shownFields.includes('wgNamespaceNumber') && h('div', [
        'wgNamespaceNumber: ',
        this.row.wgNamespaceNumber,
      ]),
      !this.shownFields.includes('wgRevisionId') && h('div', [
        'wgRevisionId: ',
        this.row.wgRevisionId,
      ]),
      !this.shownFields.includes('wgCurRevisionId') && h('div', [
        'wgCurRevisionId: ',
        this.row.wgCurRevisionId,
      ]),
      !this.shownFields.includes('wgDiffOldId') && h('div', [
        'wgDiffOldId: ',
        this.row.wgDiffOldId,
      ]),
      !this.shownFields.includes('wgDiffNewId') && h('div', [
        'wgDiffNewId: ',
        this.row.wgDiffNewId,
      ]),
      !this.shownFields.includes('time_created') && h('div', [
        'time_created: ',
        this.row.time_created,
      ]),
      !this.shownFields.includes('time_updated') && h('div', [
        'time_updated: ',
        this.row.time_updated,
      ]),
    ])
  },
}
