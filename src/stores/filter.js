import Vue from 'vue'

const filtro = {
  state: {
    // Filtros abilitados e também o nome do atributo da proposição usado por ele
    filters: ['tema', 'regime_tramitacao', 'forma_apreciacao', 'casa'],
    // Valores usados atualmente pelos filtros
    current: {},
    nomeProposicaoFilter: {
      'nomeProposicao': ''
    },
    emPautaFilter: [
      {
        'tipo': 'Sim',
        'status': true
      }, {
        'tipo': 'Não',
        'status': true
      }
    ],
    dateRef: new Date(),
    energyOrder: 'desc',
    energias: {}
  },
  mutations: {
    filtraNomeProposicao (state, nomeProposicao) {
      state.searchFilter = nomeProposicao
    },
    filtraEmPauta (state, pautas) {
      state.emPautaFilter = pautas
    },
    updateDateRef (state, date) {
      state.dateRef = date
    },
    updateEnergyOrder (state, order) {
      state.energyOrder = order
    },
    updateEnergias (state, payload) {
      state.energias[payload.id] = payload.energia
    },
    setFilter (state, payload) {
      // Se payload é no formato { filter, value }, seta filter como value,
      // caso contrário substitui o obj com todos os filtros por payload
      if (payload.filter) {
        Vue.set(state.current, payload.filter, payload.value)
      } else {
        state.current = payload
      }
    }
  },
  actions: {
  }
}
export default filtro
