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


module.exports = class Interlanguage {
  constructor() {
    this.parseLinks = this.parseLinks.bind(this)
    this.queryLinks = this.queryLinks.bind(this)
    this.createNewLink = this.createNewLink.bind(this)
    this.createVisitedLink = this.createVisitedLink.bind(this)
    this.collectLinks = this.collectLinks.bind(this)
    this._collectLinksContinue = this._collectLinksContinue.bind(this)
    this.updateLinks = this.updateLinks.bind(this)
  }

  parseLinks(supportedLangs, source, iwmap) {
    const parsedLinks = WM.Parser.findSpecialLinks(
      source,
      supportedLangs.join('|')
    )

    const langlinks = []
    for (const link of parsedLinks) {
      // Do not store the tag lowercased, since it should be kept as
      // original
      var lurl
      const ltag = link.namespace
      const ltitle = link.title + (link.fragment ? `#${link.fragment}` : '')
      for (const iw of iwmap) {
        if (iw.prefix.toLowerCase() === ltag.toLowerCase()) {
          // Fix the url _before_ replacing $1
          lurl = WM.MW.fixInterwikiUrl(iw.url)
          lurl = lurl.replace('$1', encodeURIComponent(WM.Parser.squashContiguousWhitespace(ltitle)))
          break
        }
      }

      langlinks.push({lang: ltag, title: ltitle, url: lurl, index: link.index, length: link.length})
    }

    return langlinks
  }

  queryLinks(
    queryTitle, title, supportedLangs,
    whitelist, firstPage, callEnd, callArgs
  ) {
    const query = {
      action: 'query',
      prop: 'info|revisions',
      rvprop: 'content|timestamp',
      intoken: 'edit',
      titles: queryTitle,
      meta: 'siteinfo',
      siprop: 'interwikimap',
      sifilteriw: 'local',
    }

    // When called by the bot, if the start page is a redirect itself, it
    // shoudln't be resolved
    if (!firstPage) {
      query.redirects = '1'
    }

    return WM.MW.callAPIGet(
      query,
      (res, args) => {
        let edittoken; let error; let iwmap; let langlinks; let source; let timestamp
        if (res.query.pages) {
          const page = Object.values(res.query.pages)[0]
          if (page.revisions) {
            error = null
            source = page.revisions[0]['*'];
            ({timestamp} = page.revisions[0]);
            ({edittoken} = page)
            iwmap = res.query.interwikimap
            langlinks = this.parseLinks(supportedLangs, source, iwmap)
          } else {
            // The requested article doesn't exist
            error = 'nonexisting'
            source = false
            timestamp = false
            edittoken = false
            iwmap = res.query.interwikimap
            langlinks = false
          }
        } else if (res.query.redirects) {
          // The requested article is an unsolved redirect
          // (redirect over interwiki link?)
          error = 'unsolvedredirect'
          source = false
          timestamp = false
          edittoken = false
          iwmap = res.query.interwikimap
          langlinks = false
        } else {
          // Unknown error
          error = 'unknown'
          source = false
          timestamp = false
          edittoken = false
          iwmap = res.query.interwikimap
          langlinks = false
        }

        return callEnd(
          title,
          supportedLangs,
          whitelist,
          false,
          error,
          langlinks,
          iwmap,
          source,
          timestamp,
          edittoken,
          args
        )
      }
      ,
      callArgs,
      (args) => callEnd(
        title,
        supportedLangs,
        whitelist,
        false,
        'unknown',
        false,
        false,
        false,
        false,
        false,
        args
      )
    )
  }

  createNewLink(origTag, title, url) {
    return {origTag, title, url}
  }

  createVisitedLink(
    origTag, title, url, iwmap, source,
    timestamp, edittoken, links
  ) {
    const entry = {
      origTag,
      title,
      url,
      iwmap,
      source,
      timestamp,
      edittoken,
      links: [],
    }

    for (const link of links) {
      entry.links.push(link)
    }

    return entry
  }

  collectLinks(
    visitedlinks, newlinks, supportedLangs,
    whitelist, firstPage, callEnd, callArgs
  ) {
    let link
    for (var tag in newlinks) {
      link = newlinks[tag]
      break
    }

    if (link) {
      delete newlinks[tag]

      const {url} = link

      // Don't use WM.MW.getTitleFromWikiUrl(decodeURI(url)) because
      // it wouldn't decode some characters like colons, which are
      // required to be decoded instead when making an API call
      const queryTitle = decodeURIComponent(WM.MW.getTitleFromWikiUrl(url))

      if (queryTitle) {
        const {origTag} = link
        const {title} = link

        // If this is the first processed page, it's local for sure, so
        //   query its links in any case. This e.g. prevents the
        //   application from crashing in case the local page is in a
        //   language whose language tag is not in the white list
        // tag is already lower-cased
        if (firstPage || whitelist.indexOf(tag) > -1) {
          WM.App.log.info(`Reading ${
            WM.App.log.PageLink(url, `[[${origTag}:${
              title}]]`)} ...`)

          return this.queryLinks(
            queryTitle,
            title,
            supportedLangs,
            whitelist,
            firstPage,
            this._collectLinksContinue,
            [url, tag, origTag, visitedlinks, newlinks, callEnd,
              callArgs]
          )
        }
        return this._collectLinksContinue(
          title,
          supportedLangs,
          whitelist,
          firstPage,
          'notinwhitelist',
          [],
          false,
          null,
          null,
          null,
          [url, tag, origTag, visitedlinks, newlinks, callEnd,
            callArgs]
        )
      }
      WM.App.log.warning(`Cannot extract the page title from ${
        WM.App.log.PageLink(url, decodeURI(url))
      }, removing it if it \
was linked from the processed article`)
      return this.collectLinks(
        visitedlinks,
        newlinks,
        supportedLangs,
        whitelist,
        firstPage,
        callEnd,
        callArgs
      )
    }
    return callEnd(visitedlinks, callArgs)
  }

  _collectLinksContinue(
    title, supportedLangs,
    whitelist, firstPage, error, langlinks,
    iwmap, source, timestamp, edittoken, args
  ) {
    const url = args[0]
    const tag = args[1]
    const origTag = args[2]
    const visitedlinks = args[3]
    const newlinks = args[4]
    const callEnd = args[5]
    const callArgs = args[6]

    if (error === 'nonexisting') {
      WM.App.log.warning(`${WM.App.log.PageLink(
        url,
        `[[${origTag}:${title}]]`
      )
      } seems to point \
to a non-existing article: removing it if \
it was linked from the processed article`)
    } else {
      if (error === 'unsolvedredirect') {
        WM.App.log.warning(`${WM.App.log.PageLink(
          url,
          `[[${origTag}:${title}]]`
        )
        } will not be checked because it points to \
an external redirect`)
      } else if (error === 'unknown') {
        WM.App.log.warning(`${WM.App.log.PageLink(
          url,
          `[[${origTag}:${title}]]`
        )
        } will not be checked because of an \
unspecified problem`)
      } else if (error === 'notinwhitelist') {
        WM.App.log.warning(`${WM.App.log.PageLink(
          url,
          `[[${origTag}:${title}]]`
        )
        } will not be checked because ${tag
        } is not included in the whitelist defined \
in the configuration`)
      }

      visitedlinks[tag] = this.createVisitedLink(
        origTag,
        title, url, iwmap, source,
        timestamp, edittoken, langlinks
      )

      for (const link of langlinks) {
        const nlink = newlinks[link.lang.toLowerCase()]
        const vlink = visitedlinks[link.lang.toLowerCase()]

        if (!vlink && !nlink) {
          newlinks[link.lang.toLowerCase()] =
                                    this.createNewLink(
                                      link.lang,
                                      link.title, link.url
                                    )
        } else if (vlink && vlink.url !== link.url) {
          // Just ignore any conflicting links and warn the user:
          // if it's a real conflict, the user will investigate it,
          // otherwise the user will ignore it
          WM.App.log.warning(`Possibly conflicting interlanguage \
links: ${WM.App.log.PageLink(link.url, `[[${
    link.lang}:${link.title}]]`)} and ${
  WM.App.log.PageLink(vlink.url, `[[${link.lang}:${
    visitedlinks[link.lang.toLowerCase()].title}]]`)}`)
        } else if (nlink && nlink.url !== link.url) {
          // Just ignore any conflicting links and warn the user:
          // if it's a real conflict, the user will investigate it,
          // otherwise the user will ignore it
          WM.App.log.warning(`Possibly conflicting interlanguage \
links: ${WM.App.log.PageLink(link.url, `[[${
    link.lang}:${link.title}]]`)} and ${
  WM.App.log.PageLink(nlink.url, `[[${link.lang}:${
    newlinks[link.lang.toLowerCase()].title}]]`)}`)
        }
      }
    }

    return this.collectLinks(
      visitedlinks,
      newlinks,
      supportedLangs,
      whitelist,
      firstPage,
      callEnd,
      callArgs
    )
  }

  updateLinks(lang, url, iwmap, source, oldlinks, newlinks) {
    let firstLink; let link
    lang = lang.toLowerCase()
    const linkList = []

    for (const tag in newlinks) {
      if (tag !== lang) {
        link = newlinks[tag]
        let tagFound = false

        // New links that were not in the white list will have the
        // "iwmap" attribute false, "timestamp" and "edittoken" null
        // and "links" as an empty array
        // Note the difference between 'iwmap' and 'link.iwmap'
        for (const iw of iwmap) {
          if (iw.prefix.toLowerCase() === tag.toLowerCase()) {
            linkList.push(`[[${link.origTag}:${
              link.title}]]`)
            tagFound = true
            break
          }
        }

        if (!tagFound) {
          WM.App.log.warning(`${tag} interlanguage links are not \
supported in ${WM.App.log.PageLink(url, `[[${
    link.origTag}:${link.title}]]`)
} , ignoring them`)
        }
      }
    }

    linkList.sort((a, b) => {
      // Sorting is case sensitive by default
      if (a.toLowerCase() > b.toLowerCase()) {
        return 1
      }
      if (b.toLowerCase() > a.toLowerCase()) {
        return -1
      }
      return 0
    })

    let cleanText = ''
    let textId = 0

    for (link of oldlinks) {
      cleanText += source.substring(textId, link.index)
      textId = link.index + link.length
    }

    cleanText += source.substring(textId)

    if (oldlinks.length) {
      // Insert the new links at the index of the first previous link
      firstLink = oldlinks[0].index
    } else {
      firstLink = 0
    }

    const parts = []
    // Do not add empty strings to parts, otherwise when it's joined
    //   unnecessary line breaks will be added

    const head = cleanText.substring(0, firstLink).trim()

    if (head) {
      parts.push(head)
    }

    const links = linkList.join('\n')

    if (links) {
      parts.push(links)
    }

    const body = cleanText.substr(firstLink).trim()

    if (body) {
      parts.push(body)
    }

    // Make sure to preserve the original white space at the end, otherwise
    //   the final (newText != source) may return true even when no actual
    //   change has been made
    // Note that /\s+$/ would return null in the absence of trailing
    //   whitespace, so a further check should be made, while /\s*$/
    //   safely returns an empty string in that case
    const trailws = /\s*$/

    return parts.join('\n') + trailws.exec(source)
  }
}
