<template>
  <div>
    <h1>{{this.filteredProp.apelido}}</h1>
    <proposicao-expanded :prop="this.filteredProp"></proposicao-expanded>
  </div>
</template>

<script>
import ProposicaoItem from '@/components/card/ProposicaoItem'
import ProposicaoExpanded from '@/components/card/ProposicaoExpanded'
import { mapState } from 'vuex'

export default {
  name: 'proposicoes',
  props: {
    id: {
      type: Number
    }
  },
  components: {
    ProposicaoItem,
    ProposicaoExpanded
  },
  computed: {
    filteredProp () {
      for (var i = 0; i < this.proposicoes.length; i++) {
        if (this.proposicoes[i].id === this.id) {
          return this.proposicoes[i]
        }
      }
      return null
    },
    ...mapState({
      proposicoes: state => state.proposicoes.proposicoes
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";
</style>
