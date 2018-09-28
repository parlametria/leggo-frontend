import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Proposicoes from './views/Proposicoes.vue'
import Sobre from './views/Sobre.vue'
import ProposicaoDetails from './views/ProposicaoDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/proposicoes',
      name: 'proposicoes',
      component: Proposicoes
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: Sobre
    },
    {
      path: '/proposicoes/:casa/:idExt',
      name: 'proposicaoDetails',
      component: ProposicaoDetails
    }
  ]
})
