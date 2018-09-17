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

const WM = require('../../modules')
const {jssc} = require('../../modules/libs')

const {classes} = jssc({
  pluginSelect: {
    width: '100%',
    marginBottom: '1em',
  },
  listSelect: {
    marginBottom: '1em',
  },
  botFilter: {
    height: '6em',
    marginBottom: '1em',
    resize: 'vertical',
  },
  botStartStop: {
    marginRight: '0.33em',
    marginBottom: '1em',
    fontWeight: 'bold',
  },
  botSelected: {
    backgroundColor: '#faa',
    padding: '0.2em 0.4em',
  },
  botProcessing: {
    backgroundColor: '#ff8',
    padding: '0.2em 0.4em',
  },
  botChanged: {
    backgroundColor: '#afa',
    padding: '0.2em 0.4em',
  },
  botUnchanged: {
    backgroundColor: '#aaf',
    padding: '0.2em 0.4em',
  },
  botBypassed: {
    backgroundColor: 'orangered',
    padding: '0.2em 0.4em',
  },
  botFailed: {
    backgroundColor: 'red',
    padding: '0.2em 0.4em',
  },
})


module.exports = class {
  constructor(plugins, lists) {
    this._previewFilter = this._previewFilter.bind(this)
    this._startAutomatic = this._startAutomatic.bind(this)
    this.configuration = {
      pluginName: null,
      function_() {},
      filters: [],
      list: {
        current: null,
        previous: null,
      },
      visited: [],
    }
    // LocalStorage can only store strings
    this.botToken = '0'

    const fdiv = this.makeFunctionUI(plugins)

    this.elems = fdiv ? [fdiv, this.makeConfUI(lists)] : []
  }

  makeFunctionUI(plugins) { // eslint-disable-line max-lines-per-function,max-statements
    const self = this
    const fieldset = document.createElement('fieldset')

    const legend = document.createElement('legend')
    legend.innerHTML = 'Plugin'

    const selectFunctions = document.createElement('select')
    selectFunctions.id = 'WikiMonkeyBot-PluginSelect'
    selectFunctions.className = classes.pluginSelect

    const ffunctions = []

    for (const [pplugin, pluginRun, pluginMakeUI] of plugins) {
      const pluginInst = pplugin.conf.bot_label

      // This allows to disable an entry by giving it any second
      // parameter that evaluates to false
      if (!pluginInst || !pluginInst.length) {
        continue
      }

      ffunctions.push([pplugin, pluginRun, pluginMakeUI])
      const option = document.createElement('option')
      option.innerHTML = pluginInst

      if (pplugin.constructor.name === WM.conf.default_bot_plugin) {
        option.selected = true
      }

      selectFunctions.appendChild(option)
    }

    if (ffunctions.length) {
      selectFunctions.addEventListener('change', ((fffunctions) => function () {
        const select = document.getElementById('WikiMonkeyBot-PluginSelect')
        const id = select.selectedIndex
        const UI = document.getElementById('WikiMonkeyBotFunction')
        const [plugin, pluginRun, pluginMakeUI] = fffunctions[id]
        // [1] Note that this must also be executed immediately, see [2]
        if (pluginMakeUI instanceof Function) {
          UI.replaceChild(pluginMakeUI(), UI.firstChild)
        } else {
          // Don't removeChild, otherwise if another plugin with
          // interface is selected, replaceChild won't work
          UI.replaceChild(
            document.createElement('div'),
            UI.firstChild
          )
        }
        self.configuration.pluginName = plugin.constructor.name
        self.configuration.function_ = (
          title,
          callContinue, chainArgs
        ) => pluginRun(title, callContinue, chainArgs)
      }
      )(ffunctions), false)

      const divFunction = document.createElement('div')
      divFunction.id = 'WikiMonkeyBotFunction'

      const [plugin, pluginRun, pluginMakeUI] = ffunctions[selectFunctions.selectedIndex]

      // [2] Note that this is also executed onchange, see [1]
      if (pluginMakeUI instanceof Function) {
        divFunction.appendChild(pluginMakeUI())
      } else {
        divFunction.appendChild(document.createElement('div'))
      }
      this.configuration.pluginName = plugin.constructor.name
      this.configuration.function_ = (title, callContinue, chainArgs) => {
        pluginRun(title, callContinue, chainArgs)
      }

      fieldset.appendChild(legend)
      fieldset.appendChild(selectFunctions)
      fieldset.appendChild(divFunction)

      return fieldset
    }
    return false
  }

  makeListSelector(lists) { // eslint-disable-line max-statements
    const self = this
    const selectLists = document.createElement('select')
    selectLists.id = 'WikiMonkeyBot-ListSelect'
    selectLists.className = classes.listSelect

    for (const list of lists) {
      if (list[0]) {
        const option = document.createElement('option')
        option.innerHTML = list[2]
        selectLists.appendChild(option)

        if (!this.configuration.list.current) {
          // [1] Note that this is also executed onchange, see [2]
          this.configuration.list.current = list
        }
      }
    }

    selectLists.addEventListener('change', ((lss) => function () {
      const select = document.getElementById('WikiMonkeyBot-ListSelect')
      const id = select.selectedIndex
      self.configuration.list.previous = self.configuration.list.current
      // [2] Note that this must also be executed immediately, see [1]
      self.configuration.list.current = lss[id]
    }
    )(lists), false)

    return selectLists
  }

  makeConfUI(lists) { // eslint-disable-line max-lines-per-function,max-statements
    const self = this
    const bot = document.createElement('div')

    const fieldset = document.createElement('fieldset')

    const legend = document.createElement('legend')
    legend.innerHTML = 'Filter'

    const listSelect = this.makeListSelector(lists)

    const filter = document.createElement('textarea')
    filter.id = 'WikiMonkeyBotFilter'
    filter.className = classes.botFilter

    const preview = document.createElement('input')
    preview.id = 'WikiMonkeyBotPreview'
    preview.type = 'button'
    preview.value = 'Preview'

    const duplicates = document.createElement('input')
    duplicates.type = 'checkbox'
    duplicates.id = 'WikiMonkeyBotDuplicates'

    const inverse = document.createElement('input')
    inverse.type = 'checkbox'
    inverse.id = 'WikiMonkeyBotInverse'

    const elems = [filter, duplicates, inverse]

    for (const elem of elems) {
      elem.addEventListener(
        'change', () => self._disableStartBot('Filters have changed, preview the selection')
        , false
      )
    }

    const duplicatestag = document.createElement('span')
    duplicatestag.innerHTML = 'Duplicates'

    const inversetag = document.createElement('span')
    inversetag.innerHTML = 'Inverse'

    preview.addEventListener('click', this._previewFilter, false)

    fieldset.appendChild(legend)
    if (listSelect.length > 1) {
      fieldset.appendChild(listSelect)
    }
    fieldset.appendChild(filter)
    fieldset.appendChild(preview)
    fieldset.appendChild(duplicates)
    fieldset.appendChild(duplicatestag)
    fieldset.appendChild(inverse)
    fieldset.appendChild(inversetag)

    const start = document.createElement('input')
    start.type = 'button'
    start.value = 'Start bot'
    start.id = 'WikiMonkeyBotStart'
    start.className = classes.botStartStop

    start.addEventListener('click', this._startAutomatic, false)

    start.disabled = true

    const startMsg = document.createElement('span')
    startMsg.innerHTML = 'Set and preview the filter first'
    startMsg.id = 'WikiMonkeyBotStartMsg'

    const forceStart = document.createElement('span')
    forceStart.id = 'WikiMonkeyBotForceStart'

    const forceStartCB = document.createElement('input')
    forceStartCB.type = 'checkbox'
    forceStartCB.disabled = true

    const forceStartLabel = document.createElement('span')
    forceStartLabel.innerHTML = `Force start, stopping any other
  currently running bots`

    forceStart.style.display = 'none'
    forceStart.appendChild(forceStartCB)
    forceStart.appendChild(forceStartLabel)

    bot.appendChild(fieldset)
    bot.appendChild(start)
    bot.appendChild(startMsg)
    bot.appendChild(forceStart)

    return bot
  }

  _enableStartBot() {
    document.getElementById('WikiMonkeyBotStartMsg').innerHTML = ''
    return document.getElementById('WikiMonkeyBotStart').disabled = false
  }

  _disableStartBot(message) {
    document.getElementById('WikiMonkeyBotStartMsg').innerHTML = message
    return document.getElementById('WikiMonkeyBotStart').disabled = true
  }

  _enableStopBot(stopId) {
    const self = this
    const stop = document.createElement('input')
    stop.type = 'button'
    stop.value = 'Stop bot'
    stop.id = 'WikiMonkeyBotStop'
    stop.className = classes.botStartStop

    stop.addEventListener('click', ((id) => function () {
      clearTimeout(id)
      // Run _disableStopBot() here, not in _endAutomatic()
      self._disableStopBot()
      self._endAutomatic(true)
      return WM.App.log.info('Bot stopped manually')
    }
    )(stopId), false)

    const start = document.getElementById('WikiMonkeyBotStart')
    start.parentNode.insertBefore(stop, start)
    start.style.display = 'none'
  }

  _disableStopBot() {
    const stop = document.getElementById('WikiMonkeyBotStop')
    stop.parentNode.removeChild(stop)
    return document.getElementById('WikiMonkeyBotStart').style.display = 'inline'
  }

  _disableControls() {
    return this._setEnableControls(true)
  }

  _reEnableControls() {
    return this._setEnableControls(false)
  }

  _setEnableControls(flag) {
    const fsets = document.getElementById('WikiMonkeyBot')
      .getElementsByTagName('fieldset')
    return Array.from(fsets).map((fset) => fset.disabled = flag)
  }

  _enableForceStart() {
    const force = document.getElementById('WikiMonkeyBotForceStart')
    force.getElementsByTagName('input')[0].disabled = false
    return force.style.display = 'inline'
  }

  _disableForceStart() {
    const force = document.getElementById('WikiMonkeyBotForceStart')
    force.getElementsByTagName('input')[0].checked = false
    force.getElementsByTagName('input')[0].disabled = true
    return force.style.display = 'none'
  }

  _canForceStart() {
    return document.getElementById('WikiMonkeyBotForceStart')
      .getElementsByTagName('input')[0].checked
  }

  makeFilters() { // eslint-disable-line max-statements
    this.configuration.filters = []
    const filters = document.getElementById('WikiMonkeyBotFilter')
      .value.split('\n')

    for (const filter of filters) {
      // Filter could be an empty string
      if (filter) {
        var regexp
        const firstSlash = filter.indexOf('/')
        const lastSlash = filter.lastIndexOf('/')
        const pattern = filter.substring(firstSlash + 1, lastSlash)
        const modifiers = filter.substring(lastSlash + 1)
        const negative = filter.charAt(0) === '!'

        try {
          regexp = new RegExp(pattern, modifiers)
        } catch (exc) {
          WM.App.log.error(`Invalid regexp: ${exc}`)
          return false
        }

        this.configuration.filters.push([regexp, negative])
      }
    }
    // Do not return nor break, so that if among the filters
    //   there's an invalid regexp the function returns false

    return true
  }

  canProcessPage(link) { // eslint-disable-line max-statements
    // Exclude red links (they can be found in some special pages)
    if (link.className.split(' ').indexOf('new') < 0) {
      // Don't use link.title because for example in Category pages all
      //   subpages would include "Category:", thus always matching
      //   filters like "/a/", "/t/" etc.
      const title = link.innerHTML
      const duplicates = document.getElementById('WikiMonkeyBotDuplicates')
        .checked

      if (duplicates || this.configuration.visited.indexOf(title) < 0) {
        this.configuration.visited.push(title)
        const {filters} = this.configuration
        const inverse = document.getElementById('WikiMonkeyBotInverse')
          .checked

        if (filters.length > 0) {
          for (const filter of filters) {
            const regexp = filter[0]
            const negative = filter[1]
            const test = regexp.test(title)

            if (test !== negative) {
              if (inverse) { return false } return true
            }
          }

          // No (test != negative) condition has been met in the loop
          if (inverse) { return true } return false
        }
        if (inverse) { return false } return true
      }
      return false
    }
    return false
  }

  changeWikiMonkeyLinkClassName(className, newClass) {
    const elclasses = className.split(' ')
    const newClasses = []

    for (const cls of elclasses) {
      if (cls.indexOf('WikiMonkey') < 0) {
        newClasses.push(cls)
      }
    }

    // Don't push in an else block inside the loop, so that if there was
    // no WikiMonkey class set, it will be added
    newClasses.push(newClass)

    return newClasses.join(' ')
  }

  restoreOriginalLinkClassName(className) {
    const elclasses = className.split(' ')
    const origClasses = []

    for (const cls of elclasses) {
      if (cls.indexOf('WikiMonkey') < 0) {
        origClasses.push(cls)
      }
    }

    return origClasses.join(' ')
  }

  _previewFilter() { // eslint-disable-line max-lines-per-function,max-statements
    let item; let items; let link; let linkId
    WM.App.log.info('Updating filter preview, please wait ...')
    this._disableStartBot('Updating filter preview ...')

    if (this.configuration.list.previous) {
      if (this.configuration.list.current[0].nodeName === 'TBODY') {
        items = this.configuration.list.previous[0]
          .getElementsByTagName('td')
      } else {
        items = this.configuration.list.previous[0]
          .getElementsByTagName('li')
      }
      linkId = this.configuration.list.previous[1]

      for (item of items) {
        link = item.getElementsByTagName('a')[linkId]

        // The list item could refer to an invalid title, represented
        // by e.g. <span class="mw-invalidtitle">Invalid title with
        // namespace "Category" and text ""</span>
        if (link) {
          link.className = this.restoreOriginalLinkClassName(link.className)
        }
      }
    }

    this.configuration.visited = []

    linkId = this.configuration.list.current[1]
    let enable = false
    let N = 0

    if (this.makeFilters()) {
      if (this.configuration.list.current[0].nodeName === 'TBODY') {
        items = this.configuration.list.current[0].getElementsByTagName('td')
      } else {
        items = this.configuration.list.current[0].getElementsByTagName('li')
      }

      for (item of items) {
        link = item.getElementsByTagName('a')[linkId]

        // Also test 'link' itself, because the list item could refer
        // to an invalid title, represented by e.g.
        // <span class="mw-invalidtitle">Invalid title with namespace
        // "Category" and text ""</span>
        if (link) {
          if (this.canProcessPage(link)) {
            link.className = this.changeWikiMonkeyLinkClassName(link.className, classes.botSelected)
            enable = true
            N++
          } else {
            link.className = this.restoreOriginalLinkClassName(link.className)
          }
        }
      }
    }

    WM.App.log.info(`Preview updated (${N} pages selected)`)

    if (enable) {
      return this._enableStartBot()
    }
    return this._disableStartBot('No pages selected, reset and preview the filter')
  }

  _setBotToken() {
    const date = new Date()
    const token = `${date.getTime()}`
    this.botToken = token
    localStorage.setItem('WikiMonkeyBotToken', token)
  }

  _resetBotToken(reset) {
    this.botToken = '0'
    if (reset) {
      localStorage.setItem('WikiMonkeyBotToken', '0')
    }
  }

  _getBotToken() {
    return this.botToken
  }

  _checkOtherBotsRunning() {
    const value = localStorage.getItem('WikiMonkeyBotToken')

    // Value may be null if it's never been stored in localStorage
    return value && value !== '0' && value !== this._getBotToken()
  }

  _startAutomatic() { // eslint-disable-line max-statements
    if (this._checkOtherBotsRunning() && !this._canForceStart()) {
      WM.App.log.error(`It's not possible to start the bot (without
  forcing it) for one of the following reasons:<br>
  * another bot instance is currently running<br>
  * a previously running bot has stopped due to a
  page processing error<br>
  * a previously running bot has stopped due to a
  Javascript error<br>
  * a previously running bot has been interrupted by
  a browser page refresh`)
      return this._enableForceStart()
    } else if (this.makeFilters()) {
      let itemsDOM
      if (this.configuration.list.current[0].nodeName === 'TBODY') {
        itemsDOM = this.configuration.list.current[0]
          .getElementsByTagName('td')
      } else {
        itemsDOM = this.configuration.list.current[0]
          .getElementsByTagName('li')
      }

      // Passing the live collection with the callback function was
      //   causing it to be lost in an apparently random manner
      const items = []

      for (const item of itemsDOM) {
        items.push(item)
      }

      const linkId = this.configuration.list.current[1]

      this._disableForceStart()
      this._setBotToken()
      WM.App.log.info('Starting bot ...')
      WM.App.log.hidden(`Plugin: ${this.configuration.pluginName}`)
      WM.App.log.hidden(`Filter: ${document.getElementById('WikiMonkeyBotFilter').value}`)
      this._disableStartBot('Bot is running ...')
      this._disableControls()
      this.configuration.visited = []

      this.configuration.interval = WM.MW.isUserBot() ? 3000 : 30000
      return this._processItem(0, items, 0, linkId, null)
    }
  }

  makeCallContinue(lis, id, linkId, ln, article) { // eslint-disable-line max-params
    const self = this
    return function (status, resArgs) {
      switch (status) {
      // The article hasn't been saved
      case 0:
        ln.className = self.changeWikiMonkeyLinkClassName(ln.className, classes.botUnchanged)
        WM.App.log.info(`${WM.App.log.WikiLink(article, article)
        } processed (unchanged)`)
        id++
        self._processItem(status, lis, id, linkId, resArgs)
        break
        // The article has been saved
      case 1:
        ln.className = self.changeWikiMonkeyLinkClassName(ln.className, classes.botChanged)
        WM.App.log.info(`${WM.App.log.WikiLink(article, article)
        } processed (changed)`)
        id++
        self._processItem(status, lis, id, linkId, resArgs)
        break
        // The plugin has encountered a protectedpage error
      case 'protectedpage':
        ln.className = self.changeWikiMonkeyLinkClassName(ln.className, classes.botBypassed)
        WM.App.log.warning(`${'This user doesn\'t have the rights to ' +
                                      'edit '}${WM.App.log.WikiLink(
          article,
          article
        )}, bypassing it ...`)
        id++
        // Change status to 0 (page not changed)
        self._processItem(0, lis, id, linkId, resArgs)
        break
        // The plugin has encountered a critical error
      default:
        ln.className = self.changeWikiMonkeyLinkClassName(ln.className, classes.botFailed)
        WM.App.log.error(`Error processing ${
          WM.App.log.WikiLink(article, article)
        }, stopping the bot`)
        return self._endAutomatic(true)
      }
    }
  }

  _processItem(status, items, index, linkId, chainArgs) { // eslint-disable-line max-lines-per-function,max-statements,max-params
    const self = this
    if (items[index]) {
      const link = items[index].getElementsByTagName('a')[linkId]

      // Also test 'link' itself, because the list item could refer to an
      // invalid title, represented by e.g.
      // <span class="mw-invalidtitle">Invalid title with namespace
      // "Category" and text ""</span>
      if (link && this.canProcessPage(link)) {
        let interval
        const {title} = link

        if (status === 0) {
          interval = 1000
        } else {
          ({interval} = this.configuration)
        }

        WM.App.log.info(`Waiting ${interval / 1000}` + ' seconds ...')

        const stopId = setTimeout(((lis, id, ln, article, chainArgs) => function () { // eslint-disable-line max-params
          // Stop must be disabled before any check is performed
          self._disableStopBot()

          // Check here if other bots have been started,
          // _not_ before setTimeout!
          if (!self._checkOtherBotsRunning()) {
            ln.className = self.changeWikiMonkeyLinkClassName(ln.className, classes.botProcessing)
            WM.App.log.info(`Processing ${
              WM.App.log.WikiLink(article, article)
            } ...`)

            return self.configuration.function_(
              article,
              self.makeCallContinue(lis, id, linkId, ln, article),
              chainArgs
            )
          }
          WM.App.log.error('Another bot has been ' +
                                                  'force-started, stopping ...')
          return self._endAutomatic(false)
        }
        )(items, index, link, title, chainArgs), interval)

        return this._enableStopBot(stopId)
      }
      index++
      return this._processItem(status, items, index, linkId, chainArgs)
    }
    return this._endAutomatic(true)
  }

  _endAutomatic(reset) {
    this._resetBotToken(reset)
    WM.App.log.info('Bot operations completed (check the log for ' +
                                                          'warnings or errors)')
    this._disableStartBot('Bot operations completed, reset and preview ' +
                                                                  'the filter')
    return this._reEnableControls()
  }
}
