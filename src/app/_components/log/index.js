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

const {Vuex, styled} = require('%/lib/index')
const colors = require('%/app/_components/styled/colors')

const LogFilter = require('./LogFilter')
const Export = require('./Export')
const Message = require('./Message')

const MessageContainer = styled.div({
  height: '10em',
  border: `2px solid ${colors.blueBorder}`,
  padding: '0.5em',
  overflow: 'auto',
  resize: 'vertical',
  backgroundColor: colors.blackBackground,
})

module.exports = {
  name: 'Log',

  computed: Vuex.mapState('log', [
    'display',
    'minLevel',
    'messages',
  ]),

  render(h) {
    if (!this.display) {
      return null
    }

    return h('div', [
      h('p', [
        '[ ',
        h(LogFilter),
        ' | ',
        h(Export),
        ' ]',
      ]),
      h(
        MessageContainer,
        {ref: 'logArea'},
        this.messages.reduce((acc, {text, level, tstamp}, index) => {
          if (level >= this.minLevel) {
            acc.push(h(
              Message,
              {props: {text, level, tstamp, index}}
            ))
          }
          return acc
        }, [])
      ),
    ])
  },

  beforeUpdate() {
    const {logArea} = this.$refs
    // LogArea may not exist when the log is hidden
    if (logArea) {
      this.isScrolledToBottom = logArea.scrollTop + logArea.clientHeight ===
                logArea.scrollHeight
    }
  },

  updated() {
    if (this.isScrolledToBottom) {
      const {logArea} = this.$refs
      // LogArea may not exist when the log is hidden
      if (logArea) {
        logArea.scrollTop = logArea.scrollHeight - logArea.clientHeight
      }
    }
  },
}
