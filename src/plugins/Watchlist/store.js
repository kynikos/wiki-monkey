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

const {moment} = require('%/lib/index')
const WM = require('%/index')

module.exports = function storeModule(conf) {
  return {
    namespaced: true,

    state: {
      conf,
      loading: false,
      watchlistUnreadCount: null,
    },

    mutations: {
      setLoading(state) {
        state.loading = true
      },

      storeWatchlistUnreadCount(state, watchlistUnread) {
        state.watchlistUnreadCount = watchlistUnread
        state.loading = false
      },
    },

    actions: {
      async countWatchlistUnread({state, commit}, {forceRefresh}) {
        commit('setLoading')

        let count

        if (!forceRefresh) {
          const cached = localStorage.getItem('wikiMonkeyWatchlistUnreadCount')

          if (cached) {
            const {count: ccount, tstamp} = JSON.parse(cached)

            if (
              moment().diff(moment(tstamp), 'seconds') <
                state.conf.minQueryInterval
            ) {
              // eslint-disable-next-line prefer-destructuring
              count = ccount
            }
          }
        }

        if (count == null) {
          count = (await WM.MW.callAPIGet({
            list: 'watchlist',
            wllimit: 'max',
            wlnamespace: '*',
            wlprop: 'ids',
            wlshow: 'unread',
          })).query.watchlist.length

          localStorage.setItem(
            'wikiMonkeyWatchlistUnreadCount',
            JSON.stringify({
              count,
              tstamp: moment().toISOString(),
            }),
          )
        }

        commit('storeWatchlistUnreadCount', count)
      },

      async markWatchlistAllRead({dispatch}) {
        const token = await WM.MW.getCsrfToken()

        await WM.MW.callAPIPost({
          action: 'setnotificationtimestamp',
          entirewatchlist: 'true',
          token,
        })

        dispatch('countWatchlistUnread', {forceRefresh: true})
      },
    },
  }
}
