<template>
  <div>
    <h1>{{this.filteredProp.apelido}}</h1>
  </div>
</template>

<script>
import ProposicaoItem from '@/components/card/ProposicaoItem'
import { mapState } from 'vuex'

export default {
  name: 'proposicoes',
  props: {
    id: {
      type: Number
    }
  },
  components: {
    ProposicaoItem
  },
  computed: {
    filteredProp () {
      for (var i = 0; i < this.proposicoes.length; i++) {
        console.log(this.proposicoes[i])
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
