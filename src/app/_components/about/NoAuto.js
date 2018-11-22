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


module.exports.NoAuto = {
  name: 'NoAuto',

  data() {
    return {
      noAuto: localStorage.getItem('wikiMonkeyNoAuto') === 'true',
    }
  },

  methods: {
    enableAutoLaunch() {
      this.noAuto = false
      localStorage.removeItem('wikiMonkeyNoAuto')
    },
    disableAutoLaunch() {
      this.noAuto = true
      localStorage.setItem('wikiMonkeyNoAuto', 'true')
    },
  },

  render(h) {
    return h('li', [
      'Automatic launch is ',
      this.noAuto
        ? h('a', {
          attrs: {
            href: '#enable-auto-launch',
            title: 'Launch Wiki Monkey automatically on page load.',
          },
          on: {
            click: (event) => {
              event.preventDefault()
              this.enableAutoLaunch()
            },
          },
        }, ['disabled'])
        : h('a', {
          attrs: {
            href: '#disable-auto-launch',
            title: 'Instead of launching Wiki Monkey automatically on page \
load, only install a link at the top of pages to launch it manually.',
          },
          on: {
            click: (event) => {
              event.preventDefault()
              this.disableAutoLaunch()
            },
          },
        }, ['enabled']),
    ])
  },
}
