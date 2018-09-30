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

const WM = require('../../modules')
const {Vue} = require('../../modules/libs')


module.exports.SectionCommands = class {
  static plugins = []

  static installPlugin(plugin, component) {
    this.plugins.push([plugin, component])
  }

  constructor($editsections) {
    const {plugins} = this.constructor
    $editsections.each(function () { SectionCommands_(this, plugins) })
  }
}


function SectionCommands_(editsection, plugins) { // eslint-disable-line vars-on-top,no-var,max-lines-per-function,max-statements
  const $editsection = $(editsection)
  const root = document.createElement('span')
  $editsection.children().first().after(' ', root, ' | ')
  $editsection.children().last().before(' ')
  const header = $editsection.closest(':header')
  const headline = header.find('.mw-headline')
  const sectionLink = WM.Parser.squashContiguousWhitespace(`[[#${headline[0].id}]]`)
  const articleLink = WM.Parser.squashContiguousWhitespace(`[[${mw.config.get('wgPageName')}#${headline[0].id}]]`)

  return new Vue({
    el: root,

    store: WM.App.store,

    mounted() {
      WM.Clipboard.enable(this.$refs.copyArticleWikiLink)
      return WM.Clipboard.enable(this.$refs.copySectionWikiLink)
    },

    render(h) { // eslint-disable-line max-lines-per-function
      return h('span', [
        h('a', {
          attrs: {
            href: '#scroll-to-top',
            title: 'Scroll to the top of the page',
          },
          on: {
            click(event) {
              event.preventDefault()
              return window.scrollTo(0, 0)
            },
          },
        }, ['∧']),
        ' | ',
        h('a', {
          attrs: {
            href: `#${headline[0].id}`,
            title: 'Link to this section',
          },
        }, ['§']),
        ' | ',
        h('a', {
          attrs: {
            href: '#copy-article-wiki-link',
            title: `Copy "${articleLink}" to the clipboard`,
            'data-clipboard-text': articleLink,
          },
          on: {
            click(event) {
              return event.preventDefault()
            },
          },
          ref: 'copyArticleWikiLink',
        }, ['c']),
        ' | ',
        h('a', {
          attrs: {
            href: '#copy-section-wiki-link',
            title: `Copy "${sectionLink}" to the clipboard`,
            'data-clipboard-text': sectionLink,
          },
          on: {
            click(event) {
              return event.preventDefault()
            },
          },
          ref: 'copySectionWikiLink',
        }, ['c#']),
        ...plugins.reduce((acc, [plugin, component]) => {
          return acc.concat([' | ', h(component, {props: {headline}})])
        }, []),
      ])
    },
  })
}
