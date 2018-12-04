import Vue from 'vue'
import Vapi from 'vuex-rest-api'

const temperaturas = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    temperaturaDic: {},
    coeficienteDic: {},
    maxTemperatura: 0
  },
  mutations: {
    setTemperatura (state, { id, temperaturas }) {
      Vue.set(state.temperaturaDic, id, temperaturas)
    },
    setCoeficiente (state, { id, coeficiente }) {
      Vue.set(state.coeficiente, id, coeficiente)
    }
  },
  getters: {
    maxTemperatura (state) {
      const temperaturas = state.temperaturaDic
      let maxTemperatura = 0
      Object.keys(temperaturas).forEach(function (key) {
        if (temperaturas[key][0] != null && temperaturas[key][0].energia_recente > maxTemperatura) {
          maxTemperatura = temperaturas[key][0].temperatura_recente + 5
        }
      })

      return maxTemperatura
    }
  }
}).get({
  action: 'getTemperatura',
  path: ({ casa, id, semanas, date }) =>
    `temperatura/${casa}/${id}?semanas_anteriores=${semanas}&data_referencia=${date}`,
  onSuccess: (state, { data }, axios, { params }) => {
    const temperaturas = data.temperaturas
    const coeficiente = data.coeficiente
    const maxTemperatura = Math.max(...temperaturas.map(x => x.temperatura_recente))

    if (maxTemperatura > state.maxTemperatura) {
      state.maxTemperatura = maxTemperatura
    }

    Vue.set(state.coeficienteDic, params.id, coeficiente)
    Vue.set(state.temperaturaDic, params.id, temperaturas)
  }
})

export default temperaturas.getStore()
