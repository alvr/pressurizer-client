describe('Index', () => {
  it('Visit homepage', () => {
    cy.visit('/')
    cy.get('.v-toolbar__title').contains('Pressurizer')
  })
})
