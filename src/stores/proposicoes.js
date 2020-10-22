import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import filterStore from './filter'
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
    interesse: '',
    nome_interesse: '',
    maxTemperatura: 0
  }
}).get({
  action: 'listProposicoes',
  property: 'proposicoes',
  path: ({ semanas, date, interesse }) =>
    `proposicoes?semanas_anteriores=${semanas}&data_referencia=${date}&interesse=${interesse}`,
  onSuccess: (state, { data }, axios, { params }) => {
    let pautasTmp = {}

    // Define nome do interesse das proposições
    if (data && data.length > 0) {
      state.nome_interesse = data[0].interesse[0].nome_interesse
    }

    data.forEach((prop) => {
      prop.temas = prop.interesse[0].temas
      prop.apelido = prop.interesse[0].apelido
      prop.sigla = prop.etapas[0].sigla
      prop.advocacy_link = prop.interesse[0].advocacy_link
      prop.tipo_agenda = prop.interesse[0].tipo_agenda

      // TODO: por enquanto usa apenas a última etapa
      prop.status = retornaProposicaoComStatusGeral(prop)
      prop.firstEtapa = prop.etapas.slice(0, 1)[0]
      prop.lastEtapa = prop.etapas.slice(-1)[0]

      prop.detailed = false
      pautasTmp[prop.lastEtapa.id] = prop.lastEtapa.pauta_historico
    })

    state.proposicoes = data

    const interesse = params.interesse

    store.dispatch('getUltimaPressao', {
      params: { interesse }
    }).then((payload) => {
      data = data.map(a => ({
        ...payload.data.find(p => a.id_leggo === p.id_leggo),
        ...a
      }))

      state.proposicoes = data
    })

    store.dispatch('getUltimasTemperaturas', {
      params: { interesse }
    }).then((payload) => {
      data = data.map(a => ({
        ...payload.data.find(p => a.id_leggo === p.id_leggo),
        ...a
      }))

      state.proposicoes = data
    })

    store.dispatch('getUltimasDatasAnotacoes', {
      params: { interesse }
    }).then((payload) => {
      data = data.map(a => ({
        ...payload.data.find(p => a.id_leggo === p.id_leggo),
        ...a
      }))

      state.proposicoes = data
    })

    Vue.set(pautas.state, 'pautas', pautasTmp)
  }
}).get({
  action: 'detailProposicao',
  path: ({ idLeggo, interesse }) =>
    `proposicoes/${idLeggo}?interesse=${interesse}`,
  onSuccess: (state, { data }, axios, { params }) => {
    const dataProp = data[0]
    dataProp.temas = dataProp.interesse[0].temas
    dataProp.apelido = dataProp.interesse[0].apelido
    dataProp.sigla = dataProp.etapas[0].sigla
    dataProp.advocacy_link = dataProp.interesse[0].advocacy_link
    dataProp.tipo_agenda = dataProp.interesse[0].tipo_agenda

    dataProp.firstEtapa = dataProp.etapas.slice(0, 1)[0]
    dataProp.lastEtapa = dataProp.etapas.slice(-1)[0]
    dataProp.url = dataProp.lastEtapa.url
    dataProp.status = retornaProposicaoComStatusGeral(dataProp)
    const props = state.proposicoes.map(e => {
      return e.id_leggo === dataProp.id_leggo ? { ...dataProp, detailed: true } : e
    })
    state.proposicoes = props
  }
}).get({
  action: 'maxTemperatura',
  property: 'maxTemperatura',
  path: ({ interesse, dataInicio }) =>
    `temperatura/max?interesse=${interesse}&data_inicio=${dataInicio}`,
  onSuccess: (state, { data }) => {
    state.maxTemperatura = data.max_temperatura_periodo
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
    options['tipo_agenda'] = new Set()
    if (state.proposicoes.length !== 0) {
      for (let prop of state.proposicoes) {
        for (let tema of prop['temas']) {
          options['temas'].add(tema)
        }
        if (prop['tipo_agenda'] !== 'nan') {
          options['tipo_agenda'].add(prop['tipo_agenda'])
        }
      }
    }
    options['temas'] = [...options['temas']]
    options['tipo_agenda'] = [...options['tipo_agenda']]
    return options
  },
  getPropById (state) {
    return (idLeggo) => state.proposicoes.find(prop => prop.id_leggo === idLeggo)
  },
  getInteresse (state) {
    return state.interesse
  },
  getNomeInteresse (state) {
    return state.nome_interesse
  },
  maxTemperatura (state) {
    return state.maxTemperatura
  }
}

export default proposicoes
