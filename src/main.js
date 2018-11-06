import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores/store'
import './plugins/element.js'

Vue.config.productionTip = false

// plugin de tradução extremamente simples
let texts = {
  tema: 'Tema',
  regime_tramitacao: 'Tramitação',
  forma_apreciacao: 'Apreciação',
  casa: 'Casa',
  camara: 'Câmara',
  senado: 'Senado'
}
Vue.use({
  install (Vue, options) {
    Vue.prototype.$t = function (text) {
      if (texts[text]) return texts[text]
      else return text
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
