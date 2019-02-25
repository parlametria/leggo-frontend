import Vue from 'vue'
import Vapi from 'vuex-rest-api'

const eventosTramitacao = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    eventosDict: {}
  } }).get({
  action: 'getEventosTramitacao',
  property: 'eventos_tramitacao',
  path: ({ casa, id, dataFim, apenasImportantes, ultimosN }) =>
    `eventos_tramitacao/${casa}/${id}?data_fim=${dataFim}&apenas_importantes=${apenasImportantes}&ultimos_n=${ultimosN}`,
  onSuccess: (state, { data }, axios, { params }) => {
    const eventosTramitacao = data

    Vue.set(state.eventosDict, params.id, eventosTramitacao)
  }
}).getStore()

export default eventosTramitacao
