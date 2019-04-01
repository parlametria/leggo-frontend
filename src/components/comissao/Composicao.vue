<template>
  <div>
    <span v-if="pending.comissao">Carregando composição da comissão {{ siglaComissao }} </span>
    <span v-else-if="error.comissao || !comissao ||comissao.length == 0" class="error">Não temos informações da composição dessa composição.</span>
    <div class="composicao" v-else >
      <parlamentar-card :key="index" v-for="(parlamentar, index) in ordenedComissao" :parlamentar="parlamentar"/>
    </div>
  </div>
</template>
<script>
import ParlamentarCard from '@/components/comissao/ParlamentarCard'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Composicao',
  props: {
    siglaComissao: {
      type: String
    },
    casaComissao: {
      type: String
    }
  },
  components: {
    ParlamentarCard
  },
  methods: {
    compareComposicao (a, b) {
      const aPrioridade = this.getPrioridade(a.cargo)
      const bPrioridade = this.getPrioridade(b.cargo)

      if (aPrioridade || bPrioridade) {
        return this.getPrioridade(b.cargo) - this.getPrioridade(a.cargo)
      }
      const aux = this.quantidadeMembrosComissao
      return aux[b.partido] - aux[a.partido]
    },
    getPrioridade (cargo) {
      let prioridade = 0

      switch (cargo) {
        case 'PRESIDENTE': {
          prioridade = 4
          break
        }
        case 'VICE-PRESIDENTE': {
          prioridade = 3
          break
        }
        case 'PRIMEIRO VICE-PRESIDENTE': {
          prioridade = 3
          break
        }
        case 'SEGUNDO VICE-PRESIDENTE': {
          prioridade = 2
          break
        }
        case 'TERCEIRO VICE-PRESIDENTE': {
          prioridade = 1
          break
        }
      }
      return prioridade
    },
    ...mapActions(['getComissao'])
  },
  computed: {
    ordenedComissao () {
      let comissaoAuxiliar = this.comissao
      return comissaoAuxiliar.sort(this.compareComposicao)
    },
    quantidadeMembrosComissao () {
      let result = {}
      this.comissao.forEach((membro) => {
        if (result[membro.partido] === undefined) {
          result[membro.partido] = 0
        }

        result[membro.partido] = result[membro.partido] + 1
      })
      return result
    },
    ...mapState({
      comissao: state => state.comissoes.comissao.filter((parlamentar) => parlamentar.situacao === 'Titular'),
      error: state => state.comissoes.error,
      pending: state => state.comissoes.pending
    })
  },
  async mounted () {
    await this.getComissao({
      params: { casa: this.casaComissao, sigla: this.siglaComissao }
    })
  }
}
</script>
<style lang="scss" scoped>
.composicao {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-gap: 20px 20px;
}

.error {
  margin-top: 100px;
  display: block;
}
</style>
