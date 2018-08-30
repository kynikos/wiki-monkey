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

const {jssc} = require('../modules/libs')
const WM = require('../modules')
const App = require('../app')
const {Plugin} = require('./_Plugin');


(function () {
  let makeUI
  let configuration
  let storeRegExp
  const Cls = module.exports.SimpleReplace = class SimpleReplace extends Plugin {
    constructor(...args) {
      {
        // Hack: trick Babel/TypeScript into allowing this before super.
        if (false) { super() }
        const thisFn = (() => { return this }).toString()
        const thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim()
        eval(`${thisName} = this;`)
      }
      this.storeConfiguration = this.storeConfiguration.bind(this)
      this.mainAutoWrite = this.mainAutoWrite.bind(this)
      this.mainAutoEnd = this.mainAutoEnd.bind(this)
      super(...args)
    }

    static initClass() {
      this.conf_default = {
        enabled: true,
        editor_menu: ['RegExp substitution'],
        bot_label: 'RegExp substitution',
      }

      makeUI = function () {
        const {classes} = jssc({
          simpleReplace: {
            '& div': {
              marginBottom: '0.33em',
            },

            '& input[type=\'text\']': {
              marginLeft: '0.33em',
              width: '60%',
            },
          },
        })

        const divMain = document.createElement('div')
        divMain.id = 'WikiMonkey-SimpleReplace'
        divMain.className = classes.simpleReplace

        const par1 = document.createElement('div')

        const regexpLabel = document.createElement('span')
        regexpLabel.innerHTML = 'RegExp pattern:'

        const regexp = document.createElement('input')
        regexp.setAttribute('type', 'text')
        regexp.id = 'WikiMonkey-SimpleReplace-RegExp'

        const ignoreCase = document.createElement('input')
        ignoreCase.setAttribute('type', 'checkbox')
        ignoreCase.id = 'WikiMonkey-SimpleReplace-IgnoreCase'

        const ignoreCaseLabel = document.createElement('span')
        ignoreCaseLabel.innerHTML = 'i'

        par1.appendChild(regexpLabel)
        par1.appendChild(regexp)
        par1.appendChild(ignoreCase)
        par1.appendChild(ignoreCaseLabel)

        const par2 = document.createElement('div')

        const newStringLabel = document.createElement('span')
        newStringLabel.innerHTML = 'New string:'

        const newString = document.createElement('input')
        newString.setAttribute('type', 'text')
        newString.id = 'WikiMonkey-SimpleReplace-NewString'

        par2.appendChild(newStringLabel)
        par2.appendChild(newString)

        divMain.appendChild(par1)
        divMain.appendChild(par2)

        return divMain
      }

      configuration = null

      storeRegExp = () => configuration.regExp = new RegExp(
        configuration.pattern,
        `g${configuration.ignoreCase ? 'i' : ''}`
      )
    }

    makeUI() {
      return makeUI()
    }

    makeBotUI() {
      const divMain = makeUI()
      const par3 = document.createElement('div')

      const summaryLabel = document.createElement('span')
      summaryLabel.innerHTML = 'Edit summary:'

      const summary = document.createElement('input')
      summary.setAttribute('type', 'text')
      summary.id = 'WikiMonkey-SimpleReplace-Summary'

      par3.appendChild(summaryLabel)
      par3.appendChild(summary)

      divMain.appendChild(par3)

      return divMain
    }

    storeConfiguration() {
      configuration = {
        pattern: document.getElementById('WikiMonkey-SimpleReplace-RegExp').value,
        ignoreCase: document.getElementById('WikiMonkey-SimpleReplace-IgnoreCase').checked,
        newString: document.getElementById('WikiMonkey-SimpleReplace-NewString').value,
      }

      App.log.hidden(`Pattern: ${configuration.pattern}`)
      App.log.hidden(`Ignore case: ${configuration.ignoreCase}`)
      return App.log.hidden(`New string: ${configuration.newString}`)
    }

    main_editor(callNext) {
      this.storeConfiguration()

      try {
        storeRegExp()
      } catch (exc) {
        App.log.error(`Invalid pattern: ${exc}`)
        // Block the execution of this function
        return false
      }

      const source = WM.Editor.readSource()
      const newtext = source.replace(
        configuration.regExp,
        configuration.newString
      )

      if (newtext !== source) {
        WM.Editor.writeSource(newtext)
        App.log.info('Text substituted')
      }

      if (callNext) {
        return callNext()
      }
    }

    main_bot(title, callBot, chainArgs) {
      this.storeConfiguration()

      try {
        storeRegExp()
      } catch (exc) {
        App.log.error(`Invalid pattern: ${exc}`)
        callBot(false, null)
        // Block the execution of this function
        return false
      }

      const summary = document.getElementById('WikiMonkey-SimpleReplace-Summary').value

      if (summary !== '') {
        return WM.MW.callQueryEdit(
          title,
          this.mainAutoWrite,
          [summary, callBot]
        )
      }
      App.log.error('The edit summary cannot be empty')
      return callBot(false, null)
    }

    mainAutoWrite(title, source, timestamp, edittoken, args) {
      const summary = args[0]
      const callBot = args[1]

      const newtext = source.replace(
        configuration.regExp,
        configuration.newString
      )

      if (newtext !== source) {
        return WM.MW.callAPIPost(
          {action: 'edit', bot: '1', title, summary, text: newtext, basetimestamp: timestamp, token: edittoken},
          this.mainAutoEnd,
          callBot,
          null
        )
      }
      return callBot(0, null)
    }

    mainAutoEnd(res, callBot) {
      if (res.edit && res.edit.result === 'Success') {
        return callBot(1, null)
      } else if (res.error) {
        App.log.error(`${res.error.info} (${res.error.code})`)
        return callBot(res.error.code, null)
      }
      return callBot(false, null)
    }
  }
  Cls.initClass()
  return Cls
}())
