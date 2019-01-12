import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Toolbar from '@/components/Toolbar.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'

Vuetify.install(Vue)

describe('Toolbar.vue', () => {
  it('toolbar title', () => {
    const toolbarWrapper = mount(Toolbar)
    const toolbarTitle = toolbarWrapper.find('.v-toolbar__title')
    expect(toolbarTitle.text()).to.eq('Pressurizer')
  })
})
