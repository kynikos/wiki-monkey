// Generated by CoffeeScript 1.12.2
var $, Async, CSS,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = require('jquery');

CSS = require('../../lib.js.generic/dist/CSS');

Async = require('../../lib.js.generic/dist/Async');

module.exports.Menu = (function() {
  var makeChangeMenu, makeGroupAction;

  function Menu(WM) {
    this.WM = WM;
    this.warnInputNeeded = bind(this.warnInputNeeded, this);
    this.executeEntryAction = bind(this.executeEntryAction, this);
  }

  Menu.prototype._makeUI = function(plugins) {
    var currId, currMenu, entry, execAll, groupAction, groupActions, i, m, mainDiv, menuSel, menus, parentId, parentMenu, pid, plugin, pluginConf, pluginInst, pluginName, ref;
    CSS.addStyleElement("#WikiMonkeyMenu input.margin {margin:0 0.33em 0.33em 0;}");
    mainDiv = $('<div/>').attr('id', 'WikiMonkeyMenu');
    groupActions = {};
    for (pid in plugins) {
      pluginConf = plugins[pid];
      pluginName = pluginConf[0];
      pluginInst = pluginConf[1];
      if (this.WM.Plugins[pluginName]) {
        plugin = this.WM.Plugins[pluginName];
      } else {
        continue;
      }
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
        menuSel = mainDiv.children("div[id='" + currId + "']");
        if (!menuSel.length) {
          currMenu = $("<div/>").attr("id", currId).hide().appendTo(mainDiv);
          groupActions[currId] = [];
          if (m > 0) {
            parentMenu = mainDiv.children("div[id='" + parentId + "']");
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
      mainDiv.children("div[id='WikiMonkeyMenuRoot']").first().prepend(execAll);
      menus.first().show();
      return mainDiv[0];
    } else {
      return false;
    }
  };

  makeChangeMenu = function(currentMenu, changeMenu) {
    return function(event) {
      currentMenu.hide();
      return changeMenu.show();
    };
  };

  Menu.prototype.makeEntryUI = function(currMenu, plugin, pluginConf) {
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
  };

  Menu.prototype.makeEntryAction = function(plugin, pluginConf) {
    var self;
    self = this;
    return function(event) {
      return self.executeEntryAction([plugin, pluginConf], null);
    };
  };

  Menu.prototype.executeEntryAction = function(args, callNext) {
    var plugin, pluginConf;
    plugin = args[0];
    pluginConf = args[1];
    this.WM.Log.logHidden("Plugin: " + pluginConf[0]);
    return plugin.main(pluginConf[2], callNext);
  };

  Menu.prototype.warnInputNeeded = function(pluginName, callNext) {
    this.WM.Log.logWarning("Plugin " + pluginName + " was not executed because it requires input from its interface.");
    if (callNext) {
      return callNext();
    }
  };

  makeGroupAction = function(subGroupActions) {
    return function(event) {
      return Async.executeAsync(subGroupActions, -1);
    };
  };

  return Menu;

})();
