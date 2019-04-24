<template>
  <div>
    <div class="composicao" >
      <parlamentar-card
        :key="index"
        v-for="(parlamentar, index) in composicaoCompleta"
        :parlamentar="parlamentar"
      />
    </div>
  </div>
</template>
<script>
import ParlamentarCard from '@/components/comissao/ParlamentarCard'
import { mapState } from 'vuex'

export default {
  name: 'Composicao',
  props: {
    siglaComissao: {
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
      const aux = this.quantidadeMembrosPartido
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
        case 'RELATOR': {
          prioridade = 1
          break
        }
        case 'RELATOR REVISOR': {
          prioridade = 1
          break
        }
      }
      return prioridade
    }
  },
  computed: {
    ordenedComissao () {
      let comissaoAuxiliar = this.comissao
      return comissaoAuxiliar.sort(this.compareComposicao)
    },
    composicaoCompleta () {
      return this.ordenedComissao.map((parlamentar) => {
        let cpf = this.parlamentares[parlamentar.id_parlamentar]
        parlamentar['cpf'] = cpf === undefined ? '' : cpf
        return parlamentar
      })
    },
    quantidadeMembrosPartido () {
      let result = {}
      this.comissao.forEach((membro) => {
        if (result[membro.partido] === undefined) {
          result[membro.partido] = 0
        }

        result[membro.partido] = result[membro.partido] + 1
      })
      return result
    },
    comissao () {
      return this.orgao[this.siglaComissao].filter((parlamentar) => parlamentar.situacao === 'Titular')
    },
    ...mapState({
      orgao: state => state.comissoes.orgao,
      parlamentares: state => state.parlamentar.parlamentares
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
