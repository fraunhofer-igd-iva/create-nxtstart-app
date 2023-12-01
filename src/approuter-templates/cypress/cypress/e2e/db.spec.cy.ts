describe('DB Test', () => {
  it('check db connection', () => {
    cy.visit('/prisma')
    cy.contains('Mumbai')
  })
})
