import Vue from 'vue'
import Vuex from 'vuex'
import Vapi from 'vuex-rest-api'
import filterStore from './filter'
import pautasStore from './pautas'
import temperaturasStore from './temperaturas'
import eventosTramitacaoStore from './eventos_tramitacao'

Vue.use(Vuex)

const proposicoes = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    proposicoes: [],
    tramitacoes: new Set(),
    pautas: {},
    eventos_tramitacao: {}
  } }).get({
  action: 'listProposicoes',
  path: '/proposicoes',
  onSuccess: (state, { data }) => {
    state.proposicoes = data
    data.forEach((prop) => {
      // TODO: por enquanto usa apenas a última etapa
      prop.lastEtapa = prop.etapas.slice(-1)[0]
    })
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
  }
}

export default new Vuex.Store({
  modules: {
    proposicoes,
    filter: filterStore,
    pautas: pautasStore,
    temperaturas: temperaturasStore,
    eventosTramitacao: eventosTramitacaoStore
  }
})
