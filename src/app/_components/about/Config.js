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

const WM = require('../../../index')
const {blobLink} = require('../blobLink')
const {ConfigServer} = require('./ConfigServer')
const {ConfigLocal} = require('./ConfigLocal')
const {ConfigComputed} = require('./ConfigComputed')


module.exports.Config = {
  name: 'Config',

  data() {
    return {
      expanded: true,
    }
  },

  methods: {
    expand() {
      this.expanded = true
    },
    collapse() {
      this.expanded = false
    },
  },

  render(h) {
    return h('li', [
      h('a', {
        attrs: {
          href: '#configuration',
          title: this.expanded
            ? 'Hide configuration menu.'
            : 'Show configuration menu.',
        },
        on: {
          click: (event) => {
            event.preventDefault()
            this.expanded ? this.collapse() : this.expand()
          },
        },
      }, ['Configuration']),
      ...this.expanded && [
        ' (in cascading order)',
        h('ul', [
          h('li', [
            'Defaults [ ',
            h('a', {attrs: {
              href: 'https://github.com/kynikos/wiki-monkey/wiki',
            }}, 'wiki'),
            ' | ',
            h('a', {attrs: {
              href: 'https://github.com/kynikos/wiki-monkey',
            }}, 'source'),
            ' ]',
          ]),
          h(ConfigServer),
          h(ConfigLocal),
          h('li', [
            h('a', {attrs: {
              href: 'https://www.mediawiki.org/wiki/Manual:Interface/JavaScript#Personal_scripts',
            }}, 'User script'),
            ' [ ',
            ...(() => {
              const userName = mw.config.get('wgUserName')
              const skin = mw.config.get('skin')
              const commonJs = new mw.Title(`User:${userName}/common.js`)
              const skinJs = new mw.Title(`User:${userName}/${skin}.js`)
              return [
                h('a', {attrs: {
                  href: commonJs.getUrl(),
                }}, 'common.js'),
                ' | ',
                h('a', {attrs: {
                  href: skinJs.getUrl(),
                }}, `${skin}.js`),
              ]
            })(),
            ' ]',
          ]),
          h(ConfigComputed),
          Object.values(WM.unknownConfig).some((userConfig) => {
            return !$.isEmptyObject(userConfig)
          }) && h('li', [
            h(blobLink, {
              props: {
                href: '#view-server-downloaded-uknown-config',
                title: 'View the configuration options that were not \
understood by this version of Wiki Monkey.',
                content: JSON.stringify(WM.unknownConfig, null, 2),
                mimeType: 'application/json',
              },
            }, ['Unknown options']),
          ]),
        ]),
      ],
    ])
  },
}
