import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const anotacoes = new Vapi({
  axios: axios,
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    anotacoesProp: {},
    ultimasAnotacoes: []
  }
}).get({
  action: 'getAnotacoesByProp',
  property: 'anotacoesProp',
  path: ({ id, ultimasN, interesse }) =>
    `anotacoes/${id}?&ultimas_n=${ultimasN}&interesse=${interesse}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.anotacoesProp, params.id, data)
  }
}).get({
  action: 'getUltimasAnotacoes',
  property: 'ultimasAnotacoes',
  path: ({ peso, ultimasN, interesse }) => `anotacoes/?peso=${peso}&ultimas_n=${ultimasN}&interesse=${interesse}`
}).getStore()

export default anotacoes
