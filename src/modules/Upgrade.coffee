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

{moment, A, Br, Div} = require('./libs')


class module.exports
    VERSION_URL = 'https://raw.githubusercontent.com/kynikos/wiki-monkey/master/VERSION'
    CHECK_INTERVAL = 7

    constructor: (@WM) ->

    check_and_notify: ->
        if @should_check()
            upstream_version = await $.get(VERSION_URL)
            # Well, ok, this is assuming that if the versions are
            # different, upstream has the latest
            if @WM.version != upstream_version
                @display_notification(
                    ["Version #{upstream_version} is available.", Br(),
                     A('Run upgrade', {onclick: =>
                         @upgrade(upstream_version)
                     })]
                )
            else
                mw.storage.set('WikiMonkey-last-update-check',
                               moment().format('YYYY-MM-DD'))

    should_check: ->
        lastupdcheck = mw.storage.get('WikiMonkey-last-update-check')
        if not lastupdcheck
            return true

        diff = moment().diff(moment(lastupdcheck), 'days')
        if diff >= CHECK_INTERVAL
            return true
        return false

    display_notification: (content, type = 'info') ->
        mw.notification.notify(content, {
            autoHide: false
            tag: 'WikiMonkey-upgrade'
            title: 'Wiki Monkey'
            type: type
        })

    upgrade: (upstream_version) ->
        page = "User:#{mw.user.getName()}/common.js"
        pagelink = @WM.MW.linkArticle(page)

        @display_notification("Upgrading to version #{upstream_version}...")

        # TODO: Allow preventing upgrades per-line with //noupgrade comments?
        #       Don't upgrade commented lines?
        regex = new RegExp("([\"']https?://[^/]+/kynikos/wiki-monkey/" +
            "v)#{mw.RegExp.escape(@WM.version)}(/dist/" +
            "WikiMonkey-[^/]+\\.js[\"'])", 'g')

        @WM.MW.api.edit(page, (revision) =>
            newtext = revision.content.replace(regex,
                                               "$1#{upstream_version}$2")

            if newtext is revision.content
                # Executing the query would return a 'nochange:true' result,
                # but we can test it before sending it
                return Promise.reject(
                    new Error("Could not find Wiki Monkey loader line"))

            return {
                text: newtext,
                summary: "Update Wiki Monkey to version #{upstream_version}",
                bot: true,
            }
        ).done((result) =>
            console.log(result)
            @display_notification("Upgrade successful: you need to refresh
                the open wiki page(s) in order to use the new version.")
        ).fail((code, error) =>
            console.error(code, error)
            @display_notification([
                "Could not complete the upgrade to version
                #{upstream_version}: ",
                A({onclick: =>
                    @upgrade(upstream_version)
                }, "retry"),
                " in case it was a temporary problem; it is also possible
                that Wiki Monkey is installed in a non-standard way in ",
                pagelink, " and the upgrade should be executed manually;
                finally, it is possible that the upgrade was already launched
                and completed from another page: in this case refresh the page
                to verify."
            ], 'error')
        )
