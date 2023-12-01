/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable<Subject = any> {
    adminLogin(username: string, password: string): Chainable<void>
  }
}

Cypress.Commands.add('adminLogin', (username: string, password: string) => {
  cy.visit('/admin')
  cy.contains('Login').click()

  cy.get('input[name=username]').type(username)

  // {enter} causes the form to submit but doesnt seem to work with next auth screen, so we click the button directly
  cy.get('input[name=password]').type(password)

  cy.contains('Sign in with Admin Account').click()

  // we should be redirected to /admin
  cy.url().should('include', '/admin')

  cy.get('[id=toggle-user-menu]').click()

  // UI should reflect this admin being logged in
  cy.get('[id=menu-user]').should('contain', username).should('contain', 'Logged in as:').should('contain', 'Logout')

  // admin content is visible
  cy.contains('Welcome Admin')
})
