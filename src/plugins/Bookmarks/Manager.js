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
const {SpacedVertical} = require('../../app/_components/styled')
const {FieldSelect} = require('./FieldSelect')
const {Table} = require('./Table')

// TODO: Show how many bookmarks are due in the next hour, day etc.


module.exports.Manager = {
  name: 'BookmarksManager',

  props: {
    shownFields: {
      type: Array,
      required: true,
    },
    bookmarks: {
      type: Array,
      required: true,
    },
    updateShownFields: {
      type: Function,
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

  render(h) {
    return h(SpacedVertical, [
      h(FieldSelect, {
        props: {
          shownFields: this.shownFields,
          updateShownFields: this.updateShownFields,
        },
      }),
      h(Table, {
        props: {
          shownFields: this.shownFields,
          bookmarks: this.bookmarks,
          sectionId: this.sectionId,
          sectionNumber: this.sectionNumber,
          sectionTitle: this.sectionTitle,
        },
      }),
    ])
  },
}
