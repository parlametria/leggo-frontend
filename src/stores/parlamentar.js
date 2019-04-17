import axios from 'axios'

const parlamentar = {
  state: {
    parlamentares: {}
  },
  mutations: {
    setParlamentares (state, parlamentares) {
      parlamentares.forEach(parlamentar => {
        state.parlamentares[parlamentar.id_parlamentar] = parlamentar.cpf
      })
    }
  },
  actions: {
    getParlamentarCpf ({ commit }) {
      axios.create({
        baseURL: 'https://voz-ativa.herokuapp.com/'
      }).get('api/parlamentares/mapeamento-cpf').then((response) => {
        commit('setParlamentares', response.data)
      })
    }
  }
}

export default parlamentar
