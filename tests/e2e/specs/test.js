describe('Testes', () => {
  it('Proposicoes', () => {
    cy.visit('/#/proposicoes')
    cy.contains('h1', 'Proposições')
  })
  it('Detalhe Proposicao', () => {
    cy.visit('/#/proposicoes/senado/91341')
  })
})
