import Vue from 'vue'
import Vapi from 'vuex-rest-api'
import axios from './axios'

const temperaturas = new Vapi({
  axios: axios,
  state: {
    temperaturas: {},
    coeficientes: {}
  }
}).get({
    action: 'getUltimasTemperaturas',
    property: 'temperaturas',
    path: ({ interesse }) =>
      `temperatura/ultima?interesse=${interesse}`,
    onSuccess: (state, { data }) => {
      const temperaturas = data.reduce((result, temp) => {
        result[temp.id_leggo] = temp.ultima_temperatura;
        return result;
    },{})
      Vue.set(state.temperaturas, temperaturas);
    }
  }).getStore()

export default temperaturas
