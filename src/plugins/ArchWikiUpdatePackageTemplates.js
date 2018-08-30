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

const WM = require('../modules')
const App = require('../app')
const {Plugin} = require('./_Plugin')


const Cls = module.exports.ArchWikiUpdatePackageTemplates = class ArchWikiUpdatePackageTemplates extends Plugin {
  constructor(...args) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super() }
      const thisFn = (() => { return this }).toString()
      const thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim()
      eval(`${thisName} = this;`)
    }
    this.doUpdate = this.doUpdate.bind(this)
    this.doUpdateContinue = this.doUpdateContinue.bind(this)
    this.doUpdateContinue2 = this.doUpdateContinue2.bind(this)
    this.checkOfficial = this.checkOfficial.bind(this)
    this.checkOfficiallc = this.checkOfficiallc.bind(this)
    this.checkAUR = this.checkAUR.bind(this)
    this.checkAURlc = this.checkAURlc.bind(this)
    this.checkGroup64 = this.checkGroup64.bind(this)
    this.checkGroup64lc = this.checkGroup64lc.bind(this)
    this.checkGroup32 = this.checkGroup32.bind(this)
    this.checkGroup32lc = this.checkGroup32lc.bind(this)
    this.checkOfficial2 = this.checkOfficial2.bind(this)
    this.checkOfficiallc2 = this.checkOfficiallc2.bind(this)
    this.checkAUR2 = this.checkAUR2.bind(this)
    this.checkAURlc2 = this.checkAURlc2.bind(this)
    this.checkGroup64_2 = this.checkGroup64_2.bind(this)
    this.checkGroup64lc2 = this.checkGroup64lc2.bind(this)
    this.checkGroup32_2 = this.checkGroup32_2.bind(this)
    this.checkGroup32lc2 = this.checkGroup32lc2.bind(this)
    this.doUpdateContinue3 = this.doUpdateContinue3.bind(this)
    this.mainEnd = this.mainEnd.bind(this)
    this.mainAutoReplace = this.mainAutoReplace.bind(this)
    this.mainAutoWrite = this.mainAutoWrite.bind(this)
    this.mainAutoEnd = this.mainAutoEnd.bind(this)
    super(...args)
  }

  static initClass() {
    this.conf_default = {
      // TODO: Disabled because the ArchPackages module is currently unusable
      enabled: false,
      editor_menu: ['Query plugins', 'Update package templates'],
      bot_label: 'Check packages linked with Pkg/AUR templates and \
possibly update them',
      edit_summary: 'update Pkg/AUR templates to reflect new package status',
    }
  }

  doUpdate(source, call, callArgs) {
    // Note that findTemplatesPattern puts the pattern in a capturing group
    //   (parentheses) by itself
    const templates = WM.Parser.findTemplatesPattern(
      source,
      '[Pp]kg|[Aa]ur|AUR|[Gg]rp'
    )
    const newText = ''

    if (templates.length > 0) {
      return this.doUpdateContinue(source, newText, templates, 0, call, callArgs)
    }
    return call(source, source, callArgs)
  }

  doUpdateContinue(source, newText, templates, index, call, callArgs) {
    App.log.info(`Processing ${templates[index].rawTransclusion}` +
                                                                    ' ...')

    newText += source.substring(

      index === 0 ? 0 : templates[index - 1].index +
                                templates[index - 1].length,
      templates[index].index
    )

    switch (templates[index].title.toLowerCase()) {
    case 'pkg':
      return this.doUpdateContinue2(
        // Checks must be in reversed order because they are popped
        [this.checkGroup32lc,
          this.checkGroup32,
          this.checkGroup64lc,
          this.checkGroup64,
          this.checkAURlc,
          this.checkAUR,
          this.checkOfficiallc,
          this.checkOfficial],
        source, newText, templates, index, call, callArgs
      )
    case 'aur':
      return this.doUpdateContinue2(
        // Checks must be in reversed order because they are popped
        [this.checkGroup32lc,
          this.checkGroup32,
          this.checkGroup64lc,
          this.checkGroup64,
          this.checkOfficiallc,
          this.checkOfficial,
          this.checkAURlc,
          this.checkAUR],
        source, newText, templates, index, call, callArgs
      )
    case 'grp':
      return this.doUpdateContinue2(
        // Checks must be in reversed order because they are popped
        [this.checkAURlc,
          this.checkAUR,
          this.checkOfficiallc,
          this.checkOfficial,
          this.checkGroup32lc,
          this.checkGroup32,
          this.checkGroup64lc,
          this.checkGroup64],
        source, newText, templates, index, call, callArgs
      )
    default:
      newText += templates[index].rawTransclusion
      return this.doUpdateContinue3(source, newText, templates, index, call, callArgs)
    }
  }

  doUpdateContinue2(
    checks, source, newText, templates,
    index, call, callArgs
  ) {
    const check = checks.pop()

    if (check) {
      return check(checks, source, newText, templates, index, call, callArgs)
    }
    const pkg = templates[index].arguments[0].value.trim()
    App.log.warning(`${pkg
    } hasn't been found neither in the official ` +
                        'repositories nor in the AUR nor as a package group')
    App.log.json(
      'Plugins.ArchWikiUpdatePackageTemplates',
      {
        error: 'notfound',
        page: callArgs[0],
        pagelanguage: WM.ArchWiki.detectLanguage(callArgs[0])[1],
        package: pkg,
      }
    )

    newText += templates[index].rawTransclusion

    return this.doUpdateContinue3(
      source,
      newText, templates, index, call, callArgs
    )
  }

  checkOfficial(
    checks, source, newText, templates, index,
    call, callArgs
  ) {
    const pkgname = templates[index].arguments[0].value.trim()
    App.log.info(`Looking for ${pkgname}` +
                                        ' in the official repositories ...')

    return WM.ArchPackages.isOfficialPackage(
      pkgname,
      this.checkOfficial2,
      [checks, source, newText, templates, index, call, callArgs]
    )
  }

  checkOfficiallc(
    checks, source, newText, templates, index,
    call, callArgs
  ) {
    const pkgname = templates[index].arguments[0].value.trim()

    if (pkgname.toLowerCase() !== pkgname) {
      App.log.info(`Looking for ${pkgname.toLowerCase()}` +
                            ' (lowercase) in the official repositories ...')

      return WM.ArchPackages.isOfficialPackage(
        pkgname.toLowerCase(),
        this.checkOfficiallc2,
        [checks, source, newText, templates, index, call, callArgs]
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkAUR(checks, source, newText, templates, index, call, callArgs) {
    const pkgname = templates[index].arguments[0].value.trim()
    App.log.info(`Looking for ${pkgname} in the AUR ...`)

    return WM.ArchPackages.isAURPackage(
      pkgname,
      this.checkAUR2,
      [checks, source, newText, templates, index, call, callArgs]
    )
  }

  checkAURlc(checks, source, newText, templates, index, call, callArgs) {
    const pkgname = templates[index].arguments[0].value.trim()

    if (pkgname.toLowerCase() !== pkgname) {
      App.log.info(`Looking for ${pkgname.toLowerCase()}` +
                                                ' (lowercase) in the AUR ...')

      return WM.ArchPackages.isAURPackage(
        pkgname.toLowerCase(),
        this.checkAURlc2,
        [checks, source, newText, templates, index, call, callArgs]
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkGroup64(
    checks, source, newText, templates, index,
    call, callArgs
  ) {
    const grpname = templates[index].arguments[0].value.trim()
    App.log.info(`Looking for ${grpname}` +
                                            ' as an x86_64 package group ...')

    return WM.ArchPackages.isPackageGroup64(
      grpname,
      this.checkGroup64_2,
      [checks, source, newText, templates, index, call, callArgs]
    )
  }

  checkGroup64lc(
    checks, source, newText, templates, index,
    call, callArgs
  ) {
    const grpname = templates[index].arguments[0].value.trim()

    if (grpname.toLowerCase() !== grpname) {
      App.log.info(`Looking for ${grpname.toLowerCase()}` +
                                ' (lowercase) as an x86_64 package group ...')

      return WM.ArchPackages.isPackageGroup64(
        grpname.toLowerCase(),
        this.checkGroup64lc2,
        [checks, source, newText, templates, index, call, callArgs]
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkGroup32(
    checks, source, newText, templates, index,
    call, callArgs
  ) {
    const grpname = templates[index].arguments[0].value.trim()
    App.log.info(`Looking for ${grpname}` +
                                            ' as an i686 package group ...')

    return WM.ArchPackages.isPackageGroup32(
      grpname,
      this.checkGroup32_2,
      [checks, source, newText, templates, index, call, callArgs]
    )
  }

  checkGroup32lc(
    checks, source, newText, templates, index,
    call, callArgs
  ) {
    const grpname = templates[index].arguments[0].value.trim()

    if (grpname.toLowerCase() !== grpname) {
      App.log.info(`Looking for ${grpname.toLowerCase()}` +
                                ' (lowercase) as an i686 package group ...')

      return WM.ArchPackages.isPackageGroup32(
        grpname.toLowerCase(),
        this.checkGroup32lc2,
        [checks, source, newText, templates, index, call, callArgs]
      )
    }
    return this.doUpdateContinue2(
      checks, source, newText, templates, index, call,
      callArgs
    )
  }

  checkOfficial2(res, args) {
    const checks = args[0]
    const source = args[1]
    let newText = args[2]
    const templates = args[3]
    const index = args[4]
    const call = args[5]
    const callArgs = args[6]

    const template = templates[index]
    const pkgname = template.arguments[0].value.trim()

    if (res) {
      if (template.title.toLowerCase() !== 'pkg') {
        const newtemplate = `{{Pkg|${pkgname}}}`
        newText += newtemplate
        App.log.info(`Replacing template with ${newtemplate}`)
      } else {
        newText += template.rawTransclusion
      }

      return this.doUpdateContinue3(
        source,
        newText, templates, index, call, callArgs
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkOfficiallc2(res, args) {
    const checks = args[0]
    const source = args[1]
    let newText = args[2]
    const templates = args[3]
    const index = args[4]
    const call = args[5]
    const callArgs = args[6]

    const template = templates[index]
    const pkgname = template.arguments[0].value.trim()

    if (res) {
      const newtemplate = `{{Pkg|${pkgname.toLowerCase()}}}`
      newText += newtemplate
      App.log.info(`Replacing template with ${newtemplate}`)

      return this.doUpdateContinue3(
        source,
        newText, templates, index, call, callArgs
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkAUR2(res, args) {
    const checks = args[0]
    const source = args[1]
    let newText = args[2]
    const templates = args[3]
    const index = args[4]
    const call = args[5]
    const callArgs = args[6]

    const template = templates[index]
    const pkgname = template.arguments[0].value.trim()

    if (res) {
      if (template.title.toLowerCase() !== 'aur') {
        const newtemplate = `{{AUR|${pkgname}}}`
        newText += newtemplate
        App.log.info(`Replacing template with ${newtemplate}`)
      } else {
        newText += template.rawTransclusion
      }

      return this.doUpdateContinue3(
        source,
        newText, templates, index, call, callArgs
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkAURlc2(res, args) {
    const checks = args[0]
    const source = args[1]
    let newText = args[2]
    const templates = args[3]
    const index = args[4]
    const call = args[5]
    const callArgs = args[6]

    const template = templates[index]
    const pkgname = template.arguments[0].value.trim()

    if (res) {
      const newtemplate = `{{AUR|${pkgname.toLowerCase()}}}`
      newText += newtemplate
      App.log.info(`Replacing template with ${newtemplate}`)

      return this.doUpdateContinue3(
        source,
        newText, templates, index, call, callArgs
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkGroup64_2(res, args) {
    const checks = args[0]
    const source = args[1]
    let newText = args[2]
    const templates = args[3]
    const index = args[4]
    const call = args[5]
    const callArgs = args[6]

    const template = templates[index]
    const grpname = template.arguments[0].value.trim()

    if (res) {
      if (template.title.toLowerCase() !== 'grp') {
        const newtemplate = `{{Grp|${grpname}}}`
        newText += newtemplate
        App.log.info(`Replacing template with ${newtemplate}`)
      } else {
        newText += template.rawTransclusion
      }

      return this.doUpdateContinue3(
        source,
        newText, templates, index, call, callArgs
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkGroup64lc2(res, args) {
    const checks = args[0]
    const source = args[1]
    let newText = args[2]
    const templates = args[3]
    const index = args[4]
    const call = args[5]
    const callArgs = args[6]

    const template = templates[index]
    const grpname = template.arguments[0].value.trim()

    if (res) {
      const newtemplate = `{{Grp|${grpname.toLowerCase()}}}`
      newText += newtemplate
      App.log.info(`Replacing template with ${newtemplate}`)

      return this.doUpdateContinue3(
        source,
        newText, templates, index, call, callArgs
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkGroup32_2(res, args) {
    const checks = args[0]
    const source = args[1]
    let newText = args[2]
    const templates = args[3]
    const index = args[4]
    const call = args[5]
    const callArgs = args[6]

    const template = templates[index]
    const grpname = template.arguments[0].value.trim()

    if (res) {
      newText += template.rawTransclusion
      App.log.warning(`${grpname} is a package group for i686 only, ` +
                                    'and Template:Grp only supports x86_64')
      App.log.json(
        'Plugins.ArchWikiUpdatePackageTemplates',
        {
          error: 'group64',
          page: callArgs[0],
          pagelanguage: WM.ArchWiki.detectLanguage(callArgs[0])[1],
          package: grpname,
        }
      )
      return this.doUpdateContinue3(
        source,
        newText, templates, index, call, callArgs
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  checkGroup32lc2(res, args) {
    const checks = args[0]
    const source = args[1]
    let newText = args[2]
    const templates = args[3]
    const index = args[4]
    const call = args[5]
    const callArgs = args[6]

    const template = templates[index]
    const grpname = template.arguments[0].value.trim()

    if (res) {
      newText += template.rawTransclusion
      App.log.warning(`${grpname} is a package group for i686 only, ` +
                                    'and Template:Grp only supports x86_64')
      App.log.json(
        'Plugins.ArchWikiUpdatePackageTemplates',
        {
          error: 'group64',
          page: callArgs[0],
          pagelanguage: WM.ArchWiki.detectLanguage(callArgs[0])[1],
          package: grpname,
        }
      )
      return this.doUpdateContinue3(
        source,
        newText, templates, index, call, callArgs
      )
    }
    return this.doUpdateContinue2(
      checks,
      source, newText, templates, index, call, callArgs
    )
  }

  doUpdateContinue3(source, newText, templates, index, call, callArgs) {
    index++

    if (templates[index]) {
      return this.doUpdateContinue(
        source,
        newText, templates, index, call, callArgs
      )
    }
    newText += source.substring(templates[index - 1].index +
                                                templates[index - 1].length)
    return call(source, newText, callArgs)
  }

  main_editor(callNext) {
    const title = WM.Editor.getTitle()
    const source = WM.Editor.readSource()
    App.log.info('Updating package templates ...')
    return this.doUpdate(source, this.mainEnd, [title, callNext])
  }

  mainEnd(source, newtext, args) {
    const callNext = args[1]

    if (newtext !== source) {
      WM.Editor.writeSource(newtext)
      App.log.info('Updated package templates')
    } else {
      App.log.info('No automatically updatable package templates ' +
                                                                    'found')
    }

    if (callNext) {
      return callNext()
    }
  }

  main_bot(title, callBot, chainArgs) {
    const summary = this.conf.edit_summary

    return WM.MW.callQueryEdit(
      title,
      this.mainAutoReplace,
      [summary, callBot]
    )
  }

  mainAutoReplace(title, source, timestamp, edittoken, args) {
    const summary = args[0]
    const callBot = args[1]

    return this.doUpdate(
      source,
      this.mainAutoWrite,
      [title, edittoken, timestamp, summary, callBot]
    )
  }

  mainAutoWrite(source, newtext, args) {
    const title = args[0]
    const edittoken = args[1]
    const timestamp = args[2]
    const summary = args[3]
    const callBot = args[4]

    if (newtext !== source) {
      return WM.MW.callAPIPost(
        {
          action: 'edit',
          bot: '1',
          title,
          summary,
          text: newtext,
          basetimestamp: timestamp,
          token: edittoken,
        },
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
