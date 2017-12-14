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


class module.exports.Plugin
    # Don't create default objects here, or they'll be shared among the
    # subclasses unless overridden
    # @conf_default: {}
    # @wiki_to_conf_default: {}
    # conf: {}

    @__configure: (wiki_name, user_config) ->
        # Do generate a new object for each plugin
        @::conf = {}

        if @conf_default?
            $.extend(@::conf, @conf_default)

        if @wiki_to_conf_default? and wiki_name of @wiki_to_conf_default
            $.extend(@::conf, @wiki_to_conf_default[wiki_name])

        if @name of user_config
            # Don't just use $.extend() so it's possible to see if there are
            # unknown options and possibly warn the user
            for option, value of user_config[@name] when option of @::conf
                @::conf[option] = value
                delete user_config[@name][option]

        if $.isEmptyObject(user_config[@name])
            delete user_config[@name]

    constructor: (@WM) ->

    main_bot: null
    main_diff: null
    main_editor: null
    main_newpages: null
    main_recentchanges: null
    main_special: null
