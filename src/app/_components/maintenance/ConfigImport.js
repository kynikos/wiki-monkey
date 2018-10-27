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

const WM = require('../../../modules')


module.exports.ConfigImport = {
  name: 'ConfigImport',

  render(h) {
    return h('li', [
      h('a', {
        attrs: {
          href: '#import-local-config',
          title: "Import configuration options (in JSON format) into the \
browser's localStorage; these options override the default ones, but may be \
in turn overridden by any more options specified in the User's common.js \
page; note that the configuration object must have a #default or username \
keys at its root level: it is recommended to export the current local user \
configuration and use it as a template.",
        },
        on: {
          click: (event) => {
            event.preventDefault()
            this.$refs.input.click()
          },
        },
      }, ['Import local user configuration']),
      h('input', {
        ref: 'input',
        attrs: {
          type: 'file',
        },
        style: {
          display: 'none',
        },
        on: {
          change: (event) => {
            const [file] = event.currentTarget.files
            const freader = new FileReader()
            freader.onload = (fileLoadedEvent) => {
              const inFile = fileLoadedEvent.target.result
              let json

              try {
                json = JSON.parse(inFile)
              } catch (error) {
                console.error(error)
                return mw.notification.notify(
                  ["The loaded file could not be parsed as JSON (see the \
detailed error in the browser's console)."],
                  {
                    autoHide: false,
                    tag: 'WikiMonkey-config-import',
                    title: 'Wiki Monkey import configuration.',
                    type: 'error',
                  },
                )
              }
              WM.importLocalConfig(json)
            }
            freader.readAsText(file, 'UTF-8')
          },
        },
      }),
    ])
  },
}
