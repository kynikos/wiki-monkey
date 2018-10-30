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

const {ClipboardJS} = require('./index')


module.exports.enable = function (element) {
  const clipboard = new ClipboardJS(element)
  clipboard.on('success', () => mw.notification.notify(
    `\"${element.getAttribute('data-clipboard-text')}\" \
successfully copied to the clipboard.`,
    {
      title: 'Wiki Monkey',
      type: 'info',
    }
  ))
  return clipboard.on('error', () => mw.notification.notify(
    'Could not copy to the clipboard.',
    {
      title: 'Wiki Monkey',
      type: 'error',
    }
  ))
}
