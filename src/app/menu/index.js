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

const {Vue, Vuex, styled} = require('../../modules/libs')
const store = require('../store')
const Fieldset = require('../_components/fieldset')
const App = require('..')

const Container = styled.div({
  '& input.margin': {
    margin: '0 0.33em 0.33em 0',
  },
})


module.exports = function ({pageType, plugins, display, displayLog, nextNode}) {
  store.commit('fieldset/show', display)
  store.commit('log/show', displayLog)

  const root = document.createElement('div')
  $(nextNode).before(root)

  const ui = new Menu(pageType, plugins)

  return new Vue({
    el: root,

    store,

    computed: Vuex.mapState('fieldset', {
      fieldsetDisplayed: 'display',
    }),

    render(h) {
      // Referencing @fieldsetDisplayed seems to be the only way to make
      // this component react to its changes
      this.fieldsetDisplayed

      return h(Fieldset, [
        h(Container, {ref: 'container'}),
      ])
    },

    mounted() {
      return $(this.$refs.container).append(ui.mainDiv)
    },

    updated() {
      // Needed when showing/hiding the main fieldset
      return $(this.$refs.container).append(ui.mainDiv)
    },
  })
}


var Menu = (function () { // eslint-disable-line vars-on-top,no-var
  let makeChangeMenu
  let makeGroupAction
  let executeGroupAction
  Menu = class Menu {
    static initClass() {
      makeChangeMenu = (currentMenu, changeMenu) => function (event) {
        currentMenu.hide()
        return changeMenu.show()
      }
      makeGroupAction = (subGroupActions) => (event) => executeGroupAction(subGroupActions, -1)


      executeGroupAction = function (subGroupActions, id) {
        id++
        if (subGroupActions[id]) {
          const fid = subGroupActions[id]
          const callContinue = () => {
            return executeGroupAction(subGroupActions, id)
          }
          return fid[0](fid[1], callContinue)
        }
      }
    }

    constructor(pageType, plugins) { // eslint-disable-line max-lines-per-function,max-statements
      this.executeEntryAction = this.executeEntryAction.bind(this)
      this.warnInputNeeded = this.warnInputNeeded.bind(this)
      this.pageType = pageType
      this.mainDiv = $('<div>')
      const groupActions = {}

      for (const Plugin of Array.from(plugins)) {
        var currMenu; var groupAction
        const plugin = new Plugin()
        const pluginInst = plugin.conf[`${this.pageType}_menu`].slice()

        // This allows to disable an entry by giving it a menu_entry
        // parameter that evaluates to false
        if (!pluginInst || !pluginInst.length) {
          continue
        }

        if (plugin.makeUI) {
          groupAction = [this.warnInputNeeded, plugin]
        } else {
          groupAction = [this.executeEntryAction, plugin]
        }

        pluginInst.unshift('WikiMonkeyMenuRoot')
        let currId = false

        for (let m = 0, end = pluginInst.length - 1, asc = end >= 0; asc ? m < end : m > end; asc ? m++ : m--) {
          const parentId = currId
          currId = pluginInst.slice(0, m + 1).join('-')
            .replace(/ /g, '_')

          // I can't simply do $("#" + currId) because @mainDiv
          // hasn't been added to the DOM tree yet
          const menuSel = this.mainDiv.children(`div[id='${currId}']`)

          if (!menuSel.length) {
            currMenu = $('<div/>')
              .attr('id', currId)
              .hide()
              .appendTo(this.mainDiv)

            groupActions[currId] = []

            if (m > 0) {
              // I can't simply do $("#" + currId) because @mainDiv
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
                .val(pluginInst[m])
                .click(makeGroupAction(groupActions[currId]))
                .appendTo(parentMenu)

              $('<input/>')
                .attr('type', 'button')
                .val('>')
                .addClass('margin')
                .click(makeChangeMenu(parentMenu, currMenu))
                .appendTo(parentMenu)
            }
          } else {
            currMenu = menuSel.first()
          }

          groupActions[currId].push(groupAction)
        }

        const entry = $('<input/>')
          .attr('type', 'button')
          .val(pluginInst[pluginInst.length - 1])
          .addClass('margin')
          .appendTo(currMenu)

        if (plugin.makeUI) {
          entry.click(this.makeEntryUI(currMenu, plugin))
        } else {
          entry.click(this.makeEntryAction(plugin))
        }
      }

      const menus = this.mainDiv.children()

      if (menus.length) {
        const execAll = $('<input/>')
          .attr('type', 'button')
          .val('*')
          .addClass('margin')
          .click(makeGroupAction(groupActions.WikiMonkeyMenuRoot))

        // I can't simply do $("#" + currId) because @mainDiv
        // hasn't been added to the DOM tree yet
        this.mainDiv
          .children('div[id=\'WikiMonkeyMenuRoot\']')
          .first()
          .prepend(execAll)

        menus.first().show()
      }
    }

    makeEntryUI(currMenu, plugin) {
      return (event) => {
        currMenu.hide()
        const UIdiv = $('<div/>')

        $('<input/>')
          .attr('type', 'button')
          .val('<')
          .addClass('margin')
          .click((event) => {
            UIdiv.remove()
            return currMenu.show()
          })
          .appendTo(UIdiv)

        $('<input/>')
          .attr('type', 'button')
          .val('Execute')
          .click(this.makeEntryAction(plugin))
          .appendTo(UIdiv)

        const UI = plugin.makeUI()
        return UIdiv.append(UI).insertAfter(currMenu)
      }
    }

    makeEntryAction(plugin) {
      return (event) => {
        return this.executeEntryAction(plugin, null)
      }
    }

    executeEntryAction(plugin, callNext) {
      App.log.hidden(`Plugin: ${plugin.constructor.name}`)
      return plugin[`main_${this.pageType}`](callNext)
    }

    warnInputNeeded(plugin, callNext) {
      App.log.warning(`Plugin ${plugin.constructor.name}` +
                ' was not executed because it requires input from its interface.')

      if (callNext) {
        return callNext()
      }
    }
  }
  Menu.initClass()
  return Menu
}())
