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


export default async function processArchWikiLink({
  title, template, expectedArgs, newText,
}) {
  const args = template.arguments

  // Don't crash in case of malformed templates
  if (args.length === expectedArgs) {
    const link = args[0].value
    const fragId = link.indexOf('#')

    if (fragId > -1) {
      const rawtarget = link.substring(0, fragId)
      const target = WM.Parser.squashContiguousWhitespace(rawtarget).trim()
      const rawfragment = link.substr(fragId + 1)

      if (rawfragment) {
        // Note that it's impossible to recognize any
        //   namespaces in the title without querying the
        //   server
        // Alternatively, a list of the known namespaces could
        //   be maintained for each wiki
        // Recognizing namespaces would let recognize more
        //   liberal link syntaxes (e.g. spaces around the
        //   colon)
        if (!WM.Parser.compareArticleTitles(target, title)) {
          WM.App.log.info(`Processing ${
            WM.App.log.WikiLink(
              link,
              template.rawTransclusion,
            )} ...`)

          const res = await WM.MW.callAPIGet({
            action: 'parse',
            prop: 'sections',
            page: target,
            redirects: 1,
          })

          // Check that the page is in the wiki (e.g. it's not an interwiki link)
          // eslint-disable-next-line max-depth
          if (res.parse) {
            return processArchWikiLinkContinue({
              res, template, target, rawfragment, newText,
            })
          }
        }
      }
    }
  } else {
    WM.App.log.warning(`Template:${template.title} must have ${expectedArgs} and
only ${expectedArgs} ${expectedArgs > 1 ? 'arguments' : 'argument'}:
${template.rawTransclusion}`)
  }

  return newText
}


function processArchWikiLinkContinue({
  res, template, target, rawfragment, newText,
}) {
  const sections = []

  for (const section of res.parse.sections) {
    sections.push(WM.Parser.squashContiguousWhitespace(section.line).trim())
  }

  const fixedFragment = fixFragment(rawfragment, sections)
  let newTemplate

  if (fixedFragment === true) {
    newTemplate = template.rawTransclusion
  } else if (fixedFragment) {
    const anchor = template.arguments[1]
      ? `|${template.arguments[1].value}`
      : ''
    newTemplate = `{{${template.title}|${target}#${fixedFragment}${anchor}}}`
  } else {
    WM.App.log.warning(`Cannot fix broken link fragment: ${
      WM.App.log.WikiLink(target, template.rawTransclusion)}`)
    newTemplate = template.rawTransclusion
  }

  return Str.overwriteFor(newText, newTemplate, template.index, template.length)
}
