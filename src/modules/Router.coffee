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


class module.exports
    constructor: (@WM) ->

    route: ->
        # MW seems a bit unreliable with capitalization, e.g. it's
        # "SpecialPages" but "Recentchanges"
        specialPage = do ->
            spage = mw.config.get('wgCanonicalSpecialPageName')
            if spage
                return spage.toLowerCase()
            return spage

        display = true
        displayLog = true

        # TODO: Recognize the editor with mw.config.get('wgAction')?
        if $('#editform').length
            nextNode = $('#wpSummaryLabel').parent().next()[0]
            conf = @WM.Plugins.editor
            UI = if conf.length then @WM.Menu._makeUI('editor', conf) else null
            @WM.Mods.applyEditorMods()

        else if mw.config.get('wgDiffNewId')
            nextNode = $('#bodyContent h2').first()[0]
            conf = @WM.Plugins.diff
            UI = if conf.length then @WM.Menu._makeUI('diff', conf) else null

        else if mw.config.get('wgCanonicalNamespace') is 'Category'
            nextNode = $('#contentSub')[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$('#mw-pages')[0], 0, "Pages"]
                    [$('#mw-subcategories')[0], 0, "Subcategories"]
                ]) else null
            display = false

        else if specialPage is "whatlinkshere"
            nextNode = $('#bodyContent form').first().next()[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$('#mw-whatlinkshere-list')[0], 0, "Pages"]
                ]) else null
            display = false

        else if specialPage is "linksearch" and
                $('#mw-content-text div.mw-spcontent').length
            nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$(nextNode).first('ol.special').first()[0], 1, "Pages"]
                ]) else null
            display = false

        else if specialPage is "prefixindex"
            nextNode = $('#mw-content-text div.mw-prefixindex-body').first()[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$(nextNode).find('ul.mw-prefixindex-list').first()[0]
                     0, "Pages"]
                ]) else null
            display = false

        else if specialPage is "specialpages"
            nextNode = $('#contentSub')[0]
            conf = @WM.Plugins.special
            UI = if conf.length \
                then @WM.Menu._makeUI('special', conf) else null

        else if specialPage is "recentchanges"
            nextNode = $('#mw-content-text h4').first()[0]
            conf = @WM.Plugins.recentchanges
            UI = if conf.length \
                then @WM.Filters._makeUI('recentchanges', conf) \
                else null
            displayLog = false
            @WM.Mods.applyRecentChangesMods()

        else if specialPage is "newpages"
            nextNode = $('#mw-content-text ul').first()[0]
            conf = @WM.Plugins.newpages
            UI = if conf.length \
                then @WM.Filters._makeUI('newpages', conf) else null
            displayLog = false

        else if specialPage is "protectedpages"
            nextNode = $('#mw-content-text table.mw-protectedpages').first()[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$(nextNode).find('tbody').first()[0], 0, "Pages"]
                ]) else null
            display = false

        else if specialPage is "contributions"
            @WM.Mods.applyContributionsMods()

        else if specialPage in [
            "ancientpages"
            "brokenredirects"
            "deadendpages"
            "doubleredirects"
            "fewestrevisions"
            "lonelypages"
            "uncategorizedcategories"
            "uncategorizedpages"
            "uncategorizedtemplates"
            "unusedcategories"
            "unwatchedpages"
        ]
            nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$(nextNode).find('ol').first()[0], 0, "Pages"]
                ]) else null
            display = false

        else if specialPage in [
            "longpages"
            "shortpages"
        ]
            nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$(nextNode).find('ol').first()[0], 1, "Pages"]
                ]) else null
            display = false

        else if specialPage is "withoutinterwiki"
            nextNode = $('#mw-content-text div.mw-spcontent > p').first()[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$(nextNode).nextAll('ol').first()[0], 0, "Pages"]
                ]) else null
            display = false

        else if specialPage is "allpages"
            nextNode = $('#mw-content-text div.mw-allpages-nav').first()[0]
            conf = @WM.Plugins.bot
            UI = if conf.length \
                then @WM.Bot._makeUI(conf, [
                    [$(nextNode).nextAll('div.mw-allpages-body').first()
                        .find('ul').first()[0]
                     0, "Pages"]
                ]) else null
            display = false

        if UI
            @WM.UI._makeUI({display, displayLog, nextNode, UI})
