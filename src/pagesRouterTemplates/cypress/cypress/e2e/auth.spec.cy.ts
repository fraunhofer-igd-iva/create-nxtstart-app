describe('Auth Process', () => {
  it('admin login', () => {
    const username = 'admin'
    const password = 'admin'

    cy.adminLogin(username, password)
  })
  it('logout', () => {
    const username = 'admin'
    const password = 'admin'

    cy.adminLogin(username, password)

    cy.contains('Logout').click()

    // we should be redirected to /admin
    cy.url().should('include', '/admin')

    // just logging out didn't update the admin page in the test environment (does in normal clients) so we force reload the page
    cy.visit('/')
    cy.visit('/admin')

    // after logout admin content should be hidden
    cy.contains('Need admin account to see content')
  })
})
