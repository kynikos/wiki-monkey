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

ArchPackages_ = require('./ArchPackages').ArchPackages
ArchWiki_ = require('./ArchWiki').ArchWiki
Bot_ = require('./Bot').Bot
Cat_ = require('./Cat').Cat
Cfg_ = require('./Cfg').Cfg
Diff_ = require('./Diff').Diff
Editor_ = require('./Editor').Editor
Filters_ = require('./Filters').Filters
Interlanguage_ = require('./Interlanguage').Interlanguage
Log_ = require('./Log').Log
Menu_ = require('./Menu').Menu
Mods_ = require('./Mods').Mods
MW_ = require('./MW').MW
Parser_ = require('./Parser').Parser
Tables_ = require('./Tables').Tables
UI_ = require('./UI').UI
WhatLinksHere_ = require('./WhatLinksHere').WhatLinksHere


class module.exports.WM
    constructor: (installedPlugins...) ->
        @ArchPackages = new ArchPackages_(this)
        @ArchWiki = new ArchWiki_(this)
        @Bot = new Bot_(this)
        @Cat = new Cat_(this)
        @Cfg = new Cfg_(this)
        @Diff = new Diff_(this)
        @Editor = new Editor_(this)
        @Filters = new Filters_(this)
        @Interlanguage = new Interlanguage_(this)
        @Log = new Log_(this)
        @Menu = new Menu_(this)
        @Mods = new Mods_(this)
        @MW = new MW_(this)
        @Parser = new Parser_(this)
        @Tables = new Tables_(this)
        @UI = new UI_(this)
        @WhatLinksHere = new WhatLinksHere_(this)

        @Plugins = {}

        for [pname, Plugin] in installedPlugins
            @Plugins[pname] = new Plugin(this)

    main: (defaultConfig) ->
        @Cfg._load(defaultConfig)
        @UI._makeUI()
