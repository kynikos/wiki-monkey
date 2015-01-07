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

    this._makeUI = function () {
        /*
         * Creating the preferences interface shouldn't rely on the saved
         * configuration, in order to always make it possible to fix a
         * misconfiguration
         */
        Alib.CSS.addStyleElement("#WikiMonkey-prefsection textarea {" +
                                                            "height:30em;} " +
            "#WikiMonkey-prefsection div, #WikiMonkey-prefsection p " +
                            "{display:inline-block; margin-bottom:0.5em;} " +
            "#WikiMonkey-prefsection input {margin-right:0.5em;}" +
            "#WikiMonkey-prefsection input[value='Save'] {font-weight:bold;}");

        var toc = $("#preftoc");
        var tlinks = toc.find("a").click(WM.Cfg._hideEditor);

        var link = $("<a/>")
            .attr({"id": "WikiMonkey-preftab", "href": "#wiki-monkey"})
            .text("Wiki Monkey")
            .click(WM.Cfg._showEditor);

        $("<li/>").appendTo(toc).append(link);

        var editor = $("<fieldset/>")
                        .addClass("prefsection")
                        .attr("id", "WikiMonkey-prefsection")
                        .hide();
        $("<legend/>")
            .addClass("mainLegend")
            .text("Wiki Monkey")
            .appendTo(editor);

        var bdiv = $("<div/>");
        $("<input/>")
            .attr("type", "button")
            .val("Save").click(saveEditor)
            .appendTo(bdiv);
        $("<input/>")
            .attr("type", "button")
            .val("Reset")
            .click(resetEditor)
            .appendTo(bdiv);
        $("<input/>")
            .attr("type", "button")
            .val("Defaults")
            .click(requestDefaults)
            .appendTo(bdiv);
        editor.append(bdiv);

        var help = $("<a/>")
            .attr("href", "https://github.com/kynikos/wiki-monkey/wiki")
            .text("[help]");

        $("<p/>")
            .text("All pages running Wiki Monkey need to be refreshed " +
                                        "for saved changes to take effect. ")
            .append(help).appendTo(editor);

        $("<textarea/>").attr("id", "WikiMonkey-editor").appendTo(editor);
        $("#preferences").children("fieldset").last().after(editor);

        resetEditor();

        if (location.hash == "#wiki-monkey") {
            WM.Cfg._showEditor();
        }
    };

    this._showEditor = function () {
        var tab = $("#WikiMonkey-preftab").parent();
        tab.siblings(".selected").removeClass("selected");
        tab.addClass("selected");

        var editor = $("#WikiMonkey-prefsection");
        editor.siblings("fieldset").hide();
        editor.show();

        editor.siblings(".mw-prefs-buttons").hide();
    };

    this._hideEditor = function () {
        $("#WikiMonkey-preftab").parent().removeClass("selected");

        var editor = $("#WikiMonkey-prefsection");
        editor.hide()
        editor.siblings(".mw-prefs-buttons").show();
    };

    var config = {};

    var DEFAULTS_REQUEST = "WARNING: If you click on the \"Save\" button " +
        "now, the saved configuration will be reset to the default values " +
        "at the next refresh!\nTo cancel this request, simply click on the " +
        "\"Reset\" button.";

    this._load = function(defaultConfig) {
        // Upper-scope config
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

    var saveEditor = function () {
        var text = $("#WikiMonkey-editor").val();

        try {
            // Upper-scope config
            config = JSON.parse(text)
        }
        catch (err) {
            if (text == DEFAULTS_REQUEST) {
                /*
                 * Setting config to {} will make it be completely overridden
                 * when the configuration is reloaded at the next refresh
                 */
                // Upper-scope config
                config = {};
                $("#WikiMonkey-editor").val("The configuration has been " +
                    "reset to the default values and will be available " +
                    "after refreshing the page.");
            }
            else {
                alert("Not a valid JSON object, the configuration has not " +
                                                                "been saved.");
                return false;
            }
        }

        WM.Cfg.save();
    };

    var resetEditor = function () {
        $("#WikiMonkey-editor").val(JSON.stringify(config, undefined, 4));
    };

    var requestDefaults = function () {
        $("#WikiMonkey-editor").val(DEFAULTS_REQUEST);
    };
};
