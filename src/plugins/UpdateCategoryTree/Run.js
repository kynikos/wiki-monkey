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

const WM = require('../../index')
const Str = require('@kynikos/misc/dist/str')


module.exports = class {
  constructor(conf, callNext) {
    this.conf = conf
    return this.iteratePages(-1, callNext)
  }

  iteratePages(pageid, callNext) {
    pageid++
    const summary = this.conf.edit_summary
    const showRootAlsoIn = this.conf.show_root_also_in
    const pconf = this.conf.pages[pageid]
    if (pconf) {
      let params
      if ($.type(pconf) === 'string') {
        params = WM.ArchWiki.getTableOfContents(pconf)
      } else {
        // This should be a custom configuration object
        params = pconf
      }

      return this.readToC({
        params,
        minInterval: WM.MW.isUserBot() ? 60000 : 21600000,
        edittoken: '',
        timestamp: '',
        source: '',
        startId: 0,
        endId: 0,
        treeText: '',
        startMark: 'START AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK-->',
        endMark: '<!--END AUTO TOC - DO NOT REMOVE OR MODIFY THIS MARK',
        altNames: {},
        showRootAlsoIn,
        summary,
        callNext,
        pageid,
      })
    } else if (callNext) {
      return callNext()
    }
  }

  readToC(args) {
    WM.App.log.info(`Updating ${WM.App.log.WikiLink(
      args.params.page,
      args.params.page
    )} ...`)
    return WM.MW.callQueryEdit(
      args.params.page,
      this.processToC,
      args
    )
  }

  processToC(title, source, timestamp, edittoken, args) {
    args.source = source
    args.timestamp = timestamp
    args.edittoken = edittoken

    const now = new Date()
    const msTimestamp = Date.parse(args.timestamp)
    if (now.getTime() - msTimestamp >= args.minInterval) {
      const start = args.source.indexOf(args.startMark)
      const end = args.source.lastIndexOf(args.endMark)

      if (start > -1 && end > -1) {
        args.startId = start + args.startMark.length
        args.endId = end
        args.treeText = ''
        args.altNames = args.params.keepAltName ? this.storeAlternativeNames(args.source) : {}
        return WM.Cat.recurseTree({
          node: args.params.root,
          callNode: this.processCategory,
          callEnd: this.writeToC,
          callArgs: args,
        })
      }
      WM.App.log.error(`Cannot find insertion marks in ${
        WM.App.log.WikiLink(args.params.page, args.params.page)}`)
      return this.iteratePages(args.pageid, args.callNext)
    }
    WM.App.log.warning(`${WM.App.log.WikiLink(
      args.params.page,
      args.params.page
    )} has been updated too recently`)
    return this.iteratePages(args.pageid, args.callNext)
  }

  storeAlternativeNames(source) {
    const dict = {}
    const regExp = /\[\[\:([Cc]ategory\:.+?)\|(.+?)\]\]/gm
    while (true) {
      const match = regExp.exec(source)
      if (match) {
        dict[match[1].toLowerCase()] = match[2]
      } else {
        break
      }
    }
    return dict
  }

  processCategory(params) {
    let node
    const args = params.callArgs

    WM.App.log.info(`Processing ${WM.App.log.WikiLink(
      params.node,
      params.node
    )} ...`)

    let text = ''

    for (let i = 0, end = params.ancestors.length, asc = end >= 0; asc ? i < end : i > end; asc ? i++ : i--) {
      text += args.params.indentType
    }

    if (args.params.showIndices) {
      const indices = []
      node = params
      while (node.parentIndex !== null) {
        indices.push(node.siblingIndex + 1)
        node = params.nodesList[node.parentIndex]
      }
      if (indices.length) {
        text += `<small>${indices.reverse().join('.')}.</small> `
      }
    }

    const altName = args.altNames[params.node.toLowerCase()] ? args.altNames[params.node.toLowerCase()] : null
    text += this.createCatLink(params.node, args.params.replace, altName)

    text += args.params.rightToLeft ? '&lrm; ' : ' '

    if (params.children === 'loop') {
      text += '\'\'\'[LOOP]\'\'\'\n'
      WM.App.log.warning(`Loop in ${WM.App.log.WikiLink(
        params.node,
        params.node
      )}`)
      return this.processCategoryEnd(params, args, text)
    }
    return WM.Cat.getParentsAndInfo(
      params.node,
      this.processCategoryAddSuffix,
      [params, args, text, altName]
    )
  }

  processCategoryAddSuffix(parents, info, args_) {
    const params = args_[0]
    const args = args_[1]
    let text = args_[2]
    let altName = args_[3]

    const currParent = params.ancestors[params.ancestors.length - 1]
    const alsoParents = []
    text += `<small>(${info ? info.pages : 0})`

    // Allow hiding the "also in" (whose currParent is undefined) links for
    // the root item, since the root's parent category would be displayed
    // there
    if (currParent || args.showRootAlsoIn) {
      for (const par of parents) {
        if (currParent !== par.title && !par.includes('hidden')) {
          alsoParents.push(par)
        }
      }

      if (alsoParents.length) {
        const parentTitles = []
        for (const i of alsoParents) {
          altName = args.altNames[alsoParents[i].title.toLowerCase()] ? args.altNames[alsoParents[i].title.toLowerCase()] : null
          parentTitles.push(this.createCatLink(
            alsoParents[i].title,
            args.params.replace, altName
          ))
        }

        text += ` (${args.params.alsoIn} ${
          parentTitles.join(', ')})`
      }
    }

    text += '</small>\n'

    return this.processCategoryEnd(params, args, text)
  }

  processCategoryEnd(params, args, text) {
    args.treeText += text

    params.callArgs = args

    return WM.Cat.recurseTreeContinue(params)
  }

  createCatLink(cat, replace, altName) {
    let catName
    if (altName) {
      catName = altName
    } else if (replace) {
      const regExp = new RegExp(replace[0], replace[1])
      catName = cat.substr(9).replace(regExp, replace[2])
    } else {
      catName = cat.substr(9)
    }
    return `[[:${cat}|${catName}]]`
  }

  writeToC(params) {
    const args = params.callArgs

    args.treeText = `\n${args.treeText}`
    const newtext = Str.overwriteBetween(
      args.source, args.treeText,
      args.startId, args.endId
    )

    if (newtext !== args.source) {
      return WM.MW.callAPIPost(
        {
          action: 'edit',
          bot: '1',
          minor: '1',
          title: args.params.page,
          summary: args.summary,
          text: newtext,
          basetimestamp: args.timestamp,
          token: args.edittoken,
        },
        this.checkWrite,
        args,
        null
      )
    }
    WM.App.log.info(`${WM.App.log.WikiLink(
      args.params.page,
      args.params.page
    )} is already up to date`)

    return this.iteratePages(args.pageid, args.callNext)
  }

  checkWrite(res, args) {
    if (res.edit && res.edit.result === 'Success') {
      WM.App.log.info(`${WM.App.log.WikiLink(
        args.params.page,
        args.params.page
      )} correctly updated`)

      return this.iteratePages(args.pageid, args.callNext)
    }
    return WM.App.log.error(`${WM.App.log.WikiLink(
      args.params.page,
      args.params.page
    )} has not been updated!\n${
      res.error.info} (${res.error.code})`)
  }
}
