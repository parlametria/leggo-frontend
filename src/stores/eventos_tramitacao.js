import Vue from 'vue'
import api from './axios'

const eventos_tramitacao = {
  state: {
    eventosDict: {}
  },
  mutations: {
    getEventosTramitacao (state, { id, eventos_tram }) {
      Vue.set(state.eventosDict, id, eventos_tram)
    }
  },
  actions: {
    getEventosTramitacao ({ commit }, { casa, id, data_fim, ultimos_n }) {
      api.get(`/eventos_tramitacao/${casa}/${id}?data_fim=${data_fim}&ultimos_n=${ultimos_n}`)
        .then((response) => {
          const eventosDict = {
            'id': id,
            'eventos_tramitacao': response.data
          }
          commit('getEventosTramitacao', eventosDict)
        })
    }
  }
}

export default eventos_tramitacao

// import Vue from 'vue'
// import Vapi from 'vuex-rest-api'

// const eventos_tramitacao = new Vapi({
//   baseURL: process.env.VUE_APP_API_URL,
//   state: {
//     eventos_tramitacao: {},
//   }}).get({
//   action: 'getEventosTramitacao',
//   property: 'eventos_tramitacao',
//   path: ({ casa, id, data_fim, ultimos_n }) =>
//     `eventos_tramitacao/${casa}/${id}?data_fim=${data_fim}&ultimos_n=${ultimos_n}`,
//   onSuccess: (state, { data_fim }, axios, { params }) => {
//     const eventos_tram = data
    
//     Vue.set(state.eventos_tramitacao, params.id, eventos_tram)
//   }
// }).getStore()

// export default eventos_tramitacao
