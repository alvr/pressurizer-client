describe('Index', () => {
  before(() => {
    cy.visit('/')
  })

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
})
