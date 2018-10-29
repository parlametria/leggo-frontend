import Vue from 'vue'
import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'
import filter from './filter'

Vue.use(Vuex)

const proposicoes = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    proposicoes: [],
    tramitacoes: new Set(),
    energias: {},
    pautas: {
      '1': [
        { data: '2018', local: 'aqui' },
        { data: '2018', local: 'la' }
      ],
      '2': [
        { data: '2018', local: 'aqui' },
        { data: '2018', local: 'la' }
      ]
    },
    maxEnergia: 0
  }
}).get({
  action: 'getProposicao',
  property: 'proposicao',
  path: ({ casa, idExt }) => `/proposicoes/${casa}/${idExt}`
}).get({
  action: 'listProposicoes',
  property: 'proposicoes',
  path: '/proposicoes'
}).get({
  action: 'getEnergiaRecente',
  property: 'energias',
  path: ({ casa, id, semanas, date }) => `energia/${casa}/${id}?semanas_anteriores=${semanas}&data_referencia=${date}`,
  onSuccess: (state, { data }, axios, { params }) => {
    const maxEnergia = Math.max(...data.map(x => x.energia_recente))
    if (maxEnergia > state.maxEnergia) {
      state.maxEnergia = maxEnergia
    }
    Vue.set(state.energias, params.id, data)
  }
}).getStore()

export default new Vuex.Store({
  modules: {
    proposicoes,
    filter
  }
})
