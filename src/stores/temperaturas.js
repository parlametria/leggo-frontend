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
  },
  getters: {
    maxTemperatura (state) {
      const temperaturas = state.temperaturas
      let maxTemperatura = 0
      Object.keys(temperaturas).forEach(function (key) {
        let scaled_temperatura = temperaturas[key]
        if (scaled_temperatura && scaled_temperatura > maxTemperatura) {
          maxTemperatura = scaled_temperatura
        }
      })
      return maxTemperatura === 0 ? 10 : maxTemperatura
    }
  }
}
export default temperaturas
