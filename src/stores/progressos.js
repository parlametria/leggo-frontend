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
  action: 'progressos',
  property: 'progressos',
  path: ({ interesse }) =>
    `progresso/?interesse=${interesse}`,
  onSuccess: (state, { data }, axios, { params }) => {
    const progressos = data.reduce((acc, curr) => {
      const k = curr.id_leggo
      if (!acc[k]) {
        acc[k] = []
      }
      acc[k].push(curr)
      return acc
    }, {})
    state.progressos = progressos
  }
}).get({
  action: 'getProgressosProp',
  property: 'progressoProp',
  path: ({ idLeggo }) =>
    `progresso/${idLeggo}`,
  onSuccess: (state, { data }, axios, { params }) => {
    state.progressoProp = data
  }

}).getStore()

progressos.getters = {
  progressos (state) {
    return state.progressos
  }
}

export default progressos
