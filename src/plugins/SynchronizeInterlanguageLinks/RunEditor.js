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
const _Run = require('./_Run')


module.exports = class SynchronizeInterlanguageLinks extends _Run {
  constructor(conf, callNext) {
    super()
    this.conf = conf

    const title = WM.Editor.getTitle()

    const detect = this.detectLang(title, this.conf.language_tag)
    const pureTitle = detect[0]
    const tag = detect[1]

    const whitelist = this.computeWhiteList(this.conf.tag_whitelist)
    const supportedLangs = this.computeSupportedLangs(this.conf.supported_tags)

    WM.App.log.info('Synchronizing interlanguage links ...')

    return WM.MW.getLocalInterwikiMap(
      title,
      this.mainContinue,
      [tag, pureTitle, supportedLangs, whitelist, title, callNext]
    )
  }

  mainContinue = (iwmap, args) => {
    const tag = args[0]
    const pureTitle = args[1]
    const supportedLangs = args[2]
    const whitelist = args[3]
    const title = args[4]
    const callNext = args[5]

    const source = WM.Editor.readSource()

    const langlinks = WM.Interlanguage.parseLinks(supportedLangs, source, iwmap)

    const wikiUrls = WM.MW.getWikiUrls()
    const url = wikiUrls.short + encodeURIComponent(WM.Parser.squashContiguousWhitespace(title))

    const visitedlinks = {}
    visitedlinks[tag.toLowerCase()] = WM.Interlanguage.createVisitedLink(
      tag, pureTitle, url, iwmap,
      source, null, null, langlinks
    )

    const newlinks = {}

    WM.App.log.info(`Reading ${WM.App.log.PageLink(url, 'edited article')}` +
                                                                    ' ...')

    if (langlinks) {
      for (const link of langlinks) {
        const nlink = newlinks[link.lang.toLowerCase()]
        const vlink = visitedlinks[link.lang.toLowerCase()]

        if (!vlink && !nlink) {
          newlinks[link.lang.toLowerCase()] = WM.Interlanguage.createNewLink(link.lang, link.title, link.url)
        } else if (vlink && vlink.url !== link.url) {
          // Just ignore any conflicting links and warn the user:
          // if it's a real conflict, the user will investigate it,
          // otherwise the user will ignore it
          WM.App.log.warning(`${'Possibly conflicting interlanguage ' +
                        'links: '}${WM.App.log.PageLink(link.url, `[[${
            link.lang}:${link.title}]]`)} and ${
            WM.App.log.PageLink(vlink.url, `[[${link.lang}:${
              visitedlinks[link.lang.toLowerCase()].title}]]`)}`)
        } else if (nlink && nlink.url !== link.url) {
          // Just ignore any conflicting links and warn the user:
          // if it's a real conflict, the user will investigate it,
          // otherwise the user will ignore it
          WM.App.log.warning(`${'Possibly conflicting interlanguage ' +
                        'links: '}${WM.App.log.PageLink(link.url, `[[${
            link.lang}:${link.title}]]`)} and ${
            WM.App.log.PageLink(nlink.url, `[[${link.lang}:${
              newlinks[link.lang.toLowerCase()].title}]]`)}`)
        }
      }

      return WM.Interlanguage.collectLinks(
        visitedlinks,
        newlinks,
        supportedLangs,
        whitelist,
        false,
        this.mainEnd,
        [tag, url, source, langlinks, iwmap, callNext]
      )
    }
    WM.App.log.info('No interlanguage links found')

    if (callNext) {
      return callNext()
    }
  }

  mainEnd(links, args) {
    const tag = args[0]
    const url = args[1]
    const source = args[2]
    const langlinks = args[3]
    const iwmap = args[4]
    const callNext = args[5]

    const newText = WM.Interlanguage.updateLinks(
      tag, url, iwmap, source,
      langlinks, links
    )

    if (newText !== source) {
      WM.Editor.writeSource(newText)
      WM.App.log.info('Synchronized interlanguage links')
    } else {
      WM.App.log.info('Interlanguage links were already synchronized')
    }

    if (callNext) {
      return callNext()
    }
  }
}
