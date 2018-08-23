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

{Vue, Vuex} = require('../../../modules/libs')


module.exports.FieldSelect = {
    name: 'FieldSelect'

    computed: {
        Vuex.mapState('bookmarks', [
            'shownFields'
        ])...
    }

    methods: {
        Vuex.mapMutations('bookmarks', [
            'updateShownFields'
        ])...
    }

    render: (h) ->
        return h('div', [h('ElSelect', {
            props: {
                size: 'mini'
                multiple: true
                collapseTags: true
                value: @shownFields
            }
            on: {
                change: (values) =>
                    @updateShownFields(values)
            }
        }, [
            h('ElOption', {
                props: {
                    key: 'url'
                    label: 'url'
                    value: 'url'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgPageName'
                    label: 'wgPageName'
                    value: 'wgPageName'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgRelevantPageName'
                    label: 'wgRelevantPageName'
                    value: 'wgRelevantPageName'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgCanonicalSpecialPageName'
                    label: 'wgCanonicalSpecialPageName'
                    value: 'wgCanonicalSpecialPageName'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgCanonicalNamespace'
                    label: 'wgCanonicalNamespace'
                    value: 'wgCanonicalNamespace'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgTitle'
                    label: 'wgTitle'
                    value: 'wgTitle'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgAction'
                    label: 'wgAction'
                    value: 'wgAction'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgIsArticle'
                    label: 'wgIsArticle'
                    value: 'wgIsArticle'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgIsProbablyEditable'
                    label: 'wgIsProbablyEditable'
                    value: 'wgIsProbablyEditable'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgRelevantPageIsProbablyEditable'
                    label: 'wgRelevantPageIsProbablyEditable'
                    value: 'wgRelevantPageIsProbablyEditable'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgPageContentLanguage'
                    label: 'wgPageContentLanguage'
                    value: 'wgPageContentLanguage'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgPageContentModel'
                    label: 'wgPageContentModel'
                    value: 'wgPageContentModel'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgArticleId'
                    label: 'wgArticleId'
                    value: 'wgArticleId'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgNamespaceNumber'
                    label: 'wgNamespaceNumber'
                    value: 'wgNamespaceNumber'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgRevisionId'
                    label: 'wgRevisionId'
                    value: 'wgRevisionId'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgCurRevisionId'
                    label: 'wgCurRevisionId'
                    value: 'wgCurRevisionId'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgDiffOldId'
                    label: 'wgDiffOldId'
                    value: 'wgDiffOldId'
                }
            })
            h('ElOption', {
                props: {
                    key: 'wgDiffNewId'
                    label: 'wgDiffNewId'
                    value: 'wgDiffNewId'
                }
            })
            h('ElOption', {
                props: {
                    key: 'time_created'
                    label: 'time_created'
                    value: 'time_created'
                }
            })
            h('ElOption', {
                props: {
                    key: 'time_updated'
                    label: 'time_updated'
                    value: 'time_updated'
                }
            })
        ])])
}
