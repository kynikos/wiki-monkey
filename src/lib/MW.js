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

const WM = require('../index')
const {h} = require('./index')

const wikiPaths = {
  known: {
    '^https?://[^\.]+\.wikipedia\.org': {
      short: '/wiki/',
      full: '/w/index.php',
      api: '/w/api.php',
    },
    '^https?://wiki\.archlinux\.org': {
      short: '/index.php/',
      full: '/index.php',
      api: '/api.php',
    },
    '^https?://wiki\.archlinux\.de': {
      short: '/title/',
      full: '/index.php',
      api: '/api.php',
    },
    '^http://wiki\.archlinux\.fr': {
      short: '/',
      full: '/index.php',
      api: '/api.php',
    },
    '^https?://wiki\.archlinux\.jp': {
      short: '/index.php/',
      full: '/index.php',
      api: '/api.php',
    },
    '^http://wiki\.archlinux\.ro': {
      short: '/index.php/',
      full: '/index.php',
      api: '/api.php',
    },
    '^http://wiki\.archlinux\.ir': {
      short: '/index.php/',
      full: '/index.php',
      api: '/api.php',
    },
  },
  default_: {
    short: '/index.php?title=',
    full: '/index.php',
    api: '/api.php',
  },
}

const interwikiFixes = [
  ['https://wiki.archlinux.org/index.php/$1_(',
    'https://wiki.archlinux.org/index.php/$1%20('],
]


module.exports = class exports {
  constructor() {
    this.api = new mw.Api()

    const wpaths = this._getWikiPaths(location.href)
    const hostname = wpaths[0]

    this.localWikiPaths = wpaths[1]
    this.localWikiUrls = {}

    for (const key in this.localWikiPaths) {
      this.localWikiUrls[key] = hostname + this.localWikiPaths[key]
    }
  }

  _getWikiPaths(href) {
    // It's necessary to keep this function in a private attribute,
    // otherwise localWikiPaths and localWikiUrls cannot be initialized
    let hostname; let p; let paths
    for (const r in wikiPaths.known) {
      const re = new RegExp(r, 'i')
      const match = re.exec(href)

      if (match) {
        hostname = match[0]
        paths = {}

        for (p in wikiPaths.known[r]) {
          paths[p] = wikiPaths.known[r][p]
        }

        break
      }
    }

    if (!paths) {
      const uri = new mw.Uri(href)
      hostname = uri.host
      paths = {}

      for (p in wikiPaths.default_) {
        paths[p] = wikiPaths.default_[p]
      }
    }

    return [hostname, paths]
  }

  getWikiPaths(href) {
    if (href) {
      return this._getWikiPaths(href)[1]
    }
    return this.localWikiPaths
  }

  linkArticle(page, label) {
    return h('a', {href: mw.util.getUrl(page)}, label || page)
  }

  getWikiUrls(href) {
    if (href) {
      const wpaths = this._getWikiPaths(href)
      const hostname = wpaths[0]
      const paths = wpaths[1]

      const urls = {}

      for (const key in paths) {
        urls[key] = hostname + paths[key]
      }

      return urls
    }
    return this.localWikiUrls
  }

  getTitleFromWikiUrl(url) {
    const uri = new mw.Uri(url)
    let {title} = uri.query

    // Test this *before* the short paths, in fact a short path may just be
    // the full one with the "title" parameter pre-added
    if (!title) {
      const pathname = uri.path

      for (const r in wikiPaths.known) {
        const re = new RegExp(r, 'i')
        const match = re.exec(url)

        if (match) {
          if (pathname.indexOf(wikiPaths.known[r].short) === 0) {
            title = pathname.substr(wikiPaths.known[r]
              .short.length)
          } else {
            title = false
          }

          break
        }
      }

      if (!title) {
        if (pathname.indexOf(wikiPaths.default_.short) === 0) {
          title = pathname.substr(wikiPaths.default_.short.length)
        } else {
          title = false
        }
      }
    }

    return title
  }

  failedQueryError(url) {
    if (url) {
      return `Failed query: ${WM.App.log.PageLink(url, url)}`
    }
    return 'Failed query'
  }

  callAPIGet(params, call, callArgs, callError) {
    params.format = 'json'

    return this.api.get(params)
      .done((data, textStatus, jqXHR) => {
        if (call) {
          return call(data, callArgs)
        }
      }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(jqXHR, textStatus, errorThrown)
        WM.App.log.error(this.failedQueryError())
        if (confirm('Wiki Monkey error: Failed query\n\nDo you want ' +
                                                              'to retry?')) {
          WM.App.log.info('Retrying ...')
          return this.callAPIGet(params, call, callArgs, callError)
        } else if (callError) {
          return callError(callArgs)
        }
      })
  }

  callAPIPost(params, call, callArgs, callError) {
    params.format = 'json'

    return this.api.post(params)
      .done((data, textStatus, jqXHR) => {
        if (call) {
          return call(data, callArgs)
        }
      }).fail((jqXHR, textStatus, errorThrown) => {
        console.error(jqXHR, textStatus, errorThrown)
        WM.App.log.error(this.failedQueryError())
        if (confirm('Wiki Monkey error: Failed query\n\nDo you want ' +
                                                              'to retry?')) {
          WM.App.log.info('Retrying ...')
          return this.callAPIPost(params, call, callArgs, callError)
        } else if (callError) {
          return callError(callArgs)
        }
      })
  }

  async callQuery(params, call, callArgs, callError) {
    let res
    params.action = 'query'

    try {
      res = await this.callAPIGet(params)
    } catch (error1) {
      const error = error1
      if (callError) {
        return callError(callArgs)
      }
      throw error
    }

    const page = Object.values(res.query.pages)[0]

    if (call) {
      return call(page, callArgs)
    }
    return page
  }

  async callQueryEdit(title, call, callArgs) {
    const page = await this.callQuery({
      prop: 'info|revisions',
      rvprop: 'content|timestamp',
      intoken: 'edit',
      titles: title,
    })

    const source = page.revisions[0]['*']
    const {timestamp} = page.revisions[0]
    const {edittoken} = page

    if (call) {
      return call(title, source, timestamp, edittoken, callArgs)
    }
    return {source, timestamp, edittoken}
  }

  isUserBot() {
    let needle
    return needle = 'bot', mw.config.get('wgUserGroups').includes(needle)
  }

  getBacklinks(bltitle, blnamespace, call, callArgs) {
    const query = {
      action: 'query',
      list: 'backlinks',
      bltitle,
      bllimit: 500,
    }

    if (blnamespace) {
      query.blnamespace = blnamespace
    }

    return this._getBacklinksContinue(query, call, callArgs, [])
  }

  _getBacklinksContinue(query, call, callArgs, backlinks) {
    return this.callAPIGet(
      query, (res, args) => {
        backlinks = backlinks.concat(res.query.backlinks)
        if (res['query-continue']) {
          query.blcontinue = res['query-continue'].backlinks.blcontinue
          return this._getBacklinksContinue(query, call, args, backlinks)
        }
        return call(backlinks, args)
      }
      ,
      callArgs, null
    )
  }

  getLanglinks(title, iwmap, call, callArgs) {
    const query = {
      action: 'query',
      prop: 'langlinks',
      titles: title,
      lllimit: 500,
      llurl: '1',
      redirects: '1',
    }

    if (iwmap) {
      query.meta = 'siteinfo'
      query.siprop = 'interwikimap'
      query.sifilteriw = 'local'
    }

    return this._getLanglinksContinue(query, call, callArgs, [], null)
  }

  _getLanglinksContinue(query, call, callArgs, langlinks, iwmap) {
    return this.callAPIGet(
      query, (res, args) => {
        const page = Object.values(res.query.pages)[0]
        langlinks = langlinks.concat(page.langlinks)

        if (res.query.interwikimap) {
          iwmap = res.query.interwikimap
        }

        if (query.meta) {
          delete query.meta
          delete query.siprop
          delete query.sifilteriw
        }

        if (res['query-continue']) {
          query.llcontinue = res['query-continue'].langlinks.llcontinue
          return this._getLanglinksContinue(
            query, call, args, langlinks,
            iwmap
          )
        }
        return call(langlinks, iwmap, args)
      }
      ,
      callArgs, null
    )
  }

  getInterwikiMap(title) {
    return this.callAPIGet({
      action: 'query',
      meta: 'siteinfo',
      siprop: 'interwikimap',
    })
  }

  getLocalInterwikiMap(title, call, callArgs) {
    return this.callAPIGet(
      {
        action: 'query',
        meta: 'siteinfo',
        siprop: 'interwikimap',
        sifilteriw: 'local',
      },
      (res, args) => {
        return call(res.query.interwikimap, args)
      },
      callArgs,
      null
    )
  }

  fixInterwikiUrl(url) {
    for (let f = 0, end = interwikiFixes.length, asc = end >= 0; asc ? f < end : f > end; asc ? f++ : f--) {
      const furl = url.replace(interwikiFixes[f][0], interwikiFixes[f][1])

      if (furl !== url) {
        return furl
      }
    }

    // Return the unmodified url if no replacement has been done
    return url
  }

  async getSpecialList(qppage, siprop) {
    const query = {
      action: 'query',
      list: 'querypage',
      qppage,
      qplimit: 500,
    }

    if (siprop) {
      query.meta = 'siteinfo'
      query.siprop = siprop
    }

    let results = []
    const siteinfo = {}

    while (true) {
      const res = await this.callAPIGet(query)
      results = results.concat(res.query.querypage.results)

      for (const key in res.query) {
        const info = res.query[key]
        if (key !== 'querypage') {
          siteinfo[key] = info
        }
      }

      delete query.meta
      delete query.siprop

      if (res['query-continue']) {
        query.qpoffset = res['query-continue'].querypage.qpoffset
        continue
      }

      return {results, siteinfo}
    }
  }

  getUserContribs(ucuser, ucstart, ucend, call, callArgs) {
    const query = {
      action: 'query',
      list: 'usercontribs',
      ucuser,
      ucprop: '',
      ucstart,
      ucend,
      uclimit: 500,
    }

    return this._getUserContribsContinue(query, call, callArgs, [])
  }

  _getUserContribsContinue(query, call, callArgs, results) {
    return this.callAPIGet(
      query, (res, args) => {
        results = results.concat(res.query.usercontribs)

        if (res['query-continue']) {
          query.uccontinue = res['query-continue'].usercontribs
            .uccontinue
          return this._getUserContribsContinue(query, call, args, results)
        }
        return call(results, args)
      }
      ,
      callArgs, null
    )
  }
}
