// Generated by CoffeeScript 2.0.3
// Wiki Monkey - MediaWiki bot and editor-assistant user script
// Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>

// This file is part of Wiki Monkey.

// Wiki Monkey is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Wiki Monkey is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
var CSS;

CSS = require('../../lib.js.generic/dist/CSS');

module.exports.Cfg = (function() {
  var DEFAULTS_REQUEST;

  class Cfg {
    constructor(WM) {
      this._doMakeUI = this._doMakeUI.bind(this);
      this.save = this.save.bind(this);
      this.saveEditor = this.saveEditor.bind(this);
      this.resetEditor = this.resetEditor.bind(this);
      this.requestDefaults = this.requestDefaults.bind(this);
      this.importFile = this.importFile.bind(this);
      this.exportEditor = this.exportEditor.bind(this);
      this.WM = WM;
      this.config = {};
    }

    _makeUI() {
      var waitdom;
      // We have to wait until #preftoc exists, because it's generated
      // dynamically by a MediaWiki script, hence racing with Wiki Monkey
      waitdom = function() {
        if ($('#preftoc')[0]) {
          return this._doMakeUI();
        } else {
          return setTimeout(_recurse, 200);
        }
      };
      return waitdom();
    }

    _doMakeUI() {
      var bdiv, editor, help, link, list, plugin, toc;
      // Creating the preferences interface shouldn't rely on the saved
      // configuration, in order to always make it possible to fix a
      // misconfiguration
      CSS.addStyleElement("#WikiMonkey-prefsection textarea { height:30em;} #WikiMonkey-prefsection div, #WikiMonkey-prefsection p.message {display:inline-block; margin-bottom:0.5em;} #WikiMonkey-prefsection input {margin-right:0.5em;} #WikiMonkey-prefsection input[value='Save'] {font-weight:bold;}");
      toc = $("#preftoc");
      toc.find("a").click(this._hideEditor);
      link = $("<a/>").attr({
        "id": "WikiMonkey-preftab",
        "href": "#wiki-monkey",
        "role": "tab",
        "aria-controls": "WikiMonkey-config",
        "tabindex": "-1",
        "aria-selected": "false"
      }).text("Wiki Monkey").click(this._showEditor);
      $("<li/>").appendTo(toc).append(link);
      editor = $("<fieldset/>").addClass("prefsection").attr("id", "WikiMonkey-prefsection").hide();
      $("<legend/>").addClass("mainLegend").text("Wiki Monkey").appendTo(editor);
      bdiv = $("<div/>");
      $("<input/>").attr("type", "button").val("Save").click(this.saveEditor).appendTo(bdiv);
      $("<input/>").attr("type", "button").val("Reset").click(this.resetEditor).appendTo(bdiv);
      $("<input/>").attr("type", "button").val("Defaults").click(this.requestDefaults).appendTo(bdiv);
      $("<input/>").attr("type", "button").val("Import").click(this.importFile).appendTo(bdiv);
      $("<input/>").attr({
        "type": "file",
        "id": "WikiMonkey-import"
      }).change(this.doImportFile).appendTo(bdiv).hide();
      $("<input/>").attr("type", "button").val("Export").click(this.exportEditor).appendTo(bdiv);
      $("<a/>").attr({
        "id": "WikiMonkey-export",
        "download": "WikiMonkey.conf"
      }).appendTo(bdiv);
      editor.append(bdiv);
      help = $("<a/>").attr("href", "https://github.com/kynikos/wiki-monkey/wiki").text("[help]");
      $("<p/>").addClass("message").text("All pages running Wiki Monkey need to be refreshed for saved changes to take effect. ").append(help).appendTo(editor);
      $("<textarea/>").attr("id", "WikiMonkey-editor").appendTo(editor);
      $("<p/>").text('Wiki Monkey version: ' + this.WM.version).appendTo(editor);
      $("<p/>").text("Actually installed plugins (in general, a subset of those set in the loaded configuration):").appendTo(editor);
      list = $("<ul/>");
      for (plugin in this.WM.Plugins) {
        $("<li/>").text(plugin).appendTo(list);
      }
      list.appendTo(editor);
      $("#preferences").children("fieldset").last().after(editor);
      this.resetEditor();
      if (location.hash === "#wiki-monkey") {
        return this._showEditor();
      }
    }

    _showEditor() {
      var editor, tab;
      tab = $("#WikiMonkey-preftab").parent();
      tab.siblings(".selected").removeClass("selected").children("a:first").attr({
        "tabindex": "-1",
        "aria-selected": "false"
      });
      tab.addClass("selected").children("a:first").attr({
        "tabindex": "0",
        "aria-selected": "true"
      });
      editor = $("#WikiMonkey-prefsection");
      editor.siblings("fieldset").hide();
      editor.show();
      return editor.siblings(".mw-prefs-buttons").hide();
    }

    _hideEditor() {
      var editor;
      $("#WikiMonkey-preftab").attr({
        "tabindex": "-1",
        "aria-selected": "false"
      }).parent().removeClass("selected");
      editor = $("#WikiMonkey-prefsection");
      editor.hide();
      return editor.siblings(".mw-prefs-buttons").show();
    }

    _load(defaultConfig) {
      var savedConfig, section, type;
      // Upper-scope config
      this.config = defaultConfig;
      savedConfig = JSON.parse(localStorage.getItem("WikiMonkey"));
      if (savedConfig) {
        for (section in savedConfig) {
          for (type in this.config[section]) {
            if (savedConfig[section][type]) {
              // Don't do a deep (recursive) merge! It would also
              // merge the plugins' arguments, and also other
              // possible unexpected effects
              $.extend(this.config[section][type], savedConfig[section][type]);
            }
          }
        }
      }
      return this.save();
    }

    _getEditorPlugins() {
      return this.config["Plugins"]["Editor"];
    }

    _getDiffPlugins() {
      return this.config["Plugins"]["Diff"];
    }

    _getBotPlugins() {
      return this.config["Plugins"]["Bot"];
    }

    _getSpecialPlugins() {
      return this.config["Plugins"]["Special"];
    }

    _getRecentChangesPlugins() {
      return this.config["Plugins"]["RecentChanges"];
    }

    _getNewPagesPlugins() {
      return this.config["Plugins"]["NewPages"];
    }

    _getGeneralMods() {
      return this.config["Mods"]["General"];
    }

    _getEditorMods() {
      return this.config["Mods"]["Editor"];
    }

    _getRecentChangesMods() {
      return this.config["Mods"]["RecentChanges"];
    }

    _getContributionsMods() {
      return this.config["Mods"]["Contributions"];
    }

    save() {
      return localStorage.setItem("WikiMonkey", JSON.stringify(this.config));
    }

    saveEditor() {
      var err, text;
      text = $("#WikiMonkey-editor").val();
      try {
        // Upper-scope config
        this.config = JSON.parse(text);
      } catch (error) {
        err = error;
        if (text === DEFAULTS_REQUEST) {
          // Setting config to {} will make it be completely overridden
          // when the configuration is reloaded at the next refresh

          // Upper-scope config
          this.config = {};
          $("#WikiMonkey-editor").val("The configuration has been reset to the default values and will be available after refreshing the page.");
        } else {
          alert("Not a valid JSON object, the configuration has not been saved.");
          return false;
        }
      }
      return this.save();
    }

    resetEditor() {
      return $("#WikiMonkey-editor").val(JSON.stringify(this.config, void 0, 4));
    }

    requestDefaults() {
      return $("#WikiMonkey-editor").val(DEFAULTS_REQUEST);
    }

    importFile() {
      return $("#WikiMonkey-import").trigger("click");
    }

    doImportFile() {
      var file, freader;
      file = this.files[0];
      freader = new FileReader();
      freader.onload = function(fileLoadedEvent) {
        return $("#WikiMonkey-editor").val(fileLoadedEvent.target.result);
      };
      return freader.readAsText(file, "UTF-8");
    }

    exportEditor() {
      var blob, link;
      blob = new Blob([$("#WikiMonkey-editor").val()], {
        type: 'text/plain'
      });
      link = $("#WikiMonkey-export").attr("href", window.URL.createObjectURL(blob));
      // .trigger("click"); doesn't work
      return link[0].click();
    }

  };

  DEFAULTS_REQUEST = "WARNING: If you click on the \"Save\" button now, the saved configuration will be reset to the default values at the next refresh!\nTo cancel this request, simply click on the \"Reset\" button.";

  return Cfg;

})();
