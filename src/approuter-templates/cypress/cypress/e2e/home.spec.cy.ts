describe('Home Test', () => {
  it('finds the header', () => {
    cy.visit('/')

    cy.contains('Next JS')
  })
  it('navigate to responsive design', () => {
    cy.visit('/')

    cy.contains('Responsive Design').click()

    cy.url().should('include', '/responsive')
  })
})
