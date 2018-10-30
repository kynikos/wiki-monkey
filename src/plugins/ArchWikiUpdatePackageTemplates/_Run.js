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

const WM = require('../../index')
const {_Plugin} = require('../_Plugin')


module.exports = class extends _Plugin {
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
    WM.App.log.info(`Processing ${templates[index].rawTransclusion}` +
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
    WM.App.log.warning(`${pkg
    } hasn't been found neither in the official ` +
                        'repositories nor in the AUR nor as a package group')
    WM.App.log.json(
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
    WM.App.log.info(`Looking for ${pkgname}` +
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
      WM.App.log.info(`Looking for ${pkgname.toLowerCase()}` +
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
    WM.App.log.info(`Looking for ${pkgname} in the AUR ...`)

    return WM.ArchPackages.isAURPackage(
      pkgname,
      this.checkAUR2,
      [checks, source, newText, templates, index, call, callArgs]
    )
  }

  checkAURlc(checks, source, newText, templates, index, call, callArgs) {
    const pkgname = templates[index].arguments[0].value.trim()

    if (pkgname.toLowerCase() !== pkgname) {
      WM.App.log.info(`Looking for ${pkgname.toLowerCase()}` +
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
    WM.App.log.info(`Looking for ${grpname}` +
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
      WM.App.log.info(`Looking for ${grpname.toLowerCase()}` +
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
    WM.App.log.info(`Looking for ${grpname}` +
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
      WM.App.log.info(`Looking for ${grpname.toLowerCase()}` +
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
        WM.App.log.info(`Replacing template with ${newtemplate}`)
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
      WM.App.log.info(`Replacing template with ${newtemplate}`)

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
        WM.App.log.info(`Replacing template with ${newtemplate}`)
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
      WM.App.log.info(`Replacing template with ${newtemplate}`)

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
        WM.App.log.info(`Replacing template with ${newtemplate}`)
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
      WM.App.log.info(`Replacing template with ${newtemplate}`)

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
      WM.App.log.warning(`${grpname} is a package group for i686 only, ` +
                                    'and Template:Grp only supports x86_64')
      WM.App.log.json(
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
      WM.App.log.warning(`${grpname} is a package group for i686 only, ` +
                                    'and Template:Grp only supports x86_64')
      WM.App.log.json(
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
}
