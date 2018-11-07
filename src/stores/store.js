import Vue from 'vue'
import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'
import filterStore from './filter'

Vue.use(Vuex)

const proposicoes = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    proposicoes: [],
    tramitacoes: new Set(),
    energias: {},
    pautas: {
      4: [
        { data: new Date('2018-10-20'), local: 'CCJ' },
        { data: new Date('2018-11-04'), local: 'CAPADR' },
        { data: new Date('2018-11-10'), local: 'CMADS' }
      ],
      9: [
        { data: new Date('2018-10-20'), local: 'CAPADR' },
        { data: new Date('2018-11-07'), local: 'CAPADR' },
        { data: new Date('2018-11-20'), local: 'CMADS' }
      ]
    },
    maxEnergia: 0
  } }).get({
  action: 'getProposicao',
  property: 'proposicao',
  path: ({ casa, idExt }) => `/proposicoes/${casa}/${idExt}`
}).get({
  action: 'listProposicoes',
  path: '/proposicoes',
  onSuccess: (state, { data }) => {
    state.proposicoes = data
    data.forEach((prop) => {
      // TODO: por enquanto usa apenas a última etapa
      prop.lastEtapa = prop.etapas.slice(-1)[0]
    })
  }
}).get({
  action: 'getEnergiaRecente',
  property: 'energias',
  path: ({ casa, id, semanas, date }) =>
    `energia/${casa}/${id}?semanas_anteriores=${semanas}&data_referencia=${date}`,
  onSuccess: (state, { data }, axios, { params }) => {
    const maxEnergia = Math.max(...data.map(x => x.energia_recente))
    if (maxEnergia > state.maxEnergia) {
      state.maxEnergia = maxEnergia
    }
    Vue.set(state.energias, params.id, data)
  }
}).getStore()

proposicoes.getters = {
  perFilterOptions (state) {
    // Retorna um obj com todas as opções de valores para cada filtro, baseado
    // nos dados das proposições
    let options = {}
    for (let filter of filterStore.state.filters) {
      // O Set aqui é usado para deixar só os valores distintos
      options[filter] = [...new Set(
        // Pega, em cada proposição, o valor do atributo ao qual o filtro se refere
        state.proposicoes.map(p => p.lastEtapa[filter])
      ).values()]
    }
    return options
  },
  maxPressao (state) {
    const energias = state.energias
    let maxEnergia = 0
    Object.keys(energias).forEach(function (key) {
      if (energias[key][0] != null && energias[key][0].energia_recente > maxEnergia) {
        maxEnergia = energias[key][0].energia_recente
      }
    })
    return maxEnergia
  }
}

export default new Vuex.Store({
  modules: {
    proposicoes,
    filter: filterStore
  }
})
