# Wiki Monkey - MediaWiki bot and editor-assistant user script
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

WM = require('./index')
App = require('../app')

# References:
# - https://wiki.archlinux.org/index.php/Official_Repositories_Web_Interface
# - https://wiki.archlinux.org/index.php/AurJson


class module.exports
    # TODO: Module disabled because it's no longer possible to get around the
    #       same-origin policy
    #       Perhaps ask the Arch devs if it's possible to enable CORS requests
    #       on the archlinux.org websites

    constructor: ->

    searchOfficialPackagesByExactName: (name, call, callArgs) ->
        url = "https://www.archlinux.org/packages/search/json/"
        $.get(
            url: url
            data:
                name: name
        ).done((data, textStatus, jqXHR) ->
            if not data instanceof Object
                App.log.error("The Official Repositories web
                                 interface returned an unexpected object")

            if data
                call(data, callArgs)
        ).fail((jqXHR, textStatus, errorThrown) ->
            App.log.error(WM.MW.failedQueryError(url))
        )

    isOfficialPackage: (pkg, call, callArgs) ->
        call2 = (res, args) ->
            if res.results.length
                call(true, args)
            else
                call(false, args)

        WM.ArchPackages.searchOfficialPackagesByExactName(pkg, call2,
                                                                    callArgs)

    getAURInfo: (arg, call, callArgs) ->
        # arg can be either an exact package name (string) or an ID (integer)
        url = "https://aur.archlinux.org/rpc.php"
        $.get(
            url: url
            data:
                type: "info"
                arg: arg
        ).done((data, textStatus, jqXHR) =>
            if not data instanceof Object
                App.log.error("The AUR's RPC interface returned an
                                                    unexpected object")

            if data
                call(data, callArgs)
        ).fail((jqXHR, textStatus, errorThrown) =>
            App.log.error(WM.MW.failedQueryError(url))
        )

    isAURPackage: (pkg, call, callArgs) ->
        call2 = (res, args) ->
            if res.type == "error"
                App.log.error("The AUR's RPC interface returned an error: " +
                                                                res.results)
            else
                if res.resultcount > 0
                    call(true, args)
                else
                    call(false, args)

        WM.ArchPackages.getAURInfo(pkg, call2, callArgs)

    isPackageGroup = (arch, grp, call, callArgs) ->
        url = "https://www.archlinux.org/groups/" +
            encodeURIComponent(arch) + "/" + encodeURIComponent(grp)
        $.get(
            url: url
        ).done((data, textStatus, jqXHR) =>
            # Cannot use the DOMParser because GreaseMonkey doesn't
            # support XrayWrapper well
            # See http://www.oreillynet.com/pub/a/network/2005/11/01/avoid-common-greasemonkey-pitfalls.html?page=3
            # and https://developer.mozilla.org/en/docs/XPConnect_wrappers#XPCNativeWrapper_%28XrayWrapper%29
            escgrp = mw.RegExp.escape(grp)
            escarch = mw.RegExp.escape(arch)

            regExp = new RegExp("<h2>\\s*Group Details -\\s*" +
                        escgrp + "\\s*\\(" + escarch + "\\)\\s*</h2>", "")

            if data.search(regExp) > -1
                call(true, callArgs)
            else
                call(false, callArgs)
        ).fail((jqXHR, textStatus, errorThrown) =>
            if jqXHR.status is 404
                call(false, callArgs)
            else
                App.log.error(WM.MW.failedQueryError(url))
        )

    isPackageGroup64: (grp, call, callArgs) ->
        isPackageGroup('x86_64', grp, call, callArgs)

    isPackageGroup32: (grp, call, callArgs) ->
        isPackageGroup('i686', grp, call, callArgs)
