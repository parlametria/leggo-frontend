import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const pautas = new Vapi({
  axios: axios,
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
