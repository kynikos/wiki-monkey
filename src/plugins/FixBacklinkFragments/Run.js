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

const readTarget = () => document.getElementById('WikiMonkey-FixBacklinkFragments-Target').value


module.exports = class {
  constructor(conf, title, callBot, chainArgs) {
    this.conf = conf
    const summary = this.conf.edit_summary

    const target = readTarget()
    WM.App.log.hidden(`Target page: ${target}`)

    if (target) {
      if (chainArgs === null) {
        const params = {
          action: 'parse',
          prop: 'sections',
          page: target,
          redirects: 1,
        }

        WM.App.log.warning('If some articles in the list are \
linking to the target article \
through a redirect, you should process the backlinks \
of that redirect page separately through its \
Special:WhatLinksHere page, as this plugin can only \
fix links that exactly match the title of the target \
article.\nIn order to save time you are advised to \
hide the redirects in the page lists that allow to do \
so.')

        return WM.MW.callAPIGet(
          params,
          this.mainAutoFindSections,
          [title, target, summary, callBot],
          null
        )
      }
      return this.mainAutoRead(target, chainArgs, title, summary, callBot)
    }
    WM.App.log.error('The target page cannot be empty')
    return callBot(false, null)
  }

  fixLinks(source, target, sections) {
    // Note that it's impossible to recognize any namespaces in the title
    //   without querying the server
    // Alternatively, a list of the known namespaces could be maintained
    //   for each wiki
    // Recognizing namespaces would let recognize more liberal link
    //   syntaxes (e.g. spaces around the colon)
    const links = WM.Parser.findInternalLinks(source, null, target)

    let newText = ''
    let prevId = 0

    for (const link of links) {
      newText += source.substring(prevId, link.index)
      let newlink = link.rawLink

      const rawfragment = link.fragment

      if (rawfragment) {
        const fixedFragment = this.fixFragment(rawfragment, sections)

        if (fixedFragment === true) {
          null
        } else if (fixedFragment) {
          const oldlink = newlink
          newlink = `[[${target}#${fixedFragment}${
            link.anchor ? `|${link.anchor}` : ''}]]`
          WM.App.log.info(`${`Fixed broken link fragment: ${oldlink}` +
                          ' -> '}${WM.App.log.WikiLink(link.link, newlink)}`)
        } else {
          WM.App.log.warning(`Cannot fix broken link fragment: ${
            WM.App.log.WikiLink(link.link, newlink)}`)
        }
      }

      newText += newlink
      prevId = link.index + link.length
    }

    newText += source.substr(prevId)

    // Without this check this plugin would be specific to ArchWiki
    if (location.hostname === 'wiki.archlinux.org') {
      newText = this.fixArchWikiLinks(newText, target, sections)
    }

    return newText
  }

  fixArchWikiLinks(source, target, sections) {
    const links = WM.Parser.findTemplates(source, 'Related')

    let newText1 = ''
    let prevId = 0

    for (const link of links) {
      newText1 += source.substring(prevId, link.index)
      newText1 += this.fixArchWikiLink(target, sections, link, 1)
      prevId = link.index + link.length
    }

    newText1 += source.substr(prevId)

    const links2 = WM.Parser.findTemplates(newText1, 'Related2')

    let newText2 = ''
    prevId = 0

    for (const link2 of links2) {
      newText2 += newText1.substring(prevId, link2.index)
      newText2 += this.fixArchWikiLink(target, sections, link2, 2)
      prevId = link2.index + link2.length
    }

    newText2 += newText1.substr(prevId)

    return newText2
  }

  fixArchWikiLink(target, sections, template, expectedArgs) {
    const args = template.arguments

    // Don't crash in case of malformed templates
    if (args.length === expectedArgs) {
      const link = args[0].value
      const fragId = link.indexOf('#')

      if (fragId > -1) {
        const ltitle = link.substring(0, fragId)

        // Note that it's impossible to recognize any namespaces in the
        //   title without querying the server
        // Alternatively, a list of the known namespaces could be
        //   maintained for each wiki
        // Recognizing namespaces would let recognize more liberal link
        //   syntaxes (e.g. spaces around the colon)
        if (WM.Parser.compareArticleTitles(ltitle, target)) {
          const rawfragment = link.substr(fragId + 1)
          const fixedFragment = this.fixFragment(rawfragment, sections)

          if (fixedFragment === true) {
            null
          } else if (fixedFragment) {
            const anchor = args[1] ? `|${args[1].value}` : ''
            const newlink = `${`{{${template.title}|${target}` +
                                          '#'}${fixedFragment}${anchor}}}`
            WM.App.log.info(`Fixed broken link fragment: ${
              template.rawTransclusion} -> ${
              WM.App.log.WikiLink(link, newlink)}`)
            return newlink
          } else {
            WM.App.log.warning(`Cannot fix broken link fragment: ${
              WM.App.log.WikiLink(
                link,
                template.rawTransclusion
              )}`)
          }
        }
      }
    } else {
      WM.App.log.warning(`Template:${template.title} must have ${
        expectedArgs} and only ${expectedArgs
      }${expectedArgs > 1 ? ' arguments: ' : ' argument: '
      }${template.rawTransclusion}`)
    }

    return template.rawTransclusion
  }

  fixFragment(rawfragment, sections) {
    if (rawfragment) {
      const fragment = WM.Parser.squashContiguousWhitespace(rawfragment)
        .trim()

      if (sections.indexOf(fragment) < 0) {
        for (const section of sections) {
          // The FixFragments and FixLinkFragments plugins also try
          // to fix dot-encoded fragments however it's too dangerous
          // to do it with this bot plugin, have the user fix
          // fragments manually
          if (section.toLowerCase() === fragment.toLowerCase()) {
            return section
          }
        }

        return false
      }
      return true
    }
    return true
  }

  mainAutoFindSections(res, args) {
    const title = args[0]
    const target = args[1]
    const summary = args[2]
    const callBot = args[3]
    const sections = []

    if (res.parse) {
      for (const section of res.parse.sections) {
        sections.push(WM.Parser.squashContiguousWhitespace(section.line).trim())
      }

      return this.mainAutoRead(target, sections, title, summary, callBot)
    }
    WM.App.log.error(`The set target page, ${target}` +
                                                      ', seems not to exist')

    if (res.error) {
      return callBot(res.error.code, sections)
    }
    return callBot(false, sections)
  }

  mainAutoRead(target, sections, title, summary, callBot) {
    return WM.MW.callQueryEdit(
      title,
      this.mainAutoWrite,
      [target, summary, callBot, sections]
    )
  }

  mainAutoWrite(title, source, timestamp, edittoken, args) {
    const target = args[0]
    const summary = args[1]
    const callBot = args[2]
    const sections = args[3]

    const newtext = this.fixLinks(source, target, sections)

    if (newtext !== source) {
      return WM.MW.callAPIPost(
        {
          action: 'edit',
          bot: '1',
          title,
          summary,
          text: newtext,
          basetimestamp: timestamp,
          token: edittoken,
        },
        this.mainAutoEnd,
        [callBot, sections],
        null
      )
    }
    return callBot(0, sections)
  }

  mainAutoEnd(res, args) {
    const callBot = args[0]
    const sections = args[1]

    if (res.edit && res.edit.result === 'Success') {
      return callBot(1, sections)
    } else if (res.error) {
      WM.App.log.error(`${res.error.info} (${res.error.code})`)
      return callBot(res.error.code, sections)
    }
    return callBot(false, sections)
  }
}
