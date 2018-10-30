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

const WM = require('../../index')


module.exports = class {
  constructor(conf, callNext) { // eslint-disable-line complexity
    const source = WM.Editor.readSource()

    const language = WM.ArchWiki.detectLanguage(WM.Editor.getTitle())[1]

    let header = ''
    let content = source

    // <noinclude>
    content = content.replace(/^\s*<noinclude>/u, '')
    if (content !== source) {
      header += '<noinclude>\n'
    }

    // DISPLAYTITLE and Template:Lowercase_title
    const displaytitle = WM.Parser.findVariables(content, 'DISPLAYTITLE')
    const lowercasetitle = WM.Parser.findTemplates(content, 'Lowercase title')
    const titlemods = displaytitle.concat(lowercasetitle)
    titlemods.sort((a, b) => a.index - b.index)
    let tempcontent = ''
    let contentId = 0
    for (const titlemod of titlemods) {
      tempcontent += content.substring(contentId, titlemod.index)
      contentId = titlemod.index + titlemod.length
    }

    tempcontent += content.substring(contentId)
    content = tempcontent
    const dt = displaytitle.pop()
    const lct = lowercasetitle.pop()
    let dlct = ''
    if (dt && !lct) {
      dlct = `{{DISPLAYTITLE:${dt.value}}}`
    } else if (!dt && lct) {
      dlct = '{{Lowercase title}}'
    } else if (dt && lct) {
      dlct = dt.index < lct.index ? '{{Lowercase title}}' : `{{DISPLAYTITLE:${dt.value}}}`
    }
    if (displaytitle.length || lowercasetitle.length) {
      WM.App.log.warning('Found multiple instances of \
{{DISPLAYTITLE:...}} or {{Lowercase title}}: only the last \
one has been used, the others have been deleted')
    }

    // Behavior switches
    const behaviorswitches = WM.Parser.findBehaviorSwitches(content)
    const bslist = []
    tempcontent = ''
    contentId = 0
    for (let b = 0; b < behaviorswitches.length; b++) {
      const bswitch = behaviorswitches[b]
      if (['TOC', 'START', 'END'].includes(bswitch.match[1])) {
        behaviorswitches.splice(b, 1)
      } else {
        if (bslist.includes(bswitch.match[0])) {
          WM.App.log.warning(`Removed duplicate of ${bswitch.match[0]}`)
        } else {
          bslist.push(bswitch.match[0])
        }
        tempcontent += content.substring(contentId, bswitch.index)
        contentId = bswitch.index + bswitch.length
      }
    }

    tempcontent += content.substring(contentId)
    content = tempcontent

    if (!dlct && bslist.length) {
      header += `${bslist.join(' ')}\n`
    } else if (dlct && !bslist.length) {
      header += `${dlct}\n`
    } else if (dlct && bslist.length) {
      header += `${dlct} ${bslist.join(' ')}\n`
    }

    // Categories
    const categories = WM.Parser.findCategories(content)
    const catlist = []
    const catlinks = []
    tempcontent = ''
    contentId = 0
    for (const cat of categories) {
      if (cat.fragment) {
        WM.App.log.warning(`${WM.App.log.WikiLink(
          cat.link,
          cat.rawLink
        )} contains a fragment \
reference, but it doesn't make sense \
in categories and will be removed`)
      }

      const cleantitle = WM.Parser.squashContiguousWhitespace(cat.title)
      const cattext = `Category:${cleantitle}`
      // Don't just pass cleantitle here, otherwise the language of
      //   root language categories won't be properly detected
      const catlang = WM.ArchWiki.detectLanguage(cattext)[1]
      const catlink = `[[${cattext}${cat.anchor ? `|${cat.anchor}` : ''}]]`
      if (language !== catlang) {
        WM.App.log.warning(`${WM.App.log.WikiLink(cat.link, cattext)
        } belongs to a different \
language than the one of the title (${language})`)
      }

      if (catlist.indexOf(cattext) < 0) {
        catlist.push(cattext)
        catlinks.push(catlink)
      } else {
        WM.App.log.warning(`Removed duplicate of ${
          WM.App.log.WikiLink(cat.link, cattext)}`)
      }

      tempcontent += content.substring(contentId, cat.index)
      contentId = cat.index + cat.length
    }

    if (catlist.length) {
      header += `${catlinks.join('\n')}\n`
    } else {
      WM.App.log.warning('The article is not categorized')
    }
    tempcontent += content.substring(contentId)
    content = tempcontent

    // Interlanguage links
    const interlanguage = WM.ArchWiki.findAllInterlanguageLinks(content)
    const iwlist = []
    const iwlinks = []
    tempcontent = ''
    contentId = 0
    for (const link of interlanguage) {
      if (link.anchor) {
        // Cannot use WM.App.log.WikiLink because local interlanguage
        //   links would not resolved correctly; PageLink would need
        //   to find the URL instead, which seems too complicated for
        //   the purpose of this plugin
        WM.App.log.warning(`${link.rawLink} contains an alternative \
text, but it doesn't make sense in \
interlanguage links and will be removed`)
      }

      // Applying WM.Parser.squashContiguousWhitespace is dangerous here
      //   because we don't know how the target server handles whitespace
      const linktitle = link.title
      const linklang = link.namespace
      const linktext = `${linklang}:${linktitle}`
      const fulllink = `[[${linktext}${link.fragment ? `#${link.fragment}` : ''}]]`
      if (iwlist.indexOf(linktext) < 0) {
        iwlist.push(linktext)
        iwlinks.push(fulllink)
      } else {
        // Cannot use WM.App.log.WikiLink because local interlanguage
        //   links would not resolved correctly; PageLink would need
        //   to find the URL instead, which seems too complicated for
        //   the purpose of this plugin
        WM.App.log.warning(`Removed duplicate of ${linktext}`)
      }

      tempcontent += content.substring(contentId, link.index)
      contentId = link.index + link.length
    }

    if (iwlist.length) {
      iwlinks.sort()
      header += `${iwlinks.join('\n')}\n`
    }

    tempcontent += content.substring(contentId)
    content = tempcontent

    const firstChar = content.search(/[^\s]/u)
    content = content.substr(firstChar)

    const newText = header + content

    if (newText !== source) {
      WM.Editor.writeSource(newText)
      WM.App.log.info('Fixed header')
    }

    if (callNext) {
      return callNext()
    }
  }
}
