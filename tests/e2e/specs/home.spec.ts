import es from '../../../src/locale/es'
import en from '../../../src/locale/en'

describe('Index', () => {
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

    it('change language', () => {
      cy.get('.v-menu')
        .click()
        .find('.v-list > :nth-child(2)')
        .trigger('mouseover')
        .click()
        .then(() => {
          cy.get('.v-btn')
            .contains(es.toolbar.login)
        })

      cy.get('.v-menu')
        .click()
        .find('.v-list > :nth-child(1)')
        .trigger('mouseover')
        .click()
        .then(() => {
          cy.get('.v-btn')
            .contains(en.toolbar.login)
        })
    })
  })
})
