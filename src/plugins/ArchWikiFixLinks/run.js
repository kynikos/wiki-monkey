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


module.exports = function run(conf, callNext) {
  const source = WM.Editor.readSource()
  let txtNew = source

  txtNew = replaceProtocol(txtNew)
  txtNew = replaceInternalLinks(txtNew)
  txtNew = replaceWikipediaLinks(txtNew)
  txtNew = replacePackageLinks(txtNew)
  txtNew = replaceAURLinks(txtNew)
  txtNew = replaceBugLinks(txtNew)

  if (txtNew === source) {
    WM.App.log.info('No fixable links found')
  } else {
    WM.Editor.writeSource(txtNew)
    WM.App.log.info('Fixed links')
  }

  return callNext && callNext()
}


function replaceProtocol(txtOrig) {
  // Archlinux.org HTTP -> HTTPS
  return txtOrig.replace(
    /http:\/\/([a-z]+\.)?archlinux\.org(?!\.[a-z])/ig,
    'https://$1archlinux.org',
  )
}


function replaceInternalLinks(txtOrig) {
  // Wiki.archlinux.org -> Internal link

  const txtNew = txtOrig.replace(
    /\[https?:\/\/wiki\.archlinux\.org\/(?:index\.php|title)\/Category:([^\]]+?) (.+?)\]/ig,
    '[[:Category:$1|$2]]',
  ).replace(
    /\[https?:\/\/wiki\.archlinux\.org\/(?:index\.php|title)\/Category:(.+?)\]/ig,
    '[[:Category:$1]]',
  ).replace(
    /https?:\/\/wiki\.archlinux\.org\/(?:index\.php|title)\/Category:([^\s]+)/ig,
    '[[:Category:$1]]',
  ).replace(
    /\[https?:\/\/wiki\.archlinux\.org\/(?:index\.php|title)\/([^\]]+?) (.+?)\]/ig,
    '[[$1|$2]]',
  ).replace(
    /\[https?:\/\/wiki\.archlinux\.org\/(?:index\.php|title)\/(.+?)\]/ig,
    '[[$1]]',
  ).replace(
    /https?:\/\/wiki\.archlinux\.org\/(?:index\.php|title)\/([^\s]+)/ig,
    '[[$1]]',
  )

  if ((/https?:\/\/wiki\.archlinux\.org(?!\.)/ig).test(txtNew)) {
    WM.App.log.warning(
      'It has not been possible to convert some links to wiki.archlinux.org',
    )
  }

  return txtNew
}


function replaceWikipediaLinks(txtOrig) {
  // Wikipedia -> Wikipedia: interlink

  const txtNew = txtOrig.replace(
    /\[https?:\/\/en\.wikipedia\.org\/wiki\/([^\]]+?) (.+?)\]/ig,
    '[[Wikipedia:$1|$2]]',
  ).replace(
    /\[https?:\/\/en\.wikipedia\.org\/wiki\/(.+?)\]/ig,
    '[[Wikipedia:$1]]',
  ).replace(
    /https?:\/\/en\.wikipedia\.org\/wiki\/([^\s]+)/ig,
    '[[Wikipedia:$1]]',
  ).replace(
    /\[https?:\/\/([a-z]+?)\.wikipedia\.org\/wiki\/([^\]]+?) (.+?)\]/ig,
    '[[Wikipedia:$1:$2|$3]]',
  ).replace(
    /\[https?:\/\/([a-z]+?)\.wikipedia\.org\/wiki\/(.+?)\]/ig,
    '[[Wikipedia:$1:$2]]',
  ).replace(
    /https?:\/\/([a-z]+?)\.wikipedia\.org\/wiki\/([^\s]+)/ig,
    '[[Wikipedia:$1:$2]]',
  )

  if (/https?:\/\/([a-z]+?)\.wikipedia\.org(?!\.)/ig.test(txtNew)) {
    WM.App.log.warning(
      'It has not been possible to convert some links to Wikipedia',
    )
  }

  return txtNew
}


function replacePackageLinks(txtOrig) {
  // Official package links -> Pkg template

  const re = /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/? +(.+?)?\]/ig
  let txtNew = ''
  let prevId = 0

  while (true) {
    const match = re.exec(txtOrig)

    if (match) {
      // Don't join these two conditions
      if (match[1] === match[2]) {
        txtNew += `${txtOrig.substring(prevId, re.lastIndex - match[0].length)
        }{{Pkg|${match[1]}}}`

        prevId = re.lastIndex
      }
    } else {
      break
    }
  }

  txtNew += txtOrig.substr(prevId)

  txtNew = txtNew.replace(
    /\[https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s]+?)\/?\]/ig,
    '{{Pkg|$1}}',
  ).replace(
    /([^\[])https?:\/\/(?:www\.)?archlinux\.org\/packages\/(?:community|community-testing|core|extra|multilib|multilib-testing|testing)\/(?:any|i686|x86_64)\/([^\s\/]+)\/?/ig,
    '$1{{Pkg|$2}}',
  )

  if (/https?:\/\/(?:www\.)?archlinux\.org\/packages(?!\/?\s)/ig.test(txtNew)) {
    WM.App.log.warning(
      'It has not been possible to convert some links to archlinux.org/packages',
    )
  }

  return txtNew
}


function replaceAURLinks(txtOrig) {
  // AUR package links -> AUR template

  const re = /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/? +(.+?)?\]/ig
  let txtNew = ''
  let prevId = 0

  while (true) {
    const match = re.exec(txtOrig)

    if (match) {
      // Don't join these two conditions
      if (match[1] === match[2]) {
        txtNew += `${txtOrig.substring(prevId, re.lastIndex - match[0].length)
        }{{AUR|${match[1]}}}`

        prevId = re.lastIndex
      }
    } else {
      break
    }
  }

  txtNew += txtOrig.substr(prevId)

  txtNew = txtNew.replace(
    /\[https?:\/\/aur\.archlinux\.org\/packages\/([^\s]+?)\/?\]/ig,
    '{{AUR|$1}}',
  ).replace(
    /([^\[])https?:\/\/aur\.archlinux\.org\/packages\/([^\s\/]+)\/?/ig,
    '$1{{AUR|$2}}',
  )

  if (/https?:\/\/aur\.archlinux\.org(?!(?:\.|(?:\/?packages)?\/?\s))/ig.test(txtNew)) {
    WM.App.log.warning(
      'It has not been possible to convert some links to aur.archlinux.org',
    )
  }

  return txtNew
}


function replaceBugLinks(txtOrig) {
  // Bug links -> Bug template

  const re = /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/? +(.+?)?\]/ig
  let txtNew = ''
  let prevId = 0

  while (true) {
    const match = re.exec(txtOrig)

    if (match) {
      // Don't join these two conditions
      if (match[1] === match[2]) {
        txtNew += `${txtOrig.substring(prevId, re.lastIndex - match[0].length)
        }{{Bug|${match[1]}}}`

        prevId = re.lastIndex
      }
    } else {
      break
    }
  }

  txtNew += txtOrig.substr(prevId)

  txtNew = txtNew.replace(
    /\[https?:\/\/bugs\.archlinux\.org\/task\/([^\s]+?)\/?\]/ig,
    '{{Bug|$1}}',
  ).replace(
    /([^\[])https?:\/\/bugs\.archlinux\.org\/task\/([^\s\/]+)\/?/ig,
    '$1{{Bug|$2}}',
  )

  if (/https?:\/\/bugs\.archlinux\.org\/task/ig.test(txtNew)) {
    WM.App.log.warning(
      'It has not been possible to convert some links to bugs.archlinux.org/task',
    )
  }

  return txtNew
}
