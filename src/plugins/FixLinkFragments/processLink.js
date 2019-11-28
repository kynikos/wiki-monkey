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

const Str = require('@kynikos/misc/dist/str')
import WM from '%/index'
import fixFragment from './fixFragment'


export default async function processLink({title, iwprefixes, link, newText}) {
  const rawfragment = link.fragment

  if (
    (
      link.namespace == null ||
      !iwprefixes.includes(link.namespace.toLowerCase())
    ) &&
    rawfragment
  ) {
    WM.App.log.info(
      `Processing ${WM.App.log.WikiLink(link.link, link.rawLink)} ...`)

    const target = (link.namespace ? `${link.namespace}:` : '') + link.title

    // Note that it's impossible to recognize any namespaces in the
    //   title without querying the server
    // Alternatively, a list of the known namespaces could be
    //   maintained for each wiki
    // Recognizing namespaces would let recognize more liberal link
    //   syntaxes (e.g. spaces around the colon)
    if (!WM.Parser.compareArticleTitles(target, title)) {
      const res = await WM.MW.callAPIGet({
        action: 'parse',
        prop: 'sections',
        page: target,
        redirects: 1,
      })

      // Check that the page is in the wiki (e.g. it's not an interwiki link)
      if (res.parse) {
        return processLinkContinue({res, link, target, rawfragment, newText})
      }
    }
  }

  return newText
}


function processLinkContinue({res, link, target, rawfragment, newText}) {
  const sections = []

  for (const section of res.parse.sections) {
    sections.push(WM.Parser.squashContiguousWhitespace(section.line).trim())
  }

  const fixedFragment = fixFragment(rawfragment, sections)
  let newLink

  if (fixedFragment === true) {
    newLink = link.rawLink
  } else if (fixedFragment) {
    newLink = `[[${target}#${fixedFragment}${
      link.anchor ? `|${link.anchor}` : ''}]]`
  } else {
    WM.App.log.warning(`Cannot fix broken link fragment: ${
      WM.App.log.WikiLink(link.link, link.rawLink)}`)
    newLink = link.rawLink
  }

  return Str.overwriteFor(newText, newLink, link.index, link.length)
}
