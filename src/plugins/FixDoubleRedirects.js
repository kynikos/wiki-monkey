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
const Str = require('@kynikos/misc/dist/Str')


const Cls = module.exports.FixDoubleRedirects = class FixDoubleRedirects extends Plugin {
  static initClass() {
    this.conf_default = {
      enabled: true,
      special_menu: ['Fix double redirects'],
      edit_summary: 'fix double redirect',
    }
  }

  async main_special(callNext) {
    App.log.info('Fixing double redirects ...')

    const {results, siteinfo} =
            await WM.MW.getSpecialList('DoubleRedirects', 'namespaces')

    const {namespaces} = siteinfo
    results.reverse()

    try {
      for (const doubleRedirect of Array.from(results)) {
        await this.process_redirect(doubleRedirect, namespaces)
      }
    } catch (error1) {
      const error = error1
      App.log.error(error.message)
      return false
    }

    App.log.info('Fixed double redirects')
    if (callNext) {
      return callNext()
    }
  }

  async process_redirect(doubleRedirect, namespaces) {
    const {source, timestamp, edittoken} =
            await WM.MW.callQueryEdit(doubleRedirect.title)
    const doubleRedirectSource = source

    const middleRedirectTitle =
            [namespaces[doubleRedirect.databaseResult.b_namespace]['*'],
              doubleRedirect.databaseResult.b_title].join(':')

    const middleRedirect = await WM.MW.callQuery({
      prop: 'revisions',
      rvprop: 'content',
      titles: middleRedirectTitle,
    })

    const middleRedirectSource = middleRedirect.revisions[0]['*']

    App.log.info(`Processing ${App.log.WikiLink(doubleRedirect.title, doubleRedirect.title)} ...`)

    const rawOldTarget = doubleRedirectSource.match(/\s*#redirect\s*[^\n]+/i)
    const oldTarget = WM.Parser.findInternalLinks(rawOldTarget[0], null)[0]

    const rawMiddleTarget = middleRedirectSource.match(/\s*#redirect\s*[^\n]+/i)
    const middleTarget =
            WM.Parser.findInternalLinks(rawMiddleTarget[0], null)[0]

    const newTargetFragment = (function () {
      if (oldTarget.fragment) {
        return `#${oldTarget.fragment}`
      } else if (middleTarget.fragment) {
        return `#${middleTarget.fragment}`
      }
      return ''
    }())

    const newTargetAltAnchor = (function () {
      if (oldTarget.anchor) {
        return `|${oldTarget.anchor}`
      } else if (middleTarget.anchor) {
        return `|${middleTarget.anchor}`
      }
      return ''
    }())

    const newTargetInterlanguage = doubleRedirect.databaseResult.c_interwiki
      ? `${doubleRedirect.databaseResult.c_interwiki}:` : ''

    const newTargetNamespace = (function () {
      const cns = namespaces[doubleRedirect.databaseResult.c_namespace]['*']
      if (cns) {
        return `${WM.Parser.squashContiguousWhitespace(cns)}:`
      }
      return ''
    }())

    const newTargetTitle = WM.Parser.squashContiguousWhitespace(doubleRedirect.databaseResult.c_title)

    const newTarget = `[[${newTargetInterlanguage}${newTargetNamespace}` +
            `${newTargetTitle}${newTargetFragment}${newTargetAltAnchor}]]`
    const newText = Str.overwriteFor(
      doubleRedirectSource, newTarget,
      oldTarget.index, oldTarget.length
    )

    if (newText !== doubleRedirectSource) {
      const res = await WM.MW.callAPIPost({
        action: 'edit',
        bot: '1',
        title: doubleRedirect.title,
        summary: this.conf.edit_summary,
        text: newText,
        b1asetimestamp: timestamp,
        token: edittoken,
      })

      if (!res.edit || res.edit.result !== 'Success') {
        throw new Error(`${res.error.info} (${res.error.code})`)
      }
    } else {
      return App.log.warning(`Could not fix ${App.log.WikiLink(doubleRedirect.title, doubleRedirect.title)}`)
    }
  }
}
Cls.initClass()
