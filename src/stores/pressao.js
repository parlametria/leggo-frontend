import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const pressao = new Vapi({
  axios: axios,
  state: {
    pressao: {},
    ultimasPressoes: {}
  } }).get({
  action: 'getPressao',
  property: 'pressao',
  path: ({ idLeggo, interesse }) =>
    `pressao/${idLeggo}?interesse=${interesse}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.pressao, params.idLeggo, data)
  }
}).getStore()

export default pressao
