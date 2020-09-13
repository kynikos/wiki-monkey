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

const WM = require('%')
const {Vue, Vuex, styled} = require('%/lib')


module.exports.PersonalToolsCommands = class {
  static plugins = []

  static installPlugin(plugin, component) {
    this.plugins.push([plugin, component])
  }

  constructor(container) {
    const {plugins} = this.constructor

    // TODO[plugins]: For the moment this is hardcoded to work only on the
    //    watchlist link, keep it simple until more flexibility is needed
    const root = document.createElement('span')
    $('#pt-watchlist').append(' ', root)

    // eslint-disable-next-line no-new
    new Vue({
      el: root,

      store: WM.App.store,

      render(h) {
        // Note the default ArchWiki skin doesn't support using <sup> here
        // The bracket style was discussed in https://github.com/kynikos/wiki-monkey/issues/238
        return h('span', [
          '[',
          ...plugins.reduce((acc, [plugin, component]) => {
            return acc.concat(['|', h(component)])
          }, []).slice(1),
          ']',
        ])
      },
    })
  }
}
