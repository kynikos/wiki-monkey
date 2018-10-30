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

const {moment} = require('../../../lib/index')

const LEVEL_TO_TAG = {
  5: 'HDN',
  8: 'JSN',
  10: 'DBG',
  20: 'INF',
  30: 'WRN',
  40: 'ERR',
}

module.exports = {
  namespaced: true,

  state: {
    display: true,
    minLevel: 10,
    messages: [],
  },

  getters: {
    composeSaveLogText(state) {
      const text = state.messages.map((message) => `${moment(message.tstamp).format('HH:mm:ss')}\t${
        LEVEL_TO_TAG[message.level]}\t${message.text}`).join('\n')
      return `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
    },
  },

  mutations: {
    show(state, show) {
      state.display = show == null ? true : show
    },

    hide(state) {
      state.display = false
    },

    toggle(state) {
      state.display = !state.display
    },

    toggleMinLevel(state) {
      state.minLevel = state.minLevel === 10 ? 21 : 10
    },

    hidden(state, text) {
      return state.messages.push({
        text,
        level: 5,
        tstamp: new Date(),
      })
    },

    json(state, [component, data]) {
      const text = JSON.stringify({component, data})
      return state.messages.push({
        text,
        level: 8,
        tstamp: new Date(),
      })
    },

    debug(state, text) {
      return state.messages.push({
        text,
        level: 10,
        tstamp: new Date(),
      })
    },

    info(state, text) {
      return state.messages.push({
        text,
        level: 20,
        tstamp: new Date(),
      })
    },

    warning(state, text) {
      return state.messages.push({
        text,
        level: 30,
        tstamp: new Date(),
      })
    },

    error(state, text) {
      return state.messages.push({
        text,
        level: 40,
        tstamp: new Date(),
      })
    },
  },
}
