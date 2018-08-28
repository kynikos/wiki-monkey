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

module.exports = {
  namespaced: true,

  state: {
    shown: false,
  },

  mutations: {
    show(state) {
      return state.shown = true
    },

    hide(state) {
      return state.shown = false
    },
  },

  actions: {
    openAlone({commit, dispatch}) {
      dispatch('hideContent', null, {root: true})
      return commit('show')
    },

    closeAlone({commit, dispatch}) {
      commit('hide')
      return dispatch('showContent', null, {root: true})
    },

    toggleAlone({state, dispatch}) {
      return dispatch(state.shown && 'closeAlone' || 'openAlone')
    },
  },
}
