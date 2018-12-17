import Vue from 'vue'
import api from './axios'

const eventos = {
  state: {
    eventosDict: {}
  },
  mutations: {
    getEventos (state, { id, eventos }) {
      Vue.set(state.eventosDict, id, eventos)
    }
  },
  actions: {
    getEventos ({ commit }, { casa, id, date }) {
      api.get(`/pauta/${casa}/${id}?data_referencia=${date}`)
        .then((response) => {
          const eventosDict = {
            'id': id,
            'pautas': response.data
          }
          commit('getEventos', eventosDict)
        })
    }
  }
}

export default pautas
