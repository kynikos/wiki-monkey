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

/* eslint-disable no-await-in-loop */

import WM from '%/index'
import processLink from './processLink'
import processArchWikiLink from './processArchWikiLink'


export default async function run(conf, callNext) {
  const source = WM.Editor.readSource()
  WM.App.log.info('Fixing links to sections of other articles ...')
  const title = WM.Editor.getTitle()
  const res = await WM.MW.getInterwikiMap(title)
  const iwprefixes = res.query.interwikimap.map((iw) => iw.prefix)
  const links = WM.Parser.findInternalLinks(source, null, null)
  let newText = source

  for (const link of links) {
    newText = await processLink({
      title,
      iwprefixes,
      link,
      newText,
    })
  }

  // Without this test this plugin would be specific to ArchWiki
  if (location.hostname === 'wiki.archlinux.org') {
    for (const template of WM.Parser.findTemplates(newText, 'Related')) {
      newText = await processArchWikiLink({
        title,
        template,
        expectedArgs: 1,
        newText,
      })
    }

    for (const template of WM.Parser.findTemplates(newText, 'Related2')) {
      newText = await processArchWikiLink({
        title,
        template,
        expectedArgs: 2,
        newText,
      })
    }
  }

  if (newText === source) {
    WM.App.log.info('No fixable links to sections of other articles found')
  } else {
    WM.Editor.writeSource(newText)
    WM.App.log.info('Replaced links to sections of other articles')
  }

  return callNext && callNext()
}
