import axios from './axios'

const temperaturas = {
  axios: axios,
  state: {
    temperaturas: {},
    coeficiente: {}
  },
  mutations: {
    setTemperatura (state, { id, temperatura }) {
      state.temperaturas[id] = temperatura
    },
    setCoeficiente (state, { id, coeficiente }) {
      state.coeficiente[id] = coeficiente
    }
  }
}
export default temperaturas
