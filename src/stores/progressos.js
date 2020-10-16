import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const progressos = new Vapi({
  axios: axios,
  state: {
    progressos: {},
    progressoProp: {}
  }
}).get({
  action: 'getProgressos',
  property: 'progressos',
  path: ({ interesse }) =>
    `progresso/?interesse=${interesse}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.progressos, data)
  }
}).get({
  action: 'getProgressosProp',
  property: 'progressoProp',
  path: ({ idLeggo }) =>
    `progresso/${idLeggo}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.progressoProp, data)
  }
}).getStore()

export default progressos
