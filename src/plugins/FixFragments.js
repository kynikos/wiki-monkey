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

const WM = require('../modules')
const App = require('../app')
const {Plugin} = require('./_Plugin')


const Cls = module.exports.FixFragments = class FixFragments extends Plugin {
  static initClass() {
    this.conf_default = {
      enabled: true,
      editor_menu: ['Text plugins', 'Fix section links'],
    }
  }

  fixLinks(source) {
    const title = WM.Editor.getTitle()
    const {sections} = WM.Parser.findSectionHeadings(source)

    const slinks = WM.Parser.findSectionLinks(source)
    let newtext1 = ''
    let prevId = 0

    for (var link of Array.from(slinks)) {
      newtext1 += source.substring(prevId, link.index)
      newtext1 += this.fixLink(
        source, sections, link.rawLink, link.fragment,
        link.anchor
      )
      prevId = link.index + link.length
    }

    newtext1 += source.substr(prevId)

    // Note that it's impossible to recognize any namespaces in the title
    //   without querying the server
    // Alternatively, a list of the known namespaces could be maintained
    //   for each wiki
    // Recognizing namespaces would let recognize more liberal link
    //   syntaxes (e.g. spaces around the colon)
    const ilinks = WM.Parser.findInternalLinks(newtext1, null, title)
    let newtext2 = ''
    prevId = 0

    for (link of Array.from(ilinks)) {
      newtext2 += newtext1.substring(prevId, link.index)
      const rawfragment = link.fragment

      if (rawfragment) {
        newtext2 += this.fixLink(
          newtext1, sections, link.rawLink,
          rawfragment, link.anchor
        )
      } else {
        newtext2 += link.rawLink
      }

      prevId = link.index + link.length
    }

    newtext2 += newtext1.substr(prevId)

    return newtext2
  }

  fixLink(source, sections, rawlink, rawfragment, lalt) {
    const fragment = WM.Parser.squashContiguousWhitespace(rawfragment).trim()

    for (const section of Array.from(sections)) {
      const heading = section.cleanheading
      const dotHeading = WM.Parser.dotEncode(heading)
      const dotFragment = WM.Parser.dotEncode(fragment)

      if (dotHeading.toLowerCase() === dotFragment.toLowerCase()) {
        if (fragment === dotFragment) {
          // If the fragment was encoded, re-encode it because it
          // could contain link-breaking characters (e.g. []|{})
          // The condition would also be true if the fragment doesn't
          // contain any encodable characters, but since heading and
          // fragment at most differ by capitalization, encoding the
          // heading won't have any effect
          return `[[#${dotHeading}${lalt ? `|${lalt}` : ''}]]`
        }
        // If the fragment was not encoded, if the fragment
        // contained link-breaking characters the link was already
        // broken, and replacing it with heading wouldn't make
        // things worse; if the fragment didn't contain
        // link-breaking characters, the heading doesn't either,
        // since heading and fragment at most differ by
        // capitalization, so it's safe to replace it
        // If the fragment was *partially* encoded instead, a
        // link-breaking character may have been encoded, so all
        // link-breaking characters must be re-encoded here!
        const escHeading = WM.Parser.dotEncodeLinkBreakingFragmentCharacters(heading)
        return `[[#${escHeading}${lalt ? `|${lalt}` : ''}]]`
      }
    }

    // It's not easy to use App.log.WikiLink because pure fragments
    //   are not supported yet
    App.log.warning(`Cannot fix broken section link: ${rawlink}`)
    return rawlink
  }

  main_editor(callNext) {
    const source = WM.Editor.readSource()
    const newtext = this.fixLinks(source)

    if (newtext !== source) {
      WM.Editor.writeSource(newtext)
      App.log.info('Fixed section links')
    } else {
      App.log.info('No fixable section links found')
    }

    if (callNext) {
      return callNext()
    }
  }
}
Cls.initClass()
