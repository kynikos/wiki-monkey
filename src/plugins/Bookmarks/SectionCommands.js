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
const {asciiSpinner} = require('../../app/_components/asciiSpinner')


module.exports = function (conf) {
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

    computed: {
      ...Vuex.mapState('plugins/bookmarks', [
        'loading',
        'sectionBookmarks',
      ]),
    },

    methods: {
      ...Vuex.mapActions('plugins/bookmarks', [
        'querySectionBookmarks',
        'saveBookmark',
      ]),
    },

    created() {
      this.querySectionBookmarks(this.sectionId)
    },

    render(h) {
      if (this.loading[this.sectionId]) return h(asciiSpinner)

      return h('a', {
        attrs: {
          href: '#bookmark-section',
          title: 'Bookmark this section',
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
      }, [
        'b',
        this.sectionId in this.sectionBookmarks &&
        this.sectionBookmarks[this.sectionId].length
          ? h('sup', [this.sectionBookmarks[this.sectionId].length])
          : null,
      ])
    },
  }
}
