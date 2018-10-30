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


module.exports = class {
  constructor(conf, callNext) {
    const source = WM.Editor.readSource()
    let newtext = source

    // Ignoring "I" since writing in 1st person isn't formal anyway
    // Note that JavaScript doesn't support look behind :(
    // Pay attention to preserve the original capitalization

    newtext = this.replace(newtext, /([a-z])'re/ig, '$1 are', '\'re', ['are'])
    newtext = this.replace(newtext, /([a-z])'ve/ig, '$1 have', '\'ve', ['have'])
    newtext = this.replace(
      newtext, /([a-z])'ll/ig, '$1 will', '\'ll',
      ['will', 'shall']
    )
    newtext = this.replace(
      newtext, /([a-z])'d/ig, '$1 would', '\'d',
      ['would', 'had']
    )
    newtext = this.replace(
      newtext, /(c)an't/ig, '$1annot', 'can\'t',
      ['cannot']
    )
    newtext = this.replace(
      newtext, /(w)on't/ig, '$1ill not', 'won\'t',
      ['will not']
    )
    newtext = this.replace(newtext, /([a-z])n't/ig, '$1 not', 'n\'t', ['not'])
    newtext = this.replace(
      newtext, /(here|there)'s/ig, '$1 is',
      'here/there\'s',
      ['here/there is', 'here/there has']
    )
    newtext = this.replace(
      newtext, /(g)onna/ig, '$1oing to', 'gonna',
      ['going to']
    )
    // Replacing he's, she's, that's, what's, where's, who's ... may be too
    //   dangerous
    newtext = this.replace(
      newtext, /([a-z])'s (been)/ig, '$1 has $2',
      '\'s been', ['has been']
    )
    newtext = this.replace(newtext, /(let)'s/ig, '$1 us', 'let\'s', ['let us'])
    newtext = this.replace(
      newtext, /(it)'(s own)/ig, '$1$2', 'it\'s own',
      ['its own']
    )

    const ss = newtext.match(/[a-z]'s/gi)
    if (ss) {
      WM.App.log.warning(`Found ${ss.length} instances of "'s": ` +
                    'check if they can be replaced with "is", "has", ...')
    }

    if (newtext !== source) {
      WM.Editor.writeSource(newtext)
      WM.App.log.info('Expanded contractions')
    }

    if (callNext) {
      return callNext()
    }
  }

  replace(source, regExp, newString, checkString, checkStrings) {
    const newtext = source.replace(regExp, newString)
    if (checkStrings.length > 1 && newtext !== source) {
      WM.App.log.warning(`Replaced some \"${checkString}\" with \
\"${checkStrings[0]}\": check that it didn't \
mean \"${checkStrings.slice(1).join('\" or \"')}\" \
instead`)
    }
    return newtext
  }
}
