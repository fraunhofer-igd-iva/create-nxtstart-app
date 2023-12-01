describe('Auth Process', () => {
  it('login', () => {
    cy.visit('/')
    cy.testLogin()
  })
  it('logout', () => {
    cy.visit('/restrictedPage')

    cy.testLogin()

    cy.contains('Logout').click()

    cy.url().should('include', '/restrictedPage')
    cy.visit('/')
    cy.visit('/restrictedPage')

    // after logout admin content should be hidden
    cy.contains('You need to login to see the restricted content.')
  })
})
