// Wiki Monkey - MediaWiki bot and editor-assistant user script
// Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
//
// This file is part of Wiki Monkey.
//
// Wiki Monkey is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Wiki Monkey is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

const WM = require('%/index')


const makeChangeMenu = (currentMenu, changeMenu) => function (event) {
  currentMenu.hide()
  changeMenu.show()
}

const executeGroupAction = function (subGroupActions, id) {
  const nextId = id + 1
  if (subGroupActions[nextId]) {
    const fid = subGroupActions[nextId]
    const callContinue = () => {
      return executeGroupAction(subGroupActions, nextId)
    }
    return fid[0](...fid.slice(1), callContinue)
  }
  return false
}

const makeGroupAction = (subGroupActions) => function (event) {
  return executeGroupAction(subGroupActions, -1)
}


module.exports = class {
  constructor(plugins, confMenu) {
    this.mainDiv = $('<div>')
    const groupActions = {}

    for (const [plugin, pluginRun, pluginMakeUI] of plugins) {
      const pluginInst = plugin.conf[confMenu].slice()

      // This allows to disable an entry by giving it a menu_entry
      // parameter that evaluates to false
      if (!pluginInst || !pluginInst.length) {
        continue
      }

      const pluginName = plugin.constructor.pluginName

      let groupAction
      if (pluginMakeUI) {
        groupAction = [this.warnInputNeeded, pluginName]
      } else {
        groupAction = [this.executeEntryAction, pluginName, pluginRun]
      }

      pluginInst.unshift('WikiMonkeyMenuRoot')
      let currId = false

      let currMenu

      pluginInst.slice(0, -1).forEach((label, m) => {
        const parentId = currId
        currId = pluginInst.slice(0, m + 1).join('-').replace(/ /gu, '_')

        // I can't simply do $("#" + currId) because mainDiv
        // hasn't been added to the DOM tree yet
        const menuSel = this.mainDiv.children(`div[id='${currId}']`)

        if (menuSel.length) {
          currMenu = menuSel.first()
        } else {
          currMenu = $('<div/>')
            .attr('id', currId)
            .hide()
            .appendTo(this.mainDiv)

          groupActions[currId] = []

          if (m > 0) {
            // I can't simply do $("#" + currId) because mainDiv
            // hasn't been added to the DOM tree yet
            const parentMenu = this.mainDiv.children(`div[id='${parentId}']`)

            $('<input/>')
              .attr('type', 'button')
              .val('<')
              .addClass('margin')
              .click(makeChangeMenu(currMenu, parentMenu))
              .appendTo(currMenu)

            $('<input/>')
              .attr('type', 'button')
              .val(label)
              .click(makeGroupAction(groupActions[currId]))
              .appendTo(parentMenu)

            $('<input/>')
              .attr('type', 'button')
              .val('>')
              .addClass('margin')
              .click(makeChangeMenu(parentMenu, currMenu))
              .appendTo(parentMenu)
          }
        }

        groupActions[currId].push(groupAction)
      })

      const entry = $('<input/>')
        .attr('type', 'button')
        .val(pluginInst[pluginInst.length - 1])
        .addClass('margin')
        .appendTo(currMenu)

      if (pluginMakeUI) {
        entry.click(this.makeEntryUI(currMenu, pluginName, pluginRun, pluginMakeUI))
      } else {
        entry.click(this.makeEntryAction(pluginName, pluginRun))
      }
    }

    const menus = this.mainDiv.children()

    if (menus.length) {
      const execAll = $('<input/>')
        .attr('type', 'button')
        .val('*')
        .addClass('margin')
        .click(makeGroupAction(groupActions.WikiMonkeyMenuRoot))

      // I can't simply do $("#" + currId) because mainDiv
      // hasn't been added to the DOM tree yet
      this.mainDiv
        .children('div[id=\'WikiMonkeyMenuRoot\']')
        .first()
        .prepend(execAll)

      menus.first().show()
    }
  }

  makeEntryUI(currMenu, pluginName, pluginRun, pluginMakeUI) {
    return (event) => {
      currMenu.hide()
      const UIdiv = $('<div/>')

      $('<input/>')
        .attr('type', 'button')
        .val('<')
        .addClass('margin')
        .click((event2) => {
          UIdiv.remove()
          return currMenu.show()
        })
        .appendTo(UIdiv)

      $('<input/>')
        .attr('type', 'button')
        .val('Execute')
        .click(this.makeEntryAction(pluginName, pluginRun))
        .appendTo(UIdiv)

      const UI = pluginMakeUI()
      return UIdiv.append(UI).insertAfter(currMenu)
    }
  }

  makeEntryAction(pluginName, pluginRun) {
    return (event) => {
      return this.executeEntryAction(pluginName, pluginRun, null)
    }
  }

  executeEntryAction(pluginName, pluginRun, callNext) { // eslint-disable-line class-methods-use-this
    WM.App.log.hidden(`Plugin: ${pluginName}`)
    pluginRun(callNext)
  }

  warnInputNeeded(pluginName, callNext) { // eslint-disable-line class-methods-use-this
    WM.App.log.warning(`Plugin ${pluginName}
      was not executed because it requires input from its interface.`)

    if (callNext) {
      callNext()
    }
  }
}
