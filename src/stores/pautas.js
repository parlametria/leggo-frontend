import Vue from 'vue'
import Vapi from 'vuex-rest-api'

const pautas = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    pautas: {}
  } }).get({
  action: 'getPautas',
  property: 'pautas',
  path: ({ casa, id, date }) =>
    `pauta/${casa}/${id}?data_referencia=${date}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.pautas, params.id, data)
  }
}).getStore()

export default pautas
