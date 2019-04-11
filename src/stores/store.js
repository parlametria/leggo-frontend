import Vue from 'vue'
import Vuex from 'vuex'
import proposicoesStore from './proposicoes'
import filterStore from './filter'
import pautasStore from './pautas'
import temperaturasStore from './temperaturas'
import eventosTramitacaoStore from './eventos_tramitacao'
import emendasStore from './emendas'
import comissoesStore from './comissoes'
import authStore from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    proposicoes: proposicoesStore,
    filter: filterStore,
    pautas: pautasStore,
    temperaturas: temperaturasStore,
    eventosTramitacao: eventosTramitacaoStore,
    emendas: emendasStore,
    comissoes: comissoesStore,
    auth: authStore
  }
})
