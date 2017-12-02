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

CSS = require('../../lib.js.generic/dist/CSS')


class module.exports.Mods
    constructor: (@WM) ->

    changeHeadingNumberStyle = (style) ->
        CSS.addStyleElement("span.mw-headline-number {" + style + "}")

    disableEditSummarySubmitOnEnter = ->
        $('#wpSummary').keydown( (event) ->
            # 'keyCode' is deprecated, but not all browsers support 'key' yet
            if event.key == 'Enter' or (typeof event.key == 'undefined' and
                                                        event.keyCode == 13)
                event.preventDefault()
                return false
        )

    hideRollbackLinks = ->
        CSS.addStyleElement("span.mw-rollback-link {display:none;}")

    scrollToFirstHeading = ->
        window.scrollTo(0, $('#firstHeading').offset().top)

    applyGeneralMods: ->
        conf = @WM.Cfg._getGeneralMods()
        if conf['heading_number_style']
            changeHeadingNumberStyle(conf['heading_number_style'])

    applyEditorMods: ->
        conf = @WM.Cfg._getEditorMods()
        if conf['disable_edit_summary_submit_on_enter']
            disableEditSummarySubmitOnEnter()
        if conf['scroll_to_first_heading']
            scrollToFirstHeading()

    applyRecentChangesMods: ->
        conf = @WM.Cfg._getRecentChangesMods()
        if conf['hide_rollback_links']
            hideRollbackLinks()

    applyContributionsMods: ->
        conf = @WM.Cfg._getContributionsMods()
        if conf['hide_rollback_links']
            hideRollbackLinks()
