import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const emendas = new Vapi({
  axios: axios,
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
