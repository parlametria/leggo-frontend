import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Proposicoes from './views/Proposicoes.vue'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/proposicoes/:idProposicao',
      name: 'proposicaoDetails',
      component: ProposicaoDetails
    }
  ]
})
