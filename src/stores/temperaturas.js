import Vue from 'vue'
import Vapi from 'vuex-rest-api'

const temperaturas = new Vapi({
  baseURL: process.env.VUE_APP_API_URL,
  state: {
    temperaturas: {},
    coeficiente: {},
    maxTemperatura: 0
  } }).get({
  action: 'getTemperaturaRecente',
  property: 'temperaturas',
  path: ({ casa, id, semanas, date }) =>
    `temperatura/${casa}/${id}?semanas_anteriores=${semanas}&data_referencia=${date}`,
  onSuccess: (state, { data }, axios, { params }) => {
    const temperaturas = data.temperaturas
    const coeficiente = data.coeficiente
    const maxTemperatura = Math.max(...temperaturas.map(x => x.temperatura_recente))

    if (maxTemperatura > state.maxTemperatura) {
      state.maxTemperatura = maxTemperatura
    }

    Vue.set(state.coeficiente, params.id, coeficiente)
    Vue.set(state.temperaturas, params.id, temperaturas)
  }
}).getStore()

temperaturas.getters = {
  maxTemperatura (state) {
    const temperaturas = state.temperaturas
    let maxTemperatura = 0
    Object.keys(temperaturas).forEach(function (key) {
      if (temperaturas[key][0] != null && temperaturas[key][0].temperatura_recente > maxTemperatura) {
        maxTemperatura = temperaturas[key][0].temperatura_recente + 5
      }
    })

    return maxTemperatura
  }
}
export default temperaturas
