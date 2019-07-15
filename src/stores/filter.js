import Vue from 'vue'
import moment from 'moment'

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
        'tipo': 'Na Pauta',
        'status': false
      }
    ],
    dateRef: new Date(),
    semanas: 12,
    temperatureOrder: 'desc'
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
    updateTemperatureOrder (state, order) {
      state.temperatureOrder = order
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
  getters: {
    getCurrent (state) {
      let options = {}
      const keys = Object.keys(state.current)
      state.filters.map(filter => {
        options[filter] = keys.includes(filter)? state.current[filter]:[]
      })
      return options
    },
    formattedDateRef (state) {
      return moment(state.dateRef).format('YYYY-MM-DD')
    }
  },
  actions: {
    updateDateRef ({ commit, dispatch, state, getters }, date) {
      commit('updateDateRef', date)
      dispatch('listProposicoes', {
        params: {
          semanas: state.semanas,
          date: getters.formattedDateRef
        }
      })
    }
  }
}
export default filtro
