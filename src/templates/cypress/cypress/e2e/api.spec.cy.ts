describe('API Test', () => {
  it('check hello endpoint', () => {
    cy.request('/api/hello?name=John Doe').then((response) => {
      expect(response.status).to.eq(200)
      cy.wrap(response.body).should('include', {
        name: 'John Doe',
      })
    })
  })
  it('check restricted endpoint unauthorized', () => {
    cy.request({ url: '/api/restrictedRoute', failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(401)
      cy.wrap(response.body).should('include', {
        error: 'You must be signed in to view the protected content from the API.',
      })
    })
  })
})
