import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './va_axios'

const aderencia = new Vapi({
  axios,
  state: {
    aderenciaDict: {}
  } }).get({
  action: 'getAderencia',
  property: 'aderencia',
  path: ({}) =>
    `api/aderencia/parlamentar/`,
  onSuccess: (state, { data }, axios) => {
    Vue.set(state.aderenciaDict,   data)
  },
  onError:(state, { data }, axios) => {
    console.log(axios.defaults.baseURL)
  }
}).getStore()

export default aderencia