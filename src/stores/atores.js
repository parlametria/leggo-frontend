import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const atores = new Vapi({
  axios: axios,
  state: {
    atores: {}
  } }).get({
  action: 'getAtores',
  property: 'atores',
  path: ({ casa, id }) =>
    `atores/${casa}/${id}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.atores, params.id, data)
  }
}).getStore()

export default atores
