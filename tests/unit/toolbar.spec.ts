import { expect } from 'chai'
import { mount, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Toolbar from '@/components/Toolbar.vue'
import { i18n } from '@/locale/i18n'
import store from '@/store'

Vuetify.install(Vue)

describe('Toolbar.vue', () => {
  let toolbarWrapper: Wrapper<Toolbar>

  before(() => {
    toolbarWrapper = mount(Toolbar, {
      i18n,
      store,
      stubs: ['router-link'],
    })
  })

  beforeEach(() => {
    i18n.locale = 'en'
  })

  it('toolbar title', () => {
    const toolbarTitle = toolbarWrapper.find('.v-toolbar__title')
    expect(toolbarTitle.text()).to.eq('Pressurizer')
  })

  it('at least one button', () => {
    const toolbarItems = toolbarWrapper.find('.v-toolbar__items')
    expect(toolbarItems.element.childElementCount).to.be.greaterThan(0)
  })

  it('first button is login', () => {
    const toolbarItems = toolbarWrapper.find('.v-toolbar__items')
    const loginButton = toolbarItems.element.firstElementChild!
    expect(loginButton.textContent!.trim()).to.eq('Login')
    i18n.locale = 'es'
    expect(loginButton.textContent!.trim()).to.eq('Acceder')
  })

  it('if logged, logout button must appear', async () => {
    await store.dispatch('token', 'token_test')
    const toolbarItems = toolbarWrapper.find('.v-toolbar__items')
    const loginButton = toolbarItems.element.children.item(3)!
    expect(loginButton.textContent!.trim()).to.eq('Logout')
    i18n.locale = 'es'
    expect(loginButton.textContent!.trim()).to.eq('Salir')
    await store.dispatch('token', '')
  })

  it('if logged, first button is update games', async () => {
    await store.dispatch('token', 'token_test')
    const toolbarItems = toolbarWrapper.find('.v-toolbar__items')
    const loginButton = toolbarItems.element.firstElementChild!
    expect(loginButton.textContent!.trim()).to.eq('Update games')
    i18n.locale = 'es'
    expect(loginButton.textContent!.trim()).to.eq('Actualizar juegos')
    await store.dispatch('token', '')
  })
})
