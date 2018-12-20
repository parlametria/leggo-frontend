import Vue from 'vue'
import Vapi from 'vuex-rest-api'

const emendas = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    emendasDict: {}
  } }).get({
  action: 'getEmendas',
  property: 'emendas',
  path: ({ casa, id, dataFim }) =>
    `emenda/${casa}/${id}?data_fim=${dataFim}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.emendasDict, params.id, data)
  }
}).getStore()

export default emendas
