import es from '../../../src/locale/es'
import en from '../../../src/locale/en'

describe('Guest user homepage', () => {
  before(() => {
    cy.visit('/')
  })

  context('a toolbar', () => {
    it('toolbar title', () => {
      cy.get('.v-toolbar__title').contains('Pressurizer')
    })

    it('toolbar login button link', () => {
      cy.get('.v-btn')
        .should('have.attr', 'href')
        .then((href) => {
          expect(href).to.eq(`${Cypress.env('BACKEND')}/login`)
        })
    })

    it('change language to spanish', () => {
      cy.get('.v-menu')
        .click()
        .find('.v-list > :nth-child(2)')
        .trigger('mouseover')
        .wait(100)
        .click()
        .then(() => {
          cy.get('.v-toolbar__items > .v-btn:first-child')
            .contains(es.toolbar.login)
        })
    })

    it('change language to english', () => {
      cy.get('.v-menu')
        .click()
        .find('.v-list > :nth-child(1)')
        .trigger('mouseover')
        .wait(100)
        .click()
        .then(() => {
          cy.get('.v-toolbar__items > .v-btn:first-child')
            .contains(en.toolbar.login)
        })
    })
  })
})
