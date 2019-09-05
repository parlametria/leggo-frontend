import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const pressao = new Vapi({
  axios: axios,
  state: {
    pressao: {}
  } }).get({
  action: 'getPressao',
  property: 'pressao',
  path: ({ casa, id }) =>
    `pressao/${casa}/${id}`,
  onSuccess: (state, { data }, axios, { params }) => {
    Vue.set(state.pressao, params.id, data)
  }
}).getStore()

export default pressao
