# Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
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

$ = require('jquery')
CSS = require('../../lib.js.generic/dist/CSS')
DOM = require('../../lib.js.generic/dist/DOM')


class module.exports.Cfg
    DEFAULTS_REQUEST = "WARNING: If you click on the \"Save\" button
    now, the saved configuration will be reset to the default values
    at the next refresh!\nTo cancel this request, simply click on the
    \"Reset\" button."

    constructor: (@WM) ->
        @config = {}

    _makeUI: ->
        # We have to wait until #preftoc exists, because it's generated
        # dynamically by a MediaWiki script, hence racing with Wiki Monkey
        DOM.waitUntilJQuerySelectorMatches('#preftoc', @_doMakeUI, [],
                                                500)

    _doMakeUI: =>
        # Creating the preferences interface shouldn't rely on the saved
        # configuration, in order to always make it possible to fix a
        # misconfiguration
        CSS.addStyleElement("#WikiMonkey-prefsection textarea {
                                                            height:30em;}
            #WikiMonkey-prefsection div, #WikiMonkey-prefsection p.message
                            {display:inline-block; margin-bottom:0.5em;}
            #WikiMonkey-prefsection input {margin-right:0.5em;}
            #WikiMonkey-prefsection input[value='Save'] {font-weight:bold;}")

        toc = $("#preftoc")

        toc.find("a").click(@_hideEditor)

        link = $("<a/>")
            .attr({
                "id": "WikiMonkey-preftab",
                "href": "#wiki-monkey",
                "role": "tab",
                "aria-controls": "WikiMonkey-config",
                "tabindex": "-1",
                "aria-selected": "false"
            })
            .text("Wiki Monkey")
            .click(@_showEditor)

        $("<li/>").appendTo(toc).append(link)

        editor = $("<fieldset/>")
            .addClass("prefsection")
            .attr("id", "WikiMonkey-prefsection")
            .hide()
        $("<legend/>")
            .addClass("mainLegend")
            .text("Wiki Monkey")
            .appendTo(editor)

        bdiv = $("<div/>")
        $("<input/>")
            .attr("type", "button")
            .val("Save").click(@saveEditor)
            .appendTo(bdiv)
        $("<input/>")
            .attr("type", "button")
            .val("Reset")
            .click(@resetEditor)
            .appendTo(bdiv)
        $("<input/>")
            .attr("type", "button")
            .val("Defaults")
            .click(@requestDefaults)
            .appendTo(bdiv)
        $("<input/>")
            .attr("type", "button")
            .val("Import")
            .click(@importFile)
            .appendTo(bdiv)
        $("<input/>")
            .attr({"type": "file", "id": "WikiMonkey-import"})
            .change(@doImportFile)
            .appendTo(bdiv)
            .hide()
        $("<input/>")
            .attr("type", "button")
            .val("Export")
            .click(@exportEditor)
            .appendTo(bdiv)
        $("<a/>")
            .attr({"id": "WikiMonkey-export", "download": "WikiMonkey.conf"})
            .appendTo(bdiv)
        editor.append(bdiv)

        help = $("<a/>")
            .attr("href", "https://github.com/kynikos/wiki-monkey/wiki")
            .text("[help]")

        $("<p/>")
            .addClass("message")
            .text("All pages running Wiki Monkey need to be refreshed
                                        for saved changes to take effect. ")
            .append(help).appendTo(editor)

        $("<textarea/>").attr("id", "WikiMonkey-editor").appendTo(editor)

        $("<p/>")
            .text('Wiki Monkey version: ' + GM_info.script.version)
            .appendTo(editor)

        $("<p/>")
            .text("Actually installed plugins (in general, a subset of
                                    those set in the loaded configuration):")
            .appendTo(editor)

        list = $("<ul/>")

        for plugin of @WM.Plugins
            $("<li/>").text(plugin).appendTo(list)

        list.appendTo(editor)

        $("#preferences").children("fieldset").last().after(editor)

        @resetEditor()

        if location.hash == "#wiki-monkey"
            this._showEditor()

    _showEditor: ->
        tab = $("#WikiMonkey-preftab").parent()
        tab
            .siblings(".selected")
            .removeClass("selected")
            .children("a:first")
            .attr({"tabindex": "-1", "aria-selected": "false"})
        tab
            .addClass("selected")
            .children("a:first")
            .attr({"tabindex": "0", "aria-selected": "true"})

        editor = $("#WikiMonkey-prefsection")
        editor.siblings("fieldset").hide()
        editor.show()

        editor.siblings(".mw-prefs-buttons").hide()

    _hideEditor: ->
        $("#WikiMonkey-preftab")
            .attr({"tabindex": "-1", "aria-selected": "false"})
            .parent()
            .removeClass("selected")

        editor = $("#WikiMonkey-prefsection")
        editor.hide()
        editor.siblings(".mw-prefs-buttons").show()

    _load: (defaultConfig) ->
        # Upper-scope config
        @config = defaultConfig

        savedConfig = JSON.parse(localStorage.getItem("WikiMonkey"))

        if savedConfig
            for section of savedConfig
                for type of @config[section]
                    if savedConfig[section][type]
                        # Don't do a deep (recursive) merge! It would also
                        # merge the plugins' arguments, and also other
                        # possible unexpected effects
                        $.extend(@config[section][type],
                                                savedConfig[section][type])

        @save()

    _getEditorPlugins: ->
        return @config["Plugins"]["Editor"]

    _getDiffPlugins: ->
        return @config["Plugins"]["Diff"]

    _getBotPlugins: ->
        return @config["Plugins"]["Bot"]

    _getSpecialPlugins: ->
        return @config["Plugins"]["Special"]

    _getRecentChangesPlugins: ->
        return @config["Plugins"]["RecentChanges"]

    _getNewPagesPlugins: ->
        return @config["Plugins"]["NewPages"]

    _getGeneralMods: ->
        return @config["Mods"]["General"]

    _getEditorMods: ->
        return @config["Mods"]["Editor"]

    _getRecentChangesMods: ->
        return @config["Mods"]["RecentChanges"]

    _getContributionsMods: ->
        return @config["Mods"]["Contributions"]

    save: =>
        localStorage.setItem("WikiMonkey", JSON.stringify(@config))

    saveEditor: =>
        text = $("#WikiMonkey-editor").val()

        try
            # Upper-scope config
            @config = JSON.parse(text)
        catch err
            if text == DEFAULTS_REQUEST
                # Setting config to {} will make it be completely overridden
                # when the configuration is reloaded at the next refresh

                # Upper-scope config
                @config = {}
                $("#WikiMonkey-editor").val("The configuration has been
                    reset to the default values and will be available
                    after refreshing the page.");
            else
                alert("Not a valid JSON object, the configuration has not
                                                                been saved.")
                return false

        @save()

    resetEditor: =>
        $("#WikiMonkey-editor").val(JSON.stringify(@config, undefined, 4))

    requestDefaults: =>
        $("#WikiMonkey-editor").val(DEFAULTS_REQUEST)

    importFile: =>
        $("#WikiMonkey-import").trigger("click")

    doImportFile: ->
        file = this.files[0]
        freader = new FileReader()

        freader.onload = (fileLoadedEvent) ->
            $("#WikiMonkey-editor").val(fileLoadedEvent.target.result)

        freader.readAsText(file, "UTF-8")

    exportEditor: =>
        blob = new Blob([$("#WikiMonkey-editor").val()], {type:'text/plain'})
        link = $("#WikiMonkey-export")
            .attr("href", window.URL.createObjectURL(blob))
        # .trigger("click"); doesn't work
        link[0].click()
