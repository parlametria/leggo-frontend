import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores/store'
import './plugins/element.js'
import VModal from 'vue-js-modal'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

sync(store, router)

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
Vue.use(VModal)

// Allows calling function when clicked outside of an element
// Usefull for modal and styled select
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
