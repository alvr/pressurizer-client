import { expect } from 'chai'
import es from '../../../src/locale/es'

describe('spanish messages', () => {
  it('toolbar messages', () => {
    expect(es.toolbar.login).to.eq('Acceder')
    expect(es.toolbar.logout).to.eq('Salir')
  })
})
