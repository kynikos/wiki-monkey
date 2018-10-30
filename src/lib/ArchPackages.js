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

// References:
// - https://wiki.archlinux.org/index.php/Official_Repositories_Web_Interface
// - https://wiki.archlinux.org/index.php/AurJson


module.exports = class ArchPackages {
  isPackageGroup = function (arch, grp, call, callArgs) { // eslint-disable-line max-params
    const url = `https://www.archlinux.org/groups/${
      encodeURIComponent(arch)}/${encodeURIComponent(grp)}`
    return $.get({
      url,
    }).done((data, textStatus, jqXHR) => {
      // Cannot use the DOMParser because GreaseMonkey doesn't
      // support XrayWrapper well
      // See http://www.oreillynet.com/pub/a/network/2005/11/01/avoid-common-greasemonkey-pitfalls.html?page=3
      // and https://developer.mozilla.org/en/docs/XPConnect_wrappers#XPCNativeWrapper_%28XrayWrapper%29
      const escgrp = mw.RegExp.escape(grp)
      const escarch = mw.RegExp.escape(arch)

      const regExp = new RegExp(`<h2>\\s*Group Details -\\s*${
        escgrp}\\s*\\(${escarch}\\)\\s*</h2>`, '')

      if (data.search(regExp) > -1) {
        return call(true, callArgs)
      }
      return call(false, callArgs)
    }).fail((jqXHR, textStatus, errorThrown) => {
      if (jqXHR.status === 404) {
        return call(false, callArgs)
      }
      return WM.App.log.error(WM.MW.failedQueryError(url))
    })
  }

  // TODO: Module disabled because it's no longer possible to get around the
  //       same-origin policy
  //       Perhaps ask the Arch devs if it's possible to enable CORS requests
  //       on the archlinux.org websites

  constructor() {}

  searchOfficialPackagesByExactName(name, call, callArgs) {
    const url = 'https://www.archlinux.org/packages/search/json/'
    return $.get({
      url,
      data: {
        name,
      },
    }).done((data, textStatus, jqXHR) => {
      if (!(data instanceof Object)) {
        WM.App.log.error('The Official Repositories web \
interface returned an unexpected object')
      }

      if (data) {
        return call(data, callArgs)
      }
    }).fail((jqXHR, textStatus, errorThrown) => WM.App.log.error(WM.MW.failedQueryError(url)))
  }

  isOfficialPackage(pkg, call, callArgs) {
    const call2 = function (res, args) {
      if (res.results.length) {
        return call(true, args)
      }
      return call(false, args)
    }

    return WM.ArchPackages.searchOfficialPackagesByExactName(
      pkg, call2,
      callArgs
    )
  }

  getAURInfo(arg, call, callArgs) {
    // Arg can be either an exact package name (string) or an ID (integer)
    const url = 'https://aur.archlinux.org/rpc.php'
    return $.get({
      url,
      data: {
        type: 'info',
        arg,
      },
    }).done((data, textStatus, jqXHR) => {
      if (!(data instanceof Object)) {
        WM.App.log.error('The AUR\'s RPC interface returned an \
unexpected object')
      }

      if (data) {
        return call(data, callArgs)
      }
    }).fail((jqXHR, textStatus, errorThrown) => {
      return WM.App.log.error(WM.MW.failedQueryError(url))
    })
  }

  isAURPackage(pkg, call, callArgs) {
    const call2 = function (res, args) {
      if (res.type === 'error') {
        return WM.App.log.error(`The AUR's RPC interface returned an error: ${
          res.results}`)
      }
      if (res.resultcount > 0) {
        return call(true, args)
      }
      return call(false, args)
    }

    return WM.ArchPackages.getAURInfo(pkg, call2, callArgs)
  }

  isPackageGroup64(grp, call, callArgs) {
    return isPackageGroup('x86_64', grp, call, callArgs)
  }

  isPackageGroup32(grp, call, callArgs) {
    return isPackageGroup('i686', grp, call, callArgs)
  }
}
