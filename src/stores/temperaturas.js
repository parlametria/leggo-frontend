const temperaturas = {
  state: {
    temperaturas: {}
  },
  mutations: {
    filtraApreciacao (state, apreciacoes) {
      state.apreciacaoFilter = apreciacoes
    },
    filtraRegime (state, regimes) {
      state.regimeFilter = regimes
    },
    filtraCasa (state, casas) {
      state.casaFilter = casas
    },
    filtraEmPauta (state, pautas) {
      state.emPautaFilter = pautas
    },
    updateDate (state, date) {
      state.dateFilter = date
    },
    updateTemperaturas (state, payload) {
      state.temperaturas[payload.id] = payload.temperatura
    }
  },
  actions: {
  }
}
export default temperaturas
