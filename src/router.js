import Vue from 'vue'
import Router from 'vue-router'
import Temas from './views/Temas.vue'
import Proposicoes from './views/Proposicoes.vue'
import Sobre from './views/Sobre.vue'
import ProposicaoDetails from './views/ProposicaoDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'temas' }
    },
    {
      path: '/temas',
      name: 'temas',
      component: Temas
    },
    {
      path: '/temas/:tema',
      name: 'tema',
      component: Proposicoes
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: Sobre
    },
    {
      path: '/proposicoes/:casa/:idExt',
      name: 'temas',
      component: ProposicaoDetails
    }
  ]
})
