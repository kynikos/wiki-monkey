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
const {PopoverManager} = require('./PopoverManager')


module.exports.SectionManager = function (conf) {
  return {
    name: 'BookmarksSectionManager',

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
        'sectionShownFields',
        'sectionBookmarks',
      ]),
    },

    methods: {
      ...Vuex.mapMutations('plugins/bookmarks', [
        'updateSectionShownFields',
      ]),
      ...Vuex.mapActions('plugins/bookmarks', [
        'querySectionBookmarks',
      ]),
    },

    created() {
      this.querySectionBookmarks(this.sectionId)
    },

    render(h) {
      return h(PopoverManager, {
        props: {
          href: '#manage-section-bookmarks',
          title: "Manage this section's bookmarks",
          bookmarks: this.sectionId in this.sectionBookmarks
            ? this.sectionBookmarks[this.sectionId]
            : [],
          shownFields: this.sectionShownFields,
          updateShownFields: this.updateSectionShownFields,
        },
      })
    },
  }
}
