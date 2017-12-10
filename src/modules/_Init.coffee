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


class WM
    # The build script updates the version number
    VERSION = '4.0.0'
    MW_MODULES = ['mediawiki.api.edit',
                  'mediawiki.notification']

    constructor: ->
        @version = VERSION

    setup: (default_config, installed_plugins) =>
        @Cfg = new Cfg(this, default_config, installed_plugins)

    init: (user_config) =>
        @Cfg.load(user_config)

        await $.when(mw.loader.using(MW_MODULES), $.ready)

        # The ArchPackages module is currently unusable
        # @ArchPackages = new ArchPackages(this)
        @ArchWiki = new ArchWiki(this)
        @Bot = new Bot(this)
        @Cat = new Cat(this)
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

        for pname, Plugin of @Cfg.installed_plugins
            @Plugins[pname] = new Plugin(this)

        @Upgrade.check_and_notify()
        @UI._makeUI()


wm = new WM()
module.exports = wm.setup
window.wikimonkey = wm.init
