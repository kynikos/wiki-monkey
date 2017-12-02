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
var Async, CSS;

CSS = require('../../lib.js.generic/dist/CSS');

Async = require('../../lib.js.generic/dist/Async');

module.exports.Menu = (function() {
  var makeChangeMenu, makeGroupAction;

  class Menu {
    constructor(WM) {
      this.executeEntryAction = this.executeEntryAction.bind(this);
      this.warnInputNeeded = this.warnInputNeeded.bind(this);
      this.WM = WM;
    }

    _makeUI(plugins) {
      var currId, currMenu, entry, execAll, groupAction, groupActions, i, m, mainDiv, menuSel, menus, parentId, parentMenu, pid, plugin, pluginConf, pluginInst, pluginName, ref;
      CSS.addStyleElement("#WikiMonkeyMenu input.margin {margin:0 0.33em 0.33em 0;}");
      mainDiv = $('<div/>').attr('id', 'WikiMonkeyMenu');
      groupActions = {};
      for (pid in plugins) {
        pluginConf = plugins[pid];
        pluginName = pluginConf[0];
        pluginInst = pluginConf[1];
        // This protects from configurations that define plugins
        // that are actually not installed
        // A try-catch doesn't work...
        if (this.WM.Plugins[pluginName]) {
          plugin = this.WM.Plugins[pluginName];
        } else {
          continue;
        }
        // This allows to disable an entry by giving it any second
        // parameter that evaluates to false
        if (!pluginInst || !pluginInst.length) {
          continue;
        }
        if (plugin.makeUI) {
          groupAction = [this.warnInputNeeded, pluginConf[0]];
        } else {
          groupAction = [this.executeEntryAction, [plugin, pluginConf]];
        }
        pluginInst.unshift("WikiMonkeyMenuRoot");
        currId = false;
        for (m = i = 0, ref = pluginInst.length - 1; 0 <= ref ? i < ref : i > ref; m = 0 <= ref ? ++i : --i) {
          parentId = currId;
          currId = pluginInst.slice(0, m + 1).join("-").replace(/ /g, "_");
          // I can't simply do $("#" + currId) because mainDiv
          // hasn't been added to the DOM tree yet
          menuSel = mainDiv.children(`div[id='${currId}']`);
          if (!menuSel.length) {
            currMenu = $("<div/>").attr("id", currId).hide().appendTo(mainDiv);
            groupActions[currId] = [];
            if (m > 0) {
              // I can't simply do $("#" + currId) because mainDiv
              // hasn't been added to the DOM tree yet
              parentMenu = mainDiv.children(`div[id='${parentId}']`);
              $('<input/>').attr('type', 'button').val('<').addClass('margin').click(makeChangeMenu(currMenu, parentMenu)).appendTo(currMenu);
              $('<input/>').attr('type', 'button').val(pluginInst[m]).click(makeGroupAction(groupActions[currId])).appendTo(parentMenu);
              $('<input/>').attr('type', 'button').val('>').addClass('margin').click(makeChangeMenu(parentMenu, currMenu)).appendTo(parentMenu);
            }
          } else {
            currMenu = menuSel.first();
          }
          groupActions[currId].push(groupAction);
        }
        entry = $("<input/>").attr('type', 'button').val(pluginInst[pluginInst.length - 1]).addClass('margin').appendTo(currMenu);
        if (plugin.makeUI) {
          entry.click(this.makeEntryUI(currMenu, plugin, pluginConf));
        } else {
          entry.click(this.makeEntryAction(plugin, pluginConf));
        }
      }
      menus = mainDiv.children();
      if (menus.length) {
        execAll = $('<input/>').attr('type', 'button').val("*").addClass('margin').click(makeGroupAction(groupActions["WikiMonkeyMenuRoot"]));
        // I can't simply do $("#" + currId) because mainDiv
        // hasn't been added to the DOM tree yet
        mainDiv.children("div[id='WikiMonkeyMenuRoot']").first().prepend(execAll);
        menus.first().show();
        return mainDiv[0];
      } else {
        return false;
      }
    }

    makeEntryUI(currMenu, plugin, pluginConf) {
      var self;
      self = this;
      return function(event) {
        var UI, UIdiv;
        currMenu.hide();
        UIdiv = $('<div/>');
        $('<input/>').attr('type', 'button').val('<').addClass('margin').click(function(event) {
          UIdiv.remove();
          return currMenu.show();
        }).appendTo(UIdiv);
        $('<input/>').attr('type', 'button').val('Execute').click(self.makeEntryAction(plugin, pluginConf)).appendTo(UIdiv);
        UI = plugin.makeUI(pluginConf[2]);
        return UIdiv.append(UI).insertAfter(currMenu);
      };
    }

    makeEntryAction(plugin, pluginConf) {
      var self;
      self = this;
      return function(event) {
        return self.executeEntryAction([plugin, pluginConf], null);
      };
    }

    executeEntryAction(args, callNext) {
      var plugin, pluginConf;
      plugin = args[0];
      pluginConf = args[1];
      this.WM.Log.logHidden("Plugin: " + pluginConf[0]);
      return plugin.main(pluginConf[2], callNext);
    }

    warnInputNeeded(pluginName, callNext) {
      this.WM.Log.logWarning("Plugin " + pluginName + " was not executed because it requires input from its interface.");
      if (callNext) {
        return callNext();
      }
    }

  };

  makeChangeMenu = function(currentMenu, changeMenu) {
    return function(event) {
      currentMenu.hide();
      return changeMenu.show();
    };
  };

  makeGroupAction = function(subGroupActions) {
    return function(event) {
      return Async.executeAsync(subGroupActions, -1);
    };
  };

  return Menu;

})();
