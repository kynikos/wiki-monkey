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
const {asciiSpinner} = require('../../app/_components/asciiSpinner')
const {Manager} = require('./Manager')


module.exports.PopoverManager = {
  name: 'BookmarksPopoverManager',

  props: {
    href: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: Array,
      required: true,
    },
    shownFields: {
      type: Array,
      required: true,
    },
    updateShownFields: {
      type: Function,
      required: true,
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
      h(Manager, {
        props: {
          shownFields: this.shownFields,
          bookmarks: this.bookmarks,
          updateShownFields: this.updateShownFields,
        },
      }),
      h('a', {
        slot: 'reference',
        attrs: {
          href: this.href,
          title: this.title,
        },
      }, [
        'b',
        this.bookmarks.length
          ? h('sup', [this.bookmarks.length])
          : null,
      ]),
    ])
  },
}
