const filtro = {
    state: {
      apreciacaoFilter: [{'tipo': 'Plenário', 'status': true }, {'tipo': 'Conclusiva', 'status': true }]
    },
    mutations: {
      filtraApreciacao (state, apreciacoes) {
        state.apreciacaoFilter = apreciacoes
      }
    },
    actions: {
  
    }
  }
export default filtro;
