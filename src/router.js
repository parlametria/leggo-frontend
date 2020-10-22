import Vue from 'vue'
import Router from 'vue-router'
import Proposicoes from '@/views/Proposicoes.vue'
import Sobre from '@/views/Sobre.vue'
import Cases from '@/views/Cases.vue'
import Ajuda from '@/views/Ajuda.vue'
import Analises from '@/views/Analises.vue'
import Comissao from '@/views/Comissao.vue'
import AtoresDetailed from '@/views/AtoresDetailed.vue'
import ProposicaoDetailed from '@/views/ProposicaoDetailed.vue'
import Relatorios from '@/views/Relatorios'
import Semanarios from '@/views/Semanarios'
import store from '@/stores/store'
import NProgress from 'nprogress'
import moment from 'moment'

Vue.use(Router)

const router = new Router({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
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
      path: '/analises',
      name: 'analises',
      component: Analises
    },
    {
      path: '/semanarios',
      name: 'semanarios',
      component: Semanarios
    },
    {
      path: '/proposicoes',
      name: 'proposicoes',
      component: Proposicoes,
      props: true,
      beforeEnter: async ({ params }, from, next) => {
        store.state.proposicoes.interesse = 'leggo'
        NProgress.start()
        const semanas = store.state.filter.semanas
        const date = store.getters.formattedDateRef
        const dataInicio = moment(date).subtract(3, 'months').format('YYYY-MM-DD')
        const interesse = 'leggo'
        const proposicoes = store.state.proposicoes.proposicoes
        const progressos = store.state.progressos.progressos

        if (proposicoes.length === 0) {
          await store.dispatch('listProposicoes', {
            params: { semanas, date, interesse }
          })
          await store.dispatch('maxTemperatura', {
            params: { interesse, dataInicio }
          })
        }
        if (Object.keys(progressos).length === 0) {
          await store.dispatch('progressos', {
            params: { interesse }
          })
        }
        NProgress.done()
        next()
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
      path: '/proposicao/:id_leggo/:slug_interesse?',
      name: 'proposicao',
      component: ProposicaoDetailed,
      props: true,
      beforeEnter: async ({ params }, from, next) => {
        let interesse = params.slug_interesse || store.state.proposicoes.interesse || 'leggo'
        store.state.proposicoes.interesse = interesse

        const semanas = store.state.filter.semanas
        const date = store.getters.formattedDateRef
        const dataInicio = moment(date).subtract(3, 'months').format('YYYY-MM-DD')
        const proposicoes = store.state.proposicoes.proposicoes
        if (proposicoes.length === 0) {
          await store.dispatch('listProposicoes', { params: { semanas, date, interesse } })
        }
        let prop = store.state.proposicoes.proposicoes.filter(e => e.id_leggo === params.id_leggo)[0]

        if (!prop.detailed) {
          await store.dispatch('detailProposicao', { params: { idLeggo: prop.id_leggo, interesse } })
          prop = store.state.proposicoes.proposicoes.filter(e => e.id_leggo === params.id_leggo)[0]
          // console.log(prop)
        }
        await store.dispatch('maxTemperatura', {
          params: { interesse, dataInicio }
        })
        await store.dispatch('progressoProp', {
          params: { idLeggo: prop.id_leggo, interesse }
        })
        params.prop = prop
        next()
      }
    },
    {
      path: '/atores/:id_leggo',
      name: 'atores',
      component: AtoresDetailed,
      props: true
    },
    {
      path: '/:slug_interesse',
      name: 'interesse',
      component: Proposicoes,
      props: true,
      beforeEnter: async ({ params }, from, next) => {
        store.state.proposicoes.interesse = params.slug_interesse
        NProgress.start()
        const semanas = store.state.filter.semanas
        const date = store.getters.formattedDateRef
        const dataInicio = moment(date).subtract(3, 'months').format('YYYY-MM-DD')
        const interesse = params.slug_interesse
        const proposicoes = store.state.proposicoes.proposicoes

        if (proposicoes.length === 0) {
          await store.dispatch('listProposicoes', {
            params: { semanas, date, interesse }
          })
          await store.dispatch('maxTemperatura', {
            params: { interesse, dataInicio }
          })
        }
        NProgress.done()
        next()
      }
    }
  ]
})

export default router
