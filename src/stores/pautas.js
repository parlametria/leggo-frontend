import Vue from 'vue'
import api from './axios'

const pautas = {
  state: {
    pautasDic: {}
  },
  mutations: {
    getPautas (state, { id, pautas }) {
      Vue.set(state.pautasDic, id, pautas)
    }
  },
  actions: {
      getPautas({ commit }, { casa, id, date }){
        api.get(`/pauta/${casa}/${id}`)
        .then((response) => {
            const pautasDic = {
              'id': id,
              'pautas': response.data
            }
            commit('getPautas', pautasDic)
        })
      }
  }
}

export default pautas
