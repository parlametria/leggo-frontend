import Vue from 'vue'
import Router from 'vue-router'
import store from '@/stores/store'
import NProgress from 'nprogress'

const Sobre = () => import(/* webpackChunkName: "sobre" */ '@/views/Sobre.vue')
const Ajuda = () => import(/* webpackChunkName: "ajuda" */ '@/views/Ajuda.vue')
const Relatorios = () => import(/* webpackChunkName: "relatorios" */ '@/views/Relatorios.vue')
const Semanarios = () => import(/* webpackChunkName: "semanarios" */ '@/views/Semanarios.vue')
const Proposicoes = () => import(/* webpackChunkName: "proposicoes" */ '@/views/Proposicoes.vue')
const Cases = () => import(/* webpackChunkName: "cases" */ '@/views/Cases.vue')
const Comissao = () => import(/* webpackChunkName: "comissao" */ '@/views/Comissao.vue')
const ProposicaoDetailed = () => import(/* webpackChunkName: "proposicaodetailed" */ '@/views/ProposicaoDetailed.vue')
const AtoresDetailed = () => import(/* webpackChunkName: "atoresdetailed" */ '@/views/AtoresDetailed.vue')

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
      path: '/relatorios',
      name: 'relatorios',
      component: Relatorios
    },
    {
      path: '/semanarios',
      name: 'semanarios',
      component: Semanarios
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
      path: '/proposicao/:id_leggo',
      name: 'proposicao',
      component: ProposicaoDetailed,
      props: true,
      beforeEnter: async ({ params }, from, next) => {
        let prop = store.state.proposicoes.proposicoes.filter(e => e.id_leggo === parseInt(params.id_leggo))[0]
        if (!prop.detailed) {
          await store.dispatch('detailProposicao', { params: { idLeggo: prop.id_leggo } })
          prop = store.state.proposicoes.proposicoes.filter(e => e.id_leggo === parseInt(params.id_leggo))[0]
        }
        params.prop = prop
        next()
      }
    },
    {
      path: '/atores/:id_leggo',
      name: 'atores',
      component: AtoresDetailed,
      props: true
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
