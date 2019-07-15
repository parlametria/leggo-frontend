import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import filterStore from './filter'
import temps from './temperaturas'
import pautas from './pautas'
import atores from './atores'
import axios from './axios'

const proposicoes = new Vapi({
  axios: axios,
  state: {
    proposicoes: [],
    tramitacoes: new Set(),
    eventos_tramitacao: {},
    metaInfo: {}
  }
}).get({
  action: 'listProposicoes',
  property: 'proposicoes',
  path: ({ semanas, date }) =>
    `proposicoes?semanas_anteriores=${semanas}&data_referencia=${date}`,
  onSuccess: (state, { data }) => {
    state.proposicoes = data
    var temperaturas = {}
    var coeficientes = {}
    var atoresTmp = {}
    var pautasTmp = {}
    data.forEach((prop) => {
      // TODO: por enquanto usa apenas a última etapa
      prop.lastEtapa = prop.etapas.slice(-1)[0]
      temperaturas[prop.lastEtapa.id] = prop.lastEtapa.temperatura_historico
      coeficientes[prop.lastEtapa.id] = prop.lastEtapa.temperatura_coeficiente
      pautasTmp[prop.lastEtapa.id] = prop.lastEtapa.pauta_historico
      prop.etapas.forEach((etapa) => {
        atoresTmp[etapa.id] = etapa.top_atores
      })
    })
    Vue.set(temps.state, 'temperaturas', temperaturas)
    Vue.set(temps.state, 'coeficiente', coeficientes)
    Vue.set(pautas.state, 'pautas', pautasTmp)
    Vue.set(atores.state, 'atores', atoresTmp)
  }
}).get({
  action: 'getMetaInfo',
  path: '/info',
  property: 'metaInfo'
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
    options['temas'] = new Set()
    if (state.proposicoes.length !== 0) {
      for (let prop of state.proposicoes) {
        for (let tema of prop.lastEtapa['temas']) {
          options['temas'].add(tema)
        }
      }
    }
    options['temas'] = [...options['temas']]
    return options
  },
  getPropById (state) {
    return (id) => state.proposicoes.find(prop => prop.id === id)
  }
}

export default proposicoes
