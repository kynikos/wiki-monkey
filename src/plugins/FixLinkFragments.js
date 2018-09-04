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


module.exports.FixLinkFragments = class FixLinkFragments extends Plugin {
  static get conf_default() {
    return {
      enabled: true,
      editor_menu: ['Query plugins', 'Fix external section links'],
    }
  }

  processLink(
    title, iwprefixes, links, index, source, newText, prevId,
    call, callArgs
  ) {
    if (links[index]) {
      let needle
      const link = links[index]
      const rawfragment = link.fragment

      if (!(link.namespace != null && (needle = link.namespace.toLowerCase(), iwprefixes.includes(needle))) && rawfragment) {
        App.log.info(`Processing ${
          App.log.WikiLink(link.link, link.rawLink) } ...`)

        const target = (link.namespace ? `${link.namespace}:` : '') +
                                                                    link.title

        // Note that it's impossible to recognize any namespaces in the
        //   title without querying the server
        // Alternatively, a list of the known namespaces could be
        //   maintained for each wiki
        // Recognizing namespaces would let recognize more liberal link
        //   syntaxes (e.g. spaces around the colon)
        if (!WM.Parser.compareArticleTitles(target, title)) {
          const params = {
            action: 'parse',
            prop: 'sections',
            page: target,
            redirects: 1,
          }

          return WM.MW.callAPIGet(
            params,
            this.processLinkContinue,
            [link, target, rawfragment, iwprefixes, links, index, source,
              newText, prevId, title, call, callArgs],
            null
          )
        }
        index++
        return this.processLink(
          title, iwprefixes, links,
          index, source, newText, prevId, call, callArgs
        )
      }
      index++
      return this.processLink(
        title, iwprefixes, links, index,
        source, newText, prevId, call, callArgs
      )
    }
    newText += source.substr(prevId)
    return call(newText, iwprefixes, callArgs)
  }

  processLinkContinue(res, args) {
    const link = args[0]
    const target = args[1]
    const rawfragment = args[2]
    const iwprefixes = args[3]
    const links = args[4]
    let index = args[5]
    const source = args[6]
    let newText = args[7]
    let prevId = args[8]
    const title = args[9]
    const call = args[10]
    const callArgs = args[11]

    // Check that the page is in the wiki (e.g. it's not an interwiki link)
    if (res.parse) {
      const sections = []

      for (const section of res.parse.sections) {
        sections.push(WM.Parser.squashContiguousWhitespace(section.line).trim())
      }

      const fixedFragment = this.fixFragment(rawfragment, sections)

      newText += source.substring(prevId, link.index)

      if (fixedFragment === true) {
        newText += link.rawLink
      } else if (fixedFragment) {
        newText += `[[${target}#${fixedFragment}${
          link.anchor ? `|${link.anchor}` : ''}]]`
      } else {
        App.log.warning(`Cannot fix broken link fragment: ${
          App.log.WikiLink(link.link, link.rawLink)}`)
        newText += link.rawLink
      }

      prevId = link.index + link.length
    }

    index++
    return this.processLink(
      title, iwprefixes, links, index, source,
      newText, prevId, call, callArgs
    )
  }

  fixFragment(rawfragment, sections) {
    const fragment = WM.Parser.squashContiguousWhitespace(rawfragment).trim()

    if (sections.indexOf(fragment) < 0) {
      for (const section of sections) {
        const dotSection = WM.Parser.dotEncode(section)
        const dotFragment = WM.Parser.dotEncode(fragment)

        if (dotSection.toLowerCase() === dotFragment.toLowerCase()) {
          if (fragment === dotFragment) {
            // If the fragment was encoded, re-encode it because it
            // could contain link-breaking characters (e.g. []|{})
            // The condition would also be true if the fragment
            // doesn't contain any encodable characters, but since
            // section and fragment at most differ by
            // capitalization, encoding the section won't have any
            // effect
            return dotSection
          }
          // If the fragment was not encoded, if the fragment
          // contained link-breaking characters the link was
          // already broken, and replacing it with section
          // wouldn't make things worse; if the fragment didn't
          // contain link-breaking characters, the section
          // doesn't either, since section and fragment at most
          // differ by capitalization, so it's safe to replace it
          // If the fragment was *partially* encoded instead, a
          // link-breaking character may have been encoded, so
          // all link-breaking characters must be re-encoded
          // here!
          return WM.Parser.dotEncodeLinkBreakingFragmentCharacters(section)
        }
      }
      return false
    }
    return true
  }

  findArchWikiLinks(newText, iwprefixes, callArgs) {
    const templates = WM.Parser.findTemplates(newText, 'Related')
    const title = WM.Editor.getTitle()
    return this.processArchWikiLink(
      title, iwprefixes, templates, 1, 0,
      newText, '', 0,
      this.findArchWikiLinks2, callArgs
    )
  }

  findArchWikiLinks2(newText, iwprefixes, callArgs) {
    const templates = WM.Parser.findTemplates(newText, 'Related2')
    const title = WM.Editor.getTitle()
    return this.processArchWikiLink(
      title, iwprefixes, templates, 2, 0,
      newText, '', 0, this.mainEnd, callArgs
    )
  }

  processArchWikiLink(
title, iwprefixes, templates, expectedArgs, index,
    source, newText, prevId, call, callArgs
) {
    if (templates[index]) {
      const template = templates[index]
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
              App.log.info('Processing ' +
                                        App.log.WikiLink(
link,
                                          template.rawTransclusion
) + ' ...')

                            const params = {
                action: 'parse',
                prop: 'sections',
                page: target,
                redirects: 1,
              }

                            return WM.MW.callAPIGet(
params,
                this.processArchWikiLinkContinue,
                [template, target, rawfragment, iwprefixes, templates,
                  expectedArgs, index, source, newText,
                  prevId, title, call, callArgs],
                null
)
                        }
            index++
                            return this.processArchWikiLink(
              title, iwprefixes, templates, expectedArgs, index,
              source, newText, prevId, call, callArgs
)

                    }
          index++
                        return this.processArchWikiLink(
title, iwprefixes,
            templates, expectedArgs, index, source,
            newText, prevId, call, callArgs
)

                }
        index++
                    return this.processArchWikiLink(
title, iwprefixes,
          templates, expectedArgs, index, source,
          newText, prevId, call, callArgs
)

            }
      App.log.warning(`${`Template:${template.title}` +
                        " must have "}${  expectedArgs  } and only ${
                        expectedArgs
                        }${expectedArgs > 1 ? " arguments: " : " argument: "
                        }${template.rawTransclusion}`)
                index++
                return this.processArchWikiLink(
title, iwprefixes,
        templates, expectedArgs, index, source,
        newText, prevId, call, callArgs
)


        }
    newText += source.substr(prevId)
            return call(newText, iwprefixes, callArgs)

    }

  processArchWikiLinkContinue(res, args) {
    const template = args[0]
    const target = args[1]
    const rawfragment = args[2]
    const iwprefixes = args[3]
    const templates = args[4]
    const expectedArgs = args[5]
    let index = args[6]
    const source = args[7]
    let newText = args[8]
    let prevId = args[9]
    const title = args[10]
    const call = args[11]
    const callArgs = args[12]

    // Check that the page is in the wiki (e.g. it's not an interwiki link)
    if (res.parse) {
      const sections = []

      for (const section of res.parse.sections) {
        sections.push(WM.Parser.squashContiguousWhitespace(section.line).trim())
      }

      const fixedFragment = this.fixFragment(rawfragment, sections)

      newText += source.substring(prevId, template.index)

      if (fixedFragment === true) {
        newText += template.rawTransclusion
      } else if (fixedFragment) {
        const anchor = template.arguments[1] ? `|${template.arguments[1].value}` : ''
        newText += `{{${template.title}|${target}#${fixedFragment}${anchor}}}`
      } else {
        App.log.warning(`Cannot fix broken link fragment: ${
          App.log.WikiLink(target, template.rawTransclusion)}`)
        newText += template.rawTransclusion
      }

      prevId = template.index + template.length
    }

    index++
    return this.processArchWikiLink(
      title, iwprefixes, templates,
      expectedArgs, index, source, newText, prevId, call, callArgs
    )
  }

  async main_editor(callNext) {
    const source = WM.Editor.readSource()
    App.log.info('Fixing links to sections of other articles ...')
    const title = WM.Editor.getTitle()
    const res = await WM.MW.getInterwikiMap(title)
    const iwprefixes = res.query.interwikimap.map((iw) => iw.prefix)
    const links = WM.Parser.findInternalLinks(source, null, null)
    return this.processLink(
      title, iwprefixes, links, 0, source, '', 0,
      this.mainContinue, callNext
    )
  }

  mainContinue(newText, iwprefixes, callNext) {
    // Without this check this plugin would be specific to ArchWiki
    if (location.hostname === 'wiki.archlinux.org') {
      let templates
      return templates = this.findArchWikiLinks(newText, iwprefixes, callNext)
    }
    return this.mainEnd(newText, iwprefixes, callNext)
  }

  mainEnd(newText, iwprefixes, callNext) {
    const source = WM.Editor.readSource()

    if (newText !== source) {
      WM.Editor.writeSource(newText)
      App.log.info('Replaced links to sections of other articles')
    } else {
      App.log.info('No fixable links to sections of other articles ' +
                                                                    'found')
    }

    if (callNext) {
      return callNext()
    }
  }
}
