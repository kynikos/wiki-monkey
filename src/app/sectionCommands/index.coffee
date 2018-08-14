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

WM = require('../../modules')
{Vue, Vuex, styled} = require('../../modules/libs')
store = require('../store')


module.exports.SectionCommands = (editsections) ->
    for editsection in editsections
        SectionCommands_(editsection)


SectionCommands_ = (editsection) ->
    root = document.createElement('span')
    $(editsection).children().first().after(' ', root, ' | ')
    $(editsection).children().last().before(' ')
    section = $(editsection).closest(':header')
    headline = section.find('.mw-headline')
    sectionLink = WM.Parser.squashContiguousWhitespace(
        "[[##{headline[0].id}]]"
    )
    articleLink = WM.Parser.squashContiguousWhitespace(
        "[[#{mw.config.get('wgPageName')}##{headline[0].id}]]"
    )

    new Vue({
        el: root

        store: store

        render: (h) ->
            h('span', [
                h('a', {
                    attrs: {
                        href: '#scroll-to-top'
                        title: 'Scroll to the top of the page'
                    }
                    on: {
                        click: (event) ->
                            event.preventDefault()
                            window.scrollTo(0, 0)
                    }
                }, ['∧'])
                ' | '
                h('a', {
                    attrs: {
                        href: "##{headline[0].id}"
                        title: 'Link to this section'
                    }
                }, ['§'])
                ' | '
                h('a', {
                    attrs: {
                        href: "#copy-article-wiki-link"
                        title: "Copy \"#{articleLink}\" to the clipboard"
                        'data-clipboard-text': articleLink
                    }
                    on: {
                        click: (event) ->
                            event.preventDefault()
                    }
                    ref: 'copyArticleWikiLink'
                }, ['c'])
                ' | '
                h('a', {
                    attrs: {
                        href: "#copy-section-wiki-link"
                        title: "Copy \"#{sectionLink}\" to the clipboard"
                        'data-clipboard-text': sectionLink
                    }
                    on: {
                        click: (event) ->
                            event.preventDefault()
                    }
                    ref: 'copySectionWikiLink'
                }, ['c#'])
            ])

        mounted: ->
            WM.Clipboard.enable(@$refs.copyArticleWikiLink)
            WM.Clipboard.enable(@$refs.copySectionWikiLink)
    })
