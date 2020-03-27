import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import filterStore from './filter'
import temps from './temperaturas'
import pressoes from './pressao'
import pautas from './pautas'
import axios from './axios'
import store from './store'
import retornaProposicaoComStatusGeral from '../utils'

const proposicoes = new Vapi({
  axios: axios,
  state: {
    proposicoes: [],
    tramitacoes: new Set(),
    eventos_tramitacao: {},
    metaInfo: {},
    interesse: ''
  }
}).get({
  action: 'listProposicoes',
  property: 'proposicoes',
  path: ({ semanas, date, interesse }) =>
    `proposicoes?semanas_anteriores=${semanas}&data_referencia=${date}&interesse=${interesse}`,
  onSuccess: (state, { data }) => {
    let temperaturas = {}
    let coeficientes = {}
    let pautasTmp = {}
    let ultimasPressoes = {}
    data.forEach((prop) => {
      prop.temas = prop.interesse[0].temas
      prop.apelido = prop.interesse[0].apelido
      prop.sigla = prop.etapas[0].sigla
      prop.advocacy_link = prop.interesse[0].advocacy_link

      // TODO: por enquanto usa apenas a última etapa
      prop.status = retornaProposicaoComStatusGeral(prop)
      prop.firstEtapa = prop.etapas.slice(0, 1)[0]
      prop.lastEtapa = prop.etapas.slice(-1)[0]

      prop.detailed = false
      temperaturas[prop.id_leggo] = prop.ultima_temperatura
      ultimasPressoes[prop.id_leggo] = prop.ultima_pressao
      coeficientes[prop.id_leggo] = prop.temperatura_coeficiente
      pautasTmp[prop.lastEtapa.id] = prop.lastEtapa.pauta_historico
    })
    state.proposicoes = data

    Vue.set(temps.state, 'temperaturas', temperaturas)
    Vue.set(temps.state, 'coeficiente', coeficientes)
    Vue.set(pautas.state, 'pautas', pautasTmp)
    Vue.set(pressoes.state, 'ultimasPressoes', ultimasPressoes)
  }
}).get({
  action: 'detailProposicao',
  path: ({ idLeggo, interesse }) =>
    `proposicoes/${idLeggo}?interesse=${interesse}`,
  onSuccess: (state, { data }) => {
    const dataProp = data[0]
    dataProp.temas = dataProp.interesse[0].temas
    dataProp.apelido = dataProp.interesse[0].apelido
    dataProp.sigla = dataProp.etapas[0].sigla
    dataProp.advocacy_link = dataProp.interesse[0].advocacy_link

    dataProp.firstEtapa = dataProp.etapas.slice(0, 1)[0]
    dataProp.lastEtapa = dataProp.etapas.slice(-1)[0]
    const last = dataProp.lastEtapa
    store.commit('setTemperatura', { id_leggo: last['id_leggo'], temperatura: last['temperatura_historico'] })
    store.commit('setCoeficiente', { id_leggo: last['id_leggo'], coeficiente: last['temperatura_coeficiente'] })
    dataProp.status = retornaProposicaoComStatusGeral(dataProp)
    const props = state.proposicoes.map(e => {
      return e.id_leggo === dataProp.id_leggo ? { ...dataProp, detailed: true } : e
    })
    state.proposicoes = props
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
    return (idLeggo) => state.proposicoes.find(prop => prop.id_leggo === idLeggo)
  },
  getInteresse (state) {
    return state.interesse
  }
}

export default proposicoes
