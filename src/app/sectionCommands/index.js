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
const {Vue, jssc} = require('../../modules/libs')

jssc({
  // Keep editsection links styled consistently with the pageCommands
  // Also, bold is conventionally used to highlight links if needed
  '@global #bodyContent .mw-editsection a': {
    fontWeight: 'normal !important',
  },
})


module.exports.SectionCommands = class {
  static plugins = []

  static installPlugin(plugin, component) {
    this.plugins.push([plugin, component])
  }

  constructor(editSections) {
    const {plugins} = this.constructor
    editSections.each(function () { SectionCommands_(this, plugins) })
  }
}


function SectionCommands_(editSection0, plugins) { // eslint-disable-line vars-on-top,no-var
  const editSection = $(editSection0)
  const header = editSection.closest(':header')
  const headline = header.find('.mw-headline')
  const editLink = editSection.children("a:contains('edit')").first()
  const editUri = new mw.Uri(editLink.attr('href'))

  // Retrieve section's id, number and title now to make sure that their values
  // aren't affected by the following changes to the DOM
  const sectionId = headline[0].id
  const sectionNumber = parseInt(editUri.query.section, 10)
  const sectionTitle = headline.contents().last().text().trim()

  const root = document.createElement('span')

  editLink.text('e')

  editSection.children().first().after(' ', root, ' | ')
  editSection.children().last().before(' ')

  const sectionLink = WM.Parser.squashContiguousWhitespace(`[[#${headline[0].id}]]`)
  const articleLink = WM.Parser.squashContiguousWhitespace(`[[${mw.config.get('wgPageName')}#${headline[0].id}]]`)

  return new Vue({
    el: root,

    store: WM.App.store,

    mounted() {
      WM.Clipboard.enable(this.$refs.copyArticleWikiLink)
      return WM.Clipboard.enable(this.$refs.copySectionWikiLink)
    },

    render(h) {
      return h('span', [
        h('a', {
          attrs: {
            // Don't use a fragment such as #scroll-to-top so that the link can
            // also be used to copy the link to the current page from any
            // section
            href: '',
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
        }, ['#c']),
        ...plugins.reduce((acc, [plugin, component]) => {
          return acc.concat([' | ', h(component, {props: {
            editSection,
            header,
            headline,
            sectionId,
            sectionNumber,
            sectionTitle,
          }})])
        }, []),
      ])
    },
  })
}
