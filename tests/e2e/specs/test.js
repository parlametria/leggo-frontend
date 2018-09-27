describe('My First Test', () => {

  it('Test filter apreciacao', () => {
    cy.visit('/#/proposicoes')
    const apreciacoes = ['Plenário', 'Conclusiva']
      cy.contains('Apreciação').click()
      apreciacoes.forEach(apreciacao => {
        cy.get('#tags > div > span').should('contain', apreciacao)
        cy.contains('.is-checked', apreciacao).click()
        cy.get('#tags > div > span').should('not.contain', apreciacao)
        cy.contains('span', apreciacao).click()
        cy.get('#tags > div > span').should('contain', apreciacao)
      });
  })

  it('Test filter regime', () => {
    cy.visit('/#/proposicoes')

    const regimes = ['Urgência', 'Ordinária', 'Prioridade']
    cy.contains('Regime de tramitação').click()
    regimes.forEach(regime => {
      cy.get('#tags > div > span').should('contain', regime)
      cy.contains('.is-checked', regime).click()
      cy.get('#tags > div > span').should('not.contain', regime)
      cy.contains('span', regime).click()
      cy.get('#tags > div > span').should('contain', regime)
    })
  })

  it('Detalhe Proposicao', () => {
    cy.visit('/#/proposicoes/senado/91341')
  })

})
