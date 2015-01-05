/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2014 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.Cfg = new function () {
    "use strict";

    var config = {};

    this._load = function(defaultConfig) {
        config = defaultConfig;

        var savedConfig = JSON.parse(localStorage.getItem("WikiMonkey"));

        if (savedConfig) {
            $.extend(true, config, savedConfig);
        }
        else {
            this.save();
        }
    };

    this._getEditor = function(key) {
        return config["Editor"];
    };

    this._getDiff = function(key) {
        return config["Diff"];
    };

    this._getBot = function(key) {
        return config["Bot"];
    };

    this._getSpecial = function(key) {
        return config["Special"];
    };

    this._getRecentChanges = function(key) {
        return config["RecentChanges"];
    };

    this._getNewPages = function(key) {
        return config["NewPages"];
    };

    this.save = function() {
        localStorage.setItem("WikiMonkey", JSON.stringify(config));
    };
};
