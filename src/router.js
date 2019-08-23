import Vue from 'vue'
import Router from 'vue-router'
import Proposicoes from '@/views/Proposicoes.vue'
import Sobre from '@/views/Sobre.vue'
import Cases from '@/views/Cases.vue'
import Ajuda from '@/views/Ajuda.vue'
import Comissao from '@/views/Comissao.vue'
import ProposicaoDetailed from '@/views/ProposicaoDetailed.vue'
import store from '@/stores/store'
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
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
      path: '/ajuda',
      name: 'ajuda',
      component: Ajuda
    },
    {
      path: '/proposicoes',
      name: 'proposicoes',
      components: {
        default: Proposicoes
      }
    },
    {
      path: '/cases',
      name: 'cases',
      component: Cases
    },
    {
      path: '/comissao/:casaComissao/:siglaComissao',
      name: 'comissao',
      component: Comissao,
      props: true,
      beforeEnter: async ({ params }, from, next) => {
        NProgress.start()
        if (store.state.comissoes.orgao[params.siglaComissao] === undefined) {
          await store.dispatch('getComissao', {
            params: {
              sigla: params.siglaComissao,
              casa: params.casaComissao
            }
          })
        }
        NProgress.done()
        next()
      }
    },
    {
      path: '/proposicao/:id',
      name: 'proposicao',
      component: ProposicaoDetailed,
      props: true,
      beforeEnter: async ({ params }, from, next) => {
        const proposicoes = store.state.proposicoes.proposicoes
        proposicoes.forEach(proposicao => {
          if (proposicao.id === parseInt(params.id)) {
            params.prop = proposicao
          }
        })
        next()
      }
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const semanas = store.state.filter.semanas
  const date = store.getters.formattedDateRef
  const proposicoes = store.state.proposicoes.proposicoes
  if (proposicoes.length === 0) {
    await store.dispatch('listProposicoes', {
      params: { semanas, date }
    })
  }

  NProgress.done()
  next()
})
export default router
