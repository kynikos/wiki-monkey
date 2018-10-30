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

const Async = require('@kynikos/misc/dist/async')
const WM = require('../index')


module.exports = class exports {
  constructor() {}

  recurseTree(params) {
    params.callChildren = this._recurseTreeCallChildren
    return Async.recurseTreeAsync(params)
  }

  recurseTreeContinue(params) {
    return Async.recurseTreeAsync(params)
  }

  _recurseTreeCallChildren(params) {
    return this.getSubCategories(
      params.node,
      this._recurseTreeCallChildrenContinue, params
    )
  }

  _recurseTreeCallChildrenContinue(subCats, params) {
    for (const subCat of subCats) {
      params.children.push(subCat.title)
    }
    return Async.recurseTreeAsync(params)
  }

  getSubCategories(parent, call, callArgs) {
    return this._getMembers(parent, 'subcat', call, callArgs)
  }

  getAllMembers(parent, call, callArgs) {
    return this._getMembers(parent, null, call, callArgs)
  }

  _getMembers(name, cmtype, call, callArgs) {
    const query = {
      action: 'query',
      list: 'categorymembers',
      cmtitle: name,
      cmlimit: 500,
    }

    if (cmtype) {
      query.cmtype = cmtype
    }

    return this._getMembersContinue(query, call, callArgs, [])
  }

  _getMembersContinue(query, call, callArgs, members) {
    return WM.MW.callAPIGet(
      query, function (res, args) {
        members = members.concat(res.query.categorymembers)
        if (res['query-continue']) {
          query.cmcontinue = res['query-continue']
            .categorymembers.cmcontinue
          return this._getMembersContinue(query, call, args, members)
        }
        return call(members, args)
      }
      ,
      callArgs, null
    )
  }

  getParentsAndInfo(name, call, callArgs) {
    const query = {
      action: 'query',
      prop: 'categories|categoryinfo',
      titles: name,
      clprop: 'hidden',
      cllimit: 500,
    }

    return this._getParentsAndInfoContinue(query, call, callArgs, [], null)
  }

  _getParentsAndInfoContinue(query, call, callArgs, parents, info) {
    return WM.MW.callAPIGet(
      query, function (res, args) {
        const page = Object.values(res.query.pages)[0]

        if (page.categories) {
          parents = parents.concat(page.categories)
        }

        if (page.categoryinfo) {
          info = page.categoryinfo
        }

        if (res['query-continue']) {
          // Request categoryinfo only once
          query.prop = 'categories'
          query.clcontinue = res['query-continue'].categories.clcontinue
          return this._getParentsAndInfoContinue(
            query, call, args, parents,
            info
          )
        }
        return call(parents, info, args)
      }
      ,
      callArgs, null
    )
  }
}
