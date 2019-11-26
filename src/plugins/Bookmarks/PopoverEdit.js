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

const {Vue, Vuex} = require('%/lib/index')
const {asciiSpinner} = require('%/app/_components/asciiSpinner')
const {Editor} = require('./Editor')


module.exports.PopoverEdit = {
  name: 'BookmarksPopoverEdit',

  props: {
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
    href: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bookmarkId: {
      type: Number,
      required: false,
    },
    bookmarkActionDue: {
      type: String,
      required: false,
    },
    bookmarkNotes: {
      type: String,
      required: false,
    },
  },

  computed: {
    ...Vuex.mapState('plugins/bookmarks', [
      'loading',
    ]),
  },

  render(h) {
    if (this.loading) return h(asciiSpinner)

    return h('ElPopover', [
      h(Editor, {
        props: {
          sectionId: this.sectionId,
          sectionNumber: this.sectionNumber,
          sectionTitle: this.sectionTitle,
          bookmarkId: this.bookmarkId,
          bookmarkActionDue: this.bookmarkActionDue,
          bookmarkNotes: this.bookmarkNotes,
        },
      }),
      h('a', {
        slot: 'reference',
        attrs: {
          href: this.href,
          title: this.title,
        },
        on: {
          click: (event) => {
            event.preventDefault()
          },
        },
      }, this.$slots.default),
    ])
  },
}
