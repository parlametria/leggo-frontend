import Vue from 'vue'
import Vapi from 'vuex-rest-api'

const comissao = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    comissao: []
  } }).get({
  action: 'getComissao',
  property: 'comissao',
  path: ({ casa, sigla}) =>
    `comissao/${casa}/${sigla}`,
  onSuccess: (state, { data }, axios, { params }) => {
    state.comissao = data
  }
}).getStore()

export default comissao
