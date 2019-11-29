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

const {Vue, Vuex} = require('%/lib/index')
const Log = require('../log')


module.exports = {
  name: 'Fieldset',

  computed: Vuex.mapState('fieldset', [
    'display',
  ]),

  methods: {
    ...Vuex.mapMutations('fieldset', [
      'toggle',
    ]),
  },

  render(h) {
    const wmmain = h('div', [this.$slots.default, h(Log)])

    const legend = h('legend', [
      'Wiki Monkey [ ',
      h(
        'a',
        {
          attrs: {href: '#'},
          on: {
            click: (event) => {
              event.preventDefault()
              this.toggle()
            },
          },
        },
        this.display && 'hide' || 'show'
      ),
      ' ]',
    ])

    return h('fieldset', {
      attrs: {id: 'WikiMonkey'},
    }, [
      legend,
      this.display && wmmain,
    ])
  },
}
