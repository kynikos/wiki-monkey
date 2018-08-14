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


module.exports.PageCommands = (container) ->
    # Add as a "page status indicator"
    # https://www.mediawiki.org/wiki/Help:Page_status_indicators

    root = document.createElement('div')
    $(container).prepend(root)
    articleLink = WM.Parser.squashContiguousWhitespace(
        "[[#{mw.config.get('wgPageName')}]]"
    )

    new Vue({
        el: root

        store: store

        computed: {
            Vuex.mapState('main', {
                mainIsShown: 'shown'
            })...
        }

        methods: {
            Vuex.mapActions('main', {
                toggleMain: 'toggleAlone'
            })...
        }

        render: (h) ->
            h('div', {
                class: {'mw-indicator': true}
            }, [
                '[ '
                h('a', {
                    attrs: {
                        href: '#wiki-monkey'
                        title: "#{@mainIsShown and 'Close' or 'Open'} the main
                            Wiki Monkey interface"
                    }
                    on: {
                        click: (event) =>
                            event.preventDefault()
                            @toggleMain()
                    }
                }, ['WM'])
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
                ' ]'
            ])

        mounted: ->
            WM.Clipboard.enable(@$refs.copyArticleWikiLink)
    })
