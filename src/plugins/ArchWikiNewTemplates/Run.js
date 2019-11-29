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


module.exports = class {
  constructor(conf, callNext) {
    const source = WM.Editor.readSource()
    let newtext = source

    const re8 = /<pre>(((?!<(pre|nowiki)>)[^\=\|])*?((?!<(pre|nowiki)>)[^\=\|\}]))<\/pre>/ig
    const re9 = /<pre>(((?!<(pre|nowiki)>)[^\|])*?((?!<(pre|nowiki)>)[^\|\}]))<\/pre>/ig
    const re10 = /<pre>(\n*((?!<(pre|nowiki)>).\n*)+?)<\/pre>/ig

    const re11 = /<code>(((?!<(code|nowiki)>)[^\=\|\n])*?((?!<(code|nowiki)>)[^\=\|\}\n]))<\/code>/ig
    const re12 = /<code>(((?!<(code|nowiki)>)[^\|\n])*?((?!<(code|nowiki)>)[^\|\}\n]))<\/code>/ig
    const re13 = /<code>(((?!<(code|nowiki)>)[^\n])+?)<\/code>/ig

    const re14 = /<tt>(((?!<(tt|nowiki)>)[^\=\|\n])*?((?!<(tt|nowiki)>)[^\=\|\}\n]))<\/tt>/ig
    const re15 = /<tt>(((?!<(tt|nowiki)>)[^\|\n])*?((?!<(tt|nowiki)>)[^\|\}\n]))<\/tt>/ig
    const re16 = /<tt>(((?!<(tt|nowiki)>)[^\n])+?)<\/tt>/ig

    newtext = newtext.replace(re8, '{{bc|$1}}')
    newtext = newtext.replace(re9, '{{bc|1=$1}}') // Must come after re8
    newtext = newtext.replace(
      re10,
      '{{bc|<nowiki>$1</nowiki>}}'
    ) // Must come after re9

    newtext = newtext.replace(re11, '{{ic|$1}}')
    newtext = newtext.replace(re12, '{{ic|1=$1}}') // Must come after re11
    newtext = newtext.replace(
      re13,
      '{{ic|<nowiki>$1</nowiki>}}'
    ) // Must come after re12

    newtext = newtext.replace(re14, '{{ic|$1}}')
    newtext = newtext.replace(re15, '{{ic|1=$1}}') // Must come after re14
    newtext = newtext.replace(
      re16,
      '{{ic|<nowiki>$1</nowiki>}}'
    ) // Must come after re15

    if (newtext !== source) {
      WM.Editor.writeSource(newtext)
      WM.App.log.info('Turned HTML tags into proper templates')
    }

    const tests = [
      ['&lt;pre>', newtext.match(/<pre/ig)],
      ['&lt;code>', newtext.match(/<code/ig)],
      ['&lt;tt>', newtext.match(/<tt/ig)],
    ]

    for (const test of tests) {
      if (test[1]) {
        WM.App.log.warning(`${test[1].length} ${
          test[0]} instances require manual intervention`)
      }
    }

    if (callNext) {
      return callNext()
    }
  }
}
