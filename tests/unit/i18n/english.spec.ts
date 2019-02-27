import { expect } from 'chai'
import en from '../../../src/locale/en'

describe('english messages', () => {
  it('toolbar messages', () => {
    expect(en.toolbar.login).to.eq('Login')
    expect(en.toolbar.logout).to.eq('Logout')
  })
})
