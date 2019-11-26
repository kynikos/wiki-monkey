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

const {Vue, Vuex, styled} = require('%/lib/index')
const WM = require('%/index')
const About = require('%/app/_components/about')
const {SpacedVertical} = require('%/app/_components/styled')

// TODO: Derive style from SpacedVertical
const sTabs = styled.div({
  '& > *+*': {
    marginTop: '1em',
  },

  '& a': {
    // Make sure that links are in normal weight
    fontWeight: 'normal',
  },
})

const SelectedTab = styled.a({
  fontWeight: 'bold !important',
})


module.exports = class {
  static plugins = {}

  static installPlugin(plugin, {name, tabTitle, tabLabel, page}) {
    if (name in this.plugins) {
      throw new Error(`Duplicated tab plugin: ${name}`)
    }
    this.plugins[name] = {plugin, tabTitle, tabLabel, page}
  }

  constructor(bodyContent) {
    const plugins = {
      ...this.constructor.plugins,
      about: {
        plugin: null,
        tabTitle: 'Show the about interface',
        tabLabel: 'about',
        page: About,
      },
    }

    const root = document.createElement('div')
    bodyContent.before(root)

    return new Vue({
      el: root,

      store: WM.App.store,

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

      created() {
        this.selectTab(Object.keys(plugins)[0])
      },

      render(h) {
        if (!this.shown) { return h('div') }

        return h(sTabs, {
          class: {
            'mw-body-content': true,
          },
        }, [
          h('div', [
            '[ ',
            ...Object.entries(plugins).reduce((acc, [name, plugin]) => {
              return acc.concat([
                ' | ',
                h(
                  name === this.selectedTab ? SelectedTab : 'a',
                  {
                    attrs: {
                      href: `#${name}`,
                      title: plugin.tabTitle,
                    },
                    on: {
                      click: (event) => {
                        event.preventDefault()
                        this.selectTab(name)
                      },
                    },
                  },
                  [plugin.tabLabel],
                ),
              ])
            }, []).slice(1),
            ' ]',
          ]),
          h('div', [h(plugins[this.selectedTab].page)]),
        ])
      },
    })
  }
}
