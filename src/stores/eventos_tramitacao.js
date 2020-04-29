import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const eventosTramitacao = new Vapi({
  axios: axios,
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    eventosDict: {},
    ultimosEventos: []
  }
}).get({
  action: 'getEventosTramitacao',
  property: 'eventos_tramitacao',
  path: ({ casa, id, dataFim, nivel, ultimosN }) =>
    `eventos_tramitacao/${casa}/${id}?data_fim=${dataFim}&nivel=${nivel}&ultimos_n=${ultimosN}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.eventosDict, params.id, data)
  }
}).get({
  action: 'getUltimosEventos',
  property: 'ultimosEventos',
  path: ({ nivel, ultimosN, interesse }) => `eventos_tramitacao/?nivel=${nivel}&ultimos_n=${ultimosN}&interesse=${interesse}`
}).getStore()

export default eventosTramitacao
