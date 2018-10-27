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


module.exports.blobLink = {
  name: 'blobLink',

  props: {
    href: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    downloadName: {
      type: String,
      required: false,
    },
  },

  render(h) {
    return h('a', {
      attrs: {
        href: this.href,
        title: this.title,
      },
      on: {
        click: (event) => {
          event.preventDefault()
          const blob = new Blob([this.content], {type: this.mimeType})
          const link = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          link.href = url

          // If link.download is not set, the browser may open the link in
          // another tab, which for e.g. JSON files is good
          if (this.downloadName) {
            link.download = 'WikiMonkeyConfig.json'
          }

          link.style = 'display:none;'
          document.body.appendChild(link)
          link.click()
          // https://stackoverflow.com/a/48968694/645498
          setTimeout(() => {
            window.URL.revokeObjectURL(url)
            document.body.removeChild(link)
          }, 0)
        },
      },
    }, [this.$slots.default])
  },
}
