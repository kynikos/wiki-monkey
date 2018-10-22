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
const {FlexColumn} = require('../../app/_components/styled')


module.exports.Editor = {
  name: 'BookmarksEditor',

  data() {
    return {
      action: 'reply',
      delay: '1 day',
      notes: null,
    }
  },

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
  },

  methods: {
    ...Vuex.mapActions('plugins/bookmarks', [
      'saveBookmark',
    ]),
  },

  render(h) {
    return h(FlexColumn, [
      // TODO: I haven't been able to make fetchSuggestions work yet...
      // h('ElAutocomplete', {
      //   props: {
      //     placeholder: 'action',
      //     autocomplete: 'on',
      //     fetchSuggestions: (queryString, callback) => {
      //       console.debug('ElAutocomplete queryString:', queryString)
      //       callback(['abcde', 'fghij', 'klmno'])
      //     },
      //   },
      //   on: {
      //     change: (value) => console.debug('ElAutocomplete onChange:', value),
      //     select: (value) => console.debug('ElAutocomplete onSelect', value),
      //   },
      // }),
      h('ElSelect', {
        props: {
          placeholder: 'action',
          value: this.action,
          filterable: true,
          allowCreate: true,
          defaultFirstOption: true,
        },
        on: {
          change: (value) => { this.action = value },
        },
      }, [
        'reply',
        'check for reply',
        'watch abuse',
        'review edit',
        'fix style',
        'fix content',
      ].map((value) => h('ElOption', {props: {value, label: value}}))),
      h('ElSelect', {
        props: {
          placeholder: 'delay',
          value: this.delay,
          filterable: true,
          allowCreate: true,
          defaultFirstOption: true,
        },
        on: {
          change: (value) => { this.delay = value },
        },
      }, [
        '5 minutes',
        '10 minutes',
        '15 minutes',
        '30 minutes',
        '1 hour',
        '2 hours',
        '3 hours',
        '4 hours',
        '6 hours',
        '8 hours',
        '12 hours',
        '1 day',
        '2 days',
        '3 days',
        '1 week',
        '2 weeks',
        '1 month',
      ].map((value) => h('ElOption', {props: {value, label: value}}))),
      h('ElInput', {
        props: {
          placeholder: 'notes',
          value: this.notes,
          type: 'textarea',
          autosize: {minRows: 2},
        },
        on: {
          change: (value) => { this.notes = value },
        },
      }),
      h('div', [
        '[ ',
        h('a', {
          on: {
            click: (event) => {
              event.preventDefault()
              this.saveBookmark({
                sectionId: this.sectionId,
                sectionNumber: this.sectionNumber,
                sectionTitle: this.sectionTitle,
                action: this.action,
                delay: this.delay,
                notes: this.notes,
              })
            },
          },
        }, ['save']),
        ' ]',
      ]),
    ])
  },
}
