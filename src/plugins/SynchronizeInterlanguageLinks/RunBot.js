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

const WM = require('%/index')
const _Run = require('./_Run')


module.exports = class SynchronizeInterlanguageLinks extends _Run {
  constructor(conf, title, callBot, chainArgs) {
    super()
    this.conf = conf

    const detect = this.detectLang(title, this.conf.language_tag)
    const pureTitle = detect[0]
    const tag = detect[1]

    const whitelist = this.computeWhiteList(this.conf.tag_whitelist)
    const supportedLangs = this.computeSupportedLangs(this.conf.supported_tags)

    const summary = this.conf.edit_summary

    const wikiUrls = WM.MW.getWikiUrls()
    const url = wikiUrls.short + encodeURIComponent(WM.Parser.squashContiguousWhitespace(title))

    const visitedlinks = {}

    const newlinks = {}
    newlinks[tag.toLowerCase()] = WM.Interlanguage.createNewLink(
      tag,
      pureTitle, url
    )

    return WM.Interlanguage.collectLinks(
      visitedlinks,
      newlinks,
      supportedLangs,
      whitelist,
      true,
      this.mainAutoWrite,
      [title, url, tag, summary, callBot]
    )
  }

  mainAutoWrite(links, args) {
    const title = args[0]
    const url = args[1]
    const tag = args[2]
    const summary = args[3]
    const callBot = args[4]

    const lcTag = tag.toLowerCase()
    // New links that were not in the white list will have the "iwmap"
    // attribute false, "timestamp" and "edittoken" null and "links" as an
    // empty array, however links[lcTag] should always be safe
    const {iwmap} = links[lcTag]
    const {source} = links[lcTag]
    const langlinks = links[lcTag].links
    const {timestamp} = links[lcTag]
    const {edittoken} = links[lcTag]

    const newText = WM.Interlanguage.updateLinks(
      tag, url, iwmap, source,
      langlinks, links
    )

    if (newText !== source) {
      return WM.MW.callAPIPost(
        {
          action: 'edit',
          bot: '1',
          title,
          summary,
          text: newText,
          basetimestamp: timestamp,
          token: edittoken,
        },
        this.mainAutoEnd,
        callBot,
        null
      )
    }
    return callBot(0, null)
  }

  mainAutoEnd(res, callBot) {
    if (res.edit && res.edit.result === 'Success') {
      return callBot(1, null)
    } else if (res.error) {
      WM.App.log.error(`${res.error.info} (${res.error.code})`)
      return callBot(res.error.code, null)
    }
    return callBot(false, null)
  }
}
