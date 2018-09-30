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

const {Vue, Vuex} = require('../../../modules/libs')


module.exports.popoverConfirm = {
  name: 'popoverConfirm',

  data() {
    return {
      // TODO: Besides after clicking on the "cancel" or "confirm" buttons,
      //       the popper should disappear also when clicking anywhere else on
      //       the screen, and that would be the default behavior with the
      //       'trigger:click' prop of ElPopover, however I have to use
      //       'trigger:manual', and since I'm not using the Vue templates,
      //       I'd have to reimplement the functionality by myself
      //       https://github.com/ElemeFE/element/blob/dev/packages/popover/src/main.vue
      //       https://vuejs.org/v2/guide/render-function.html#v-model
      visible: false,
    }
  },

  props: {
    tooltip: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    textConfirm: {
      type: String,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    textCancel: {
      type: String,
      required: true,
    },
  },

  methods: {
    showPopper() {
      this.visible = true
    },
    hidePopper() {
      this.visible = false
    },
  },

  render(h) {
    return h('ElPopover', {
      props: {
        value: this.visible,
        trigger: 'manual',
      },
    }, [
      h('p', [this.question]),
      h('div', [
        h('ElButton', {
          props: {
            size: 'mini',
            type: 'text',
          },
          on: {click: this.hidePopper},
        }, [this.textCancel]),
        h('ElButton', {
          props: {
            type: 'primary',
            size: 'mini',
          },
          on: {click: async (event) => {
            await this.onConfirm()
            this.hidePopper(event)
          }},
        }, [this.textConfirm]),
      ]),
      h('ElButton', {
        slot: 'reference',
        attrs: {title: this.tooltip},
        props: {
          icon: 'el-icon-delete',
          size: 'mini',
          type: 'text',
        },
        on: {click: this.showPopper},
      }),
    ])
  },
}
