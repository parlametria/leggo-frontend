describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080/#/proposicoes')
    cy.contains('h1', 'Proposições')
  })
})
