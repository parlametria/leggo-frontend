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
    async getParlamentarCpf ({ commit }) {
      await axios.create({
        baseURL: process.env.VUE_APP_API_VOZ_ATIVA
      }).get('/api/parlamentares/mapeamento-cpf').then((response) => {
        commit('setParlamentares', response.data)
      })
    }
  }
}

export default parlamentar
