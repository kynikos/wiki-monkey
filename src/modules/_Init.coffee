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

# Initialize the libraries immediately (especially babel-polyfill)
require('./libs')

# The ArchPackages module is currently unusable
# ArchPackages = require('./ArchPackages')
ArchWiki = require('./ArchWiki')
Bot = require('./Bot')
Cat = require('./Cat')
Cfg = require('./Cfg')
Diff = require('./Diff')
Editor = require('./Editor')
Filters = require('./Filters')
Interlanguage = require('./Interlanguage')
Log = require('./Log')
Menu = require('./Menu')
Mods = require('./Mods')
MW = require('./MW')
Parser = require('./Parser')
Tables = require('./Tables')
UI = require('./UI')
Upgrade = require('./Upgrade')
WhatLinksHere = require('./WhatLinksHere')


class module.exports
    # The build script updates the version number
    VERSION = '4.0.0'

    constructor: (default_config, installed_plugins) ->
        @version = VERSION
        mw.loader.using(['mediawiki.api.edit',
                         'mediawiki.notification']).done( =>
            $( => @_onready(default_config, installed_plugins))
        )

    _onready: (default_config, installed_plugins) =>
        # The ArchPackages module is currently unusable
        # @ArchPackages = new ArchPackages(this)
        @ArchWiki = new ArchWiki(this)
        @Bot = new Bot(this)
        @Cat = new Cat(this)
        @Cfg = new Cfg(this)
        @Diff = new Diff(this)
        @Editor = new Editor(this)
        @Filters = new Filters(this)
        @Interlanguage = new Interlanguage(this)
        @Log = new Log(this)
        @Menu = new Menu(this)
        @Mods = new Mods(this)
        @MW = new MW(this)
        @Parser = new Parser(this)
        @Tables = new Tables(this)
        @UI = new UI(this)
        @Upgrade = new Upgrade(this)
        @WhatLinksHere = new WhatLinksHere(this)

        @Plugins = {}

        for pname, Plugin of installed_plugins
            @Plugins[pname] = new Plugin(this)

        @Upgrade.check_and_notify()
        @Cfg._load(default_config)
        @UI._makeUI()
