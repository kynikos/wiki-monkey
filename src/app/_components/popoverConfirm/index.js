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

const {Vue, Vuex} = require('../../../lib/index')

// TODO: Adding a "cancel" button, waiting to close the popover until the
//       async operation has completed, and in general managing the 'visible'
//       state of the popover manually using the 'trigger:manual' prop is
//       tricky, especially because it breaks the default behavior of making
//       the popover disappear if clicking outside of it because I'm not using
//       the Vue templates, so I should reimplement the functionality by myself
//       https://github.com/ElemeFE/element/blob/dev/packages/popover/src/main.vue
//       https://vuejs.org/v2/guide/render-function.html#v-model
//       https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element


module.exports.popoverConfirm = {
  name: 'popoverConfirm',

  // TODO: See note at the top of the file
  // data() {
  //   return {
  //     visible: false,
  //   }
  // },

  props: {
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
    // TODO: See note at the top of the file
    // textCancel: {
    //   type: String,
    //   required: true,
    // },
  },

  // TODO: See note at the top of the file
  // methods: {
  //   showPopper() {
  //     this.visible = true
  //   },
  //   hidePopper() {
  //     this.visible = false
  //   },
  // },

  render(h) {
    return h('ElPopover', {
      // TODO: See note at the top of the file
      // props: {
      //   value: this.visible,
      //   trigger: 'manual',
      // },
    }, [
      h('div', [this.question]),
      h('div', [
        '[ ',
        h('a', {
          attrs: {href: '#'},
          on: {click: (event) => {
            event.preventDefault()
            this.onConfirm()
            // TODO: See note at the top of the file
            // await this.onConfirm()
            // this.hidePopper(event)
          }},
        }, [this.textConfirm]),
        // TODO: See note at the top of the file
        // ' | ',
        // h('a', {
        //   attrs: {href: '#'},
        //   on: {click: (event) => {
        //     event.preventDefault()
        //     this.hidePopper()
        //   }},
        // }, [this.textCancel]),
        ' ]',
      ]),
      h('span', {
        slot: 'reference',
        // TODO: See note at the top of the file
        // on: {click: this.showPopper},
      }, this.$slots.default),
    ])
  },
}
