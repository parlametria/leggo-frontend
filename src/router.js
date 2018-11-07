import Vue from 'vue'
import Router from 'vue-router'
import Proposicoes from '@/views/Proposicoes.vue'
import Sobre from '@/views/Sobre.vue'
import ProposicaoDetails from '@/views/ProposicaoDetails.vue'
import FilterMenu from '@/components/FilterMenu.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'proposicoes' }
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: Sobre
    },
    {
      path: '/proposicoes',
      name: 'proposicoes',
      components: {
        default: Proposicoes,
        menu: FilterMenu
      }
    },
    {
      path: '/proposicoes/:casa/:idExt',
      name: 'proposicao',
      component: ProposicaoDetails
    }
  ]
})
