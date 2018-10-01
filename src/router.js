import Vue from 'vue'
import Router from 'vue-router'
import Proposicoes from './views/Proposicoes.vue'
import Sobre from './views/Sobre.vue'
import ProposicaoDetails from './views/ProposicaoDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'proposicoes',
      component: Proposicoes
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
