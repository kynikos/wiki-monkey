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
const store = require('../store')
const {Bookmarks} = require('../_components/bookmarks')
const {Maintenance} = require('../_components/maintenance')


module.exports = function (bodyContent) { // eslint-disable-line max-lines-per-function
  const root = document.createElement('div')
  bodyContent.before(root)

  return new Vue({
    el: root,

    store,

    computed: {
      ...Vuex.mapState('main', [
        'shown',
        'selectedTab',
      ]),
    },

    methods: {
      ...Vuex.mapMutations('main', [
        'selectTab',
      ]),
      ...Vuex.mapActions('main', {
        closeMain: 'closeAlone',
      }),
    },

    render(h) { // eslint-disable-line max-lines-per-function
      if (!this.shown) { return h('div') }

      return h('div', {
        class: {
          'mw-body-content': true,
        },
      }, [
        h('div', [
          '[ ',
          h('a', {
            attrs: {
              href: '#bookmarks',
              title: 'Show the bookmarks interface',
            },
            on: {
              click: (event) => {
                event.preventDefault()
                this.selectTab('bookmarks')
              },
            },
          }, ['bookmarks']),
          ' | ',
          h('a', {
            attrs: {
              href: '#maintenance',
              title: 'Show the maintenance interface',
            },
            on: {
              click: (event) => {
                event.preventDefault()
                this.selectTab('maintenance')
              },
            },
          }, ['maintenance']),
          ' ]',
        ]),
        h('div', [(() => {
          switch (this.selectedTab) {
          case 'bookmarks':
            return h(Bookmarks)
          case 'maintenance':
            return h(Maintenance)
          default:
            return h(Bookmarks)
          }
        })()]),
      ])
    },
  })
}
