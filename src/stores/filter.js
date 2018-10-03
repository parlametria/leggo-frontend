const filtro = {
  state: {
    apreciacaoFilter: [
      {
        'tipo': 'Plenário',
        'status': true
      }, {
        'tipo': 'Conclusiva',
        'status': true
      }
    ],
    regimeFilter: [
      {
        'tipo': 'Urgência',
        'status': true
      }, {
        'tipo': 'Ordinária',
        'status': true
      }, {
        'tipo': 'Prioridade',
        'status': true
      }
    ],
    casaFilter: [
      {
        'tipo': 'senado',
        'status': true
      }, {
        'tipo': 'camara',
        'status': true
      }
    ],
    emPautaFilter: [
      {
        'tipo': 'Sim',
        'status': true
      }, {
        'tipo': 'Não',
        'status': true
      }
    ],
    dateFilter: '',
    energias: {}
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
    updateEnergias (state, payload) {
      state.energias[payload.id] = payload.energia
    }
  },
  actions: {
  }
}
export default filtro
