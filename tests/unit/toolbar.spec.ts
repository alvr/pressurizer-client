import { expect } from 'chai'
import { mount, Wrapper } from '@vue/test-utils'
import Toolbar from '@/components/Toolbar.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'

Vuetify.install(Vue)

describe('Toolbar.vue', () => {
  let toolbarWrapper: Wrapper<any>

  beforeEach(() => {
    toolbarWrapper = mount(Toolbar)
  })

  it('toolbar title', () => {
    const toolbarTitle = toolbarWrapper.find('.v-toolbar__title')
    expect(toolbarTitle.text()).to.eq('Pressurizer')
  })

  it('at least one button', () => {
    const toolbarItems = toolbarWrapper.find('.v-toolbar__items')
    expect(toolbarItems.element.childElementCount).to.not.eq(0)
  })

  it('first button is login', () => {
    const toolbarItems = toolbarWrapper.find('.v-toolbar__items')
    const loginButton = toolbarItems.element.firstElementChild!
    expect(loginButton.textContent).to.eq('Login')
  })
})
