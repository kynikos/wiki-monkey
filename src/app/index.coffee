
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

WM = require('../modules')
{moment} = require('../modules/libs')
{version} = require('../../package.json')

store = require('./store')
{WikiLink} = require('./_components/log/WikiLink')
{PageLink} = require('./_components/log/PageLink')
mods = require('./mods')

{PageCommands} = require('./pageCommands')
{SectionCommands} = require('./sectionCommands')
Main = require('./main')
Bot = require('./bot')
Filter = require('./filter')
Menu = require('./menu')

module.exports.log = log = {
    hidden: (text) ->
        store.commit('log/hidden', text)

    json: (component, data) ->
        store.commit('log/json', [component, data])

    debug: (text) ->
        store.commit('log/debug', text)

    info: (text) ->
        store.commit('log/info', text)

    warning: (text) ->
        store.commit('log/warning', text)

    error: (text) ->
        store.commit('log/error', text)

    WikiLink
    PageLink
}


module.exports.App = ->
    if bodyContent = $('#bodyContent')
        Main(bodyContent)

    if indicators = $('.mw-indicators:first')
        PageCommands(indicators)

    editSections = $('.mw-editsection')
    if editSections.length
        SectionCommands(editSections)

    # MW seems a bit unreliable with capitalization, e.g. it's
    # "SpecialPages" but "Recentchanges"
    specialPage = do ->
        spage = mw.config.get('wgCanonicalSpecialPageName')
        if spage
            return spage.toLowerCase()
        return spage

    # TODO: Recognize the editor with mw.config.get('wgAction')?
    if $('#editform').length
        conf = WM.Plugins.editor
        if conf.length
            Menu({
                pageType: 'editor'
                plugins: conf
                display: true
                displayLog: true
                nextNode: $('#wpSummaryLabel').parent().next()[0]
            })
        mods.modEditor()

    else if mw.config.get('wgDiffNewId')
        conf = WM.Plugins.diff
        if conf.length
            Menu({
                pageType: 'diff'
                plugins: conf
                display: true
                displayLog: true
                nextNode: $('#bodyContent h2').first()[0]
            })

    else if mw.config.get('wgCanonicalNamespace') is 'Category'
        conf = WM.Plugins.bot
        if conf.length
            Bot({
                functions: conf
                lists: [
                    [$('#mw-pages')[0], 0, "Pages"]
                    [$('#mw-subcategories')[0], 0, "Subcategories"]
                ]
                display: false
                displayLog: true
                nextNode: $('#contentSub')[0]
            })

    else if specialPage is "whatlinkshere"
        conf = WM.Plugins.bot
        if conf.length
            Bot({
                functions: conf
                lists: [
                    [$('#mw-whatlinkshere-list')[0], 0, "Pages"]
                ]
                display: false
                displayLog: true
                nextNode: $('#bodyContent form').first().next()[0]
            })

    else if specialPage is "linksearch" and
            $('#mw-content-text div.mw-spcontent').length
        conf = WM.Plugins.bot
        if conf.length
            nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
            Bot({
                functions: conf
                lists: [
                    [$(nextNode).first('ol.special').first()[0], 1, "Pages"]
                ]
                display: false
                displayLog: true
                nextNode
            })

    else if specialPage is "prefixindex"
        conf = WM.Plugins.bot
        if conf.length
            nextNode = $('#mw-content-text div.mw-prefixindex-body').first()[0]
            Bot({
                function: conf
                lists: [
                    [
                        $(nextNode).find('ul.mw-prefixindex-list').first()[0]
                        0
                        "Pages"
                    ]
                ]
                display: false
                displayLog: true
                nextNode
            })

    else if specialPage is "specialpages"
        conf = WM.Plugins.special
        if conf.length
            Menu({
                pageType: 'special'
                plugins: conf
                display: true
                displayLog: true
                nextNode: $('#contentSub')[0]
            })

    else if specialPage is "recentchanges"
        conf = WM.Plugins.recentchanges
        if conf.length
            Filter({
                pageType: 'recentchanges'
                Plugins: conf
                display: true
                displayLog: false
                nextNode: $('#mw-content-text h4').first()[0]
            })
        mods.modRecentChanges()

    else if specialPage is "newpages"
        conf = WM.Plugins.newpages
        if conf.length
            Filter({
                pageType: 'newpages'
                Plugins: conf
                display: true
                displayLog: false
                nextNode: $('#mw-content-text ul').first()[0]
            })

    else if specialPage is "protectedpages"
        conf = WM.Plugins.bot
        if conf.length
            nextNode = $('#mw-content-text table.mw-protectedpages').first()[0]
            Bot({
                functions: conf
                lists: [
                    [$(nextNode).find('tbody').first()[0], 0, "Pages"]
                ]
                display: false
                displayLog: true
                nextNode
            })

    else if specialPage is "contributions"
        mods.modContributions()

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
        conf = WM.Plugins.bot
        if conf.length
            nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
            Bot({
                functions: conf
                lists: [
                    [$(nextNode).find('ol').first()[0], 0, "Pages"]
                ]
                display: false
                displayLog: true
                nextNode
            })

    else if specialPage in [
        "longpages"
        "shortpages"
    ]
        conf = WM.Plugins.bot
        if conf.length
            nextNode = $('#mw-content-text div.mw-spcontent').first()[0]
            Bot({
                functions: conf
                lists: [
                    [$(nextNode).find('ol').first()[0], 1, "Pages"]
                ]
                display: false
                displayLog: true
                nextNode
            })

    else if specialPage is "withoutinterwiki"
        conf = WM.Plugins.bot
        if conf.length
            nextNode = $('#mw-content-text div.mw-spcontent > p').first()[0]
            Bot({
                functions: conf
                lists: [
                    [$(nextNode).nextAll('ol').first()[0], 0, "Pages"]
                ]
                display: false
                displayLog: true
                nextNode
            })

    else if specialPage is "allpages"
        conf = WM.Plugins.bot
        if conf.length
            nextNode = $('#mw-content-text div.mw-allpages-nav').first()[0]
            Bot({
                functions: conf
                lists: [
                    [$(nextNode).nextAll('div.mw-allpages-body').first()
                        .find('ul').first()[0]
                     0, "Pages"]
                ]
                display: false
                displayLog: true
                nextNode
            })

    log.hidden("Wiki Monkey version: #{version}")
    log.hidden("Date: #{moment().format('YYYY-MM-DD Z')}")
    log.hidden("URL: #{location.href}")
