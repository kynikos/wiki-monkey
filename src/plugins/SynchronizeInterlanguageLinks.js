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


const Cls = module.exports.SynchronizeInterlanguageLinks = class SynchronizeInterlanguageLinks extends Plugin {
  constructor(...args) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super() }
      const thisFn = (() => { return this }).toString()
      const thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim()
      eval(`${thisName} = this;`)
    }
    this.detectLang = this.detectLang.bind(this)
    this.computeWhiteList = this.computeWhiteList.bind(this)
    this.computeSupportedLangs = this.computeSupportedLangs.bind(this)
    this.mainContinue = this.mainContinue.bind(this)
    this.mainEnd = this.mainEnd.bind(this)
    this.mainAutoWrite = this.mainAutoWrite.bind(this)
    this.mainAutoEnd = this.mainAutoEnd.bind(this)
    super(...args)
  }

  static initClass() {
    this.conf_default = {
      enabled: true,
      editor_menu: ['Query plugins', 'Sync interlanguage links'],
      bot_label: 'Synchronize interlanguage links',
      language_tag: 'en',
      tag_whitelist: ['en'],
      supported_tags: ['en'],
      edit_summary: 'synchronized interlanguage links with the other wikis',
    }
    this.wiki_to_conf_default = {
      ArchWiki: {
        language_tag: 'ArchWiki',
        tag_whitelist: 'ArchWiki',
        supported_tags: 'ArchWiki',
      },
      Wikipedia: {
        enabled: false,
      },
    }
  }

  detectLang(title, tag) {
    // Without this check this plugin would be specific to ArchWiki
    let pureTitle
    if (tag === 'ArchWiki') {
      const detect = WM.ArchWiki.detectLanguage(title)
      pureTitle = detect[0]
      tag = WM.ArchWiki.getInterlanguageTag(detect[1])
    } else {
      pureTitle = title
    }

    return [pureTitle, tag]
  }

  computeWhiteList(whitelist) {
    // Without this check this plugin would be specific to ArchWiki
    if (whitelist === 'ArchWiki') {
      return WM.ArchWiki.getInternalInterwikiLanguages()
    }
    return whitelist
  }

  computeSupportedLangs(supportedLangs) {
    // Without this check this plugin would be specific to ArchWiki
    if (supportedLangs === 'ArchWiki') {
      return WM.ArchWiki.getInterwikiLanguages()
    }
    return supportedLangs
  }

  main_editor(callNext) {
    const title = WM.Editor.getTitle()

    const detect = this.detectLang(title, this.conf.language_tag)
    const pureTitle = detect[0]
    const tag = detect[1]

    const whitelist = this.computeWhiteList(this.conf.tag_whitelist)
    const supportedLangs = this.computeSupportedLangs(this.conf.supported_tags)

    App.log.info('Synchronizing interlanguage links ...')

    return WM.MW.getLocalInterwikiMap(
      title,
      this.mainContinue,
      [tag, pureTitle, supportedLangs, whitelist, title, callNext]
    )
  }

  mainContinue(iwmap, args) {
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

    App.log.info(`Reading ${App.log.PageLink(url, 'edited article')}` +
                                                                    ' ...')

    if (langlinks) {
      for (const link of Array.from(langlinks)) {
        const nlink = newlinks[link.lang.toLowerCase()]
        const vlink = visitedlinks[link.lang.toLowerCase()]

        if (!vlink && !nlink) {
          newlinks[link.lang.toLowerCase()] = WM.Interlanguage.createNewLink(link.lang, link.title, link.url)
        } else if (vlink && vlink.url !== link.url) {
          // Just ignore any conflicting links and warn the user:
          // if it's a real conflict, the user will investigate it,
          // otherwise the user will ignore it
          App.log.warning(`${'Possibly conflicting interlanguage ' +
                        'links: '}${App.log.PageLink(link.url, `[[${
            link.lang}:${link.title}]]`)} and ${
            App.log.PageLink(vlink.url, `[[${link.lang}:${
              visitedlinks[link.lang.toLowerCase()].title}]]`)}`)
        } else if (nlink && nlink.url !== link.url) {
          // Just ignore any conflicting links and warn the user:
          // if it's a real conflict, the user will investigate it,
          // otherwise the user will ignore it
          App.log.warning(`${'Possibly conflicting interlanguage ' +
                        'links: '}${App.log.PageLink(link.url, `[[${
            link.lang}:${link.title}]]`)} and ${
            App.log.PageLink(nlink.url, `[[${link.lang}:${
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
    App.log.info('No interlanguage links found')

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
      App.log.info('Synchronized interlanguage links')
    } else {
      App.log.info('Interlanguage links were already synchronized')
    }

    if (callNext) {
      return callNext()
    }
  }

  main_bot(title, callBot, chainArgs) {
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
      App.log.error(`${res.error.info} (${res.error.code})`)
      return callBot(res.error.code, null)
    }
    return callBot(false, null)
  }
}
Cls.initClass()
