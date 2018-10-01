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


module.exports = function (conf) { // eslint-disable-line max-lines-per-function
  return {
    name: 'BookmarksSectionCommands',

    props: {
      editSection: {
        type: Object,
        required: true,
      },
      header: {
        type: Object,
        required: true,
      },
      headline: {
        type: Object,
        required: true,
      },
      sectionId: {
        type: String,
        required: true,
      },
      sectionNumber: {
        type: Number,
        required: true,
      },
      sectionTitle: {
        type: String,
        required: true,
      },
    },

    methods: {
      ...Vuex.mapActions('plugins/bookmarks', [
        'saveBookmark',
      ]),
    },

    render(h) {
      return h('a', {
        attrs: {
          href: '#save',
          title: 'Bookmark this page',
        },
        on: {
          click: (event) => {
            event.preventDefault()
            this.saveBookmark({
              sectionId: this.sectionId,
              sectionNumber: this.sectionNumber,
              sectionTitle: this.sectionTitle,
            })
          },
        },
        // TODO: Show if the section has bookmarks
      }, ['b'])
    },
  }
}
