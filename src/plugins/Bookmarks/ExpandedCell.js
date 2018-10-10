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

const {Vuex} = require('../../modules/libs')
const {Grid2C} = require('../../app/_components/styled')


module.exports.ExpandedCell = {
  name: 'BookmarksExpandedCell',

  props: {
    row: {
      type: Object,
      required: true,
    },
  },

  render(h) { // eslint-disable-line complexity
    return h(Grid2C, [
      ['id', this.row.id],
      ['url', this.row.url],
      ['section_id', this.row.section_id],
      ['section_number', this.row.section_number],
      ['section_title', this.row.section_title],
      ['wgPageName', this.row.wgPageName],
      ['wgRelevantPageName', this.row.wgRelevantPageName],
      ['wgCanonicalSpecialPageName', this.row.wgCanonicalSpecialPageName],
      ['wgCanonicalNamespace', this.row.wgCanonicalNamespace],
      ['wgTitle', this.row.wgTitle],
      ['wgAction', this.row.wgAction],
      ['wgIsArticle', this.row.wgIsArticle],
      ['wgIsProbablyEditable', this.row.wgIsProbablyEditable],
      ['wgRelevantPageIsProbablyEditable', this.row.wgRelevantPageIsProbablyEditable],
      ['wgPageContentLanguage', this.row.wgPageContentLanguage],
      ['wgPageContentModel', this.row.wgPageContentModel],
      ['wgArticleId', this.row.wgArticleId],
      ['wgNamespaceNumber', this.row.wgNamespaceNumber],
      ['wgRevisionId', this.row.wgRevisionId],
      ['wgCurRevisionId', this.row.wgCurRevisionId],
      ['wgDiffOldId', this.row.wgDiffOldId],
      ['wgDiffNewId', this.row.wgDiffNewId],
      ['time_created', this.row.time_created],
      ['time_updated', this.row.time_updated],
      ['action_due', this.row.action_due],
      ['time_due', this.row.time_due],
      ['notes', this.row.notes],
    ].reduce((acc, [name, value]) => {
      return acc.concat([
        h('div', [name]),
        h('div', [value]),
      ])
    }, []))
  },
}
