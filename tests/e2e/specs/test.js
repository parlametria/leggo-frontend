describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080/#/proposicoes')
  })

  it('Visits the page of 91341', () => {
    cy.visit('http://localhost:8080/#/proposicoes/senado/91341')
  })
})
