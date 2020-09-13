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

const {Vuex} = require('%/lib/index')
const {asciiSpinner} = require('%/app/_components/asciiSpinner')


module.exports.PersonalToolsCommand = function (conf) {
  return {
    name: 'WatchListPersonalToolsCommandCommand',

    computed: {
      ...Vuex.mapState('plugins/watchlist', [
        'loading',
        'watchlistUnreadCount',
      ]),
    },

    methods: {
      ...Vuex.mapActions('plugins/watchlist', [
        'countWatchlistUnread',
        'markWatchlistAllRead',
      ]),
    },

    created() {
      this.countWatchlistUnread({})
    },

    render(h) {
      return h('ElPopover', [
        h('div', [
          h('div', [
            h('a', {
              attrs: {
                href: '#refresh-watchlist-unread-count',
                title: 'Refresh unread pages count',
              },
              on: {
                click: (event) => {
                  event.preventDefault()
                  this.countWatchlistUnread({forceRefresh: true})
                },
              },
            }, [
              'refresh count',
            ]),
          ]),
          h('div', [
            h('a', {
              attrs: {
                href: '#mark-all-watchlist-pages-visited',
                title: 'Mark all pages visited',
              },
              on: {
                click: (event) => {
                  event.preventDefault()
                  this.markWatchlistAllRead()
                },
              },
            }, [
              'mark all read',
            ]),
          ]),
        ]),
        h('a', {
          slot: 'reference',
          attrs: {
            href: '#watchlist-commands',
            title: 'Show watchlist commands',
          },
          on: {
            click: (event) => event.preventDefault(),
          },
        }, [
          this.loading ? h(asciiSpinner) : this.watchlistUnreadCount,
        ]),
      ])
    },
  }
}
